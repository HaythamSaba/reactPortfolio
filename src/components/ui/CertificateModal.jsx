import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

function CertificateModal({ certificate, onClose }) {
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    triggerRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    return () => {
      triggerRef.current?.focus?.();
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key !== "Tab" || !panelRef.current) return;

    const focusable = panelRef.current.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return createPortal(
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${certificate.name} certificate`}
        onKeyDown={handleKeyDown}
        className="bg-background p-6 rounded-2xl relative max-w-5xl mx-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
        initial={reducedMotion ? false : { opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reducedMotion ? undefined : { opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={certificate.imageUrl}
          alt={`Full view of ${certificate.name}`}
          className="max-h-[90vh] w-auto mx-auto rounded-lg"
        />
        <button
          ref={closeButtonRef}
          className="absolute top-3 right-3 bg-primary-500 hover:bg-primary-600 text-background rounded-full py-1 px-3 text-sm transition-colors"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

export default CertificateModal;
