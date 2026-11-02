import { motion } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import GreenButton from "../ui/GreenButton";
import SectionHeader from "../ui/SectionHeader";
import SectionLayout from "../layout/SectionLayout";
import { MdLocationIcon, PhoneIcon, ReactIcon } from "../icons/TechIcons";
import { cardParentVariants, itemVariants } from "../../data/Animation";
import TextScrollWordReveal from "../ui/TextScrollWordReveal";
import PhotoCascade from "../ui/PhotoCascade";

const MotionGreenButton = motion.create(GreenButton);

const quickFacts = [
  { icon: MdLocationIcon, label: "Ljubljana, Slovenia" },
  { icon: PhoneIcon, label: "Open to opportunities" },
  { icon: ReactIcon, label: "React & Next.js focus" },
];

const STATEMENT =
  "I believe a website should feel like the company behind it — honest, clear, and built to be trusted. I'm a frontend developer working in React, Next.js 15, TypeScript, and Tailwind CSS, and I care most about turning a company's values into an experience users can actually rely on: fast, scalable, and easy to reach what they came for. At Siciliamia I work inside a real PR review workflow — feature branches, code reviews, production deploys — writing code other people can read and build on.";

// Keep the first card a clear portrait so recruiters still see your face first.
// Images: ~600×750 px (4:5), WebP/AVIF, under ~120 KB each, in /public/about/.
const ABOUT_PHOTOS = [
  {
    src: "/profile-pic.webp",
    alt: "Haytham Saba, portrait",
    tag: "Hello",
    place: "Ljubljana",
    title: "Haytham",
    caption: "Frontend developer. Building things people can rely on.",
  },
  {
    src: "/haytham-in-mountains.webp",
    alt: "Haytham on a mountain ridge above the clouds",
    tag: "Summit",
    place: "Kamniška Bistrica",
    year: "2025",
    title: "Long climbs",
    caption: "Hard ascents, slow pace, worth every step at the top.",
  },
  {
    src: "/haytham-in-nature.webp",
    alt: "Haytham by a jasna lake surrounded by forest",
    tag: "Quiet",
    place: "Kranska Gora",
    title: "Reset mode",
    caption: "Where I go when I need to think clearly.",
  },
  {
    src: "/haytham-in-oldtown.webp",
    alt: "Haytham exploring an old town street",
    tag: "Travel",
    place: "Somewhere new",
    title: "New streets",
    caption: "Every city teaches me something about how people use space.",
  },
  {
    src: "/haytham-in-christmas.webp",
    alt: "Haytham at a Christmas market with friends",
    tag: "Holiday",
    place: "Ljubljana",
    year: "2025",
    title: "Lights & people",
    caption: "Enjoying the season of Christmas.",
  },
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

      {/* Bio reveals word-by-word while the photo stays pinned beside it */}
      <TextScrollWordReveal
        statement={STATEMENT}
        scrollLength={`${ABOUT_PHOTOS.length * 60 + 40}vh`}
        image={(progress) => (
          <PhotoCascade photos={ABOUT_PHOTOS} progress={progress} />
        )}
      />

      {/* Quick facts, CTAs */}
      <motion.div
        className="flex flex-col items-center gap-6"
        variants={cardParentVariants}
        initial="initial"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
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
            className="px-6 py-3 bg-transparent border border-secondary-400 text-background font-semibold rounded-full shadow-lg outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-secondary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-darkBackground"
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
      </motion.div>
    </SectionLayout>
  );
}

export default About;
