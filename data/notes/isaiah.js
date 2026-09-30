// ---------------------------------------------------------------------------
// Isaiah — notes on the book itself
//
// Notes shown on the Isaiah page, separate from any teacher's series. Same
// format as a study:
//
//   INTRO    — shown above the text: a heading and paragraphs
//   SECTIONS — a header above a passage (here, a chapter), with summary and
//              main points
//   NOTES    — pinned to verses; sit in the margin beside them
//
// Notes on how Isaiah points to Christ carry `episode: "Where Christ comes
// into view"`, which prints as their source line.
// ---------------------------------------------------------------------------

window.INTRO = {
  title: "The setting",
  body: [
    "Isaiah ministered in Jerusalem roughly 740–700 BC, under four kings " +
      "(1:1). Outwardly Judah was prosperous and very religious. Assyria " +
      "was the rising superpower, and the northern kingdom fell to it " +
      "during Isaiah’s lifetime.",
    "So the audience is comfortable, busy with worship, and spiritually " +
      "hollow.",
  ],
};

var CHRIST = "Where Christ comes into view";

window.SECTIONS = [
  {
    id: "chapter-1-court",
    title: "Chapter 1: God takes his people to court",
    range: "1:1 – 1:31",
    start: [1, 1],
    summary:
      "The overture to the whole book. Every major theme appears here in " +
      "short form: sin, judgment, cleansing, a remnant, and restoration. It " +
      "runs in four movements — the charge, religion without righteousness, " +
      "the invitation, and purge and restore.",
  },
  {
    id: "chapter-2-zion",
    title: "Chapter 2: What Zion is meant to be vs. what it is",
    range: "2:1 – 2:22",
    start: [2, 1],
    summary:
      "Chapter 2 opens with a new heading (2:1) and a sharp contrast: the " +
      "vision of what Zion will be, then the reality of what it is.",
    episode: {
      mainPoints: [
        "The key to reading chapters 1 and 2 together: Zion’s destiny is to " +
          "be exalted as the place where God is known by all nations. " +
          "Zion’s present is pride, idols and injustice. The book of Isaiah " +
          "is about how God gets from one to the other.",
      ],
    },
  },
  {
    id: "chapter-3-supports",
    title: "Chapter 3: The Day of the LORD gets concrete",
    range: "3:1 – 4:1",
    start: [3, 1],
    summary:
      "Chapter 2 ended with “stop regarding man, in whose nostrils is " +
      "breath” (2:22). Chapter 3 opens with “For behold…” and shows what " +
      "happens when God removes everything people have been leaning on. The " +
      "unit actually runs to 4:1, and chapter 4 (vv. 2–6) answers it.",
    episode: {
      mainPoints: [
        "The reading key: chapters 2–3 move from the general to the " +
          "specific. Chapter 2 says God will humble everything lofty. " +
          "Chapter 3 names it: the leaders who fed on the poor, and the " +
          "proud luxury that was the fruit of it.",
      ],
    },
  },
  {
    id: "chapter-4-hope-again",
    title: "Chapter 4:2–6: Hope again",
    range: "4:2 – 4:6",
    start: [4, 2],
    summary:
      "Only five verses, but it closes a unit that began in 2:1. Chapters " +
      "2–4 are one piece, with the judgment framed by promise on both " +
      "sides. Many of the words in 4:2–6 are deliberately picked up from " +
      "chapters 1–3 and turned around.",
    episode: {
      mainPoints: [
        "2:2–5: hope (the nations stream to Zion)",
        "2:6–4:1: judgment (pride brought low, the city stripped)",
        "4:2–6: hope again (Zion cleansed and covered by God’s glory)",
        "The shape of chapters 1–4 in one line: the call was “wash " +
          "yourselves” (1:16); the answer is “the Lord shall have washed” " +
          "(4:4). Everything in between shows why the first couldn’t work " +
          "and why only the second could.",
      ],
    },
  },
];

window.NOTES = [
  // ---- Chapter 1 ---------------------------------------------------------

  {
    ref: [1, 2],
    phrase: ["Hear, heavens", "and listen, earth"],
    title: "The charge: a covenant lawsuit",
    body:
      "“Hear, O heavens… give ear, O earth” echoes Deuteronomy 32:1. Heaven " +
      "and earth were the witnesses to the covenant, and now they’re called " +
      "to testify against Israel. This is a covenant lawsuit (vv. 2–9).",
  },
  {
    ref: [1, 3],
    phrase: ["The ox knows his owner", "but Israel doesn’t know"],
    title: "Even an ox knows",
    body:
      "The accusation stings: even an ox knows who feeds it, but “Israel " +
      "does not know.”",
    points: [
      "A historical aside: the ox and donkey “knowing their master’s crib” " +
        "is where the ox and donkey in traditional nativity scenes come " +
        "from. Early Christian writers read it as the animals recognising " +
        "the Lord in the manger while his own people didn’t. That’s " +
        "tradition rather than the verse’s original meaning, but it shows " +
        "how early the church read these chapters toward Christ.",
    ],
  },
  {
    ref: [1, 6],
    phrase: ["wounds, welts, and open sores"],
    title: "Beaten from head to foot",
    body:
      "The nation is pictured as a body beaten from head to foot (vv. 5–6).",
  },
  {
    ref: [1, 9],
    phrase: ["a very small remnant", "we would have been as Sodom"],
    title: "Only a remnant",
    body:
      "Only a small surviving remnant keeps them from being wiped out like " +
      "Sodom. Paul quotes this in Romans 9:29.",
  },
  {
    ref: [1, 9],
    title: "The remnant and the refining",
    body:
      "The “few survivors” of 1:9 narrow through Isaiah until they converge " +
      "on one faithful Servant who is the true Israel (49:3). A purified " +
      "people is then formed around him.",
    episode: CHRIST,
  },
  {
    ref: [1, 15],
    phrase: ["Your hands are full of blood"],
    title: "Religion without righteousness",
    body:
      "This is the surprising part (vv. 10–17). God says he hates their " +
      "sacrifices, festivals and prayers. That’s not because worship is " +
      "bad, but because “your hands are full of blood.” Their temple life " +
      "was busy while their treatment of the weak was ruthless.",
  },
  {
    ref: [1, 17],
    phrase: ["Seek justice.", "Defend the fatherless.", "Plead for the widow."],
    title: "The remedy is concrete",
    body:
      "“Seek justice, correct oppression, bring justice to the fatherless, " +
      "plead the widow’s cause.”",
  },
  {
    ref: [1, 18],
    phrase: ["let’s reason together", "they shall be as white as snow"],
    title: "The invitation",
    body:
      "“Come now, let us reason together” uses yakach, a legal term meaning " +
      "to settle a case in court. The Judge interrupts his own prosecution " +
      "with an offer: “though your sins are like scarlet, they shall be as " +
      "white as snow.”",
    points: [
      "The offer is real, and so is the choice that follows: willing and " +
        "obedient, or refusing and rebelling (vv. 19–20).",
    ],
  },
  {
    ref: [1, 18],
    title: "Scarlet to white",
    body:
      "Isaiah 1:18 makes the offer, but chapter 1 never shows how crimson " +
      "guilt is washed. The book answers that in 53:5–6, and the New " +
      "Testament answers it at the cross (1 John 1:7; Revelation 7:14).",
    episode: CHRIST,
  },
  {
    ref: [1, 25],
    phrase: ["thoroughly purge away your dross"],
    title: "Purge and restore",
    body:
      "The faithful city has become a harlot, and its silver has turned to " +
      "dross (vv. 21–22). God won’t simply scrap it. He will smelt it: burn " +
      "away the dross and restore it until it’s called “the city of " +
      "righteousness, the faithful city” (v. 26).",
    points: ["Judgment serves purification, not only destruction."],
  },

  // ---- Chapter 2 ---------------------------------------------------------

  {
    ref: [2, 2],
    phrase: ["the mountain of Yahweh’s house", "all nations shall flow to it"],
    title: "The vision",
    body:
      "In “the latter days” the Lord’s mountain is raised above every other " +
      "mountain. The nations stream to it, like a river flowing uphill. " +
      "God’s word goes out from Jerusalem (v. 3).",
  },
  {
    ref: [2, 3],
    phrase: ["Yahweh’s word from Jerusalem"],
    title: "The word from Jerusalem",
    body:
      "Isaiah 2:3 says instruction goes out “from Jerusalem.” In Luke 24:47 " +
      "the risen Jesus tells the disciples that repentance and forgiveness " +
      "will be proclaimed to all nations, “beginning from Jerusalem.” The " +
      "mountain the nations stream to becomes the gospel going out to the " +
      "nations (see also Hebrews 12:22).",
    episode: CHRIST,
  },
  {
    ref: [2, 4],
    phrase: ["They shall beat their swords into plowshares"],
    title: "Swords into plowshares",
    body:
      "The result of God’s word going out is peace. Micah 4 has almost the " +
      "same oracle.",
  },
  {
    ref: [2, 5],
    phrase: ["let’s walk in the light of Yahweh"],
    title: "The hinge",
    body:
      "“O house of Jacob, come, let us walk in the light of the LORD.” If " +
      "the nations will one day come, Israel should start walking in that " +
      "light now.",
  },
  {
    ref: [2, 8],
    phrase: ["Their land also is full of idols", "the work of their own hands"],
    title: "The reality",
    body:
      "The land is full of silver, horses and idols (vv. 6–8). People bow " +
      "to what their own hands made.",
  },
  {
    ref: [2, 11],
    phrase: ["Yahweh alone will be exalted in that day"],
    title: "The refrain",
    body:
      "The refrain carries the chapter: “the LORD alone will be exalted in " +
      "that day” (vv. 11, 17).",
  },
  {
    ref: [2, 12],
    phrase: ["all that is proud and arrogant", "all that is lifted up"],
    title: "The Day of the LORD",
    body:
      "So comes the Day of the LORD against everything “lofty and lifted " +
      "up”: cedars, towers, ships, and human pride itself (vv. 12–17).",
  },
  {
    ref: [2, 13],
    phrase: ["high and lifted up"],
    title: "“High and lifted up”",
    body:
      "Isaiah reserves this language (rum and nasa) for God alone. Chapter " +
      "2 brings down everything else that claims it. Then 6:1 sees the Lord " +
      "“high and lifted up,” and 52:13 uses the same pair of words for the " +
      "Servant, who is exalted by being humiliated and pierced (ch. 53).",
    points: [
      "The book’s answer to human pride is not only that God levels the " +
        "proud. It is that God’s own Servant goes down, and that is how he " +
        "is lifted up (compare Philippians 2:6–11).",
    ],
    episode: CHRIST,
  },
  {
    ref: [2, 19],
    phrase: ["Men shall go into the caves of the rocks"],
    title: "Into the caves",
    body:
      "People flee into caves from his presence, an image Revelation " +
      "6:15–16 picks up.",
  },
  {
    ref: [2, 22],
    phrase: ["Stop trusting in man"],
    title: "Stop trusting in man",
    body:
      "The chapter closes bluntly: stop trusting in man, “in whose nostrils " +
      "is breath.”",
  },

  // ---- Chapter 3 – 4:2 ---------------------------------------------------

  {
    ref: [3, 1],
    phrase: ["supply and support"],
    title: "God pulls out the supports",
    body:
      "“The Lord GOD of hosts is taking away from Jerusalem and from Judah " +
      "support and supply.” The Hebrew pairs the masculine and feminine " +
      "forms of the same word (mash’en u-mash’enah), an idiom for every kind " +
      "of prop. Then comes the list (vv. 1–3):",
    points: [
      "Bread and water",
      "Soldiers and judges",
      "Prophets and elders",
      "Counselors and skilled craftsmen",
      "Diviners and charm-experts, which shows how mixed their religion had " +
        "become",
    ],
  },
  {
    ref: [3, 4],
    phrase: ["I will give boys to be their princes"],
    title: "What’s left is chaos",
    body:
      "Boys and capricious people rule (v. 4), and society turns on itself " +
      "(v. 5). The young sneer at the old, and the nobody sneers at the " +
      "honoured.",
  },
  {
    ref: [3, 7],
    phrase: ["I will not be a healer"],
    title: "No one will bind the wounds",
    body:
      "Verses 6–7 are almost darkly comic. A man grabs his brother and says, " +
      "“You have a cloak, you be our leader.” The brother refuses: “I will " +
      "not be a healer.” The word is chovesh, “one who binds up wounds.” " +
      "That ties back to 1:6, where the nation’s wounds were “not bound up.” " +
      "Jerusalem is covered in wounds, and no one is willing or able to bind " +
      "them.",
  },
  {
    ref: [3, 7],
    title: "The one who will bind up",
    body:
      "In 3:7 no one will be a chovesh, a binder of wounds. In 61:1, the " +
      "anointed one says he is sent “to bind up (chavash) the " +
      "brokenhearted.” In Luke 4, Jesus reads that passage and says, “Today " +
      "this Scripture has been fulfilled.” Isaiah deliberately leaves the " +
      "healer’s role empty, and Christ fills it.",
    episode: CHRIST,
  },
  {
    ref: [3, 8],
    phrase: ["to provoke the eyes of his glory"],
    title: "Why: defying his presence",
    body:
      "Jerusalem has stumbled because its words and deeds defy God’s " +
      "glorious presence.",
  },
  {
    ref: [3, 9],
    phrase: ["They parade their sin like Sodom", "They don’t hide it."],
    title: "Like Sodom",
    body:
      "Like Sodom, they sin openly without even hiding it, which echoes 1:10.",
  },
  {
    ref: [3, 10],
    phrase: ["Tell the righteous"],
    title: "The judgment isn’t indiscriminate",
    body:
      "In the middle of the judgment comes a two-line wisdom saying: it will " +
      "go well with the righteous, and woe to the wicked (vv. 10–11). The " +
      "judgment isn’t indiscriminate.",
  },
  {
    ref: [3, 12],
    phrase: ["those who lead you cause you to err", "women rule over them"],
    title: "“Your guides mislead you”",
    body:
      "A small textual note: “women rule over them” may instead read " +
      "“creditors rule over them.” The Hebrew consonants allow both, and the " +
      "Septuagint takes the second. Either way, the point is misrule.",
  },
  {
    ref: [3, 13],
    phrase: ["Yahweh stands up to contend"],
    title: "The courtroom again",
    body:
      "The LORD stands up to “contend” (rîv, the same lawsuit language as " +
      "ch. 1). Verses 13–15 are the heart of the chapter.",
  },
  {
    ref: [3, 14],
    phrase: ["It is you who have eaten up the vineyard", "The plunder of the poor is in your houses"],
    title: "Straight to the elders and princes",
    body:
      "He goes straight to the elders and princes: “It is you who have " +
      "devoured the vineyard; the spoil of the poor is in your houses. What " +
      "do you mean by crushing my people, by grinding the face of the poor?” " +
      "(vv. 14–15).",
    points: ["The vineyard image sets up the Song of the Vineyard in chapter 5."],
  },
  {
    ref: [3, 14],
    title: "The vineyard and its tenants",
    body:
      "“You have devoured the vineyard” (3:14) grows into Isaiah 5. Jesus " +
      "picks it up in the parable of the wicked tenants (Matthew 21:33–45), " +
      "with himself as the Son the tenants kill. Isaiah’s charge against " +
      "Jerusalem’s leaders reaches its climax at the cross.",
    episode: CHRIST,
  },
  {
    ref: [3, 16],
    phrase: ["the daughters of Zion are arrogant", "outstretched necks and flirting eyes"],
    title: "The daughters of Zion",
    body:
      "This section is easy to misread as a rant about women’s jewellery. " +
      "Watch the placement: it comes immediately after “the spoil of the " +
      "poor is in your houses.” The finery of Jerusalem’s elite households " +
      "was bought with the ground-down faces of the poor.",
    points: [
      "They are “haughty” (gavah), the same root as the “haughty looks of " +
        "man” that the LORD brings low in 2:11, 17. They are the city’s " +
        "pride on display, walking with outstretched necks, flirting eyes, " +
        "and tinkling ankles.",
    ],
  },
  {
    ref: [3, 18],
    phrase: ["the beauty of their anklets"],
    title: "A customs manifest",
    body:
      "An inventory of 21 luxury items (vv. 18–23): anklets, headbands, " +
      "crescents, perfume boxes, amulets, signet rings, nose rings, festal " +
      "robes, mirrors, turbans and veils. It reads like a customs manifest of " +
      "the city’s wealth.",
  },
  {
    ref: [3, 24],
    phrase: ["there shall be rottenness", "branding instead of beauty"],
    title: "The reversal",
    body: "A line-by-line reversal. Instead of — there will be:",
    points: [
      "Perfume — rottenness",
      "A sash — a rope",
      "Well-set hair — baldness",
      "A rich robe — sackcloth",
      "Beauty — branding",
    ],
  },
  {
    ref: [3, 24],
    title: "Stripped garments",
    body:
      "Jerusalem’s pride is stripped away in shame. In 61:10 God clothes his " +
      "people with “garments of salvation” and “the robe of righteousness.” " +
      "Between the two stands the one who was himself stripped (John " +
      "19:23–24), so that the proud and ashamed could be clothed.",
    episode: CHRIST,
  },
  {
    ref: [3, 26],
    phrase: ["sit on the ground"],
    title: "Stripped on the ground",
    body:
      "The men fall in war (v. 25), and the city sits stripped on the ground " +
      "(v. 26).",
  },
  {
    ref: [4, 1],
    phrase: ["Seven women shall take hold of one man"],
    title: "Seven women, one man",
    body:
      "Seven women grab hold of one surviving man, begging just to bear his " +
      "name so their disgrace is removed.",
  },
  {
    ref: [4, 2],
    phrase: ["Yahweh’s branch will be beautiful and glorious"],
    title: "The Branch right after the rubble",
    body:
      "The very next verse after 4:1 is “In that day the Branch (tsemach) of " +
      "the LORD shall be beautiful and glorious.” The beauty and glory the " +
      "proud city lost are given back in a Person. It’s the same Branch as in " +
      "Zechariah 3:8 and 6:12 and Jeremiah 23:5. In Zechariah 3, it comes " +
      "right after Joshua’s filthy garments are removed.",
    points: [
      "Isaiah’s thread continues with the shoot from Jesse’s stump (11:1) " +
        "and the root out of dry ground (53:2).",
    ],
    episode: CHRIST,
  },

  // ---- Chapter 4:2–6 -----------------------------------------------------

  {
    ref: [4, 2],
    phrase: ["the fruit of the land"],
    title: "What is the “Branch”?",
    body:
      "“In that day the branch of the LORD shall be beautiful and glorious, " +
      "and the fruit of the land shall be the pride and honour of the " +
      "survivors of Israel.” Tsemach can simply mean growth or vegetation, " +
      "and many scholars read this as the land flourishing again after " +
      "devastation. But the early Aramaic Targum already rendered it “the " +
      "Messiah of the LORD.” Jeremiah (23:5; 33:15) and Zechariah (3:8; " +
      "6:12) use tsemach as a title for the coming Davidic king.",
    points: [
      "Notice the parallel: the Branch of the LORD // the fruit of the land. " +
        "One origin is from God and one from the earth. Many Christian " +
        "readers have seen a hint of the one who is both divine and human " +
        "here. That is a reading rather than something the verse spells " +
        "out, but it isn’t forced.",
    ],
  },
  {
    ref: [4, 2],
    title: "Glory handed back",
    body:
      "The word for “honour” is tif’eret. It’s the same word used in 3:18, " +
      "where the Lord takes away the “finery” of the daughters of Zion. The " +
      "beauty that was stripped from the proud city is given back, but now " +
      "it is found in the Branch, not in anklets and perfume.",
    points: [
      "Who receives it: the “survivors” (peletah), the remnant from 1:9.",
    ],
  },
  {
    ref: [4, 3],
    phrase: ["shall be called holy"],
    title: "A holy people, written for life",
    body:
      "In Isaiah, God is “the Holy One of Israel.” Now the remnant shares " +
      "his name: they are called holy. The phrase “recorded for life” is the " +
      "book of life idea, found in Exodus 32:32, Daniel 12:1, Philippians " +
      "4:3 and Revelation 21:27.",
  },
  {
    ref: [4, 4],
    phrase: ["the Lord shall have washed away the filth"],
    title: "The Lord does the washing",
    body:
      "This verse is the hinge of the whole section. In 1:16 the command was " +
      "“Wash yourselves; make yourselves clean.” They didn’t and couldn’t. " +
      "In 4:4 the Lord washes them. The imperative of chapter 1 becomes " +
      "God’s own act in chapter 4.",
    points: [
      "“Filth” (tso’ah) is a crude word, literally excrement. It’s the same " +
        "root as the “filthy garments” (tso’im) of Joshua the high priest " +
        "in Zechariah 3:3–4. That is the chapter where God removes the " +
        "filthy garments and then announces “my servant the Branch” (3:8). " +
        "Isaiah 4 and Zechariah 3 link filth, cleansing and the Branch in " +
        "the same way.",
      "“Bloodstains” answers 1:15: “your hands are full of blood.”",
      "“A spirit of judgment and a spirit of burning” is the smelting of " +
        "1:25, where the dross is burned away. The cleansing isn’t gentle. " +
        "It is done by fire.",
    ],
  },
  {
    ref: [4, 4],
    title: "The washing",
    body:
      "What 4:4 promises is what Christ does for his church: “having " +
      "cleansed her by the washing of water with the word, so that he might " +
      "present the church to himself in splendour, without spot” (Ephesians " +
      "5:26–27). The washed daughter of Zion becomes the bride.",
    points: [
      "The “spirit of judgment and of burning” is picked up by John the " +
        "Baptist: the one coming after him will baptise “with the Holy " +
        "Spirit and fire” (Matthew 3:11; compare the refiner’s fire of " +
        "Malachi 3:2–3).",
    ],
    episode: CHRIST,
  },
  {
    ref: [4, 5],
    phrase: ["a canopy"],
    title: "God’s glory as a canopy",
    body:
      "The Exodus returns. The pillar of cloud and fire that led Israel out " +
      "of Egypt now rests over the whole city and its assemblies, not only " +
      "over the tabernacle. The whole of Zion becomes the Holy of Holies.",
    points: [
      "“Create” is bara, the verb of Genesis 1, used only with God as " +
        "subject. This is new creation.",
      "“Canopy” is chuppah, the wedding canopy (Psalm 19:5; Joel 2:16). The " +
        "daughters of Zion, stripped in shame in chapter 3, are washed in " +
        "verse 4 and brought under a bridal canopy in verse 5.",
    ],
  },
  {
    ref: [4, 5],
    title: "The glory dwelling among them",
    body:
      "“The Word became flesh and tabernacled among us, and we have seen his " +
      "glory” (John 1:14). The cloud and fire over Zion take on flesh in " +
      "Jesus.",
    episode: CHRIST,
  },
  {
    ref: [4, 6],
    phrase: ["a pavilion for a shade"],
    title: "God himself is the booth",
    body:
      "“Booth” is sukkah. In 1:8, Zion was “left like a booth in a " +
      "vineyard,” a flimsy watchman’s hut in an abandoned field. Now God " +
      "himself is the sukkah over them.",
  },
  {
    ref: [4, 6],
    title: "Shelter from the heat",
    body:
      "Revelation 7:15–16 describes the redeemed: God “will spread his tent " +
      "over them”; “the sun shall not strike them, nor any scorching heat,” " +
      "because the Lamb is their shepherd. That draws on Isaiah 49:10, and " +
      "it’s the same picture as 4:6.",
    episode: CHRIST,
  },
];
