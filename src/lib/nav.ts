export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Town Government", href: "/government" },
  { label: "Departments & Services", href: "/departments" },
  { label: "Meetings & Agendas", href: "/meetings" },
  { label: "News & Events", href: "/news" },
  { label: "Documents & Forms", href: "/documents" },
  { label: "Contact", href: "/contact" },
];

export const townInfo = {
  name: "Town of Hope, Maine",
  shortName: "Hope, Maine",
  tagline: "A Midcoast Maine community since 1804",
  addressLine1: "Hope Town Office",
  addressLine2: "PLACEHOLDER — 611 Camden Rd",
  cityStateZip: "Hope, ME 04847",
  phone: "PLACEHOLDER — (207) 555-0123",
  fax: "PLACEHOLDER — (207) 555-0124",
  email: "PLACEHOLDER — admin@hopemaine.org",
  officeHours: [
    { days: "Monday – Thursday", hours: "8:00 AM – 4:00 PM" },
    { days: "Friday", hours: "By appointment" },
  ],
};
