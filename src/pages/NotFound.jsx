import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLenis } from "@studio-freight/react-lenis";
import { itemVariants } from "../data/Animation";
// ✅ Variants outside component
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const glitchVariants = {
  animate: {
    x: [0, -4, 4, -2, 2, 0],
    transition: { duration: 0.4, repeat: Infinity, repeatDelay: 3 },
  },
};

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-darkBackground flex flex-col items-center justify-center template relative overflow-hidden">
      {/* Background decorative circles — matches Hero style */}
      <div className="absolute w-[600px] h-[600px] rounded-full border border-primary-400/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full border border-secondary-400/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute w-[200px] h-[200px] rounded-full bg-primary-400/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />

      <motion.div
        className="flex flex-col items-center text-center z-10 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 number with glitch effect */}
        <motion.div className="relative" variants={itemVariants}>
          <motion.h1
            className="text-[10rem] md:text-[16rem] font-extrabold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-600 select-none"
            variants={glitchVariants}
            animate="animate"
          >
            404
          </motion.h1>

          {/* Glitch shadow layers */}
          <span
            className="absolute inset-0 text-[10rem] md:text-[16rem] font-extrabold leading-none tracking-tighter text-primary-400/20 select-none translate-x-1 -translate-y-1 blur-[2px]"
            aria-hidden="true"
          >
            404
          </span>
          <span
            className="absolute inset-0 text-[10rem] md:text-[16rem] font-extrabold leading-none tracking-tighter text-secondary-400/20 select-none -translate-x-1 translate-y-1 blur-[2px]"
            aria-hidden="true"
          >
            404
          </span>
        </motion.div>

        {/* Divider line */}
        <motion.div
          className="w-24 h-[2px] bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full"
          variants={itemVariants}
        />

        {/* Heading */}
        <motion.h2
          className="text-2xl md:text-4xl font-bold text-slate-100 tracking-wide"
          variants={itemVariants}
        >
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-slate-400 max-w-md text-sm md:text-base leading-relaxed"
          variants={itemVariants}
        >
          Looks like this page wandered off. Let's get you back to somewhere
          that actually exists.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex gap-4 mt-2 flex-wrap justify-center"
          variants={itemVariants}
        >
          {/* Go Home */}
          <motion.button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-primary-500 text-darkBackground font-semibold rounded-full shadow-lg outline-none cursor-pointer"
            whileHover={{
              scale: 1.05,
              backgroundColor: "#f0e7db",
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Home
          </motion.button>

          {/* Go Back */}
          <motion.button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-transparent border border-secondary-400 text-background font-semibold rounded-full shadow-lg outline-none cursor-pointer"
            whileHover={{
              scale: 1.05,
              backgroundColor: "#f7dc6f",
              color: "#0d1117",
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            Go Back
          </motion.button>
        </motion.div>

        {/* Bottom hint */}
        <motion.p
          className="text-slate-600 text-xs mt-4 tracking-widest uppercase"
          variants={itemVariants}
        >
          Haytham Saba · Portfolio
        </motion.p>
      </motion.div>
    </div>
  );
}
