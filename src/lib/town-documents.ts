import { documentCategories, type DocumentCategory } from "@/data/documents";
import { siteRelative } from "@/lib/documents";
import { getPayloadClient } from "@/lib/payload";
import { DOCUMENT_CATEGORIES } from "@/payload/collections/Documents";

export type ResolvedDocument = {
  label: string;
  href: string;
  /** True once the file is hosted here rather than on the old site. */
  hosted: boolean;
};

export type ResolvedCategory = {
  category: string;
  description?: string;
  documents: ResolvedDocument[];
};

/**
 * Merges the documents uploaded to the CMS over the legacy links.
 *
 * This is what makes the PDF migration incremental. Every entry in
 * `src/data/documents.ts` still points at the file on hopemaine.org; when
 * staff upload the same document here, the upload takes its place — matched
 * on title, case- and punctuation-insensitively, so "Shoreland Zone
 * Ordinance" supersedes the legacy link of that name rather than appearing
 * beside it. Documents with no legacy counterpart are simply added.
 *
 * The alternative was a flag day: copy all 114 files, flip
 * LEGACY_DOC_BASE, and hope nothing was missed. This way the town can move
 * one ordinance at a time and the page is correct at every point in between.
 */
function normalizeTitle(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export async function getDocumentCategories(): Promise<ResolvedCategory[]> {
  const legacy: DocumentCategory[] = documentCategories;

  let uploaded: { title: string; category: string; url: string }[] = [];
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "documents",
      limit: 1000,
      depth: 0,
      sort: "title",
      overrideAccess: false,
    });
    uploaded = docs
      .filter((d) => Boolean(d.url))
      .map((d) => ({ title: d.title, category: d.category, url: siteRelative(d.url as string) }));
  } catch (error) {
    console.warn(
      "[documents] Payload unavailable, showing the legacy links only:",
      error instanceof Error ? error.message : error,
    );
  }

  const byCategory = new Map<string, typeof uploaded>();
  for (const entry of uploaded) {
    const list = byCategory.get(entry.category) ?? [];
    list.push(entry);
    byCategory.set(entry.category, list);
  }

  const merged: ResolvedCategory[] = legacy.map((category) => {
    const uploads = byCategory.get(category.category) ?? [];
    byCategory.delete(category.category);
    const replaced = new Map(uploads.map((u) => [normalizeTitle(u.title), u]));

    const documents: ResolvedDocument[] = category.documents.map((doc) => {
      const upload = replaced.get(normalizeTitle(doc.label));
      if (!upload) return { label: doc.label, href: doc.href, hosted: false };
      replaced.delete(normalizeTitle(doc.label));
      return { label: doc.label, href: upload.url, hosted: true };
    });

    // Anything uploaded under this category that had no legacy entry.
    for (const upload of replaced.values()) {
      documents.push({ label: upload.title, href: upload.url, hosted: true });
    }

    return { category: category.category, description: category.description, documents };
  });

  // Categories that exist only in the CMS — "Agendas & Minutes" is the one
  // the collection adds, since the old site kept those elsewhere.
  for (const name of DOCUMENT_CATEGORIES) {
    const uploads = byCategory.get(name);
    if (!uploads?.length) continue;
    merged.push({
      category: name,
      documents: uploads.map((u) => ({ label: u.title, href: u.url, hosted: true })),
    });
  }

  return merged.filter((category) => category.documents.length > 0);
}

/** How much of the library has actually moved onto this site. */
export function hostingProgress(categories: ResolvedCategory[]) {
  const all = categories.flatMap((c) => c.documents);
  return { hosted: all.filter((d) => d.hosted).length, total: all.length };
}
