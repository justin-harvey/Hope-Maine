import * as React from "react";
import { cva } from "class-variance-authority";

import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

// The one label chip. Color is `tone`, structure is `variant`.
export type BadgeTone = "inherit" | "neutral" | "blue" | "sky" | "gold" | "sage" | "ink";

const badgeVariants = cva("inline-flex items-center gap-2 captions", {
  variants: {
    variant: {
      filled: "rounded-2xl border",
      flat: "px-0 py-0",
    },
    size: {
      sm: "px-2 py-1",
      md: "px-3 py-1",
      lg: "px-4 py-2",
    },
  },
  compoundVariants: [{ variant: "flat", class: "px-0 py-0" }],
  defaultVariants: {
    variant: "filled",
    size: "md",
  },
});

const filledTone: Record<BadgeTone, string> = {
  inherit: "border-current/25 bg-current/10 text-current",
  neutral: "border-border bg-cream-200 text-slate-500",
  blue: "border-blue-300 bg-blue-200 text-blue-900",
  sky: "border-blue-700/12 bg-blue-100 text-blue-700",
  gold: "border-gold-800/45 bg-cream-50 text-gold-600",
  sage: "border-green-900/12 bg-green-100 text-green-900",
  ink: "border-blue-900/15 bg-cream-50 text-blue-900",
};

const flatIconTone: Record<BadgeTone, string> = {
  inherit: "text-current",
  neutral: "text-slate-500",
  blue: "text-blue-900",
  sky: "text-blue-900",
  gold: "text-gold-600",
  sage: "text-green-600",
  ink: "text-blue-700",
};

function Badge({
  className,
  variant,
  size,
  tone = "inherit",
  icon,
  children,
  ...props
}: React.ComponentProps<"span"> & {
  variant?: "filled" | "flat";
  size?: "sm" | "md" | "lg";
  tone?: BadgeTone;
  icon?: IconName;
}) {
  const isFlat = variant === "flat";

  return (
    <span
      className={cn(badgeVariants({ variant, size }), isFlat ? "text-current/80" : filledTone[tone], className)}
      {...props}
    >
      {icon ? (
        <span aria-hidden className={cn("inline-flex shrink-0", isFlat && flatIconTone[tone])}>
          <Icon name={icon} size="xs" />
        </span>
      ) : null}
      {children}
    </span>
  );
}

export { Badge };
