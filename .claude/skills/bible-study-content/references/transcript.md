# Turning a transcript into a lesson

A transcript becomes one lesson entry in the series' `SECTIONS` — with main
points for the material that isn't tied to a verse — plus notes on the
verses that got the most time.

## 1. Read it as prose

Transcripts from YouTube arrive littered with timestamps
(`1:201 minute, 20 seconds`). Ignore them; they carry nothing. Read for what
the teacher actually teaches, verse by verse.

## 2. Settle the range from the transcript, not the title

The lesson's range is what the teacher actually covers. Look for:

- where they open — "turn to chapter 3 verse 6"
- the last verse they actually teach from
- forward pointers — "that's in our next session", "we'll pick up at…"

Video titles are not reliable. On this site, two sessions titled Part 1 and
Part 2 turned out to run in the opposite order — the one titled Part 2 opened
"last week we looked at intimacy, tonight let's rumble" and closed pointing
forward to the other. Truncated playlist titles have also been wrong by a
few verses. Trust the content.

**The latest lesson in a series runs to the end of the book** unless it
has an `end: [chapter, verse]`. While a series is still going in, give the
newest lesson an `end` so its page stops where the teaching does — and
remove it once the next lesson is added, since that lesson's start does
the job. `check_study.js` warns when this is missing.

If the range differs from the lesson already in the file, correct it — and
move the neighbouring lesson's `start` so no verses are orphaned or doubled
(a lesson runs from its `start` to the next lesson's `start`). A lesson's
page URL comes from its number and title, so renaming one changes its
address; say so if you do.

Ranges still guessed rather than confirmed are marked `// CONFIRM`. Remove
the marker once a transcript settles it.

## 3. Print the passage

```sh
node tools/verses.js <book-slug> <from> <to>
```

Every phrase you highlight comes from this output, and must sit within a
single printed row.

## 4. Sort the material

- **Tied to a verse** — what a word means, the culture behind an image, a
  cross-reference, the teacher's reading of that line → a **note** on that
  verse.
- **Not tied to a verse** — the teacher's framework ("three things dating
  needs"), illustrations, statistics, application aimed at the audience →
  the lesson's **main points**, 5–7 of them.

A teacher sometimes teaches a list across several verses ("the six marks of
a great wedding"). Put each item on the verse it grows from and combine
items that share a verse; don't invent anchors.

## 5. Write the lesson entry

```js
{
  id: "courtship-1",          // url-safe, unique in this series
  number: "03",
  title: "The Art of Courtship, Part 1",   // the teacher's own title
  range: "2:8 – 2:14",
  start: [2, 8],
  end: [2, 14],               // only while this is the series' latest lesson
  summary: "…",               // 1–2 sentences on what happens in the passage
  episode: {
    title: "3. The Art of Courtship, Part 1",
    url: "",                  // leave empty unless the user gives the link
    mainPoints: ["…"],
  },
},
```

## 6. Write the notes

Choose the verses the teacher spent real time on — usually 4 to 10 a
lesson. Not every verse needs one.

```js
{
  ref: [2, 14],
  phrase: ["My dove in the clefts of the rock", "let me see your face"],
  title: "Discovery — what he actually does",
  body: "…",
  points: ["…", "…"],
  episode: "3. The Art of Courtship, Part 1",
},
```

- **title** — the point, in a few words, in the teacher's framing. When the
  teacher numbers things ("step one"), keep the numbering.
- **body** — one paragraph: what the teacher says the verse means, with the
  background they give (a Hebrew word, a custom, a place). Explain *why* it
  means that, the way they did.
- **points** — the lines worth remembering: applications, a sharp phrase of
  theirs, a one-line illustration. One to five.
- **phrase** — one to three short phrases, the words carrying the point.
  Highlighting whole long lines, or every line of a verse, reads as a wall
  of colour rather than emphasis. A phrase running across a line break
  won't highlight: split it.
- **episode** — identical to the lesson's `episode.title`.

### What makes these notes good

The strongest notes on this site connect a verse to another place in the
book, because the text itself is built that way: her "don't stare at me" in
1:6 is answered by "there is no spot in you" in 4:7; the charge "do not
awaken love" (2:7, 3:5, 8:4) is answered by her first word in 4:16,
"awake". When the teacher draws a connection like this — or the text
plainly does — say so in the note and name both references.

### Stay faithful to the teacher

The site presents *their* teaching. Report what they say; don't add your
own theology, sharpen their claims, or fill gaps with commentary. If they
say "four things" and give three, write three. Paraphrase illustrations
briefly rather than reproducing long stretches word for word, and leave out
the names of private people in their anecdotes — public figures are fine.

### Sensitive passages

Some books — Song of Solomon above all — are explicit, and so are teachers
who take them seriously. Report what they teach accurately, in plain and
restrained language, and don't dwell. The site may be read by families.
Where you held back, say so in your report so the user can ask for more.

## 7. Check and publish

`node tools/check_study.js <teacher>/<series>`, then follow Publishing in
SKILL.md.
