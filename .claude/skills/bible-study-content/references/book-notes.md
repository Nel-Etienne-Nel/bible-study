# The owner's own notes on a book

Notes the owner writes themselves — not from a teacher — go on the book's
own page, in `data/notes/<book-slug>.js`. They sit in the margins of
`/books/<book>/` exactly as a series' notes do, and stay separate from the
Teachers side of the site. Isaiah's are the working example.

The format is a study's, plus an optional introduction:

```js
window.INTRO = {                 // shown above the text; optional
  title: "The setting",
  body: ["paragraph", "paragraph"],
};

window.SECTIONS = [              // a header above a passage — usually a chapter
  {
    id: "chapter-1-court",
    title: "Chapter 1: God takes his people to court",
    range: "1:1 – 1:31",
    start: [1, 1],
    summary: "…",
    episode: { mainPoints: ["…"] },   // optional box under the header
  },
];

window.NOTES = [ /* exactly as in a study */ ];
```

On a book page, sections are headers only — they don't get pages of their
own, and there's no `number` or `end` to worry about.

## Working from the owner's notes

- **Keep their words.** These are the owner's own writing; place them, don't
  rewrite them. Split a paragraph across verses where it covers several, but
  leave the phrasing alone.
- **Put each point on the verse it's about.** A bullet covering "vv. 10–17"
  goes on the verse carrying its key line (for Isaiah 1, "your hands are
  full of blood" in v. 15), with the range kept in the text.
- **Material about the whole book** goes in `INTRO`; material about a whole
  chapter goes in that chapter's section `summary` or main points.
- **A cross-cutting theme** the owner groups separately (Isaiah's "Where
  Christ comes into view") becomes notes stacked on the relevant verses,
  labelled with `episode: "<theme name>"` so the label prints on each.
- **Their quotations may be from another translation.** Leave their quotes
  as written; take highlight `phrase`s from `tools/verses.js`, or they
  won't land.

Then `node tools/check_study.js notes/<book>` and publish as usual.
