# Adding a teacher, or a new series

A **series** is one teacher's teaching through one book. A teacher can have
several; a book can carry several teachers'.

The book must be on the site first — see `new-book.md`.

## 1. The teacher file

`data/teachers/<teacher-slug>.js` — the file name is the URL slug
(`/teachers/tommy-nelson/`). For a new series by an existing teacher, just
add to their `series` list.

```js
module.exports = {
  name: "Tommy Nelson",
  bio: "…",
  series: [
    {
      book: "song-of-solomon",       // a slug from data/books.js
      title: "The Song of Solomon",  // the series' own name
      about: "…",                    // one or two sentences
    },
  ],
};
```

Write the bio only from what you actually know — what the user tells you,
or what the teacher says about themselves in a transcript ("I pastored
Denton Bible Church for twenty years"). Don't fill it in from general
knowledge; a wrong detail about a real person is worse than a short bio.
If you have nothing yet, keep it to a line and say so.

If a teacher ever has two series on the same book, give one a `slug` and
name its study file to match.

## 2. The study file

`data/studies/<teacher-slug>/<series-slug>.js` — the series slug is the
book's slug unless you set one.

```js
// ---------------------------------------------------------------------------
// <Teacher> — <Series title>
//
// One study: one teacher's series on one book. Each entry in SECTIONS is a
// lesson; NOTES are pinned to verses. See the README for the fields.
// ---------------------------------------------------------------------------

window.SECTIONS = [];

window.NOTES = [];
```

If you know the series' lessons in advance — a playlist, say — add them
all now with their titles and best-guess starts, mark each guessed range
`// CONFIRM`, and settle each one as its transcript arrives. Every lesson
gets a page immediately, which shows the text until its notes go in.
Otherwise add lessons one transcript at a time.

## 3. Build and publish

`node build.js` stops with a plain message if the teacher, series, study
file and book don't line up. Then follow Publishing in SKILL.md.
