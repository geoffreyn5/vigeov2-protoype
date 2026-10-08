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
        F("Is he really back at school?", "Yes. He joined the fifth secondary year at GO! Atheneum Dendermonde for thirty days, taking part in lessons, homework and school life."),
        F("Is this the same Bockie from Bompa Bockie?", "Yes. After spending time with older people in Bompa Bockie, he turns to the lives of today’s teenagers."),
        F("Why is he repeating the fifth year again?", "He had already been expelled twice during that school year as a teenager. This is his third attempt, now as an adult.")
      ]
    },

    nonkels: {
      id: "nonkels", title: "Nonkels",
      syn: "West-Flemish comedy about three uncles", kind: "Series", length: "3 seasons", ...P.play, ...art("nonkels"),
      about: "A comedy that keeps turning into a drama in the same scene. Three West-Flemish nonkels, a world that moved on without asking, and dialect thick enough that Flemings put the subtitles on too. Three seasons on Play, the third is the new one.",
      chips: [
        F("Are the three uncles brothers?", "Yes. Willy, Luc and Pol are the Persyn brothers, played by Rik Verheye, Jelle De Beule and Wim Willaert."),
        F("Is the West-Flemish hard to understand?", "The dialect is strong and part of the humour. Subtitles help you catch the dialogue."),
        F("Is Nonkels connected to Eigen Kweek?", "The shared connection is Wim Willaert and the West-Flemish setting. Nonkels follows a different family.")
      ]
    },

    kotmadam: {
      id: "kotmadam", title: "Kotmadam Sergeant",
      syn: "Seven students, one famous landlady", kind: "Series", length: "2 seasons", ...P.vtm, ...art("kotmadam"),
      about: "A well-known actress takes a studentenkot in Ghent for a full academic year. Barbara Sarafian ran the first house, Ingeborg Sergeant this one. Real students, real kitchen, real argument about the dishes. VTM GO.",
      chips: [
        F("What happened to Kotmadam Sarafian?", "Barbara Sarafian runs the student house first. Ingeborg Sergeant takes over later in the school year."),
        F("Is Ingeborg really their landlady?", "Yes. The programme follows her taking on the role of kotmadam in a student house in Ghent."),
        F("Is that Ingeborg from Blind Date?", "Yes. Ingeborg Sergeant hosted the earlier Flemish version of Blind Date. Here she takes on student life as a kotmadam.")
      ]
    },

    blindgetrouwd: {
      id: "blindgetrouwd", title: "Blind Getrouwd",
      syn: "Strangers, married on sight", kind: "Series", length: "11 seasons", ...P.vtm, ...art("blindgetrouwd"),
      about: "Experts match strangers, the strangers marry the day they meet, and the weeks after decide it. Legally binding, which is the only reason it has stakes. Eleven seasons on VTM GO — you want the newest one.",
      chips: [
        F("Are they legally married?", "Yes, legally, from the day they meet."),
        F("Do any couples actually stay together?", "Some do. The last episodes show who’s still together, so we won’t say which."),
        F("Who decides who gets matched?", "The experts make the matches using personality tests and interviews. The participants meet their match at the wedding.")
      ]
    },

    gottalent: {
      id: "gottalent", title: "Belgium’s Got Talent",
      syn: "Talent show, every audition stands alone", kind: "Series", length: "7 seasons", ...P.vtm, ...art("gottalent"),
      about: "Laura Tesoro, Koen Wauters and An Lemmens behind the buzzers. Audities, halve finales, a final, and one act a year that everybody forwards to everybody. Seven seasons on VTM GO. Nobody watches it in order.",
      chips: [
        F("What does the golden buzzer do?", "Each judge can press it once per season to send an act straight through to the live shows."),
        F("Where do I know Laura Tesoro from?", "She represented Belgium at Eurovision in 2016 and has also worked as a TV presenter."),
        F("Is this the same as Britain’s Got Talent?", "Yes. It is the Belgian version of the same talent-show format, with its own judges and acts.")
      ]
    },

    isgelukt: {
      id: "isgelukt", title: "Is ’t Gelukt?",
      syn: "Eight Belgians, one secret challenge each", kind: "Series", length: "8 ep", ...P.vrt, ...art("isgelukt"),
      about: "Sven de Leijer spent a year handing eight bekende Vlamingen a secret opdracht each, none of them knowing about the others. Then he finds out who managed it. Eight episodes on VRT MAX. The year is the format.",
      chips: [
        F("Did they really keep it secret all year?", "The challenges were carried out secretly over the months before the studio recordings. Participants didn’t know who else was taking part or what the others had been asked to do."),
        F("Is this linked to Vrede op aarde?", "Yes. It grew out of Sven de Leijer’s Chalet challenges on Vrede op aarde, expanded into a programme of bigger secret challenges."),
        F("Can viewers help with the challenges?", "Yes. Alongside the secret challenges, the programme sets new weekly challenges where viewers can help.")
      ]
    },

    makeupdate: {
      id: "makeupdate", title: "Make Up Date",
      syn: "Honest talks over a make-up challenge", kind: "Series", length: "4 seasons", ...P.vrt, ...art("makeupdate"),
      about: "Bert De Kock does a make-up challenge with a bekende jongere and gets them talking about what they’re genuinely onzeker about. The make-up is the excuse to sit close. Four seasons on VRT MAX.",
      chips: [
        F("Is Make Up Date actually a dating show?", "No. Bert De Kock and his guest talk while taking on a make-up challenge; the “date” is an interview format."),
        F("Can either of them actually do make-up?", "Being good at make-up isn’t the point. The awkward attempts are part of the humour while the conversation gets more personal."),
        F("Is Bert the guy from TikTok?", "Yes. Bert De Kock became known on TikTok before bringing his conversations and make-up challenges to MakeUpDate.")
      ]
    },

    celvermiste: {
      id: "celvermiste", title: "Cel Vermiste Personen",
      syn: "Doc series on the missing persons unit", kind: "Series", length: "2 seasons", ...P.vrt, ...art("celvermiste"),
      about: "Inside the federal unit that takes thousands of verdwijningen a year — set up after Dutroux, run by Alain Remue ever since. Fatma Taspinar reports. Seven episodes on VRT MAX, and it’s careful with every one of them.",
      chips: [
        F("Do they cover unsolved cases?", "Yes. The series includes cases that remain unresolved, as well as cases that are solved."),
        F("Does the Dutroux case come up?", "Yes, as background to the unit’s history. The series focuses on the unit’s work rather than retelling the Dutroux case."),
        F("Is this the real missing persons team?", "Yes. The documentary follows the actual unit and the families involved in its cases, rather than actors playing investigators.")
      ]
    },

    // --- already reviewed on their detail pages: facts and questions reused ---

    thuis: {
      id: "thuis", title: "Thuis",
      syn: "Daily soap, about 25 minutes", kind: "Series", length: "Daily · ~25m", ...P.vrt, ...art("thuis"),
      about: "The Flemish daily — 25 minutes, already in your plan. Not a case. The thing you chip away when the night is done, or when the room is local and talking.",
      chips: [
        F("Was Frank in Thuis from the beginning?", "Yes. Frank Bomans, played by Pol Goossen, was among the original characters when Thuis began in 1995."),
        F("How is Kaat related to Frank?", "Kaat is Frank and Simonne’s daughter, played by Leen Dendievel."),
        F("Is the same actress back as Kaat?", "Yes. Leen Dendievel returned in 2025 after a break of more than five years.")
      ]
    },

    verraders: {
      id: "verraders", title: "De Verraders",
      syn: "Game show with secret traitors", kind: "Series", length: "S3 · ~50m", ...P.vtm, ...art("verraders"),
      about: "The Belgian sofa format — traitors, a round table, talking over it. Not a story-twist; a format-twist. Locked on VTM GO.",
      chips: [
        F("Are the contestants all celebrities?", "Yes. The Flemish programme brings well-known participants together for its deception game."),
        F("How do they choose who to banish?", "The players discuss their suspicions and vote for the person they think is a traitor. That person leaves the game."),
        F("Can a traitor win the prize?", "Yes. The traitors are competing to survive the votes and win, while the other players try to expose them.")
      ]
    },

    detwaalf: {
      id: "detwaalf", title: "De Twaalf",
      syn: "Jury drama, twelve people, one case", kind: "Series", length: "S1 · ~50m", ...P.streamz, ...art("detwaalf"),
      about: "Twelve ordinary people judge an extraordinary case. Flemish intensity — the closest neighbour if The Bear’s kitchen heat is what you wanted, with a courtroom instead of a pass.",
      chips: [
        F("Is this based on a real trial?", "No. The trial in De Twaalf is fictional."),
        F("Why do we follow the jurors home?", "Their private lives shape how they judge the accused. The series explores the people deciding the verdict as much as the case itself."),
        F("Does each season have a different trial?", "Yes. It is an anthology: a new case brings a different jury and a new cast.")
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
