import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─── GLSL Shaders ─────────────────────────────────────────────── */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uHueShift;
  uniform float uNoiseIntensity;
  uniform float uScanlineIntensity;
  uniform float uScanlineFrequency;
  uniform float uWarpAmount;
  uniform vec2  uResolution;

  varying vec2 vUv;

  /* ── Utility ── */
  vec3 hsvToRgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }
  vec3 rgbToHsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
  }

  /* ── Hash / Noise ── */
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1,0)), f.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
      f.y
    );
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 6; i++) {
      v += a * noise(p);
      p  = p * 2.0 + vec2(3.7, 5.3);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;

    /* ── Warp UV ── */
    if (uWarpAmount > 0.0) {
      float wx = fbm(uv * 2.5 + vec2(uTime * 0.08, 0.0));
      float wy = fbm(uv * 2.5 + vec2(0.0, uTime * 0.08) + 4.5);
      uv += uWarpAmount * vec2(wx - 0.5, wy - 0.5);
    }

    /* ── Dark fluid base ── */
    float t = uTime * 0.18;
    float n1 = fbm(uv * 1.8 + vec2(t, t * 0.4));
    float n2 = fbm(uv * 2.4 - vec2(t * 0.5, t * 0.8) + 3.2);
    float n3 = fbm(uv * 3.0 + vec2(-t * 0.3, t * 0.6) + 7.8);

    float fluid = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;

    /* ── Dark color palette — deep navy / near-black with subtle blue-violet veins ── */
    vec3 dark1 = vec3(0.02, 0.03, 0.06);   // near-black navy
    vec3 dark2 = vec3(0.05, 0.04, 0.12);   // deep indigo
    vec3 dark3 = vec3(0.03, 0.07, 0.10);   // midnight teal

    vec3 col = mix(dark1, dark2, fluid);
    col = mix(col, dark3, n3 * 0.4);

    /* ── Subtle bright veins ── */
    float vein = smoothstep(0.48, 0.52, fluid);
    col += vein * vec3(0.04, 0.05, 0.14) * 0.8;

    /* ── Edge vignette ── */
    vec2 center = uv - 0.5;
    float vignette = 1.0 - dot(center, center) * 2.2;
    vignette = clamp(vignette, 0.0, 1.0);
    col *= mix(0.3, 1.0, vignette);

    /* ── Hue shift ── */
    if (abs(uHueShift) > 0.001) {
      vec3 hsv = rgbToHsv(col);
      hsv.x = fract(hsv.x + uHueShift);
      col = hsvToRgb(hsv);
    }

    /* ── Noise grain overlay ── */
    if (uNoiseIntensity > 0.0) {
      float grain = hash(uv + fract(uTime)) * 2.0 - 1.0;
      col += grain * uNoiseIntensity * 0.06;
    }

    /* ── Scanlines ── */
    if (uScanlineIntensity > 0.0 && uScanlineFrequency > 0.0) {
      float scan = sin(uv.y * uScanlineFrequency * 3.14159 * 2.0) * 0.5 + 0.5;
      col = mix(col, col * scan, uScanlineIntensity);
    }

    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ─── Inner fullscreen quad ────────────────────────────────────── */
function VeilMesh({ hueShift, noiseIntensity, scanlineIntensity, scanlineFrequency, warpAmount, speed }) {
    const meshRef = useRef();

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uHueShift: { value: hueShift },
        uNoiseIntensity: { value: noiseIntensity },
        uScanlineIntensity: { value: scanlineIntensity },
        uScanlineFrequency: { value: scanlineFrequency },
        uWarpAmount: { value: warpAmount },
        uResolution: { value: new THREE.Vector2(1, 1) },
    }), []); // eslint-disable-line react-hooks/exhaustive-deps

    // Sync prop changes to uniforms
    useEffect(() => { uniforms.uHueShift.value = hueShift; }, [hueShift, uniforms]);
    useEffect(() => { uniforms.uNoiseIntensity.value = noiseIntensity; }, [noiseIntensity, uniforms]);
    useEffect(() => { uniforms.uScanlineIntensity.value = scanlineIntensity; }, [scanlineIntensity, uniforms]);
    useEffect(() => { uniforms.uScanlineFrequency.value = scanlineFrequency; }, [scanlineFrequency, uniforms]);
    useEffect(() => { uniforms.uWarpAmount.value = warpAmount; }, [warpAmount, uniforms]);

    useFrame(({ clock, size }) => {
        uniforms.uTime.value = clock.getElapsedTime() * speed;
        uniforms.uResolution.value.set(size.width, size.height);
    });

    return (
        <mesh ref={meshRef}>
            {/* Plane that fills the entire viewport */}
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                depthTest={false}
                depthWrite={false}
            />
        </mesh>
    );
}

/* ─── Public component ────────────────────────────────────────── */
export default function DarkVeil({
    hueShift = 0,
    noiseIntensity = 0,
    scanlineIntensity = 0,
    speed = 0.5,
    scanlineFrequency = 0,
    warpAmount = 0,
    style = {},
    className = "",
}) {
    return (
        <Canvas
            className={className}
            style={style}
            dpr={[1, 1.5]}
            orthographic
            camera={{ position: [0, 0, 1], near: 0, far: 2, zoom: 1 }}
            gl={{
                alpha: false,
                antialias: false,
                powerPreference: "high-performance",
            }}
        >
            <VeilMesh
                hueShift={hueShift}
                noiseIntensity={noiseIntensity}
                scanlineIntensity={scanlineIntensity}
                scanlineFrequency={scanlineFrequency}
                warpAmount={warpAmount}
                speed={speed}
            />
        </Canvas>
    );
}
