// Base URL is overridable so the same gates can run against a preview
// deploy, not only a local server.

import { BASE, launch } from "./browser.mjs";

const PAGES = [
  "/", "/government", "/departments", "/departments/code-enforcement",
  "/meetings", "/news", "/documents", "/how-do-i", "/how-do-i/pay-my-property-taxes", "/how-do-i/register-a-car", "/schools", "/about", "/contact", "/report/road",
];

// WCAG relative luminance + contrast ratio
function lum([r, g, b]) {
  const f = (c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function ratio(a, b) {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}
function parse(c) {
  const m = c.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].split(",").map((s) => parseFloat(s.trim()));
  if (p.length === 4 && p[3] === 0) return null; // transparent
  return [p[0], p[1], p[2]];
}

(async () => {
  const browser = await launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  const contrastFails = [];
  const targetFails = [];
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e.message)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

  for (const path of PAGES) {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });

    // Collect text nodes with computed colors + effective background
    const samples = await page.evaluate(() => {
      const out = [];
      const els = document.querySelectorAll("body *");
      for (const el of els) {
        const text = Array.from(el.childNodes)
          .filter((n) => n.nodeType === 3)
          .map((n) => n.textContent.trim())
          .join(" ")
          .trim();
        if (!text) continue;
        const cs = getComputedStyle(el);
        if (cs.visibility === "hidden" || cs.display === "none" || parseFloat(cs.opacity) === 0) continue;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;

        // walk up for first opaque background
        let bg = "rgba(0, 0, 0, 0)";
        let node = el;
        while (node) {
          const b = getComputedStyle(node).backgroundColor;
          const m = b.match(/rgba?\(([^)]+)\)/);
          if (m) {
            const p = m[1].split(",").map(Number);
            if (p.length < 4 || p[3] > 0) { bg = b; break; }
          }
          node = node.parentElement;
        }
        out.push({
          text: text.slice(0, 60),
          color: cs.color,
          bg,
          size: parseFloat(cs.fontSize),
          weight: cs.fontWeight,
          tag: el.tagName,
        });
      }
      return out;
    });

    for (const s of samples) {
      const fg = parse(s.color), bgc = parse(s.bg);
      if (!fg || !bgc) continue;
      const r = ratio(fg, bgc);
      const isLarge = s.size >= 24 || (s.size >= 18.66 && Number(s.weight) >= 700);
      // AA floor (4.5 normal / 3 large); we report anything under AA hard,
      // and separately track under-AAA (7 / 4.5).
      const aa = isLarge ? 3 : 4.5;
      const aaa = isLarge ? 4.5 : 7;
      if (r < aa) contrastFails.push({ path, ...s, ratio: r.toFixed(2), level: "FAILS AA" });
      else if (r < aaa) contrastFails.push({ path, ...s, ratio: r.toFixed(2), level: "under AAA" });
    }

    // Touch targets on interactive elements
    const small = await page.evaluate(() => {
      const out = [];
      for (const el of document.querySelectorAll("a, button, input, textarea, summary, select")) {
        const cs = getComputedStyle(el);
        if (cs.visibility === "hidden" || cs.display === "none") continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (r.height < 44 || r.width < 44) {
          out.push({ tag: el.tagName, text: (el.textContent || "").trim().slice(0, 40), w: Math.round(r.width), h: Math.round(r.height) });
        }
      }
      return out;
    });
    small.forEach((s) => targetFails.push({ path, ...s }));
  }

  // Focus visibility check
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const focusStyle = await page.evaluate(() => {
    const el = document.activeElement;
    const cs = getComputedStyle(el);
    return { tag: el.tagName, text: (el.textContent||"").trim().slice(0,40), outline: cs.outlineWidth + " " + cs.outlineColor, boxShadow: cs.boxShadow, bg: cs.backgroundColor };
  });

  await browser.close();

  const hardFails = contrastFails.filter((f) => f.level === "FAILS AA");
  const aaaGaps = contrastFails.filter((f) => f.level === "under AAA");

  console.log(`\n=== CONTRAST: ${hardFails.length} AA failures, ${aaaGaps.length} under-AAA ===`);
  hardFails.slice(0, 15).forEach((f) => console.log(`  AA FAIL ${f.ratio}:1  ${f.path}  <${f.tag}> ${f.size}px  "${f.text}"  ${f.color} on ${f.bg}`));
  const seen = new Set();
  aaaGaps.forEach((f) => { const k = `${f.color}|${f.bg}|${f.size}`; if (!seen.has(k)) { seen.add(k); console.log(`  under-AAA ${f.ratio}:1  <${f.tag}> ${f.size}px "${f.text}"  ${f.color} on ${f.bg}`); } });

  console.log(`\n=== TOUCH TARGETS < 44px: ${targetFails.length} ===`);
  const tseen = new Set();
  targetFails.forEach((f) => { const k = `${f.tag}|${f.text}`; if (!tseen.has(k)) { tseen.add(k); console.log(`  ${f.path} <${f.tag}> ${f.w}x${f.h} "${f.text}"`); } });

  console.log(`\n=== FOCUS (3rd tab stop) ===`);
  console.log(" ", JSON.stringify(focusStyle));

  console.log(`\n=== CONSOLE ERRORS: ${errors.length} ===`);
  errors.slice(0, 10).forEach((e) => console.log("  -", e));
})();
