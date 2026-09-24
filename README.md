# Bible Study

Books of the Bible, and the teachers who have taught through them. Built for
`bible.etiennenel.com`.

The site has two ways in:

- **Books** — each book's full text, with every teaching on it listed at the
  top. Only the books listed in `data/books.js` appear.
- **Teachers** — each teacher's series, broken down into lessons. Every
  lesson has its own page: its passage, its main points, and the notes
  beside the verses they belong to.

```
/                                                  home
/books/                                            the books
/books/song-of-solomon/                            text + teachings on it
/teachers/                                         the teachers
/teachers/tommy-nelson/                            bio, series, lessons
/teachers/tommy-nelson/song-of-solomon/            a whole series, every note
/teachers/tommy-nelson/song-of-solomon/03-the-art-of-courtship-part-1/
                                                   one lesson
```

## How it's put together

Plain HTML, CSS and JavaScript. No framework and no dependencies. `build.js`
generates every page from four kinds of data file:

```
data/books.js                              which books appear, in order
data/scripture/<book>.js                   the text — generated, don't edit
data/teachers/<teacher>.js                 a teacher, their bio and series
data/studies/<teacher>/<series>.js         a series' lessons and notes  ← you edit these

assets/app.js       renders a reading page: the text, lessons and notes
assets/style.css    the look, including print
build.js            generates dist/
tools/build_scripture.py   converts a book's text
tools/build_pdf.js         renders each series to a PDF
```

To see it locally:

```sh
node build.js
python3 -m http.server -d dist 8000     # then open http://localhost:8000
```

Or `node build.js --relative` and open `dist/index.html` straight from disk.

## Adding a book

1. Generate its text. The World English Bible is public domain and comes
   from the `world-english-bible` npm package:

   ```sh
   npm pack world-english-bible && tar xzf world-english-bible-*.tgz
   python3 tools/build_scripture.py package/json isaiah isaiah "Isaiah"
   ```

   The arguments are the package's `json/` directory, the package's name for
   the book (`ls package/json` — e.g. `songofsolomon`, `1corinthians`), the
   slug for the URL, and the display name. It checks that every chapter runs
   from verse 1 without gaps.

2. List it in `data/books.js`, in canonical order.

A book with no teaching yet still gets its page — the text on its own.

## Adding a teacher, or a series

A **series** is one teacher's teaching through one book.

1. Create or open `data/teachers/<teacher-slug>.js`:

   ```js
   module.exports = {
     name: "Tommy Nelson",
     bio: "…",
     series: [
       { book: "song-of-solomon", title: "The Song of Solomon", about: "…" },
     ],
   };
   ```

   `book` must be a slug from `data/books.js`. The file name is the URL slug.

2. Create `data/studies/<teacher-slug>/<book-slug>.js` with the lessons and
   notes — see below. If a teacher ever has two series on the same book, give
   one a `slug` in the teacher file and name its study file to match.

Run `node build.js`. It stops with a clear message if anything is missing or
doesn't line up.

## Lessons and notes

Everything for a series lives in its study file: `window.SECTIONS` (the
lessons) and `window.NOTES`.

### Lessons

Each lesson opens at its `start` verse and runs until the next lesson's
start. It gets its own page, a header on the whole-series page, and a row on
the teacher's page.

```js
{
  id: "courtship",        // anchor on the series page — keep it url-safe
  number: "03",           // shown above the title, and starts the lesson's URL
  title: "The Art of Courtship, Part 1",
  range: "2:8 – 2:14",    // display only
  start: [2, 8],          // [chapter, verse]
  end: [2, 14],           // optional — see below
  summary: "…",           // italic paragraph under the title
  episode: {
    title: "3. The Art of Courtship, Part 1",
    url: "https://youtube.com/watch?v=…",   // optional — adds a link
    mainPoints: ["…", "…"],                 // the "Main points" box
  },
}
```

Lessons sort themselves by `start`, so file order doesn't matter. The latest
lesson runs to the end of the book unless it has an `end`, so give it one
while a series is still being added. A lesson's
URL comes from its number and title, so renaming one changes its address.

### Notes

A note pins to a verse. On a wide screen it sits in the margin beside the
verse; on a narrow one it opens beneath the verse when the verse is clicked.

```js
{
  ref: [1, 4],                       // [chapter, verse]
  phrase: "Take me away with you",   // optional — these exact words get highlighted
  title: "The prayer that starts everything",
  body: "A paragraph of teaching.",
  points: ["A main point.", "Another."],
  episode: "1. The Art of Attraction",   // optional, shown as the source line
}
```

`phrase` must match words that actually appear in that verse, or nothing
highlights. Matching ignores case, and straight quotes match curly ones.
Pass a list to highlight several phrases in one verse, and keep them short —
the few words carrying the point, not the whole sentence. Several notes can
share a verse; they stack.

## Working from transcripts

A transcript becomes one lesson entry — with `mainPoints` for the material
that isn't tied to a particular verse — plus notes on the verses that got the
most time. Set the lesson's range from what the transcript actually covers,
not from the video title.

Tommy Nelson's Song of Solomon: all twelve lessons are in, every range
confirmed against its transcript. **The two conflict sessions run in the
opposite order to their titles** — the video titled Part 2 is the earlier
session (5:2–5:9), the one titled Part 1 the later (5:10–6:13). They're
ordered here by content.

## Deploying to Cloudflare

The site runs as a Cloudflare **Worker** named `bible-study`, serving `dist/`
as static assets — there is no Worker code. In the project's
**Settings → Build**:

| Setting | Value |
| --- | --- |
| Build command | `node build.js` |
| Deploy command | `npx wrangler deploy` |

Every push to `main` then builds and deploys. To deploy by hand instead:

```sh
node build.js
npx wrangler deploy
```

`name` in `wrangler.toml` must match the Worker's name in Cloudflare.

Pages revalidate on every request. Scripts, styles and data are linked with
a content hash (`?v=…`), so `_headers` caches them hard — a changed file
always arrives under a new URL.

## PDFs

```sh
node build.js
npm i -D playwright-core
node tools/build_pdf.js        # writes pdf/<teacher>-<series>.pdf
```

Or open a series page and press Ctrl/Cmd-P, with "Background graphics" on.
In print, notes drop into the flow beneath their verse and every note is
shown.
