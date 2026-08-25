export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-navy-950/10 bg-white p-6 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
