// One place that knows how to start a browser.
//
// Playwright normally manages its own browser download, but CI images and
// sandboxes often ship one already. PLAYWRIGHT_CHROMIUM_PATH points at it;
// without it, Playwright's own resolution is used.
import { chromium, devices } from "playwright";

const EXECUTABLE = process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined;

export const BASE = process.env.AUDIT_BASE_URL || "http://localhost:3000";

export const launch = () =>
  chromium.launch({
    ...(EXECUTABLE ? { executablePath: EXECUTABLE } : {}),
    args: ["--no-sandbox"],
  });

export { devices };
