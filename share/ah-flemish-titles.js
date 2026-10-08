(function (global) {
  const F = (q, a, follow) => ({ q, a, follow: follow || [] });

  const tafelChips = [
    F("Who’s at the table in this episode?", "Jade Mintjens on her new Play show, Little Kim and Christophe Vekeman on Dolly Parton, and Nicole Van Lipzig on the summer heat. Regulars Hannes Heynderickx, Nora Gharib and Peter Van de Veire are there too."),
    F("What did Gert say about Francken?", "He said he understood it. Van Lipzig answered with her graphs, and that exchange took up most of the segment."),
    F("Is Jade talking about her new show?", "Yes. In this episode, Jade Mintjens is at the table to discuss her new Play show.")
  ];

  const familieChips = [
    F("Is Peter Van den Bossche really back?", "In the source episode, Gunther Levi appears in flashbacks rather than Peter returning to the present-day story."),
    F("Who’s asking for Peter at the pub?", "That is Erik, played by Bert Haelvoet. He is the new arrival asking for Peter Van den Bossche."),
    F("Why did Margot take a break from Familie?", "Margot Hallemans took a year away to focus on her yoga retreats. Her return as Hanne follows that break.")
  ];

  const jadeChips = [
    F("Is this the old Geubels format?", "Yes. Jade takes over the format of Geubels en de Belgen, bringing her own perspective to Belgian habits and irritations."),
    F("Are those guests ordinary Belgians?", "Some are. Jade mixes familiar faces with people from outside television, including a fire-breather and a mermaid performer."),
    F("Is Jade from De Ideale Wereld?", "Yes. Jade Mintjens appeared as a sidekick on De Ideale Wereld before fronting her own show.")
  ];

  const zegChips = [
    F("Is this the old Zeg Eens Euh?", "Yes. It revives the earlier word game rather than introducing a completely new format."),
    F("Wasn’t Gert the host before?", "Yes. Gert Verhulst hosted the earlier Play version. James Cooke hosts the new revival."),
    F("Can we play the game ourselves?", "Yes. Set a one-minute timer and choose a forbidden word, then try speaking without saying it or “euh”.")
  ];

  const axelChips = [
    F("Does Axel meet Trump supporters?", "Yes. In Palm Springs he meets Trump supporters, as part of a wider trip through different parts of America."),
    F("What’s Axel doing in Sedona?", "He meets UFO enthusiasts, a Bigfoot hunter and people with unusual beliefs about aliens."),
    F("Does he meet the QAnon shaman?", "Yes. The Sedona trip includes a meeting with the QAnon shaman, alongside Axel’s encounters with UFO enthusiasts.")
  ];

  const agnewChips = [
    F("Is this the show about “woke” culture?", "He tackles subjects including BLM, gender and Leopold II, but there is also everyday material, including stories about his dog."),
    F("Is the rest as blunt as this clip?", "Yes. The full show uses the same blunt tone and strong language as the clip."),
    F("Was this written during lockdown?", "Yes. Wake Me Up When It’s Over grew out of material Alex Agnew wrote during lockdown.")
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
