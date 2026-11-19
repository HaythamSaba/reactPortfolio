import { motion } from "framer-motion";
import { itemVariants } from "../../data/Animation";

function CertificateCard({ certificate, onOpen }) {
  return (
    <motion.div
      variants={itemVariants}
      className="group rounded-3xl overflow-hidden relative z-0 border border-primary-400/15 shadow-2xl shadow-white/30"
    >
      {/* Image preview — stays on a light surface since certificates are document scans */}
      <div className="relative w-full h-64 flex items-center justify-center bg-slate-100 overflow-hidden">
        <img
          src={certificate.imageUrl}
          alt={`Preview of ${certificate.name}`}
          className="max-h-full max-w-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
      </div>

      <div className="p-2 flex flex-col justify-between bg-darkBackground rounded-b-lg">
        <div className="p-2 mb-2">
          <h3 className="text-lg font-semibold text-background mb-2">
            {certificate.name}
          </h3>
          <p className="text-sm text-slate-300 mb-2">
            {certificate.description}
          </p>
        </div>
        <button
          className="bg-primary-500 hover:bg-primary-600 font-semibold text-textColor py-2 px-4 rounded-full transition-colors focus-ring"
          onClick={onOpen}
          aria-label={`View ${certificate.name}`}
        >
          View Certificate
        </button>
      </div>
    </motion.div>
  );
}

export default CertificateCard;
