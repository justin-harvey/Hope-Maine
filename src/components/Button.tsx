import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-forest-700 text-white hover:bg-forest-600",
  secondary: "bg-gold-500 text-navy-950 hover:bg-gold-600",
  ghost: "bg-white text-navy-950 border border-navy-950/20 hover:bg-navy-950/5",
};

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const isExternal = href.startsWith("http");
  const classes = `inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-colors ${variants[variant]} ${className}`;

  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
