// Blank template. The Code Enforcement Officer, permit forms, and issued-
// permit record ship absent; the page renders a "Not published yet" state
// until a town fills them in (or manages the documents through the admin).

export type CodeEnforcementOfficer = {
  name: string;
  title: string;
  credentials: string;
  bio: string;
  photo: string;
  address: { line1: string; line2: string };
  phone: string;
  email: string;
  officeDay: string;
};

export const codeEnforcementOfficer: CodeEnforcementOfficer | null = null;

export const codeEnforcementDocuments: { label: string; href: string }[] = [];

export type IssuedBuildingPermits = { count: number; note: string; href: string };

export const issuedBuildingPermits: IssuedBuildingPermits | null = null;
