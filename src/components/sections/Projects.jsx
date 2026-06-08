import { LinkIcon } from "@heroicons/react/24/outline";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { projects } from "../../data/StaticData";
import ProjectCard from "../ui/ProjectCard";
const cardParentVariants = {
  initial: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Projects() {
  return (
    <section
      id="projects"
      className="template bg-darkBackground py-16 text-background"
    >
      {/* Section Title */}
      <motion.div
        className="flex flex-col gap-4 mb-12 text-center items-center"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-7xl font-extrabold tracking-wide text-slate-100">
          My <span className="text-primary-400">Projects</span>
        </h2>
        <p className="max-w-xl text-slate-300">
          Here are some of the projects I have worked on. Each one is a unique
          opportunity to learn and grow.
        </p>
      </motion.div>

      {/* Projects Grid — ✅ animations on all devices, once: true */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-0"
        variants={cardParentVariants}
        initial="initial"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }} // ✅ was once: false
      >
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
