import { motion } from "framer-motion";

function SectionHeader({
  title,
  firstEmphasisTitle = "",
  secondEmphasisTitle = "",
  description = "",
}) {
  return (
    <motion.div
      className="flex flex-col gap-4 mb-12 text-center items-center"
      initial={{ opacity: 0, y: -110 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-200px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="text-3xl md:text-7xl font-extrabold tracking-wide text-slate-100">
        {title}{" "}
        {firstEmphasisTitle && (
          <span className="text-primary-400">{firstEmphasisTitle}</span>
        )}{" "}
        {secondEmphasisTitle && (
          <span className="text-secondary-400">{secondEmphasisTitle}</span>
        )}
      </h2>
      {description && (
        <p className="text-slate-300 max-w-xl">{description}</p>
      )}{" "}
    </motion.div>
  );
}

export default SectionHeader;
