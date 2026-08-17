import { motion } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import GreenButton from "../ui/GreenButton";
import SectionHeader from "../ui/SectionHeader";
import SectionLayout from "../layout/SectionLayout";
import { MdLocationIcon, PhoneIcon, ReactIcon } from "../icons/TechIcons";
import { cardParentVariants, itemVariants } from "../../data/Animation";

const MotionGreenButton = motion.create(GreenButton);

const quickFacts = [
  { icon: MdLocationIcon, label: "Ljubljana, Slovenia" },
  { icon: PhoneIcon, label: "Open to opportunities" },
  { icon: ReactIcon, label: "React & Next.js focus" },
];

function About() {
  const lenis = useLenis();

  const handleScroll = (href) => {
    if (lenis) {
      lenis.start();
      lenis.scrollTo(href, { offset: -120, duration: 1.2 });
    }
  };

  return (
    <SectionLayout>
      <SectionHeader title="About" firstEmphasisTitle="Me" />

      <motion.div
        className="flex items-center justify-center gap-12 xl:gap-24 flex-wrap"
        variants={cardParentVariants}
        initial="initial"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Photo — rotating accent rings, mirrors the Hero profile treatment */}
        <motion.div
          variants={itemVariants}
          className="relative flex items-center justify-center w-[220px] h-[220px] md:w-[360px] md:h-[360px] shrink-0"
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: "1.5px solid rgba(130,224,170,0.25)",
              boxShadow: "0 0 50px rgba(130, 224, 171, 0.363)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          ></motion.div>

          <motion.div
            className="absolute rounded-full"
            style={{ inset: 14, border: "1px dashed rgba(247,220,111,0.25)" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />

          <div className="w-[180px] h-[180px] md:w-[300px] md:h-[300px] rounded-full overflow-hidden relative bg-[radial-gradient(closest-side,#0c0c0c,#f7dc6f)]">
            <img
              src="/profile-pic.webp"
              alt="Haytham Saba"
              width={230}
              height={230}
              className="w-full h-full object-cover scale-150 object-[center_70%]"
            />
          </div>
        </motion.div>

        {/* Bio, quick facts, CTAs */}
        <div className="flex flex-col items-center gap-6 max-w-2xl">
          <motion.p
            className="text-center text-slate-300 text-sm md:text-lg tracking-wider"
            variants={itemVariants}
          >
            I believe a website should feel like the company behind it — honest,
            clear, and built to be trusted. I'm a frontend developer working in
            React, Next.js 15, TypeScript, and Tailwind CSS, and I care most
            about turning a company's values into an experience users can
            actually rely on: fast, scalable, and easy to reach what they came
            for. At Siciliamia I work inside a real PR review workflow — feature
            branches, code reviews, production deploys — writing code other
            people can read and build on.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-3"
            variants={itemVariants}
          >
            {quickFacts.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-2 bg-white/5 border border-primary-400/30 text-slate-200 px-4 py-2 rounded-full text-sm backdrop-blur-sm shadow-lg shadow-primary-500/30"
              >
                <Icon className="w-4 h-4 text-primary-400" />
                {label}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="flex gap-4 flex-wrap justify-center"
            variants={itemVariants}
          >
            <MotionGreenButton
              text="Download my CV"
              href="/Haytham_Saba_CV.pdf"
              download="Haytham_Saba_CV.pdf"
            />

            <motion.button
              onClick={() => handleScroll("#contact")}
              className="px-6 py-3 bg-transparent border border-secondary-400 text-background font-semibold rounded-full shadow-lg outline-none cursor-pointer"
              whileHover={{
                scale: 1.06,
                backgroundColor: "#f7dc6f",
                color: "#0d1117",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </SectionLayout>
  );
}

export default About;
