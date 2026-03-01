import DarkVeil from "./DarkVeil";

export default function AnimatedBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -10,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
      }}
    >
      <DarkVeil
        hueShift={0}
        noiseIntensity={0}
        scanlineIntensity={0}
        speed={0.5}
        scanlineFrequency={0}
        warpAmount={0}
      />
    </div>
  );
}
