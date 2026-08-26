import { doc } from "@/lib/documents";

// Real — sourced from the current hopemaine.org Code Enforcement Officer &
// Plumbing Inspector page (screenshots provided 2026-08-26). Document hrefs
// resolve to the files on the current host — see src/lib/documents.ts.
//
// "CMP Form 1190" appeared on the town's page but is Central Maine Power's
// own form and no path for it exists in any export, so it is omitted rather
// than linked to nothing.

export const codeEnforcementOfficer = {
  name: "Zachary Herrick",
  title: "Code Enforcement Officer & Local Plumbing Inspector",
  credentials: "CEO/LPI",
  bio: "The Code Enforcement Officer/Plumbing Inspector works part time and will be in the office on Tuesdays. If you'd like to schedule an appointment with Zach, you can either call the Town Office or email him directly.",
  photo: "/staff/zachary-herrick.jpg",
  address: {
    line1: "441 Camden Rd.",
    line2: "Hope, ME 04847",
  },
  phone: "(207) 763-4199",
  email: "ceo-lpi@hopemaine.org",
  officeDay: "Tuesdays",
};

export const codeEnforcementDocuments = [
  { label: "Building/Land Use Permit Application", href: doc("Documents/How Do I/Building_Permit_Application.pdf") },
  { label: "Building/Land Use Fees", href: doc("Documents/How Do I/Building_and_Land_Use_Permit_Fees_2008.pdf") },
  { label: "Internal Plumbing Permit Application", href: doc("Documents/How Do I/Plumbing_Permit_Form_HHE-211.pdf") },
  { label: "Subsurface Wastewater Application", href: doc("Documents/How Do I/Septic_System_Application_HHE-200.pdf") },
  { label: "Plumbing Fees", href: doc("Documents/How Do I/Plumbing_Fee_Schedule_3.9.2017(1).pdf") },
  { label: "Address/Road Entrance Permit Application (Local)", href: doc("Documents/How Do I/Driveway-Entrance_Permit_-_Town_and_Private_Roads.pdf") },
];

export const issuedBuildingPermits = {
  count: 104,
  note: "The full log of issued building permits (104 documents) is maintained at the Town Office and on hopemaine.org — too long to list here individually.",
  href: "https://www.hopemaine.org/code_enforcement_officer_plumbing_inspector/index.php",
};
