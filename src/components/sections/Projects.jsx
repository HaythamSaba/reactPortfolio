import { motion } from "framer-motion";
import { projects } from "../../data/StaticData";
import { cardParentVariants } from "../../data/Animation";

import ProjectCard from "../ui/ProjectCard";
import SectionHeader from "../ui/SectionHeader";
import SectionLayout from "../layout/SectionLayout";

export default function Projects() {
  return (
    <SectionLayout>

      <SectionHeader
        title="My"
        secondEmphasisTitle="Projects"
        description="Here are some of the projects I have worked on. Each one is a unique opportunity to learn and grow."
      />

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
    </SectionLayout>
  );
}
