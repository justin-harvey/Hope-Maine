// Gate: the site's core journey works with scripts blocked.
//
// Brave and similar browsers block scripts by default, and this is a
// municipal site — "works only with JavaScript" is not an acceptable answer
// for someone trying to find out when their taxes are due.
//
// The specific invariant: following a task link from the home page must land
// on a page where the answer is the first thing you read. This replaced an
// earlier check for whether the right accordion row had opened; that design
// is gone precisely because it was hard to get right without script.

import { BASE, launch, devices } from "./browser.mjs";

async function run(jsEnabled) {
  const browser = await launch();
  const context = await browser.newContext({ ...devices["Pixel 5"], javaScriptEnabled: jsEnabled });
  const page = await context.newPage();
  const label = `JavaScript ${jsEnabled ? "ENABLED" : "DISABLED"} (Pixel 5)`;

  await page.goto(BASE + "/", { waitUntil: "load" });

  // Follow whatever answer the home page actually links to, rather than a
  // fixed question. On a blank template with no published answers there is
  // no such journey to test, so the gate passes vacuously.
  // The trailing slash means this matches answer pages (/how-do-i/<slug>)
  // but not the index (/how-do-i).
  const link = page.locator('main a[href*="/how-do-i/"]').first();
  if ((await link.count()) === 0) {
    console.log(`\n### ${label} ###`);
    console.log("  no published answer is linked from the home page — nothing to test");
    console.log("  PASS");
    await browser.close();
    return true;
  }
  const href = await link.getAttribute("href");
  await link.click();
  await page.waitForLoadState("load");
  await page.waitForTimeout(400);

  const result = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    const body = [...document.querySelectorAll("main p")].find((p) => p.innerText.length > 60);
    const rect = body?.getBoundingClientRect();
    return {
      path: location.pathname,
      h1: h1?.innerText ?? null,
      h1Count: document.querySelectorAll("h1").length,
      // Any <details> here would mean the answer is behind a control again.
      hiddenBehindDisclosure: document.querySelectorAll("details").length,
      answerVisibleWithoutScrolling: rect ? rect.top >= 0 && rect.top < innerHeight : false,
    };
  });

  const pass =
    result.h1Count === 1 &&
    result.hiddenBehindDisclosure === 0 &&
    result.answerVisibleWithoutScrolling;

  console.log(`\n### ${label} ###`);
  console.log(`  task href : ${href}`);
  console.log(`  ${JSON.stringify(result)}`);
  console.log(`  ${pass ? "PASS" : "FAIL"}`);

  await browser.close();
  return pass;
}

(async () => {
  const withoutJs = await run(false);
  const withJs = await run(true);
  if (!withoutJs || !withJs) {
    console.error("\nno-JS gate FAILED");
    process.exit(1);
  }
  console.log("\nno-JS gate passed");
})();
