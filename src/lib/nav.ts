import { town, townDisplayName, townShortName } from "@/town.config";

export type NavItem = {
  label: string;
  href: string;
};

// Seven primary destinations, after the GOV.UK/USWDS ceiling of about
// seven. Home is reached through the masthead seal, not a nav item.
// Secondary destinations live in the footer and are linked in context.
export const primaryNav: NavItem[] = [
  { label: "How Do I...?", href: "/how-do-i" },
  { label: "Services", href: "/departments" },
  { label: "Government", href: "/government" },
  { label: "Meetings", href: "/meetings" },
  { label: "Documents", href: "/documents" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export const secondaryNav: NavItem[] = [
  { label: `About ${town.name}`, href: "/about" },
  { label: "Schools", href: "/schools" },
];

// The header and footer read the town's identity and contact details from
// this object, which is assembled from src/town.config.ts so there is one
// place to change them. The field names (addressLine1/2) are kept for the
// components that already consume them.
export const townInfo = {
  name: townDisplayName,
  shortName: townShortName,
  tagline: town.tagline,
  addressLine1: town.contact.officeName,
  addressLine2: town.contact.addressLine,
  cityStateZip: town.contact.cityStateZip,
  phone: town.contact.phone,
  fax: town.contact.fax,
  email: town.contact.email,
  officeHours: town.contact.officeHours,
};
