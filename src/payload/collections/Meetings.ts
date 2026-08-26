import type { CollectionConfig } from "payload";

import { isStaff } from "../access";
import { revalidateFrontend } from "../hooks/revalidateFrontend";

const REVALIDATE = ["/", "/meetings"];

/**
 * Individual dated meetings — the town's actual weekly job.
 *
 * Posting Friday's agenda currently means asking a vendor. Here it is: pick
 * the board, pick the date, attach the PDF. The agenda and minutes are
 * relationships to Documents rather than uploads on this collection, so
 * every PDF the town publishes lands in one library with one set of
 * accessibility checks — the relationship field can create and upload a new
 * document inline, so it is still one pass through the admin.
 */
export const Meetings: CollectionConfig = {
  slug: "meetings",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "board", "startsAt", "status"],
    description: "Scheduled meetings, with agendas and minutes.",
    group: "Content",
    preview: () => "/meetings",
  },
  access: {
    read: () => true,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  defaultSort: "-startsAt",
  hooks: {
    afterChange: [revalidateFrontend(REVALIDATE)],
    afterDelete: [revalidateFrontend(REVALIDATE)],
  },
  fields: [
    {
      /**
       * Derived rather than typed. Staff should not have to write "Select
       * Board — 25 August 2026" by hand and keep it in step with the date
       * field, and a title that disagrees with its own date is worse than no
       * title. It exists only so the admin's lists and relationship pickers
       * have something readable to show.
       */
      name: "title",
      type: "text",
      admin: { hidden: true },
      hooks: {
        beforeChange: [
          async ({ data, req }) => {
            if (!data?.board || !data?.startsAt) return data?.title;

            const board = await req.payload.findByID({
              collection: "boards",
              id: data.board,
              depth: 0,
            });
            const when = new Date(data.startsAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "America/New_York",
            });
            return `${board.name} — ${when}`;
          },
        ],
      },
    },
    {
      name: "board",
      type: "relationship",
      relationTo: "boards",
      required: true,
    },
    {
      name: "startsAt",
      type: "date",
      required: true,
      admin: {
        date: { pickerAppearance: "dayAndTime", displayFormat: "d MMM yyyy, h:mm a" },
        description: "Date and start time. The page lists meetings from this moment on as upcoming.",
      },
    },
    {
      /**
       * A cancelled meeting that still reads as scheduled sends people out
       * on a February night for nothing. Cancelling is one field, and the
       * meeting stays on the page clearly marked rather than vanishing —
       * disappearing looks like a mistake, and residents who already saw it
       * need to be told.
       */
      name: "status",
      type: "select",
      required: true,
      defaultValue: "scheduled",
      admin: { position: "sidebar" },
      options: [
        { label: "Scheduled", value: "scheduled" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Rescheduled — see note", value: "rescheduled" },
      ],
    },
    {
      name: "locationOverride",
      type: "text",
      admin: {
        description:
          "Only if this meeting is somewhere other than the board's usual place — a town meeting at the Fire Station, say. Leave empty to use the board's location.",
      },
    },
    {
      name: "note",
      type: "textarea",
      admin: {
        description:
          "Anything specific to this meeting: a public hearing item, a cancellation reason, the new date if it moved.",
      },
    },
    {
      name: "agenda",
      type: "relationship",
      relationTo: "documents",
      admin: { description: "The agenda PDF. Use \"Create New\" to upload one without leaving this page." },
    },
    {
      name: "minutes",
      type: "relationship",
      relationTo: "documents",
      admin: { description: "Added after the meeting, once the minutes are approved." },
    },
    {
      /**
       * The nine agendas the site shipped with are files on hopemaine.org,
       * not uploads here. Holding the old URL in a field keeps those meetings
       * as real records now, and makes the migration visible: attach an
       * uploaded agenda above and it takes over, exactly as an upload
       * supersedes a legacy link on /documents.
       */
      name: "legacyAgendaUrl",
      type: "text",
      admin: {
        position: "sidebar",
        description:
          "Agenda still hosted on the old hopemaine.org site. Attaching an uploaded agenda replaces this link.",
      },
    },
  ],
};
