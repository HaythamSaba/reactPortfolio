import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import GreenButton from "../ui/GreenButton";
import { useLenis } from "@studio-freight/react-lenis";
import { skills } from "../../data/StaticData";
import SkillCard from "../ui/SkillCard";
import SectionHeader from "../ui/SectionHeader";

export default function Skills() {
  const [isShow, setIsShow] = useState(false);
  const visibleSkills = isShow ? skills : skills.slice(0, 6);
  const lenis = useLenis();

  const handleScroll = (href) => {
    if (lenis) {
      lenis.scrollTo(href, { offset: -120, duration: 1.2 });
    }
  };

  return (
    <section
      id="tech"
      className="template bg-darkBackground min-h-screen flex flex-col items-center justify-center py-20"
    >
      {/* Heading */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <SectionHeader
          title="My"
          firstEmphasisTitle="Tech "
          secondEmphasisTitle="Stack"
          description="Technologies I use to bring ideas to life."
        />
      </motion.div>

      {/* Grid — ✅ mode="sync" instead of mode="popLayout" */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
        <AnimatePresence mode="sync">
          {visibleSkills.map((skill, i) => (
            <SkillCard key={skill.name} {...skill} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {/* Show More / Less Button */}
      <div className="flex justify-center mt-8">
        <GreenButton
          text={isShow ? "Show Less Skills" : "Show More Skills"}
          onClick={() => {
            setIsShow(!isShow);
            if (isShow) {
              handleScroll("#tech");
            }
          }}
        />
      </div>

      {/* Tagline */}
      <motion.p
        className="mt-14 text-slate-300 text-sm tracking-widest uppercase"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 1 }}
      >
        | always learning :: always building |
      </motion.p>
    </section>
  );
}
