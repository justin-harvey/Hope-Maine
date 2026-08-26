import Link from "next/link";
import type { ComponentProps } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import type { SurfaceTone } from "@/lib/design-system-types";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

// Button's `icon` prop only renders in non-asChild mode (Slot needs exactly
// one child), so a link-flavored button doesn't support it either.
type LinkButtonProps = Omit<VariantProps<typeof buttonVariants>, "asChild"> & {
  href: string;
  children: React.ReactNode;
  className?: string;
  tone?: SurfaceTone;
};

export function LinkButton({ href, className, ...props }: LinkButtonProps) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <Button asChild className={cn(className)} {...props}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {props.children}
        </a>
      </Button>
    );
  }

  return (
    <Button asChild className={cn(className)} {...props}>
      <Link href={href as ComponentProps<typeof Link>["href"]}>{props.children}</Link>
    </Button>
  );
}
