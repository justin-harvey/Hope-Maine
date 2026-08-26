import type { CollectionConfig } from "payload";

import { isStaff } from "../access";
import { revalidateFrontend } from "../hooks/revalidateFrontend";

/**
 * The town's standing boards and committees.
 *
 * Separate from Meetings on purpose: this is the board itself — how often it
 * sits, where, and how to get on its agenda — while Meetings holds the dated
 * occurrences.
 *
 * Four of these shipped with the schedule marked PLACEHOLDER, because the
 * exports never carried it. Nobody outside the Town Office knows when the
 * Board of Appeals sits, which makes this exactly the content that has to be
 * editable by the town rather than by whoever is holding the repository.
 */
export const Boards: CollectionConfig = {
  slug: "boards",
  labels: { singular: "Board or committee", plural: "Boards & committees" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "schedule", "order"],
    description: "Standing boards and committees, and when each one meets.",
    group: "Content",
  },
  access: {
    read: () => true,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  defaultSort: "order",
  hooks: {
    afterChange: [revalidateFrontend(["/", "/meetings", "/government"])],
    afterDelete: [revalidateFrontend(["/", "/meetings", "/government"])],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "schedule",
      type: "text",
      admin: {
        description:
          "When this board normally meets, in plain words — \"Second and fourth Tuesdays of each month, 5:30 PM\". Leave empty if there is no fixed schedule; the page then says \"Not published yet\" rather than inventing one.",
      },
    },
    {
      name: "location",
      type: "text",
      defaultValue: "Hope Town Office",
      admin: { description: "Where it normally meets. An individual meeting can override this." },
    },
    {
      name: "note",
      type: "textarea",
      admin: {
        description:
          "Anything a resident needs to know — how to get an item on the agenda, or that the schedule varies.",
      },
    },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 100,
      admin: {
        position: "sidebar",
        description:
          "Lower numbers come first on the Meetings page. The Select Board is 10 and the Planning Board 20, so leaving this at 100 puts a new committee after both.",
      },
    },
  ],
};
