import { motion } from "framer-motion";

const baseClasses =
  "px-6 py-3 bg-transparent border border-secondary-400 text-background font-semibold rounded-full shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-secondary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-darkBackground";

function OutlineButton({ text, href, className, skipIntro, handleScroll }) {
  const combinedClasses = `${baseClasses} ${className || ""}`.trim();

  return (
    <motion.button
      onClick={() => handleScroll(href)}
      className={combinedClasses}
      type="button"
      initial={skipIntro ? false : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: skipIntro ? 0 : 3.6,
        duration: 0.6,
        type: "spring",
        stiffness: 200,
      }}
      whileHover={{
        scale: 1.06,
        backgroundColor: "#f7dc6f",
        color: "#0d1117",
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      {text}
    </motion.button>
  );
}

export default OutlineButton;
