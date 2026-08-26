// Where the town's PDFs currently live.
//
// The document paths throughout src/data/ were recovered from the live
// hopemaine.org page exports. They are root-relative on that site — the
// export dropped the leading slash — so a working URL is this base plus
// the path, with each segment encoded because many contain spaces.
//
// These links therefore point at the CURRENT Revize-hosted site. That is a
// deliberate interim: a working link to the real file serves residents far
// better than a dead placeholder, and it is what the first stage of any
// migration would do anyway.
//
// NOTE: these URLs were derived from the exports and could not be verified
// from the build environment, which has no outbound access to hopemaine.org.
// Spot-check a few before launch.
//
// When the PDFs are rehosted, change this one constant.
export const LEGACY_DOC_BASE = "https://www.hopemaine.org";

/** Build an absolute URL for a document path taken from the site export. */
export function doc(path: string): string {
  const encoded = path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `${LEGACY_DOC_BASE}/${encoded}`;
}
