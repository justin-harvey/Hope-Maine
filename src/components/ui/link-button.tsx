import Link from "next/link";
import type { ComponentProps } from "react";
import type { VariantProps } from "class-variance-authority";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LinkButtonProps = VariantProps<typeof buttonVariants> & {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function LinkButton({ href, className, children, ...props }: LinkButtonProps) {
  const isExternal = href.startsWith("http");

  return (
    <Button asChild className={cn(className)} {...props}>
      {isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <Link href={href as ComponentProps<typeof Link>["href"]}>{children}</Link>
      )}
    </Button>
  );
}
