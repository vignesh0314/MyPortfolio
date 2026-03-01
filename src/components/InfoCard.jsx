import { motion } from "framer-motion";
import { HiExternalLink } from "react-icons/hi";

export default function InfoCard({
  title,
  org,
  year,
  description,
  logo,
  link,
  paperPdf,
  certificatePdf,
  featured,
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        relative group rounded-2xl backdrop-blur-xl
        border p-6 shadow-lg
        transition-all duration-300
        ${featured
          ? "bg-blue-500/10 border-blue-400/30 hover:border-blue-400/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
          : "bg-white/[0.05] border-white/10 hover:border-white/20 hover:bg-white/[0.08]"
        }
      `}
    >
      {/* Gradient left accent bar */}
      <div
        className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-full
                    ${featured
            ? "bg-gradient-to-b from-blue-400 to-purple-500"
            : "bg-gradient-to-b from-blue-500/60 to-purple-500/40"
          }
                    opacity-70 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

      {/* Featured Badge */}
      {featured && (
        <div className="absolute -top-3 right-4 px-3 py-1 rounded-full
                        bg-gradient-to-r from-blue-500 to-purple-600
                        text-xs font-bold text-white shadow-lg">
          🏆 Featured
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-3 pl-4">
        {logo ? (
          <img src={logo} alt={org} className="w-10 h-10 object-contain flex-shrink-0 mt-0.5" />
        ) : (
          <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 flex items-center justify-center mt-0.5">
            <span className="text-blue-400 text-sm">📄</span>
          </div>
        )}
        <div>
          <h3 className="text-sm font-bold text-white leading-snug">{title}</h3>
          <p className="text-xs text-blue-400 mt-0.5">
            {org} {year && <span className="text-gray-500">· {year}</span>}
          </p>
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="mt-3 pl-4 text-gray-400 text-xs leading-relaxed">
          {description}
        </p>
      )}

      {/* Action Buttons */}
      {(certificatePdf || link || paperPdf) && (
        <div className="mt-4 pl-4 flex flex-wrap gap-2">
          {certificatePdf && (
            <motion.a
              href={certificatePdf}
              target="_blank"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                         bg-white/10 border border-white/20 hover:bg-white/20
                         text-xs text-white transition-all duration-200"
            >
              🏅 Certificate
            </motion.a>
          )}
          {paperPdf && (
            <motion.a
              href={paperPdf}
              target="_blank"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                         bg-white/10 border border-white/20 hover:bg-white/20
                         text-xs text-white transition-all duration-200"
            >
              📄 Paper
            </motion.a>
          )}
          {link && (
            <motion.a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                         bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20
                         text-xs text-blue-300 transition-all duration-200"
            >
              <HiExternalLink size={11} /> View
            </motion.a>
          )}
        </div>
      )}
    </motion.div>
  );
}
