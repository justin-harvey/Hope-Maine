import Link from "next/link";
import { primaryNav, townInfo } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="bg-navy-950 text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <h2 className="font-serif text-lg font-semibold text-white">{townInfo.name}</h2>
          <p className="mt-2 text-sm text-white/70">{townInfo.tagline}</p>
          <address className="mt-4 space-y-1 text-sm not-italic text-white/80">
            <p>{townInfo.addressLine1}</p>
            <p>{townInfo.addressLine2}</p>
            <p>{townInfo.cityStateZip}</p>
          </address>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
            Quick Links
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {primaryNav.slice(1).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/80 hover:text-gold-500">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
            Contact
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>
              Phone:{" "}
              <a href={`tel:${townInfo.phone}`} className="hover:text-gold-500">
                {townInfo.phone}
              </a>
            </li>
            <li>Fax: {townInfo.fax}</li>
            <li>
              Email:{" "}
              <a href={`mailto:${townInfo.email}`} className="hover:text-gold-500">
                {townInfo.email}
              </a>
            </li>
          </ul>
          <h3 className="mt-5 text-sm font-semibold tracking-wide text-white uppercase">
            Office Hours
          </h3>
          <ul className="mt-3 space-y-1 text-sm text-white/80">
            {townInfo.officeHours.map((entry) => (
              <li key={entry.days} className="flex justify-between gap-4">
                <span>{entry.days}</span>
                <span>{entry.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-4 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {townInfo.name}. All rights reserved.</p>
          <p>Website content is being updated — some information is placeholder text.</p>
        </div>
      </div>
    </footer>
  );
}
