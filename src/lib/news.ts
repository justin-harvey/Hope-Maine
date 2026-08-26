import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import { newsPosts } from "@/data/news";
import { siteRelative } from "@/lib/documents";
import type { Document as PayloadDocument, News } from "@/payload/payload-types";
import { getPayloadClient } from "@/lib/payload";

export type NewsItem = {
  key: string;
  title: string;
  date: string;
  summary: string;
  /** Rich text written in the CMS. */
  body?: SerializedEditorState | null;
  /** Plain paragraphs from the original static content. */
  bodyParagraphs?: string[];
  documents: { label: string; href: string }[];
};

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function formatDate(value: string): string {
  const parsed = new Date(value);
  return Number.isNaN(parsed.valueOf()) ? value : dateFormat.format(parsed);
}

/** The static content that shipped before the CMS existed. */
function staticItems(): NewsItem[] {
  return newsPosts.map((post) => ({
    key: post.title,
    title: post.title,
    date: post.date,
    summary: post.summary,
    bodyParagraphs: post.body,
    documents: post.documents ?? [],
  }));
}

function attachmentsOf(post: News): { label: string; href: string }[] {
  if (!post.attachments) return [];

  return post.attachments
    // With depth >= 1 these arrive as full documents; a bare id means the
    // related document was deleted, and a link to it would 404.
    .filter((entry): entry is PayloadDocument => typeof entry === "object" && entry !== null)
    .filter((entry) => Boolean(entry.url))
    .map((entry) => ({ label: entry.title, href: siteRelative(entry.url as string) }));
}

/**
 * News for the front end, newest first.
 *
 * Falls back to the static content when the CMS has nothing to say — either
 * because no post has been published yet, or because the database is not
 * reachable. That second case matters at build time: a deploy whose
 * DATABASE_URI is missing or wrong should ship the site with the content it
 * already had, not a blank news page.
 */
export async function getNewsItems(limit = 50): Promise<NewsItem[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "news",
      limit,
      depth: 1,
      sort: "-publishedOn",
      where: { _status: { equals: "published" } },
      overrideAccess: false,
    });

    if (docs.length === 0) return staticItems().slice(0, limit);

    return docs.map((post) => ({
      key: String(post.id),
      title: post.title,
      date: formatDate(post.publishedOn),
      summary: post.summary,
      body: post.body as SerializedEditorState | null | undefined,
      documents: attachmentsOf(post),
    }));
  } catch (error) {
    console.warn(
      "[news] Payload unavailable, serving the static content instead:",
      error instanceof Error ? error.message : error,
    );
    return staticItems().slice(0, limit);
  }
}
