import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const links = [
  { name: "Home", id: "home" },
  { name: "Journey", id: "journey" },
  { name: "Projects", id: "projects" },
  { name: "Skills", id: "skills" },
  { name: "Certifications", id: "certifications" },
  { name: "Publications", id: "publications" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { root: null, rootMargin: "-30% 0px -50% 0px", threshold: 0.1 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <div className="fixed top-5 inset-x-0 z-[999] hidden md:flex justify-center px-4">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`
            backdrop-blur-2xl
            ${scrolled ? "bg-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)]" : "bg-white/[0.05]"}
            border border-white/[0.1]
            rounded-full
            px-8 py-3
            transition-all duration-500
          `}
        >
          <ul className="flex items-center gap-1 relative">
            {links.map((link) => (
              <li key={link.id} className="relative">
                <button
                  onClick={() => scrollTo(link.id)}
                  className={`
                    relative px-4 py-2 rounded-full text-sm font-medium
                    transition-colors duration-300 z-10
                    ${active === link.id
                      ? "text-white"
                      : "text-gray-400 hover:text-gray-200"
                    }
                  `}
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-500/30"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </motion.nav>
      </div>

      {/* ── Mobile Navbar ── */}
      <div className="fixed top-4 inset-x-0 z-[999] flex md:hidden justify-between items-center px-5" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-xl px-4 py-2"
        >
          <span className="gradient-text font-bold text-sm tracking-wide">VM</span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="glass rounded-xl p-2.5 text-white"
        >
          {mobileOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
        </motion.button>
      </div>

      {/* ── Mobile Menu Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="
              fixed top-20 left-4 right-4 z-[999]
              glass rounded-2xl p-4
              flex flex-col gap-1
            "
          >
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`
                  w-full text-left px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${active === link.id
                    ? "bg-blue-500/20 text-white border border-blue-500/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {link.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
