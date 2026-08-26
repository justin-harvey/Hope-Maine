import type { Access, FieldAccess } from "payload";

/**
 * Two roles, deliberately.
 *
 * `editor` covers the people who actually keep the site current — the Town
 * Clerk posting an agenda on a Friday afternoon, the Administrator adding a
 * notice. They can write content and upload files, and that is all.
 *
 * `admin` additionally manages accounts. Keeping that separate means adding
 * a seasonal or interim staff member never hands out the ability to create
 * more logins, and a compromised editor account cannot escalate itself.
 */
export type Role = "admin" | "editor";

function roleOf(user: unknown): Role | null {
  if (!user || typeof user !== "object") return null;
  const role = (user as { role?: unknown }).role;
  return role === "admin" || role === "editor" ? role : null;
}

/** Anyone with a valid login. */
export const isStaff: Access = ({ req }) => roleOf(req.user) !== null;

/** Account management and other destructive operations. */
export const isAdmin: Access = ({ req }) => roleOf(req.user) === "admin";

export const isAdminField: FieldAccess = ({ req }) => roleOf(req.user) === "admin";

/**
 * Admins manage everyone; an editor may still open and update their own
 * record, so they can change their name or password without a ticket.
 */
export const isAdminOrSelf: Access = ({ req }) => {
  if (roleOf(req.user) === "admin") return true;
  if (!req.user) return false;
  return { id: { equals: req.user.id } };
};

/**
 * Published content is world-readable; drafts are not. Payload's draft
 * system stores both in the same collection, so without this a
 * work-in-progress notice would be served by the REST API to anyone who
 * asked for it.
 */
export const isPublishedOrStaff: Access = ({ req }) => {
  if (roleOf(req.user) !== null) return true;
  return { _status: { equals: "published" } };
};
