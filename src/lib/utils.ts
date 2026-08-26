import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// A short, readable slug for a question — "How do I pay my property
// taxes?" becomes "pay-my-property-taxes" rather than repeating "how-do-i"
// in every URL that points at one.
export function faqSlug(question: string) {
  return slugify(question.replace(/^how do i\s*/i, "").replace(/\?$/, ""));
}

/**
 * Link to a single answer.
 *
 * Each answer has its own page. The earlier design sent every task link to
 * one long accordion and relied on the right row being open when you
 * arrived — first through JavaScript, then through a `?q=` parameter read on
 * the server. Both *worked*, and both were still the wrong shape: you landed
 * eighteen hundred pixels down a page of twenty-five collapsed rows, and one
 * open row among them is easy to miss. A page with one answer on it has no
 * open state to get wrong, nothing to scroll past, and a URL worth sharing.
 *
 * Generate hrefs with this rather than writing them by hand, so a link can
 * never point at a slug that drifted from its question's wording.
 */
export function faqHref(question: string) {
  return `/how-do-i/${faqSlug(question)}`;
}
