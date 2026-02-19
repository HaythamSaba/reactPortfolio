import { motion } from "framer-motion";
import React from "react";

const baseClasses =
  "px-6 py-3 bg-primary-500 text-textColor rounded-full shadow-lg outline-none cursor-pointer";

const motionProps = {
  whileHover: {
    scale: 1.05,
    backgroundColor: "#f0e7db",
    color: "#0d1117",
    transition: { duration: 0.2 },
  },
  whileTap: {
    scale: 0.95,
    backgroundColor: "#0d1117",
    color: "#f0e7db",
    transition: { duration: 0.2 },
  },
};

const GreenButton = React.forwardRef(
  ({ text, href, download, className, ...props }, ref) => {
    const combinedClasses = `${baseClasses} ${className || ""}`.trim();

    if (href) {
      return (
        <motion.a
          ref={ref}
          href={href}
          download={download}
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

GreenButton.displayName = "GreenButton";

export default GreenButton;
