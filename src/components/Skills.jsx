import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GreenButton from "./GreenButton";
import SkillCircle from "./SkillCircle";
import { FaHtml5, FaCss3, FaReact, FaFigma } from "react-icons/fa";
import { BiLogoVisualStudio } from "react-icons/bi";
import {
  RiNextjsFill,
  RiTailwindCssFill,
  RiSupabaseFill,
} from "react-icons/ri";
import { TbBrandFramerMotion } from "react-icons/tb";
import { SiCanva } from "react-icons/si";
import { DiJsBadge } from "react-icons/di";
import useMobile from "../hooks/useMobile";
import { del } from "framer-motion/client";

// Parent container variants (controls stagger)
const containerVariants = {
  initial: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2, // This is what gives the one-by-one effect
      delayChildren: 0.1,
    },
  },
};

// The animation for each individual skill item
const skillVariants = {
  initial: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.5 } },
};

export default function Skills() {
  const isMobile = useMobile();
  const [isShow, setIsShow] = useState(false);

  // The skills array is unchanged
  const skills = [
    {
      name: "HTML",
      value: 95,
      icon: <FaHtml5 className="w-8 h-8 bg-orange-500 text-white rounded" />,
    },
    {
      name: "CSS",
      value: 95,
      icon: <FaCss3 className="w-8 h-8 bg-blue-500 text-white rounded" />,
    },
    {
      name: "JavaScript",
      value: 90,
      icon: <DiJsBadge className="w-8 h-8 bg-black text-yellow-400 rounded" />,
    },
    {
      name: "React",
      value: 90,
      icon: <FaReact className="w-8 h-8 bg-cyan-400 text-white rounded" />,
    },
    {
      name: "Next.js",
      value: 80,
      icon: <RiNextjsFill className="w-8 h-8  text-white rounded-full" />,
    },
    {
      name: "Tailwind CSS",
      value: 85,
      icon: (
        <RiTailwindCssFill className="w-8 h-8 bg-sky-400 text-white rounded" />
      ),
    },
    {
      name: "Supabase",
      value: 70,
      icon: (
        <RiSupabaseFill className="w-8 h-8 bg-green-500 text-white rounded" />
      ),
    },
    {
      name: "Framer Motion",
      value: 80,
      icon: (
        <TbBrandFramerMotion className="w-8 h-8 bg-pink-500 text-white rounded" />
      ),
    },
    {
      name: "Visual Studio Code",
      value: 95,
      icon: (
        <BiLogoVisualStudio className="w-8 h-8 bg-indigo-500 text-white rounded" />
      ),
    },
    {
      name: "Figma",
      value: 85,
      icon: <FaFigma className="w-8 h-8 bg-purple-500 text-white rounded" />,
    },
    {
      name: "Canva",
      value: 90,
      icon: <SiCanva className="w-8 h-8 bg-white text-teal-500 rounded-full" />,
    },
  ];

  const visibleSkills = isShow ? skills : skills.slice(0, 6);

  // Conditionally choose the component type
  const SkillGrid = isMobile ? "div" : motion.div;
  const SkillItem = isMobile ? "div" : motion.div;

  return (
    <div
      id="tech"
      className="bg-darkBackground min-h-screen flex flex-col mt-10"
    >
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
          My <span className="text-primary-400">Tech </span>
          <span className="text-secondary-400">Stack</span>
        </motion.h2>
        <motion.p className="w-1/2">
          Here is my tech stack, which I have been actively working with and
          continuously learning throughout my journey in software development.
          These tools and technologies form the foundation of my projects and
          represent the areas where I have gained the most hands-on experience
        </motion.p>
      </motion.section>

      {/* Parent grid that controls the stagger animation */}
      <SkillGrid
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center py-12 template mx-10 md:mx-0"
        {...(!isMobile && {
          variants: containerVariants,
          initial: "initial",
          whileInView: "visible",
          viewport: { once: false, amount: 0.2 },
        })}
      >
        <AnimatePresence>
          {visibleSkills.map((skill) => (
            <SkillItem
              key={skill.name} // The key is vital for AnimatePresence
              // Pass the animation variants from the parent
              className="w-full flex justify-center"
              {...(!isMobile && {
                variants: skillVariants,
                initial: "initial",
                animate: "visible",
                exit: "exit",
              })}
            >
              <SkillCircle
                name={skill.name}
                value={skill.value}
                icon={skill.icon}
              />
            </SkillItem>
          ))}
        </AnimatePresence>
      </SkillGrid>
      <div className="flex justify-center">
        <GreenButton
          text={isShow ? "Show Less Skills" : "Show More Skills"}
          onClick={() => setIsShow(!isShow)}
        ></GreenButton>
      </div>
    </div>
  );
}
