/**
 * Renders public/og.png — the 1200x630 card chat apps show when the link is shared.
 *
 *   node scripts/og-image.mjs
 *
 * Needs puppeteer available (not a project dependency; this runs by hand when
 * the name, role or tagline changes).
 */
import { writeFile } from "node:fs/promises";
import puppeteer from "puppeteer";

const NAME = "Tevin Mdendu";
const ROLE = "Software Engineer";
const PLACE = "Dar es Salaam, TZ";

const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600&family=Inter:wght@400;500&family=Instrument+Serif:ital@1&display=swap"
      rel="stylesheet"
    />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        width: 1200px; height: 630px;
        background: #f2f0ec; color: #0e0e0d;
        font-family: "Inter", sans-serif;
        display: flex; flex-direction: column; justify-content: space-between;
        padding: 64px 72px;
      }
      h1 {
        font-family: "Inter Tight", sans-serif;
        font-weight: 600; font-size: 104px; line-height: 0.88;
        letter-spacing: -0.045em; text-transform: uppercase;
      }
      em {
        font-family: "Instrument Serif", serif;
        font-style: italic; font-weight: 400;
        text-transform: lowercase; color: #d9481e;
        letter-spacing: -0.02em;
      }
      .rule { height: 1px; background: #d7d3cb; margin-bottom: 28px; }
      .meta {
        display: flex; justify-content: space-between; align-items: baseline;
        font-size: 19px; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 500;
      }
      .muted { color: #78756e; }
      .dot {
        display: inline-block; width: 9px; height: 9px; border-radius: 99px;
        background: #d9481e; margin-right: 12px; vertical-align: middle;
      }
    </style>
  </head>
  <body>
    <div class="meta">
      <span>${NAME}<span class="muted"> / ${ROLE}</span></span>
      <span class="muted">${PLACE}</span>
    </div>

    <h1>Software built<br />for Tanzania —<br /><em>end to end.</em></h1>

    <div>
      <div class="rule"></div>
      <div class="meta">
        <span><span class="dot"></span>Available for work</span>
        <span class="muted">kingzion24.github.io/portfolio</span>
      </div>
    </div>
  </body>
</html>`;

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: "public/og.png" });
await browser.close();

console.log("wrote public/og.png");
