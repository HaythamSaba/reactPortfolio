import { LinkIcon } from "@heroicons/react/24/outline";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const cardVariants = {
  initial: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function ProjectCard({ project }) {
  return (
    <motion.div
      key={project.title}
      variants={cardVariants}
      className="group bg-darkBackground rounded-lg overflow-hidden relative z-0 shadow-sm"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-[220px] w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
      </div>

      {/* Card Body */}
      <div className="flex flex-col px-6 py-4 gap-2 bg-background rounded-b-lg min-h-[280px] justify-between">
        <div className="flex justify-between items-center">
          <h3 className="text-darkBackground">{project.title}</h3>
          {project.progress && (
            <div className="flex justify-between items-center">
              <span className="bg-primary-400 text-textColor px-2 py-1 rounded-full font-semibold text-sm">
                In Progress
              </span>
            </div>
          )}
        </div>
        <p className="text-md tracking-wide text-darkBackground mb-2">
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
            <LinkIcon className="w-5 h-5 text-darkBackground" />
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
            <FaGithub className="w-6 h-6 text-darkBackground text-2xl" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
