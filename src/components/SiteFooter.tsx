import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { primaryNav, townInfo } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="bg-blue-900 text-cream-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <Image
            src="/brand/town-seal.png"
            alt="Town of Hope, Maine seal"
            width={56}
            height={56}
            className="h-14 w-14"
          />
          <h2 className="mt-3 font-display text-lg text-cream-50">{townInfo.name}</h2>
          <p className="mt-2 body-sm text-cream-50/70">{townInfo.tagline}</p>
          <address className="mt-4 space-y-1 body-sm not-italic text-cream-50/80">
            <p>{townInfo.addressLine1}</p>
            <p>{townInfo.addressLine2}</p>
            <p>{townInfo.cityStateZip}</p>
          </address>
        </div>

        <div>
          <h3 className="captions text-cream-50">Quick Links</h3>
          <ul className="mt-3 space-y-2 body-sm">
            {primaryNav.slice(1).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-cream-50/80 hover:text-gold-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="captions text-cream-50">Contact</h3>
          <ul className="mt-3 space-y-2 body-sm text-cream-50/80">
            <li className="flex items-center gap-2">
              <Icon name="phone" size="xs" />
              <a href={`tel:${townInfo.phone}`} className="hover:text-gold-300">
                {townInfo.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="mail" size="xs" />
              <a href={`mailto:${townInfo.email}`} className="hover:text-gold-300">
                {townInfo.email}
              </a>
            </li>
          </ul>
          <h3 className="mt-5 captions text-cream-50">Office Hours</h3>
          <ul className="mt-3 space-y-1 body-sm text-cream-50/80">
            {townInfo.officeHours.map((entry) => (
              <li key={entry.days} className="flex justify-between gap-4">
                <span>{entry.days}</span>
                <span>{entry.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-50/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-4 body-xs text-cream-50/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {townInfo.name}. All rights reserved.
          </p>
          <p>Website content is being updated — some information is placeholder text.</p>
        </div>
      </div>
    </footer>
  );
}
