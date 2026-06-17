import { motion } from "framer-motion";
import GreenButton from "../ui/GreenButton";
import SectionHeader from "../ui/SectionHeader";
import SectionLayout from "../layout/SectionLayout";
import { cardParentVariants, itemVariants } from "../../data/Animation";

const MotionGreenButton = motion.create(GreenButton);

function About() {
  return (
    <SectionLayout>
      <SectionHeader title="About" firstEmphasisTitle="Me" />

      <motion.div
        className="flex items-center justify-center gap-12 xl:gap-24 flex-wrap"
        variants={cardParentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.img
          variants={itemVariants}
          src="newprofileimage.webp"
          alt="Haytham Saba"
          className="w-[150px] h-[300px] md:w-[250px] md:h-[500px] rounded-full bg-[radial-gradient(closest-side,#161b22_80%,#f7dc6f)]"
        />

        <div className="flex flex-col items-center gap-6 max-w-2xl">
          <motion.p
            className="text-center text-slate-300 text-sm md:text-lg tracking-wider"
            variants={itemVariants}
          >
            Frontend developer specialising in React and TypeScript, with
            hands-on experience building full-stack applications including an
            e-commerce platform with Supabase authentication. I work with React,
            Next.js, Tailwind CSS, TypeScript, and Framer Motion to create
            interactive and responsive web experiences. Outside of coding, I
            enjoy watching football and running.{" "}
          </motion.p>

          <MotionGreenButton
            variants={itemVariants}
            text="Download my CV"
            href="/Haytham_Saba_CV.pdf"
            download="Haytham_Saba_CV.pdf"
          />
        </div>
      </motion.div>
    </SectionLayout>
  );
}

export default About;
