"""Flatten the site into a single self-contained HTML file.

The published preview can't load sibling files, so the stylesheet, the
scripture data, the study data and the renderer all get inlined. Run this
after editing data/study.js to refresh the preview.

    python3 tools/build_preview.py
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "preview.html"

css = (ROOT / "assets/style.css").read_text()
scripts = [
    (ROOT / "data/scripture.js").read_text(),
    (ROOT / "data/study.js").read_text(),
    (ROOT / "assets/app.js").read_text(),
]

# The publishing wrapper supplies <!doctype>, <html>, <head> and <body>, so the
# file holds the title, the styles, the page content and the scripts — nothing
# structural.
body = """
<header class="masthead">
  <p class="kicker">A Study</p>
  <h1>Song of Solomon</h1>
  <p class="credit">World English Bible</p>
</header>

<nav class="contents" aria-label="Sections">
  <ol id="contents-list"></ol>
</nav>

<main class="scripture" id="scripture"></main>

<footer class="colophon">
  <p>Following Tommy Nelson’s twelve-part study of the Song of Solomon.</p>
  <p>Scripture from the World English Bible, which is in the public domain.</p>
</footer>

<button class="notes-toggle" id="notes-toggle" type="button">Show all notes</button>
"""

parts = [
    "<title>Song of Solomon — A Study</title>",
    "<style>\n" + css + "\n</style>",
    body.strip(),
]
parts += ["<script>\n" + s + "\n</script>" for s in scripts]

OUT.write_text("\n\n".join(parts) + "\n")
print(f"wrote {OUT} — {OUT.stat().st_size // 1024} KB")
