/* Print a passage exactly as the site has it, one poetic line per row.
 *
 *   node tools/verses.js song-of-solomon 5:2 5:9
 *   node tools/verses.js isaiah 53            # a whole chapter
 *
 * Use it before writing notes: a note's `phrase` only highlights if it
 * matches these words, and only within a single row — a phrase that runs
 * across a line break will not highlight.
 */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const [slug, fromArg, toArg] = process.argv.slice(2);
if (!slug || !fromArg) {
  console.error("usage: node tools/verses.js <book-slug> <chapter[:verse]> [chapter[:verse]]");
  process.exit(1);
}
const file = path.join(__dirname, "..", "data", "scripture", slug + ".js");
if (!fs.existsSync(file)) {
  console.error(`no scripture for "${slug}" — see data/scripture/`);
  process.exit(1);
}
const window = {};
vm.runInNewContext(fs.readFileSync(file, "utf8"), { window });
const book = window.SCRIPTURE;

const parse = (s, end) => {
  const [c, v] = s.split(":").map(Number);
  return [c, v || (end ? Infinity : 1)];
};
const from = parse(fromArg, false);
const to = toArg ? parse(toArg, true) : fromArg.includes(":") ? from : [from[0], Infinity];
const cmp = (c, v, r) => c - r[0] || v - r[1];

let rows = 0;
for (const ch of book.chapters) {
  for (const block of ch.blocks) {
    for (const line of block.lines) {
      for (const seg of line) {
        if (cmp(ch.n, seg.v, from) >= 0 && cmp(ch.n, seg.v, to) <= 0) {
          console.log(`${ch.n}:${seg.v} | ${seg.t}`);
          rows++;
        }
      }
    }
  }
}
if (!rows) {
  console.error(`nothing in ${book.book} between ${fromArg} and ${toArg || fromArg}`);
  process.exit(1);
}
