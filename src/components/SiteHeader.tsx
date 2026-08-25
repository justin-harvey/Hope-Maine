"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { primaryNav, townInfo } from "@/lib/nav";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="hidden bg-navy-950 text-white md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-end gap-6 px-6 py-1.5 text-xs">
          <a href={`tel:${townInfo.phone}`} className="hover:text-gold-500">
            {townInfo.phone}
          </a>
          <a href={`mailto:${townInfo.email}`} className="hover:text-gold-500">
            {townInfo.email}
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-700 font-serif text-lg font-semibold text-white">
            H
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg font-semibold text-navy-950">
              {townInfo.name}
            </span>
            <span className="block text-xs text-navy-700">{townInfo.tagline}</span>
          </span>
        </Link>

        <nav className="hidden lg:block" aria-label="Primary">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-forest-700 text-white"
                        : "text-navy-900 hover:bg-navy-950/5"
                    }`}
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
          className="inline-flex items-center justify-center rounded-md border border-navy-900/20 p-2 text-navy-900 lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Primary" className="border-t border-navy-900/10 lg:hidden">
          <ul className="mx-auto max-w-6xl px-6 py-2">
            {primaryNav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-md px-3 py-2.5 text-sm font-medium ${
                      active ? "bg-forest-700 text-white" : "text-navy-900 hover:bg-navy-950/5"
                    }`}
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
