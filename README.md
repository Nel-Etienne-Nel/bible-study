# Song of Solomon — A Study

A single off-white reading page: the whole book, centred, divided into
sections, with teaching notes from the video series pinned to the verses they
belong to.

Open `index.html` in a browser. No build step, no server, no dependencies —
double-clicking the file works.

```
index.html            the page
assets/style.css      the look
assets/app.js         renders scripture + study data (you shouldn't need to touch this)
data/scripture.js     the full text, generated — do not hand-edit
data/study.js         ← the file you edit
tools/build_scripture.py  regenerates data/scripture.js
```

## Scripture text

World English Bible, all 8 chapters and 117 verses, with the original poetic
line breaks intact. The WEB is public domain, so the text can be reproduced
in full, on a public site, with no permission and no attribution requirement.

`data/scripture.js` is generated from the `world-english-bible` npm package by
`tools/build_scripture.py`. Regenerate only if the text ever needs rebuilding:

```sh
npm pack world-english-bible && tar xzf world-english-bible-*.tgz
python3 tools/build_scripture.py
```

## Adding study material

Everything goes in `data/study.js`. Two lists.

### Sections

How the book divides up. A section header renders above its starting verse and
appears in the table of contents.

```js
{
  id: "courtship",        // used for the #anchor — keep it url-safe
  number: "One",          // small label above the title
  title: "The Courtship",
  range: "1:1 – 3:5",     // display only
  start: [1, 1],          // [chapter, verse] — where the header renders
  summary: "…",           // italic paragraph under the title
  episode: {
    title: "Episode 1 — Drawn",
    url: "https://youtube.com/watch?v=…",
    mainPoints: [         // renders as the "Main points" box
      "First point from the episode.",
      "Second point.",
    ],
  },
}
```

The twelve sections in the file follow Tommy Nelson's series: Attraction,
Dating, Courtship (×2), Intimacy (×2), Conflict (×2), Romance (×2), and
Commitment (×2). Ranges marked `// CONFIRM` were cut off in the playlist
screenshots and are set to run contiguously so the whole book is covered;
correct them as each transcript comes in.

Sections sort themselves by `start`, so file order doesn't matter.

### Notes

A note pins to a verse. The verse number turns rust-coloured, and clicking
anywhere in the verse opens the note beneath the stanza.

```js
{
  ref: [1, 4],                       // [chapter, verse]
  phrase: "Take me away with you",   // optional — these exact words get highlighted
  title: "The prayer that starts everything",
  body: "A paragraph of teaching.",
  points: ["A main point.", "Another."],
  episode: "Episode 1",              // optional, shown as the source line
  timestamp: "14:20",                // optional
}
```

`phrase` must match words that actually appear in that verse, or nothing
highlights. Matching ignores case, and straight quotes match curly ones, so
`"Let's hurry"` finds `Let’s hurry`. Leave `phrase` out to mark the verse
without highlighting any particular words.

Pass a list to highlight several phrases in one verse:

```js
phrase: ["pleasing fragrance", "Your name is oil poured out"],
```

Keep phrases short — the few words carrying the point, not the whole
sentence. Highlighting entire lines reads as heavy rather than as emphasis.

Several notes can share a verse — list them separately and they stack.

## Working from transcripts

The workflow this is built for: a transcript comes in, the points that matter
get pulled out and attached to the verse being taught on. A transcript that
covers 2:8–17 usually becomes one section entry (with `mainPoints`) plus a
handful of notes on the specific verses that got the most time.

## Reading the page

- On a wide screen (1140px and up) the notes sit in the **margins**, level
  with their verse, alternating left and right. A note is nudged down when the
  one above it in the same column would overlap.
- On a narrow screen there is no margin to use, so notes stay in the text,
  hidden until you **click a verse** with a coloured number.
- **Show all notes** (bottom right) opens every note at once — useful for
  reading straight through, or for printing.
- Printing hides the contents and the button and drops the background.
