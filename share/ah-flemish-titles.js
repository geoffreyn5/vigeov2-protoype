(function (global) {
  const F = (q, a, follow) => ({ q, a, follow: follow || [] });

  const tafelChips = [
    F("What’s tonight’s episode about?", "Tonight’s topics: Dolly Parton, the record Belgian summer, and Theo Francken’s climate post, with KU Leuven climate scientist Nicole Van Lipzig at the table. Topics change nightly with the news.", [
      { id: "tafel-climate", q: "Did Gert really back Francken on the climate?", a: "He said he understood the post. Van Lipzig’s graphs disagreed. That live back-and-forth is the heart of the show. Gert asks, the experts answer." },
      { id: "tafel-catch", q: "Can I watch it without the whole hour?", a: "Yes. The show is split into separate segments, so you can watch just the topics or guests you’re interested in." }
    ]),
    F("Who are tonight’s guests?", "Jade Mintjens on her new Play show, Little Kim and Christophe Vekeman on Dolly Parton, and climate scientist Nicole Van Lipzig on the summer heat, plus regulars Hannes Heynderickx, Nora Gharib and Peter Van de Veire. The table changes every night.", [
      { id: "tafel-ruben", q: "Who’s in the chair this season?", a: "Gert Verhulst hosts most nights, with Tine Embrechts filling in and Ruben Van Gucht new as third host this season. Live from De Zuiderkroon, Monday to Thursday at 20:00 on Play." },
      { id: "tafel-live", q: "Do I need to watch it live?", a: "No. Play has every episode from the morning after. Live at 20:00 is the full experience, but a day late works fine. A week late less so, since it’s all about that day’s news." }
    ]),
    F("Which recent episodes are worth catching up on?", "Last night’s (the climate discussion everyone’s still talking about) and Monday’s season opener, where Ruben Van Gucht joined as host. Older episodes date quickly because the show follows the day’s news.", [
      { id: "tafel-week", q: "Is there a weekly recap if I missed the table?", a: "Yes. De Tafel van de Week collects the best moments of the week. Handy for the highlights, though the daily episodes carry the full discussions." },
      { id: "tafel-sofa", q: "Can I watch this in the background?", a: "Yes. The discussion is easy to follow even if you look away now and then. Zeg Eens Euh starts at 22:00 on Play if you want something lighter afterwards." }
    ])
  ];

  const familieChips = [
    F("What did I miss this week?", "The season opened with an extra-long Monday episode: Victor is still missing, Erik walked into the Jan & Alleman asking for Peter Van den Bossche, and Hanne came back without Gaston. Three storylines, 25 minutes a night on VTM GO.", [
      { id: "fam-monday", q: "So I should start at the long episode?", a: "Yes. Monday’s extra-long episode is the hook for the whole week. It’s on VTM GO. Start there rather than mid-week." },
      { id: "fam-miss", q: "What if I miss two nights?", a: "VTM GO+ has the whole week available from Saturday, so you can catch up in one sitting. Missing a night or two is survivable. It’s a soap, it fills you in." }
    ]),
    F("Can I just start now, or do I need backstory?", "Start now. It’s a daily soap built for joining. All you need is this week’s storylines (Victor’s disappearance, the stranger at the pub), and the show hands you those as you watch.", [
      { id: "fam-week", q: "What’s this week actually about besides Victor?", a: "Besides Victor: Erik arrived asking for Peter Van den Bossche, with flashbacks starting to explain why, and Hanne came home without Gaston. Three storylines running side by side." },
      { id: "fam-thuis", q: "Thuis or Familie if I only have one daily?", a: "Familie if you want VTM and this week’s kidnapping storyline. Thuis if you’re already on VRT MAX. Same length, both dailies. Just a different village." }
    ]),
    F("Who are the main characters right now?", "The Van den Bossche family, as ever. Mathias searching for Victor, Hanne newly back at the pub. The new face is Erik (Bert Haelvoet), who’s asking about Peter Van den Bossche.", [
      { id: "fam-hanne", q: "Is Hanne really back without Gaston?", a: "Yes. She walked into the Jan & Alleman alone, and why is this week’s big question. It’s a daily, so answers come this week." },
      { id: "fam-peter", q: "Do I need to remember Peter Van den Bossche?", a: "A name from the show’s past. Gunther Levi appears in flashbacks, not as a return. Start from Monday’s episode and the show explains the rest." }
    ])
  ];

  const jadeChips = [
    F("Which episode should I start with?", "Episode one, about traffic (the Brussels Ring, endless roadworks, the autokeuring) with guests from Bart De Wever to a fire-breather named Flor. Each week takes on a different Belgian cliché.", [
      { id: "jade-theme", q: "Is every episode a different Belgian gripe?", a: "Yes. One Belgian gripe per week, each episode self-contained. Traffic opened the season. Next week is a fresh cliché." },
      { id: "jade-guests", q: "Is it only famous people complaining?", a: "No. That’s part of the joke. Jade deliberately mixes famous and ordinary Belgians, so a premier ends up next to a mermaid making the same complaint." }
    ]),
    F("Can I watch episodes in any order?", "Yes. One self-contained theme per week, nothing carries over. Thursdays on Play, about 40 minutes each.", [
      { id: "jade-plan", q: "Is this on VRT MAX?", a: "No. It’s on Play. Check the logo on the card. VRT MAX has other shows, not this one." },
      { id: "jade-when", q: "How long is an episode?", a: "About 40 minutes, with a new episode every Thursday. Short enough for a weeknight, and there’s nothing to keep up with." }
    ]),
    F("What kind of humour is it?", "Observational comedy about Belgians, in the style of Philippe Geubels’ show. One theme per week, and the joke is that everyone from the premier to a mermaid has the same complaint. Easy viewing you can talk over.", [
      { id: "jade-who", q: "Who even is Jade Mintjens?", a: "Jade Mintjens. The sidekick from De Ideale Wereld, now carrying her own show for the first time. Episode one even opens with Belgians asking exactly that question." },
      { id: "jade-geubels", q: "Did Geubels sign off on this?", a: "He did. She has his blessing, but calls it a different generation’s take. You can hear it: e-steps and fatbikes weren’t complaints in 2013." }
    ])
  ];

  const zegChips = [
    F("Is it fun to watch with kids?", "Mostly, yes. It’s a word game, so the format is family-friendly. The panel’s jokes can stray, and you won’t know the night’s forbidden word until you’re in it.", [
      { id: "zeg-kids", q: "What age does this actually work for?", a: "Old enough to enjoy watching adults fail at talking. Roughly eight and up. The game itself is clean. The panellists aren’t always." },
      { id: "zeg-tonight", q: "Can I put this on after De Tafel?", a: "Yes. That’s Play’s evening by design: De Tafel at 20:00, Zeg Eens Euh after 22:00, Monday to Thursday." }
    ]),
    F("Can we play along at home?", "Yes, and that’s half the fun: pick a forbidden word, set one minute, and see who cracks first. You need nothing but a timer.", [
      { id: "zeg-open", q: "Was the first night actually funny?", a: "Yes. Viktor Verhulst starts talking like a robot to avoid saying ‘euh’, and Ruth Beeckmans immediately tries to copy him. That gives you a good sense of the humour." },
      { id: "zeg-panel", q: "Who’s on the panel this week?", a: "The panel changes nightly. Opening week: Ruth Beeckmans, Viktor Verhulst, Erik Van Looy and Céline Van Ouytsel, followed by Ruben Van Gucht, Lynn Van den Broeck, Metejoor and Toby Alderweireld." }
    ]),
    F("How does the game work?", "Talk for one minute without saying ‘euh’, hesitating, or using the forbidden word. Four panellists, a buzzer, and James Cooke hosting, about 40 minutes on Play, Monday to Thursday.", [
      { id: "zeg-gert", q: "Why isn’t Gert hosting if it’s his game?", a: "Gert hosts De Tafel at 20:00, so James Cooke took this one at 22:10. You can watch both back to back." },
      { id: "zeg-old", q: "Do I need the old VRT episodes first?", a: "No. The game explains itself. Some 90s episodes are on VRT MAX if you’re curious, but they’re nostalgia, not background knowledge." }
    ])
  ];

  const axelChips = [
    F("Where does he go this season?", "Season 2 opens at the Mexican border and in Palm Springs among die-hard Trump supporters, then moves to Sedona for aliens, Bigfoot hunts and the QAnon shaman. One region per episode, Tuesdays on Play.", [
      { id: "axel-trump", q: "So it’s a Trump show?", a: "No. It is a travel series about the United States, and Trump supporters are part of the first episode. New episodes are on Play on Tuesdays." },
      { id: "axel-s2", q: "What did they actually film at the border?", a: "At the border, a man blocked their van and screamed them off. Then Palm Springs: the ‘Trumpettes’, champagne and kitsch. And a Mexican restaurant serving a burrito named after the president." }
    ]),
    F("Do I need to have seen season 1?", "No. Each episode is a self-contained visit to a different corner of America. Start with ‘Welcome to Trumpland’ if you want the episode everyone’s discussing.", [
      { id: "axel-sedona", q: "Is the alien episode the weird one?", a: "That’s episode two: Sedona, with magnetic implants, a woman who says she has alien children, UFO spotting and a Bigfoot hunt. Trumpland is the political episode. Sedona is the strange one." },
      { id: "axel-length", q: "Is this a weeknight?", a: "Yes. About an hour, on Tuesdays. It sits comfortably after De Tafel if you want a full Play evening." }
    ]),
    F("Show me more travel shows like this", "Nothing in the catalogue travels quite like Axel. His trick is sitting down with people rather than pranking them. Closest in spirit is Jade en de Belgen: the same curious eye, pointed at Belgians instead of Americans.", [
      { id: "axel-sofa", q: "Can I watch this in the background?", a: "Yes. It invites commentary. Palm Springs practically demands it. Good group viewing." },
      { id: "axel-more", q: "What’s closest in my plan?", a: "Jade en de Belgen, Thursdays on Play. Same tone, shorter episodes, Belgians instead of Americans. Or De Tafel for the day’s news instead of a road trip." }
    ])
  ];

  const agnewChips = [
    F("Is this his newest show?", "This is Wake Me Up When It’s Over. The show he wrote during lockdown and toured to 150,000 people. It’s his most recent registration and the one people still quote.", [
      { id: "agnew-bits", q: "What’s the bit people still repeat?", a: "The dog story, the e-scooter rant and the Leopold II section are the bits people tend to remember. The material about gender is more divisive." },
      { id: "agnew-clip", q: "Is the clip the whole joke?", a: "The clips are the doorway. The show is two full hours of Agnew. If a clip already feels long, the full show isn’t your night." }
    ]),
    F("How rough does the language get?", "The language is very strong throughout, and the set covers lockdown, BLM, gender and Leopold II. It is not suitable for children.", [
      { id: "agnew-woke", q: "Is this the woke-bashing one?", a: "It covers those topics, but they are only part of the set. There is also a lot of material about everyday life, including his dog and the so-called avocado elite." },
      { id: "agnew-kids", q: "Is this okay to watch while the kids are still up?", a: "No. It’s R-rated from early on. Barbie or Zeg Eens Euh are the safe picks while anyone small is still up." }
    ]),
    F("What other stand-up specials can I watch?", "In your current plan, this is the main stand-up registration. Zeg Eens Euh gives you Flemish comedy in 40 minutes, and Jade en de Belgen is the weekly comedy fix. Different formats, same laughs.", [
      { id: "agnew-long", q: "Two hours forty-three. Is that a weeknight?", a: "Not really. It runs for 2h 43, so it is better suited to a weekend or split across two evenings." },
      { id: "agnew-app", q: "Is this on VTM GO or Streamz?", a: "Both VTM GO and Streamz carry it. The card here points to VTM GO. It’s one continuous show: press play, sit back." }
    ])
  ];

  function item(base, clip, extra) {
    const poster = base.poster;
    return Object.assign({
      id: base.id,
      title: base.title,
      syn: base.syn,
      kind: base.kind,
      length: base.length,
      provider: base.provider,
      logo: base.logo,
      youtube: clip,
      start: 0,
      backdrop: poster,
      poster,
      qs: base.chips
    }, extra || {});
  }

  const catalog = {
    tafel: {
      id: "tafel", title: "De Tafel van Gert", syn: "The day, chewed over. One hour.",
      kind: "Talk", length: "Daily · ~60m",
      provider: "Play", logo: "play-logo.png",
      poster: "posters/tafel-gert.jpg", still: "stills/tafel-gert-card.jpg",
      seasons: ["Daily"],
      about: "Live table, Monday to Thursday, Play. Six guests on the day’s news from De Zuiderkroon. Last night was Dolly, the hottest Belgian summer, and Gert on Francken’s climate post. Not a format you binge — the conversation people are still having.",
      chips: tafelChips
    },
    familie: {
      id: "familie", title: "Familie", syn: "Daily soap, easy to fall back into",
      kind: "Series", length: "Daily · ~25m",
      provider: "VTM GO", logo: "vtm-go-logo.png",
      poster: "posters/familie.jpg", still: "stills/familie-card.jpg",
      seasons: ["Daily"],
      about: "The VTM daily — Van den Bossche, the Jan & Alleman, 25 minutes. New season opened on Victor’s kidnapping and a stranger asking for Peter. You don’t need 1991. You need this week.",
      chips: familieChips
    },
    jade: {
      id: "jade", title: "Jade en de Belgen", syn: "Belgian clichés, tested weekly",
      kind: "Series", length: "Weekly · ~40m",
      provider: "Play", logo: "play-logo.png",
      poster: "posters/jade-belgen.jpg", still: "stills/jade-card.jpg",
      seasons: ["S1"],
      about: "Jade Mintjens takes the Geubels format and points it at àlle Belgen. Episode one is traffic — the Ring, fatbikes, the keuring — with Toby Alderweireld next to a vuurspuwer. Thursday, Play.",
      chips: jadeChips
    },
    zegeuh: {
      id: "zegeuh", title: "Zeg Eens Euh", syn: "One minute of talking, zero euh",
      kind: "Game", length: "Daily · ~40m",
      provider: "Play", logo: "play-logo.png",
      poster: "posters/zeg-eens-euh.jpg", still: "stills/zegeuh-card.jpg",
      seasons: ["2026"],
      about: "The word fight is back. James Cooke in Gert’s old chair. Four Vlamingen, one minute, no euh, no forbidden word. Monday to Thursday on Play, after De Tafel.",
      chips: zegChips
    },
    axel: {
      id: "axel", title: "Axel Terug Naar Amerika", syn: "Travel doc, one region per episode",
      kind: "Series", length: "S2 · ~65m",
      provider: "Play", logo: "play-logo.png",
      poster: "posters/axel-amerika.jpg", still: "stills/axel-card.jpg",
      seasons: ["S1", "S2"],
      about: "Axel Daeseleire back in a louder America. Season two opens in Trumpland — border rage, Palm Springs Trumpettes, a Trumborrito — then Sedona for aliens and the QAnon shaman. Tuesday, Play.",
      chips: axelChips
    },
    agnew: {
      id: "agnew", title: "Alex Agnew", syn: "Stand-up, sharp, no filter",
      kind: "Stand-up", length: "2h 43",
      provider: "VTM GO", logo: "vtm-go-logo.png",
      poster: "posters/alex-agnew.jpg", still: "stills/agnew-card.jpg",
      seasons: ["Special"],
      about: "Wake Me Up When It’s Over — two years in his own head, then the Stadsschouwburg. Deelsteps, the avocado elite, Sherlock the dwergpoedel, Leopold II. 2h 43 on VTM GO. A night, not a clip.",
      chips: agnewChips
    }
  };

  const feed = [
    item(catalog.tafel, "tafel-gert-1"),
    item(catalog.familie, "familie-1"),
    item(catalog.zegeuh, "zeg-eens-euh-1"),
    item(catalog.jade, "jade-belgen"),
    item(catalog.axel, "axel-amerika"),
    item(catalog.agnew, "alex-agnew")
  ];

  const laneLead = [
    item(catalog.tafel, "tafel-gert-1"),
    item(catalog.familie, "familie-1"),
    item(catalog.zegeuh, "zeg-eens-euh-1"),
    item(catalog.axel, "axel-amerika"),
    item(catalog.jade, "jade-belgen"),
    item(catalog.agnew, "alex-agnew")
  ];

  const search = {
    tafel: { title: catalog.tafel.title, provider: "Play", logo: catalog.tafel.logo, poster: catalog.tafel.poster, syn: catalog.tafel.syn, kind: catalog.tafel.kind },
    familie: { title: catalog.familie.title, provider: "VTM GO", logo: catalog.familie.logo, poster: catalog.familie.poster, syn: catalog.familie.syn, kind: catalog.familie.kind },
    jade: { title: catalog.jade.title, provider: "Play", logo: catalog.jade.logo, poster: catalog.jade.poster, syn: catalog.jade.syn, kind: catalog.jade.kind },
    zegeuh: { title: catalog.zegeuh.title, provider: "Play", logo: catalog.zegeuh.logo, poster: catalog.zegeuh.poster, syn: catalog.zegeuh.syn, kind: catalog.zegeuh.kind },
    axel: { title: catalog.axel.title, provider: "Play", logo: catalog.axel.logo, poster: catalog.axel.poster, syn: catalog.axel.syn, kind: catalog.axel.kind },
    agnew: { title: catalog.agnew.title, provider: "VTM GO", logo: catalog.agnew.logo, poster: catalog.agnew.poster, syn: catalog.agnew.syn, kind: catalog.agnew.kind }
  };

  function stuffRow(id, extra) {
    const t = catalog[id];
    return Object.assign({
      id: t.id,
      title: t.title,
      kind: t.kind === "Stand-up" ? "Film" : t.kind === "Talk" || t.kind === "Game" ? "Series" : t.kind,
      length: t.length,
      mins: id === "agnew" ? 163 : id === "axel" ? 65 : id === "tafel" ? 60 : id === "jade" ? 40 : 25,
      provider: t.provider,
      logo: t.logo,
      poster: t.poster,
      still: t.still,
      fallback: t.poster,
      tags: extra.tags,
      progress: extra.progress,
      continue: extra.continue,
      ep: extra.ep
    }, extra.more || {});
  }

  const stuff = [
    stuffRow("tafel", { tags: ["easy", "friends", "leaving"], progress: .74, continue: true, ep: "Last night" }),
    stuffRow("familie", { tags: ["easy", "leaving", "friends"], progress: .61, continue: true, ep: "Daily" }),
    stuffRow("zegeuh", { tags: ["easy", "friends", "short"], progress: .22, continue: true, ep: "Tonight" }),
    stuffRow("jade", { tags: ["easy", "friends", "friday"] }),
    stuffRow("axel", { tags: ["friday", "acclaimed", "friends"] }),
    stuffRow("agnew", { tags: ["friday", "short", "friends"], more: { kind: "Film" } })
  ];

  const aliases = {
    detafelvangert: "tafel",
    detafel: "tafel",
    tafelvangert: "tafel",
    gert: "tafel",
    familie: "familie",
    jadeendebelgen: "jade",
    jade: "jade",
    alexagnew: "agnew",
    wakemeupwhenitsover: "agnew",
    agnew: "agnew",
    zegeenseuh: "zegeuh",
    zegeuh: "zegeuh",
    axelterugnaaramerika: "axel",
    axelinamerika: "axel",
    axel: "axel"
  };

  global.FlemishTitles = {
    catalog,
    feed,
    laneLead,
    search,
    stuff,
    aliases,
    ids: ["tafel", "familie", "jade", "zegeuh", "axel", "agnew"]
  };
})(window);
