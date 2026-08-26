// Base URL is overridable so the same gates can run against a preview
// deploy, not only a local server.

import { BASE, launch } from "./browser.mjs";

const ROUTES = [
  "/", "/government", "/departments", "/departments/code-enforcement",
  "/meetings", "/news", "/documents", "/how-do-i",
  "/how-do-i/pay-my-property-taxes", "/how-do-i/register-a-car",
  "/how-do-i/apply-for-general-assistance", "/schools",
  "/about", "/contact", "/report/road",
];

(async () => {
  const b = await launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });

  const deadHash = [];      // href="#" — goes nowhere
  const internal = new Map(); // path -> Set of source routes
  const anchors = [];       // same-page #id links
  const external = new Map();
  const perRoute = {};

  for (const route of ROUTES) {
    await p.goto(BASE + route, { waitUntil: "networkidle" });
    const found = await p.evaluate(() => {
      const out = [];
      for (const a of document.querySelectorAll("a[href]")) {
        out.push({ href: a.getAttribute("href"), text: (a.textContent || "").trim().slice(0, 70) });
      }
      // ids present on the page, to validate anchors
      const ids = [...document.querySelectorAll("[id]")].map((e) => e.id);
      return { links: out, ids };
    });

    let dead = 0;
    for (const { href, text } of found.links) {
      if (href === "#") { deadHash.push({ route, text }); dead++; }
      else if (href.startsWith("#")) {
        const id = href.slice(1);
        anchors.push({ route, href, text, ok: found.ids.includes(id) });
      } else if (href.startsWith("/")) {
        const path = href.split("#")[0];
        const hash = href.includes("#") ? href.split("#")[1] : null;
        if (!internal.has(href)) internal.set(href, { path, hash, sources: new Set() });
        internal.get(href).sources.add(route);
      } else if (href.startsWith("http")) {
        if (!external.has(href)) external.set(href, new Set());
        external.get(href).add(route);
      }
    }
    perRoute[route] = { total: found.links.length, dead };
  }

  // Resolve internal targets
  const internalResults = [];
  for (const [href, info] of internal) {
    const res = await p.goto(BASE + info.path, { waitUntil: "domcontentloaded" });
    let hashOk = null;
    if (info.hash) {
      hashOk = await p.evaluate((h) => Boolean(document.getElementById(h)), info.hash);
    }
    internalResults.push({ href, status: res.status(), hashOk, sources: [...info.sources] });
  }

  await b.close();

  console.log("========== DEAD LINKS (href=\"#\") ==========");
  const byRoute = {};
  deadHash.forEach((d) => { (byRoute[d.route] ||= []).push(d.text); });
  let deadTotal = 0;
  for (const [route, items] of Object.entries(byRoute)) {
    deadTotal += items.length;
    console.log(`\n${route}  —  ${items.length} dead`);
    items.slice(0, 6).forEach((t) => console.log(`    · ${t}`));
    if (items.length > 6) console.log(`    … and ${items.length - 6} more`);
  }
  console.log(`\nTOTAL DEAD: ${deadTotal}`);

  console.log("\n========== INTERNAL LINKS ==========");
  const bad = internalResults.filter((r) => r.status >= 400 || r.hashOk === false);
  internalResults.forEach((r) => {
    const flag = r.status >= 400 ? "BROKEN" : r.hashOk === false ? "BAD ANCHOR" : "ok";
    if (flag !== "ok") console.log(`  ${flag}  ${r.href}  (status ${r.status}, hash ${r.hashOk})  from ${r.sources.join(", ")}`);
  });
  console.log(`  ${internalResults.length} unique internal links, ${bad.length} broken`);

  console.log("\n========== SAME-PAGE ANCHORS ==========");
  const badAnchors = anchors.filter((a) => !a.ok);
  badAnchors.forEach((a) => console.log(`  MISSING TARGET  ${a.route} -> ${a.href}  "${a.text}"`));
  console.log(`  ${anchors.length} anchor links, ${badAnchors.length} missing targets`);

  console.log("\n========== EXTERNAL HOSTS ==========");
  const hosts = {};
  for (const [href] of external) {
    const h = new URL(href).host;
    hosts[h] = (hosts[h] || 0) + 1;
  }
  Object.entries(hosts).sort((a, b) => b[1] - a[1]).forEach(([h, n]) => console.log(`  ${n.toString().padStart(2)}  ${h}`));
  console.log(`  ${external.size} unique external links`);
})();
