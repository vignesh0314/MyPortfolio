import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import { techIcons } from "../data/techIcons";
import { SiGithub } from "react-icons/si";
import { HiExternalLink } from "react-icons/hi";

const techColors = {
  Python: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-300",
  JavaScript: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-300",
  React: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-300",
  "Node.js": "from-green-500/20 to-green-600/10 border-green-500/30 text-green-300",
  Flask: "from-gray-500/20 to-gray-600/10 border-gray-400/30 text-gray-300",
  MySQL: "from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-300",
  PHP: "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-300",
  Tailwind: "from-teal-500/20 to-teal-600/10 border-teal-500/30 text-teal-300",
  FramerMotion: "from-pink-500/20 to-pink-600/10 border-pink-500/30 text-pink-300",
  Html: "from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-300",
  Css: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-300",
};

const defaultTechClass =
  "from-white/10 to-white/5 border-white/20 text-gray-300";

export default function ProjectCard({ project }) {
  const isLive = project.live && project.live !== "#";
  const hasGithub = project.github && project.github !== "#";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group h-full"
    >
      {/* Shimmer border wrapper */}
      <div
        className="relative rounded-2xl p-[1px] h-full
                    bg-white/10 group-hover:p-[1.5px]
                    transition-all duration-500"
        style={{
          background: "rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.5), rgba(139,92,246,0.5), rgba(6,182,212,0.4))",
            padding: "1px",
            borderRadius: "16px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        <div
          className="
            relative h-full rounded-2xl
            bg-white/[0.05] backdrop-blur-xl
            p-6 flex flex-col gap-4
            overflow-hidden
          "
        >
          {/* Hover tint overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-bold text-white leading-snug">
              {project.title}
            </h3>
            {/* Status badge */}
            {isLive ? (
              <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                               bg-green-500/10 border border-green-500/30 text-xs text-green-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Live
              </span>
            ) : (
              <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                               bg-blue-500/10 border border-blue-500/30 text-xs text-blue-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                WIP
              </span>
            )}
          </div>

          <p className="text-gray-400 text-sm leading-relaxed flex-1">
            {project.description}
          </p>

          {/* Tech Pills */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, index) => {
              if (typeof tech === "object") {
                return (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                               text-xs bg-white/10 border border-white/20 text-gray-300"
                  >
                    {tech.emoji} {tech.name}
                  </span>
                );
              }
              const Icon = techIcons[tech];
              const colorClass = techColors[tech] || defaultTechClass;
              return (
                <div key={index} className="relative group/tip">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                                text-xs font-medium border bg-gradient-to-r ${colorClass}`}
                  >
                    {Icon && <Icon className="text-sm" />}
                    {tech}
                  </span>
                  {/* Tooltip */}
                  <span
                    className="absolute -top-8 left-1/2 -translate-x-1/2
                               opacity-0 group-hover/tip:opacity-100
                               transition-all duration-200
                               whitespace-nowrap text-xs text-white
                               bg-black/70 backdrop-blur-md
                               px-2.5 py-1 rounded-lg shadow-lg pointer-events-none"
                  >
                    {tech}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Links */}
          {(hasGithub || isLive) && (
            <div className="flex gap-3 pt-1 border-t border-white/10">
              {hasGithub && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <SiGithub size={13} /> GitHub
                </a>
              )}
              {isLive && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  <HiExternalLink size={14} /> Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
