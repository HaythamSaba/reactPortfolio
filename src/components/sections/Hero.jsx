import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useLenis } from "@studio-freight/react-lenis";

import { TECH_ICONS } from "../../data/StaticData";

import Header from "../layout/Header";
import FloatingIcon from "../ui/FloatingIcon";
import SplitText from "../ui/SplitText";
import TypeWriter from "../ui/TypeWriter"
import ProfileRing from "../ui/ProfileRing";
import GridLines from "../ui/GridLines";
import ShimmerLine from "../ui/ShimmerLine";

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

      {/* ── 8 floating tech icons ── */}
      {TECH_ICONS.map((icon) => (
        <FloatingIcon key={icon.alt} {...icon} />
      ))}

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
              className="text-5xl md:text-7xl font-bold tracking-tight text-primary-100 block"
              staggerDelay={0.06}
              startDelay={0.5}
            />
          </div>

          {/* "Frontend Developer" — TypeWriter + shimmer */}
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
              <TypeWriter text="Frontend Developer" startDelay={1.6} />
            </span>
          </div>

          {/* Description */}
          <motion.p
            className="text-base md:text-lg text-slate-300 max-w-md leading-relaxed mb-8"
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
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
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
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
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
            <span className="text-slate-300 text-xs tracking-widest uppercase">
              scroll
            </span>
            <motion.div
              className="w-[1px] h-8 bg-gradient-to-b from-slate-300 to-transparent"
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
