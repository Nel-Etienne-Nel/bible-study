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
    episode: {
      title: "1. The Art of Attraction",
      url: "",
      mainPoints: [
        "Eight chapters carry one couple from attraction through dating and " +
          "courtship to marriage, through two chapters of conflict, and on to " +
          "devotion at the end of life. Not verses scattered here and there — " +
          "a whole book.",
        "Two things to watch for in this section: the qualities each one sees " +
          "in the other, and the standards they hold to cultivate them.",
        "In both of them the physical is played down and character is lifted " +
          "up. He has a name; she has a heart. His name outweighs his looks, " +
          "her heart outweighs her skin.",
        "You are ready to date and marry when you know the kind of person you " +
          "will not settle less for, you know the things you will not do, and " +
          "you are willing to stay single.",
        "Passion without character is lighter fluid on kindling — a roaring " +
          "blaze that is out in a second. Embers of morality, honesty and " +
          "forgiveness burn as long as you keep putting wood on.",
        "All that glitters is not gold — and all that is gold may not " +
          "necessarily glitter.",
      ],
    },
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
    episode: {
      title: "2. The Art of Dating",
      url: "",
      mainPoints: [
        "Three things a dating relationship needs: time with no strings " +
          "attached, cultivation, and restraint.",
        "Time, but not anywhere that makes provision for the flesh. This " +
          "couple eats together and picnics in the open.",
        "Cultivation runs in two steps — regard, then respect. He calls her " +
          "the mare among Pharaoh's chariots; she calls him her sachet of " +
          "myrrh. Then: you are beautiful, and you are pleasant.",
        "Respect and romance are cousins. You cannot love someone you do not " +
          "like — so marry your best friend.",
        "Watch what grows: her view of herself climbs from “don't stare at " +
          "me” to “I am a rose of Sharon”, because of how he treats her.",
        "Sex is the fireplace, not the house. In its place it is warmth and " +
          "light; out of its place it burns the whole thing down and leaves " +
          "you nothing but a sex drive.",
        "Restraint is the man's move to make. The passage closes with him " +
          "saying the feeling is good, but it is waiting for a later day.",
      ],
    },
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
  // ---- 01. The Art of Attraction (1:1–7) ---------------------------------
  {
    ref: [1, 2],
    title: "A married couple looking back",
    body:
      "Verses 2 to 4 are the voice of a woman already married, remembering " +
      "what drew her to him in the first place. Attraction is being examined " +
      "in hindsight — by people whose marriage lasted.",
    episode: "1. The Art of Attraction",
  },
  {
    ref: [1, 3],
    phrase: ["pleasing fragrance", "Your name is oil poured out"],
    title: "His name, not his looks",
    body:
      "In a day when men bathed rarely, a man covered himself in perfume. She " +
      "is telling him he is a good-looking man — and there is nothing wrong " +
      "with that. But look at what takes precedence over it. A man's name is " +
      "his character. Our word character comes from charassō, a metal tool " +
      "for etching: something cut into a life that will not fade away.",
    points: [
      "His name means his integrity, his holiness, his honesty, his " +
        "temperance, whether he can be corrected, whether he can listen.",
      "A man can be handsome, wealthy, and impressive, and still be a man " +
        "who pouts, stomps out, and cannot open his heart to you.",
      "You will spend a marriage loving the soul of your mate, not the " +
        "surface of them. “Sin is always ugly in the dark.”",
      "If he is pressing you morally while dating, he does not fear God's " +
        "standard. His obedience as a single man is a harbinger of the " +
        "husband he will be.",
      "A marriage to a bad person does not assuage the loneliness of being " +
        "single — it removes the hope that went with it.",
    ],
    episode: "1. The Art of Attraction",
  },
  {
    ref: [1, 4],
    phrase: ["Take me away with you", "right to love you"],
    title: "Logical, a privilege, a delight, and right",
    body:
      "Four things sound in a row. Marrying this man is logical — every " +
      "maiden would want him. It is a privilege — draw me after you and let " +
      "us run together. It is a delight — he has brought me into his rooms. " +
      "And it is right.",
    points: [
      "“Let us run together” — attraction that puts two people in motion in " +
        "the same direction.",
      "Everyone has been to a wedding where they kept the receipt on the " +
        "gift: two combustible people, and you could tell it would not hold.",
      "Rightly do they love you — the people watching can tell the " +
        "difference between passion and something that is righteous.",
    ],
    episode: "1. The Art of Attraction",
  },
  {
    ref: [1, 5],
    phrase: "dark, but lovely",
    title: "Lovely, and honest about the drawback",
    body:
      "She calls herself lovely and in the same breath names a physical " +
      "shortcoming. To an eastern woman her skin was her most prized " +
      "possession. Kedar was a bedouin tribe whose tents were woven from " +
      "black wool; Solomon's curtains were purple.",
    episode: "1. The Art of Attraction",
  },
  {
    ref: [1, 6],
    phrase: ["keeper of the vineyards", "my own vineyard"],
    title: "She had not kept her own vineyard",
    body:
      "Her mother's sons are her brothers. They put her out to keep the " +
      "vineyards, and her own vineyard — her own body, her own appearance — " +
      "went untended. Her looks are played down exactly as his were.",
    points: [
      "She submitted to the authority over her.",
      "She was a hard worker, and a servant.",
      "Watch how someone treats the people already in their life — parents, " +
        "roommates. That is how they will eventually treat you.",
    ],
    episode: "1. The Art of Attraction",
  },
  {
    ref: [1, 7],
    phrase: "one who is veiled",
    title: "The line she would not cross",
    body:
      "Veiled women followed the flocks and gave themselves to the shepherds. " +
      "She is saying there are things she will not do to have this man, however " +
      "good he is. She would stay single before she would trade her " +
      "relationship with God for him.",
    points: [
      "You are ready to marry when you know the kind of person you will wait for.",
      "You are ready when you know the things you will not do.",
      "You are ready when you are willing to be single.",
    ],
    episode: "1. The Art of Attraction",
  },
  // ---- 02. The Art of Dating (1:8–2:7) -----------------------------------
  {
    ref: [1, 9],
    phrase: "a steed in Pharaoh’s chariots",
    title: "The mare among Pharaoh's chariots",
    body:
      "The mare that led Pharaoh's chariots was a white steed at the head of " +
      "the whole army — the most precious animal in Egypt, close to a deity. " +
      "Calling her that is not a comment on her build. He is saying she is " +
      "beyond monetary value: infinite, in how he sees her.",
    points: [
      "This is regard — the first half of cultivating a relationship.",
      "A woman in a bad marriage once said she did not want her husband to " +
        "be romantic, only civil: “I wish he would treat me like a Denny's " +
        "waitress.” He was kind to everyone but her.",
    ],
    episode: "2. The Art of Dating",
  },
  {
    ref: [1, 12],
    phrase: "While the king sat at his table",
    title: "They spend time together",
    body:
      "They eat together here, and picnic in the open in verses 16 and 17. " +
      "Time with no strings attached — and deliberately not in a place that " +
      "makes provision for the flesh.",
    points: [
      "“Make no provision for the flesh, in regard to its lusts.” If you park " +
        "somewhere dark and get tempted, of course you did.",
    ],
    episode: "2. The Art of Dating",
  },
  {
    ref: [1, 13],
    phrase: "a sachet of myrrh",
    title: "She thinks about him",
    body:
      "Myrrh was an expensive aromatic resin, and a pouch of perfume was a " +
      "woman's most precious possession — the thing that gave her her " +
      "fragrance. She is saying he is that to her, lying against her all " +
      "night. She dreams about him. Regard runs both directions.",
    episode: "2. The Art of Dating",
  },
  {
    ref: [1, 15],
    phrase: "Your eyes are like doves",
    title: "Regard becomes respect",
    body:
      "You handle a dove gently — you reach out to hold it, carefully. He is " +
      "looking at her beauty, but a deeper one: what Peter calls the " +
      "imperishable quality of a gentle and quiet spirit, which is precious " +
      "in the sight of God.",
    episode: "2. The Art of Dating",
  },
  {
    ref: [1, 16],
    phrase: "yes, pleasant",
    title: "Marry your best friend",
    body:
      "“Pleasant” is the same word used of how David felt about Jonathan. " +
      "She is calling him her best friend. Respect and romance are cousins — " +
      "you cannot love someone you do not like.",
    points: [
      "The old Jimmy Stewart line: “I love her.” “I didn't ask that. Do you " +
        "like her?”",
      "If your mate cannot be your friend, you do not want them as your mate.",
    ],
    episode: "2. The Art of Dating",
  },
  {
    ref: [1, 17],
    phrase: "The beams of our house are cedars",
    title: "A picnic she calls a mansion",
    body:
      "They are outdoors among the cedars and firs, and she calls it a couch " +
      "and a house. He is so pleasant, so tactful, such a good listener, that " +
      "simply being with him makes her feel like a queen. Note what has not " +
      "happened yet — he has not so much as touched her.",
    episode: "2. The Art of Dating",
  },
  {
    ref: [2, 1],
    phrase: ["a rose of Sharon", "a lily of the valleys"],
    title: "What his regard did to her",
    body:
      "Both nouns are singular — roses and lilies do not grow in clumps. In " +
      "chapter 1 she said don't stare at me, I am sunburned, I did not keep " +
      "my own vineyard. Now she says she is the most special woman on earth. " +
      "Nothing changed but how he treated her.",
    points: [
      "The devil will find someone to tell your wife she is special if you " +
        "will not.",
    ],
    episode: "2. The Art of Dating",
  },
  {
    ref: [2, 3],
    phrase: ["under his shadow", "his fruit was sweet to my taste"],
    title: "Shade and fruit — he protects and provides",
    body:
      "Every other man meets no need she has. His shade is protection: she is " +
      "never afraid to come close, because she knows he will not demean her " +
      "or handle her roughly. His fruit is provision. The New Testament says " +
      "it as nourishing and cherishing her as Christ does the church.",
    episode: "2. The Art of Dating",
  },
  {
    ref: [2, 4],
    phrase: "His banner over me is love",
    title: "In public, under his banner",
    body:
      "The banquet hall is a public place. Generals identified their troops " +
      "by a banner — the mark of who they belonged to. His mark of ownership " +
      "over her is love, and anyone in the room can see it in how he treats " +
      "her.",
    points: [
      "Pull the chair out. Open the door. Introduce her by name.",
      "Never walk in front of your wife — walk with her.",
      "Never let a child challenge her. You handle that, not her.",
    ],
    episode: "2. The Art of Dating",
  },
  {
    ref: [2, 5],
    phrase: ["Strengthen me with raisins", "I am faint with love"],
    title: "Raisin cakes",
    body:
      "Raisin cakes were held to be aphrodisiacs — full of seeds — and were " +
      "used in pagan worship, which is why Hosea holds Israel in contempt for " +
      "chasing other gods with them. When David brought the ark into " +
      "Jerusalem and sent the nation home to be fruitful and multiply, he " +
      "gave every one of them raisin cakes. This is a passionate statement. " +
      "She wants him.",
    episode: "2. The Art of Dating",
  },
  {
    ref: [2, 7],
    phrase: ["not stir up, nor awaken love", "until it so desires"],
    title: "Good, but not yet",
    body:
      "He answers her desire not by rebuking it but by dating it. Solomon " +
      "speaks of her in the gentlest terms he has — the roes and hinds of the " +
      "field, the same picture Proverbs uses for a wife — and says that what " +
      "she feels is good, and is waiting to be awakened on a later day.",
    points: [
      "Restraint is the man's initiative to take.",
      "Sex is the fireplace, not the house: in its place, warmth and light; " +
        "out of its place, it burns the whole thing down.",
      "Build on sensuality instead and you get the law of diminishing " +
        "returns — you stop relating and start needing the next fix.",
    ],
    episode: "2. The Art of Dating",
  },
];
