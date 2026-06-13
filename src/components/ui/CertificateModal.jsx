import { createPortal } from "react-dom";

function CertificateModal({ certificate, onClose }) {
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-background p-6 rounded-2xl relative max-w-5xl mx-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={certificate.imageUrl}
          alt={`Full view of ${certificate.name}`}
          className="max-h-[90vh] w-auto mx-auto rounded-lg"
        />
        <button
          className="absolute top-3 right-3 bg-primary-500 hover:bg-primary-600 text-background rounded-full py-1 px-3 text-sm transition-colors"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
      </div>
    </div>,
    document.body,
  );
}

export default CertificateModal;
