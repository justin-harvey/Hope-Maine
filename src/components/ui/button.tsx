import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// One button. Square corners, solid fill or 2px stroke, no shadow and no
// motion. Every size clears the 44px minimum touch target.
const buttonVariants = cva(
  "focus-ring-only inline-flex min-h-[var(--tap-min)] items-center justify-center gap-2 border-2 text-center font-semibold no-underline disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary action: navy fill, white label (10.4:1).
        primary: "border-navy bg-navy text-ink-inverse hover:bg-navy-dark hover:border-navy-dark",
        // Secondary: white fill, navy stroke and label.
        secondary: "border-navy bg-canvas text-navy hover:bg-surface-2",
        // Destructive/urgent.
        danger: "border-red bg-red text-ink-inverse hover:bg-[#8f0707] hover:border-[#8f0707]",
        // Quiet: reads as a link but keeps the button target size.
        quiet: "border-transparent bg-transparent text-blue-link underline underline-offset-2 hover:decoration-[3px]",
      },
      size: {
        md: "px-5 py-2.5 body-sm",
        lg: "px-6 py-3 body",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

function Button({
  className,
  variant,
  size,
  fullWidth,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, fullWidth }), className)} {...props} />
  );
}

export { Button, buttonVariants };
