import { motion } from "framer-motion";
import { FaGithubIcon, GoLinkIcon } from "../icons/TechIcons";

const cardVariants = {
  initial: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function ProjectCard({ project, featured = false, className = "" }) {
  return (
    <motion.div
      key={project.title}
      variants={cardVariants}
      className={`group rounded-3xl overflow-hidden relative z-0 shadow-2xl shadow-white/30 ${className}`}
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className={`w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 ${
            featured ? "h-[260px] md:h-[360px]" : "h-[220px]"
          }`}
        />
      </div>

      {/* Card Body */}
      <div
        className={`flex flex-col p-4 gap-2 bg-black rounded-b-lg justify-between ${
          featured ? "min-h-[280px] md:p-6" : "min-h-[280px]"
        }`}
      >
        <div className="flex justify-between items-center">
          <h3
            className={`text-background ${featured ? "text-2xl font-bold" : ""}`}
          >
            {project.title}
          </h3>
          {project.progress && (
            <div className="flex justify-between items-center">
              <span className="bg-primary-400 text-background px-2 py-1 rounded-full font-semibold text-sm">
                In Progress
              </span>
            </div>
          )}
        </div>
        <p
          className={`tracking-wide text-background mb-2 ${featured ? "text-base md:text-lg" : "text-md"}`}
        >
          {project.description}
        </p>

        <div className="flex gap-2 flex-wrap">
          {project.devStack.map((stack) => (
            <span
              key={stack}
              className="px-2 py-1 text-sm font-semibold rounded-full text-darkBackground odd:bg-primary-400 even:bg-secondary-400"
            >
              {stack}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex justify-between items-center mt-4">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View live site for ${project.title}`}
            className="hover:text-primary-400 transition-colors"
          >
            <GoLinkIcon className="w-5 h-5 text-background" />
          </a>

          <span className="bg-darkBackground text-background px-2 py-1 rounded-full font-semibold text-sm">
            {project.type}
          </span>

          <a
            href={`https://github.com/HaythamSaba/${project.git}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View source code for ${project.title} on GitHub`}
            className="hover:text-primary-400 transition-colors"
          >
            <FaGithubIcon
              size={24}
              className="text-background hover:text-primary-400 transition-colors"
            />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
