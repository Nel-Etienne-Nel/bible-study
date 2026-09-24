/* Builds the site into dist/.
 *
 *   node build.js              # for deployment — clean URLs like /books/isaiah/
 *   node build.js --relative   # opens straight from disk, no server needed
 *
 * Reads:
 *   data/books.js                       which books appear, in order
 *   data/teachers/<teacher>.js          a teacher and their series
 *   data/studies/<teacher>/<series>.js  a series' lessons and notes
 *   data/scripture/<book>.js            the text, generated per book
 *   data/notes/<book>.js                optional notes on the book itself
 *
 * Writes one page per book, teacher, series and lesson, plus the indexes.
 * No dependencies beyond Node itself.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");

const ROOT = __dirname;
const OUT = path.join(ROOT, "dist");
const RELATIVE = process.argv.includes("--relative");
const SITE = "Bible Study";

/* ---------------------------------------------------------------- loading */

function loadBrowserData(file) {
  const window = {};
  vm.runInNewContext(fs.readFileSync(file, "utf8"), { window }, { filename: file });
  return window;
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function fail(msg) {
  console.error("build failed: " + msg);
  process.exit(1);
}

const books = require("./data/books.js").map((b) => {
  const file = path.join(ROOT, "data/scripture", b.slug + ".js");
  if (!fs.existsSync(file)) fail(`no scripture for ${b.name} — run tools/build_scripture.py`);
  const scripture = loadBrowserData(file).SCRIPTURE;
  // A book can carry its own notes, separate from any teacher's series —
  // same format as a study, plus an optional INTRO shown above the text.
  const notesFile = path.join(ROOT, "data/notes", b.slug + ".js");
  let notes = null;
  if (fs.existsSync(notesFile)) {
    const n = loadBrowserData(notesFile);
    notes = { intro: n.INTRO || null, count: (n.NOTES || []).length };
  }
  return { ...b, scripture, notes, series: [] };
});
const bookBySlug = Object.fromEntries(books.map((b) => [b.slug, b]));

const teachers = fs
  .readdirSync(path.join(ROOT, "data/teachers"))
  .filter((f) => f.endsWith(".js"))
  .sort()
  .map((f) => {
    const slug = f.replace(/\.js$/, "");
    const t = require(path.join(ROOT, "data/teachers", f));
    const teacher = { ...t, slug };
    teacher.series = (t.series || []).map((s) => {
      const book = bookBySlug[s.book];
      if (!book) fail(`${t.name}'s series "${s.title}" is on "${s.book}", which is not in data/books.js`);
      const seriesSlug = s.slug || s.book;
      const studyFile = path.join(ROOT, "data/studies", slug, seriesSlug + ".js");
      if (!fs.existsSync(studyFile)) fail(`missing ${path.relative(ROOT, studyFile)}`);
      const study = loadBrowserData(studyFile);
      const sections = (study.SECTIONS || [])
        .slice()
        .sort((a, b) => a.start[0] - b.start[0] || a.start[1] - b.start[1]);
      const series = {
        ...s,
        slug: seriesSlug,
        teacher,
        book,
        studyFile,
        notes: (study.NOTES || []).length,
      };
      series.lessons = sections.map((sec, i) => ({
        section: sec,
        slug: `${sec.number || String(i + 1).padStart(2, "0")}-${slugify(sec.title)}`,
        index: i,
        from: sec.start,
        until: sections[i + 1] ? sections[i + 1].start : null,
        // a lesson's optional `end` stops it short of the next one — needed
        // for the latest lesson while a series is still being added
        to: sec.end || null,
      }));
      book.series.push(series);
      return series;
    });
    return teacher;
  });

/* --------------------------------------------------------------- linking */

const urls = {
  home: () => "/",
  books: () => "/books/",
  book: (b) => `/books/${b.slug}/`,
  teachers: () => "/teachers/",
  teacher: (t) => `/teachers/${t.slug}/`,
  series: (s) => `/teachers/${s.teacher.slug}/${s.slug}/`,
  lesson: (s, l) => `/teachers/${s.teacher.slug}/${s.slug}/${l.slug}/`,
};

// Static files get a content hash in their URL, so they can be cached hard
// and still update the moment they change.
const hashes = {};
function versioned(file) {
  if (!hashes[file]) {
    hashes[file] = crypto
      .createHash("sha1")
      .update(fs.readFileSync(path.join(ROOT, file)))
      .digest("hex")
      .slice(0, 10);
  }
  return `/${file}?v=${hashes[file]}`;
}

// In --relative mode every link is rewritten relative to the page it is on,
// with index.html spelled out, so dist/ works opened from disk.
function linker(pageUrl) {
  return (target) => {
    if (!RELATIVE) return target;
    const [p, query] = target.split("?");
    let rel = path.posix.relative(pageUrl, p);
    if (p.endsWith("/")) rel = (rel ? rel + "/" : "") + "index.html";
    return rel + (query ? "?" + query : "");
  };
}

/* ------------------------------------------------------------- templates */

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function plural(n, one, many) {
  return `${n} ${n === 1 ? one : many || one + "s"}`;
}

function shell({ url, title, description, crumbs, body, scripts, bodyClass }) {
  const to = linker(url);
  const trail = crumbs
    .map((c, i) =>
      i === crumbs.length - 1
        ? `<span aria-current="page">${esc(c.label)}</span>`
        : `<a href="${to(c.href)}">${esc(c.label)}</a>`
    )
    .join('<span class="sep" aria-hidden="true">/</span>');
  const scriptTags = (scripts || [])
    .map((s) => (s.inline ? `<script>${s.inline}</script>` : `<script src="${to(versioned(s))}"></script>`))
    .join("\n    ");
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="icon" href="${to(versioned("assets/favicon.svg"))}" type="image/svg+xml" />
    <link rel="stylesheet" href="${to(versioned("assets/style.css"))}" />
  </head>
  <body${bodyClass ? ` class="${bodyClass}"` : ""}>
    <nav class="crumbs" aria-label="Breadcrumb">${trail}</nav>
${body.replace(/__HREF\(([^)]*)\)__/g, (_, t) => to(t))}
    <footer class="colophon">
      <p>Scripture from the World English Bible, which is in the public domain.</p>
    </footer>
    ${scriptTags}
  </body>
</html>
`;
}

// Links inside page bodies are written as __HREF(/path/)__ so shell() can
// resolve them for the page they end up on.
const href = (u) => `__HREF(${u})__`;

function listing(rows) {
  return `<ol class="listing">
${rows
  .map(
    (r) => `      <li><a href="${href(r.href)}">
        <span class="num">${esc(r.num || "")}</span>
        <span class="name">${esc(r.name)}${r.sub ? `<span class="sub">${esc(r.sub)}</span>` : ""}</span>
        <span class="ref">${esc(r.ref || "")}</span>
      </a></li>`
  )
  .join("\n")}
    </ol>`;
}

function masthead(kicker, heading, credit) {
  return `    <header class="masthead">
      ${kicker ? `<p class="kicker">${esc(kicker)}</p>` : ""}
      <h1>${esc(heading)}</h1>
      ${credit ? `<p class="credit">${esc(credit)}</p>` : ""}
    </header>`;
}

function seriesRows(list, { byTeacher }) {
  return list.map((s) => ({
    href: urls.series(s),
    name: byTeacher ? s.teacher.name : s.title,
    sub: byTeacher ? s.title : s.book.name,
    ref: plural(s.lessons.length, "lesson"),
  }));
}

const crumb = {
  home: { label: SITE, href: urls.home() },
  books: { label: "Books", href: urls.books() },
  teachers: { label: "Teachers", href: urls.teachers() },
};

/* ----------------------------------------------------------------- pages */

const pages = [];
const page = (url, html) => pages.push({ url, html });

const bookLabel = (b) =>
  b.series.length ? plural(b.series.length, "teaching") : b.notes ? "Notes" : "Text";

const lessonCount = (t) => t.series.reduce((n, s) => n + s.lessons.length, 0);

page(
  urls.home(),
  shell({
    url: urls.home(),
    title: SITE,
    description: "Books of the Bible, and the teachers who have taught through them.",
    crumbs: [{ label: SITE }],
    body: `${masthead("Scripture & teaching", SITE, "")}
    <main class="index">
      <section>
        <h2 class="index-head"><a href="${href(urls.books())}">Books</a></h2>
        ${listing(
          books.map((b) => ({
            href: urls.book(b),
            name: b.name,
            ref: bookLabel(b),
          }))
        )}
      </section>
      <section>
        <h2 class="index-head"><a href="${href(urls.teachers())}">Teachers</a></h2>
        ${listing(
          teachers.map((t) => ({
            href: urls.teacher(t),
            name: t.name,
            ref: plural(lessonCount(t), "lesson"),
          }))
        )}
      </section>
    </main>`,
  })
);

page(
  urls.books(),
  shell({
    url: urls.books(),
    title: `Books — ${SITE}`,
    description: "The books of the Bible on this site.",
    crumbs: [crumb.home, { label: "Books" }],
    body: `${masthead(SITE, "Books", "")}
    <main class="index">
      ${listing(
        books.map((b) => ({
          href: urls.book(b),
          name: b.name,
          sub: `${b.testament} Testament · ${plural(b.scripture.chapters.length, "chapter")}`,
          ref: bookLabel(b),
        }))
      )}
    </main>`,
  })
);

for (const b of books) {
  const url = urls.book(b);
  const chapters = b.scripture.chapters.map((c) => c.n);
  page(
    url,
    shell({
      url,
      title: `${b.name} — ${SITE}`,
      description: `The book of ${b.name}, and the teachings on it.`,
      crumbs: [crumb.home, crumb.books, { label: b.name }],
      body: `${masthead(`${b.testament} Testament`, b.name, "World English Bible")}
    ${
      b.notes && b.notes.intro
        ? `<section class="index intro">
      <h2 class="index-head">${esc(b.notes.intro.title || "Introduction")}</h2>
      ${[].concat(b.notes.intro.body || []).map((para) => `<p>${esc(para)}</p>`).join("\n      ")}
    </section>`
        : ""
    }
    <section class="index">
      <h2 class="index-head">Teachings</h2>
      ${
        b.series.length
          ? listing(seriesRows(b.series, { byTeacher: true }))
          : `<p class="empty">No teachings on ${esc(b.name)} yet.${b.notes ? "" : " The text is here to read on its own."}</p>`
      }
    </section>
    ${
      chapters.length > 1
        ? `<nav class="chapters index" aria-label="Chapters">
      <h2 class="index-head">Chapters</h2>
      <ol>${chapters.map((n) => `<li><a href="#chapter-${n}">${n}</a></li>`).join("")}</ol>
    </nav>`
        : ""
    }
    <main class="scripture" id="scripture"></main>${
      b.notes ? `\n    <button class="notes-toggle" id="notes-toggle" type="button">Show all notes</button>` : ""
    }`,
      scripts: [
        `data/scripture/${b.slug}.js`,
        ...(b.notes ? [`data/notes/${b.slug}.js`] : []),
        "assets/app.js",
      ],
    })
  );
}

page(
  urls.teachers(),
  shell({
    url: urls.teachers(),
    title: `Teachers — ${SITE}`,
    description: "Teachers, and their series through books of the Bible.",
    crumbs: [crumb.home, { label: "Teachers" }],
    body: `${masthead(SITE, "Teachers", "")}
    <main class="index">
      ${listing(
        teachers.map((t) => ({
          href: urls.teacher(t),
          name: t.name,
          sub: t.series.map((s) => s.book.name).join(", "),
          ref: plural(lessonCount(t), "lesson"),
        }))
      )}
    </main>`,
  })
);

for (const t of teachers) {
  const url = urls.teacher(t);
  page(
    url,
    shell({
      url,
      title: `${t.name} — ${SITE}`,
      description: `${t.name}'s teaching through books of the Bible.`,
      crumbs: [crumb.home, crumb.teachers, { label: t.name }],
      body: `${masthead("Teacher", t.name, "")}
    <main class="index">
      ${t.bio ? `<p class="bio">${esc(t.bio)}</p>` : ""}
      ${t.series
        .map(
          (s) => `<section class="series">
        <h2 class="index-head">${esc(s.title)}</h2>
        ${s.about ? `<p class="about">${esc(s.about)}</p>` : ""}
        <p class="whole"><a href="${href(urls.series(s))}">Read the whole series, with every note →</a></p>
        ${listing(
          s.lessons.map((l) => ({
            href: urls.lesson(s, l),
            num: l.section.number,
            name: l.section.title,
            ref: l.section.range,
          }))
        )}
      </section>`
        )
        .join("\n      ")}
    </main>`,
    })
  );

  for (const s of t.series) {
    const studyScript = `data/studies/${t.slug}/${s.slug}.js`;
    const seriesUrl = urls.series(s);
    const seriesCrumbs = [crumb.home, crumb.teachers, { label: t.name, href: urls.teacher(t) }];
    const toSeries = linker(seriesUrl);
    const lessonHref = Object.fromEntries(s.lessons.map((l) => [l.section.id, toSeries(urls.lesson(s, l))]));

    page(
      seriesUrl,
      shell({
        url: seriesUrl,
        title: `${s.title} — ${t.name}`,
        description: `${t.name}'s teaching through ${s.book.name}, with notes beside the text.`,
        crumbs: [...seriesCrumbs, { label: s.title }],
        body: `${masthead(t.name, s.title, "World English Bible")}
    <nav class="contents" aria-label="Lessons"><ol id="contents-list"></ol></nav>
    <main class="scripture" id="scripture"></main>
    <button class="notes-toggle" id="notes-toggle" type="button">Show all notes</button>`,
        scripts: [
          `data/scripture/${s.book.slug}.js`,
          studyScript,
          { inline: `window.PAGE = ${JSON.stringify({ lessonHref })};` },
          "assets/app.js",
        ],
      })
    );

    for (const l of s.lessons) {
      const url = urls.lesson(s, l);
      const prev = s.lessons[l.index - 1];
      const next = s.lessons[l.index + 1];
      const side = (x, dir) =>
        x
          ? `<a class="${dir}" href="${href(urls.lesson(s, x))}"><span class="dir">${dir === "prev" ? "← Previous" : "Next →"}</span><span class="title">${esc(x.section.title)}</span></a>`
          : `<span class="${dir}"></span>`;
      page(
        url,
        shell({
          url,
          title: `${l.section.title} — ${t.name} on ${s.book.name}`,
          description: `Lesson ${l.section.number} of ${t.name}'s ${s.title}: ${l.section.range}.`,
          crumbs: [...seriesCrumbs, { label: s.title, href: seriesUrl }, { label: `Lesson ${l.section.number || l.index + 1}` }],
          bodyClass: "lesson",
          body: `    <main class="scripture" id="scripture"></main>
    <nav class="lesson-nav" aria-label="Lessons">
      ${side(prev, "prev")}
      ${side(next, "next")}
    </nav>
    <button class="notes-toggle" id="notes-toggle" type="button">Show all notes</button>`,
          scripts: [
            `data/scripture/${s.book.slug}.js`,
            studyScript,
            { inline: `window.PAGE = ${JSON.stringify({ range: { from: l.from, until: l.until, to: l.to } })};` },
            "assets/app.js",
          ],
        })
      );
    }
  }
}

/* ----------------------------------------------------------------- write */

fs.rmSync(OUT, { recursive: true, force: true });

for (const p of pages) {
  const file = path.join(OUT, p.url, "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, p.html);
}

for (const dir of ["assets", "data/scripture", "data/studies", "data/notes"]) {
  if (fs.existsSync(path.join(ROOT, dir)))
    fs.cpSync(path.join(ROOT, dir), path.join(OUT, dir), { recursive: true });
}
fs.copyFileSync(path.join(ROOT, "_headers"), path.join(OUT, "_headers"));

const lessons = teachers.reduce((n, t) => n + lessonCount(t), 0);
console.log(
  `dist/ built${RELATIVE ? " (relative links)" : ""}: ${pages.length} pages — ` +
    `${plural(books.length, "book")}, ${plural(teachers.length, "teacher")}, ` +
    `${plural(teachers.reduce((n, t) => n + t.series.length, 0), "series", "series")}, ` +
    `${plural(lessons, "lesson")}`
);
