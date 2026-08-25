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
assets/favicon.svg    lily of the valleys
data/scripture.js     the full text, generated — do not hand-edit
data/study.js         ← the file you edit
_headers              caching and security headers for Cloudflare Pages
build.sh              assembles dist/ for deployment
wrangler.toml         Cloudflare Pages config
tools/build_scripture.py  regenerates data/scripture.js
tools/build_preview.py    flattens the site into a single preview.html
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

The twelve sections follow Tommy Nelson's series: Attraction, Dating,
Courtship (×2), Intimacy (×2), Conflict (×2), Romance (×2), and Commitment
(×2). All twelve are in, and every range has been confirmed against its
transcript rather than guessed from the playlist titles.

One thing to know if you compare against the playlist: **the two conflict
sessions run in the opposite order to their titles.** The video titled Part 2
is the earlier session (5:2–5:9, and it closes by pointing forward to the one
on how to talk); the video titled Part 1 is the later one (5:10–6:13). They
are ordered here by content so the page reads straight through.

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
get pulled out and attached to the verse being taught on. A transcript
becomes one section entry (with `mainPoints` for the material that isn't tied
to any particular verse) plus notes on the verses that got the most time.

All twelve episodes are in — 79 notes across 126 highlighted phrases. To
revise one, find its notes by the `episode` field and edit in place.

## Deploying to Cloudflare Pages

The site is static — no Workers, no functions, no runtime. `build.sh` copies
the servable files into `dist/` so that `tools/`, `preview.html` and this
README aren't published. `dist/` is gitignored.

```sh
sh build.sh                 # assembles dist/
npx wrangler pages deploy   # reads pages_build_output_dir from wrangler.toml
```

The first deploy will ask you to log in and to create the project; take the
name from `wrangler.toml` (`song-of-solomon-study`) so it matches.

**To deploy from GitHub instead**, connect the repo in the Cloudflare
dashboard and set:

| Setting | Value |
| --- | --- |
| Build command | `sh build.sh` |
| Build output directory | `dist` |
| Root directory | *(leave blank)* |

Every push to `main` then rebuilds and deploys. `wrangler.toml` is read
automatically, so the output directory stays in sync.

### Caching

`_headers` tells Pages to revalidate `index.html` and `data/study.js` on every
request, because those change whenever an episode is revised and neither
filename is content-hashed. `data/scripture.js` and everything in `assets/`
are cached for an hour.

If you edit the CSS or the renderer and don't see the change, that hour is
why — hard-reload, or shorten the `max-age` in `_headers`.

## A PDF version

`tools/build_pdf.js` renders the whole study to a print-ready A4 PDF — 43
pages, each episode starting on a fresh page.

```sh
npm i -D playwright-core
node tools/build_pdf.js        # writes song-of-solomon-study.pdf
```

The page's own print stylesheet does the work, so **Ctrl/Cmd-P from the
browser gives the same result** if you'd rather not install anything — just
tick "Background graphics" so the highlights and note panels keep their
colour.

In print the margin layout is abandoned: absolute positioning cannot
paginate, so each note drops back into the flow directly beneath its verse,
and every note prints whether or not it was open on screen.

The PDF is gitignored as generated output. Commit it if you'd rather people
could download it straight from the repo.

## Reading the page

- On a wide screen (1140px and up) the notes sit in the **margins**, level
  with their verse, alternating left and right. A note is nudged down when the
  one above it in the same column would overlap.
- On a narrow screen there is no margin to use, so notes stay in the text,
  hidden until you **click a verse** with a coloured number.
- **Show all notes** (bottom right) opens every note at once — useful for
  reading straight through, or for printing.
- Printing hides the contents and the button and drops the background.
