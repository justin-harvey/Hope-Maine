import type { Metadata } from "next";

import { Icon } from "@/components/ui/icon";
import { Panel } from "@/components/ui/panel";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { newsPosts } from "@/data/news";

export const metadata: Metadata = {
  title: "News",
  description:
    "Town announcements, public notices, election information, and meeting warrants for the Town of Hope, Maine.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News"
        title="News & Notices"
        description="Public notices, town meeting warrants, election information, and announcements."
      />

      <Section>
        <div className="grid gap-6">
          {newsPosts.map((post) => (
            <Panel key={post.title}>
              <p className="overline text-ink-muted">{post.date}</p>
              <h2 className="mt-1 heading-md text-ink">{post.title}</h2>
              <p className="mt-2 measure body text-ink">{post.summary}</p>

              {post.body && (
                <div className="mt-4 grid gap-3 border-l-4 border-line pl-4">
                  {post.body.map((para, i) => (
                    <p key={i} className="measure body-sm text-ink">
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {post.documents && post.documents.length > 0 && (
                <div className="mt-5 border-t border-line pt-4">
                  <h3 className="overline text-ink-muted">Attachments</h3>
                  <ul className="mt-2 grid">
                    {post.documents.map((doc) => {
                      const isExternal = doc.href.startsWith("http");
                      return (
                        <li key={doc.label}>
                          <a
                            href={doc.href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            className="flex min-h-[var(--tap-min)] items-center gap-3 body-sm text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                          >
                            <Icon
                              name={isExternal ? "external-link" : "document"}
                              size="xs"
                              className="shrink-0"
                              label={isExternal ? "Opens on another website" : undefined}
                            />
                            {doc.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </Panel>
          ))}
        </div>
      </Section>
    </>
  );
}
