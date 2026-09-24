# bible-study

Static site for bible.etiennenel.com: books of the Bible, and teachers'
series through them, broken into lessons with notes beside the verses.
README.md has the structure and file formats.

## Commands

```sh
node build.js                           # generate dist/
node tools/check_study.js               # check lessons and notes against the text
node tools/verses.js <book> 5:2 5:9     # print a passage exactly as the site has it
```

## Adding content

Transcripts, new books, new teachers and series: use the
`bible-study-content` skill in `.claude/skills/`.

## Conventions

- Commit as `Nel-Etienne-Nel <neletienne18@gmail.com>`, with no
  `Co-Authored-By` or `Claude-Session` trailers — the owner has asked that
  commits carry no AI attribution.
- Pushing to `main` publishes: Cloudflare builds the Worker `bible-study`
  with `node build.js` and deploys it with `npx wrangler deploy`.
- Never edit `data/scripture/*.js` by hand, and never commit `dist/`,
  `pdf/` or an unpacked `package/`.
