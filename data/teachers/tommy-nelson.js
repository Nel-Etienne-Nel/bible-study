// A teacher, and the series of theirs on this site.
//
// Each series is one teacher's teaching through one book. Its notes and
// lessons live in data/studies/<teacher>/<series slug>.js; the slug defaults
// to the book's, so give a series its own `slug` only if a teacher ever has
// two series on the same book.

module.exports = {
  name: "Tommy Nelson",
  bio:
    "Pastor of Denton Bible Church in Denton, Texas. His teaching through the " +
    "Song of Solomon was given to a gathering of several thousand singles in " +
    "Dallas, and follows one couple from attraction through to the end of " +
    "their lives.",
  series: [
    {
      book: "song-of-solomon",
      title: "The Song of Solomon",
      about:
        "Twelve sessions, from attraction and dating through courtship, the " +
        "wedding night, conflict and romance, to commitment until death.",
    },
  ],
};
