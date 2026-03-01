/**
 * GlassCard — base glass component
 * variant: "default" | "glow" | "bordered"
 */
export default function GlassCard({ children, className = "", variant = "default" }) {
  const base =
    "rounded-2xl backdrop-blur-xl bg-white/[0.06] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-6";

  const variants = {
    default: "",
    glow: "shadow-[0_0_30px_rgba(59,130,246,0.15),0_8px_32px_rgba(0,0,0,0.4)]",
    bordered: "gradient-border",
  };

  return (
    <div className={`${base} ${variants[variant] || ""} ${className}`}>
      {children}
    </div>
  );
}
