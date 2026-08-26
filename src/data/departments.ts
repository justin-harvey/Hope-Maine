// Department/service list is real — sourced from the current hopemaine.org
// "Town Services" page (screenshot provided 2026-08-26). Contact details and
// hours weren't shown on that page and are still PLACEHOLDER. The `website`
// links below are real, confirmed via a full site crawl (provided
// 2026-08-26) that captured the outbound links those department pages use.

export type Department = {
  name: string;
  description: string;
  phone: string;
  email: string;
  hours: string;
  /** Present when the department has a dedicated page at /departments/[slug]. */
  slug?: string;
  /** An external resource the department page links out to. */
  website?: { label: string; href: string };
};

export const departments: Department[] = [
  {
    name: "Town Office",
    description:
      "General administration, vehicle registration, dog licensing, voter registration, and general assistance. Staffed by the Town Clerk, Town Administrator, and Bookkeeper — see Town Government for names and emails.",
    phone: "(207) 763-4199",
    email: "clerk@hopemaine.org",
    hours: "PLACEHOLDER — Mon–Thu, 8:00 AM–4:00 PM",
  },
  {
    name: "Roads",
    description: "Road maintenance, plowing, and drainage.",
    phone: "PLACEHOLDER",
    email: "PLACEHOLDER",
    hours: "PLACEHOLDER",
  },
  {
    name: "Animal Control",
    description: "Dog licensing and animal complaints.",
    phone: "PLACEHOLDER",
    email: "PLACEHOLDER",
    hours: "PLACEHOLDER",
    website: { label: "PAWS Animal Adoption Center", href: "https://www.pawsadoption.org/" },
  },
  {
    name: "Fire Department",
    description: "Volunteer fire department and emergency response.",
    phone: "PLACEHOLDER (non-emergency)",
    email: "PLACEHOLDER",
    hours: "Emergency: dial 911",
  },
  {
    name: "Code Enforcement",
    description:
      "Building permits, plumbing permits, land use ordinance questions, and code compliance. Staffed by Zachary Herrick, Code Enforcement Officer / Local Plumbing Inspector.",
    phone: "(207) 763-4199",
    email: "ceo-lpi@hopemaine.org",
    hours: "Part-time — in the office Tuesdays",
    slug: "code-enforcement",
  },
  {
    name: "Cemeteries",
    description: "Town cemetery maintenance and lot information.",
    phone: "PLACEHOLDER",
    email: "PLACEHOLDER",
    hours: "PLACEHOLDER",
  },
  {
    name: "Solid Waste and Recycling",
    description: "Transfer station operations, solid waste disposal, and recycling drop-off.",
    phone: "PLACEHOLDER",
    email: "PLACEHOLDER",
    hours: "PLACEHOLDER",
    website: { label: "Midcoast Solid Waste Corp.", href: "http://www.midcoastsolidwaste.org/" },
  },
  {
    name: "General Assistance",
    description: "Emergency financial assistance for qualifying residents.",
    phone: "PLACEHOLDER",
    email: "PLACEHOLDER",
    hours: "PLACEHOLDER",
  },
  {
    name: "911 Service",
    description: "Addressing and emergency dispatch service information.",
    phone: "Emergency: dial 911",
    email: "PLACEHOLDER",
    hours: "PLACEHOLDER",
  },
  {
    name: "Sheriff's Department",
    description: "Law enforcement services (Knox County Sheriff's Office).",
    phone: "PLACEHOLDER",
    email: "PLACEHOLDER",
    hours: "PLACEHOLDER",
    website: { label: "Knox County Sheriff's Office", href: "http://www.knoxso.com/" },
  },
];
