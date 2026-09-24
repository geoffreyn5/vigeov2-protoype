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
      syn: "A rapper, a schoolbag, thirty days", kind: "Series", length: "6 ep", ...P.play, ...art("bockie"),
      about: "Bockie De Repper goes back to the derde graad for thirty days — the bell, the huiswerk, the TikTok trends, a full uniform. Six episodes on Play. Funny for two of them, then quietly not.",
      chips: [
        F("Is this just a stunt?", "For about two episodes. Then the classmates stop performing for the camera and it turns into something else. Thirty days is long enough that everyone forgets he’s Bockie.", [
          { id: "bck-work", q: "Does he actually do the huiswerk?", a: "He does, badly, on camera. Watching a grown man fail at wiskunde is most of the first episode and he knows it." },
          { id: "bck-who", q: "Who is he, again?", a: "Jonas van Boxstael. Rapper first, YouTube second, television lately. If the name means nothing, the show introduces him in about a minute.", who: "Jonas van Boxstael" }
        ]),
        F("Would my teenager sit through this?", "This is the one on your list they’d pick themselves. It’s their school, their apps, their week — and it doesn’t explain Gen Z to the parents watching.", [
          { id: "bck-cringe", q: "Is it embarrassing to watch together?", a: "Only for him. The show is on the kids’ side, so nobody in the room gets laughed at except Bockie." },
          { id: "bck-see", q: "Anything I’d rather they didn’t see?", a: "Nothing sharper than a school corridor. It’s Play at family hour, not a late-night slot." }
        ]),
        F("Can I dip in, or is it a run?", "A run, but a short one. The thirty days go in order and the classmates only land once you know their names. Six episodes — that’s two evenings.", [
          { id: "bck-len", q: "How long is one?", a: "Short enough for a weeknight and built for one a night. Nothing that needs a free evening." },
          { id: "bck-like", q: "What else is like this?", a: "Jade en de Belgen, also Play and also free. Different subject, same trick of taking ordinary people seriously." }
        ])
      ]
    },

    nonkels: {
      id: "nonkels", title: "Nonkels",
      syn: "West-Vlaams, and three uncles who won’t move", kind: "Series", length: "3 seasons", ...P.play, ...art("nonkels"),
      about: "A comedy that keeps turning into a drama in the same scene. Three West-Flemish nonkels, a world that moved on without asking, and dialect thick enough that Flemings put the subtitles on too. Three seasons on Play, the third is the new one.",
      chips: [
        F("Will I understand a word of it?", "Put the ondertitels on for episode one. Flemish viewers do. By the second you’ve stopped reading, and by then you’ve worked out the dialect is most of the joke.", [
          { id: "non-thick", q: "Is it really that thick?", a: "Thick enough that it’s a running gag in Flanders. Nobody expects you to catch every word, and nothing in the plot hangs on one." },
          { id: "non-dub", q: "Is there a dub?", a: "No, and it would kill it. The whole show is written to sound like that kitchen table." }
        ]),
        F("Comedy or drama?", "It swings mid-scene. Jelle De Beule and Rik Verheye play it for laughs until one of them can’t say the thing he needs to say, and then the room goes quiet. That’s the show.", [
          { id: "non-bleak", q: "Does it get bleak?", a: "In stretches. It’s about men who don’t talk, so the weight arrives sideways rather than in a big speech." },
          { id: "non-cast", q: "Where do I know them from?", a: "Jelle De Beule from Neveneffecten and Het Peulengaleis, Rik Verheye from Callboys and Undercover. Very different register here.", who: "Jelle De Beule" }
        ]),
        F("Season three, or start at one?", "Start at one. The point of these three is that they don’t change, and you only feel it having watched them not do it for two seasons. Twenty-two episodes in total.", [
          { id: "non-run", q: "Is that a long run?", a: "Seven or eight a season, so no. A season goes down in a week of weeknights." },
          { id: "non-room", q: "Good with people around?", a: "Only if they’ll read. It’s a talking comedy, so half-watching costs you the whole thing." }
        ])
      ]
    },

    kotmadam: {
      id: "kotmadam", title: "Kotmadam Sergeant",
      syn: "Famous kotmadam, seven students, one year", kind: "Series", length: "2 seasons", ...P.vtm, ...art("kotmadam"),
      about: "A well-known actress takes a studentenkot in Ghent for a full academic year. Barbara Sarafian ran the first house, Ingeborg Sergeant this one. Real students, real kitchen, real argument about the dishes. VTM GO.",
      chips: [
        F("Is any of this real?", "All of it except the casting. Seven actual students, one actual kot in Ghent, one academic year. The only invented part is that their landlady is famous.", [
          { id: "kot-know", q: "Do the students know who she is?", a: "From day one, and it’s awkward for about a week. Then the rent and the afwas take over and she’s just the woman upstairs." },
          { id: "kot-year", q: "Do they last the full year?", a: "Not all of them, and the leaving is the part the show is actually about. I’ll leave which ones to the episodes." }
        ]),
        F("Sarafian or Sergeant?", "Sergeant is the newer and the warmer of the two. Sarafian’s house is the wilder one. Separate students, separate kot, so it’s a choice of temperament rather than an order.", [
          { id: "kot-first", q: "Do I need the first season?", a: "Not at all. Nothing carries over but the format. Both are sitting on VTM GO whenever you want the other one." },
          { id: "kot-talk", q: "Which one do people bring up?", a: "Sarafian’s, usually, because she picked more fights. Sergeant’s is the one people finish." }
        ]),
        F("Can I half-watch this?", "Comfortably. Fifty minutes, ten a season, nothing to keep track of week to week. It survives a room that’s talking over it.", [
          { id: "kot-fam", q: "Family evening, or not?", a: "Mostly fine. Student life comes with student conversations, but nothing sharper than you’d hear at that age." },
          { id: "kot-like", q: "Anything like it in my plan?", a: "Blind Getrouwd on the same VTM GO if you want people thrown together and filmed. Louder, but the same curiosity." }
        ])
      ]
    },

    blindgetrouwd: {
      id: "blindgetrouwd", title: "Blind Getrouwd",
      syn: "Strangers, married on sight", kind: "Series", length: "11 seasons", ...P.vtm, ...art("blindgetrouwd"),
      about: "Experts match strangers, the strangers marry the day they meet, and the weeks after decide it. Legally binding, which is the only reason it has stakes. Eleven seasons on VTM GO — you want the newest one.",
      chips: [
        F("Eleven seasons. Where do I start?", "The newest. Nothing carries over — new couples, new verdict, same format. There’s no backlog here and no order to get wrong.", [
          { id: "bg-famous", q: "Is there a season people still bring up?", a: "Two or three, and they come up every time the show does. But they’re self-contained, so the one people are arguing about now is the current one." },
          { id: "bg-same", q: "Has it changed much in eleven years?", a: "Barely, which is either the appeal or the complaint. If the premise works on you it still works." }
        ]),
        F("Are they actually married?", "Legally, from the day they meet. That’s the bit that separates this from the rest of the genre. The edit shapes the story, but the marriage isn’t part of the edit.", [
          { id: "bg-last", q: "Do any of them last?", a: "Some do, and following which is half of why people watch. Not saying which from this season." },
          { id: "bg-exp", q: "What do the experts actually do?", a: "Match them on personality tests and interviews, then sit back. Whether that’s science is the argument the show runs on." }
        ]),
        F("Can this just be on?", "That’s how most people watch it. Hour-long, easy to follow, survives a conversation over the top. Nothing to add — it’s on VTM GO.", [
          { id: "bg-hour", q: "An hour is a lot for a Tuesday.", a: "It is. This is a Sunday-afternoon show more than a weeknight one, unless it’s on while you do something else." },
          { id: "bg-short", q: "Something shorter that’s free?", a: "Thuis at 25 minutes on VRT MAX, or Zeg Eens Euh on Play after ten. Both free, both in and out quickly." }
        ])
      ]
    },

    gottalent: {
      id: "gottalent", title: "Belgium’s Got Talent",
      syn: "Buzzers, a gouden buzzer, a crying dad", kind: "Series", length: "7 seasons", ...P.vtm, ...art("gottalent"),
      about: "Laura Tesoro, Koen Wauters and An Lemmens behind the buzzers. Audities, halve finales, a final, and one act a year that everybody forwards to everybody. Seven seasons on VTM GO. Nobody watches it in order.",
      chips: [
        F("Do I have to commit to a season?", "No, and almost nobody does. The audition episodes are the good ones and each stands on its own. Pick any episode from any season and you’ve lost nothing.", [
          { id: "gt-which", q: "Which ones are the audities?", a: "The early episodes of each season. Once it reaches the halve finales it turns into a competition you have to follow." },
          { id: "gt-stop", q: "When does it stop being dippable?", a: "At the semi-finals. From there the show assumes you’ve met everyone and have a favourite." }
        ]),
        F("Is this one for the kids?", "Probably the best on your list for it. Self-contained, nothing to explain, acts pitched at a family. The danger acts get genuinely tense, on purpose.", [
          { id: "gt-upset", q: "Anything that’d upset them?", a: "Only the danger acts, and the judges break the tension fast. Nothing else in it lands hard." },
          { id: "gt-len", q: "How long is an episode?", a: "They run long — an hour and three quarters is normal. Treat it as something to dip into rather than sit through." }
        ]),
        F("Is the Belgian one different?", "Same format the world over, but the judges and the acts are ours, so the jokes land closer to home. Koen Wauters has been in that chair long enough to be furniture.", [
          { id: "gt-judge", q: "Who’s judging now?", a: "Laura Tesoro, Koen Wauters and An Lemmens. Between them they’ve covered Eurovision, Clouseau and half of VTM." },
          { id: "gt-laura", q: "Where do I know Laura Tesoro from?", a: "Eurovision 2016, then presenting more or less everything since. She’s the one who takes the acts most seriously.", who: "Laura Tesoro" }
        ])
      ]
    },

    isgelukt: {
      id: "isgelukt", title: "Is ’t Gelukt?",
      syn: "Eight secret challenges, one year, one reveal", kind: "Series", length: "8 ep", ...P.vrt, ...art("isgelukt"),
      about: "Sven de Leijer spent a year handing eight bekende Vlamingen a secret opdracht each, none of them knowing about the others. Then he finds out who managed it. Eight episodes on VRT MAX. The year is the format.",
      chips: [
        F("What’s the actual game?", "Eight famous Belgians, one secret challenge each, a full year to do it and nobody told anybody. Fien Germijns, Bart Cannaerts and Annemie Struyf among them. The show is the reveal.", [
          { id: "ig-year", q: "They really had a year?", a: "Filmed quietly across the whole year before it aired, which is why the reveals land. None of it was arranged the week before." },
          { id: "ig-sven", q: "Who’s running it?", a: "Sven de Leijer, who kept the whole thing secret while it was being made. That’s the trick the format depends on.", who: "Sven de Leijer" }
        ]),
        F("Can I start anywhere?", "Not this one. Take it from episode one — the pleasure is knowing what everyone’s hiding before they admit it, and arriving late just hands you the answers.", [
          { id: "ig-fast", q: "How quickly does it go?", a: "Eight episodes and it moves. Two evenings covers it if the reveals get their hooks in, which they tend to." },
          { id: "ig-know", q: "Do I need to know these people?", a: "It helps — half the fun is guessing who’d crack first. But the show introduces all eight properly before it asks you to care." }
        ]),
        F("Is it mean?", "Not at all. It’s warm, and the failures are funnier than the successes, which is the whole difference between this and a format with a cash prize.", [
          { id: "ig-room", q: "Good with the room?", a: "Better with company. Guessing out loud who managed theirs is most of the entertainment." },
          { id: "ig-free", q: "What else like this is free?", a: "Zeg Eens Euh on Play for the game-show register, De Verraders on VTM GO if you want people hiding things. Neither costs anything." }
        ])
      ]
    },

    makeupdate: {
      id: "makeupdate", title: "Make Up Date",
      syn: "A brush, and the actual conversation", kind: "Series", length: "4 seasons", ...P.vrt, ...art("makeupdate"),
      about: "Bert De Kock does a make-up challenge with a bekende jongere and gets them talking about what they’re genuinely onzeker about. The make-up is the excuse to sit close. Four seasons on VRT MAX.",
      chips: [
        F("Is this a beauty show?", "No, and it’s barely pretending. The challenge is a mess on purpose — it’s there so two people have something to do with their hands while they say the difficult thing.", [
          { id: "mu-learn", q: "Would I learn anything about make-up?", a: "Nothing. Neither of them is any good at it and that’s the point of the format." },
          { id: "mu-bert", q: "Who’s the host?", a: "Bert De Kock, who came up through TikTok. That’s why the register is so much closer than a normal interview.", who: "Bert De Kock" }
        ]),
        F("How honest does it get?", "Properly. Guests talk about insecurity in a way they don’t in ordinary interviews, and the camera stays on them a beat longer than is comfortable. Four seasons of that on VRT MAX.", [
          { id: "mu-hard", q: "Does it get uncomfortable?", a: "Sometimes, and it doesn’t cut away when it does. That restraint is why people trust it." },
          { id: "mu-start", q: "Which episode should I start with?", a: "Any with a face you recognise. Twenty-eight of them and not one needs another." }
        ]),
        F("How long is one?", "Short, and that’s the appeal. Twenty-eight episodes across four seasons and you can stop after one. Good for the gap where nothing else fits.", [
          { id: "mu-teen", q: "Would a teenager watch it?", a: "It’s aimed almost exactly at them. The talk about insecurity is the reason to put it on together, not the reason not to." },
          { id: "mu-sim", q: "Anything similar that’s free?", a: "Bockie Gaat Naar School on Play is the nearest for that audience, and also costs nothing." }
        ])
      ]
    },

    celvermiste: {
      id: "celvermiste", title: "Cel Vermiste Personen",
      syn: "The unit that looks for the missing", kind: "Series", length: "2 seasons", ...P.vrt, ...art("celvermiste"),
      about: "Inside the federal unit that takes thousands of verdwijningen a year — set up after Dutroux, run by Alain Remue ever since. Fatma Taspinar reports. Seven episodes on VRT MAX, and it’s careful with every one of them.",
      chips: [
        F("How heavy is this?", "Heavy. Real families, real cases, and no music telling you how to feel. It’s a documentary rather than true crime, and the difference shows in what it refuses to linger on.", [
          { id: "cv-dut", q: "Does Dutroux come up?", a: "It has to — the cel exists because of it. But this is about the work now, not a retelling of 1996." },
          { id: "cv-after", q: "Will it sit with me afterwards?", a: "Some of it will. It’s made with care and it spares you the worst, but the subject is the subject." }
        ]),
        F("Do the cases get solved?", "Some. Not all, and the series doesn’t pretend otherwise. That honesty is most of why it works — the unresolved ones are given the same time as the rest.", [
          { id: "cv-order", q: "Do I watch them in order?", a: "The cases stand alone, but season one sets up the cel and is the better way in." },
          { id: "cv-many", q: "How many are there?", a: "Seven across two seasons, so it’s short enough to take as one thing rather than a commitment." }
        ]),
        F("Is this one to watch with someone?", "Better with someone than alone, but it needs a room that’s actually watching. Not something to have on while you do the dishes.", [
          { id: "cv-who", q: "Who’s presenting it?", a: "Fatma Taspinar, with Alain Remue of the cel. He’s run it for almost its entire existence, which is why people talk to him the way they do.", who: "Fatma Taspinar" },
          { id: "cv-after2", q: "What do I put on after it?", a: "Thuis at 25 minutes on VRT MAX, or Zeg Eens Euh on Play. Both free and both a long way from this." }
        ])
      ]
    },

    // --- already reviewed on their detail pages: facts and questions reused ---

    thuis: {
      id: "thuis", title: "Thuis",
      syn: "Daily. Local. Easy.", kind: "Series", length: "Daily · ~25m", ...P.vrt, ...art("thuis"),
      about: "The Flemish daily — 25 minutes, already in your plan. Not a case. The thing you chip away when the night is done, or when the room is local and talking.",
      chips: [
        F("Is this actually leaving?", "Yes. Daily, ~25 minutes, VRT MAX. You’re already in it. Easy to chip away this week without making it the night."),
        F("Too soapy for tonight?", "It’s a daily. If you wanted a case, that’s Assisen or 1985. If you wanted 25 minutes and home, this is it."),
        F("Can I watch this with people talking?", "That’s the point. Local, easy, nobody has to sit up.")
      ]
    },

    verraders: {
      id: "verraders", title: "De Verraders",
      syn: "Traitors. Sofa. Format.", kind: "Series", length: "S3 · ~50m", ...P.vtm, ...art("verraders"),
      about: "The Belgian sofa format — traitors, a round table, talking over it. Not a story-twist; a format-twist. Locked on VTM GO.",
      chips: [
        F("Can we talk over this?", "That’s the one. Format, not prestige. People stay in the room. Locked unless you add VTM GO."),
        F("Do I need earlier seasons?", "Each season is a new table. Start here if this is the one in the house."),
        F("What’s the in-plan sofa version?", "Thuis if local and easy. Squid Game if you wanted talking after and Netflix. This one waits on VTM GO.")
      ]
    },

    detwaalf: {
      id: "detwaalf", title: "De Twaalf",
      syn: "Jury. Flanders. Heat.", kind: "Series", length: "S1 · ~50m", ...P.streamz, ...art("detwaalf"),
      about: "Twelve ordinary people judge an extraordinary case. Flemish intensity — the closest neighbour if The Bear’s kitchen heat is what you wanted, with a courtroom instead of a pass.",
      chips: [
        F("Something like The Bear?", "Closest on intensity: De Twaalf. Abbott if you wanted the humour without the panic. Locked on Streamz."),
        F("Do I need to know Belgian law?", "No. Twelve people in a room. The case explains itself."),
        F("In my plan?", "Streamz, so it carries a lock. 1985 is the in-plan Flemish case.")
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
