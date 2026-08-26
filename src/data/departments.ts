// Department list is real — from the hopemaine.org "Town Services" index.
//
// Contact details below are pulled from content we actually have: the
// "How Do I…?" export (burn permits, trash, General Assistance, cemetery
// plots, complaints) and the site crawl's outbound links. The nine
// town_services/* detail pages and town_office/index.php have NOT been
// exported yet — that is where the remaining per-department phone numbers,
// emails, and hours live. Fields still unknown are left null and render as
// "Not published yet" rather than inventing a value.

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

const TOWN_OFFICE_HOURS = "Tue, Wed & Fri 8:30 AM – 4:30 PM · Thu 12:00 PM – 6:00 PM";

export const departments: Department[] = [
  {
    name: "Town Office",
    description:
      "General administration, vehicle registration, dog licensing, voter registration, vital records, and general assistance.",
    phone: "(207) 763-4199",
    email: "clerk@hopemaine.org",
    hours: TOWN_OFFICE_HOURS,
    notes: [
      "Fax: (207) 763-4195.",
      "Staffed by the Town Clerk, Deputy Town Clerk, Town Administrator, and Bookkeeper — see Town Government for names and emails.",
    ],
  },
  {
    name: "Roads",
    description: "Road maintenance, plowing, and drainage on town roads.",
    phone: "(207) 763-4199",
    email: "admin@hopemaine.org",
    hours: TOWN_OFFICE_HOURS,
    notes: [
      "Report a problem with a town road through the Town Office.",
      "Problems on state highways go to the Maine Department of Transportation.",
    ],
    links: [{ label: "Maine DOT — report a state road issue", href: "http://www.maine.gov/mdot/contact/" }],
  },
  {
    name: "Animal Control",
    description: "Dog licensing and animal complaints.",
    phone: null,
    email: null,
    hours: null,
    notes: [
      "Dogs must be licensed at 6 months, or within 10 days of joining the family if older. License your dog at the Town Office.",
    ],
    links: [{ label: "PAWS Animal Adoption Center", href: "https://www.pawsadoption.org/" }],
  },
  {
    name: "Fire Department",
    description: "Volunteer fire department and emergency response. Issues burn permits.",
    contact: {
      name: "Clarence Keller",
      role: "Fire Chief",
      address: "654 Hatchet Mountain Rd., Hope, ME 04847",
    },
    phone: "(207) 763-4118",
    email: null,
    hours: "Emergency: dial 911",
    notes: [
      "Burn permits are free and can be obtained online, from the Fire Chief, or from Town Office staff.",
    ],
    links: [
      { label: "Get a burn permit online", href: "http://www.wardensreport.com/#!/frontPage" },
      { label: "Maine Wildfire Danger Report", href: "http://mainefireweather.org/" },
    ],
  },
  {
    name: "Code Enforcement",
    description:
      "Building permits, plumbing permits, land use ordinance questions, and code compliance.",
    contact: {
      name: "Zachary Herrick",
      role: "Code Enforcement Officer & Local Plumbing Inspector",
      address: "441 Camden Rd., Hope, ME 04847",
    },
    phone: "(207) 763-4199",
    email: "ceo-lpi@hopemaine.org",
    hours: "Part time — in the office Tuesdays",
    slug: "code-enforcement",
  },
  {
    name: "Cemeteries",
    description: "Town cemetery maintenance and lot information.",
    phone: "(207) 763-4199",
    email: "admin@hopemaine.org",
    hours: TOWN_OFFICE_HOURS,
    notes: [
      "Hope Grove Cemetery and Morey Hill Cemetery. Plots cost $450 each.",
      "Cemetery rules and regulations for both cemeteries are published under Documents & Forms.",
    ],
    links: [{ label: "Morey Hill Cemetery interactive map", href: "https://arcg.is/015LSO" }],
  },
  {
    name: "Solid Waste and Recycling",
    description:
      "Solid waste disposal and recycling through Mid-Coast Solid Waste Corporation, a “pay as you throw” facility. Recycling is free.",
    contact: {
      name: "David St. Laurent",
      role: "Manager, Mid-Coast Solid Waste Corporation",
      address: "PO Box 1016, 90 Union Street, Rockport, ME 04856",
    },
    phone: "(207) 236-2467",
    email: null,
    hours: "Tue – Sat, 8:00 AM – 4:00 PM · Closed Sun, Mon, and holidays",
    notes: [
      "Hope is a charter member along with Camden, Rockport, and Lincolnville.",
      "Non-recyclable trash must go in yellow Pay-As-You-Throw bags: 33-gallon $15.00 per pack of 5, 20-gallon $20.00 per pack of 10.",
    ],
    links: [
      { label: "Mid-Coast Solid Waste Corporation", href: "http://www.midcoastsolidwaste.org/" },
      { label: "Recycling information", href: "http://www.midcoastsolidwaste.org/recycling/" },
    ],
  },
  {
    name: "General Assistance",
    description:
      "Emergency help with housing, fuel, and other basic needs for qualifying residents.",
    contact: { name: "Samantha Mank", role: "General Assistance Administrator" },
    phone: "(207) 763-4199",
    email: "admin@hopemaine.org",
    hours: TOWN_OFFICE_HOURS,
    notes: [
      "In an emergency when the office is closed, contact the Knox County Regional Communications Center at (207) 594-0429 — someone is available 24 hours a day.",
      "You must receive a written decision within 24 hours of applying. Questions or disagreements can go to Maine DHHS at 1-800-442-6003.",
    ],
  },
  {
    name: "911 Service",
    description: "Addressing and emergency dispatch service.",
    phone: "Emergency: dial 911",
    email: null,
    hours: "24 hours",
    notes: ["New addresses and road-entrance permits are issued by Code Enforcement."],
  },
  {
    name: "Sheriff's Department",
    description: "Law enforcement services are provided by the Knox County Sheriff's Office.",
    phone: null,
    email: null,
    hours: null,
    links: [{ label: "Knox County Sheriff's Office", href: "http://www.knoxso.com/" }],
  },
];
