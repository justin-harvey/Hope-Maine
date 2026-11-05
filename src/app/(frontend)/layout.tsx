import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "../globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { town, townDisplayName } from "@/town.config";

// One family for the whole site. Public Sans is the USWDS face: neutral
// grotesque, high x-height, open apertures — built for legibility at small
// sizes on low-resolution screens.
const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: townDisplayName,
    template: `%s | ${townDisplayName}`,
  },
  description: `Town services, government, meetings, news, and resources for residents of ${town.name}, ${town.state}.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${publicSans.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-canvas text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:border-2 focus:border-ink focus:bg-focus focus:px-4 focus:py-3 focus:font-bold focus:text-ink"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
