import type { CollectionConfig } from "payload";

import { revalidateFrontend } from "../hooks/revalidateFrontend";
import { isStaff } from "../access";
import { town } from "@/town.config";

/**
 * The town's PDFs — ordinances, minutes, budgets, tax maps, permit forms.
 *
 * This is the collection that actually earns the CMS. Posting a document is
 * the town's real weekly job, and today it means asking a vendor. The
 * categories mirror `src/data/documents.ts` so an uploaded file lands under
 * the same heading residents already know.
 *
 * Until a category has uploads here, `/documents` keeps showing the legacy
 * links to the files still hosted on the town's old site. An upload supersedes
 * the legacy entry with the same title, so the migration can happen one
 * document at a time instead of as a single flag day.
 *
 * The categories come from src/town.config.ts so each town can file its
 * documents under the headings its residents already know.
 */
export const DOCUMENT_CATEGORIES = town.documentCategories;

export const Documents: CollectionConfig = {
  slug: "documents",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "adoptedOn", "updatedAt"],
    description: "Ordinances, reports, forms, maps, agendas, and minutes.",
    group: "Content",
  },
  access: {
    read: () => true,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  hooks: {
    afterChange: [revalidateFrontend(["/", "/news", "/documents", "/meetings"])],
    afterDelete: [revalidateFrontend(["/", "/news", "/documents", "/meetings"])],
  },
  upload: {
    staticDir: "public/uploads/documents",
    mimeTypes: ["application/pdf", "image/*", "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        description:
          "How this appears in the list. Write it the way a resident would look for it — \"Shoreland Zone Ordinance\", not \"shoreland_zone_ord_final_v3\".",
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: DOCUMENT_CATEGORIES.map((c) => ({ label: c, value: c })),
    },
    {
      name: "adoptedOn",
      type: "date",
      admin: {
        description: "Date adopted, approved, or issued. Optional.",
        position: "sidebar",
        date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" },
      },
    },
    {
      /**
       * A scanned PDF is a picture of a document: a screen reader finds
       * nothing in it, and no amount of care elsewhere on the site fixes
       * that. Forcing an explicit answer at upload time is the cheapest
       * point to catch it — "Not checked yet" is a real option so that
       * nobody has to guess, and the value is reported on `/documents`.
       */
      name: "textQuality",
      type: "select",
      required: true,
      defaultValue: "unchecked",
      admin: {
        position: "sidebar",
        description:
          "Open the PDF and try to select a sentence with your cursor. If nothing highlights, it is a scan and needs OCR before it can be posted as accessible.",
      },
      options: [
        { label: "Selectable text — accessible", value: "text" },
        { label: "Scanned image — needs OCR", value: "scan" },
        { label: "Not checked yet", value: "unchecked" },
      ],
    },
  ],
};
