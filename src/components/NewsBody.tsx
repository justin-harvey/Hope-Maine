import { RichText } from "@payloadcms/richtext-lexical/react";

import type { NewsItem } from "@/lib/news";

/**
 * A post's body, from whichever source it came.
 *
 * Posts written in the CMS carry Lexical rich text; the posts migrated from
 * the original site are plain paragraphs. Both render inside the same ruled
 * left border, so a resident cannot tell which is which — and neither can a
 * screen reader, which is the point.
 */
export function NewsBody({ item }: { item: NewsItem }) {
  const hasRichText = Boolean(item.body);
  const hasParagraphs = Boolean(item.bodyParagraphs?.length);
  if (!hasRichText && !hasParagraphs) return null;

  return (
    <div className="mt-4 border-l-4 border-line pl-4">
      {hasRichText ? (
        <RichText data={item.body!} className="rich-text" />
      ) : (
        <div className="grid gap-3">
          {item.bodyParagraphs!.map((para, i) => (
            <p key={i} className="measure body-sm text-ink">
              {para}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
