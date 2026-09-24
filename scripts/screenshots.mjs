/**
 * Refreshes the project screenshots in public/work.
 *
 *   npx puppeteer browsers install chrome   # once
 *   node scripts/screenshots.mjs
 *
 * Needs puppeteer and ImageMagick available; neither is a project dependency,
 * since this runs by hand whenever a project's landing page changes.
 */
import { execFile } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import puppeteer from "puppeteer";

const run = promisify(execFile);

const targets = [
  { name: "hareha", url: "https://hareha.com" },
  { name: "ukowapi", url: "https://ukowapi.site" },
  { name: "studywings", url: "https://studywings.co.tz" },
];

const work = await mkdtemp(join(tmpdir(), "shots-"));

for (const { name, url } of targets) {
  // One browser per site: three 2x pages at once exhausts memory on a laptop.
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 2 });

  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 90_000 });
  } catch {
    console.warn(`${name}: navigation timed out, capturing anyway`);
  }

  // Hero animations, carousels and Flutter canvases need time to paint.
  await new Promise((r) => setTimeout(r, 7000));
  await page.evaluate(() => window.scrollTo(0, 600));
  await new Promise((r) => setTimeout(r, 1500));
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 3000));

  const raw = join(work, `${name}.png`);
  await page.screenshot({ path: raw });
  await browser.close();

  await run("magick", [raw, "-resize", "1600x1000", "-quality", "82", "-strip", `public/work/${name}.webp`]);
  console.log(`${name}: public/work/${name}.webp`);
}

await rm(work, { recursive: true, force: true });
