import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import GreenButton from "./GreenButton";

const MotionGreenButton = motion.create(GreenButton);
function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div className="bg-darkBackground text-primary-300 min-h-screen flex flex-col justify-center items-center" id="about">
      <motion.section
        className="flex flex-col gap-10 mb-10 overflow-hidden"
        ref={containerRef}
      >
        <motion.h2
          className="text-7xl font-extrabold tracking-wide text-slate-100 text-center"
          animate={mainControls}
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          About <span className="text-primary-400">Me</span>
        </motion.h2>
      </motion.section>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <motion.img
          animate={mainControls}
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.3,
          }}
          src="profileImage.png"
          alt="Haytham Saba"
          className="w-[250px] md:w-[400px] rounded-full bg-[radial-gradient(closest-side,#161b22_80%,#f7dc6f)]"
        />
        <div>
          <motion.p
            ref={containerRef}
            className="max-w-2xl text-center text-slate-300 mb-5 text-sm md:text-lg mx-10 md:mx-0 tracking-wider"
            animate={mainControls}
            initial="hidden"
            variants={{
              hidden: { opacity: 0, y: -50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            Hey there! I&apos;m Haytham Saba, a Fresh Graduate, passionate software developer
            specializing in front-end, I create interactive and responsive web
            applications using React, Next.js, Tailwind CSS, and Framer Motion.
            I&apos;ve built several full-stack applications, including an
            e-commerce platform with Supabase backend and custom authentication.
            Outside of coding, I enjoy watching football matches and go running
          </motion.p>
          <div className="w-full flex justify-center">
            <MotionGreenButton
              animate={mainControls}
              initial="hidden"
              variants={{
                hidden: { opacity: 0, y: -50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 1,
              }}
              text="Download my CV"
              href="/resume.pdf"
              download="Haytham_Saba_Resume.pdf"
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
