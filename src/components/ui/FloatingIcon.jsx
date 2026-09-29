import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Matches Tailwind's `md` breakpoint — below this we use the compact,
// further-into-the-corners mobile position instead of finalTop/finalLeft.
const MOBILE_QUERY = "(max-width: 767px)";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(MOBILE_QUERY).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const handleChange = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}

function FloatingIcon({
  src,
  finalTop,
  finalLeft,
  mobileTop,
  mobileLeft,
  delay,
  floatDuration = 3,
  floatDelay = 0,
  rotate = 0,
}) {
  const isMobile = useIsMobile();
  const top = isMobile && mobileTop ? mobileTop : finalTop;
  const left = isMobile && mobileLeft ? mobileLeft : finalLeft;

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
        top,
        left,
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

      {/* Floating animation lives here, independent of the spread animation */}
      <motion.img
        src={src}
        alt=""
        aria-hidden="true"
        decoding="async"
        width={70}
        height={70}
        className="w-12 h-12 md:w-[70px] md:h-[70px] object-contain"
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
