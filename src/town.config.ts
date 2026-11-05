/**
 * The one file a new town edits.
 *
 * Every town-specific fact the site shows -- its name, the office address and
 * hours, the timezone meetings are read in, the document categories, the first
 * administrator's email, the old site it is migrating from -- lives here and
 * nowhere else. Change these values and the whole site follows; nothing town-
 * specific is hard-coded in a page, a component, or a collection.
 *
 * Content (news posts, board rosters, the About page figures, the "How Do I"
 * answers) is not here: that is editable in the admin and seeded from
 * `src/data/`. This file is for the identity and settings a developer sets
 * once when standing the site up.
 *
 * ────────────────────────────────────────────────────────────────────
 *  THIS IS THE BLANK TEMPLATE.
 *  The values below are placeholders for a fictional "Anytown, Maine".
 *  Run `npm run setup` to replace them with a real town's details, or edit
 *  this file by hand. Nothing here is a real place.
 * ────────────────────────────────────────────────────────────────────
 */

export type OfficeHours = {
  /** e.g. "Tuesday, Wednesday & Friday" */
  days: string;
  /** e.g. "8:30 AM – 4:30 PM", or "Closed" */
  hours: string;
};

export type TownConfig = {
  /** The place name on its own: "Hope". Used in prose like "About Hope". */
  name: string;
  /** The legal municipal name: "Town of Hope". */
  legalName: string;
  /** "Maine" */
  state: string;
  /** "ME" */
  stateAbbr: string;
  /** Year of incorporation, shown under the masthead. Null to hide it. */
  incorporatedYear: number | null;
  /** One line under the name in some contexts. */
  tagline: string;
  /** IANA zone meeting times are entered and read in. Defaults to Eastern. */
  timezone: string;
  /** Canonical origin, e.g. "https://hope-maine.netlify.app". Env overrides. */
  siteUrl: string;
  /** The first admin account the seed creates. */
  firstAdminEmail: string;
  /** Appended to the browser tab title inside the admin panel. */
  adminTitleSuffix: string;
  contact: {
    /** "Hope Town Office" -- the name of the building/office. */
    officeName: string;
    /** Street line, e.g. "441 Camden Rd". */
    addressLine: string;
    /** "Hope, ME 04847". */
    cityStateZip: string;
    phone: string;
    fax: string;
    email: string;
    officeHours: OfficeHours[];
  };
  hero: {
    /** Alt text for the home-page hero image, if one is dropped in public/hero/. */
    alt: string;
    /** The single sentence of home-page intro copy beneath the hero. */
    intro: string;
    /**
     * Photo credit, when the hero is a stock image that is honestly not a
     * photograph of the town. Null if the town supplies its own photo.
     */
    credit: { photographer: string; source: string } | null;
  };
  /** Categories a document can be filed under. First one is the default. */
  documentCategories: string[];
  /**
   * Starting sort order for seeded boards (lower comes first). Boards not
   * listed here seed at 100, after the named ones.
   */
  boardSeedOrder: Record<string, number>;
  /**
   * Base URL of the town's previous website, for links to documents not yet
   * re-hosted here. Null when there is no prior site to migrate from.
   */
  legacySiteBaseUrl: string | null;
};

export const town: TownConfig = {
  name: "Anytown",
  legalName: "Town of Anytown",
  state: "Maine",
  stateAbbr: "ME",
  incorporatedYear: null,
  tagline: "A placeholder town. Edit src/town.config.ts.",
  timezone: "America/New_York",
  siteUrl: "http://localhost:3000",
  firstAdminEmail: "admin@example.com",
  adminTitleSuffix: " · Town of Anytown",
  contact: {
    officeName: "Anytown Town Office",
    addressLine: "1 Main Street",
    cityStateZip: "Anytown, ME 00000",
    phone: "(207) 555-0000",
    fax: "(207) 555-0001",
    email: "admin@example.com",
    officeHours: [
      { days: "Monday – Friday", hours: "8:30 AM – 4:30 PM" },
    ],
  },
  hero: {
    alt: "Placeholder. No hero image is set for this town yet.",
    intro:
      "This is a placeholder home page for a new town site. Edit the intro in src/town.config.ts, and add content through the admin at /admin.",
    credit: null,
  },
  documentCategories: [
    "Annual Town Reports",
    "Ordinances",
    "Policies",
    "Budgets & Financial Statements",
    "Tax Maps",
    "Permits, Forms & Applications",
    "Agendas & Minutes",
  ],
  boardSeedOrder: {
    "Select Board": 10,
    "Planning Board": 20,
    "Board of Appeals": 30,
    "Budget Committee": 40,
  },
  legacySiteBaseUrl: null,
};

/** "Town of Anytown, Maine" -- the full display name used in titles and the masthead. */
export const townDisplayName = `${town.legalName}, ${town.state}`;

/** "Anytown, Maine" -- the shorter name. */
export const townShortName = `${town.name}, ${town.state}`;

/**
 * Host of the legacy site (e.g. "hopemaine.org"), with any leading "www."
 * stripped, for the migration notices. Null when there is no prior site, in
 * which case those notices are hidden.
 */
export const legacySiteHost = town.legacySiteBaseUrl
  ? new URL(town.legacySiteBaseUrl).host.replace(/^www\./, "")
  : null;
