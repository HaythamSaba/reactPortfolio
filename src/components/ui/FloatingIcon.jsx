import { motion } from "framer-motion";

function FloatingIcon({
  src,
  alt,
  finalTop,
  finalLeft,
  delay,
  floatDuration = 3,
  floatDelay = 0,
  rotate = 0,
}) {
  return (
    <motion.div
      className="absolute z-0 pointer-events-none"
      // Start at center of screen, invisible & scaled to 0
      initial={{
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
        opacity: 0,
        scale: 0,
      }}
      // Fly out to final position, keep the -50% centering offset on the element itself
      animate={{
        top: finalTop,
        left: finalLeft,
        x: "-50%",
        y: "-50%",
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 2,
        delay,
        ease: [0.12, 1, 0.1, 1],
      }}
    >
      {/* Glass pill behind the icon */}

      {/* Floating animation lives here, independent of the spread animation */}
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        width={70}
        height={70}
        className=" object-contain"
        style={{
          rotate,
          filter: "drop-shadow(0 2px 8px rgba(130,224,170,0.25))",
        }}
        animate={{ y: [0, -7, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
      />
    </motion.div>
  );
}
export default FloatingIcon;
