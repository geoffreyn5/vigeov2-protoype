(function (global) {
  const F = (q, a, follow) => ({ q, a, follow: follow || [] });

  const tafelChips = [
    F("What’s tonight’s episode about?", "Dolly Parton, the record Belgian summer and Theo Francken’s climate post, with KU Leuven climate scientist Nicole Van Lipzig at the table.", [
      { id: "tafel-climate", q: "What did Gert say about Francken’s post?", a: "He said he understood it. Van Lipzig answered with her graphs, and that exchange took up most of the segment." },
      { id: "tafel-catch", q: "Can I watch just one topic?", a: "Yes. The show is split into segments, so you can pick the topics or guests you want." }
    ]),
    F("Can I watch it later?", "Yes. Every episode is on Play the morning after. It follows the news, so it dates quickly.", [
      { id: "tafel-ruben", q: "Is there a weekly recap?", a: "Yes. De Tafel van de Week collects the best moments of the week." },
      { id: "tafel-live", q: "What’s on after it?", a: "Zeg Eens Euh, around 22:00 on Play." }
    ]),
    F("Who are tonight’s guests?", "Jade Mintjens on her new Play show, Little Kim and Christophe Vekeman on Dolly Parton, and Nicole Van Lipzig on the summer heat. Regulars Hannes Heynderickx, Nora Gharib and Peter Van de Veire are there too.", [
      { id: "tafel-week", q: "Who hosts this season?", a: "Gert Verhulst most nights, with Tine Embrechts filling in and Ruben Van Gucht as the new third host." },
      { id: "tafel-sofa", q: "When is it on?", a: "Monday to Thursday at 20:00 on Play, live from De Zuiderkroon." }
    ])
  ];

  const familieChips = [
    F("What did I miss this week?", "The season opened with an extra-long Monday episode. Victor is still missing, Erik walked into the Jan & Alleman asking for Peter Van den Bossche, and Hanne came back without Gaston.", [
      { id: "fam-monday", q: "Where should I start?", a: "With Monday’s extra-long episode. It sets up the whole week." },
      { id: "fam-miss", q: "Can I catch up on the whole week at once?", a: "Yes. VTM GO+ has the full week from Saturday." }
    ]),
    F("Can I start now, without the backstory?", "Yes. It’s a daily soap, made to join at any point. The show fills you in on this week’s storylines as you go.", [
      { id: "fam-week", q: "What’s happening this week?", a: "Victor is still missing, Erik turned up asking for Peter Van den Bossche, and Hanne came home without Gaston." },
      { id: "fam-thuis", q: "How long is an episode?", a: "25 minutes, every weekday, on VTM GO." }
    ]),
    F("Who are the main characters right now?", "The Van den Bossche family. Mathias is searching for Victor and Hanne is back at the pub. The new face is Erik (Bert Haelvoet).", [
      { id: "fam-hanne", q: "Why is Hanne back without Gaston?", a: "That’s this week’s big question. The show answers it in the coming episodes." },
      { id: "fam-peter", q: "Is Peter Van den Bossche back?", a: "No. Gunther Levi only appears in flashbacks." }
    ])
  ];

  const jadeChips = [
    F("What’s the first episode about?", "Traffic: the Brussels Ring, roadworks and the car inspection, with guests from Bart De Wever to a fire-breather named Flor.", [
      { id: "jade-theme", q: "Is every episode a different topic?", a: "Yes. One Belgian cliché per week." },
      { id: "jade-guests", q: "Are the guests famous?", a: "Some are. Jade mixes famous and ordinary Belgians on purpose." }
    ]),
    F("Can I watch episodes in any order?", "Yes. Each episode has its own theme. New ones come out on Thursdays on Play.", [
      { id: "jade-plan", q: "Is it on VRT MAX?", a: "No, it’s on Play." },
      { id: "jade-when", q: "How long is an episode?", a: "About 40 minutes." }
    ]),
    F("What kind of humour is it?", "Observational comedy about Belgians, in the style of Philippe Geubels’ show. Famous and ordinary Belgians complain about the same thing.", [
      { id: "jade-who", q: "Who is Jade Mintjens?", a: "The sidekick from De Ideale Wereld, now with her own show for the first time." },
      { id: "jade-geubels", q: "Is it connected to Geubels’ show?", a: "She has his blessing, but it’s her own take, for a younger generation." }
    ])
  ];

  const zegChips = [
    F("Is it fun to watch with kids?", "Mostly. The game is family-friendly, but the panel’s jokes can go further.", [
      { id: "zeg-kids", q: "What age does it work for?", a: "About eight and up." },
      { id: "zeg-tonight", q: "When is it on?", a: "Monday to Thursday around 22:10 on Play. Episodes run about 40 minutes." }
    ]),
    F("Can we play along at home?", "Yes. Pick a forbidden word, set a timer for one minute and see who cracks first.", [
      { id: "zeg-open", q: "What happened on the first night?", a: "Viktor Verhulst talks like a robot to avoid saying ‘euh’, and Ruth Beeckmans copies him straight away." },
      { id: "zeg-panel", q: "Who’s on the panel this week?", a: "It changes nightly. Opening week had Ruth Beeckmans, Viktor Verhulst, Erik Van Looy and Céline Van Ouytsel, then Ruben Van Gucht, Lynn Van den Broeck, Metejoor and Toby Alderweireld." }
    ]),
    F("How does the game work?", "Talk for one minute without saying ‘euh’, hesitating or using the forbidden word. Four panellists, a buzzer, and James Cooke as host.", [
      { id: "zeg-gert", q: "Why isn’t Gert hosting?", a: "Gert hosts De Tafel at 20:00, so James Cooke took this one at 22:10." },
      { id: "zeg-old", q: "Is it a remake?", a: "Yes, of the 90s VRT show. Some old episodes are on VRT MAX." }
    ])
  ];

  const axelChips = [
    F("Where does he go this season?", "The Mexican border and Palm Springs among Trump supporters, then Sedona for aliens, Bigfoot hunters and the QAnon shaman. One region per episode.", [
      { id: "axel-trump", q: "Is it a political show?", a: "Not really. It’s a travel series about the US. Trump supporters are the focus of the first episode." },
      { id: "axel-s2", q: "What happens at the border?", a: "A man blocks their van and shouts them away. In Palm Springs they meet the ‘Trumpettes’, and a Mexican restaurant serves a burrito named after the president." }
    ]),
    F("Do I need to have seen season 1?", "No. Each episode is a separate trip to a different part of America. ‘Welcome to Trumpland’ is the one people are talking about.", [
      { id: "axel-sedona", q: "What happens in the Sedona episode?", a: "Axel meets people with magnetic implants, a woman who says she has alien children, UFO spotters and a Bigfoot hunter." },
      { id: "axel-length", q: "How long is an episode?", a: "About an hour. New episodes land on Tuesdays on Play." }
    ]),
    F("Any other travel shows like this?", "Not in the catalogue right now. Jade en de Belgen is the closest: the same curious interviews, with Belgians instead of Americans.", [
      { id: "axel-sofa", q: "Is it fun to watch with friends?", a: "Yes. It gets people talking, especially the Palm Springs part." },
      { id: "axel-more", q: "Where can I watch Jade en de Belgen?", a: "On Play. New episodes come out on Thursdays and run about 40 minutes." }
    ])
  ];

  const agnewChips = [
    F("Which show is this?", "Wake Me Up When It’s Over, the show he wrote during lockdown and toured to 150,000 people. It’s his most recent recorded show.", [
      { id: "agnew-bits", q: "Which bits do people quote?", a: "The dog story, the e-scooter rant and the Leopold II section. The material about gender divides people more." },
      { id: "agnew-clip", q: "Is the full show like the clip?", a: "Same tone, but much longer. The full show is 2h 43 of Agnew on stage." }
    ]),
    F("How rough does the language get?", "Very strong, from start to finish. He also covers lockdown, BLM, gender and Leopold II. Not one for children.", [
      { id: "agnew-woke", q: "Which topics does he cover?", a: "Lockdown, BLM, gender and Leopold II, plus a lot of everyday material, like his dog and the so-called avocado elite." },
      { id: "agnew-kids", q: "Can I watch it with the kids still up?", a: "No. The language is strong from the first minutes. Barbie or Zeg Eens Euh work better while kids are around." }
    ]),
    F("How long is it?", "2h 43 in one go. Many people split it over two evenings.", [
      { id: "agnew-long", q: "Can I stop halfway and finish later?", a: "Yes. It’s one continuous show, so you can pause between bits and pick it up later." },
      { id: "agnew-app", q: "Is it on VTM GO or Streamz?", a: "Both. The card here opens it on VTM GO." }
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
      id: "tafel", title: "De Tafel van Gert", syn: "Nightly talk show on the day’s news",
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
      id: "zegeuh", title: "Zeg Eens Euh", syn: "Game show, a minute of talk without ‘euh’",
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
      poster: "posters/vl/axel.webp", still: "stills/axel-card.jpg",
      seasons: ["S1", "S2"],
      about: "Axel Daeseleire back in a louder America. Season two opens in Trumpland — border rage, Palm Springs Trumpettes, a Trumborrito — then Sedona for aliens and the QAnon shaman. Tuesday, Play.",
      chips: axelChips
    },
    agnew: {
      id: "agnew", title: "Alex Agnew", syn: "Stand-up special, strong language",
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
    item(catalog.axel, "vl-axel.webm"),
    item(catalog.agnew, "alex-agnew")
  ];

  const laneLead = [
    item(catalog.tafel, "tafel-gert-1"),
    item(catalog.familie, "familie-1"),
    item(catalog.zegeuh, "zeg-eens-euh-1"),
    item(catalog.axel, "vl-axel.webm"),
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
