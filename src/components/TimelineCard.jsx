import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";
import { useEffect, useRef } from "react";

export default function TimelineCard({
  title,
  org,
  period,
  description,
  type,
  cgpa,
  logo,
  isCurrent,
}) {
  const cgpaValue = useMotionValue(0);
  const rounded = useTransform(cgpaValue, (v) => v.toFixed(2));

  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  useEffect(() => {
    if (isInView && type === "education" && cgpa) {
      animate(cgpaValue, parseFloat(cgpa), { duration: 1.6, ease: "easeOut" });
    }
  }, [isInView, cgpa, type, cgpaValue]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="relative group"
    >
      {/* Gradient left border accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full
                    bg-gradient-to-b from-blue-500 via-purple-500 to-transparent
                    opacity-60 group-hover:opacity-100 transition-opacity duration-300"
      />

      <div
        className="
          ml-5 relative
          rounded-2xl
          bg-white/[0.05] backdrop-blur-xl
          border border-white/10
          group-hover:border-white/20
          group-hover:bg-white/[0.08]
          p-6 shadow-lg
          transition-all duration-300
          overflow-hidden
        "
      >
        {/* Hover glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* LEFT: Logo + Text */}
          <div className="flex items-start gap-4">
            {logo ? (
              <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-white/10 border border-white/10 p-2 flex items-center justify-center">
                <img src={logo} alt={org} className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 font-bold text-lg">
                  {type === "experience" ? "💼" : "🎓"}
                </span>
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-white">{title}</h3>
                {isCurrent && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                                   bg-green-500/10 border border-green-500/30 text-[10px] text-green-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Current
                  </span>
                )}
              </div>
              <p className="text-sm text-blue-400 mt-0.5">
                {org} <span className="text-gray-500">·</span> {period}
              </p>
              <p className="mt-3 text-gray-400 text-sm leading-relaxed max-w-xl">
                {description}
              </p>
            </div>
          </div>

          {/* RIGHT: CGPA Badge */}
          {type === "education" && cgpa && (
            <div
              className="
                flex-shrink-0
                rounded-xl
                border border-blue-400/30
                bg-blue-500/10
                px-6 py-4
                text-center
                min-w-[100px]
                group-hover:border-blue-400/50
                group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]
                transition-all duration-300
              "
            >
              <p className="text-[10px] uppercase tracking-widest text-blue-400 font-semibold">CGPA</p>
              <motion.span className="block text-2xl font-bold gradient-text mt-1">
                {rounded}
              </motion.span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
