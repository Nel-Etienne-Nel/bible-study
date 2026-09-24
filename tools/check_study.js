/* Check lessons and notes against the text, before building.
 *
 *   node tools/check_study.js                          # everything
 *   node tools/check_study.js tommy-nelson/song-of-solomon
 *   node tools/check_study.js notes/isaiah             # a book's own notes
 *
 * Errors (exit 1) — things that would silently break on the page:
 *   - a lesson or note pointing at a verse the book does not have
 *   - two lessons starting on the same verse
 *   - a `phrase` that matches nothing in its verse, so nothing highlights
 *
 * Warnings — allowed, but worth a second look:
 *   - a long phrase, or a note highlighting every line of its verse — a
 *     wall of highlight reads as noise, not emphasis
 *   - a note before the first lesson starts
 *   - a lesson with no notes, or with no main points
 *   - the latest lesson running to the end of the book when its `range`
 *     says it stops sooner — give it an `end`
 *
 * Phrase matching mirrors assets/app.js exactly: case-insensitive, straight
 * and curly quotes interchangeable, and within one line of the text.
 */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const load = (file) => {
  const window = {};
  vm.runInNewContext(fs.readFileSync(file, "utf8"), { window }, { filename: file });
  return window;
};

// same as phrasePattern() in assets/app.js
function phrasePattern(phrase) {
  const loose = phrase
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/['‘’]/g, "['‘’]")
    .replace(/["“”]/g, '["“”]')
    .replace(/\s+/g, "\\s+");
  return new RegExp(loose, "i");
}

const only = process.argv[2];
const targets = [];

// a teacher's series: data/studies/<teacher>/<series>.js
const studiesDir = path.join(ROOT, "data", "studies");
for (const teacher of fs.existsSync(studiesDir) ? fs.readdirSync(studiesDir) : []) {
  for (const f of fs.readdirSync(path.join(studiesDir, teacher))) {
    if (!f.endsWith(".js")) continue;
    const id = `${teacher}/${f.replace(/\.js$/, "")}`;
    if (!only || only === id) targets.push({ id, kind: "study", teacher, file: path.join(studiesDir, teacher, f) });
  }
}

// a book's own notes: data/notes/<book>.js — sections here are headers on
// the book page, not lessons with pages of their own
const notesDir = path.join(ROOT, "data", "notes");
for (const f of fs.existsSync(notesDir) ? fs.readdirSync(notesDir) : []) {
  if (!f.endsWith(".js")) continue;
  const slug = f.replace(/\.js$/, "");
  const id = `notes/${slug}`;
  if (!only || only === id) targets.push({ id, kind: "notes", bookSlug: slug, file: path.join(notesDir, f) });
}

if (!targets.length) {
  console.error(only ? `nothing called "${only}" under data/studies/ or data/notes/` : "nothing to check");
  process.exit(1);
}

let errors = 0;
for (const t of targets) {
  // which book? a study's teacher file says, via the series slug; a book's
  // notes are named after the book
  let bookSlug = t.bookSlug;
  if (t.kind === "study") {
    const teacher = require(path.join(ROOT, "data", "teachers", t.teacher + ".js"));
    const seriesSlug = path.basename(t.file, ".js");
    const series = (teacher.series || []).find((s) => (s.slug || s.book) === seriesSlug);
    if (!series) {
      console.log(`\n✗ ${t.id}: not listed in data/teachers/${t.teacher}.js`);
      errors++;
      continue;
    }
    bookSlug = series.book;
  }
  const scriptureFile = path.join(ROOT, "data", "scripture", bookSlug + ".js");
  if (!fs.existsSync(scriptureFile)) {
    console.log(`\n✗ ${t.id}: no scripture for "${bookSlug}" — run tools/build_scripture.py`);
    errors++;
    continue;
  }
  const book = load(scriptureFile).SCRIPTURE;
  const isStudy = t.kind === "study";
  const study = load(t.file);
  const sections = (study.SECTIONS || []).slice().sort((a, b) => a.start[0] - b.start[0] || a.start[1] - b.start[1]);
  const notes = study.NOTES || [];

  // "c:v" -> [line text, ...] for every row of the verse
  const rows = {};
  for (const ch of book.chapters)
    for (const b of ch.blocks)
      for (const ln of b.lines)
        for (const seg of ln) (rows[`${ch.n}:${seg.v}`] = rows[`${ch.n}:${seg.v}`] || []).push(seg.t);

  const problems = [];
  const warnings = [];
  const where = (r) => `${r[0]}:${r[1]}`;

  const starts = new Set();
  for (const s of sections) {
    if (!rows[where(s.start)]) problems.push(`lesson ${s.number} "${s.title}" starts at ${where(s.start)}, which ${book.book} does not have`);
    if (starts.has(where(s.start))) problems.push(`two lessons start at ${where(s.start)}`);
    starts.add(where(s.start));
    if (isStudy && (!s.episode || !(s.episode.mainPoints || []).length)) warnings.push(`lesson ${s.number} has no main points`);
  }

  const lessonOf = (c, v) => {
    let hit = null;
    for (const s of sections) if (c - s.start[0] || v - s.start[1] ? (c - s.start[0] || v - s.start[1]) >= 0 : true) hit = s;
    return hit;
  };
  const perLesson = new Map(sections.map((s) => [s, 0]));

  let phrases = 0;
  for (const n of notes) {
    const key = where(n.ref);
    if (!rows[key]) {
      problems.push(`note "${n.title}" is on ${key}, which ${book.book} does not have`);
      continue;
    }
    const lesson = lessonOf(n.ref[0], n.ref[1]);
    if (!lesson) {
      if (isStudy) warnings.push(`note "${n.title}" (${key}) comes before the first lesson`);
    } else perLesson.set(lesson, perLesson.get(lesson) + 1);

    const lit = new Set();
    for (const ph of [].concat(n.phrase || [])) {
      phrases++;
      const pat = phrasePattern(ph);
      const line = rows[key].find((t) => pat.test(t));
      if (!line) {
        const acrossLines = pat.test(rows[key].join(" "));
        problems.push(
          `${key} "${ph}" matches nothing in the verse` +
            (acrossLines ? " — it runs across a line break; highlight each line's part separately" : "")
        );
      } else {
        lit.add(line);
        if (ph.trim().split(/\s+/).length > 9)
          warnings.push(`${key} "${ph}" is long — the few words carrying the point read better`);
      }
    }
    if (rows[key].length >= 3 && lit.size === rows[key].length)
      warnings.push(`${key} "${n.title}" highlights every line of the verse — pick the words that carry the point`);
  }
  if (isStudy) for (const [s, count] of perLesson) if (!count) warnings.push(`lesson ${s.number} has no notes yet`);

  // The last lesson runs to the end of the book unless it has an `end`.
  // While a series is still going in, that is usually not what its range says.
  const keys = Object.keys(rows);
  const lastVerse = keys[keys.length - 1];
  const last = sections[sections.length - 1];
  if (isStudy && last && !last.end) {
    const m = String(last.range || "").match(/(\d+):(\d+)\s*$/);
    if (m && `${m[1]}:${m[2]}` !== lastVerse)
      warnings.push(
        `lesson ${last.number} is the latest, so it runs to the end of ${book.book} (${lastVerse}) — ` +
          `its range says ${m[1]}:${m[2]}; add end: [${m[1]}, ${m[2]}]`
      );
  }
  for (const s of sections) if (s.end && !rows[where(s.end)]) problems.push(`lesson ${s.number} ends at ${where(s.end)}, which ${book.book} does not have`);

  // summary
  const verseCount = (s, i) => {
    const next = sections[i + 1];
    return keys.filter((k) => {
      const [c, v] = k.split(":").map(Number);
      const afterStart = (c - s.start[0] || v - s.start[1]) >= 0;
      const beforeNext = !next || (c - next.start[0] || v - next.start[1]) < 0;
      const beforeEnd = !s.end || (c - s.end[0] || v - s.end[1]) <= 0;
      return afterStart && beforeNext && beforeEnd;
    }).length;
  };
  const unit = isStudy ? "lessons" : "sections";
  console.log(`\n${problems.length ? "✗" : "✓"} ${t.id} — ${book.book}: ${sections.length} ${unit}, ${notes.length} notes, ${phrases} phrases`);
  // a book's last section runs on to the end of the book; its count means little
  if (isStudy) sections.forEach((s, i) => {
    console.log(
      `   ${String(s.number || i + 1).padStart(2)}  ${s.title.padEnd(34).slice(0, 34)} ${String(s.range || "").padEnd(14)}` +
        ` ${String(verseCount(s, i)).padStart(3)} verses  ${String(perLesson.get(s)).padStart(2)} notes`
    );
  });
  problems.forEach((p) => console.log(`   error: ${p}`));
  warnings.forEach((w) => console.log(`   warn:  ${w}`));
  errors += problems.length;
}

if (errors) {
  console.log(`\n${errors} error${errors === 1 ? "" : "s"} — fix before publishing.`);
  process.exit(1);
}
