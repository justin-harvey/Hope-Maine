"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Icon } from "@/components/ui/icon";
import { primaryNav, townInfo } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b-2 border-line-strong bg-canvas">
      {/* Masthead */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* The seal is the route home, per the GOV.UK masthead pattern. */}
        <Link
          href="/"
          aria-label="Town of Hope, Maine — home"
          className="flex items-center gap-3 no-underline"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/brand/town-seal.png"
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 shrink-0"
            priority
          />
          <span>
            <span className="block heading-sm text-ink">{townInfo.name}</span>
            <span className="block body-xs text-ink-muted">Incorporated 1804</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${townInfo.phone}`}
            className="hidden min-h-[var(--tap-min)] items-center gap-2 body-sm font-semibold text-blue-link underline underline-offset-2 hover:decoration-[3px] md:inline-flex"
          >
            <Icon name="phone" size="xs" />
            {townInfo.phone}
          </a>

          <button
            type="button"
            className="inline-flex min-h-[var(--tap-min)] min-w-[var(--tap-min)] items-center justify-center gap-2 border-2 border-navy bg-navy px-3 font-semibold text-ink-inverse focus-ring-only lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? "close" : "menu"} size="sm" />
            <span className="body-sm">Menu</span>
          </button>
        </div>
      </div>

      {/* Primary navigation — navy band, full-width targets */}
      <nav
        id="primary-navigation"
        aria-label="Primary"
        className={cn("bg-navy", menuOpen ? "block" : "hidden lg:block")}
      >
        <ul className="mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:flex-row lg:flex-wrap">
          {primaryNav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <li key={item.href} className="border-b border-navy-dark lg:border-b-0">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "flex min-h-[var(--tap-min)] items-center px-3 py-3 font-semibold whitespace-nowrap no-underline body-sm lg:px-2 xl:px-3",
                    // Active state is carried by a thick bottom rule as well
                    // as color, so it survives greyscale and high-contrast mode.
                    active
                      ? "bg-canvas text-navy lg:bg-transparent lg:text-ink-inverse lg:shadow-[inset_0_-6px_0_0_var(--focus-yellow)]"
                      : "text-ink-inverse hover:bg-navy-dark hover:underline hover:underline-offset-4",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
