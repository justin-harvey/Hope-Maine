import type { Metadata } from "next";

import { Icon } from "@/components/ui/icon";
import { SurfaceCard } from "@/components/ui/surface-card";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { newsPosts } from "@/data/news";

export const metadata: Metadata = {
  title: "News",
  description: "Town announcements, public notices, and meeting warrants for the Town of Hope, Maine.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News"
        title="News & Announcements"
        description="Public notices, town meeting warrants, election information, and announcements from the Town of Hope."
      />

      <Section>
        <div className="grid gap-4">
          {newsPosts.map((post) => (
            <SurfaceCard key={post.title} density="standard">
              <p className="captions text-blue-700">{post.date}</p>
              <h2 className="mt-2 font-display text-xl text-blue-900">{post.title}</h2>
              <p className="mt-2 body-sm text-slate-500">{post.summary}</p>

              {post.body && (
                <div className="mt-4 grid gap-2 border-t border-blue-900/10 pt-4">
                  {post.body.map((para, i) => (
                    <p key={i} className="body-sm text-blue-900/80">
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {post.documents && post.documents.length > 0 && (
                <div className="mt-4 border-t border-blue-900/10 pt-4">
                  <p className="captions text-slate-500">Attachments</p>
                  <ul className="mt-2 grid gap-1.5">
                    {post.documents.map((doc) => {
                      const isExternal = doc.href.startsWith("http");
                      return (
                        <li key={doc.label} className="flex items-center gap-2">
                          <Icon name="document" size="xs" className="shrink-0 text-blue-700" />
                          <a
                            href={doc.href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            className="body-sm text-blue-900 hover:text-blue-700"
                          >
                            {doc.label}
                          </a>
                          {isExternal && (
                            <Icon name="external-link" size="xs" className="shrink-0 text-slate-400" />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </SurfaceCard>
          ))}
        </div>
      </Section>
    </>
  );
}
