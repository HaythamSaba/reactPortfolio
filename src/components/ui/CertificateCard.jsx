import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const itemVariants = {
  initial: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function CertificateCard({ certificate, index, openIndex, setOpenIndex }) {
  
  return (
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
  );
}

export default CertificateCard;
