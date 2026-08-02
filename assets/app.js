/* Renders the book from data/scripture.js, weaving in the sections and notes
   from data/study.js. Nothing here needs editing to add study material — put
   it in data/study.js and it shows up. */

(function () {
  "use strict";

  var scripture = window.SCRIPTURE;
  // Sorted so the contents list matches the page no matter what order the
  // sections were written in.
  var sections = (window.SECTIONS || []).slice().sort(function (a, b) {
    return a.start[0] - b.start[0] || a.start[1] - b.start[1];
  });
  var notes = window.NOTES || [];

  // Populated during render: each note panel and the verse it belongs beside.
  var panels = [];

  // Below this the margins are too narrow to hold notes, so they stay in flow
  // beneath their verse.
  var MARGIN_MIN_WIDTH = 1140;

  /* ------------------------------------------------------------- indexing */

  // "chapter:verse" -> section that opens there
  var sectionAt = {};
  sections.forEach(function (s) {
    sectionAt[s.start[0] + ":" + s.start[1]] = s;
  });

  // "chapter:verse" -> [notes], preserving the order given in study.js
  var notesAt = {};
  notes.forEach(function (n) {
    var key = n.ref[0] + ":" + n.ref[1];
    (notesAt[key] = notesAt[key] || []).push(n);
  });

  /* -------------------------------------------------------------- helpers */

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function escapeRe(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // Straight and curly quotes/apostrophes should match each other, so a phrase
  // typed with a plain ' still finds text that uses a ’.
  function phrasePattern(phrase) {
    var loose = escapeRe(phrase)
      .replace(/['‘’]/g, "['‘’]")
      .replace(/["“”]/g, "[\"“”]")
      .replace(/\s+/g, "\\s+");
    return new RegExp(loose, "i");
  }

  /* Writes segment text into `parent`, wrapping any matching note phrases in
     <mark>. Phrases are matched one at a time against what is left. */
  function writeText(parent, text, phrases) {
    var remaining = phrases.slice();

    while (text) {
      var hit = null;
      for (var i = 0; i < remaining.length; i++) {
        var m = phrasePattern(remaining[i]).exec(text);
        if (m && (!hit || m.index < hit.index)) {
          hit = { index: m.index, length: m[0].length, phraseIndex: i };
        }
      }
      if (!hit) break;

      if (hit.index > 0) {
        parent.appendChild(document.createTextNode(text.slice(0, hit.index)));
      }
      parent.appendChild(
        el("mark", null, text.substr(hit.index, hit.length))
      );
      text = text.slice(hit.index + hit.length);
      remaining.splice(hit.phraseIndex, 1);
    }

    if (text) parent.appendChild(document.createTextNode(text));
  }

  /* ------------------------------------------------------------ rendering */

  function renderMainPoints(section) {
    var ep = section.episode;
    if (!ep || !ep.mainPoints || !ep.mainPoints.length) return null;

    var box = el("aside", "main-points");
    box.appendChild(el("h3", null, "Main points"));
    var ul = el("ul");
    ep.mainPoints.forEach(function (point) {
      ul.appendChild(el("li", null, point));
    });
    box.appendChild(ul);

    if (ep.url) {
      var a = el("a", "watch", (ep.title || "Watch this episode") + " →");
      a.href = ep.url;
      a.target = "_blank";
      a.rel = "noopener";
      box.appendChild(a);
    }
    return box;
  }

  function renderSectionHead(section) {
    var head = el("header", "section-head");
    head.id = "section-" + section.id;
    if (section.number) head.appendChild(el("div", "num", section.number));
    head.appendChild(el("h2", null, section.title));
    if (section.range) head.appendChild(el("p", "ref", section.range));
    if (section.summary) {
      head.appendChild(el("p", "summary", section.summary));
    }
    var points = renderMainPoints(section);
    if (points) head.appendChild(points);
    return head;
  }

  function renderNote(note) {
    var panel = el("div", "note");
    // Keyed by attribute rather than id — a verse can carry several notes, and
    // ids have to stay unique.
    panel.dataset.notePanel = note.ref[0] + ":" + note.ref[1];
    panel.hidden = true;

    panel.appendChild(
      el("span", "ref", "Song of Solomon " + note.ref[0] + ":" + note.ref[1])
    );
    if (note.title) panel.appendChild(el("h4", null, note.title));
    if (note.body) panel.appendChild(el("p", null, note.body));

    if (note.points && note.points.length) {
      var ul = el("ul");
      note.points.forEach(function (p) {
        ul.appendChild(el("li", null, p));
      });
      panel.appendChild(ul);
    }

    if (note.episode || note.timestamp) {
      var source = [note.episode, note.timestamp].filter(Boolean).join(" · ");
      panel.appendChild(el("span", "source", source));
    }
    return panel;
  }

  function render() {
    var root = document.getElementById("scripture");
    var numbered = {};

    scripture.chapters.forEach(function (chapter) {
      var chapterMarked = false;

      chapter.blocks.forEach(function (block) {
        var blockEl = el("div", "block " + block.kind);

        block.lines.forEach(function (line) {
          var lineEl = el("p", "line");

          line.forEach(function (seg) {
            var key = chapter.n + ":" + seg.v;
            var section = sectionAt[key];

            // A section can open mid-block; close the block out first.
            if (section && !section._rendered) {
              section._rendered = true;
              if (blockEl.childNodes.length) {
                root.appendChild(blockEl);
                blockEl = el("div", "block " + block.kind);
              }
              root.appendChild(renderSectionHead(section));
            }

            if (!chapterMarked) {
              chapterMarked = true;
              var mark = el("div", "chapter-mark", "Chapter " + chapter.n);
              if (blockEl.childNodes.length) {
                root.appendChild(blockEl);
                blockEl = el("div", "block " + block.kind);
              }
              root.appendChild(mark);
            }

            var verseNotes = notesAt[key] || [];
            var span = el("span", "verse");
            span.dataset.v = key;
            if (verseNotes.length) {
              span.className = "verse has-note";
              span.setAttribute("role", "button");
              span.setAttribute("tabindex", "0");
              span.dataset.note = key;
            }

            // The verse number prints once, at the verse's first segment — a
            // verse usually runs across several poetic lines.
            if (!numbered[key]) {
              numbered[key] = true;
              span.id = "v" + chapter.n + "-" + seg.v;
              span.appendChild(el("sup", "vnum", String(seg.v)));
            }

            // `phrase` may be a single string or a list of them.
            writeText(
              span,
              seg.t,
              verseNotes.reduce(function (all, n) {
                return all.concat(n.phrase || []);
              }, [])
            );

            if (lineEl.childNodes.length) {
              lineEl.appendChild(document.createTextNode(" "));
            }
            lineEl.appendChild(span);
          });

          blockEl.appendChild(lineEl);
        });

        if (blockEl.childNodes.length) root.appendChild(blockEl);
      });
    });

    placeNotes(root);
  }

  /* Anchors each note to the line holding the last piece of its verse. Doing
     it as a post-pass keeps a note with its verse even when a section header
     splits the stanza the verse sits in. */
  function placeNotes(root) {
    notes.forEach(function (note) {
      var key = note.ref[0] + ":" + note.ref[1];
      var spans = root.querySelectorAll('[data-v="' + key + '"]');
      if (!spans.length) return;

      var line = spans[spans.length - 1].closest(".line");
      if (!line) return;

      var panel = renderNote(note);
      // Stack later notes for the same verse after the earlier ones.
      var after = line;
      while (
        after.nextSibling &&
        after.nextSibling.classList &&
        after.nextSibling.classList.contains("note")
      ) {
        after = after.nextSibling;
      }
      after.parentNode.insertBefore(panel, after.nextSibling);
      panels.push({ panel: panel, anchor: spans[spans.length - 1] });
    });
  }

  /* -------------------------------------------------------- table of contents */

  function renderContents() {
    var list = document.getElementById("contents-list");
    if (!list) return;

    sections.forEach(function (s) {
      var a = el("a");
      a.href = "#section-" + s.id;
      a.appendChild(el("span", "num", s.number || ""));
      a.appendChild(el("span", "name", s.title));
      a.appendChild(el("span", "ref", s.range || ""));
      var li = el("li");
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  /* ------------------------------------------------------------ interaction */

  function notePanels(key) {
    return document.querySelectorAll('[data-note-panel="' + key + '"]');
  }

  function toggleNote(key) {
    var open = false;
    notePanels(key).forEach(function (panel) {
      panel.hidden = !panel.hidden;
      open = open || !panel.hidden;
    });
    document.querySelectorAll('[data-note="' + key + '"]').forEach(
      function (verse) {
        verse.classList.toggle("open", open);
      }
    );
    layoutNotes();
  }

  /* ------------------------------------------------------- margin layout */

  /* On a wide screen the notes move out of the text and into the margins,
     alternating sides. Each note sits level with its verse, or as close as it
     can get — a note is pushed down when the one above it in the same column
     would otherwise overlap. Narrow screens leave them in the flow. */
  function layoutNotes() {
    var root = document.getElementById("scripture");
    var wide = window.innerWidth >= MARGIN_MIN_WIDTH;

    root.classList.toggle("notes-margin", wide);

    if (!wide) {
      panels.forEach(function (entry) {
        entry.panel.style.top = "";
        entry.panel.classList.remove("note--left", "note--right");
      });
      root.style.minHeight = "";
      return;
    }

    var rootTop = root.getBoundingClientRect().top;
    var bottom = [0, 0]; // running bottom edge of the left and right columns
    var GAP = 28;

    panels.forEach(function (entry) {
      var panel = entry.panel;
      if (panel.hidden) return;

      // Whichever column has more room keeps the note nearest its verse.
      var col = bottom[0] <= bottom[1] ? 0 : 1;
      panel.classList.toggle("note--left", col === 0);
      panel.classList.toggle("note--right", col === 1);

      var wanted = entry.anchor.getBoundingClientRect().top - rootTop;
      var top = Math.max(wanted, bottom[col]);
      panel.style.top = top + "px";
      bottom[col] = top + panel.offsetHeight + GAP;
    });

    root.style.minHeight = Math.max(bottom[0], bottom[1]) + "px";
  }

  function bindInteraction() {
    document.addEventListener("click", function (e) {
      var verse = e.target.closest(".verse.has-note");
      if (verse) toggleNote(verse.dataset.note);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var verse = e.target.closest && e.target.closest(".verse.has-note");
      if (!verse) return;
      e.preventDefault();
      toggleNote(verse.dataset.note);
    });

    var toggle = document.getElementById("notes-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", function () {
      // Read the current state rather than tracking it — a single note can be
      // opened or closed on its own between presses.
      var anyOpen = [].some.call(
        document.querySelectorAll(".note"),
        function (panel) {
          return !panel.hidden;
        }
      );
      var show = !anyOpen;

      document.querySelectorAll(".note").forEach(function (panel) {
        panel.hidden = !show;
      });
      document.querySelectorAll(".verse.has-note").forEach(function (verse) {
        verse.classList.toggle("open", show);
      });
      toggle.textContent = show ? "Hide notes" : "Show all notes";
      layoutNotes();
    });

    if (!document.querySelector(".note")) toggle.hidden = true;
  }

  function bindLayout() {
    var pending = null;
    window.addEventListener("resize", function () {
      clearTimeout(pending);
      pending = setTimeout(layoutNotes, 120);
    });
    // Web fonts and images can settle after first paint and shift the anchors.
    window.addEventListener("load", layoutNotes);
  }

  renderContents();
  render();
  bindInteraction();
  bindLayout();

  // On a wide screen the notes live in the margins, so they show by default.
  if (window.innerWidth >= MARGIN_MIN_WIDTH) {
    panels.forEach(function (entry) {
      entry.panel.hidden = false;
    });
    document.querySelectorAll(".verse.has-note").forEach(function (verse) {
      verse.classList.add("open");
    });
    var toggle = document.getElementById("notes-toggle");
    if (toggle) toggle.textContent = "Hide notes";
  }
  layoutNotes();
})();
