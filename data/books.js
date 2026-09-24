// The books that appear on the site, in canonical order.
//
// Only books listed here get a page. Each needs its scripture generated into
// data/scripture/<slug>.js by tools/build_scripture.py. A book with no
// teaching yet still gets its page — it shows the text on its own.

module.exports = [
  { slug: "song-of-solomon", name: "Song of Solomon", testament: "Old" },
  { slug: "isaiah", name: "Isaiah", testament: "Old" },
];
