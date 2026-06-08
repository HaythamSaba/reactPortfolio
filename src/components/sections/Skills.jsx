import { AnimatePresence, motion } from "framer-motion";
import { FaHtml5, FaCss3, FaReact, FaFigma } from "react-icons/fa";
import { BiLogoVisualStudio } from "react-icons/bi";
import {
  RiNextjsFill,
  RiTailwindCssFill,
  RiSupabaseFill,
} from "react-icons/ri";
import { TbBrandFramerMotion } from "react-icons/tb";
import { SiCanva, SiTypescript } from "react-icons/si";
import { DiJsBadge } from "react-icons/di";
import { useState } from "react";
import GreenButton from "../ui/GreenButton";
import { useLenis } from "@studio-freight/react-lenis";

const skills = [
  { name: "HTML", icon: FaHtml5, color: "#e34f26" },
  { name: "CSS", icon: FaCss3, color: "#1572b6" },
  { name: "JavaScript", icon: DiJsBadge, color: "#f7df1e" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { name: "React", icon: FaReact, color: "#61dafb" },
  { name: "Next.js", icon: RiNextjsFill, color: "#ffffff" },
  { name: "Tailwind CSS", icon: RiTailwindCssFill, color: "#38bdf8" },
  { name: "Framer Motion", icon: TbBrandFramerMotion, color: "#ff0055" },
  { name: "Supabase", icon: RiSupabaseFill, color: "#3ecf8e" },
  { name: "Figma", icon: FaFigma, color: "#a259ff" },
  { name: "VS Code", icon: BiLogoVisualStudio, color: "#007acc" },
  { name: "Canva", icon: SiCanva, color: "#00c4cc" },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.7,
    y: 24,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

function SkillCard({ name, icon: Icon, color, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={cardVariants}
      className="group relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl cursor-default select-none"
      style={{
        backgroundColor: `${color}40`,
        border: `1px solid ${color}`,
        backdropFilter: "blur(10px)",
        boxShadow:
          "rgba(255, 255, 255, 0.2) 0px 20px 25px -5px, rgba(255, 255, 255, 0.1) 0px 10px 10px -5px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        scale: 1.08,
        backgroundColor: `${color}12`,
        borderColor: `${color}50`,
        transition: { duration: 0.2 },
      }}
    >
      {/* Glow blob */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
        style={{ backgroundColor: `${color}18` }}
      />

      {/* Icon — ✅ color driven by card hover, not icon hover */}
      <span
        className="relative z-10 text-4xl transition-all duration-300"
        style={{
          color: isHovered ? color : "rgba(148,163,184,0.5)",
          filter: isHovered
            ? `drop-shadow(0 0 8px ${color})`
            : "drop-shadow(0 0 0px transparent)",
          transition: "color 0.3s ease, filter 0.3s ease",
        }}
      >
        <Icon />
      </span>

      <span
        className="relative z-10 text-xs font-semibold tracking-wide text-center leading-tight transition-colors duration-300"
        style={{ color: isHovered ? "#e2e8f0" : "rgba(148,163,184,0.4)" }}
      >
        {name}
      </span>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: isHovered ? "50%" : "0%", }} // ✅ also card-driven
        transition={{ duration: 0.25 }}
      />
    </motion.div>
  );
}

export default function Skills() {
  const [isShow, setIsShow] = useState(false);
  const visibleSkills = isShow ? skills : skills.slice(0, 6);
  const lenis = useLenis();

  const handleScroll = (href) => {
    if (lenis) {
      lenis.scrollTo(href, { offset: -120, duration: 1.2 });
    }
    // ✅ Removed the undefined setNav(false) call
  };

  return (
    <section
      id="tech"
      className="template bg-darkBackground min-h-screen flex flex-col items-center justify-center py-20"
    >
      {/* Heading */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-7xl font-extrabold tracking-wide text-slate-100">
          My <span className="text-primary-400">Tech </span>
          <span className="text-secondary-400">Stack</span>
        </h2>
        <p className="mt-4 text-slate-500 text-sm md:text-base max-w-md mx-auto">
          Technologies I use to bring ideas to life.
        </p>
      </motion.div>

      {/* Grid — ✅ mode="sync" instead of mode="popLayout" */}
      {/* ✅ Parent just provides layout — no variants needed */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
        <AnimatePresence mode="sync">
          {visibleSkills.map((skill, i) => (
            <SkillCard key={skill.name} {...skill} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {/* Show More / Less Button */}
      <div className="flex justify-center mt-8">
        <GreenButton
          text={isShow ? "Show Less Skills" : "Show More Skills"}
          onClick={() => {
            setIsShow(!isShow);
            if (isShow) {
              handleScroll("#tech");
            }
          }}
        />
      </div>

      {/* Tagline */}
      <motion.p
        className="mt-14 text-slate-300 text-sm tracking-widest uppercase"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 1 }}
      >
        | always learning :: always building |
      </motion.p>
    </section>
  );
}
