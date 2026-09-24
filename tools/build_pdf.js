/* Render every series to a print-ready PDF.
 *
 *   node build.js                  # build the site first
 *   npm i -D playwright-core       # once
 *   node tools/build_pdf.js        # writes pdf/<teacher>-<series>.pdf
 *
 * Serves dist/ on a throwaway local port and prints each series page. The
 * page's print stylesheet does the work: margin notes drop back into the
 * flow under their verse, every note is shown, each lesson starts a page.
 * Ctrl/Cmd-P on a series page in the browser gives the same result.
 */
const fs = require("fs");
const http = require("http");
const path = require("path");
const { chromium } = require("playwright-core");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const OUT = path.join(ROOT, "pdf");

if (!fs.existsSync(path.join(DIST, "index.html"))) {
  console.error("dist/ is missing — run `node build.js` first");
  process.exit(1);
}

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml" };

function serve() {
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]);
    if (p.endsWith("/")) p += "index.html";
    const file = path.join(DIST, p);
    if (!file.startsWith(DIST) || !fs.existsSync(file)) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)));
}

function findChromium() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH || "/opt/pw-browsers";
  if (!fs.existsSync(base)) return undefined; // let playwright resolve it
  const dir = fs.readdirSync(base).find((d) => d.startsWith("chromium-"));
  return dir ? path.join(base, dir, "chrome-linux", "chrome") : undefined;
}

(async () => {
  const series = [];
  for (const t of fs.readdirSync(path.join(DIST, "teachers"))) {
    const tDir = path.join(DIST, "teachers", t);
    if (!fs.statSync(tDir).isDirectory()) continue;
    for (const s of fs.readdirSync(tDir)) {
      if (fs.existsSync(path.join(tDir, s, "index.html"))) series.push([t, s]);
    }
  }

  const server = await serve();
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ executablePath: findChromium(), args: ["--no-sandbox"] });
  fs.mkdirSync(OUT, { recursive: true });

  for (const [t, s] of series) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 1600 } });
    await page.goto(`${base}/teachers/${t}/${s}/`, { waitUntil: "networkidle" });
    await page.waitForFunction(() => document.querySelectorAll(".vnum").length > 0);
    const file = path.join(OUT, `${t}-${s}.pdf`);
    await page.pdf({
      path: file,
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: "<div></div>",
      footerTemplate:
        '<div style="width:100%;font:8pt Georgia,serif;color:#a49a8d;' +
        'text-align:center;padding-top:6mm;"><span class="pageNumber"></span></div>',
      margin: { top: "18mm", right: "15mm", bottom: "20mm", left: "15mm" },
    });
    await page.close();
    console.log(`wrote ${path.relative(ROOT, file)} — ${Math.round(fs.statSync(file).size / 1024)} KB`);
  }

  await browser.close();
  server.close();
})();
