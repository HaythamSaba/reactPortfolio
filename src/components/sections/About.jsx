import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import GreenButton from "../ui/GreenButton";
import SectionHeader from "../ui/SectionHeader";

const MotionGreenButton = motion.create(GreenButton);

// ✅ Clean stagger variants instead of manual delays
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

function About() {
  const containerRef = useRef(null); // ✅ single ref, assigned once
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div className="template bg-darkBackground text-primary-300 min-h-screen flex flex-col items-center justify-center py-20">
      {/* ✅ added template + py for spacing */}
      <motion.section
        ref={containerRef} // ✅ ref only here
        className="flex flex-col items-center gap-10 w-full overflow-hidden"
        variants={containerVariants}
        animate={mainControls}
        initial="hidden"
      >
        {/* Heading */}
        <SectionHeader
          title="About"
          firstEmphasisTitle="Me"
        />

        {/* Content Row */}
        <div className="flex items-center justify-center gap-12 xl:gap-24 flex-wrap">
          {/* Profile Image */}
          <motion.img
            variants={itemVariants}
            src="newprofileimage.webp"
            alt="Haytham Saba"
            className="w-[150px] h-[300px] md:w-[250px] md:h-[500px] rounded-full bg-[radial-gradient(closest-side,#161b22_80%,#f7dc6f)]"
          />

          {/* Text + Button */}
          <div className="flex flex-col items-center gap-6 max-w-2xl">
            <motion.p
              // ✅ no ref here
              className="text-center text-slate-300 text-sm md:text-lg tracking-wider"
              variants={itemVariants}
            >
              Frontend developer specialising in React and TypeScript, with
              hands-on experience building full-stack applications including an
              e-commerce platform with Supabase authentication. I work with
              React, Next.js, Tailwind CSS, TypeScript, and Framer Motion to
              create interactive and responsive web experiences. Outside of
              coding, I enjoy watching football and running.
            </motion.p>

            <MotionGreenButton
              variants={itemVariants}
              text="Download my CV"
              href="/Haytham_Saba_CV.pdf"
              download="Haytham_Saba_CV.pdf"
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default About;
