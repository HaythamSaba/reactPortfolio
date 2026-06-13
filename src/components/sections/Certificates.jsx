import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { certificates } from "../../data/StaticData";
import CertificateModal from "../ui/CertificateModal";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },  
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
          <motion.div
            key={certificate.name}
            variants={itemVariants}
            className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            {/* Image preview */}
            <div className="relative w-full h-64 flex items-center justify-center bg-slate-100">
              <img
                src={certificate.imageUrl}
                alt={`Preview of ${certificate.name}`}
                className="max-h-full max-w-full object-contain rounded-t-lg"
              />
            </div>

            <div className="p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {certificate.name}
                </h3>
                <p className="text-sm text-slate-800 mb-4">
                  {certificate.description}
                </p>
              </div>
              <button
                className="bg-primary-500 hover:bg-primary-600 font-semibold text-textColor py-2 px-4 rounded-full transition-colors"
                onClick={() => setOpenIndex(index)}
                aria-label={`View ${certificate.name}`}
              >
                View Certificate
              </button>
            </div>
          </motion.div>
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
