// Blank template. News and notices are written and published in the admin
// (News collection). This static list is only seed input and ships empty.

export type NewsPost = {
  title: string;
  date: string;
  summary: string;
  body?: string[];
  documents?: { label: string; href: string }[];
};

export const newsPosts: NewsPost[] = [];
