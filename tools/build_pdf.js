/* Render the study to a print-ready PDF.
 *
 *   npm i -D playwright-core          # or playwright
 *   node tools/build_pdf.js           # writes song-of-solomon-study.pdf
 *
 * The page's own print stylesheet does the work: the margin notes drop back
 * into the flow under their verse, every note is shown whether or not it was
 * open on screen, and each episode starts on a fresh page.
 */
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright-core");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "song-of-solomon-study.pdf");

function findChromium() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH || "/opt/pw-browsers";
  if (!fs.existsSync(base)) return undefined; // let playwright resolve it
  const dir = fs.readdirSync(base).find((d) => d.startsWith("chromium-"));
  return dir ? path.join(base, dir, "chrome-linux", "chrome") : undefined;
}

(async () => {
  const browser = await chromium.launch({
    executablePath: findChromium(),
    args: ["--no-sandbox"],
  });
  // Wide viewport so the renderer runs its normal path before print CSS
  // takes over; nothing about the PDF depends on it.
  const page = await browser.newPage({ viewport: { width: 1280, height: 1600 } });

  await page.goto("file://" + path.join(ROOT, "index.html"), {
    waitUntil: "networkidle",
  });
  await page.waitForFunction(
    () => document.querySelectorAll(".vnum").length === 117
  );

  await page.pdf({
    path: OUT,
    format: "A4",
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: "<div></div>",
    footerTemplate:
      '<div style="width:100%;font:8pt Georgia,serif;color:#a49a8d;' +
      'text-align:center;padding-top:6mm;">' +
      '<span class="pageNumber"></span></div>',
    margin: { top: "18mm", right: "15mm", bottom: "20mm", left: "15mm" },
  });

  await browser.close();
  const kb = Math.round(fs.statSync(OUT).size / 1024);
  console.log(`wrote ${path.relative(ROOT, OUT)} — ${kb} KB`);
})();
