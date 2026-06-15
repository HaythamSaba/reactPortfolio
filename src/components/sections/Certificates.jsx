import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { certificates } from "../../data/StaticData";
import CertificateModal from "../ui/CertificateModal";
import CertificateCard from "../ui/CertificateCard";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

function Certificates() {
  const [openIndex, setOpenIndex] = useState(null);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) mainControls.start("visible");
  }, [isInView, mainControls]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (openIndex !== null) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [openIndex]);

  return (
    <section className="template bg-darkBackground min-h-screen flex flex-col justify-center items-center py-16">
      <motion.h2
        ref={containerRef}
        className="text-3xl md:text-7xl font-extrabold tracking-wide text-slate-100 text-center mb-10"
        initial="hidden"
        animate={mainControls}
        variants={{
          hidden: { opacity: 0, y: -40 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
          },
        }}
      >
        Certificates
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        variants={containerVariants}
        initial="hidden"
        animate={mainControls}
      >
        {certificates.map((certificate, index) => (
          <CertificateCard
            key={index}
            index={index}
            certificate={certificate}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
          />
        ))}
      </motion.div>

      {openIndex !== null && (
        <CertificateModal
          certificate={certificates[openIndex]}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}

export default Certificates;
