import {
  BoldFeature,
  HeadingFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

import { isPublishedOrStaff, isStaff } from "../access";
import { revalidateFrontend } from "../hooks/revalidateFrontend";

export const News: CollectionConfig = {
  slug: "news",
  labels: { singular: "News post", plural: "News and notices" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedOn", "_status"],
    description: "Notices, hearings, and announcements shown on the home page and /news.",
    group: "Content",
    preview: () => "/news",
  },
  access: {
    read: isPublishedOrStaff,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  // Drafts let someone write a hearing notice on Tuesday and publish it on
  // Thursday without it appearing in between.
  versions: { drafts: true, maxPerDoc: 20 },
  defaultSort: "-publishedOn",
  hooks: {
    afterChange: [revalidateFrontend(["/", "/news"])],
    afterDelete: [revalidateFrontend(["/", "/news"])],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "publishedOn",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" },
        description: "Controls the order posts appear in.",
      },
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
      maxLength: 300,
      admin: {
        description:
          "One or two plain sentences. This is what shows on the home page, so it has to make sense on its own.",
      },
    },
    {
      name: "body",
      type: "richText",
      /**
       * A deliberately short feature list.
       *
       * The site currently passes at 0 WCAG AA failures and 0 pairs below
       * AAA. Every feature added here is a way for that to stop being true:
       * arbitrary heading levels break the document outline, coloured text
       * conveys meaning by colour alone, pasted Word markup drags in inline
       * styles that override the design tokens.
       *
       * Headings are capped at h2/h3 because the post title is the page's
       * h1 — offering h1 here would produce two on the page.
       */
      editor: lexicalEditor({
        features: () => [
          ParagraphFeature(),
          HeadingFeature({ enabledHeadingSizes: ["h2", "h3"] }),
          BoldFeature(),
          ItalicFeature(),
          UnorderedListFeature(),
          OrderedListFeature(),
          LinkFeature({ enabledCollections: ["documents"] }),
        ],
      }),
      admin: {
        description:
          "Optional. Leave empty for a short notice that the summary already covers.",
      },
    },
    {
      name: "attachments",
      type: "relationship",
      relationTo: "documents",
      hasMany: true,
      admin: {
        description: "Warrants, notices, budgets — anything residents need to read alongside this post.",
      },
    },
  ],
};
