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

// Address/phone/email below are from public search listings for the Town of
// Hope, not a screenshot of hopemaine.org itself — worth a quick confirm
// against the real site. Office hours are still unverified PLACEHOLDER.
export const townInfo = {
  name: "Town of Hope, Maine",
  shortName: "Hope, Maine",
  tagline: "A Midcoast Maine community since 1804",
  addressLine1: "Hope Town Office",
  addressLine2: "441 Camden Rd",
  cityStateZip: "Hope, ME 04847",
  phone: "(207) 763-4199",
  fax: "PLACEHOLDER — not yet confirmed",
  email: "admin@hopemaine.org",
  officeHours: [
    { days: "Monday – Thursday", hours: "PLACEHOLDER — 8:00 AM – 4:00 PM" },
    { days: "Friday", hours: "PLACEHOLDER — By appointment" },
  ],
};
