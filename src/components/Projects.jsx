import { LinkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import useMobile from "../hooks/useMobile";
// Hook to detect mobile screens efficiently

const projects = [
  {
    title: "Lights Up",
    description: "E-commerce website that allows users to buy Luxury Lights.",
    devStack: ["React", "Next.js", "TailwindCSS", "Supabase"],
    image: "/project-2.jpg",
    link: "https://lights-up-haythamsabas-projects.vercel.app/",
    git: "lights-up",
    type: "Fullstack",
  },
  {
    title: "E-Shop Website",
    description:
      "E-commerce website that allows users to browse and purchase clothes for men and women.",
    devStack: ["HTML", "CSS", "JavaScript"],
    image: "/project-1.jpg",
    link: "https://e-shop-website-opal.vercel.app/",
    git: "E-Shop-Website",
    type: "Frontend",
  },
  {
    title: "My first Portfolio",
    description:
      "This is my first portfolio project, created while I was in college to learn web development.",
    devStack: ["HTML", "CSS", "JavaScript"],
    image: "/project-3.jpg",
    link: "https://portifilio-livid.vercel.app/",
    git: "Portfolio",
    type: "Frontend",
  },
  {
    title: "My World",
    description:
      "In this project, I built a blog website that tells the world about me.",
    devStack: ["HTML", "CSS", "JavaScript"],
    image: "/project-4.jpg",
    link: "https://my-world-vwza.vercel.app/",
    git: "My-World",
    type: "Frontend",
  },
  {
    title: "Quiz App",
    description:
      "I built a quiz app that allows users to test their knowledge in different programming languages.",
    devStack: ["React", "CSS", "Context API"],
    image: "/project-5.jpg",
    link: "https://quiz-app-git-main-haythamsabas-projects.vercel.app/",
    git: "quiz-app",
    type: "Frontend",
  },
];

// Parent animation (stagger)
const cardParentVariants = {
  initial: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.4,
      delayChildren: 0.2,
    },
  },
};

// Each card animation
const cardVariants = {
  initial: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.5 } },
};

export default function Projects() {
  const isMobile = useMobile();

  // Conditionally choose the component type: motion.div or a regular div
  const ProjectCard = isMobile ? 'div' : motion.div;
  const ProjectGrid = isMobile ? 'div' : motion.div;

  return (
    <section id="projects">
      {/* Section Title */}
      <motion.section
        className="flex flex-col gap-10 mb-10 overflow-hidden text-center justify-center items-center mt-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={{
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <motion.h2 className="text-7xl font-extrabold tracking-wide text-slate-100 text-center">
          My <span className="text-primary-400">Projects</span>
        </motion.h2>
        <motion.p>
          Here are some of the projects that I have worked on. Each project is a
          unique opportunity to learn and grow.
        </motion.p>
      </motion.section>

      {/* Projects Grid */}
      <ProjectGrid
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 template relative z-10"
        // Only apply Framer Motion props if not on a mobile screen
        {...(!isMobile && {
          variants: cardParentVariants,
          initial: "initial",
          whileInView: "visible",
          viewport: { once: false, amount: 0.3 },
        })}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            className="group bg-darkBackground rounded-lg overflow-hidden shadow-sm text-darkBackground"
            // Only apply Framer Motion props if not on a mobile screen
            {...(!isMobile && { variants: cardVariants })}
          >
            <div className="overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-[220px] w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col px-6 py-4 gap-2 bg-background rounded-b-lg">
              <h3>{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {project.description}
              </p>
              <div className="flex gap-2 flex-wrap">
                {project.devStack.map((stack) => (
                  <span
                    key={stack}
                    className="px-2 py-1 text-sm font-semibold rounded-full text-darkBackground bg-secondary-400 even:bg-secondary-400 odd:bg-primary-400"
                  >
                    {stack}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View live site for ${project.title}`}
                >
                  <LinkIcon className="w-5 h-5" />
                </a>
                <span className="bg-darkBackground text-background px-2 py-1 rounded-full font-semibold">
                  {project.type}
                </span>
                <a
                  href={`https://github.com/HaythamSaba/${project.git}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View source code for ${project.title} on GitHub`}
                >
                  <svg
                    className="w-6 h-6 fill-current text-gray-800"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.43c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.74-1.34-1.74-1.09-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.82 2.8 1.29 3.48.99.11-.77.42-1.29.76-1.58-2.67-.3-5.48-1.34-5.48-5.96 0-1.32.47-2.4 1.24-3.25-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23A11.48 11.48 0 0112 6.84c1.02.01 2.05.14 3.01.42 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.85 1.24 1.93 1.24 3.25 0 4.63-2.82 5.65-5.5 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.83.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </section>
  );
}