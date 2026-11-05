// Blank template. Add the town's "How Do I...?" answers here. The categories
// below are a generic municipal starting set; the questions ship empty so the
// How Do I page renders with nothing listed until a town fills it in.

export type Faq = {
  question: string;
  category: string;
  answer: string[];
  links?: { label: string; href: string }[];
};

export const faqCategories = [
  "Vehicles & Registration",
  "Licenses & Vital Records",
  "Property & Permits",
  "Town Government",
  "Community Services",
];

export const faqs: Faq[] = [];
