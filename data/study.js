// ---------------------------------------------------------------------------
// STUDY DATA — this is the file you edit as the series goes on.
//
// Two lists:
//   SECTIONS — the twelve episodes of the series. A section header renders
//              above its starting verse and appears in the table of contents.
//   NOTES    — teaching notes pulled from the episode transcripts, each pinned
//              to a verse. A note puts a marker in the margin and, if you give
//              it a `phrase`, highlights those exact words in the text.
//
// Nothing else needs touching. See README.md for the field reference.
// ---------------------------------------------------------------------------

// Ranges marked CONFIRM were cut off in the playlist screenshots. They are set
// to run contiguously so the whole book is covered with no gaps; each one gets
// settled for certain when that episode's transcript comes in.

window.SECTIONS = [
  {
    id: "attraction",
    number: "01",
    title: "The Art of Attraction",
    range: "1:1 – 1:7",
    start: [1, 1],
    summary:
      "The song begins with desire, not with a wedding. She wants the king, " +
      "and she is honest about what she thinks of herself — dark from the sun, " +
      "made to keep her brothers' vineyards, her own vineyard untended.",
    episode: { title: "", url: "", mainPoints: [] },
  },
  {
    id: "dating",
    number: "02",
    title: "The Art of Dating",
    range: "1:8 – 2:7",
    start: [1, 8],
    summary:
      "The first exchange between them. He tells her what he sees; she answers. " +
      "Praise moves back and forth until it closes on the charge not to stir up " +
      "love before it pleases.",
    episode: { title: "", url: "", mainPoints: [] },
  },
  {
    id: "courtship-1",
    number: "03",
    title: "The Art of Courtship, Part 1",
    range: "2:8 – 2:17", // CONFIRM
    start: [2, 8],
    summary:
      "His voice on the mountains, the call to rise up and come away, and the " +
      "little foxes that spoil the vines.",
    episode: { title: "", url: "", mainPoints: [] },
  },
  {
    id: "courtship-2",
    number: "04",
    title: "The Art of Courtship, Part 2",
    range: "3:1 – 3:5", // CONFIRM
    start: [3, 1],
    summary:
      "The night search through the city — losing him, looking for him, finding " +
      "him, and holding on. It ends again with the charge not to awaken love " +
      "too early.",
    episode: { title: "", url: "", mainPoints: [] },
  },
  {
    id: "intimacy-1",
    number: "05",
    title: "The Art of Intimacy, Part 1",
    range: "3:6 – 4:6", // CONFIRM end
    start: [3, 6],
    summary:
      "The wedding procession comes up out of the wilderness, and the king " +
      "describes his bride for the first time.",
    episode: { title: "", url: "", mainPoints: [] },
  },
  {
    id: "intimacy-2",
    number: "06",
    title: "The Art of Intimacy, Part 2",
    range: "4:7 – 5:1", // CONFIRM start
    start: [4, 7],
    summary:
      "“You are all beautiful, my love. There is no spot in you.” The " +
      "garden locked, the garden opened, and the wedding night.",
    episode: { title: "", url: "", mainPoints: [] },
  },
  {
    id: "conflict-1",
    number: "07",
    title: "The Art of Conflict, Part 1",
    range: "5:2 – 5:16", // CONFIRM
    start: [5, 2],
    summary:
      "He knocks; she hesitates. By the time she opens the door he is gone. " +
      "The search that follows costs her something, and she still answers the " +
      "daughters of Jerusalem by describing him head to foot.",
    episode: { title: "", url: "", mainPoints: [] },
  },
  {
    id: "conflict-2",
    number: "08",
    title: "The Art of Conflict, Part 2",
    range: "6:1 – 6:13", // CONFIRM
    start: [6, 1],
    summary:
      "Where has he gone? He was in his garden the whole time. The restoration, " +
      "and praise that comes back stronger than before.",
    episode: { title: "", url: "", mainPoints: [] },
  },
  {
    id: "romance-1",
    number: "09",
    title: "The Art of Romance, Part 1",
    range: "7:1 – 7:9", // CONFIRM end
    start: [7, 1],
    summary:
      "Married love that has not gone cold. He describes her again — and this " +
      "time it is a husband speaking, not a suitor.",
    episode: { title: "", url: "", mainPoints: [] },
  },
  {
    id: "romance-2",
    number: "10",
    title: "The Art of Romance, Part 2",
    range: "7:10 – 8:4", // CONFIRM
    start: [7, 10],
    summary:
      "“I am my beloved’s, and his desire is toward me.” Her " +
      "invitation to go out to the field, and what she has laid up for him.",
    episode: { title: "", url: "", mainPoints: [] },
  },
  {
    id: "commitment-1",
    number: "11",
    title: "The Art of Commitment, Part 1",
    range: "8:5 – 8:7", // CONFIRM
    start: [8, 5],
    summary:
      "The seal on the heart. Love as strong as death, jealousy as cruel as " +
      "the grave, and many waters that cannot quench it.",
    episode: { title: "", url: "", mainPoints: [] },
  },
  {
    id: "commitment-2",
    number: "12",
    title: "The Art of Commitment, Part 2",
    range: "8:8 – 8:14", // CONFIRM
    start: [8, 8],
    summary:
      "The little sister, the wall and the door, Solomon’s vineyard let " +
      "out to keepers — and the last word of the book, spoken by her.",
    episode: { title: "", url: "", mainPoints: [] },
  },
];

window.NOTES = [
  // Example note — delete this once the first episode goes in. It shows every
  // field a note can carry.
  {
    ref: [1, 4],
    phrase: "Take me away with you",
    title: "The prayer that starts everything",
    body:
      "The whole book turns on a request, not an achievement. She does not " +
      "climb toward the king; she asks to be taken. Every movement that " +
      "follows in the Song is a response to that first pull.",
    points: [
      "Desire is the evidence of having already been drawn, not the price of it.",
      "“Let’s hurry” — the drawing produces motion, immediately.",
    ],
    episode: "",
    timestamp: "",
  },
];
