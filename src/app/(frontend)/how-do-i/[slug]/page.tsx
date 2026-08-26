import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Icon } from "@/components/ui/icon";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { categoryAnchors, faqEntries, getFaq, relatedFaqs } from "@/lib/faqs";
import { townInfo } from "@/lib/nav";

// All 26 answers are prerendered, so each is a static page.
export function generateStaticParams() {
  return faqEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata(
  props: PageProps<"/how-do-i/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const entry = getFaq(slug);
  if (!entry) return {};

  return {
    title: entry.question.replace(/^How do I\s*/i, "How to ").replace(/\?$/, ""),
    // The first paragraph is written as a direct answer, which makes it a
    // better search description than anything generated would be.
    description: entry.answer[0]?.slice(0, 300),
  };
}

/**
 * One answer, one page.
 *
 * This replaced a single long accordion that the home page linked into,
 * relying on the right row being open on arrival. It worked, and it was
 * still disorienting: you landed most of the way down a page of twenty-five
 * collapsed rows and had to spot which one had opened. Here there is nothing
 * to open and nothing to scroll past.
 */
export default async function FaqPage(props: PageProps<"/how-do-i/[slug]">) {
  const { slug } = await props.params;
  const entry = getFaq(slug);
  if (!entry) notFound();

  const related = relatedFaqs(entry);
  const categoryHref = `/how-do-i#${categoryAnchors[entry.category] ?? ""}`;

  return (
    <>
      <PageHero eyebrow={entry.category} title={entry.question} />

      <Section>
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link
            href="/how-do-i"
            className="inline-flex min-h-[var(--tap-min)] items-center gap-2 body-sm text-blue-link underline underline-offset-2 hover:decoration-[3px]"
          >
            <Icon name="arrow-left" size="xs" className="shrink-0" />
            All &ldquo;How Do I…?&rdquo; answers
          </Link>
        </nav>

        <div className="grid gap-4">
          {entry.answer.map((paragraph, i) => (
            <p key={i} className="measure body text-ink">
              {paragraph}
            </p>
          ))}
        </div>

        {entry.links && entry.links.length > 0 && (
          <div className="mt-8 border-t border-line pt-6">
            <h2 className="overline text-ink-muted">Do this online</h2>
            <ul className="mt-2 grid">
              {entry.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[var(--tap-min)] items-center gap-2 body font-semibold text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                  >
                    {link.label}
                    <Icon name="external-link" size="xs" label="Opens on another website" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Every answer ends with a way to reach a person. The Town Office
            is one of five people; for most of these questions, calling is
            genuinely faster than reading further. */}
        <div className="mt-8 border-t border-line pt-6">
          <h2 className="overline text-ink-muted">Still need help?</h2>
          <p className="mt-2 measure body-sm text-ink">
            Call the Town Office on{" "}
            <a
              href={`tel:${townInfo.phone}`}
              className="font-semibold text-blue-link underline underline-offset-2 hover:decoration-[3px]"
            >
              {townInfo.phone}
            </a>{" "}
            or{" "}
            <Link
              href="/contact"
              className="font-semibold text-blue-link underline underline-offset-2 hover:decoration-[3px]"
            >
              send a message
            </Link>
            .
          </p>
        </div>
      </Section>

      {related.length > 0 && (
        <div className="band">
          <Section title={`More about ${entry.category.toLowerCase()}`} headingId="related">
            <ul className="task-list">
              {related.map((other) => (
                <li key={other.slug}>
                  <Link href={`/how-do-i/${other.slug}`} className="task-row body">
                    <span className="min-w-0">
                      <span className="block font-semibold">{other.question}</span>
                    </span>
                    <Icon name="chevron-right" size="sm" className="shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5">
              <Link
                href={categoryHref}
                className="inline-flex min-h-[var(--tap-min)] items-center body font-semibold text-blue-link underline underline-offset-2 hover:decoration-[3px]"
              >
                Every question the Town Office is asked
              </Link>
            </p>
          </Section>
        </div>
      )}
    </>
  );
}
