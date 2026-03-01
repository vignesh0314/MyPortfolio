import { motion } from "framer-motion";

export default function SkillCard({ skill, index = 0 }) {
  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.38, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08, y: -4 }}
      className="group relative inline-flex items-center gap-3 px-4 py-3 rounded-2xl cursor-default select-none"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.09)",
        backdropFilter: "blur(12px)",
        transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(99,102,241,0.12)";
        e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)";
        e.currentTarget.style.boxShadow = "0 0 24px rgba(99,102,241,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Icon */}
      {Icon ? (
        <Icon
          className="text-xl text-blue-400 group-hover:text-violet-300 transition-colors duration-300 flex-shrink-0"
        />
      ) : skill.logo ? (
        <img
          src={skill.logo}
          alt={skill.name}
          className="w-5 h-5 object-contain flex-shrink-0"
          style={{ filter: "brightness(0.95)" }}
        />
      ) : (
        <span className="text-xl flex-shrink-0">{skill.emoji}</span>
      )}

      {/* Name */}
      <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
        {skill.name}
      </span>

      {/* Hover glow dot */}
      <span
        className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: "0 0 8px rgba(139,92,246,0.9)" }}
      />
    </motion.div>
  );
}
