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

// A short, readable anchor for an FAQ question — "How do I pay my property
// taxes?" becomes "pay-my-property-taxes" rather than repeating "how-do-i"
// in every link that points at one.
export function faqSlug(question: string) {
  return slugify(question.replace(/^how do i\s*/i, "").replace(/\?$/, ""));
}

/**
 * Link to a single FAQ answer, opened.
 *
 * Carries the slug twice on purpose, and neither copy is redundant:
 *   ?q=  is read on the server, which renders that <details> already open —
 *        so the answer is open in the delivered HTML, with no JavaScript.
 *   #    is the anchor the browser itself scrolls to, also without script.
 *
 * Doing this in JavaScript alone was the earlier bug: with scripts blocked
 * (Brave and similar block by default) the page scrolled to the question
 * and left it shut.
 */
export function faqHref(question: string) {
  const slug = faqSlug(question);
  return `/how-do-i?q=${slug}#${slug}`;
}
