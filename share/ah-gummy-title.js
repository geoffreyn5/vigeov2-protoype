(function (global) {
  const KEY = "alfora-watchlist";
  const PLAN_DEFAULT = ["Netflix", "HBO Max", "VRT MAX", "Play", "VTM GO"];
  const FREE_APPS = ["Play", "VTM GO", "VRT MAX"];
  const star = '<img class="star" src="star.svg" alt="" aria-hidden="true">';
  const plusSvg = '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>';
  const checkSvg = '<svg viewBox="0 0 24 24"><path d="M5 12.5 10 17.5 19 7"/></svg>';

  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function slug(s) {
    return String(s || "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "").trim();
  }
  function listRead() {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (_) { return []; }
  }
  function listWrite(ids) {
    try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch (_) {}
  }
  function listed(id) { return listRead().includes(id); }
  function toggleList(id) {
    const ids = listRead();
    const i = ids.indexOf(id);
    if (i >= 0) ids.splice(i, 1);
    else ids.push(id);
    listWrite(ids);
    return i < 0;
  }

  const F = (q, a, follow) => ({ q, a, follow: follow || [] });

  const catalog = {
    wed: {
      id: "wed", title: "Wednesday", syn: "Goth. Murder. Dance.", kind: "Series", length: "8 ep · ~50m",
      provider: "Netflix", logo: "Netflix logo.webp",
      poster: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
      still: "https://image.tmdb.org/t/p/w780/sNLP0dLZcVBqYa3MchCXJqgDtFb.jpg",
      seasons: ["S1", "S2"],
      about: "Wednesday Addams at Nevermore — deadpan, a murder, and that dance. You don’t need the old films. You’ll know in episode one if the claws are the point.",
      chips: [
        F("Actually scary, or just gothic?", "Spooky-fun, not a horror hangover. Jump scares are mild; the vibe is gothic teen drama with claws. You’ll know in the first episode if the dance is the point.", [
          { id: "wed-horror", q: "Would I still be fine if I don’t like horror?", a: "Yes. If jump-scare horror is the no, this isn’t that. If you hate deadpan teen murder altogether, skip." },
          { id: "wed-sofa", q: "Can I watch this with someone who’s easily spooked?", a: "Mostly. The Nevermore mood is the scare. Sit with them for episode one; if the Thing scene is too much, this isn’t their show." },
          { id: "wed-jenna", q: "Where do I know her from?", a: "Jenna Ortega — you’ve seen the face. Wednesday is the one that stuck. You don’t need the old Addams films to get why she’s here.", who: "Jenna Ortega" }
        ]),
        F("Binge this, or drip it?", "Easy two-episode nights. Season arcs reward a weekend binge if you’re in the mood. Not a homework show — you can leave and come back.", [
          { id: "wed-one", q: "What if I only have one episode tonight?", a: "That’s a good Wednesday. ~50 minutes, Netflix, you’re already mid-season. One tonight, another when the house is quiet." },
          { id: "wed-s2", q: "Does season two need season one in my head?", a: "You’ll follow it. Season one is the map of Nevermore and the dance. Watch that if the family lore is fuzzy." }
        ]),
        F("Need the Addams movies first?", "Nope. It’s its own universe — knowing the family lore is just bonus smirk material. The show tells you who she is.")
      ]
    },
    dune: {
      id: "dune", title: "Dune: Part Two", syn: "Sand. Prophecy. War.", kind: "Film", length: "2h 46",
      provider: "HBO Max", logo: "hbo-max-new-logo.jpg",
      poster: "https://image.tmdb.org/t/p/w500/y4ml848KTz0zccQxfWlE8CMMC13.jpg",
      still: "https://image.tmdb.org/t/p/w780/eZ239CUp1d6OryZEBPnO2n87gMG.jpg",
      seasons: ["Film"],
      about: "Paul Atreides joins the Fremen and walks the line between prophecy and revenge. The rare sequel that outgrows its first half — worms, war, and one very intense family dinner.",
      chips: [
        F("Do I need Part One first?", "You’ll survive without it, but Part One is the map. Watch that if prophecy talk makes you itch, or if names like Chani still bounce off.", [
          { id: "dune-names", q: "What if I barely remember the names?", a: "Watch Part One. This film assumes you already took the sand. A recap will get you through a scene; it won’t get you through the politics." },
          { id: "dune-ok", q: "I’ll be fine — I just want the war.", a: "Then start here. You’ll miss some quiet setup; you won’t miss the worms." }
        ]),
        F("A weeknight film, or Friday?", "2h 46 is a Friday film. Splitable around the mid-story time jump if you must. Not a Tuesday after work unless that’s the night you wanted.", [
          { id: "dune-split", q: "Can I split it if 2h 46 is too much?", a: "Yes — around the mid-story time jump. Still a Friday film. Don’t start at 22:30 unless finishing at 1am is the point." }
        ]),
        F("How stressful is this, really?", "Tense in short hits — sandworms, politics, and that dinner. You’ll know after the first big set piece whether this is your night.")
      ]
    },
    under: {
      id: "under", title: "Undercover", syn: "Camping. XTC. Double lives.", kind: "Series", length: "3 seasons · ~50m",
      provider: "Netflix", logo: "Netflix logo.webp",
      poster: "https://image.tmdb.org/t/p/w500/ziOJNiNUbomrs81behksd0z9Qoz.jpg",
      still: "https://image.tmdb.org/t/p/w780/x2kmiy3RS3hC0SQC0N2sLN3rsdB.jpg",
      seasons: ["S1", "S2", "S3", "S4"],
      about: "Limburg camping, Dutch-Belgian border slang, and a villain you’ll weirdly root for. Crime-show tense, not torture. The series is the long game; Ferry is the origin glow-up.",
      chips: [
        F("How Flemish is this, honestly?", "Fully — Limburg camping vibes, Dutch-Belgian border slang, and Ferry. Subtitles if you need them; the camping is the point.", [
          { id: "uc-ferry", q: "Who is Ferry supposed to be?", a: "The man you weirdly root for. Drug boss, camping, the long game. The film Ferry is his origin — watch that after if you want more Bouman.", who: "Ferry" },
          { id: "uc-lang", q: "Will I miss it if my Dutch isn’t great?", a: "You’ll get the camping and the double lives. The slang is flavour. Subtitles keep the jokes." }
        ]),
        F("Too violent for a weeknight?", "Crime-show tense, not torture porn. Ideal if you like Narcos energy without the homework. Skip if the room wanted pink.", [
          { id: "uc-room", q: "What if someone else is on the sofa?", a: "Fine if they like crooks. Not fine if they wanted Barbie. Episode length is ~50 minutes — one and see." }
        ]),
        F("Start with the Ferry film instead?", "Undercover first, then Ferry if you’re hungry for more Bouman. The film is the origin; the series is the long game.")
      ]
    },
    ferry: {
      id: "ferry", title: "Ferry", syn: "Origin. Underworld. Glow-up.", kind: "Film", length: "1h 46",
      provider: "Netflix", logo: "Netflix logo.webp",
      poster: "https://image.tmdb.org/t/p/w500/w6n1pu9thpCVHILejsuhKf3tNCV.jpg",
      still: "https://image.tmdb.org/t/p/w780/fejok33Ijc6SppiEU1cfwA9Mo2.jpg",
      seasons: ["Film"],
      about: "Ferry Bouman before the camping empire — Limburg, the underworld, the glow-up. A closed film if you wanted Undercover without another season.",
      chips: [
        F("Do I need Undercover first?", "Helps, not required. The film is the origin; the series is the long game. Watch this after if you’re already in S3.", [
          { id: "ferry-s3", q: "I’m already in Undercover — did I mess up?", a: "No. Keep going. Ferry still works after as the origin. You don’t rewind a camping for a film." }
        ]),
        F("Can I actually finish this tonight?", "Yes. 1h 46, Netflix, already in your plan. That’s the crime night that ends."),
        F("Too violent for this room?", "Tense, not torture. Same energy as Undercover. Skip if the sofa wanted pink.")
      ]
    },
    bear: {
      id: "bear", title: "The Bear", syn: "Kitchen. Panic. Family.", kind: "Series", length: "S3 · ~30m",
      provider: "Disney+", logo: "disney-plus-logo.png",
      poster: "https://image.tmdb.org/t/p/w500/6FVNnVk0SZFdzb9dkvOr13XyyM4.jpg",
      still: "https://image.tmdb.org/t/p/w780/aZz0AOpYcDyYwfET9k6j3QQXPuS.jpg",
      seasons: ["S1", "S2", "S3"],
      about: "Carmy comes home to Chicago to run the family sandwich shop. Kitchen pressure, family debt, a crew that doesn’t trust him. Stress in 20–30 minute hits.",
      chips: [
        F("How stressful is it, really?", "Genuinely stressful, and that’s the point. The first episodes run at full boil, then it softens around episode six. Short doses.", [
          { id: "bear-know", q: "How fast will I know if it’s for me?", a: "After two episodes. Kitchen chaos in one, family in two. If that doesn’t hook you, it isn’t your show." }
        ]),
        F("Is season 1 the best one?", "Season 1 is the tightest. Season 2 goes bigger and softer. Starting at the beginning is the right call."),
        F("Disney+ isn’t in my plan — still worth it?", "Only if the kitchen is the brief. The Bear is locked until you add Disney+. Abbott is the lighter cousin, also locked. Undercover is the in-plan intensity.")
      ]
    },
    y1985: {
      id: "y1985", title: "1985", syn: "Friends. Case. Flanders.", kind: "Series", length: "8 ep · ~50m",
      provider: "VRT MAX", logo: "vrt-max-logo.png",
      poster: "https://image.tmdb.org/t/p/w500/ma1FtkhQ1mQRbyYUTWY5ngi4Xne.jpg",
      still: "https://image.tmdb.org/t/p/w500/ma1FtkhQ1mQRbyYUTWY5ngi4Xne.jpg",
      seasons: ["Miniserie"],
      about: "Three young friends from the countryside get pulled into the darkest unsolved case in Belgian history. Tense rather than graphic — dread, not gore.",
      chips: [
        F("Is it really based on a true story?", "Yes — the Bende van Nijvel case, still unsolved. It stays close to the documented facts and goes quiet where the record does.", [
          { id: "n1985-hist", q: "Do I need to know the history first?", a: "No. The series explains what you need. Belgians will recognise extra details; it works if you come in cold." }
        ]),
        F("Too heavy for tonight?", "Tense rather than graphic. Not the pick if you wanted to switch your brain off. Thuis if you wanted 25 minutes local and easy."),
        F("Can I start mid-week?", "Episodes are ~50 minutes, VRT MAX, already in your plan. One tonight is a proper sit. Don’t treat it as background.")
      ]
    },
    thuis: {
      id: "thuis", title: "Thuis", syn: "Daily. Local. Easy.", kind: "Series", length: "Daily · ~25m",
      provider: "VRT MAX", logo: "vrt-max-logo.png",
      poster: "https://image.tmdb.org/t/p/w500/5tSBe01mPLii0I1NoCGSFJSO97M.jpg",
      still: "https://image.tmdb.org/t/p/w780/39Se1j3FyhhL8kZKAEno5YIss5X.jpg",
      seasons: ["Daily"],
      about: "The Flemish daily — 25 minutes, already in your plan. Not a case. The thing you chip away when the night is done, or when the room is local and talking.",
      chips: [
        F("Is this actually leaving?", "Yes. Daily, ~25 minutes, VRT MAX. You’re already in it. Easy to chip away this week without making it the night."),
        F("Too soapy for tonight?", "It’s a daily. If you wanted a case, that’s Assisen or 1985. If you wanted 25 minutes and home, this is it."),
        F("Can I watch this with people talking?", "That’s the point. Local, easy, nobody has to sit up.")
      ]
    },
    chantal: {
      id: "chantal", title: "Chantal", syn: "Crime. Humour. Flanders.", kind: "Series", length: "S2 · ~45m",
      provider: "VRT MAX", logo: "vrt-max-logo.png",
      poster: "https://image.tmdb.org/t/p/w500/pmoicISpTRSt4bu03bwEaVazBXS.jpg",
      seasons: ["S1", "S2"],
      about: "Flemish crime with a dry grin. If you liked it for the case, not the jokes, say so — that’s how the next pick stays on the crime side of the sofa.",
      chips: [
        F("Crime story or the humour?", "Both live here. If you liked it for the case, Nonkels may not be the next step. Assisen and 1985 stay in the crime lane."),
        F("Do I need season one?", "Season two assumes you know who she is. A recap gets you through a scene; season one is the map if the name still bounces off."),
        F("In my plan tonight?", "VRT MAX, already in. ~45 minutes. That’s a weeknight you can actually start.")
      ]
    },
    assisen: {
      id: "assisen", title: "Assisen", syn: "Court. Twist. Flanders.", kind: "Series", length: "S2 · ~45m",
      provider: "VTM GO", logo: "vtm-go-logo.png",
      poster: "https://image.tmdb.org/t/p/w500/1VSSxdlbP5Tqow1eZBVIk6Ngy8E.jpg",
      still: "https://image.tmdb.org/t/p/w780/erZh4tQsSDp83Nr4MP2LhvKAmbF.jpg",
      seasons: ["S1", "S2"],
      about: "A Flemish courtroom that turns the room. Twisty rather than violent. Locked on VTM GO — the case you want if the night can take another app.",
      chips: [
        F("A case I can finish before bed?", "Episodes are ~45 minutes. That’s a case. It’s locked on VTM GO — Undercover is the in-plan case you can start now."),
        F("Too dark for this room?", "Courtroom-tense, not gore. People talk after. Skip if the sofa wanted Barbie."),
        F("Worth adding VTM GO for?", "If Assisen and De Verraders keep showing up on your list, yes. One title isn’t a plan. Ten might be.")
      ]
    },
    verraders: {
      id: "verraders", title: "De Verraders", syn: "Traitors. Sofa. Format.", kind: "Series", length: "S3 · ~50m",
      provider: "VTM GO", logo: "vtm-go-logo.png",
      poster: "https://image.tmdb.org/t/p/w500/dB0LuvCwbXQTK2h3R8H8e0pVr2z.jpg",
      still: "https://image.tmdb.org/t/p/w780/niS3AVdPp4pQpL46XxqTn4EG7AL.jpg",
      seasons: ["S1", "S2", "S3"],
      about: "The Belgian sofa format — traitors, a round table, talking over it. Not a story-twist; a format-twist. Locked on VTM GO.",
      chips: [
        F("Can we talk over this?", "That’s the one. Format, not prestige. People stay in the room. Locked unless you add VTM GO."),
        F("Do I need earlier seasons?", "Each season is a new table. Start here if this is the one in the house."),
        F("What’s the in-plan sofa version?", "Thuis if local and easy. Squid Game if you wanted talking after and Netflix. This one waits on VTM GO.")
      ]
    },
    squid: {
      id: "squid", title: "Squid Game", syn: "Game. Debt. Survival.", kind: "Series", length: "S2 · ~55m",
      provider: "Netflix", logo: "Netflix logo.webp",
      poster: "https://image.tmdb.org/t/p/w500/1QdXdRYfktUSONkl1oD5gc6Be0s.jpg",
      still: "https://image.tmdb.org/t/p/w780/2meX1nMdScFOoV4370rqHWKmXhY.jpg",
      seasons: ["S1", "S2"],
      about: "The game you already know — debt, survival, and a room that will talk after. You’re mid-season. It’s marked leaving, so this is the one you’ll feel if it goes.",
      chips: [
        F("Too dark for this room?", "Yes if anyone still wanted to talk lightly. Barbie or Wednesday if you wanted colour. This one pulls people back to the screen."),
        F("Do I need season one in my head?", "You’ll follow the game. Season one is why they’re here. A recap covers the rules; it won’t cover the faces."),
        F("Will I lose it if I wait a week?", "It’s marked leaving. You’re 55% in. That’s the one to steal a night for, with Last of Us.")
      ]
    },
    tlou: {
      id: "tlou", title: "The Last of Us", syn: "Fungus. Road. Care.", kind: "Series", length: "S2 · ~55m",
      provider: "HBO Max", logo: "hbo-max-new-logo.jpg",
      poster: "https://image.tmdb.org/t/p/w500/dmo6TYuuJgaYinXBPjrgG9mB5od.jpg",
      still: "https://image.tmdb.org/t/p/w780/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg",
      seasons: ["S1", "S2"],
      about: "Twenty years after the outbreak, what’s left of love and civilisation. You’re deep in — S2 E3, 67%. Care, not just fungus. Not background.",
      chips: [
        F("Do I need to know the game?", "No. The show tells you who they are. The game is trivia. This is a road and a relationship."),
        F("Too heavy for a weeknight?", "It lands. Not a Tuesday unless the sofa can sit still. You’re already in — that’s why waiting a week hurts."),
        F("Is it actually leaving?", "Yes. You’re furthest in of the leaving pile. I’d steal a night for this before Wednesday.")
      ]
    },
    opp: {
      id: "opp", title: "Oppenheimer", syn: "Bomb. Guilt. Fallout.", kind: "Film", length: "3h 00",
      provider: "HBO Max", logo: "hbo-max-new-logo.jpg",
      poster: "https://image.tmdb.org/t/p/w500/jtTHxuJhuZpFAnCI4vGjg1LGmpY.jpg",
      seasons: ["Film"],
      about: "The man who built the bomb, and what it built in him. The physics is flavour; the film is guilt, power, and the hangover of being right. A weekend sit.",
      chips: [
        F("Three hours too long tonight?", "Three hours. A weekend film. Not a Tuesday after work unless you like finishing at 1am.", [
          { id: "opp-split", q: "Can I split it?", a: "You can. It will feel like you paused a trial. Better as one sit if the sofa can take it." }
        ]),
        F("Do I need the science?", "You don’t. The physics is flavour; the film is about guilt."),
        F("Pair this with Barbie?", "Yes — that’s the joke. Barbie first if you want to land soft. Only if the night can hold both.")
      ]
    },
    barb: {
      id: "barb", title: "Barbie", syn: "Pink. Funny. Gut punch.", kind: "Film", length: "1h 54",
      provider: "HBO Max", logo: "hbo-max-new-logo.jpg",
      poster: "https://image.tmdb.org/t/p/w500/tnS9DqsJvFjmg4FK4R2LghvOhs5.jpg",
      seasons: ["Film"],
      about: "Pink on the outside, a gut punch about being a person. Kids can watch; the joke is for you. 1h 54, HBO Max, already in your plan — the lighter night that still lands.",
      chips: [
        F("Just for kids, or will it land?", "No. Pink on the outside, a gut punch about being a person. Kids can watch; the joke is for you.", [
          { id: "barb-kids", q: "So I can put this on with the house still up?", a: "Yes. Nobody has to sit up for sandworms. The jokes are sharper if the room is grown." }
        ]),
        F("Would this work if the room wants something lighter?", "That’s the one. 1h 54, HBO Max, in your plan."),
        F("Too long for tonight?", "Under two hours. Dune is the Friday. This is the night you can actually finish.")
      ]
    },
    zill: {
      id: "zill", title: "Zillion", syn: "Rise. Glow. Crash.", kind: "Film", length: "2h 03",
      provider: "Streamz", logo: "streamz-logo.jpg",
      poster: "https://image.tmdb.org/t/p/w500/ns7LIqVWrPbO2FYPQ0ec6mfziSc.jpg",
      seasons: ["Film"],
      about: "Ghent nightlife, excess, the crash. Belgian glow without the camping. Locked on Streamz — the left turn if you wanted not-the-obvious-pick.",
      chips: [
        F("Do I need to know the club?", "No. Rise, glow, crash. The club is the setting; the film is the hangover."),
        F("In my plan?", "Streamz, so it carries a lock. Wednesday is the in-plan left turn. Ferry if you wanted Belgian glow on Netflix."),
        F("Too much nightlife for a Tuesday?", "2h 03. A proper night. Not a dip after work unless the glow is the brief.")
      ]
    },
    jan: {
      id: "jan", title: "De Bende van Jan de Lichte", syn: "Highwaymen. Flanders. Myth.", kind: "Series", length: "10 ep · ~50m",
      provider: "Play", logo: "play-logo.png",
      poster: "https://image.tmdb.org/t/p/w500/py2KVZZLIa0YDCZNxhy1zdUhPDX.jpg",
      seasons: ["S1"],
      about: "The local highwaymen — Flanders, myth, crooks you can actually place. Locked on Play. Undercover and Ferry are the in-plan crime if you wanted to stay inside Netflix.",
      chips: [
        F("Is this the Flemish crooks one?", "Yes. Jan de Lichte and Assisen are the local ones. Ferry is Dutch-Belgian border — same world as Undercover, already in your plan."),
        F("Can I press play without another app?", "Not this one. Play is locked. Undercover if you want to continue; Ferry if you want a film that’s done."),
        F("Too historical for tonight?", "Period, but it moves. If you wanted camping-now, that’s Undercover.")
      ]
    },
    schelde: {
      id: "schelde", title: "De Slag om de Schelde", syn: "War. Estuary. Home.", kind: "Film", length: "2h 04",
      provider: "Play", logo: "play-logo.png",
      poster: "https://image.tmdb.org/t/p/w500/sCEmbkFF2Ijz35QDMFtBBTcY7Qb.jpg",
      seasons: ["Film"],
      about: "The Scheldt, the war, a story that sits closer to home than a desert. Locked on Play. 1985 if you wanted Flanders without adding an app.",
      chips: [
        F("Too much war for tonight?", "It’s a war film. 2h 04. 1985 if you wanted Flanders tense and already in-plan."),
        F("In my plan?", "Play, so it carries a lock. Dune if you wanted war and HBO Max."),
        F("Do I need the history?", "It tells you enough. Belgians will feel the estuary extra.")
      ]
    },
    glad: {
      id: "glad", title: "Gladiator II", syn: "Sand. Steel. Empire.", kind: "Film", length: "2h 28",
      provider: "Apple TV", logo: "apple tv logo.jpg",
      poster: "https://image.tmdb.org/t/p/w500/gUPnmDkNRSLFynbpNw9VJrYBEgT.jpg",
      seasons: ["Film"],
      about: "Sand, steel, a fight the night has to be able to take. Locked on Apple TV. Dune if you wanted spectacle already in your plan.",
      chips: [
        F("Do I need the first Gladiator?", "Helps for the ghost of it. Not required for the fights."),
        F("Too long, and locked?", "2h 28 and Apple TV. Dune is 2h 46 but HBO Max is already yours. Squid Game if you wanted loud in an episode."),
        F("A weeknight?", "No. A proper night, and another app.")
      ]
    },
    gladijs: {
      id: "gladijs", title: "Glad IJs", syn: "Ice. Flanders. Tension.", kind: "Series", length: "8 ep · ~50m",
      provider: "VTM GO", logo: "vtm-go-logo.png",
      poster: "https://image.tmdb.org/t/p/w500/5QdsbTX15dxlIsTdwD4xQVVH7W6.jpg",
      seasons: ["S1"],
      about: "Flemish tension on thin ice — local, a case, locked on VTM GO. 1985 if you wanted that feeling already in your plan.",
      chips: [
        F("In my plan?", "VTM GO, so it carries a lock. 1985 and Chantal are VRT MAX."),
        F("Too soapy, or actually tense?", "Tense. Not De Verraders. A story, not a format."),
        F("Can I start at episode one?", "Yes. Eight episodes, ~50 minutes. A series, not a dip.")
      ]
    },
    penguin: {
      id: "penguin", title: "The Penguin", syn: "Gotham. Hustle. Colin.", kind: "Series", length: "S1 · ~60m",
      provider: "HBO Max", logo: "hbo-max-new-logo.jpg",
      poster: "https://image.tmdb.org/t/p/w500/vOWcqC4oDQws1doDWLO7d3dh5qc.jpg",
      seasons: ["S1"],
      about: "Gotham without the cape — a hustle, a voice, crime that wants you awake. HBO Max, already in your plan. Late and wired is the brief.",
      chips: [
        F("Do I need The Batman first?", "Helps for the face. Not required for the hustle. This is Oz’s show."),
        F("Too much homework for tonight?", "One season. You can start. It’s not a 30-year timeline."),
        F("In my plan?", "HBO Max, yes. That’s the late crime you can press play on.")
      ]
    },
    chefbbq: {
      id: "chefbbq", title: "Chef's Table: BBQ", syn: "Fire. Smoke. Plate.", kind: "Series", length: "Vol. 1 · ~45m",
      provider: "Netflix", logo: "Netflix logo.webp",
      poster: "https://image.tmdb.org/t/p/w500/dCOAKGHVKPgpLZNrkiqgcRxkSmZ.jpg",
      seasons: ["Vol. 1"],
      about: "The Chef’s Table formula, pointed at fire and smoke. Pretty, slow, food as scenery. Netflix, already in your plan. An episode you can actually finish.",
      chips: [
        F("Do I need the other Chef’s Tables?", "No. Fire and smoke is the brief. Each episode is its own plate."),
        F("Background, or do I have to watch?", "You can look at it. It’s prettier if you sit still."),
        F("Under 45 minutes?", "That’s the point. A plate, not a Friday film.")
      ]
    },
    abbott: {
      id: "abbott", title: "Abbott Elementary", syn: "School. Warm. 22 minutes.", kind: "Series", length: "S4 · ~22m",
      provider: "Disney+", logo: "disney-plus-logo.png",
      poster: "https://image.tmdb.org/t/p/w500/nBe1e3JJEZ6veGrVXNF0fRoLu56.jpg",
      seasons: ["S1", "S2", "S3", "S4"],
      about: "A public school on no budget and one relentless teacher. Mockumentary like The Office, but warmer. Locked on Disney+ — 22 minutes if you add the app.",
      chips: [
        F("Actually funny or just wholesome?", "Both. Easy to start, easier to keep going. The Office energy without the panic.", [
          { id: "abb-start", q: "Where do I start?", a: "Season 1, episode 1. 22 minutes. You’ll know within two." }
        ]),
        F("Good for watching together?", "One of the safest group picks: funny without being edgy, sweet without being dull."),
        F("In my plan?", "Disney+, so it carries a lock. Thuis is the in-plan 25 minutes. Barbie if you wanted a film that’s already yours.")
      ]
    },
    twaalf: {
      id: "twaalf", title: "De Twaalf", syn: "Jury. Flanders. Heat.", kind: "Series", length: "S1 · ~50m",
      provider: "Streamz", logo: "streamz-logo.jpg",
      poster: "https://image.tmdb.org/t/p/w500/8BHACZE4aelQ4vnXchd00Yof9jH.jpg",
      seasons: ["S1", "S2"],
      about: "Twelve ordinary people judge an extraordinary case. Flemish intensity — the closest neighbour if The Bear’s kitchen heat is what you wanted, with a courtroom instead of a pass.",
      chips: [
        F("Something like The Bear?", "Closest on intensity: De Twaalf. Abbott if you wanted the humour without the panic. Locked on Streamz."),
        F("Do I need to know Belgian law?", "No. Twelve people in a room. The case explains itself."),
        F("In my plan?", "Streamz, so it carries a lock. 1985 is the in-plan Flemish case.")
      ]
    },
    sev: {
      id: "sev", title: "Severance", syn: "Office. Split. Dread.", kind: "Series", length: "S2 · ~50m",
      provider: "Apple TV", logo: "apple tv logo.jpg",
      poster: "https://image.tmdb.org/t/p/w500/pPHpeI2X1qEd1CS1SeyrdhZ4qnT.jpg",
      seasons: ["S1", "S2"],
      about: "Employees split their memory between work and life. Season 2 pays off everything the first season set up. Unsettling rather than scary. Locked on Apple TV.",
      chips: [
        F("Too weird for casual viewing?", "It asks for your attention, and rewards it quickly — most people are hooked within two episodes. Don’t watch it while scrolling.", [
          { id: "sev-s1", q: "Do I need to rewatch season 1 first?", a: "A ten-minute recap covers you. Season 2 rewards a good memory, but it doesn’t require one." }
        ]),
        F("Is it scary?", "Unsettling rather than scary. No jump scares — slow, existential, closer to an office thriller than to horror."),
        F("In my plan?", "Apple TV, so it carries a lock. The Penguin is the in-plan late crime if you wanted awake without another app.")
      ]
    },
    wicked: {
      id: "wicked", title: "Wicked", syn: "Green. Power. That song.", kind: "Film", length: "2h 40",
      provider: "Apple TV", logo: "apple tv logo.jpg",
      seasons: ["Film"],
      about: "The first half — it ends on a lift, not a bow. Songs carry the feelings. Locked on Apple TV. Barbie if you wanted colour without the belt.",
      chips: [
        F("Need the musical first?", "Helps for the songs, not required for the plot. If you know Defying Gravity, you’re already in."),
        F("Too much singing for me?", "It’s a musical. Skip if sung-through isn’t your night."),
        F("This is only part one, right?", "Yes. If you need a bow tonight, wait for both or pick a closed film. Ferry is 1h 46 and ends.")
      ]
    },
    deadpool: {
      id: "deadpool", title: "Deadpool & Wolverine", syn: "Claws. Quips. Chaos.", kind: "Film", length: "2h 08",
      provider: "Apple TV", logo: "apple tv logo.jpg",
      seasons: ["Film"],
      about: "R-rated jokes, gore gags, breaking the fourth wall. Not a family film. Locked on Apple TV.",
      chips: [
        F("How crude is this, really?", "Very. House isn’t asleep? Pick Barbie. This one talks back at the screen."),
        F("Do I need MCU homework?", "Helpful for the cameos, not for the plot. If you know who they are, you’re in."),
        F("In my plan?", "Apple TV, locked. Barbie if you wanted a laugh already on HBO Max.")
      ]
    },
    challengers: {
      id: "challengers", title: "Challengers", syn: "Tennis. Desire. Zendaya.", kind: "Film", length: "2h 11",
      provider: "Apple TV", logo: "apple tv logo.jpg",
      seasons: ["Film"],
      about: "Tennis as a three-person argument. Competitive, mean in a different way than Deadpool. Locked on Apple TV.",
      chips: [
        F("Do I need to like tennis?", "No. The sport is the structure; the film is the triangle."),
        F("Date film?", "Depends on the date. Competitive and mean. Pick the right person."),
        F("In my plan?", "Apple TV, locked. Barbie if the date wanted colour in-plan.")
      ]
    },
    insideout: {
      id: "insideout", title: "Inside Out 2", syn: "Anxiety. Puberty. HQ.", kind: "Film", length: "1h 36",
      provider: "Disney+", logo: "disney-plus-logo.png",
      seasons: ["Film"],
      about: "HQ grows up. Anxiety walks in. Kids can watch; the joke is sharper if you remember being fourteen. Locked on Disney+.",
      chips: [
        F("Just for kids?", "No. The puberty one is for the grown-ups in the room too."),
        F("Need the first film?", "Helps. You’ll follow it either way. Joy is still Joy."),
        F("In my plan?", "Disney+, locked. Barbie if the house wanted colour already on HBO Max.")
      ]
    },
    arcane: {
      id: "arcane", title: "Arcane", syn: "Sisters. City. Fire.", kind: "Series", length: "S2",
      provider: "Netflix", logo: "Netflix logo.webp",
      poster: "https://image.tmdb.org/t/p/w500/abf8tHznhSvl9BAElD2cQeRr7do.jpg",
      seasons: ["S1", "S2"],
      about: "Two sisters on opposite sides of a city tearing itself apart. Animated, not childish. Netflix, already in your plan.",
      chips: [
        F("Do I need to know League of Legends?", "Not at all. It stands on its own — the game is background trivia."),
        F("Is it for kids?", "No. Heavy themes, real violence. Think sixteen and up."),
        F("Dubbed or original?", "Original English — that’s the one the animation was made to. Keep your eyes on the screen.")
      ]
    }
  };

  if (global.FlemishTitles && FlemishTitles.catalog) {
    Object.assign(catalog, FlemishTitles.catalog);
    Object.entries(FlemishTitles.aliases || {}).forEach(([alias, id]) => {
      if (catalog[id]) catalog[alias] = catalog[id];
    });
  }

  catalog.n1985 = catalog.y1985;
  catalog["1985"] = catalog.y1985;
  catalog.jandelichte = catalog.jan;
  catalog.debendevanjandelichte = catalog.jan;
  catalog.dune2 = catalog.dune;
  catalog.duneparttwo = catalog.dune;
  catalog.thebear = catalog.bear;
  catalog.thelastofus = catalog.tlou;
  catalog.deadpoolwolverine = catalog.deadpool;
  catalog.insideout2 = catalog.insideout;
  catalog.chefsTablebbq = catalog.chefbbq;
  catalog.chefstablebbq = catalog.chefbbq;
  catalog.detwaalf = catalog.twaalf;
  catalog.gladiatorii = catalog.glad;
  catalog.gladiator2 = catalog.glad;
  catalog.thepenguin = catalog.penguin;
  catalog.wednesday = catalog.wed;
  catalog.undercover = catalog.under;
  catalog.oppenheimer = catalog.opp;
  catalog.barbie = catalog.barb;
  catalog.zillion = catalog.zill;
  catalog.squidgame = catalog.squid;
  catalog.severance = catalog.sev;

  function lookup(item) {
    if (!item) return null;
    const byId = item.id && catalog[item.id];
    if (byId) return byId;
    const byTitle = catalog[slug(item.title)];
    if (byTitle) return byTitle;
    return null;
  }

  function seasonsOf(item) {
    if (item.seasons && item.seasons.length) return item.seasons;
    const n = Number(String(item.length || "").match(/(\d+)\s*seasons?/i)?.[1] || 0);
    if (n) return Array.from({ length: Math.min(n, 6) }, (_, i) => `S${i + 1}`);
    if (/film/i.test(item.kind || "")) return ["Film"];
    if (/daily/i.test(item.length || "")) return ["Daily"];
    return [];
  }

  // the questions a title is asked in the reel feed, so the detail page asks the
  // same ones. ReelQuestions covers the international titles, FlemishTitles the
  // six Flemish reels; a title in neither falls back to its own chips.
  function reelChips(item) {
    const title = item.title || "";
    const shared = global.ReelQuestions && global.ReelQuestions[title];
    if (shared && shared.length) return shared;
    const fl = global.FlemishTitles;
    if (fl && Array.isArray(fl.feed)) {
      const hit = fl.feed.find(x => x.title === title);
      if (hit && hit.qs && hit.qs.length) return hit.qs;
    }
    return null;
  }

  function chipsOf(item) {
    // generated questions, once they arrive, outrank the reel bank -- they were
    // written for this title rather than picked from it
    if (item._gen && item.chips && item.chips.length) return item.chips;
    const raw = (item.qs || reelChips(item) || item.chips || []).filter(c => c && c.q);
    if (raw.length) return raw;
    const title = item.title || "this";
    const provider = item.provider || "the app";
    const kind = (item.kind || "title").toLowerCase();
    const mins = item.length || "";
    return [
      F(`Is ${title} a weeknight, or a Friday?`, mins ? `${mins} on ${provider}. You’ll know after the first sit whether this is tonight or a proper night.` : `On ${provider}. Say the time you’ve got and I’ll tell you if this fits.`),
      F(`Too heavy for tonight?`, `If the room wanted light, say so. ${title} is a ${kind} — I can stay with it or point at something already in your plan.`),
      F(`Why is this worth a watch for me?`, item.about || item.syn || `Because it’s on ${provider}, and it matches the brief you keep saving. Ask me what you actually doubt.`)
    ];
  }

  function enrich(item) {
    const cat = lookup(item) || {};
    const merged = { ...cat, ...item };
    merged.id = merged.id || cat.id || slug(merged.title);
    merged.chips = chipsOf(merged);
    merged.about = item.about || item.detail || cat.about || `${merged.syn || merged.title} · ${merged.kind || ""} · ${merged.length || ""} on ${merged.provider || ""}.`.replace(/\s+/g, " ").trim();
    merged.seasons = seasonsOf(merged);
    merged.hero = merged.backdrop || merged.still || cat.still || cat.hero || merged.poster || cat.poster || "";
    merged.poster = merged.poster || cat.poster || merged.hero;
    merged.syn = merged.syn || cat.syn || "";
    merged.kind = merged.kind || cat.kind || "";
    merged.length = merged.length || cat.length || "";
    merged.provider = merged.provider || cat.provider || "";
    merged.logo = merged.logo || cat.logo || "";
    return merged;
  }

  function bankOf(item) {
    return chipsOf(item).map((chip, i) => ({
      id: chip.id || `t${i}`,
      q: chip.q,
      a: chip.a,
      who: chip.who,
      keys: chip.keys || chip.q,
      titles: [item.title],
      follow: (chip.follow || []).map((f, j) => ({
        id: f.id || `t${i}f${j}`,
        q: f.q,
        a: f.a,
        who: f.who,
        keys: f.keys || f.q
      }))
    }));
  }

  function create(opts) {
    const phone = opts.phone;
    const toast = opts.toast || (() => {});
    const plan = opts.plan || new Set(PLAN_DEFAULT);
    const reduceMotion = opts.reduceMotion ?? window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!phone) return { open() {}, close() {}, isOpen() { return false; } };

    const root = document.createElement("div");
    root.className = "tpage";
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-label", "Title details");
    root.innerHTML = `<button class="tpage-close" type="button" data-tpage-close aria-label="Close">` +
      `<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>` +
      `<div class="tpage-scroll" data-tpage-scroll></div><div data-tpage-sheet></div>`;
    phone.appendChild(root);
    const scroll = root.querySelector("[data-tpage-scroll]");
    const sheetHost = root.querySelector("[data-tpage-sheet]");
    sheetHost.outerHTML = global.GummyConvo ? global.GummyConvo.markup("Ask a follow-up…") : "";
    const sheet = root.querySelector("[data-csheet]");

    let current = null;
    let convo = null;
    if (global.GummyConvo && sheet) {
      convo = global.GummyConvo.create({
        phone,
        sheet,
        bank: [],
        placeholder: "Ask a follow-up…",
        hello() {
          return current
            ? `Ask about ${current.title} — the story, the cast, the tone, or whether it actually fits tonight.`
            : "Ask about this title.";
        },
        starters: () => bankOf(current || {}),
        reduceMotion
      });
    }

    function inPlan(p) { return plan.has(p) || FREE_APPS.includes(p); }

    const meshTone = m => (m === "m1" ? 1 : m === "m2" ? 2 : 0);

    // same rail the reel feed and the lanes use: one question centred, the
    // neighbours faded, drag or swipe to move between them
    function bindRail(host) {
      host.querySelectorAll("[data-lane-q]").forEach(wrap => {
        const track = wrap.querySelector("[data-qtrack]");
        const qBtns = [...(track ? track.querySelectorAll(".qcard-q") : [])];
        if (!track || !qBtns.length) return;
        wrap._qOn = 0;
        const padKey = () => `${track.clientWidth}:${qBtns.map(b => b.offsetWidth).join(",")}`;
        const centerQ = (i, smooth) => {
          const btn = qBtns[i], w = track.clientWidth;
          if (!btn || !w) return;
          track.scrollTo({left: Math.max(0, btn.offsetLeft - (w - btn.offsetWidth) / 2), behavior: smooth ? "smooth" : "auto"});
        };
        const padTrack = () => {
          const w = track.clientWidth;
          if (!w || !qBtns[0]) return;
          const key = padKey();
          if (wrap._qPadKey === key) return;
          const first = !wrap._qPadKey;
          track.style.paddingLeft = `${Math.max(12, (w - qBtns[0].offsetWidth) / 2)}px`;
          track.style.paddingRight = `${Math.max(12, (w - qBtns[qBtns.length - 1].offsetWidth) / 2)}px`;
          wrap._qPadKey = key;
          if (first) centerQ(wrap._qOn, false);
        };
        const sync = () => {
          padTrack();
          const mid = track.scrollLeft + track.clientWidth / 2;
          const centers = qBtns.map(b => b.offsetLeft + b.offsetWidth / 2);
          let p = 0;
          if (centers.length > 1) {
            p = centers.length - 1;
            for (let i = 0; i < centers.length - 1; i++) {
              if (mid <= centers[i + 1]) {
                const span = centers[i + 1] - centers[i] || 1;
                p = i + Math.max(0, Math.min(1, (mid - centers[i]) / span));
                break;
              }
            }
          }
          qBtns.forEach((btn, n) => {
            const dist = Math.abs(p - n);
            btn.style.opacity = reduceMotion ? (dist < 0.45 ? 1 : .42) : Math.max(.38, 1 - dist * .68);
            btn.classList.toggle("is-on", dist < 0.45);
          });
          const tones = [0, 0, 0];
          qBtns.forEach((btn, n) => { tones[meshTone(btn.dataset.mesh)] += Math.max(0, 1 - Math.abs(p - n)); });
          wrap.style.setProperty("--tone-0", String(Math.min(1, tones[0])));
          wrap.style.setProperty("--tone-1", String(Math.min(1, tones[1])));
          wrap.style.setProperty("--tone-2", String(Math.min(1, tones[2])));
          const on = qBtns.find(b => b.classList.contains("is-on")) || qBtns[Math.round(p)];
          if (on && on.dataset.mesh) wrap.dataset.mesh = on.dataset.mesh;
        };
        track.addEventListener("scroll", sync, {passive: true});
        // the first pass runs on a frame and again on a timer, so a view that is
        // not compositing yet still ends up centred rather than stuck at the left
        requestAnimationFrame(sync);
        setTimeout(sync, 60);
        let drag = null;
        track.addEventListener("pointerdown", e => { drag = {x: e.clientX, sl: track.scrollLeft, id: e.pointerId, moved: false}; });
        track.addEventListener("pointermove", e => {
          if (!drag || e.pointerId !== drag.id) return;
          const dx = e.clientX - drag.x;
          if (!drag.moved && Math.abs(dx) < 8) return;
          if (!drag.moved) {
            drag.moved = true;
            track.style.scrollSnapType = "none";
            try { track.setPointerCapture(e.pointerId); } catch (_) {}
          }
          track.scrollLeft = drag.sl - dx;
        });
        const endDrag = e => {
          if (!drag || e.pointerId !== drag.id) return;
          const moved = drag.moved;
          drag = null;
          track.style.scrollSnapType = "";
          if (!moved) return;
          track._swiped = true;
          const mid = track.scrollLeft + track.clientWidth / 2;
          let best = 0, bestD = Infinity;
          qBtns.forEach((btn, i) => {
            const d = Math.abs(btn.offsetLeft + btn.offsetWidth / 2 - mid);
            if (d < bestD) { bestD = d; best = i; }
          });
          wrap._qOn = best;
          centerQ(best, !reduceMotion);
        };
        track.addEventListener("pointerup", endDrag);
        track.addEventListener("pointercancel", endDrag);
        // a swipe must not also fire the question it happened to end on
        track.addEventListener("click", e => {
          if (!track._swiped) return;
          e.preventDefault(); e.stopPropagation();
          track._swiped = false;
        }, true);
      });
    }

    const closeSvg = '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    const playSvg = '<svg viewBox="0 0 24 24"><path d="M8 5l12 7-12 7z"/></svg>';

    // the wash under the hero is pulled out of the art itself, so every title
    // gets its own colour instead of one house tint
    function toneFrom(url, onTone) {
      if (!url) return;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const c = document.createElement("canvas");
          c.width = 24; c.height = 24;
          const x = c.getContext("2d", { willReadFrequently: true });
          x.drawImage(img, 0, 0, 24, 24);
          const d = x.getImageData(0, 0, 24, 24).data;
          let r = 0, g = 0, b = 0, n = 0;
          for (let i = 0; i < d.length; i += 4) {
            const lum = (d[i] + d[i + 1] + d[i + 2]) / 3;
            if (lum < 18 || lum > 238) continue;   // skip letterbox and blown highlights
            r += d[i]; g += d[i + 1]; b += d[i + 2]; n++;
          }
          if (!n) return;
          r = Math.round(r / n); g = Math.round(g / n); b = Math.round(b / n);
          // darken toward the black the page ends on, so the fade has somewhere to go
          const mix = (v) => Math.round(v * 0.42);
          onTone(`rgba(${r},${g},${b},.55)`, `rgb(${mix(r)},${mix(g)},${mix(b)})`);
        } catch (_) {}
      };
      img.src = url;
    }

    function personCard(p) {
      const initials = String(p.name || "").split(/\s+/).map(w => w[0]).slice(0, 2).join("");
      return `<div class="tpage-person">
        <span class="face">${p.photo ? `<img src="${esc(p.photo)}" alt="" loading="lazy">` : `<i>${esc(initials)}</i>`}</span>
        <b>${esc(p.name)}</b><span>${esc(p.role || "")}</span>
      </div>`;
    }
    function trailerCard(t) {
      return `<button class="tpage-trailer" type="button" data-tpage-trailer="${esc(t.url || "")}">
        <span class="shot">${t.thumb ? `<img src="${esc(t.thumb)}" alt="" loading="lazy">` : ""}<span class="play">${playSvg}</span></span>
        <b>${esc(t.name || "Trailer")}</b><span>${esc(t.kind || "")}</span>
      </button>`;
    }
    function railOf(cls, html) {
      return `<div class="tpage-rail">${html}</div>`;
    }
    function skeletonRail(kind) {
      const one = kind === "face" ? '<span class="tpage-sk face"></span>' : '<span class="tpage-sk shot"></span>';
      return `<div class="tpage-rail">${one.repeat(kind === "face" ? 5 : 3)}</div>`;
    }

    function metaLine(item, extra) {
      const bits = [];
      if (item.kind) bits.push(item.kind);
      else if (extra && extra.kind) bits.push(extra.kind);
      if (item.length) bits.push(item.length);
      else if (extra && extra.runtime) { bits.push(extra.runtime); if (extra.epLen) bits.push(extra.epLen); }
      if (item.provider) bits.push(item.provider);
      return bits.filter(Boolean).join(" · ");
    }

    function render() {
      const item = current;
      if (!item) return;
      const on = listed(item.id);
      const owned = inPlan(item.provider);
      const chips = bankOf(item);
      const ex = item._extra || null;
      const loading = item._loading;
      // The rail is the page's first answer, so the lanes hold their skeletons
      // until the questions have settled -- TMDB is back in a few hundred ms
      // and would otherwise fill the page under a rail that is still generic.
      const lanes = item._qdone;
      const hero = (ex && ex.backdrop) || item.hero || item.poster;
      const poster = item.poster || (ex && ex.poster) || hero;

      scroll.innerHTML = `
        <div class="tpage-hero" style="background-image:url('${esc(hero)}')" data-tpage-hero>
          <div class="tpage-poster" data-tilt>
            <img src="${esc(poster)}" alt="${esc(item.title)}">
            <span class="sheen"></span>
          </div>
          <h1 class="tpage-h1">${esc(item.title)}</h1>
          <p class="tpage-meta">${esc(metaLine(item, ex))}</p>
        </div>
        <div class="tpage-body">
          <div class="tpage-cta">
            <button class="tpage-btn watch" type="button" data-tpage-watch>
              ${item.logo ? `<img src="${encodeURI(item.logo)}" alt="">` : ""}Watch
            </button>
            <button class="tpage-btn list${on ? " is-on" : ""}" type="button" data-tpage-list>
              ${on ? checkSvg : plusSvg}${on ? "On your list" : "Watchlist"}
            </button>
          </div>

          ${loading && !item.about
            ? `<div style="margin-top:20px"><span class="tpage-sk line w90"></span><span class="tpage-sk line w90"></span><span class="tpage-sk line w50"></span></div>`
            : `<p class="tpage-about">${esc(item.about)}</p>`}

          <div class="lane-q" data-lane-q data-mesh="m0">
            <div class="qcard">
              <div class="qcard-track" data-qtrack>
                ${chips.map((c, i) => `<button class="qcard-q${i === 0 ? " is-on" : ""}" type="button" data-tpage-ask="${esc(c.id)}" data-mesh="m${i % 3}" data-q="${esc(c.q)}"><span class="q-copy">${esc(c.q)}</span></button>`).join("")}
              </div>
            </div>
            <div class="qbeam">
              <span class="qbeam-in" data-beamin="0"></span>
              <span class="qbeam-in" data-beamin="1"></span>
              <span class="qbeam-in" data-beamin="2"></span>
            </div>
          </div>

          ${(lanes && ex && ex.trailers && ex.trailers.length) || loading ? `<div class="tpage-mod">Trailers</div>
            ${lanes && ex && ex.trailers && ex.trailers.length ? railOf("t", ex.trailers.map(trailerCard).join("")) : skeletonRail("shot")}` : ""}

          ${(lanes && ex && ex.cast && ex.cast.length) || loading ? `<div class="tpage-mod">Cast</div>
            ${lanes && ex && ex.cast && ex.cast.length ? railOf("p", ex.cast.map(personCard).join("")) : skeletonRail("face")}` : ""}

          ${(lanes && ex && ex.crew && ex.crew.length) || loading ? `<div class="tpage-mod">Crew</div>
            ${lanes && ex && ex.crew && ex.crew.length ? railOf("p", ex.crew.map(personCard).join("")) : skeletonRail("face")}` : ""}
        </div>`;

      bindRail(scroll);
      bindTilt();
      const heroEl = scroll.querySelector("[data-tpage-hero]");
      if (heroEl) toneFrom(hero, (tone, solid) => {
        heroEl.style.setProperty("--tone", tone);
        heroEl.style.setProperty("--tone-solid", solid);
      });
    }

    // the poster answers the phone the way the My Stuff hero does
    let tiltBound = false;
    function bindTilt() {
      if (reduceMotion || tiltBound) return;
      const cardNow = () => scroll.querySelector("[data-tilt]");
      if (!cardNow()) return;
      const MAX = 14;
      const clamp = (v, m) => Math.max(-m, Math.min(m, v));
      let tX = 0, tY = 0, cX = 0, cY = 0, raf = 0, idle = 0;
      const frame = () => {
        const card = cardNow();
        if (!card) { raf = 0; return; }
        cX += (tX - cX) * 0.12; cY += (tY - cY) * 0.12;
        card.style.setProperty("--rx", cX.toFixed(2) + "deg");
        card.style.setProperty("--ry", cY.toFixed(2) + "deg");
        card.style.setProperty("--sheen-a", (110 + cY * 2).toFixed(1) + "deg");
        if (Math.abs(tX - cX) < 0.02 && Math.abs(tY - cY) < 0.02) {
          if (++idle > 30) { raf = 0; return; }
        } else idle = 0;
        raf = requestAnimationFrame(frame);
      };
      const kick = () => { idle = 0; if (!raf) raf = requestAnimationFrame(frame); };
      const onOrient = e => {
        if (e.beta == null && e.gamma == null) return;
        tX = clamp(((e.beta || 0) - 45) * 0.35, MAX);
        tY = clamp((e.gamma || 0) * 0.45, MAX);
        kick();
      };
      const onPointer = e => {
        const card = cardNow();
        if (!card) return;
        const r = card.getBoundingClientRect();
        tY = clamp(((e.clientX - (r.left + r.width / 2)) / r.width) * MAX * 2, MAX);
        tX = clamp((((r.top + r.height / 2) - e.clientY) / r.height) * MAX * 2, MAX);
        kick();
      };
      tiltBound = true;
      const DOE = window.DeviceOrientationEvent;
      const listen = () => window.addEventListener("deviceorientation", onOrient, true);
      if (DOE && typeof DOE.requestPermission === "function") {
        const askOnce = () => {
          DOE.requestPermission().then(st => { if (st === "granted") listen(); }).catch(() => {});
          document.removeEventListener("touchend", askOnce);
          document.removeEventListener("click", askOnce);
        };
        document.addEventListener("touchend", askOnce, { once: true });
        document.addEventListener("click", askOnce, { once: true });
      } else if (DOE) listen();
      root.addEventListener("pointermove", onPointer);
    }

    // facts, art and copy for whatever was opened. Anything the prototype
    // already holds wins; the rest is filled in and the skeletons resolve.
    //
    // The endpoint sends art and meta as soon as TMDB answers and the written
    // copy when it is ready, so the page fills in two steps instead of waiting
    // on the slower of the two. Reopening a title in the same session is served
    // from memory.
    // Completed loads, and loads still in flight. A prefetch and an open share
    // the same request: whichever asks first starts it, the other awaits it.
    // These must stay separate -- an in-flight marker parked in the finished
    // cache reads as "loaded, nothing to show".
    const seen = new Map();
    const pending = new Map();
    let fetchSeq = 0;

    function bodyFor(item) {
      return {
        title: item.title,
        year: item.year || null,
        kind: /film/i.test(item.kind || "") ? "film"
          : /series|season|ep/i.test(`${item.kind || ""} ${item.length || ""}`) ? "series"
          : null,
      };
    }
    function applyFacts(item, d) {
      item._extra = Object.assign({}, item._extra, d);
      if (!item.poster && d.poster) item.poster = d.poster;
    }
    // Generated questions replace the rail for every title, hardcoded ones
    // included -- the ask was for questions that are about THIS title. The
    // scripted trio stays on screen until these land, so the rail is never
    // empty. Answers are not shipped with them: a tap goes to /api/ask, which
    // is what every other question in the app does anyway. The fallback text
    // only shows if that call fails.
    function applyQuestions(item, d) {
      item._qdone = true;
      const qs = (d.questions || []).filter(q => typeof q === "string" && q.trim());
      if (!qs.length) return true;
      item.chips = qs.map((q, i) => ({
        id: `gen${i}`,
        q: q.trim(),
        a: item.about || item.syn || "",
        follow: [],
      }));
      item._gen = true;
      if (convo) { convo.setBank(bankOf(item)); convo.setStarters(() => bankOf(item)); }
      return true;
    }
    function applyAbout(item, d) {
      if (!d.about) return false;
      // the prototype's own blurb wins; the generated one fills a stub
      if (item.about && item.about.length >= 40 && !/^\S+ \u00B7/.test(item.about)) return false;
      item.about = d.about;
      return true;
    }

    // one request, read as it arrives; onPhase fires per event for the caller
    // that is actually looking at the page
    function startLoad(key, body) {
      const live = pending.get(key);
      if (live) return live;
      const rec = { store: { questions: null, facts: null, about: null }, listeners: new Set(), promise: null };
      rec.promise = (async () => {
        const store = rec.store;
        try {
          const res = await fetch("/api/title", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          if (!res.ok || !res.body) return store;
          const reader = res.body.getReader();
          const dec = new TextDecoder();
          let buf = "";
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buf += dec.decode(value, { stream: true });
            let cut;
            while ((cut = buf.indexOf("\n\n")) !== -1) {
              const frame = buf.slice(0, cut);
              buf = buf.slice(cut + 2);
              let event = "message", data = "";
              frame.split("\n").forEach(l => {
                if (l.startsWith("event: ")) event = l.slice(7).trim();
                else if (l.startsWith("data: ")) data += l.slice(6);
              });
              if (!data) continue;
              let d;
              try { d = JSON.parse(data); } catch (_) { continue; }
              if (event === "facts") store.facts = d;
              else if (event === "questions") store.questions = d;
              else if (event === "about") store.about = d;
              else continue;
              rec.listeners.forEach(fn => { try { fn(event, d); } catch (_) {} });
            }
          }
        } catch (_) { /* the page keeps whatever it already knew */ }
        if (store.facts || store.questions || store.about) seen.set(key, store);
        pending.delete(key);
        return store;
      })();
      pending.set(key, rec);
      return rec;
    }

    async function hydrate(item) {
      const key = `${item.title}|${item.year || ""}`;
      const seq = ++fetchSeq;
      const mine = () => seq === fetchSeq && current === item;

      const done = seen.get(key);
      if (done) {
        if (done.questions) applyQuestions(item, done.questions);
        if (done.facts) applyFacts(item, done.facts);
        if (done.about) applyAbout(item, done.about);
        item._qdone = true;
        item._loading = false;
        render();
        return;
      }

      item._loading = true;
      const rec = startLoad(key, bodyFor(item));
      // whatever a prefetch already collected applies right now; the rest
      // arrives through the listener
      if (rec.store.questions) applyQuestions(item, rec.store.questions);
      if (rec.store.facts) applyFacts(item, rec.store.facts);
      if (rec.store.about) applyAbout(item, rec.store.about);
      if (rec.store.questions || rec.store.facts || rec.store.about) render();
      const onPhase = (event, d) => {
        if (!mine()) return;
        const changed = event === "facts" ? applyFacts(item, d) !== false
          : event === "questions" ? applyQuestions(item, d)
          : event === "about" ? applyAbout(item, d) : false;
        if (changed) render();
      };
      rec.listeners.add(onPhase);
      const store = await rec.promise;
      rec.listeners.delete(onPhase);
      if (mine()) {
        if (store.questions) applyQuestions(item, store.questions);
        if (store.facts) applyFacts(item, store.facts);
        if (store.about) applyAbout(item, store.about);
        item._qdone = true;          // nothing came; stop holding the lanes back
        item._loading = false;
        render();
      }
    }

    // a press on a poster is a good bet it is about to be opened
    function prefetch(title, year) {
      if (!title) return;
      const key = `${title}|${year || ""}`;
      if (seen.has(key) || pending.has(key)) return;
      startLoad(key, { title, year: year || null, kind: null });
    }

    function open(raw, startId) {
      const item = enrich(raw);
      if (!item || !item.title) return;
      current = item;
      if (convo) {
        convo.setBank(bankOf(item));
        convo.setStarters(() => bankOf(item));
      }
      item._loading = true;
      item._qdone = false;
      render();
      hydrate(item);
      root.classList.add("is-on");
      phone.classList.add("is-title");
      scroll.scrollTop = 0;
      if (typeof opts.onOpen === "function") opts.onOpen(item);
      if (startId && convo) convo.open(startId);
    }

    function close() {
      if (!root.classList.contains("is-on")) return;
      if (convo && convo.isOpen()) convo.close();
      root.classList.remove("is-on");
      phone.classList.remove("is-title");
      current = null;
      if (typeof opts.onClose === "function") opts.onClose();
    }

    root.addEventListener("click", e => {
      if (e.target.closest("[data-tpage-close]")) { close(); return; }
      if (e.target.closest("[data-tpage-watch]")) {
        const item = current;
        if (!item) return;
        if (typeof opts.onWatch === "function") opts.onWatch(item);
        else toast(inPlan(item.provider) ? `Opening ${item.provider}…` : `Opening ${item.provider}…`);
        return;
      }
      if (e.target.closest("[data-tpage-list]")) {
        const item = current;
        if (!item) return;
        const on = toggleList(item.id);
        render();
        if (typeof opts.onList === "function") opts.onList(item, on);
        else toast(on ? "On your Watch list" : "Removed from Watch list");
        return;
      }
      const chip = e.target.closest("[data-tpage-ask]");
      if (chip && convo) {
        convo.setBank(bankOf(current));
        convo.open(chip.getAttribute("data-tpage-ask"));
      }
    });

    return { open, close, isOpen: () => root.classList.contains("is-on"), enrich, listed, prefetch };
  }

  global.GummyTitle = { create, enrich, catalog, listed, toggleList, lookup };
})(window);
