// The Flemish reel titles: posters and portrait clips supplied by the client,
// facts checked against TMDB. Belgian broadcasters map onto the prototype’s
// services through TMDB’s network field -- VRT 1 / VRT MAX to VRT MAX, VTM /
// VTM GO to VTM GO, Play to Play -- all three free, so these titles are in the
// plan unless the app already said otherwise.
//
// Thuis, De Verraders and De Twaalf already had reviewed entries on their
// detail pages. Their provider, length and questions are reused verbatim here
// rather than rewritten, so the reel card and the detail page cannot drift --
// including De Twaalf on Streamz, which is what the reviewed answers assume
// even though TMDB lists it as VRT.
//
// Axel Terug Naar Amerika is not here: it is already a reel title, so it keeps
// its entry in ah-flemish-titles.js and only its poster and clip were swapped
// for the new ones.
(function (global) {
  const F = (q, a, follow) => ({ q, a, follow: follow || [] });

  const P = {
    vrt:  { provider: "VRT MAX", logo: "vrt-max-logo.png" },
    vtm:  { provider: "VTM GO", logo: "vtm-go-logo.png" },
    play: { provider: "Play", logo: "play-logo.png" },
    streamz: { provider: "Streamz", logo: "streamz-logo.jpg" }
  };

  const JPG = ["gottalent"];        // one poster arrived as a jpg
  const art = slug => ({
    poster: `posters/vl/${slug}.${JPG.includes(slug) ? "jpg" : "webp"}`,
    clip: `vl-${slug}.webm`
  });

  const catalog = {
    bockie: {
      id: "bockie", title: "Bockie Gaat Naar School",
      syn: "Rapper back at school for thirty days", kind: "Series", length: "6 ep", ...P.play, ...art("bockie"),
      about: "Bockie De Repper goes back to the derde graad for thirty days — the bell, the huiswerk, the TikTok trends, a full uniform. Six episodes on Play. Funny for two of them, then quietly not.",
      chips: [
        F("Do I watch it in order?", "Yes. The thirty days run in order and you get to know the classmates as you go. There are six episodes.", [
          { id: "bck-work", q: "How long is an episode?", a: "Short enough for a weeknight. Most people watch one a night." },
          { id: "bck-who", q: "Anything else like it?", a: "Jade en de Belgen, also free on Play. Different subject, same interest in ordinary people.", who: "Jonas van Boxstael" }
        ]),
        F("Is it made for teenagers?", "Yes. It’s about their school and their week, and it doesn’t explain Gen Z to the parents watching.", [
          { id: "bck-cringe", q: "Can we watch it together as a family?", a: "Yes. The only person who gets laughed at is Bockie." },
          { id: "bck-see", q: "Is there anything unsuitable in it?", a: "No. It’s family-hour TV on Play." }
        ]),
        F("Who is Bockie?", "Jonas van Boxstael. He started as a rapper, then did YouTube, and now TV. The show introduces him in the first minute.", [
          { id: "bck-len", q: "Does he really go to classes?", a: "Yes, homework included. He struggles with maths on camera, which is a big part of the first episode." },
          { id: "bck-like", q: "Is it scripted?", a: "No. It’s a real school with real classmates. After a couple of episodes they stop performing for the camera." }
        ])
      ]
    },

    nonkels: {
      id: "nonkels", title: "Nonkels",
      syn: "West-Flemish comedy about three uncles", kind: "Series", length: "3 seasons", ...P.play, ...art("nonkels"),
      about: "A comedy that keeps turning into a drama in the same scene. Three West-Flemish nonkels, a world that moved on without asking, and dialect thick enough that Flemings put the subtitles on too. Three seasons on Play, the third is the new one.",
      chips: [
        F("Will I understand the dialect?", "Turn on subtitles for the first episode, like many Flemish viewers do. The dialect is a big part of the joke.", [
          { id: "non-thick", q: "How strong is the dialect?", a: "Strong enough to be a running joke in Flanders. Nothing in the plot depends on catching every word." },
          { id: "non-dub", q: "Is there a dubbed version?", a: "No." }
        ]),
        F("Is it a comedy or a drama?", "Both. It’s played for laughs until one of them can’t say what he needs to say. Then the room goes quiet.", [
          { id: "non-bleak", q: "Does it get sad?", a: "In parts. It’s about men who don’t talk, so the heavy moments come quietly." },
          { id: "non-cast", q: "Who’s in it?", a: "Jelle De Beule and Rik Verheye.", who: "Jelle De Beule" }
        ]),
        F("Do I start at season one?", "Yes. The show builds on watching these three never change, so it works best in order. There are 22 episodes.", [
          { id: "non-run", q: "How long is a season?", a: "Seven or eight episodes." },
          { id: "non-room", q: "Can I half-watch it?", a: "Not really. The jokes are in the dialogue." }
        ])
      ]
    },

    kotmadam: {
      id: "kotmadam", title: "Kotmadam Sergeant",
      syn: "Seven students, one famous landlady", kind: "Series", length: "2 seasons", ...P.vtm, ...art("kotmadam"),
      about: "A well-known actress takes a studentenkot in Ghent for a full academic year. Barbara Sarafian ran the first house, Ingeborg Sergeant this one. Real students, real kitchen, real argument about the dishes. VTM GO.",
      chips: [
        F("Is there an earlier season?", "Yes, with Sarafian as the landlady. Different students and a different kot, so you can watch either one first.", [
          { id: "kot-know", q: "How is it different from Sarafian’s?", a: "Sergeant’s season is the warmer one. Sarafian’s house was wilder." },
          { id: "kot-year", q: "Do I need the first season?", a: "No. Only the format carries over. Both are on VTM GO." }
        ]),
        F("Can I have it on in the background?", "Yes. Episodes run 50 minutes, ten per season, and they’re easy to follow.", [
          { id: "kot-first", q: "Is it okay for the whole family?", a: "Mostly. There’s student talk, nothing sharper than that." },
          { id: "kot-talk", q: "Anything similar?", a: "Blind Getrouwd, also on VTM GO, if you like strangers thrown together and filmed." }
        ]),
        F("What’s the idea?", "Seven real students share a kot in Ghent for a full academic year. Their landlady is a famous face.", [
          { id: "kot-fam", q: "Do the students know who she is?", a: "Yes, from day one. It’s awkward for about a week, then rent and dishes take over." },
          { id: "kot-like", q: "Do they all stay the whole year?", a: "Not all of them. The episodes show who leaves." }
        ])
      ]
    },

    blindgetrouwd: {
      id: "blindgetrouwd", title: "Blind Getrouwd",
      syn: "Strangers, married on sight", kind: "Series", length: "11 seasons", ...P.vtm, ...art("blindgetrouwd"),
      about: "Experts match strangers, the strangers marry the day they meet, and the weeks after decide it. Legally binding, which is the only reason it has stakes. Eleven seasons on VTM GO — you want the newest one.",
      chips: [
        F("Can I have it on while doing other things?", "Yes. It’s easy to follow, even if you look away for a while.", [
          { id: "bg-famous", q: "Something shorter that’s free?", a: "Thuis is 25 minutes on VRT MAX, and Zeg Eens Euh is about 40 minutes on Play. Both are free." },
          { id: "bg-same", q: "Is it the same as Married at First Sight?", a: "Yes, it’s the Flemish version of the same format." }
        ]),
        F("Are they actually married?", "Yes, legally, from the day they meet.", [
          { id: "bg-last", q: "Do any couples stay together?", a: "Some do. The last episodes show who’s still together, so we won’t say which." },
          { id: "bg-exp", q: "How do the experts match them?", a: "With personality tests and interviews. After that, the experts mostly watch from the side." }
        ]),
        F("Where do I start with eleven seasons?", "With the newest one. Every season has new couples, so nothing carries over.", [
          { id: "bg-hour", q: "Has the format changed over the years?", a: "Barely. Matched by experts, married on sight, a verdict at the end. Every season follows the same steps." },
          { id: "bg-short", q: "How long is an episode?", a: "About an hour, on VTM GO." }
        ])
      ]
    },

    gottalent: {
      id: "gottalent", title: "Belgium’s Got Talent",
      syn: "Talent show, every audition stands alone", kind: "Series", length: "7 seasons", ...P.vtm, ...art("gottalent"),
      about: "Laura Tesoro, Koen Wauters and An Lemmens behind the buzzers. Audities, halve finales, a final, and one act a year that everybody forwards to everybody. Seven seasons on VTM GO. Nobody watches it in order.",
      chips: [
        F("Do I need to watch from the start?", "No. The audition episodes stand on their own, so you can pick any episode from any season.", [
          { id: "gt-which", q: "Which episodes are the auditions?", a: "The first episodes of each season. From the semi-finals on, it’s a competition you follow week to week." },
          { id: "gt-stop", q: "Who’s on the jury?", a: "Laura Tesoro, Koen Wauters and An Lemmens." }
        ]),
        F("Is it okay for kids?", "Yes. Episodes stand alone and the acts are family-friendly. Some danger acts are tense on purpose.", [
          { id: "gt-upset", q: "Is anything too scary for them?", a: "Only the danger acts, and those are short. The rest is light." },
          { id: "gt-len", q: "How long is an episode?", a: "Long, often around an hour and three quarters. Easy to watch in parts." }
        ]),
        F("Is it the same as the British one?", "Same format, with Belgian judges and Belgian acts. Koen Wauters has been on the jury for years.", [
          { id: "gt-judge", q: "Where do I know Laura Tesoro from?", a: "She sang for Belgium at Eurovision 2016 and has presented a lot of TV since." },
          { id: "gt-laura", q: "What’s the golden buzzer?", a: "Each judge can press it once per season to send an act straight through to the live shows.", who: "Laura Tesoro" }
        ])
      ]
    },

    isgelukt: {
      id: "isgelukt", title: "Is ’t Gelukt?",
      syn: "Eight Belgians, one secret challenge each", kind: "Series", length: "8 ep", ...P.vrt, ...art("isgelukt"),
      about: "Sven de Leijer spent a year handing eight bekende Vlamingen a secret opdracht each, none of them knowing about the others. Then he finds out who managed it. Eight episodes on VRT MAX. The year is the format.",
      chips: [
        F("Is it mean?", "No. It’s warm, and the failures are as funny as the successes.", [
          { id: "ig-year", q: "Is it fun to watch together?", a: "Yes. Guessing who managed theirs is half the fun." },
          { id: "ig-sven", q: "Anything similar that’s free?", a: "Zeg Eens Euh on Play, if you like watching famous Belgians try and fail.", who: "Sven de Leijer" }
        ]),
        F("Do I need to watch in order?", "Yes. Start at episode one so the reveals land.", [
          { id: "ig-fast", q: "How many episodes are there?", a: "Eight." },
          { id: "ig-know", q: "Who takes part?", a: "Eight well-known Belgians, including Fien Germijns, Bart Cannaerts and Annemie Struyf." }
        ]),
        F("How does it work?", "Each person gets one secret challenge and a full year to do it, without telling anyone. The show is the reveal.", [
          { id: "ig-room", q: "Did they really have a whole year?", a: "Yes. It was filmed across the year before it aired." },
          { id: "ig-free", q: "Who’s behind it?", a: "Sven De Leijer, who kept the whole thing secret while it was being made." }
        ])
      ]
    },

    makeupdate: {
      id: "makeupdate", title: "Make Up Date",
      syn: "Honest talks over a make-up challenge", kind: "Series", length: "4 seasons", ...P.vrt, ...art("makeupdate"),
      about: "Bert De Kock does a make-up challenge with a bekende jongere and gets them talking about what they’re genuinely onzeker about. The make-up is the excuse to sit close. Four seasons on VRT MAX.",
      chips: [
        F("Will I learn anything about make-up?", "No. Nobody on it is good at make-up, and that’s the joke.", [
          { id: "mu-learn", q: "Does it get uncomfortable?", a: "Sometimes, and it doesn’t cut away when it does." },
          { id: "mu-bert", q: "Anything similar that’s free?", a: "Bockie Gaat Naar School on Play.", who: "Bert De Kock" }
        ]),
        F("What’s the idea?", "Bert De Kock and a guest take on a make-up challenge and talk while they do it.", [
          { id: "mu-hard", q: "How personal does it get?", a: "Very. Guests talk about insecurity in a way they don’t in normal interviews." },
          { id: "mu-start", q: "Who is Bert De Kock?", a: "A presenter who came up through TikTok." }
        ]),
        F("How long is an episode?", "Short. There are 28 episodes across four seasons on VRT MAX.", [
          { id: "mu-teen", q: "Where should I start?", a: "With any guest you recognise. Every episode stands alone." },
          { id: "mu-sim", q: "Is it for teenagers?", a: "Yes, it’s made for them, and it’s a good one to watch together." }
        ])
      ]
    },

    celvermiste: {
      id: "celvermiste", title: "Cel Vermiste Personen",
      syn: "Doc series on the missing persons unit", kind: "Series", length: "2 seasons", ...P.vrt, ...art("celvermiste"),
      about: "Inside the federal unit that takes thousands of verdwijningen a year — set up after Dutroux, run by Alain Remue ever since. Fatma Taspinar reports. Seven episodes on VRT MAX, and it’s careful with every one of them.",
      chips: [
        F("How many episodes are there?", "Seven cases across two seasons.", [
          { id: "cv-dut", q: "Do I watch them in order?", a: "The cases stand alone, but season one explains how the unit works, so it’s the easier start." },
          { id: "cv-after", q: "Who presents it?", a: "Fatma Taspinar, with Alain Remue, who has led the unit for most of its history." }
        ]),
        F("Is this true crime?", "No, it’s a documentary about the unit’s work. Real families and real cases, without dramatic music.", [
          { id: "cv-order", q: "Do the cases get solved?", a: "Some do, some don’t. The unsolved ones get as much time as the rest." },
          { id: "cv-many", q: "Does the Dutroux case come up?", a: "Yes, because the unit was set up after it. But the series is about the work today, not a retelling of 1996." }
        ]),
        F("How heavy is it?", "Heavy. It’s about real families and missing people. It’s made with care and doesn’t linger on the worst details.", [
          { id: "cv-who", q: "Can I have it on in the background?", a: "Not really. It needs your attention.", who: "Fatma Taspinar" },
          { id: "cv-after2", q: "Something lighter for after?", a: "Thuis, 25 minutes on VRT MAX, or Zeg Eens Euh on Play. Both are free." }
        ])
      ]
    },

    // --- already reviewed on their detail pages: facts and questions reused ---

    thuis: {
      id: "thuis", title: "Thuis",
      syn: "Daily soap, about 25 minutes", kind: "Series", length: "Daily · ~25m", ...P.vrt, ...art("thuis"),
      about: "The Flemish daily — 25 minutes, already in your plan. Not a case. The thing you chip away when the night is done, or when the room is local and talking.",
      chips: [
        F("How long is an episode?", "About 25 minutes, every weekday, on VRT MAX."),
        F("Can I pick it up at any point?", "Yes. It’s a daily soap, and you’re already watching."),
        F("Can I have it on while people talk?", "Yes. It’s easy to follow.")
      ]
    },

    verraders: {
      id: "verraders", title: "De Verraders",
      syn: "Game show with secret traitors", kind: "Series", length: "S3 · ~50m", ...P.vtm, ...art("verraders"),
      about: "The Belgian sofa format — traitors, a round table, talking over it. Not a story-twist; a format-twist. Locked on VTM GO.",
      chips: [
        F("How does the game work?", "The players work as a team, but a few of them are secret traitors. Every round the group votes out the person they think is a traitor."),
        F("Do I need to watch earlier seasons?", "No. Each season has new players."),
        F("Where can I watch it?", "On VTM GO, which you don’t have yet.")
      ]
    },

    detwaalf: {
      id: "detwaalf", title: "De Twaalf",
      syn: "Jury drama, twelve people, one case", kind: "Series", length: "S1 · ~50m", ...P.streamz, ...art("detwaalf"),
      about: "Twelve ordinary people judge an extraordinary case. Flemish intensity — the closest neighbour if The Bear’s kitchen heat is what you wanted, with a courtroom instead of a pass.",
      chips: [
        F("Is it based on a real case?", "No. The case is fictional."),
        F("Do I need to know Belgian law?", "No. The case explains itself through the twelve jurors."),
        F("Where can I watch it?", "On Streamz, which you don’t have yet. 1985 is a Flemish case series that’s already in your plan.")
      ]
    }
  };

  const order = [
    "nonkels", "blindgetrouwd", "isgelukt", "thuis", "bockie", "gottalent",
    "celvermiste", "verraders", "kotmadam", "makeupdate", "detwaalf"
  ];

  function reelItem(t) {
    return {
      id: t.id,
      title: t.title,
      syn: t.syn,
      kind: t.kind,
      length: t.length,
      provider: t.provider,
      logo: t.logo,
      youtube: t.clip,          // the reel resolves this against trailers/
      start: 0,
      backdrop: t.poster,
      poster: t.poster,
      about: t.about,
      qs: t.chips
    };
  }

  const feed = order.map(id => reelItem(catalog[id]));

  const questions = {};
  order.forEach(id => { questions[catalog[id].title] = catalog[id].chips; });

  global.FlemishReels = { catalog, order, feed, questions, reelItem };
})(window);
