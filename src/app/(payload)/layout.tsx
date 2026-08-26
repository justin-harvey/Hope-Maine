/* Adapted from the file Payload generates. */
import type { ServerFunctionClient } from "payload";

import config from "@payload-config";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import { Public_Sans } from "next/font/google";
import React from "react";

import { importMap } from "./admin/importMap";

// Payload ships the admin's theme and layout separately from its component
// styles; without this the panel renders with borders and colours but no
// theme variables and no layout, which reads as a broken page rather than a
// missing import.
import "@payloadcms/next/css";
import "./custom.scss";

// Same face as the public site. RootLayout owns the <html> element and takes
// no className, so the variable is declared on :root from a style element
// instead — see custom.scss, which consumes it as --font-body.
const adminFont = Public_Sans({ subsets: ["latin"], weight: ["400", "600", "700"] });

type Args = { children: React.ReactNode };

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

// The admin is a second root layout. It renders its own <html> and <body>,
// which is why the town-facing site had to move into (frontend) — two root
// layouts cannot share one.
const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    <style>{`:root { --font-admin-body: ${adminFont.style.fontFamily}; }`}</style>
    {children}
  </RootLayout>
);

export default Layout;
