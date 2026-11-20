function SectionLayout({ children, className = "" }) {
  return (
    <section
      className={`template flex flex-col items-center justify-center pt-section ${className}`}
    >
      {children}
    </section>
  );
}

export default SectionLayout;
