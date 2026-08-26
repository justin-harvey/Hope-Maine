import { faqCategories, faqs, type Faq } from "@/data/faqs";
import { faqSlug } from "@/lib/utils";

export type FaqEntry = Faq & { slug: string };

/**
 * Every answer with its slug attached.
 *
 * Slugs are derived from the question text, so a reworded question changes
 * its own URL rather than quietly leaving a link pointing at the wrong
 * answer. That is a deliberate trade: renaming a question breaks its old
 * link, which is visible, instead of silently mismatching, which is not.
 */
export const faqEntries: FaqEntry[] = faqs.map((faq) => ({ ...faq, slug: faqSlug(faq.question) }));

export function getFaq(slug: string): FaqEntry | undefined {
  return faqEntries.find((entry) => entry.slug === slug);
}

/** Answers grouped in the order the categories are declared. */
export function faqsByCategory(): { category: string; entries: FaqEntry[] }[] {
  return faqCategories
    .map((category) => ({
      category,
      entries: faqEntries.filter((entry) => entry.category === category),
    }))
    .filter((group) => group.entries.length > 0);
}

/** The other answers in the same category, for onward navigation. */
export function relatedFaqs(entry: FaqEntry): FaqEntry[] {
  return faqEntries.filter((other) => other.category === entry.category && other.slug !== entry.slug);
}

/** Stable anchors so other pages can link straight to a category. */
export const categoryAnchors: Record<string, string> = {
  "Vehicles & Registration": "vehicles",
  "Licenses & Vital Records": "licenses",
  "Property & Permits": "property-taxes",
  "Town Government": "town-government",
  "Community Services": "community-services",
};
