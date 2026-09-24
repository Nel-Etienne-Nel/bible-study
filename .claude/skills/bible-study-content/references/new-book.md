# Adding a book

Books appear on the site only when listed in `data/books.js`. A book with no
teaching yet still gets a page — the text on its own, with a chapter jump
list.

## 1. Generate the text

The text is the World English Bible (public domain), from the
`world-english-bible` npm package:

```sh
npm pack world-english-bible && tar xzf world-english-bible-*.tgz
ls package/json            # the package's file names: genesis, songofsolomon, 1corinthians…
python3 tools/build_scripture.py package/json <package-name> <slug> "<Display Name>"
```

For example:

```sh
python3 tools/build_scripture.py package/json 1corinthians 1-corinthians "1 Corinthians"
```

The slug becomes the URL (`/books/1-corinthians/`): lowercase, hyphens. The
script refuses a book whose chapters skip a verse, and prints the chapter
and verse totals. Compare them against the book's known totals —
Isaiah is 66 chapters, 1,292 verses; Song of Solomon 8 and 117.

Unpack the package outside the repo, or delete `package/` and the `.tgz`
afterwards; neither belongs in a commit.

## 2. List it

Add it to `data/books.js`, in canonical order:

```js
{ slug: "1-corinthians", name: "1 Corinthians", testament: "New" },
```

## 3. Build and publish

`node build.js`, check `/books/<slug>/` renders, then follow Publishing in
SKILL.md.
