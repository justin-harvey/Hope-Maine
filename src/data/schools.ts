// Blank template. Add the town's school districts and administrative units
// here, or manage this content through the admin once it lives there.

export const schoolsIntro =
  "Add a short description of the schools serving the town here, in src/data/schools.ts.";

export type SchoolEntry = {
  name: string;
  person: string;
  address: string[];
  phone: string;
  fax: string | null;
  website: string;
};

export type SchoolDistrict = {
  district: string;
  entries: SchoolEntry[];
};

export const schoolDistricts: SchoolDistrict[] = [];
