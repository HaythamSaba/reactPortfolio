function GridLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(130, 224, 171, 0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgb(130, 224, 171, 0.5) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        maskImage:
          "radial-gradient(ellipse at center, black 20%, transparent 80%)",
      }}
    />
  );
}

export default GridLines;
