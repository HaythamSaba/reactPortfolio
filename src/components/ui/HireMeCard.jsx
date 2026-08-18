import { motion } from "framer-motion";
import { FaEnvelopeIcon } from "../icons/TechIcons"; // swap for whatever mail icon you already use, or drop this import + icon if you don't have one

const cardVariants = {
  initial: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function HireMeCard() {
  return (
    <motion.div
      variants={cardVariants}
      className="group bg-darkBackground/10 backdrop-blur-sm rounded-3xl overflow-hidden relative z-0 shadow-sm border border-slate-400"
    >
      {/* Gradient "image" area — stands in for a project screenshot */}
      <div className="h-[220px] w-full relative overflow-hidden b flex items-center justify-center">
        <motion.span
          className="text-8xl select-none"
          animate={{ rotate: [0, -8, 8, 0], y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          💡
        </motion.span>
      </div>

      {/* Card Body */}
      <div className="flex flex-col p-4 gap-2 rounded-b-lg min-h-[280px]  text-center items-center">
        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-background">Your Idea Here?</h3>
          <p className="text-md tracking-wide text-slate-300 mb-2">
            This slot's suspiciously empty. Coincidence? No — it's reserved for
            whatever you're about to dream up. Bring the idea, I'll bring the
            code (and probably too much coffee).
          </p>
        </div>

        <a
          href="mailto:haythamsaba@gmail.com?subject=Let's build something&body=Hey Haytham, I have an idea..."
          className="inline-flex items-center bg-primary-500 text-textColor px-14 py-4 rounded-full font-semibold text-lg hover:bg-primary-400 hover:text-darkBackground transition-colors mt-2"
        >
          Hire Me
        </a>
      </div>
    </motion.div>
  );
}

export default HireMeCard;
