import { motion } from "framer-motion";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { HiOutlineMail, HiArrowUp } from "react-icons/hi";

const socials = [
  {
    Icon: SiGithub,
    href: "https://github.com/vignesh0314",
    label: "GitHub",
    hoverClass: "hover:text-white hover:shadow-[0_0_16px_rgba(255,255,255,0.2)]",
  },
  {
    Icon: SiLinkedin,
    href: "https://www.linkedin.com/in/vignesh-m-63b675268",
    label: "LinkedIn",
    hoverClass: "hover:text-blue-400 hover:shadow-[0_0_16px_rgba(59,130,246,0.3)]",
  },
  {
    Icon: HiOutlineMail,
    href: "mailto:vigneshm030105@gmail.com",
    label: "Email",
    hoverClass: "hover:text-cyan-400 hover:shadow-[0_0_16px_rgba(6,182,212,0.3)]",
    size: 22,
  },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="mt-32 max-w-6xl mx-auto px-6 pb-10">
      {/* Gradient divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mb-10" />

      <div
        className="
          relative rounded-2xl
          glass
          px-8 py-10
          text-center
          overflow-hidden
        "
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none rounded-2xl" />

        {/* Back to top button */}
        <motion.button
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollTop}
          className="
            absolute top-4 right-4
            p-2.5 rounded-xl
            bg-white/10 border border-white/20
            hover:bg-white/20 hover:border-white/30
            text-gray-400 hover:text-white
            transition-all duration-200
          "
          title="Back to top"
        >
          <HiArrowUp size={16} />
        </motion.button>

        {/* Name + tagline */}
        <h3 className="text-2xl font-bold gradient-text">Vignesh M</h3>
        <p className="mt-1.5 text-gray-500 text-sm">
          B.Tech CSE · Future Software Engineer · Building things that matter
        </p>

        {/* CTA tagline */}
        <p className="mt-4 text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
          Open to collaborations, internships, and full-time opportunities. Let's build something great together!
        </p>

        {/* Social Icons */}
        <div className="mt-6 flex justify-center gap-5">
          {socials.map(({ Icon, href, label, hoverClass, size = 20 }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className={`
                text-gray-500 transition-all duration-200 p-2.5 rounded-xl
                bg-white/5 border border-white/10
                hover:bg-white/10 hover:border-white/20
                ${hoverClass}
              `}
              title={label}
            >
              <Icon size={size} />
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-white/10 pt-5">
          <p className="text-xs text-gray-600">
            © 2026 Vignesh M. Crafted with{" "}
            <span className="text-red-400">♥</span> using React &amp; Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
