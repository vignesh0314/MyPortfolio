import { useRef, useMemo, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─── GLSL Shaders ─────────────────────────────────────────────── */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uTopColor;
  uniform vec3 uBottomColor;
  uniform float uIntensity;
  uniform float uGlowAmount;
  uniform float uNoiseIntensity;
  uniform float uPillarWidth;
  uniform float uPillarHeight;
  varying vec2 vUv;
  varying vec3 vPosition;

  // Fast pseudo-random noise
  float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = rand(i);
    float b = rand(i + vec2(1.0, 0.0));
    float c = rand(i + vec2(0.0, 1.0));
    float d = rand(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.0 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // Center UV
    vec2 uv = vUv - 0.5;

    // Pillar shape along x-axis (width control)
    float pillarMask = 1.0 - smoothstep(0.0, uPillarWidth * 0.5, abs(uv.x));
    pillarMask = pow(pillarMask, 2.0);

    // Height fade — fade bottom to top
    float heightFade = smoothstep(-0.5, 0.5, uv.y + 0.5);
    heightFade = pow(heightFade, uPillarHeight);

    // Animated noise for shimmer
    float t = uTime * 0.3;
    vec2 noiseUv = vec2(uv.x * 3.0, uv.y * 2.0 + t);
    float n = fbm(noiseUv * 4.0);
    float shimmer = 1.0 + uNoiseIntensity * (n - 0.5) * 2.0;

    // Core pillar beam
    float core = pillarMask * heightFade * shimmer * uIntensity;

    // Soft outer glow halo
    float glow = exp(-abs(uv.x) / uGlowAmount) * heightFade * uIntensity * 0.5;

    // Blend top/bottom color along Y
    float colorMix = vUv.y;
    vec3 col = mix(uBottomColor, uTopColor, colorMix);

    // Combine core + glow
    float alpha = clamp(core + glow, 0.0, 1.0);

    gl_FragColor = vec4(col * alpha, alpha);
  }
`;

/* ─── Inner mesh component ────────────────────────────────────── */
function PillarMesh({
    topColor,
    bottomColor,
    intensity,
    glowAmount,
    noiseIntensity,
    pillarWidth,
    pillarHeight,
    rotationSpeed,
    pillarRotation,
    interactive,
}) {
    const meshRef = useRef();
    const mouseRef = useRef({ x: 0, y: 0 });
    const { size } = useThree();

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uTopColor: { value: new THREE.Color(topColor) },
            uBottomColor: { value: new THREE.Color(bottomColor) },
            uIntensity: { value: intensity },
            uGlowAmount: { value: glowAmount },
            uNoiseIntensity: { value: noiseIntensity },
            uPillarWidth: { value: pillarWidth },
            uPillarHeight: { value: pillarHeight },
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    // Keep uniforms in sync with props
    useEffect(() => { uniforms.uTopColor.value.set(topColor); }, [topColor, uniforms]);
    useEffect(() => { uniforms.uBottomColor.value.set(bottomColor); }, [bottomColor, uniforms]);
    useEffect(() => { uniforms.uIntensity.value = intensity; }, [intensity, uniforms]);
    useEffect(() => { uniforms.uGlowAmount.value = glowAmount; }, [glowAmount, uniforms]);
    useEffect(() => { uniforms.uNoiseIntensity.value = noiseIntensity; }, [noiseIntensity, uniforms]);
    useEffect(() => { uniforms.uPillarWidth.value = pillarWidth; }, [pillarWidth, uniforms]);
    useEffect(() => { uniforms.uPillarHeight.value = pillarHeight; }, [pillarHeight, uniforms]);

    // Mouse tracking
    const handleMouseMove = useCallback(
        (e) => {
            if (!interactive) return;
            mouseRef.current.x = (e.clientX / size.width - 0.5) * 2;
            mouseRef.current.y = -(e.clientY / size.height - 0.5) * 2;
        },
        [interactive, size]
    );

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [handleMouseMove]);

    // Base rotation in radians
    const baseRot = (pillarRotation * Math.PI) / 180;

    useFrame(({ clock }) => {
        if (!meshRef.current) return;
        uniforms.uTime.value = clock.getElapsedTime();

        // Gentle continuous oscillation
        const elapsed = clock.getElapsedTime();
        const swayX = interactive
            ? mouseRef.current.x * 0.15
            : Math.sin(elapsed * rotationSpeed * 0.5) * 0.05;
        const swayY = interactive
            ? mouseRef.current.y * 0.08
            : Math.cos(elapsed * rotationSpeed * 0.3) * 0.03;

        meshRef.current.rotation.z = baseRot + swayX;
        meshRef.current.rotation.x = swayY;
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[4, 8, 1, 1]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

/* ─── Public component ────────────────────────────────────────── */
export default function LightPillar({
    topColor = "#5227FF",
    bottomColor = "#FF9FFC",
    intensity = 1,
    rotationSpeed = 0.3,
    glowAmount = 0.002,
    pillarWidth = 3,
    pillarHeight = 0.4,
    noiseIntensity = 0.5,
    pillarRotation = 25,
    interactive = false,
    mixBlendMode = "screen",
    quality = "high",
    style = {},
    className = "",
}) {
    const dpr = quality === "high" ? [1, 2] : [0.7, 1.2];

    return (
        <Canvas
            className={className}
            style={{ mixBlendMode, ...style }}
            dpr={dpr}
            camera={{ position: [0, 0, 5], fov: 50 }}
            gl={{
                alpha: true,
                antialias: quality === "high",
                powerPreference: "high-performance",
            }}
        >
            <PillarMesh
                topColor={topColor}
                bottomColor={bottomColor}
                intensity={intensity}
                glowAmount={glowAmount}
                noiseIntensity={noiseIntensity}
                pillarWidth={pillarWidth}
                pillarHeight={pillarHeight}
                rotationSpeed={rotationSpeed}
                pillarRotation={pillarRotation}
                interactive={interactive}
            />
        </Canvas>
    );
}
