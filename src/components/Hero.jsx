import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Header from "./Header";
import { useLenis } from "@studio-freight/react-lenis";

// ─── Letter-by-letter split helper ───────────────────────────────────────────
function SplitText({ text, className, staggerDelay = 0.04, startDelay = 0 }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 60, rotateX: -90, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.6,
            delay: startDelay + i * staggerDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// ─── Typewriter with cursor ───────────────────────────────────────────────────
function  Typewriter({ text, startDelay = 1.8 }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          // blink a couple times then hide cursor
          setTimeout(() => setDone(true), 800);
        }
      }, 55);
      return () => clearInterval(interval);
    }, startDelay * 1000);
    return () => clearTimeout(timeout);
  }, [text, startDelay]);

  // Blinking cursor
  useEffect(() => {
    if (done) {
      setShowCursor(false);
      return;
    }
    const blink = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(blink);
  }, [done]);

  return (
    <span>
      {displayed}
      <span
        className="inline-block w-[3px] h-[0.85em] ml-1 align-middle rounded-sm"
        style={{
          backgroundColor: "#f7dc6f",
          opacity: showCursor ? 1 : 0,
          transition: "opacity 0.1s",
        }}
      />
    </span>
  );
}

// ─── Mouse-tracking glow orb ──────────────────────────────────────────────────
function GlowOrb() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed pointer-events-none z-0 w-[400px] h-[400px] rounded-full"
      style={{
        x: springX,
        y: springY,
        background:
          "radial-gradient(circle, rgba(130,224,170,0.07) 0%, transparent 70%)",
      }}
    />
  );
}

// ─── Rotating ring around profile image ──────────────────────────────────────
function ProfileRing({ children }) {
  return (
    <div className="relative flex items-center justify-center w-[170px] h-[170px]">
      {/* Slow outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: "1.5px solid rgba(130,224,170,0.25)",
          boxShadow: "0 0 20px rgba(130,224,170,0.08)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {/* Bright dot travelling around the ring */}
        <div
          className="absolute w-2 h-2 rounded-full -top-1 left-1/2 -translate-x-1/2"
          style={{
            backgroundColor: "#82e0aa",
            boxShadow: "0 0 8px #82e0aa, 0 0 20px #82e0aa",
          }}
        />
      </motion.div>

      {/* Fast inner ring — opposite direction */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: 10,
          border: "1px dashed rgba(247,220,111,0.2)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Image */}
      <motion.img
        src="mainLogo-removebg.png"
        alt="Haytham"
        className="w-[130px] relative z-10 mt-4"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// ─── Shimmer sweep on title ───────────────────────────────────────────────────
function ShimmerLine() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ delay: 2.4, duration: 0.6, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute top-0 h-full w-[60px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(247,220,111,0.25), transparent)",
        }}
        initial={{ x: "-100%" }}
        animate={{ x: "800%" }}
        transition={{ delay: 2.4, duration: 0.8, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

// ─── Animated background grid lines ──────────────────────────────────────────
function GridLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(130,224,170,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(130,224,170,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        maskImage:
          "radial-gradient(ellipse at center, black 20%, transparent 80%)",
      }}
    />
  );
}

// ─── Main Hero ────────────────────────────────────────────────────────────────
function Hero() {
  const lenis = useLenis();

  const handleScroll = (href) => {
    if (lenis) lenis.start();
    if (lenis) lenis.scrollTo(href, { offset: -120, duration: 1.2 });
  };

  return (
    <div className="relative overflow-hidden min-h-screen text-textColor bg-[linear-gradient(to_bottom,_#161b22,_#82e0aa_85%)] flex items-center justify-center template">
      {/* Background elements */}
      <GridLines />
      <GlowOrb />
      <div className="absolute bg-darkBackground w-[2400px] h-[1000px] rounded-[50%] left-1/2 -translate-x-1/2 bg-[radial-gradient(closest-side,#161b22_80%,#82e0aa)] top-[450px] border-[1px] border-[#82e0aa]/30" />

      <div className="container relative mx-auto z-10">
        <Header />

        <div className="flex flex-col items-center justify-center text-center">
          {/* Profile image with rings */}
          <motion.div
            className="mb-4 mt-4"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProfileRing />
          </motion.div>

          {/* "Hello, I am" line */}
          <div className="overflow-hidden mb-2">
            <motion.p
              className="text-slate-200 text-sm md:text-base tracking-[0.3em] uppercase font-medium"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            >
              Hello, I am
            </motion.p>
          </div>

          {/* Name — letter by letter */}
          <div className="perspective-[800px] mb-3">
            <SplitText
              text="Haytham Saba"
              className="text-5xl md:text-7xl font-bold tracking-tight text-primary-200 block"
              staggerDelay={0.06}
              startDelay={0.5}
            />
          </div>

          {/* "Frontend Developer" — typewriter + shimmer */}
          <div className="relative inline-block mb-6">
            <ShimmerLine />
            <span
              className="text-3xl md:text-6xl text-secondary-400 block"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontWeight: 100,
              }}
            >
              <Typewriter text="Frontend Developer" startDelay={1.6} />
            </span>
          </div>

          {/* Divider line that draws itself */}
          <motion.div
            className="h-[1px] mb-6"
            style={{ backgroundColor: "rgba(130,224,170,0.3)" }}
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ delay: 3.2, duration: 0.8, ease: "easeOut" }}
          />

          {/* Description */}
          <motion.p
            className="text-base md:text-lg text-slate-400 max-w-md leading-relaxed mb-8"
            initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ delay: 3.0, duration: 0.9, ease: "easeOut" }}
          >
            Building beautiful, responsive web experiences with React and modern
            frontend technologies.
          </motion.p>

          {/* Buttons */}
          <div className="flex gap-4 flex-wrap justify-center">
            <motion.button
              onClick={() => handleScroll("#contact")}
              className="px-6 py-3 bg-primary-500 text-darkBackground font-semibold rounded-full shadow-lg outline-none"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 3.4,
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

            <motion.button
              onClick={() => handleScroll("#projects")}
              className="px-6 py-3 bg-transparent border border-secondary-400 text-background font-semibold rounded-full shadow-lg outline-none"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 3.55,
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
              View Projects
            </motion.button>
          </div>

          {/* Scroll hint */}
          <motion.div
            className="flex flex-col items-center gap-2 mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}
          >
            <span className="text-slate-600 text-xs tracking-widest uppercase">
              scroll
            </span>
            <motion.div
              className="w-[1px] h-8 bg-gradient-to-b from-slate-600 to-transparent"
              animate={{ scaleY: [0, 1, 0], originY: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
