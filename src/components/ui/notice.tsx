import * as React from "react";

import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type NoticeVariant = "info" | "warning" | "danger" | "success" | "neutral";

// Status is carried by three signals at once — a thick left bar, an icon,
// and a written label — so it never depends on color alone.
const variantClass: Record<NoticeVariant, string> = {
  neutral: "notice",
  info: "notice notice-info",
  warning: "notice notice-warning",
  danger: "notice notice-danger",
  success: "notice notice-success",
};

const variantIcon: Record<NoticeVariant, IconName> = {
  neutral: "info",
  info: "info",
  warning: "warning",
  danger: "warning",
  success: "check-circle",
};

const variantLabel: Record<NoticeVariant, string> = {
  neutral: "Note",
  info: "Information",
  warning: "Important",
  danger: "Warning",
  success: "Success",
};

const variantInk: Record<NoticeVariant, string> = {
  neutral: "text-ink",
  info: "text-blue-link",
  warning: "text-amber",
  danger: "text-red",
  success: "text-green",
};

function Notice({
  variant = "neutral",
  title,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & { variant?: NoticeVariant; title?: string }) {
  return (
    <div role="note" className={cn(variantClass[variant], "p-4 sm:p-5", className)} {...props}>
      <p className={cn("flex items-center gap-2 overline", variantInk[variant])}>
        <Icon name={variantIcon[variant]} size="sm" />
        {title ?? variantLabel[variant]}
      </p>
      <div className="mt-2 measure body-sm text-ink">{children}</div>
    </div>
  );
}

export { Notice };
