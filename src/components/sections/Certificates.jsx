import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { certificates } from "../../data/StaticData";
import { cardParentVariants } from "../../data/Animation";

import CertificateModal from "../ui/CertificateModal";
import CertificateCard from "../ui/CertificateCard";
import SectionHeader from "../ui/SectionHeader";
import SectionLayout from "../layout/SectionLayout";

function Certificates() {
  const [openIndex, setOpenIndex] = useState(null);

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
    <SectionLayout>
      <SectionHeader
        title="My"
        firstEmphasisTitle="Certificates"
        description="Here are some of the certificates I have earned. Each one represents a unique opportunity to learn and grow."
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-0"
        variants={cardParentVariants}
        initial="initial"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }} // ✅ was once: false
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
    </SectionLayout>
  );
}

export default Certificates;
