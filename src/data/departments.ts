// Blank template. List the town's departments and services here. The
// Services page renders whatever is listed; an empty list shows nothing.

export type Department = {
  name: string;
  description: string;
  /** Named contact for the department, when the town publishes one. */
  contact?: { name: string; role: string; address?: string };
  phone: string | null;
  email: string | null;
  hours: string | null;
  /** Extra facts worth surfacing on the card. */
  notes?: string[];
  /** Present when the department has a dedicated page at /departments/[slug]. */
  slug?: string;
  /** External resources this department points residents to. */
  links?: { label: string; href: string }[];
};

export const departments: Department[] = [];
