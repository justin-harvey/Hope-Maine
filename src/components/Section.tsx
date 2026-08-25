export function Section({
  title,
  description,
  children,
  className = "",
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-6xl px-6 py-12 ${className}`}>
      {title && (
        <h2 className="font-serif text-2xl font-semibold text-navy-950">{title}</h2>
      )}
      {description && <p className="mt-2 max-w-2xl text-navy-900/70">{description}</p>}
      <div className={title || description ? "mt-6" : ""}>{children}</div>
    </section>
  );
}
