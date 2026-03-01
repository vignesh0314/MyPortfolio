import Hero from "../components/Hero";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import { skills } from "../data/skills";
import SkillCard from "../components/SkillCard";
import Footer from "../components/Footer";
import { journey } from "../data/journey";
import TimelineCard from "../components/TimelineCard";
import { certifications } from "../data/certifications";
import { publications } from "../data/publications";
import InfoCard from "../components/InfoCard";
import { motion } from "framer-motion";
import { useState } from "react";

/* ── Stagger reveal variant ── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

/* ── Section heading component ── */
function SectionHeader({ badge, title, subtitle }) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mb-12"
    >
      <span className="section-badge">{badge}</span>
      <h2 className="text-3xl sm:text-4xl font-bold gradient-text">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-gray-500 text-sm">{subtitle}</p>
      )}
    </motion.div>
  );
}

/* ── Glass button ── */
const glassBtn =
  "px-6 py-2.5 rounded-full glass text-white text-sm font-medium hover:bg-white/15 hover:border-white/25 transition-all duration-300";

export default function Home() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCerts, setShowAllCerts] = useState(false);
  const [showAllPubs, setShowAllPubs] = useState(false);

  return (
    <div className="min-h-screen pt-24">

      {/* ══ HERO ══ */}
      <section id="home">
        <Hero />
      </section>

      {/* ══ JOURNEY ══ */}
      <section
        id="journey"
        className="mt-32 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <SectionHeader
          badge="⚡ Journey"
          title="Experience & Education"
          subtitle="Where I've been and what I've learned along the way."
        />

        <div className="relative pl-2">
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-0 top-0 w-[2px] rounded-full bg-gradient-to-b from-blue-500 via-purple-500/50 to-transparent"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          <div className="space-y-8">
            {journey.map((item, index) => (
              <TimelineCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section
        id="projects"
        className="mt-32 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <SectionHeader
          badge="🚀 Projects"
          title="Things I've Built"
          subtitle="Real-world applications crafted with modern technologies."
        />

        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {(showAllProjects ? projects : projects.slice(0, 3)).map(
            (project, index) => (
              <motion.div layout key={index} variants={itemVariants}>
                <ProjectCard project={project} />
              </motion.div>
            )
          )}
        </motion.div>

        {projects.length > 3 && (
          <div className="mt-10 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowAllProjects(!showAllProjects)}
              className={glassBtn}
            >
              {showAllProjects
                ? "Show Less ↑"
                : `See All Projects (+${projects.length - 3})`}
            </motion.button>
          </div>
        )}
      </section>

      {/* ══ SKILLS ══ */}
      <section
        id="skills"
        className="mt-32 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <SectionHeader
          badge="🛠️ Skills"
          title="Tech Stack"
          subtitle="Technologies I work with and continue to grow in."
        />

        <div className="space-y-12">
          {[
            { label: "Languages", emoji: "💻" },
            { label: "Frameworks", emoji: "⚡" },
            { label: "Databases", emoji: "🗄️" },
            { label: "Tools", emoji: "🔧" },
          ].map(({ label, emoji }) => {
            const categorySkills = skills.filter((s) => s.category === label);
            if (!categorySkills.length) return null;
            return (
              <div key={label}>
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-base">{emoji}</span>
                  <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest">{label}</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
                </div>

                {/* Flowing tag-cloud chips */}
                <div className="flex flex-wrap gap-3">
                  {categorySkills.map((skill, index) => (
                    <SkillCard key={index} skill={skill} index={index} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* ══ CERTIFICATIONS ══ */}
      <motion.section
        id="certifications"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={containerVariants}
        className="mt-32 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <SectionHeader
          badge="🏅 Certifications"
          title="Certifications"
          subtitle="Credentials earned through continuous learning."
        />

        <div className="relative pl-2 space-y-5">
          {/* Animated line */}
          <motion.div
            className="absolute left-0 top-0 w-[2px] rounded-full bg-gradient-to-b from-purple-500 via-blue-500/40 to-transparent"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {(showAllCerts ? certifications : certifications.slice(0, 3)).map(
            (item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
                className="relative pl-4"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[3px] top-6 w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-[#060a10]" />
                <InfoCard {...item} />
              </motion.div>
            )
          )}
        </div>

        {certifications.length > 3 && (
          <div className="mt-10 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowAllCerts(!showAllCerts)}
              className={glassBtn}
            >
              {showAllCerts
                ? "Show Less ↑"
                : `See All Certifications (+${certifications.length - 3})`}
            </motion.button>
          </div>
        )}
      </motion.section>

      {/* ══ PUBLICATIONS ══ */}
      <motion.section
        id="publications"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={containerVariants}
        className="mt-32 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <SectionHeader
          badge="📄 Research"
          title="Publications"
          subtitle="Research work published in academic journals and conferences."
        />

        <motion.div
          layout
          className="grid gap-6 md:grid-cols-2"
        >
          {(showAllPubs ? publications : publications.slice(0, 2)).map(
            (item, index) => (
              <motion.div layout key={index} variants={itemVariants}>
                <InfoCard
                  title={item.title}
                  org={item.journal}
                  year={item.year}
                  description={item.description}
                  logo={item.logo}
                  paperPdf={item.paperPdf}
                  certificatePdf={item.certificatePdf}
                  link={item.link}
                />
              </motion.div>
            )
          )}
        </motion.div>

        {publications.length > 2 && (
          <div className="mt-10 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowAllPubs(!showAllPubs)}
              className={glassBtn}
            >
              {showAllPubs
                ? "Show Less ↑"
                : `See More Publications (+${publications.length - 2})`}
            </motion.button>
          </div>
        )}
      </motion.section>

      <Footer />
    </div>
  );
}
