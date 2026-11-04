import { motion } from "framer-motion";
import React from "react";

const baseClasses =
  "px-6 py-3 bg-transparent border border-secondary-400 text-background rounded-full shadow-lg cursor-pointer font-semibold focus-ring";

const motionProps = {
  whileHover: {
    scale: 1.05,
    backgroundColor: "#f7dc6f",
    color: "#0d1117",
    transition: { duration: 0.2 },
  },
  whileTap: { scale: 0.95 },
};

const OutlineButton = React.forwardRef(
  ({ text, href, className, ...props }, ref) => {
    const combinedClasses = `${baseClasses} ${className || ""}`.trim();

    if (href) {
      return (
        <motion.a
          ref={ref}
          href={href}
          className={combinedClasses}
          {...motionProps}
          {...props}
        >
          {text}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        type="button"
        className={combinedClasses}
        {...motionProps}
        {...props}
      >
        {text}
      </motion.button>
    );
  },
);

OutlineButton.displayName = "OutlineButton";

export default OutlineButton;
