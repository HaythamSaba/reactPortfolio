// // Button.jsx
import { motion } from "framer-motion";
import React from "react";

// const GreenButton = React.forwardRef(
//   ({ text, type, onClick, className, ...props }, ref) => {
//     return (
//       <motion.button
//         type={type}
//         ref={ref}
//         onClick={onClick}
//         className={`px-6 py-3 bg-primary-500 text-background rounded-full shadow-lg outline-none ${className}`}
//         whileHover={{
//           scale: 1.05,
//           backgroundColor: "#f0e7db",
//           color: "#0d1117",
//           transition: { duration: 0.2 },
//         }}
//         whileTap={{
//           scale: 0.95,
//           backgroundColor: "#0d1117",
//           transition: { duration: 0.2 },
//           color: "#f0e7db",
//         }}
//         {...props}
//       >
//         {text}
//       </motion.button>
//     );
//   }
// );

// export default GreenButton;

const GreenButton = React.forwardRef(
  ({ text, href, download, ...props }, ref) => {
    const baseClasses =
      "px-6 py-3 bg-primary-500 text-background rounded-full shadow-lg outline-none cursor-pointer";

    if (href) {
      // Render as <a> if href is provided
      return (
        <motion.a
          ref={ref}
          href={href}
          download={download}
          {...props}
          className={`${baseClasses} ${props.className || ""} `}
          whileHover={{
            scale: 1.05,
            backgroundColor: "#f0e7db",
            color: "#0d1117",
            transition: { duration: 0.2 },
          }}
          whileTap={{
            scale: 0.95,
            backgroundColor: "#0d1117",
            transition: { duration: 0.2 },
            color: "#f0e7db",
          }}
        >
          {text}
        </motion.a>
      );
    }

    // Otherwise render as <button>
    return (
      <motion.button
        ref={ref}
        {...props}
        className={`${baseClasses} ${props.className || ""}`}
        whileHover={{
          scale: 1.05,
          backgroundColor: "#f0e7db",
          color: "#0d1117",
          transition: { duration: 0.2 },
        }}
        whileTap={{
          scale: 0.95,
          backgroundColor: "#0d1117",
          transition: { duration: 0.2 },
          color: "#f0e7db",
        }}
      >
        {text}
      </motion.button>
    );
  }
);

export default GreenButton;
