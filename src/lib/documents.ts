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

/**
 * Rewrites a Payload upload URL to a same-origin path.
 *
 * Payload builds absolute URLs from `serverURL`, which bakes the hostname
 * into every document link at render time. Two things go wrong with that: a
 * preview deploy or a domain change breaks every link until the next
 * rebuild, and the front end's `startsWith("http")` test for external links
 * starts labelling the town's own PDFs "Opens on another website" — an
 * accessibility claim that is simply false.
 *
 * Anything genuinely off-site (the legacy hopemaine.org links) is returned
 * untouched.
 */
export function siteRelative(url: string): string {
  if (!url.startsWith("http")) return url;

  try {
    const parsed = new URL(url);
    const origin = process.env.NEXT_PUBLIC_SITE_URL;
    const isOwnUpload =
      (origin && parsed.origin === new URL(origin).origin) ||
      parsed.pathname.startsWith("/api/documents/file/") ||
      parsed.pathname.startsWith("/api/media/file/");

    return isOwnUpload ? `${parsed.pathname}${parsed.search}` : url;
  } catch {
    return url;
  }
}
