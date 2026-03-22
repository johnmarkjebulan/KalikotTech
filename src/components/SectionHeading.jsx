function SectionHeading({ tag, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {tag ? <span className="section-tag">{tag}</span> : null}
      <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base text-slate-600 sm:text-lg">{description}</p> : null}
    </div>
  );
}

export default SectionHeading;
