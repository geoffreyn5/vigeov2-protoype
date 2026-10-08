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
      id: "wed", title: "Wednesday", syn: "Wednesday Addams at boarding school", kind: "Series", length: "8 ep · ~50m",
      provider: "Netflix", logo: "Netflix logo.webp",
      poster: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
      still: "https://image.tmdb.org/t/p/w780/sNLP0dLZcVBqYa3MchCXJqgDtFb.jpg",
      seasons: ["S1", "S2"],
      about: "Wednesday Addams at Nevermore — deadpan, a murder, and that dance. You don’t need the old films. You’ll know in episode one if the claws are the point.",
      chips: [
        F("Is Thing a real hand or CGI?", "Mostly a real hand: performer Victor Dorobantu plays Thing on set, with visual effects removing his body and adding shots where needed."),
        F("Is she from The Addams Family?", "Yes. It is the same Addams Family character, with a new story centred on her time at Nevermore."),
        F("Did Jenna make up that dance herself?", "Yes. Jenna Ortega choreographed the dance, drawing on several influences including Lisa Loring’s original Wednesday.")
      ]
    },
    dune: {
      id: "dune", title: "Dune: Part Two", syn: "Sci-fi sequel, war over a desert planet", kind: "Film", length: "2h 46",
      provider: "HBO Max", logo: "hbo-max-new-logo.jpg",
      poster: "https://image.tmdb.org/t/p/w500/y4ml848KTz0zccQxfWlE8CMMC13.jpg",
      still: "https://image.tmdb.org/t/p/w780/eZ239CUp1d6OryZEBPnO2n87gMG.jpg",
      seasons: ["Film"],
      about: "Paul Atreides joins the Fremen and walks the line between prophecy and revenge. The rare sequel that outgrows its first half — worms, war, and one very intense family dinner.",
      chips: [
        F("Do I need to rewatch Dune: Part One?", "If you remember the characters and the struggle over Arrakis, a recap can be enough. Part Two continues that story rather than starting again."),
        F("Why is everyone fighting over the spice?", "Spice makes interstellar travel possible. Controlling Arrakis, where it is found, means controlling a resource the whole empire depends on."),
        F("Is that the actor who played Elvis?", "Yes. Austin Butler plays Feyd-Rautha, the Harkonnen fighter.")
      ]
    },
    under: {
      id: "under", title: "Undercover", syn: "Crime series, cops undercover on a campsite", kind: "Series", length: "3 seasons · ~50m",
      provider: "Netflix", logo: "Netflix logo.webp",
      poster: "https://image.tmdb.org/t/p/w500/ziOJNiNUbomrs81behksd0z9Qoz.jpg",
      still: "https://image.tmdb.org/t/p/w780/x2kmiy3RS3hC0SQC0N2sLN3rsdB.jpg",
      seasons: ["S1", "S2", "S3", "S4"],
      about: "Limburg camping, Dutch-Belgian border slang, and a villain you’ll weirdly root for. Crime-show tense, not torture. The series is the long game; Ferry is the origin glow-up.",
      chips: [
        F("Was the campsite operation real?", "The premise is loosely inspired by a real undercover operation against an XTC network on the Belgian-Dutch border. The series’ characters and story are fictionalised."),
        F("Where does Ferry fit into Undercover?", "Undercover introduces Ferry as the drug boss. The Ferry film goes back to his earlier life."),
        F("Is this a Belgian version of Narcos?", "It shares the drug-trade subject, but Undercover tells its own Belgian-Dutch story. The central tension comes from officers living undercover near a drug boss on a campsite.")
      ]
    },
    ferry: {
      id: "ferry", title: "Ferry", syn: "Undercover prequel, Ferry’s early years", kind: "Film", length: "1h 46",
      provider: "Netflix", logo: "Netflix logo.webp",
      poster: "https://image.tmdb.org/t/p/w500/w6n1pu9thpCVHILejsuhKf3tNCV.jpg",
      still: "https://image.tmdb.org/t/p/w780/fejok33Ijc6SppiEU1cfwA9Mo2.jpg",
      seasons: ["Film"],
      about: "Ferry Bouman before the camping empire — Limburg, the underworld, the glow-up. A closed film if you wanted Undercover without another season.",
      chips: [
        F("Is Ferry set before Undercover?", "Yes. The film tells Ferry’s earlier story, before the events of Undercover."),
        F("Is this the Ferry film or the series?", "This is the film. There is also a Ferry series, which picks up after it."),
        F("Is it the same actor playing Ferry?", "Yes. Frank Lammers plays Ferry Bouman in both the film and Undercover.")
      ]
    },
    bear: {
      id: "bear", title: "The Bear", syn: "Chef takes over his family’s sandwich shop", kind: "Series", length: "S3 · ~30m",
      provider: "Disney+", logo: "disney-plus-logo.png",
      poster: "https://image.tmdb.org/t/p/w500/6FVNnVk0SZFdzb9dkvOr13XyyM4.jpg",
      still: "https://image.tmdb.org/t/p/w780/aZz0AOpYcDyYwfET9k6j3QQXPuS.jpg",
      seasons: ["S1", "S2", "S3"],
      about: "Carmy comes home to Chicago to run the family sandwich shop. Kitchen pressure, family debt, a crew that doesn’t trust him. Stress in 20–30 minute hits.",
      chips: [
        F("Is anyone in the cast a real chef?", "Yes. Matty Matheson, who plays Neil Fak, is a chef and restaurateur as well as a producer on the show."),
        F("Is Richie actually Carmy’s cousin?", "No. Richie was close to Carmy’s brother Mikey and is treated as family. “Cousin” is what they call each other."),
        F("Is Carmy the guy from Shameless?", "Yes. Jeremy Allen White, who played Lip Gallagher in Shameless, plays Carmy.")
      ]
    },
    y1985: {
      id: "y1985", title: "1985", syn: "Drama series on the Bende van Nijvel", kind: "Series", length: "8 ep · ~50m",
      provider: "VRT MAX", logo: "vrt-max-logo.png",
      poster: "https://image.tmdb.org/t/p/w500/ma1FtkhQ1mQRbyYUTWY5ngi4Xne.jpg",
      still: "https://image.tmdb.org/t/p/w500/ma1FtkhQ1mQRbyYUTWY5ngi4Xne.jpg",
      seasons: ["Miniserie"],
      about: "Three young friends from the countryside get pulled into the darkest unsolved case in Belgian history. Tense rather than graphic — dread, not gore.",
      chips: [
        F("Is this about the Bende van Nijvel?", "Yes. The series draws on the Bende van Nijvel case, using a dramatised story to explore that period."),
        F("Were Marc, Franky and Vicky real people?", "They are fictional characters used to tell a story set against real events from the period."),
        F("Does the story begin in 1985?", "No. It begins in 1980, as the three young leads move to Brussels. The title points to the turbulent period the story builds towards.")
      ]
    },
    thuis: {
      id: "thuis", title: "Thuis", syn: "Daily soap, about 25 minutes", kind: "Series", length: "Daily · ~25m",
      provider: "VRT MAX", logo: "vrt-max-logo.png",
      poster: "https://image.tmdb.org/t/p/w500/5tSBe01mPLii0I1NoCGSFJSO97M.jpg",
      still: "https://image.tmdb.org/t/p/w780/39Se1j3FyhhL8kZKAEno5YIss5X.jpg",
      seasons: ["Daily"],
      about: "The Flemish daily — 25 minutes, already in your plan. Not a case. The thing you chip away when the night is done, or when the room is local and talking.",
      chips: [
        F("Was Frank in Thuis from the beginning?", "Yes. Frank Bomans, played by Pol Goossen, was among the original characters when Thuis began in 1995."),
        F("How is Kaat related to Frank?", "Kaat is Frank and Simonne’s daughter, played by Leen Dendievel."),
        F("Is the same actress back as Kaat?", "Yes. Leen Dendievel returned in 2025 after a break of more than five years.")
      ]
    },
    chantal: {
      id: "chantal", title: "Chantal", syn: "Crime comedy with a village cop", kind: "Series", length: "S2 · ~45m",
      provider: "VRT MAX", logo: "vrt-max-logo.png",
      poster: "https://image.tmdb.org/t/p/w500/pmoicISpTRSt4bu03bwEaVazBXS.jpg",
      seasons: ["S1", "S2"],
      about: "Flemish crime with a dry grin. If you liked it for the case, not the jokes, say so — that’s how the next pick stays on the crime side of the sofa.",
      chips: [
        F("Is she the cop from Eigen Kweek?", "Yes. Maaike Cafmeyer returns as Chantal Vantomme, the police officer from Eigen Kweek, in her own series."),
        F("Are the cases based on local crimes?", "They take inspiration from crime stories in West Flanders, but the makers freely fictionalise them."),
        F("Is Loveringem a real place?", "No. Loveringem is fictional, although its setting and characters draw on the Westhoek.")
      ]
    },
    assisen: {
      id: "assisen", title: "Assisen", syn: "Flemish courtroom drama", kind: "Series", length: "S2 · ~45m",
      provider: "VTM GO", logo: "vtm-go-logo.png",
      poster: "https://image.tmdb.org/t/p/w500/1VSSxdlbP5Tqow1eZBVIk6Ngy8E.jpg",
      still: "https://image.tmdb.org/t/p/w780/erZh4tQsSDp83Nr4MP2LhvKAmbF.jpg",
      seasons: ["S1", "S2"],
      about: "A Flemish courtroom that turns the room. Twisty rather than violent. Locked on VTM GO — the case you want if the night can take another app.",
      chips: [
        F("Do viewers get to act as the jury?", "That is part of the original interactive format: viewers were invited to judge guilt or innocence. Whether voting is still open depends on the episode and broadcast."),
        F("Do we find out if the jury was right?", "Yes. The final episode reveals what really happened, so you can compare it with the verdict."),
        F("Why a trial if he already confessed?", "In De insulinemoord, the grandfather admits causing the death but claims he acted out of mercy. The trial tests that account against the family’s very different version.")
      ]
    },
    verraders: {
      id: "verraders", title: "De Verraders", syn: "Game show with secret traitors", kind: "Series", length: "S3 · ~50m",
      provider: "VTM GO", logo: "vtm-go-logo.png",
      poster: "https://image.tmdb.org/t/p/w500/dB0LuvCwbXQTK2h3R8H8e0pVr2z.jpg",
      still: "https://image.tmdb.org/t/p/w780/niS3AVdPp4pQpL46XxqTn4EG7AL.jpg",
      seasons: ["S1", "S2", "S3"],
      about: "The Belgian sofa format — traitors, a round table, talking over it. Not a story-twist; a format-twist. Locked on VTM GO.",
      chips: [
        F("Are the contestants all celebrities?", "Yes. The Flemish programme brings well-known participants together for its deception game."),
        F("How do they choose who to banish?", "The players discuss their suspicions and vote for the person they think is a traitor. That person leaves the game."),
        F("Can a traitor win the prize?", "Yes. The traitors are competing to survive the votes and win, while the other players try to expose them.")
      ]
    },
    squid: {
      id: "squid", title: "Squid Game", syn: "Survival drama built on children’s games", kind: "Series", length: "S2 · ~55m",
      provider: "Netflix", logo: "Netflix logo.webp",
      poster: "https://image.tmdb.org/t/p/w500/1QdXdRYfktUSONkl1oD5gc6Be0s.jpg",
      still: "https://image.tmdb.org/t/p/w780/2meX1nMdScFOoV4370rqHWKmXhY.jpg",
      seasons: ["S1", "S2"],
      about: "The game you already know — debt, survival, and a room that will talk after. You’re mid-season. It’s marked leaving, so this is the one you’ll feel if it goes.",
      chips: [
        F("Are those real Korean children’s games?", "Many are inspired by childhood games. The lethal rules and high-stakes competition belong to the fiction."),
        F("Is this the drama or the reality show?", "This is the scripted drama. Squid Game: The Challenge is the separate competition series with real contestants."),
        F("Where does the creepy doll come from?", "Young-hee draws on a familiar character from Korean schoolbooks. Squid Game turns that childhood image into something threatening.")
      ]
    },
    tlou: {
      id: "tlou", title: "The Last of Us", syn: "Post-apocalypse road series", kind: "Series", length: "S2 · ~55m",
      provider: "HBO Max", logo: "hbo-max-new-logo.jpg",
      poster: "https://image.tmdb.org/t/p/w500/dmo6TYuuJgaYinXBPjrgG9mB5od.jpg",
      still: "https://image.tmdb.org/t/p/w780/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg",
      seasons: ["S1", "S2"],
      about: "Twenty years after the outbreak, what’s left of love and civilisation. You’re deep in — S2 E3, 67%. Care, not just fungus. Not background.",
      chips: [
        F("Does it have as much action as the game?", "The show uses fewer action encounters, with each one carrying more lasting consequences. It can spend more time on the characters without the game’s combat and healing mechanics."),
        F("Why do those creatures make clicking sounds?", "Clickers can’t see. They use the clicking sounds to sense their surroundings and track people."),
        F("Are those the game’s Clicker voices?", "Yes. Misty Lee and Phillip Kovats, who created the Clicker sounds for the game, also worked on the show’s Clicker sounds.")
      ]
    },
    opp: {
      id: "opp", title: "Oppenheimer", syn: "Biopic of the man behind the atomic bomb", kind: "Film", length: "3h 00",
      provider: "HBO Max", logo: "hbo-max-new-logo.jpg",
      poster: "https://image.tmdb.org/t/p/w500/jtTHxuJhuZpFAnCI4vGjg1LGmpY.jpg",
      seasons: ["Film"],
      about: "The man who built the bomb, and what it built in him. The physics is flavour; the film is guilt, power, and the hangover of being right. A weekend sit.",
      chips: [
        F("How much of Oppenheimer really happened?", "The major events, including Los Alamos, the Trinity test and the security hearing, are historical. Private conversations are dramatised."),
        F("Why are some scenes black and white?", "Those scenes show events from Lewis Strauss’s point of view. The colour scenes are Oppenheimer’s."),
        F("How did they film the bomb explosion?", "They used practical effects and filmed real, non-nuclear explosions. Nolan did not detonate an atomic bomb for the scene.")
      ]
    },
    barb: {
      id: "barb", title: "Barbie", syn: "Comedy, from Barbie Land to the real world", kind: "Film", length: "1h 54",
      provider: "HBO Max", logo: "hbo-max-new-logo.jpg",
      poster: "https://image.tmdb.org/t/p/w500/tnS9DqsJvFjmg4FK4R2LghvOhs5.jpg",
      seasons: ["Film"],
      about: "Pink on the outside, a gut punch about being a person. Kids can watch; the joke is for you. 1h 54, HBO Max, already in your plan — the lighter night that still lands.",
      chips: [
        F("Is it linked to Oppenheimer?", "Only by release date. Both opened on the same weekend in 2023, so people watched them as a double bill. The stories have nothing to do with each other."),
        F("Did they really build Barbie Land?", "Yes. The Dreamhouses were built as physical sets, with rooms scaled smaller than real homes to recreate the proportions of the toys."),
        F("Is Ryan Gosling really singing?", "Yes. Gosling performs “I’m Just Ken”. He also performed it at the Oscars with Mark Ronson.")
      ]
    },
    zill: {
      id: "zill", title: "Zillion", syn: "Drama about Antwerp’s nineties mega-club", kind: "Film", length: "2h 03",
      provider: "Streamz", logo: "streamz-logo.jpg",
      poster: "https://image.tmdb.org/t/p/w500/ns7LIqVWrPbO2FYPQ0ec6mfziSc.jpg",
      seasons: ["Film"],
      about: "Ghent nightlife, excess, the crash. Belgian glow without the camping. Locked on Streamz — the left turn if you wanted not-the-obvious-pick.",
      chips: [
        F("Was Zillion an actual nightclub?", "Yes. Zillion was a real nightclub in Antwerp. The film dramatises its story rather than documenting every event exactly."),
        F("Was Frank Verstraeten a real person?", "Yes. He founded the real Zillion nightclub. The film tells a dramatised version of his rise and fall."),
        F("Is that Matteo Simoni under the wig?", "Yes. Matteo Simoni plays Dennis Black Magic in Zillion.")
      ]
    },
    jan: {
      id: "jan", title: "De Bende van Jan de Lichte", syn: "Period crime series, 18th-century outlaws", kind: "Series", length: "10 ep · ~50m",
      provider: "Play", logo: "play-logo.png",
      poster: "https://image.tmdb.org/t/p/w500/py2KVZZLIa0YDCZNxhy1zdUhPDX.jpg",
      seasons: ["S1"],
      about: "The local highwaymen — Flanders, myth, crooks you can actually place. Locked on Play. Undercover and Ferry are the in-plan crime if you wanted to stay inside Netflix.",
      chips: [
        F("Was Jan de Lichte a real outlaw?", "Yes. He was an 18th-century outlaw around Aalst. The series builds a fictionalised crime story around the historical figure."),
        F("Is this the Louis Paul Boon story?", "Yes. The series is based on Boon’s novel De Bende van Jan de Lichte."),
        F("Is he a Flemish Robin Hood?", "That is how this adaptation presents him: a robber who becomes a folk hero by giving to the poor. It is a fictionalised portrayal of the historical outlaw.")
      ]
    },
    schelde: {
      id: "schelde", title: "De Slag om de Schelde", syn: "War film, the 1944 Battle of the Scheldt", kind: "Film", length: "2h 04",
      provider: "Play", logo: "play-logo.png",
      poster: "https://image.tmdb.org/t/p/w500/sCEmbkFF2Ijz35QDMFtBBTcY7Qb.jpg",
      seasons: ["Film"],
      about: "The Scheldt, the war, a story that sits closer to home than a desert. Locked on Play. 1985 if you wanted Flanders without adding an app.",
      chips: [
        F("Why was the Scheldt so important?", "Antwerp had been liberated, but German forces still blocked the approach to its port. Clearing the Scheldt let Allied supply ships reach it."),
        F("Did this battle really happen here?", "Yes. The film draws on the 1944 Battle of the Scheldt, fought around the approaches to Antwerp in Belgium and the Netherlands."),
        F("Is that Draco Malfoy?", "Yes. Tom Felton is in the cast of The Forgotten Battle, the film’s English title.")
      ]
    },
    glad: {
      id: "glad", title: "Gladiator II", syn: "Back to the arena, years after Maximus", kind: "Film", length: "2h 28",
      provider: "Apple TV", logo: "apple tv logo.jpg",
      poster: "https://image.tmdb.org/t/p/w500/gUPnmDkNRSLFynbpNw9VJrYBEgT.jpg",
      seasons: ["Film"],
      about: "Sand, steel, a fight the night has to be able to take. Locked on Apple TV. Dune if you wanted spectacle already in your plan.",
      chips: [
        F("Is Lucius the boy from the first film?", "Yes. Paul Mescal plays the grown-up Lucius, who witnessed Maximus in the arena as a boy."),
        F("Is Ridley Scott directing this one too?", "Yes. Ridley Scott directed both Gladiator films."),
        F("Is Lucilla played by the same actress?", "Yes. Connie Nielsen returns as Lucilla alongside the new cast.")
      ]
    },
    gladijs: {
      id: "gladijs", title: "Glad IJs", syn: "Flemish drama series, eight episodes", kind: "Series", length: "8 ep · ~50m",
      provider: "VTM GO", logo: "vtm-go-logo.png",
      poster: "https://image.tmdb.org/t/p/w500/5QdsbTX15dxlIsTdwD4xQVVH7W6.jpg",
      seasons: ["S1"],
      about: "Flemish tension on thin ice — local, a case, locked on VTM GO. 1985 if you wanted that feeling already in your plan.",
      chips: [
        F("Is he staging his own kidnapping?", "Yes. That is the setup: ice-cream manufacturer Phil plans his own kidnapping, but the scheme goes wrong."),
        F("Why would he kidnap himself?", "Phil discovers his wife and eldest son are selling the business behind his back. He plans to use the ransom to start over."),
        F("Is that Barbara from Kotmadam Sarafian?", "Yes. Barbara Sarafian is part of the cast of Glad IJs as well as the familiar face from Kotmadam Sarafian.")
      ]
    },
    penguin: {
      id: "penguin", title: "The Penguin", syn: "Batman spin-off, Oz’s rise in Gotham", kind: "Series", length: "S1 · ~60m",
      provider: "HBO Max", logo: "hbo-max-new-logo.jpg",
      poster: "https://image.tmdb.org/t/p/w500/vOWcqC4oDQws1doDWLO7d3dh5qc.jpg",
      seasons: ["S1"],
      about: "Gotham without the cape — a hustle, a voice, crime that wants you awake. HBO Max, already in your plan. Late and wired is the brief.",
      chips: [
        F("Is that really Colin Farrell?", "Yes. Colin Farrell plays Oz Cobb, transformed with prosthetic makeup designed by Mike Marino."),
        F("Is this the Penguin from The Batman?", "Yes. The series follows Oz, the Penguin introduced in The Batman, in his own story."),
        F("Is Sofia Falcone from the comics too?", "Yes. Sofia Falcone comes from Batman comics, although the series develops its own version of her story.")
      ]
    },
    chefbbq: {
      id: "chefbbq", title: "Chef's Table: BBQ", syn: "Food doc, one pitmaster per episode", kind: "Series", length: "Vol. 1 · ~45m",
      provider: "Netflix", logo: "Netflix logo.webp",
      poster: "https://image.tmdb.org/t/p/w500/dCOAKGHVKPgpLZNrkiqgcRxkSmZ.jpg",
      seasons: ["Vol. 1"],
      about: "The Chef’s Table formula, pointed at fire and smoke. Pretty, slow, food as scenery. Netflix, already in your plan. An episode you can actually finish.",
      chips: [
        F("Is this a barbecue competition?", "No. Each episode follows a chef and their approach to barbecue, rather than contestants competing against each other."),
        F("Is it only about American barbecue?", "No. Alongside Texas and South Carolina, the series visits Lennox Hastie in Australia and Rosalia Chay Chuc in Mexico."),
        F("Is she really still cooking at 85?", "Yes. Tootsie Tomanetz was 85 when featured, still working as a Texas pitmaster as well as a school custodian.")
      ]
    },
    abbott: {
      id: "abbott", title: "Abbott Elementary", syn: "Mockumentary sitcom at a public school", kind: "Series", length: "S4 · ~22m",
      provider: "Disney+", logo: "disney-plus-logo.png",
      poster: "https://image.tmdb.org/t/p/w500/nBe1e3JJEZ6veGrVXNF0fRoLu56.jpg",
      seasons: ["S1", "S2", "S3", "S4"],
      about: "A public school on no budget and one relentless teacher. Mockumentary like The Office, but warmer. Locked on Disney+ — 22 minutes if you add the app.",
      chips: [
        F("Is it filmed like The Office?", "Yes. It uses a mockumentary style, with the camera observing the teachers and their reactions."),
        F("Is it inspired by a real teacher?", "Yes. Quinta Brunson drew inspiration from her mother, who was a teacher."),
        F("Did Janine’s actress create the show?", "Yes. Quinta Brunson created Abbott Elementary and plays Janine Teagues.")
      ]
    },
    twaalf: {
      id: "twaalf", title: "De Twaalf", syn: "Jury drama, twelve people, one case", kind: "Series", length: "S1 · ~50m",
      provider: "Streamz", logo: "streamz-logo.jpg",
      poster: "https://image.tmdb.org/t/p/w500/8BHACZE4aelQ4vnXchd00Yof9jH.jpg",
      seasons: ["S1", "S2"],
      about: "Twelve ordinary people judge an extraordinary case. Flemish intensity — the closest neighbour if The Bear’s kitchen heat is what you wanted, with a courtroom instead of a pass.",
      chips: [
        F("Is this based on a real trial?", "No. The trial in De Twaalf is fictional."),
        F("Why do we follow the jurors home?", "Their private lives shape how they judge the accused. The series explores the people deciding the verdict as much as the case itself."),
        F("Does each season have a different trial?", "Yes. It is an anthology: a new case brings a different jury and a new cast.")
      ]
    },
    sev: {
      id: "sev", title: "Severance", syn: "Thriller, work memories cut from home ones", kind: "Series", length: "S2 · ~50m",
      provider: "Apple TV", logo: "apple tv logo.jpg",
      poster: "https://image.tmdb.org/t/p/w500/pPHpeI2X1qEd1CS1SeyrdhZ4qnT.jpg",
      seasons: ["S1", "S2"],
      about: "Employees split their memory between work and life. Season 2 pays off everything the first season set up. Unsettling rather than scary. Locked on Apple TV.",
      chips: [
        F("Is Ben Stiller behind this?", "Yes. He is a director and executive producer. Dan Erickson created the series."),
        F("What’s an “innie” and an “outie”?", "The innie is the work self; the outie is the person outside work. The severance procedure separates their memories."),
        F("Is Ricken’s book a real book?", "It began as a fictional self-help book within the show. Apple has also published an extract of The You You Are for readers.")
      ]
    },
    wicked: {
      id: "wicked", title: "Wicked", syn: "Musical, the witches of Oz before Dorothy", kind: "Film", length: "2h 40",
      provider: "Apple TV", logo: "apple tv logo.jpg",
      seasons: ["Film"],
      about: "The first half — it ends on a lift, not a bow. Songs carry the feelings. Locked on Apple TV. Barbie if you wanted colour without the belt.",
      chips: [
        F("Does this cover the whole musical?", "No. This film covers the first part. Wicked: For Good continues the story."),
        F("Are Ariana and Cynthia singing live?", "Yes. Ariana Grande and Cynthia Erivo performed live on set, rather than only miming to prerecorded vocals."),
        F("Is this before The Wizard of Oz?", "Yes. This part of the story follows Elphaba and Glinda in the years before Dorothy arrives in Oz.")
      ]
    },
    deadpool: {
      id: "deadpool", title: "Deadpool & Wolverine", syn: "Crude Marvel team-up comedy", kind: "Film", length: "2h 08",
      provider: "Apple TV", logo: "apple tv logo.jpg",
      seasons: ["Film"],
      about: "R-rated jokes, gore gags, breaking the fourth wall. Not a family film. Locked on Apple TV.",
      chips: [
        F("Are there surprise Marvel cameos?", "Yes. Some of the appearances are meant as surprises, so naming them would spoil the reveals."),
        F("Will I miss the jokes without Marvel?", "You can follow the central pairing without knowing every film, but the cameos and references reward familiarity with the earlier Marvel movies."),
        F("Is the yellow suit from the comics?", "Yes. Wolverine’s yellow-and-blue look goes back to his early comic appearances, long before Hugh Jackman played him.")
      ]
    },
    challengers: {
      id: "challengers", title: "Challengers", syn: "Tennis film about a love triangle", kind: "Film", length: "2h 11",
      provider: "Apple TV", logo: "apple tv logo.jpg",
      seasons: ["Film"],
      about: "Tennis as a three-person argument. Competitive, mean in a different way than Deadpool. Locked on Apple TV.",
      chips: [
        F("Is the tennis just a backdrop?", "The matches matter, but the rivalry and attraction between the three leads drive the story. You don’t need to follow tennis to understand those relationships."),
        F("Who made the soundtrack?", "Trent Reznor and Atticus Ross composed the score."),
        F("Did Zendaya learn to play tennis?", "Yes. She trained for the role with tennis professionals, including Melissa Nguyen.")
      ]
    },
    insideout: {
      id: "insideout", title: "Inside Out 2", syn: "Riley turns 13, Anxiety moves in", kind: "Film", length: "1h 36",
      provider: "Disney+", logo: "disney-plus-logo.png",
      seasons: ["Film"],
      about: "HQ grows up. Anxiety walks in. Kids can watch; the joke is sharper if you remember being fourteen. Locked on Disney+.",
      chips: [
        F("What new emotions are introduced?", "Anxiety, Envy, Embarrassment and Ennui join the original emotions as Riley becomes a teenager."),
        F("How is Anxiety different from Fear?", "Fear reacts to immediate, visible dangers. Anxiety thinks ahead about everything that could go wrong, especially as Riley tries to fit in."),
        F("What does Ennui mean?", "It means boredom or listlessness. In Riley’s head, Ennui embodies that teenage feeling of being unimpressed by everything.")
      ]
    },
    arcane: {
      id: "arcane", title: "Arcane", syn: "Animated series, two sisters in a split city", kind: "Series", length: "S2",
      provider: "Netflix", logo: "Netflix logo.webp",
      poster: "https://image.tmdb.org/t/p/w500/abf8tHznhSvl9BAElD2cQeRr7do.jpg",
      seasons: ["S1", "S2"],
      about: "Two sisters on opposite sides of a city tearing itself apart. Animated, not childish. Netflix, already in your plan.",
      chips: [
        F("Are these League of Legends characters?", "Yes. Arcane develops the backstories of characters from League of Legends, including Vi and Jinx."),
        F("Who made that animation?", "Fortiche, the French animation studio, made it in partnership with Riot Games."),
        F("Are Imagine Dragons actually in it?", "Yes. Animated versions of the band perform “Enemy” in an alley in Zaun. Their song is also the opening theme.")
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
    // the international reel titles carry their own facts and reviewed
    // questions, so the page uses those rather than fetching them
    for (const mod of [global.IntlTitles, global.FlemishReels]) {
      if (!mod || !item.title) continue;
      const hit = Object.values(mod.catalog).find(t => t.title === item.title);
      if (hit) return mod.reelItem(hit);
    }
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
    const intl = global.IntlTitles && global.IntlTitles.questions[title];
    if (intl && intl.length) return intl;
    const vl = global.FlemishReels && global.FlemishReels.questions[title];
    if (vl && vl.length) return vl;
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
    // reviewed questions -- the title's own, the reel bank, or the catalogue's
    // -- stand. Only a title that would otherwise get the generic three asks
    // the model for its own.
    merged._scripted = Boolean(
      (merged.qs && merged.qs.length) || reelChips(merged) || (cat.chips && cat.chips.length)
    );
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
        // a poster named in an answer swaps this page over to that title
        onOpenTitle(item) {
          if (!item || !item.title) return;
          convo.close();
          open(item);
        },
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
    // image.tmdb.org sends no CORS header, so a canvas drawn from it is tainted
    // and getImageData throws -- which is why this used to produce nothing at all
    // for anything from TMDB. Remote art goes through our own origin instead.
    const sameOrigin = u =>
      /^https?:\/\/image\.tmdb\.org\//.test(u) ? `/api/img?u=${encodeURIComponent(u)}` : u;

    const toneCache = new Map();
    function toneFrom(url, onTone) {
      if (!url) return;
      if (toneCache.has(url)) {
        const hit = toneCache.get(url);
        onTone(hit ? hit.tone : null, hit ? hit.solid : null);
        return;
      }
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
          const tone = `rgba(${r},${g},${b},.55)`, solid = `rgb(${mix(r)},${mix(g)},${mix(b)})`;
          toneCache.set(url, { tone, solid });
          onTone(tone, solid);
        } catch (_) { toneCache.set(url, null); onTone(null, null); }
      };
      img.onerror = () => { toneCache.set(url, null); onTone(null, null); };
      img.src = sameOrigin(url);
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

    function settleHero(item) {
      if (current !== item) return;
      const heroEl = scroll.querySelector("[data-tpage-hero]");
      if (!heroEl) return;
      if (!item._heroArt) return;                      // no art decoded yet
      if (!item._tone && !item._toneDone) return;      // colour still coming
      if (item._tone) {
        heroEl.style.setProperty("--tone", item._tone.tone);
        heroEl.style.setProperty("--tone-solid", item._tone.solid);
      }
      heroEl.style.backgroundImage = `url('${item._heroArt}')`;
      heroEl.classList.add("has-art");
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
      // A title with no reviewed bank gets its three from the model. Until they
      // land the rail used to show the generic trio -- the same three questions
      // on every title, with the name slotted in -- which reads like the real
      // thing and is the first thing anyone sees on an Oscars title. It waits
      // on a skeleton now. chipsOf's trio is still there if the call comes back
      // with nothing, so the rail is never permanently empty.
      const qWait = !item._scripted && !item._qdone;
      // Only a real backdrop goes behind the hero. The poster used to stand in
      // until TMDB answered, which meant the entire background swapped mid-read.
      // Until then the gradient carries it -- and it is tinted from the poster,
      // so the colour is already right when the art arrives.
      // The title's own art wins over TMDB's. A still that ships with the title
      // was picked for it; TMDB's backdrop is the fallback for titles that have
      // none, and it is sometimes just the poster's key art again -- Wednesday
      // ships a shot from the dance and TMDB answers with the umbrella artwork
      // the poster already shows, so the hero ended up holding the poster twice.
      // Preferring the local art also means the hero settles once rather than
      // being replaced a second later.
      const hero = [item.backdrop, item.still, ex && ex.backdrop]
        .find(u => u && !(item._heroBad && item._heroBad[u])) || "";
      const poster = item.poster || (ex && ex.poster) || hero;

      // render() runs again on every streamed phase, and it rebuilds the hero
      // from scratch each time. Anything the hero has already settled -- its
      // tone, its decoded art -- is written straight back into the markup, or
      // the page drops to the generic wash and climbs back out once per phase,
      // which is most of what read as lag.
      const tone = item._tone;
      // whatever art the hero has already decoded stays up, even when a better
      // one is on its way: dropping back to the wash while TMDB's backdrop
      // decodes would put the flash back in, one upgrade later
      const settled = item._heroArt || "";
      const heroStyle = [
        tone ? `--tone:${tone.tone};--tone-solid:${tone.solid}` : "",
        settled ? `background-image:url('${settled}')` : ""
      ].filter(Boolean).join(";");

      scroll.innerHTML = `
        <div class="tpage-hero${settled ? " has-art" : ""}" data-tpage-hero${heroStyle ? ` style="${heroStyle}"` : ""}>
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
                ${qWait
                  ? `<span class="tpage-sk qpill w60"></span><span class="tpage-sk qpill w40"></span>`
                  : chips.map((c, i) => `<button class="qcard-q${i === 0 ? " is-on" : ""}" type="button" data-tpage-ask="${esc(c.id)}" data-mesh="m${i % 3}" data-q="${esc(c.q)}"><span class="q-copy">${esc(c.q)}</span></button>`).join("")}
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
      const posterImg = scroll.querySelector(".tpage-poster img");
      if (posterImg) {
        // a cached file reports complete synchronously, so the class lands in
        // this same frame and the viewer never sees the tint underneath
        if (posterImg.complete && posterImg.naturalWidth) posterImg.classList.add("is-in");
        else posterImg.addEventListener("load", () => posterImg.classList.add("is-in"), { once: true });
      }

      const heroEl = scroll.querySelector("[data-tpage-hero]");
      if (heroEl) {
        // The hero changes once, not three times. The art and the colour it is
        // graded with arrive together in a single write, so the page goes from
        // tinted wash to finished backdrop in one cross-fade instead of
        // stepping through "bright art, no gradient" on the way.
        const land = () => settleHero(item);

        // tint from the poster, which is on screen first, so the gradient is the
        // title's own colour rather than a generic wash. Computed once per
        // title and kept on the item -- a re-render reuses it.
        if (!item._tone && !item._toneDone) {
          // the read can fail quietly (a blocked canvas, a dead URL), so it is
          // also given a deadline: art must not wait on a colour that is never
          // going to arrive
          const settleTone = (tone, solid) => {
            if (item._tone) return;                    // already coloured
            item._toneDone = true;                     // stop art waiting on it
            if (tone) item._tone = { tone, solid };
            if (current !== item) return;
            const live = scroll.querySelector("[data-tpage-hero]");
            if (tone && live) {
              live.style.setProperty("--tone", tone);
              live.style.setProperty("--tone-solid", solid);
            }
            settleHero(item);
          };
          setTimeout(() => settleTone(null, null), 250);
          toneFrom(item.poster || hero, settleTone);
        }

        if (hero && item._heroArt !== hero) {
          // decode first, then fade in: setting background-image directly makes
          // the hero pop in a frame late, which reads as a flicker
          const pre = new Image();
          pre.onload = () => {
            // A title with no backdrop of its own falls back to a still, and for
            // a good few of those the "still" is the poster under another name.
            // Portrait art stretched behind a landscape hero reads as a bug on
            // its own, and worse once TMDB answers and the whole background
            // swaps underneath the reader. Only landscape art earns the
            // background; everything else keeps the tinted gradient until the
            // real backdrop arrives, which is what a collection title does.
            if (pre.naturalWidth <= pre.naturalHeight) {
              // remember the reject so the next render reaches past it rather
              // than offering the same portrait art again
              (item._heroBad = item._heroBad || {})[hero] = true;
              if (current === item) render();
              return;
            }
            item._heroArt = hero;
            land();
          };
          pre.src = hero;
        }
        // both halves can already be in hand on a re-render, or when the title
        // was warmed before it was opened
        settleHero(item);
      }
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
        questions: !item._scripted,      // don't pay for what the page already has
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
      if (item._scripted) return false;
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

    // Warming the titles the app already ships.
    //
    // Opening a detail page costs two round trips in sequence: the facts call,
    // and then the artwork whose URL only that call can tell us. Doing both
    // ahead of time is what turns the open from "watch it assemble" into
    // "it is already there".
    //
    // Only in-app titles can be warmed. A title that comes back from a chat
    // answer is not known until the model names it, so it keeps paying both
    // trips -- there is nothing to do about that.
    //
    // It runs three at a time and hands the thread back between each, because
    // the feed is playing video while this happens and the warming must never
    // be what makes the reel stutter. bodyFor already asks for no generated
    // questions on a scripted title, so this is TMDB only -- no model calls.
    const warmed = new Set();
    const waiting = [];
    let running = 0;
    // reported so the shell can hold a splash until the app is warm; total grows
    // as later batches are queued, which the bar accounts for
    let warmDone = 0, warmTotal = 0;
    const tellWarm = () => {
      if (typeof opts.onWarm === "function") opts.onWarm(warmDone, warmTotal);
    };
    const idle = fn => (window.requestIdleCallback || (f => setTimeout(f, 80)))(fn, { timeout: 2000 });

    function preloadArt(item, store) {
      const facts = (store && store.facts) || {};
      const urls = [facts.backdrop, item.poster || facts.poster].filter(Boolean);
      // the gradient's colour is read off the poster, and that read is its own
      // round trip through /api/img -- warm it here or it is the last thing the
      // open still waits for
      toneFrom(item.poster || facts.poster || facts.backdrop, () => {});
      return Promise.all(urls.map(u => new Promise(done => {
        const img = new Image();
        img.onload = img.onerror = done;
        img.src = u;
      })));
    }

    // Six at a time, and the next job starts as soon as one finishes rather than
    // waiting for an idle slot. The work is network-bound -- it is waiting on
    // TMDB and on images, not using the main thread -- and an idle callback
    // between every job is throttled to a crawl in a backgrounded tab, which is
    // exactly when a user test is loading. The initial kick is still idle-timed
    // so the first paint is never what pays for this.
    function pump() {
      while (running < 6 && waiting.length) {
        const job = waiting.shift();
        running++;
        job().catch(() => {}).then(() => {
          running--; warmDone++; tellWarm();
          pump();
        });
      }
    }

    function warm(raw, { first = false } = {}) {
      // the sponsored slide has a title but no detail page behind it, so there
      // is nothing to look up and nothing to preload
      if (!raw || raw.ad) return;
      const item = raw._scripted !== undefined ? raw : enrich(raw);
      if (!item || !item.title) return;
      const key = `${item.title}|${item.year || ""}`;
      if (warmed.has(key)) return;
      warmed.add(key);
      const job = () => {
        if (seen.has(key)) return preloadArt(item, seen.get(key));
        const rec = pending.get(key) || startLoad(key, bodyFor(item));
        return rec.promise.then(store => preloadArt(item, store));
      };
      warmTotal++; tellWarm();
      // the slide being looked at goes to the head of the queue
      if (first) waiting.unshift(job); else waiting.push(job);
      idle(pump);
    }

    // Flies a copy of the tapped poster to the hero, so the overlay explains
    // where it came from. Purely additive: no source element, no art, or reduced
    // motion and the page just does its normal slide.
    let flight = null;
    function flyFrom(srcEl, posterUrl) {
      if (!srcEl || reduceMotion) return;
      if (flight) flight.done();            // a second open mid-flight cancels the first
      // prefer the artwork already on screen: a title opened from a collection has
      // no resolved poster until TMDB answers, but the card is showing one
      const srcImg = srcEl.matches("img") ? srcEl : srcEl.querySelector("img");
      // measure the art, not the card. A card's box includes its title, so
      // measuring it started the clone at the wrong ratio and squashed it in.
      const from = (srcImg || srcEl).getBoundingClientRect();
      if (!from.width || !from.height) return;
      const art = (srcImg && srcImg.currentSrc) || (srcImg && srcImg.src) || posterUrl;
      if (!art) return;
      const target = root.querySelector(".tpage-poster");
      if (!target) return;

      // The page has just been given .is-on, so its slide-up is mid-flight and a
      // rect would read the off-screen start position. offsetLeft/Top walk the
      // layout instead, which is where the poster will actually be -- and unlike
      // a rect they ignore the tilt rotation on .tpage-poster.
      let ox = 0, oy = 0;
      for (let n = target; n && n !== phone; n = n.offsetParent) {
        ox += n.offsetLeft - (n.offsetParent ? n.offsetParent.scrollLeft : 0);
        oy += n.offsetTop - (n.offsetParent ? n.offsetParent.scrollTop : 0);
      }
      const tw = target.offsetWidth, th = target.offsetHeight;
      if (!tw || !th) return;
      const host = phone.getBoundingClientRect();

      const fly = document.createElement("div");
      fly.className = "tpage-fly";
      fly.style.left = `${from.left - host.left}px`;
      fly.style.top = `${from.top - host.top}px`;
      fly.style.width = `${from.width}px`;
      fly.style.height = `${from.height}px`;
      fly.innerHTML = `<img src="${esc(art)}" alt="">`;
      root.appendChild(fly);                // inside .tpage, so closing takes it along
      root.classList.add("is-flying");

      // translate and scale rather than animating left/top/width/height, so the
      // whole flight stays on the compositor
      const dx = ox - (from.left - host.left);
      const dy = oy - (from.top - host.top);
      const sx = tw / from.width;
      const sy = th / from.height;

      let settled = false, timer = 0;
      const done = () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        fly.remove();
        root.classList.remove("is-flying");
        if (flight && flight.el === fly) flight = null;
      };
      flight = { el: fly, done };

      // Two style states separated by a forced reflow, rather than a rAF: a
      // backgrounded or occluded tab never runs rAF, and the clone would hang at
      // its start position until the fallback timer swept it up.
      fly.style.transformOrigin = "top left";
      fly.style.transform = "translate(0px, 0px) scale(1, 1)";
      fly.style.borderRadius = "14px";
      fly.getBoundingClientRect();          // commits the start value
      fly.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
      // A transform scales the corners with the box, so a clone that grows by
      // sx lands on a corner sx times too round and then snaps to the real
      // poster's 14px the instant it is swapped. Counter-scaling the radius as
      // it travels keeps the rendered corner at 14px the whole way.
      fly.style.borderRadius = `${(14 / sx).toFixed(2)}px / ${(14 / sy).toFixed(2)}px`;
      // transform and opacity finish together, so listen for the transform one
      // specifically rather than whichever fires first
      fly.addEventListener("transitionend", e => {
        if (e.propertyName === "transform") done();
      });
      timer = setTimeout(done, 600);
    }

    function open(raw, startId, srcEl) {
      const item = enrich(raw);
      if (!item || !item.title) return;
      current = item;
      if (convo) {
        convo.setBank(bankOf(item));
        convo.setStarters(() => bankOf(item));
      }
      item._loading = true;
      // a scripted rail is already the final rail, so the lanes need not wait
      item._qdone = Boolean(item._scripted);
      render();
      hydrate(item);
      root.classList.add("is-on");
      phone.classList.add("is-title");
      scroll.scrollTop = 0;
      flyFrom(srcEl, item.poster);
      if (typeof opts.onOpen === "function") opts.onOpen(item);
      if (startId && convo) convo.open(startId);
    }

    function close() {
      if (flight) flight.done();
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

    return { open, close, isOpen: () => root.classList.contains("is-on"), enrich, listed, prefetch, warm };
  }

  global.GummyTitle = { create, enrich, catalog, listed, toggleList, lookup };
})(window);
