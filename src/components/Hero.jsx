import { motion } from "framer-motion";
import profileImg from "../assets/profile.png";
import { useTypewriter } from "../hooks/useTypewriter";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";

const roles = [
  "Full-Stack Developer",
  "Future Cognizant Engineer",
  "B.Tech CSE Student",
  "AI & Data Enthusiast",
  "Data Analyst",
];

/* ── Floating micro-particles ── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 4,
  dur: 4 + Math.random() * 5,
  size: 1 + Math.random() * 2.5,
}));

export default function Hero() {
  const typed = useTypewriter(roles, 75, 45, 2200);

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">

      {/* ── Floating micro-particles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-blue-400/50"
            style={{
              left: `${p.x}%`,
              bottom: "-10px",
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -320 - Math.random() * 200],
              opacity: [0, 0.8, 0],
              x: [0, (Math.random() - 0.5) * 60],
            }}
            transition={{
              duration: p.dur,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* ── DESKTOP ONLY: Absolute Profile Image (lg+) ── */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="hidden lg:block absolute left-[6%] bottom-0 pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <div className="relative h-[610px] w-auto flex items-end justify-center">
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2
                        w-[280px] h-[280px] rounded-full
                        bg-gradient-to-br from-violet-500/40 via-purple-500/30 to-cyan-400/20
                        blur-3xl ring-pulse"
          />
          <img
            src={profileImg}
            alt="Vignesh M"
            className="relative h-full object-contain drop-shadow-[0_0_50px_rgba(139,92,246,0.45)]"
          />
        </div>
      </motion.div>

      {/* ── Content column (mobile: stacked, desktop: offset right) ── */}
      <div className="relative w-full flex flex-col lg:block" style={{ zIndex: 20 }}>

        {/* ── MOBILE ONLY: Profile image stacked above card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex lg:hidden justify-center pt-24 pb-0 pointer-events-none"
        >
          <div className="relative flex items-end justify-center">
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2
                          w-[200px] h-[200px] rounded-full
                          bg-gradient-to-br from-violet-500/40 via-purple-500/30 to-cyan-400/20
                          blur-3xl"
            />
            <img
              src={profileImg}
              alt="Vignesh M"
              className="relative h-[240px] sm:h-[300px] object-contain drop-shadow-[0_0_40px_rgba(139,92,246,0.55)]"
            />
          </div>
        </motion.div>

        {/* ── Hero Info Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="relative mx-4 sm:mx-auto lg:ml-[44%] lg:mr-0 max-w-xl w-auto lg:w-full rounded-2xl p-7 sm:p-10 mb-8 lg:mb-0"
          style={{
            background: "rgba(6, 10, 20, 0.55)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(139, 92, 246, 0.25)",
            boxShadow:
              "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 60px rgba(82,39,255,0.08)",
          }}
        >
          {/* Gradient shimmer border top */}
          <div
            className="absolute inset-x-0 top-0 h-px rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(139,92,246,0.6), rgba(6,182,212,0.5), transparent)",
            }}
          />

          {/* Cognizant Logo */}
          <img
            src="/logos/cognizant.png"
            alt="Cognizant"
            className="absolute top-5 right-5 h-6 w-auto object-contain opacity-80"
          />

          {/* Name */}
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            <span className="gradient-text">Vignesh M</span>
          </h1>

          {/* Typewriter Role */}
          <p className="mt-3 text-blue-300 font-medium text-lg h-7">
            {typed}
            <span className="cursor-blink ml-0.5">|</span>
          </p>

          {/* Summary */}
          <p className="mt-4 text-gray-400 leading-relaxed text-sm">
            Passionate developer with a strong interest in full-stack
            development, data visualization, and AI-powered solutions.
          </p>

          {/* CTA Buttons */}
          <div className="mt-7 flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="
                px-6 py-2.5 rounded-xl font-semibold text-sm
                bg-gradient-to-r from-violet-500 to-blue-500
                hover:from-violet-400 hover:to-blue-400
                shadow-[0_4px_20px_rgba(139,92,246,0.4)]
                hover:shadow-[0_4px_32px_rgba(139,92,246,0.6)]
                transition-all duration-300
              "
            >
              View Projects →
            </motion.button>

            <motion.a
              href="/vignesh_cv.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="
                px-6 py-2.5 rounded-xl font-semibold text-sm
                border border-white/20 hover:bg-white/10
                hover:border-purple-400/40 transition-all duration-300
                inline-flex items-center gap-2
              "
            >
              ↓ Resume
            </motion.a>
          </div>

          {/* Social Icons */}
          <div className="mt-6 flex items-center gap-4 flex-wrap">
            <a
              href="https://github.com/vignesh0314"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform"
            >
              <SiGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/vignesh-m-63b675268"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:scale-110 transform"
            >
              <SiLinkedin size={20} />
            </a>
            <a
              href="mailto:vigneshm030105@gmail.com"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 hover:scale-110 transform"
            >
              <HiOutlineMail size={22} />
            </a>
            <div className="h-4 w-px bg-white/20" />
            <span className="text-xs text-gray-500 break-all">vigneshm030105@gmail.com</span>
          </div>

          {/* Gradient shimmer border bottom */}
          <div
            className="absolute inset-x-0 bottom-0 h-px rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(6,182,212,0.3), rgba(139,92,246,0.4), transparent)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
