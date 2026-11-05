import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { primaryNav, secondaryNav, townInfo } from "@/lib/nav";
import { legacySiteHost } from "@/town.config";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t-[6px] border-navy bg-surface-1">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/brand/town-seal.png" alt="" width={48} height={48} className="h-12 w-12" />
            <p className="heading-sm text-ink">{townInfo.name}</p>
          </div>
          <address className="mt-4 grid gap-0.5 body-sm not-italic text-ink">
            <span>{townInfo.addressLine1}</span>
            <span>{townInfo.addressLine2}</span>
            <span>{townInfo.cityStateZip}</span>
          </address>
        </div>

        <nav aria-label="Footer">
          <h2 className="overline text-ink-muted">On this site</h2>
          <ul className="mt-3 grid">
            {[...primaryNav, ...secondaryNav].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-[var(--tap-min)] items-center body-sm text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="overline text-ink-muted">Contact</h2>
          <ul className="mt-3 grid body-sm text-ink">
            <li>
              <a
                href={`tel:${townInfo.phone}`}
                className="flex min-h-[var(--tap-min)] items-center gap-2 text-blue-link underline underline-offset-2 hover:decoration-[3px]"
              >
                <Icon name="phone" size="xs" />
                {townInfo.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${townInfo.email}`}
                className="flex min-h-[var(--tap-min)] items-center gap-2 text-blue-link underline underline-offset-2 hover:decoration-[3px]"
              >
                <Icon name="mail" size="xs" />
                {townInfo.email}
              </a>
            </li>
            <li className="flex min-h-[var(--tap-min)] items-center gap-2 text-ink">
              Fax: {townInfo.fax}
            </li>
          </ul>

          <h2 className="mt-4 overline text-ink-muted">Town Office hours</h2>
          <ul className="mt-3 grid gap-1 body-sm text-ink">
            {townInfo.officeHours.map((entry) => (
              <li key={entry.days} className="flex flex-wrap justify-between gap-x-4">
                <span>{entry.days}</span>
                <span className="font-semibold">{entry.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 body-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {townInfo.name}
          </p>
          {legacySiteHost && (
            <p>Some information on this site is still being migrated from {legacySiteHost}.</p>
          )}
        </div>
      </div>
    </footer>
  );
}
