import { motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";

// Whole-phrase hover: an SVG feTurbulence\u2192feDisplacementMap filter ripples
// the entire name as one wave when you hover anywhere on it (not per letter).
// Desktop-with-a-mouse only, and off entirely under prefers-reduced-motion \u2014
// everything the effect needs lives in this file. The letter-by-letter MOUNT
// animation below is unrelated to this and still plays on every load.
function SplitText({
  text,
  className,
  staggerDelay = 0.04,
  startDelay = 0,
  instant = false,
}) {
  const reducedMotion = useReducedMotion();
  const [canHover] = useState(
    () => window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  );
  const hoverEnabled = canHover && !reducedMotion;
  const filterId = `split-text-liquid-${useId()}`;

  const letters = text.split("").map((char, i) => (
    <motion.span
      key={i}
      className="inline-block"
      initial={
        instant ? false : { opacity: 0, y: 60, rotateX: -90, filter: "blur(8px)" }
      }
      animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.6,
        delay: startDelay + i * staggerDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ));

  if (!hoverEnabled) {
    return (
      <span className={className} aria-label={text}>
        {letters}
      </span>
    );
  }

  return (
    <span className="split-text-liquid-wrap relative inline-block">
      <span className={`${className} split-text-liquid-crisp`} aria-label={text}>
        {letters}
      </span>
      <span
        className={`${className} split-text-liquid-distorted absolute inset-0`}
        aria-hidden="true"
      >
        {text}
      </span>

      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <filter id={filterId} x="-20%" y="-50%" width="140%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.03"
            numOctaves="2"
            seed="3"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="6s"
              values="0.008 0.03;0.014 0.045;0.008 0.03"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="18"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <style>{`
        /* Toggling filter: url() directly can't transition smoothly in CSS
           (browsers snap it on/off), so instead we crossfade an
           always-distorted duplicate of the whole phrase over the crisp
           one \u2014 opacity transitions natively, which is what smooths it. */
        .split-text-liquid-wrap {
          position: relative;
          display: inline-block;
        }
        .split-text-liquid-crisp {
          transition: opacity 0.15s ease;
        }
        .split-text-liquid-distorted {
          opacity: 0;
          filter: url(#${filterId});
          transition: opacity 0.3s ease;
          pointer-events: none;
          font-weight: 300;
          white-space: nowrap;
        }
        .split-text-liquid-wrap:hover .split-text-liquid-crisp {
          opacity: 0;
        }
        .split-text-liquid-wrap:hover .split-text-liquid-distorted {
          opacity: 1;
        }
      `}</style>
    </span>
  );
}

export default SplitText;
