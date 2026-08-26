export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Town Government", href: "/government" },
  { label: "Departments & Services", href: "/departments" },
  { label: "Meetings & Agendas", href: "/meetings" },
  { label: "News", href: "/news" },
  { label: "Documents & Forms", href: "/documents" },
  { label: "How Do I...?", href: "/how-do-i" },
  { label: "About Hope", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Address, phone, and fax are real (hopemaine.org content export,
// 2026-08-26). Office hours below come from the General Assistance FAQ,
// which states the Town Office's "regular business hours" — worth
// confirming they apply to all services, not just General Assistance.
export const townInfo = {
  name: "Town of Hope, Maine",
  shortName: "Hope, Maine",
  tagline: "A Midcoast Maine community since 1804",
  addressLine1: "Hope Town Office",
  addressLine2: "441 Camden Rd",
  cityStateZip: "Hope, ME 04847",
  phone: "(207) 763-4199",
  fax: "(207) 763-4195",
  email: "admin@hopemaine.org",
  officeHours: [
    { days: "Tuesday, Wednesday & Friday", hours: "8:30 AM – 4:30 PM" },
    { days: "Thursday", hours: "12:00 PM – 6:00 PM" },
    { days: "Monday", hours: "Closed" },
  ],
};
