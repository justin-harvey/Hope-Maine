export function AlertBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gold-500 text-navy-950">
      <div className="mx-auto flex max-w-6xl items-start gap-3 px-6 py-3 text-sm font-medium">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="mt-0.5 shrink-0"
        >
          <path
            d="M12 9v4m0 4h.01M10.29 3.86l-8.18 14.18A1.5 1.5 0 0 0 3.4 20.5h17.2a1.5 1.5 0 0 0 1.3-2.46L13.7 3.86a1.5 1.5 0 0 0-2.6 0Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p>{children}</p>
      </div>
    </div>
  );
}
