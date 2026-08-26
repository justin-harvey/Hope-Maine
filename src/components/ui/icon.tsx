import { cn } from "@/lib/utils";

// Lightweight inline-SVG icon set. Adapted from CivicChain's Icon component,
// which renders ligatures from a 5MB Material Symbols variable font — too
// heavy for a dozen icons on a small civic site, so this keeps the same
// name/size API but draws simple outline paths instead.
const iconPaths = {
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  "chevron-right": "m9 6 6 6-6 6",
  "chevron-down": "m6 9 6 6 6-6",
  "chevron-up": "m6 15 6-6 6 6",
  "arrow-right": "M5 12h14M13 6l6 6-6 6",
  "arrow-left": "M19 12H5M11 6l-6 6 6 6",
  pause: "M9 5v14M15 5v14",
  play: "M7 4.5v15l13-7.5-13-7.5Z",
  check: "M5 13l4 4L19 7",
  "check-circle": "M9 12l2 2 4-4M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  info: "M12 11v5m0-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  mail: "M4 6h16v12H4V6Zm0 0 8 7 8-7",
  phone:
    "M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.6 21 3 12.4 3 2c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z",
  location: "M12 22s7-7.5 7-12.5A7 7 0 0 0 5 9.5C5 14.5 12 22 12 22Zm0-9.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  calendar: "M7 3v3M17 3v3M4 8h16M5 6h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z",
  document: "M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm7 0v5h5",
  shield: "M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3Z",
  clock: "M12 7v5l3 3M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  warning: "M12 9v4m0 4h.01M10.29 3.86l-8.18 14.18A1.5 1.5 0 0 0 3.4 20.5h17.2a1.5 1.5 0 0 0 1.3-2.46L13.7 3.86a1.5 1.5 0 0 0-2.6 0Z",
  "external-link": "M14 5h5v5M19 5l-9 9M6 5H5a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-1",
} as const;

export type IconName = keyof typeof iconPaths;

export const iconNames = Object.keys(iconPaths) as IconName[];

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";
export type IconWeight = "light" | "regular" | "bold";

const sizePx: Record<IconSize, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
};

const weightStroke: Record<IconWeight, number> = {
  light: 1.25,
  regular: 1.75,
  bold: 2.25,
};

type IconProps = {
  name: IconName;
  size?: IconSize;
  weight?: IconWeight;
  /** Accessible name. Omit for icons that only decorate adjacent text. */
  label?: string;
  className?: string;
};

export function Icon({ name, size = "md", weight = "regular", label, className }: IconProps) {
  const px = sizePx[size];
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("inline-block shrink-0 align-middle", className)}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <path
        d={iconPaths[name]}
        stroke="currentColor"
        strokeWidth={weightStroke[weight]}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
