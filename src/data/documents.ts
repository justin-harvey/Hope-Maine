// Blank template. Documents are uploaded and categorised through the admin
// (Documents collection). This static list holds links to a prior site's
// files during a migration; with no prior site it ships empty.

export type TownDocument = { label: string; href: string };

export type DocumentCategory = {
  category: string;
  description?: string;
  documents: TownDocument[];
};

export const documentCategories: DocumentCategory[] = [];
