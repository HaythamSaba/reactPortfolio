import { motion } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";

const cardVariants = {
  initial: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function HireMeCard() {
  const lenis = useLenis();

  const handleScroll = (href) => {
    if (lenis) lenis.start();
    if (lenis) lenis.scrollTo(href, { offset: -120, duration: 1.2 });
  };
  return (
    <motion.div
      variants={cardVariants}
      className="group bg-darkBackground/10 backdrop-blur-sm rounded-3xl overflow-hidden relative z-0 shadow-sm border border-slate-400"
    >
      {/* Gradient "image" area — stands in for a project screenshot */}
      <div className="h-[200px] w-full relative overflow-hidden flex items-center justify-center">
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
          <h3 className="text-primary-400 font-cormorant text-4xl">
            Your Idea Here?
          </h3>
          <p className="text-md tracking-wide text-slate-200 mb-2">
            This slot's suspiciously empty. Coincidence? No — it's reserved for
            whatever you're about to dream up. Bring the idea, I'll bring the
            code (and probably too much coffee).
          </p>
        </div>

        <motion.button
          onClick={() => handleScroll("#contact")}
          className="px-6 py-3 bg-primary-500 text-darkBackground font-semibold rounded-full shadow-lg outline-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 200,
          }}
          whileHover={{
            scale: 1.06,
            backgroundColor: "#f0e7db",
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Me
        </motion.button>
      </div>
    </motion.div>
  );
}

export default HireMeCard;
