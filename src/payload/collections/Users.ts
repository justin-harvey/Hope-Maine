import type { CollectionConfig } from "payload";

import { isAdmin, isAdminField, isAdminOrSelf } from "../access";

/**
 * Town staff accounts: email and password, no GitHub account required.
 *
 * This is the whole reason the site runs Payload rather than a Git-backed
 * CMS. "You need a GitHub account to post the agenda" is not a workable
 * instruction for a town office of five people.
 */
export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    tokenExpiration: 60 * 60 * 8, // A working day; staff re-authenticate daily.
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role"],
    group: "Administration",
  },
  access: {
    read: isAdminOrSelf,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: { description: "Shown as the author on news posts." },
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      // Without this an editor could promote themselves by editing their
      // own record, which `isAdminOrSelf` otherwise permits.
      access: { create: isAdminField, update: isAdminField },
      options: [
        { label: "Editor — can add and edit content", value: "editor" },
        { label: "Administrator — can also manage accounts", value: "admin" },
      ],
    },
    {
      name: "title",
      type: "text",
      admin: {
        description: "Job title, e.g. Town Clerk. Optional.",
        position: "sidebar",
      },
    },
  ],
};
