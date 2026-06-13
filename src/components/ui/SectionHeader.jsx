function SectionHeader({
  title,
  firstEmphasisTitle = "",
  secondEmphasisTitle = "",
  description = "",
}) {
  return (
    <div className="flex flex-col gap-4 text-center items-center">
      <h2 className="text-3xl md:text-7xl font-extrabold tracking-wide text-slate-100">
        {title}{" "}
        {firstEmphasisTitle && (
          <span className="text-primary-400">{firstEmphasisTitle}</span>
        )}{" "}
        {secondEmphasisTitle && (
          <span className="text-secondary-400">{secondEmphasisTitle}</span>
        )}
      </h2>
      {description && (
        <p className="text-slate-300 max-w-xl">{description}</p>
      )}{" "}
    </div>
  );
}

export default SectionHeader;
