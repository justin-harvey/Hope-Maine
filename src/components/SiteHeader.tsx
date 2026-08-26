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
    <header className="sticky top-0 z-40 bg-cream-50 shadow-sm">
      <div className="hidden bg-blue-900 text-cream-50 md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-end gap-6 px-6 py-1.5 body-xs">
          <a href={`tel:${townInfo.phone}`} className="inline-flex items-center gap-1.5 hover:text-gold-300">
            <Icon name="phone" size="xs" />
            {townInfo.phone}
          </a>
          <a href={`mailto:${townInfo.email}`} className="inline-flex items-center gap-1.5 hover:text-gold-300">
            <Icon name="mail" size="xs" />
            {townInfo.email}
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <Image
            src="/brand/town-seal.png"
            alt="Town of Hope, Maine seal"
            width={44}
            height={44}
            className="h-11 w-11 shrink-0"
            priority
          />
          <span className="leading-tight">
            <span className="block font-display text-lg whitespace-nowrap text-blue-900">
              {townInfo.name}
            </span>
            <span className="hidden body-xs text-slate-500 sm:block">{townInfo.tagline}</span>
          </span>
        </Link>

        <nav className="hidden xl:block" aria-label="Primary">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-2xl px-2.5 py-2 body-sm font-medium whitespace-nowrap transition-colors",
                      active ? "bg-blue-900 text-cream-50" : "text-blue-900 hover:bg-blue-900/5",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-2xl border border-blue-900/20 p-2 text-blue-900 xl:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <Icon name={menuOpen ? "close" : "menu"} size="md" />
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Primary" className="border-t border-blue-900/10 xl:hidden">
          <ul className="mx-auto max-w-6xl px-6 py-2">
            {primaryNav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "block rounded-2xl px-3 py-2.5 body-sm font-medium",
                      active ? "bg-blue-900 text-cream-50" : "text-blue-900 hover:bg-blue-900/5",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
