// Real content — from the hopemaine.org staff directory screenshot, the
// "How Do I" export, and the Select Board / Planning Board page exports
// (all 2026-08-26). Committees without an exported page keep PLACEHOLDER
// rosters and schedules.

export const selectBoard = {
  meets:
    "Generally the second and fourth Tuesdays of each month at 5:30 PM at the Town Office. All meetings are open to the public.",
  agendaNote:
    "Residents who wish to place items on the Select Board meeting agenda may e-mail the Town Administrator at admin@hopemaine.org, or call the Town Office at (207) 763-4199.",
  boardEmail: "selectboard@hopemaine.org",
  members: [
    { name: "Sarah Ann Smith", role: "Chair", email: "ssmith@hopemaine.org", termExpires: "2026" },
    {
      name: "Charles Weidman",
      role: "Vice Chair",
      email: "cweidman@hopemaine.org",
      termExpires: "2028",
    },
    { name: "Crystal Robinson", role: "Member", email: "crobinson@hopemaine.org", termExpires: "2027" },
    { name: "Wayne Luce", role: "Member", email: "wluce@hopemaine.org", termExpires: "2026" },
    { name: "Vacant", role: "Seat vacant", email: null, termExpires: "2028" },
  ],
};

export const townOfficials = [
  {
    name: "Pamela Jordan",
    role: "Town Clerk",
    otherRoles: ["Tax Collector", "Deputy Treasurer", "Deputy Registrar of Voters"],
    email: "clerk@hopemaine.org",
  },
  {
    name: "Sarah Chapman",
    role: "Deputy Town Clerk",
    otherRoles: ["Deputy Tax Collector", "Deputy Treasurer", "Deputy Registrar of Voters"],
    email: "deputyclerk@hopemaine.org",
  },
  {
    name: "Samantha Mank",
    role: "Town Administrator",
    otherRoles: [
      "Treasurer",
      "Registrar of Voters",
      "General Assistance Administrator",
      "Deputy Code Enforcement Officer",
    ],
    email: "admin@hopemaine.org",
  },
  {
    name: "Shani Dennison",
    role: "Bookkeeper",
    otherRoles: [],
    email: "finance@hopemaine.org",
  },
  {
    name: "Zachary Herrick",
    role: "Code Enforcement Officer",
    otherRoles: ["Local Plumbing Inspector"],
    email: "ceo-lpi@hopemaine.org",
  },
];

export const boardsAndCommittees = [
  {
    name: "Planning Board",
    description:
      "Reviews land use applications, site plans, and subdivisions under the Town's Land Use and Subdivision Ordinances.",
    meets: "First Tuesday of each month at 6:30 PM at the Town Office, and at other times as needed.",
    members: [
      { name: "Joseph Curll", termExpires: "2027" },
      { name: "Molly Luce", termExpires: "2028" },
      { name: "Robert Hall Jr.", termExpires: "2029" },
      { name: "Jason Simms", termExpires: "2030" },
    ],
  },
  {
    name: "Board of Appeals",
    description: "Hears appeals of administrative and ordinance decisions.",
    meets: "PLACEHOLDER — schedule not yet captured",
    members: [],
  },
  {
    name: "Budget Committee",
    description:
      "Reviews the annual municipal budget prior to Town Meeting. An elected committee — nomination papers are available each March.",
    meets: "PLACEHOLDER — schedule not yet captured",
    members: [],
  },
  {
    name: "School Committee",
    description:
      "Oversees local school matters. An elected committee — nomination papers are available each March.",
    meets: "PLACEHOLDER — schedule not yet captured",
    members: [],
  },
  {
    name: "Cemetery Committee",
    description: "Oversees town cemetery maintenance and policy.",
    meets: "PLACEHOLDER — schedule not yet captured",
    members: [],
  },
];
