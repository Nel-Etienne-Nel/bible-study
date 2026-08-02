"""Convert the world-english-bible package's Song of Solomon JSON into a
compact structure that preserves the poetic line layout.

Output shape:
{
  "book": ...,
  "translation": ...,
  "chapters": [
    { "n": 1,
      "blocks": [
        { "kind": "poetry"|"prose",
          "lines": [ [ {"v": 1, "t": "text"}, ... ], ... ] } ] } ]
}

A line is a list of segments so that a verse starting mid-line still gets its
number rendered in the right place.
"""
import json
import re
from pathlib import Path

SRC = Path(__file__).parent / "package/json/songofsolomon.json"
OUT = Path(__file__).parent / "scripture.json"

nodes = json.load(SRC.open())

chapters = {}
block = None
line = None
kind = None


def flush_line():
    global line
    if line:
        # drop segments that are pure whitespace
        cleaned = [s for s in line if s["t"].strip()]
        if cleaned:
            block["lines"].append(cleaned)
    line = None


def flush_block():
    """Emit the buffered block, splitting it wherever it crosses a chapter
    boundary — stanzas in the source run straight through chapter breaks."""
    global block
    flush_line()
    if block and block["lines"]:
        run = []
        run_chapter = None
        for ln in block["lines"]:
            ch = ln[0]["c"]
            if run_chapter is not None and ch != run_chapter:
                emit(run_chapter, run)
                run = []
            run_chapter = ch
            run.append(ln)
        if run:
            emit(run_chapter, run)
    block = None


def emit(chapter, lines):
    chapters.setdefault(chapter, []).append(
        {
            "kind": block["kind"],
            "lines": [[{"v": s["v"], "t": s["t"]} for s in ln] for ln in lines],
        }
    )


for node in nodes:
    t = node["type"]
    if t in ("stanza start", "paragraph start"):
        flush_block()
        kind = "poetry" if t == "stanza start" else "prose"
        block = {"kind": kind, "lines": []}
    elif t in ("stanza end", "paragraph end"):
        flush_block()
    elif t == "line break":
        flush_line()
    elif t in ("line text", "paragraph text"):
        if block is None:
            block = {"kind": "poetry", "lines": []}
        ch = node["chapterNumber"]
        v = node["verseNumber"]
        text = re.sub(r"\s+", " ", node["value"]).strip()
        if line is None:
            line = []
        if line and line[-1]["v"] == v and line[-1]["c"] == ch:
            line[-1]["t"] = (line[-1]["t"] + " " + text).strip()
        else:
            line.append({"v": v, "t": text, "c": ch})

flush_block()

data = {
    "book": "Song of Solomon",
    "translation": "World English Bible",
    "translationNote": "Public domain. No permission needed to quote or reproduce.",
    "chapters": [
        {"n": n, "blocks": chapters[n]} for n in sorted(chapters)
    ],
}

# sanity check: every verse 1..max present, exactly 117 verses
expected = {1: 17, 2: 17, 3: 11, 4: 16, 5: 16, 6: 13, 7: 13, 8: 14}
total = 0
for chap in data["chapters"]:
    found = sorted({seg["v"] for b in chap["blocks"] for ln in b["lines"] for seg in ln})
    assert found == list(range(1, expected[chap["n"]] + 1)), (chap["n"], found)
    total += len(found)
assert total == 117, total

OUT.write_text(json.dumps(data, ensure_ascii=False, indent=1) + "\n")
print(f"wrote {OUT} — {total} verses, {len(data['chapters'])} chapters")
