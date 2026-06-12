import { useState } from "react";
import { motion } from "framer-motion";

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
        animate={{ width: isHovered ? "50%" : "0%", }}
        transition={{ duration: 0.25 }}
      />
    </motion.div>
  );
}

export default SkillCard;