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
      {title && <h2 className="font-display text-2xl text-blue-900">{title}</h2>}
      {description && <p className="mt-2 max-w-2xl body text-slate-500">{description}</p>}
      <div className={title || description ? "mt-6" : ""}>{children}</div>
    </section>
  );
}
