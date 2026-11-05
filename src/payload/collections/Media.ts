import type { CollectionConfig } from "payload";

import { isStaff } from "../access";

/**
 * Images.
 *
 * `alt` is required at the schema level, not merely encouraged in a style
 * guide. A rich-text editor is a machine for undoing accessibility work, and
 * an image with no alternative text is the single most common way a
 * compliant page stops being compliant. With ADA Title II putting small
 * towns under WCAG 2.1 AA by 26 April 2027, this needs to be enforced by the
 * software rather than remembered by whoever is covering the front desk.
 */
export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "alt",
    description: "Photographs and images used on the site.",
    group: "Content",
  },
  access: {
    read: () => true,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  upload: {
    staticDir: "public/uploads/media",
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "wide", width: 1600, height: 900, position: "centre" },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description:
          "Describe the image for someone who cannot see it. If it is decorative and adds nothing, say so — e.g. \"Decorative photograph of the town common\".",
      },
    },
    {
      name: "credit",
      type: "text",
      admin: {
        description: "Photographer or source, if one needs crediting.",
        position: "sidebar",
      },
    },
  ],
};
