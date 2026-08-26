import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { Icon, type IconName, type IconSize } from "@/components/ui/icon";
import type { SurfaceTone } from "@/lib/design-system-types";
import { cn } from "@/lib/utils";

// The one button. Every look is a prop — variant, size, tone, icon,
// fullWidth — never a one-off class at the call site.
const buttonVariants = cva(
  "group/button inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium outline-none transition-all duration-[var(--dur-fast)] ease-[var(--ease-soft)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none [&_svg]:pointer-events-none shrink-0",
  {
    variants: {
      variant: {
        filled:
          "rounded-2xl btn-filled shadow-md hover:shadow-lg active:shadow-md hover:-translate-y-0.5 active:translate-y-0",
        soft: "rounded-2xl btn-soft shadow-sm hover:-translate-y-px active:translate-y-0",
        outline: "rounded-2xl border btn-outline hover:-translate-y-px active:translate-y-0",
        ghost: "rounded-2xl btn-ghost",
        underline: "rounded-none border-b-2 btn-quiet",
      },
      size: {
        sm: "h-9 px-4 captions",
        md: "h-11 px-5 body-sm",
        lg: "h-12 px-6 body",
        xl: "h-14 px-8 body-lg",
      },
      fullWidth: {
        true: "w-full",
      },
      active: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { variant: "underline", class: "px-2" },
      { variant: "underline", active: false, class: "btn-quiet-dim" },
    ],
    defaultVariants: {
      variant: "filled",
      size: "md",
    },
  },
);

const iconGlyphSize: Record<NonNullable<VariantProps<typeof buttonVariants>["size"]>, IconSize> = {
  sm: "xs",
  md: "sm",
  lg: "sm",
  xl: "md",
};

function Button({
  className,
  variant,
  size,
  tone,
  fullWidth,
  active,
  icon,
  iconPosition = "trailing",
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    tone?: SurfaceTone;
    icon?: IconName;
    iconPosition?: "leading" | "trailing";
  }) {
  const Comp = asChild ? Slot : "button";
  const toneClass = tone ? `ctl-tone-${tone}` : undefined;
  const hasChildren = React.Children.count(children) > 0;
  const glyph = !asChild && icon ? <Icon name={icon} size={iconGlyphSize[size ?? "md"]} /> : null;
  const iconOnly = !asChild && Boolean(icon) && !hasChildren;

  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size, fullWidth, active }),
        toneClass,
        variant === "underline" &&
          (active === false ? "button-border-transparent" : "button-border-current"),
        iconOnly && "aspect-square px-0",
        className,
      )}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {iconPosition === "leading" ? glyph : null}
          {children}
          {iconPosition === "trailing" ? glyph : null}
        </>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
