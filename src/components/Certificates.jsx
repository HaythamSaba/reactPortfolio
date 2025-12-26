"use client";
import { useState, useEffect } from "react";

function Certificates() {
  const certificates = [
    {
      name: "University Certificate",
      imageUrl: "/university-Certificate.jpg", // vertical
      description:
        "My university certificate in Software Engineering from Al-Azhar University.",
    },
    {
      name: "English React Certificate",
      imageUrl: "/Certificate-Eng-React.jpg",
      description:
        "Certificate in React from Udemy, Completed successfully in 2024.",
    },
    {
      name: "Arabic React Certificate",
      imageUrl: "/Certificate-Arb-React.jpg",
      description:
        "Arabic-language certificate in React from Udemy, Completed successfully in 2024.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="certificates"
      className="bg-darkBackground min-h-screen flex flex-col justify-center items-center py-16"
    >
      <h2 className="text-7xl font-extrabold tracking-wide text-slate-100 text-center mb-10">
        Certificates
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12 max-w-6xl">
        {certificates.map((certificate, index) => (
          <div
            key={index}
            className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            {/* Image wrapper that adapts to any aspect ratio */}
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
                className="bg-primary-500 hover:bg-primary-600 text-textColor py-2 px-4 rounded-full transition-colors"
                onClick={() => setOpenIndex(index)}
              >
                View Certificate
              </button>
            </div>

            {/* Modal */}
            {openIndex === index && (
              <div
                className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 backdrop-blur-sm"
                onClick={() => setOpenIndex(null)}
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
                    className="absolute top-3 right-3 bg-primary-500 hover:bg-primary-600 text-background rounded-full py-1 px-3 text-sm"
                    onClick={() => setOpenIndex(null)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Certificates;
