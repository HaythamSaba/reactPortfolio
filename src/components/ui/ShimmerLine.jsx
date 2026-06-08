import { motion } from "framer-motion";

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

export default ShimmerLine;