// The international reel titles: posters and 30s clips supplied by the client,
// facts checked against TMDB (kind, seasons, runtime, and Belgian availability
// as of September 2026). Questions and answers are written to the same brief as
// the reviewed set — the viewer's voice, plain answers, and always the three
// facts that make an answer useful here: what it is, where it plays, and
// whether it is already in the plan.
//
// Four titles are not on a Belgian streamer yet (The Odyssey, Spider-Man:
// Brand New Day, Resident Evil, Minimum Security). They are placed on the
// studio's likely service so the reel reads normally — a prototype choice, not
// a checked fact.
(function (global) {
  const F = (q, a, follow) => ({ q, a, follow: follow || [] });

  const P = {
    netflix: { provider: "Netflix", logo: "Netflix logo.webp" },
    disney:  { provider: "Disney+", logo: "disney-plus-logo.png" },
    hbo:     { provider: "HBO Max", logo: "hbo-max-new-logo.jpg" },
    apple:   { provider: "Apple TV", logo: "apple tv logo.jpg" },
    prime:   { provider: "Prime Video", logo: "prime-video-logo.svg" },
    streamz: { provider: "Streamz", logo: "streamz-logo.jpg" }
  };

  // Every title ships a poster. All but one ship a 30s clip -- Minimum Security
  // came without one, so it is a poster title and the reel skips it.
  const NO_CLIP = ["minimum-security"];
  const art = slug => ({
    poster: `posters/intl/${slug}.jpg`,
    clip: NO_CLIP.includes(slug) ? null : `intl-${slug}.webm`
  });

  const catalog = {
    lizzie: {
      id: "lizzie", title: "Monster: The Lizzie Borden Story",
      syn: "True crime drama, the 1892 Borden murders", kind: "Series", length: "8 ep", ...P.netflix, ...art("monster-lizzie-borden"),
      about: "The fourth Monster, and this time the case is the 1892 axe murders in Fall River. Ella Beatty plays Lizzie, with Sarah Paulson and Vicky Krieps around her. Eight episodes on Netflix, already in your plan.",
      chips: [
        F("How gruesome does it get?", "Gruesome in a few moments. The murders are shown, but most of the eight episodes focus on the household and the trial.", [
          { id: "liz-vs", q: "Will it keep me up at night?", a: "The atmosphere might, more than the gore. It’s a slow, cold kind of dread." },
          { id: "liz-sleep", q: "Is it okay for teenagers?", a: "Older teens at most. The murders are shown on screen." }
        ]),
        F("Do I need the other Monster seasons?", "No. Each season tells a different true case with a new cast.", [
          { id: "liz-order", q: "Which season came first?", a: "The Jeffrey Dahmer story. The seasons are separate, so the order doesn’t matter." },
          { id: "liz-anthology", q: "Who makes it?", a: "Ryan Murphy and Ian Brennan. All seasons are on Netflix." }
        ]),
        F("Is it a true story?", "Yes. Lizzie Borden was accused of killing her father and stepmother in 1892 and acquitted in 1893. Nobody else was ever charged. The series fills in what the record leaves out.", [
          { id: "liz-verdict", q: "Did she do it?", a: "The court said no. The series takes a position, so we’ll leave that to the episodes." },
          { id: "liz-rhyme", q: "Where does the ‘forty whacks’ rhyme come from?", a: "It appeared after the trial and got the number wrong. It stuck anyway." }
        ])
      ]
    },

    stranger: {
      id: "stranger", title: "Not a Stranger",
      syn: "Turkish thriller, a nanny with secrets", kind: "Series", length: "8 ep", ...P.netflix, ...art("not-a-stranger"),
      about: "A Turkish psychological thriller. A painter goes back to work, hires the nanny she has been looking for, and the house slowly stops being hers. Eight episodes on Netflix, already in your plan.",
      chips: [
        F("How many episodes are there?", "Eight, with one storyline. It’s on Netflix, included in your plan.", [
          { id: "str-binge", q: "Can I finish it in a weekend?", a: "Yes, easily." },
          { id: "str-scary", q: "Does it start slow?", a: "No. The nanny is unsettling from the first episode." }
        ]),
        F("Is it in Turkish?", "Yes. Netflix has subtitles and a dub.", [
          { id: "str-dub", q: "Is the dub any good?", a: "It’s fine if you’re half-watching. A lot of the show is in faces and pauses, so the original audio works better." },
          { id: "str-turkish", q: "Any other Turkish thrillers?", a: "Netflix has a lot of Turkish drama. Ask and I’ll find a few in the same tone." }
        ]),
        F("Is it scary or just tense?", "Tense. There’s no horror, just a stranger in the house and a marriage with secrets.", [
          { id: "str-kids", q: "Is it okay for teenagers?", a: "From about 15. There’s no gore, but the themes are adult." },
          { id: "str-half", q: "Can I follow it while doing something else?", a: "Early on, mostly. The later episodes need your attention." }
        ])
      ]
    },

    gentlemen: {
      id: "gentlemen", title: "The Gentlemen",
      syn: "Inherited estate, inherited weed farm", kind: "Series", length: "2 seasons", ...P.netflix, ...art("the-gentlemen"),
      about: "Guy Ritchie's series spin on his own film. Eddie inherits a duke's estate and the enormous cannabis operation underneath it, and cannot get rid of either. Two seasons on Netflix, already in your plan.",
      chips: [
        F("Do I need to see the film first?", "No. Same world and director, different characters. The series is on Netflix, in your plan.", [
          { id: "gen-film", q: "Is it very Guy Ritchie?", a: "Yes. Fast dialogue, criminals with manners, and sudden violence." },
          { id: "gen-ritchie", q: "Who’s in it?", a: "Theo James and Kaya Scodelario." }
        ]),
        F("How violent is it?", "Short bursts, often played for laughs. Less bloody than most crime drama.", [
          { id: "gen-room", q: "Can I watch it with people around?", a: "Yes. The plot is easy to follow." },
          { id: "gen-funny", q: "Is it a comedy?", a: "A crime show with a lot of jokes. Theo James plays it straight while everything around him is absurd." }
        ]),
        F("How many seasons are there?", "Two, each with eight episodes of about fifty minutes.", [
          { id: "gen-two", q: "Is season two the same cast?", a: "Yes. Same cast and tone, with a bigger scheme." },
          { id: "gen-night", q: "Does each episode stand alone?", a: "Partly. Each one has its own scheme inside the bigger story." }
        ])
      ]
    },

    lanterns: {
      id: "lanterns", title: "Lanterns",
      syn: "Green Lantern cops on a murder case", kind: "Series", length: "8 ep", ...P.hbo, ...art("lanterns"),
      about: "Two Green Lanterns, a rookie and a legend, investigating a murder in the American heartland. Damon Lindelof behind it, Aaron Pierre and Kyle Chandler in front. Eight episodes on HBO Max, which is not in your plan.",
      chips: [
        F("Do I need to know the comics?", "No. It’s a crime story with space cops, and it explains its own rules.", [
          { id: "lan-dc", q: "Does it connect to Superman?", a: "It’s set in the same new DC world, but it works on its own." },
          { id: "lan-add", q: "Where can I watch it?", a: "On HBO Max, which you don’t have yet. Basic with Ads is €6,99 a month." }
        ]),
        F("Is it a superhero action show?", "Not really. It’s a slow murder mystery in small-town America, with more conversation than fighting.", [
          { id: "lan-true", q: "Is it like True Detective?", a: "That’s the comparison people make: two mismatched investigators and one dark case." },
          { id: "lan-pace", q: "Is there any action?", a: "Some, but not much. Superman is the louder option." }
        ]),
        F("Is it a complete story?", "Yes. The case opens and closes over eight episodes of about an hour.", [
          { id: "lan-month", q: "Will there be a second season?", a: "It’s set up to continue, but this season closes its own case." },
          { id: "lan-more", q: "Who’s in it?", a: "Kyle Chandler and Aaron Pierre play the two Lanterns. Damon Lindelof is one of the makers." }
        ])
      ]
    },

    neagley: {
      id: "neagley", title: "Neagley",
      syn: "Reacher spin-off, Neagley on her own case", kind: "Series", length: "8 ep", ...P.prime, ...art("neagley"),
      about: "The Reacher spin-off. Frances Neagley, ex-110th and now a private investigator in Chicago, goes after the suspicious death of an old friend. Eight episodes on Prime Video, which is not in your plan.",
      chips: [
        F("Do I need to have watched Reacher?", "No, but it helps, because Neagley is introduced there. Both are on Prime Video, which you don’t have yet. It’s €5,99 a month.", [
          { id: "nea-order", q: "Who plays Neagley?", a: "Maria Sten, the same actor as in Reacher." },
          { id: "nea-cheap", q: "How many seasons of Reacher are there?", a: "Four. One Prime Video subscription covers both shows." }
        ]),
        F("Is it like Reacher?", "Same world, smaller scale. Neagley investigates more and fights less, so it’s closer to a detective show.", [
          { id: "nea-fights", q: "Are there still fights?", a: "Yes, but fewer, and less one-sided." },
          { id: "nea-sten", q: "How many episodes are there?", a: "Eight, with one case running through them.", who: "Maria Sten" }
        ]),
        F("Does it end on a cliffhanger?", "No. The case is solved by the end of the season, with room left for more.", [
          { id: "nea-first", q: "Does it start quickly?", a: "Yes. Her friend dies in episode one and she’s on the case straight away." },
          { id: "nea-end", q: "How violent is it?", a: "People get hurt, but it’s less brutal than Reacher." }
        ])
      ]
    },

    reacher: {
      id: "reacher", title: "Reacher",
      syn: "Action series, one case per season", kind: "Series", length: "4 seasons", ...P.prime, ...art("reacher"),
      about: "Jack Reacher drifts into a town, finds something rotten, and takes it apart. Four seasons and no homework needed. On Prime Video, which is not in your plan, at EUR 5,99 a month.",
      chips: [
        F("Where can I watch it?", "On Prime Video, which you don’t have yet. It’s €5,99 a month and also has the spin-off Neagley.", [
          { id: "rea-skip", q: "How long are the episodes?", a: "About fifty minutes, eight per season." },
          { id: "rea-books", q: "Who plays Reacher?", a: "Alan Ritchson." }
        ]),
        F("Is it just fighting?", "It’s a mystery with fights in it. Reacher works out what happened, then the last episodes settle it. The violence is heavy but brief.", [
          { id: "rea-gore", q: "How graphic is the violence?", a: "Blunt rather than bloody. Broken bones, not long gore scenes." },
          { id: "rea-room", q: "Is it fun to watch with friends?", a: "Yes. The plots are clear and easy to follow, even with people talking." }
        ]),
        F("Where do I start with four seasons?", "Season one. Each season adapts one book and stands alone, but the first is the easiest start.", [
          { id: "rea-alt", q: "Can I skip to a later season?", a: "Yes. Each season is its own case." },
          { id: "rea-month", q: "Do I need to read the books?", a: "No. The show explains everything." }
        ])
      ]
    },

    lasso: {
      id: "lasso", title: "Ted Lasso",
      syn: "Comedy, an American coaching English football", kind: "Series", length: "4 seasons", ...P.apple, ...art("ted-lasso"),
      about: "An American football coach is hired to manage an English club he knows nothing about, and refuses to be cynical about any of it. Four seasons on Apple TV, which is not in your plan, at EUR 9,99 a month.",
      chips: [
        F("Do I need to like football?", "No. Football is the setting. The show is about the people at the club. It’s on Apple TV, which you don’t have yet.", [
          { id: "las-rules", q: "Do I need to know the rules?", a: "No. Ted doesn’t know them either, which is the joke in season one." },
          { id: "las-club", q: "Is AFC Richmond a real club?", a: "No, it’s made up. The Premier League around it is real." }
        ]),
        F("Is it a feel-good show?", "Mostly. The comedy comes from kindness in a cynical place. The later seasons get sadder.", [
          { id: "las-sad", q: "Does it get heavy?", a: "Season two deals with grief and anxiety. Still funny, but less light than season one." },
          { id: "las-bad", q: "Who plays Ted?", a: "Jason Sudeikis, who also co-created the show." }
        ]),
        F("How long is an episode?", "About half an hour at first, closer to 45 minutes later on.", [
          { id: "las-one", q: "How many seasons are there?", a: "Three so far, and a fourth has been announced." },
          { id: "las-apple", q: "What else is on Apple TV?", a: "Severance, Slow Horses, Mayday and Gladiator II from your list." }
        ])
      ]
    },

    slowhorses: {
      id: "slowhorses", title: "Slow Horses",
      syn: "Spy series about MI5’s rejects", kind: "Series", length: "6 seasons", ...P.apple, ...art("slow-horses"),
      about: "The spies MI5 could not fire are parked in a dead-end office under Jackson Lamb, who is vile and the best of them. Gary Oldman in the part. Six seasons on Apple TV, which is not in your plan.",
      chips: [
        F("How dark does it get?", "Bleak about the institutions, warm about the people. Characters you like do die.", [
          { id: "slo-oldman", q: "Can I watch it with others?", a: "Yes, if they follow the plot. The dialogue is quick.", who: "Gary Oldman" },
          { id: "slo-bond", q: "Something lighter in my plan?", a: "The Gentlemen on Netflix: crime with jokes, already in your plan." }
        ]),
        F("Where do I start with six seasons?", "Season one. Each season is six episodes and adapts one book. It’s on Apple TV, which you don’t have yet.", [
          { id: "slo-len", q: "How long is a season?", a: "Six episodes of about 45 minutes, so around four and a half hours." },
          { id: "slo-order", q: "Do the seasons connect?", a: "Each case closes, but the characters carry on. Watch them in order." }
        ]),
        F("Is it a serious spy show or a funny one?", "Both. The jokes are constant and the deaths are real.", [
          { id: "slo-room", q: "Who’s in it?", a: "Gary Oldman as Jackson Lamb, with Jack Lowden and Kristin Scott Thomas." },
          { id: "slo-swap", q: "Is it like Bond?", a: "No. Bad coffee, worse offices and a lot of paperwork. It’s closer to le Carré, with jokes." }
        ])
      ]
    },

    minsec: {
      id: "minsec", title: "Minimum Security",
      syn: "French sitcom set in a prison", kind: "Series", length: "8 ep", ...P.streamz, ...art("minimum-security"),
      about: "A French workplace comedy set inside Chénoise prison, where the staff are more trouble than the inmates. Audrey Lamy and Jean-Pascal Zadi lead it. Eight episodes on Streamz, which is not in your plan, at EUR 9,99 a month for Basic.",
      chips: [
        F("Is it a comedy or a prison drama?", "A comedy. The jokes are about the staff, not the prisoners.", [
          { id: "min-dark", q: "Does it get dark?", a: "No, it stays light the whole way through." },
          { id: "min-office", q: "Is it like a workplace sitcom?", a: "Yes. A manager tries to hold together a team that shouldn’t be working together." }
        ]),
        F("Is it in French?", "Yes, with subtitles. The humour is in the dialogue, so subtitles work better than a dub.", [
          { id: "min-sub", q: "Are the subtitles fast?", a: "Fairly fast, since it’s a dialogue comedy." },
          { id: "min-belg", q: "Anything Belgian like it?", a: "Zeg Eens Euh on Play, though it’s a game show rather than a sitcom." }
        ]),
        F("Where can I watch it?", "On Streamz, which you don’t have yet. Streamz Basic is €9,99 a month.", [
          { id: "min-combo", q: "What else is on Streamz?", a: "Zillion, De Twaalf and other Belgian series. With Telenet’s 5% combination discount, Basic costs €9,49." },
          { id: "min-short", q: "How long are the episodes?", a: "About half an hour. There are eight." }
        ])
      ]
    },

    superman: {
      id: "superman", title: "Superman",
      syn: "DC reboot, a hopeful Superman", kind: "Film", length: "2h 10", ...P.netflix, ...art("superman"),
      about: "James Gunn's reset. Clark Kent reporting in Metropolis, trying to square Krypton with Kansas, with Nicholas Hoult's Lex Luthor against him. 2h 10 on Netflix, already in your plan.",
      chips: [
        F("Do I need to have seen the old ones?", "No. This starts the story over and only assumes you know who Superman is. It’s on Netflix, in your plan.", [
          { id: "sup-dc", q: "Is it connected to other DC films?", a: "It starts a new run. Supergirl follows from it, and Lanterns is set in the same world." },
          { id: "sup-snyder", q: "Is it like the Zack Snyder films?", a: "No. It’s brighter and funnier." }
        ]),
        F("Who plays Superman?", "David Corenswet, with Rachel Brosnahan as Lois Lane and Nicholas Hoult as Lex Luthor.", [
          { id: "sup-split", q: "Who directed it?", a: "James Gunn, who also made Guardians of the Galaxy." },
          { id: "sup-dog", q: "Is it loud?", a: "The fights are. Check the volume if people are sleeping." }
        ]),
        F("Is it good with kids?", "Yes, from about eight. Comic-book fights and nothing nasty. At 2h 10, it’s long for little ones.", [
          { id: "sup-loud", q: "Can we split it over two nights?", a: "Yes. There’s a break about halfway." },
          { id: "sup-next", q: "Is there a dog in it?", a: "Yes, Krypto the superdog." }
        ])
      ]
    },

    bestofbest: {
      id: "bestofbest", title: "Best of the Best",
      syn: "Bollywood-fusion dance, college stakes", kind: "Film", length: "1h 52", ...P.netflix, ...art("best-of-the-best"),
      about: "Two childhood friends join UCLA's Bollywood-fusion dance team and find the road to nationals rougher than expected. Maitreyi Ramakrishnan leads. 1h 52 on Netflix, already in your plan.",
      chips: [
        F("Is it okay for younger kids?", "From about ten. There’s some college language and romance, nothing more.", [
          { id: "bob-dance", q: "How long is it?", a: "1h 52, on Netflix, already in your plan." },
          { id: "bob-music", q: "Is it in English?", a: "Yes. The soundtrack mixes Hindi tracks with western pop." }
        ]),
        F("What’s it about?", "A comedy about two friends who fall out, set around a US college Bollywood-fusion dance competition.", [
          { id: "bob-room", q: "Is there a lot of dancing?", a: "Yes. The routines are the big set pieces, danced to Hindi tracks mixed with western pop." },
          { id: "bob-kids", q: "Does it work with a group?", a: "Yes. It’s a broad comedy and easy to follow, even with people talking." }
        ]),
        F("Who’s in it?", "Maitreyi Ramakrishnan plays the lead.", [
          { id: "bob-lead", q: "Where do I know her from?", a: "Never Have I Ever, the Netflix series that made her known. She also voiced Mei in Turning Red.", who: "Maitreyi Ramakrishnan" },
          { id: "bob-real", q: "Are these competitions real?", a: "Yes. Bollywood-fusion dance is a real US college circuit with national championships. The film exaggerates the stakes." }
        ])
      ]
    },

    whisper: {
      id: "whisper", title: "The Whisper Man",
      syn: "A missing boy, a retired detective", kind: "Film", length: "1h 51", ...P.netflix, ...art("the-whisper-man"),
      about: "A widower's son vanishes, and the only person who can help is his estranged father, the detective who caught the serial killer the case now points back at. Robert De Niro and Michelle Monaghan. 1h 51 on Netflix, already in your plan.",
      chips: [
        F("How dark does it get?", "Dark. It’s about a missing child and a serial killer. Very little is shown, but the subject weighs on the whole film.", [
          { id: "whi-kids", q: "Is anything shown on screen?", a: "Almost nothing explicit. The dread does the work." },
          { id: "whi-sleep", q: "Will it keep me up at night?", a: "It might. It’s a quiet, creeping kind of scary." }
        ]),
        F("Who’s in it?", "Robert De Niro and Adam Scott as father and son, with Michelle Monaghan as the detective.", [
          { id: "whi-deniro", q: "Who does De Niro play?", a: "A retired detective, and the father of Adam Scott’s character.", who: "Robert De Niro" },
          { id: "whi-scott", q: "Is Adam Scott in a serious role?", a: "Yes, a dramatic one." }
        ]),
        F("Is it based on a book?", "Yes, Alex North’s novel of the same name.", [
          { id: "whi-end", q: "Does it have a clear ending?", a: "Yes. It wraps up within the film." },
          { id: "whi-like", q: "How long is it?", a: "1h 51, on Netflix, in your plan." }
        ])
      ]
    },

    supergirl: {
      id: "supergirl", title: "Supergirl",
      syn: "DC film, Superman’s cousin on her own", kind: "Film", length: "1h 48", ...P.hbo, ...art("supergirl"),
      about: "Kara Zor-El remembers Krypton, which Clark never did, and that makes her a harder character. Milly Alcock in the part, with Jason Momoa alongside. 1h 48 on HBO Max, which is not in your plan.",
      chips: [
        F("Do I need to see Superman first?", "It helps but isn’t needed. They share a world, but this is her story. Superman is on Netflix, in your plan.", [
          { id: "sgl-order", q: "Which should I watch first?", a: "Superman, then Supergirl." },
          { id: "sgl-both", q: "Where can I watch it?", a: "On HBO Max, which you don’t have yet. It’s €6,99 a month and also has Dune: Part Two, The Last of Us and Barbie from your list." }
        ]),
        F("How long is it?", "1h 48.", [
          { id: "sgl-kids", q: "Should I use headphones?", a: "If you can. A lot of the spectacle is in the sound." },
          { id: "sgl-alcock", q: "Is it based on a comic?", a: "Yes, Supergirl: Woman of Tomorrow by Tom King.", who: "Milly Alcock" }
        ]),
        F("Is it as light as Superman?", "No. Kara survived Krypton and remembers it, so the film is angrier. It’s still a big adventure.", [
          { id: "sgl-sound", q: "Is it okay for kids?", a: "From about twelve. The fights are comic-book, but the grief is real." },
          { id: "sgl-wait", q: "Who plays Supergirl?", a: "Milly Alcock, known from House of the Dragon." }
        ])
      ]
    },

    mandalorian: {
      id: "mandalorian", title: "The Mandalorian and Grogu",
      syn: "Star Wars film, Mando and Grogu", kind: "Film", length: "2h 12", ...P.disney, ...art("mandalorian-and-grogu"),
      about: "Din Djarin and Grogu on a proper film budget, in a galaxy where the Empire has fallen and the warlords have not. Jon Favreau directing. 2h 12 on Disney+, already in your plan.",
      chips: [
        F("Do I need to have watched the series?", "It helps, but the film works as a way in. It explains who the man in the helmet is and why he’s raising Grogu.", [
          { id: "man-series", q: "How many seasons does the series have?", a: "Three, all on Disney+." },
          { id: "man-star", q: "Do I need the Star Wars films?", a: "No. It’s set after the original trilogy, and knowing the Empire lost is enough." }
        ]),
        F("Is it good with kids?", "Yes. The violence is blasters and armour, nothing nasty.", [
          { id: "man-age", q: "How young is too young?", a: "Six and up usually manages it. There are tense moments and a lot of shooting." },
          { id: "man-split", q: "Can we watch it over two nights?", a: "Yes. There’s a clean break about halfway." }
        ]),
        F("Is it a proper film or a long episode?", "A proper film, with one story and an ending. Jon Favreau directed it.", [
          { id: "man-pascal", q: "Who’s in it?", a: "Pedro Pascal, with Sigourney Weaver and Jeremy Allen White.", who: "Pedro Pascal" },
          { id: "man-next", q: "How long is it?", a: "2h 12, on Disney+, in your plan." }
        ])
      ]
    },

    prada: {
      id: "prada", title: "The Devil Wears Prada 2",
      syn: "Sequel, back at Runway twenty years on", kind: "Film", length: "1h 59", ...P.disney, ...art("devil-wears-prada-2"),
      about: "Andy comes back to Runway, Miranda is fighting for the magazine's survival, and Emily now runs the luxury brand holding the money. Streep, Hathaway, Blunt and Tucci all back. 1h 59 on Disney+, already in your plan.",
      chips: [
        F("Do I need to rewatch the first one?", "No. It reintroduces everyone in the first twenty minutes, though a rewatch makes the reunions land harder. It’s on Disney+, in your plan.", [
          { id: "pra-first", q: "Is the original cast back?", a: "Yes: Meryl Streep, Anne Hathaway, Emily Blunt and Stanley Tucci." },
          { id: "pra-cast", q: "What’s changed since the first film?", a: "Mostly the magazine industry, which is what the film is about." }
        ]),
        F("What’s it about?", "Twenty years on, Miranda Priestly runs a magazine in an industry that’s struggling, and Andy and Emily end up in her orbit again.", [
          { id: "pra-mean", q: "Is Miranda still as cruel?", a: "Yes, but this time she has more at stake.", who: "Meryl Streep" },
          { id: "pra-emily", q: "Does Emily have a bigger part?", a: "Yes. Emily Blunt gets more screen time than in the first film.", who: "Emily Blunt" }
        ]),
        F("How long is it?", "Just under two hours.", [
          { id: "pra-room", q: "Can someone who missed the first one follow it?", a: "Yes. They’ll miss a few callbacks, nothing more." },
          { id: "pra-double", q: "Can we watch both in one night?", a: "Together they run about four hours. The first film is the shorter one." }
        ])
      ]
    },

    mayday: {
      id: "mayday", title: "Mayday",
      syn: "Cold War buddy comedy", kind: "Film", length: "1h 51", ...P.apple, ...art("mayday"),
      about: "A US Navy pilot goes down behind enemy lines on a secret Cold War run and has to get out with an eccentric ex-KGB agent. Ryan Reynolds and Kenneth Branagh. 1h 51 on Apple TV, which is not in your plan.",
      chips: [
        F("Is it an action film or a comedy?", "Both. It’s a buddy action comedy: Ryan Reynolds is the fast talker and Kenneth Branagh plays it straight.", [
          { id: "may-rey", q: "Is it typical Ryan Reynolds?", a: "Yes, the fast, sarcastic version of him.", who: "Ryan Reynolds" },
          { id: "may-branagh", q: "Is Branagh funny in it?", a: "He plays the straight man, and most of the jokes come from the clash between the two." }
        ]),
        F("Do I need to know the history?", "No. It’s the Cold War, they’re stuck behind enemy lines and need to get home. That’s all the setup there is.", [
          { id: "may-real", q: "Is it based on a true story?", a: "No. The setting is real, the story is made up." },
          { id: "may-tense", q: "Is it tense?", a: "In parts, but it’s mostly a comedy. Nothing grim." }
        ]),
        F("Where can I watch it?", "On Apple TV, which you don’t have yet. It’s €9,99 a month.", [
          { id: "may-month", q: "How long is it?", a: "1h 51." },
          { id: "may-alt", q: "What else is on Apple TV?", a: "Gladiator II from your list, plus Severance, Slow Horses and Ted Lasso." }
        ])
      ]
    },

    youme: {
      id: "youme", title: "You+Me - Against the World",
      syn: "French teen romance with a thriller turn", kind: "Film", length: "1h 34", ...P.prime, ...art("you-me-against-the-world"),
      about: "Alma is supposed to be studying law and is secretly making films. Vadim is the trouble she was not planning on. Someone is watching both of them. 1h 34 on Prime Video, which is not in your plan.",
      chips: [
        F("Is it just a teen romance?", "It starts as one. Two students are forced to work together, then something darker surfaces around them.", [
          { id: "ym-thrill", q: "How much thriller is there?", a: "Enough to change the last half hour." },
          { id: "ym-age", q: "What age is it for?", a: "Teens and up. The leads are eighteen and twenty." }
        ]),
        F("Is it in English?", "No, it’s French. You can watch with subtitles or a dub.", [
          { id: "ym-short", q: "Is the dub okay?", a: "Yes. It’s a plot-driven film, so you lose less with a dub." },
          { id: "ym-dub", q: "How long is it?", a: "1h 34." }
        ]),
        F("Where can I watch it?", "On Prime Video, which you don’t have yet. It’s €5,99 a month.", [
          { id: "ym-with", q: "What else is on Prime Video?", a: "Reacher and its spin-off Neagley." },
          { id: "ym-plan", q: "Anything similar in my plan?", a: "Best of the Best on Netflix, also light and young." }
        ])
      ]
    },

    residentevil: {
      id: "residentevil", title: "Resident Evil",
      syn: "Horror reboot, one night of outbreak", kind: "Film", length: "1h 35", ...P.netflix, ...art("resident-evil"),
      about: "Zach Cregger's take: a medical courier on an ordinary night shift as the city comes apart around him. Austin Abrams and Paul Walter Hauser. 1h 35 on Netflix, already in your plan.",
      chips: [
        F("How scary is it?", "Very. Zach Cregger, who made Barbarian, directed it. It’s a horror film, not an action film with monsters.", [
          { id: "re-gore", q: "Is it gory?", a: "Yes, in places. Infection and bodies come with the story." },
          { id: "re-alone", q: "Who is Zach Cregger?", a: "The director of Barbarian and Weapons." }
        ]),
        F("Do I need to know the games?", "No. It’s a fresh start, not a remake of one game. Players will catch references.", [
          { id: "re-films", q: "Is it connected to the older films?", a: "No. It shares the name and nothing else." },
          { id: "re-games", q: "Is it like the games?", a: "In feel: a city, an outbreak, and ordinary people out of their depth." }
        ]),
        F("How long is it?", "1h 35. It’s on Netflix, already in your plan.", [
          { id: "re-after", q: "Something lighter for after?", a: "Best of the Best or The Gentlemen, both on Netflix." },
          { id: "re-cregger", q: "Is it okay for teenagers?", a: "Only older teens who like horror. It’s scary and gory." }
        ])
      ]
    },

    odyssey: {
      id: "odyssey", title: "The Odyssey",
      syn: "Nolan’s take on Homer’s epic", kind: "Film", length: "2h 53", ...P.disney, ...art("the-odyssey"),
      about: "Christopher Nolan on Homer. Odysseus taking ten years to get back from Troy, with the gods and the monsters in his way. Matt Damon, Tom Holland, Anne Hathaway, Robert Pattinson. 2h 53 on Disney+, already in your plan.",
      chips: [
        F("Do I need to know the myth?", "No. The film tells the story from the start. It’s on Disney+, in your plan.", [
          { id: "ody-book", q: "Should I read the poem first?", a: "No need. The film isn’t a translation of it." },
          { id: "ody-know", q: "Do I need to know about Troy?", a: "No. It starts after the war, and knowing there was one is enough." }
        ]),
        F("How long is it?", "2h 53.", [
          { id: "ody-split", q: "Can I split it over two nights?", a: "Yes, the voyage has natural breaks, though it’s made to watch in one go." },
          { id: "ody-loud", q: "Is it loud?", a: "It’s a Nolan sound mix: very quiet, then very loud. Headphones help if the house is asleep." }
        ]),
        F("Is it hard to follow like his other films?", "No. It’s one man trying to get home, told in order.", [
          { id: "ody-nolan", q: "Is it like Tenet?", a: "No. One timeline, one journey." },
          { id: "ody-cast", q: "Who’s in it?", a: "Matt Damon as Odysseus and Tom Holland as Telemachus, with Anne Hathaway and Robert Pattinson.", who: "Matt Damon" }
        ])
      ]
    },

    spiderman: {
      id: "spiderman", title: "Spider-Man: Brand New Day",
      syn: "Spider-Man, after the world forgot him", kind: "Film", length: "2h 25", ...P.disney, ...art("spider-man-brand-new-day"),
      about: "Peter Parker doing the job full-time in a city that has forgotten who he is, while his friends move on without him. Tom Holland, Zendaya, Mark Ruffalo and Jon Bernthal. 2h 25 on Disney+, already in your plan.",
      chips: [
        F("Do I need the earlier Spider-Man films?", "One thing helps: at the end of No Way Home, the world forgot Peter Parker. This film starts there.", [
          { id: "spi-which", q: "Which film comes right before it?", a: "No Way Home, from 2021." },
          { id: "spi-mcu", q: "Do I need the rest of Marvel?", a: "No. Mark Ruffalo appears, but the story is Peter’s." }
        ]),
        F("Is it darker than the others?", "Yes. He’s alone and the tone is street-level. Still funny, but the heaviest of them.", [
          { id: "spi-kids", q: "Is it okay for kids?", a: "From about ten. The violence is harder than in the earlier films." },
          { id: "spi-bern", q: "Is Jon Bernthal the Punisher?", a: "Yes, that’s his role in it." }
        ]),
        F("How long is it?", "2h 25. It’s on Disney+, already in your plan.", [
          { id: "spi-split", q: "Is there a good place to split it?", a: "There’s a turn about halfway that works as a break." },
          { id: "spi-room", q: "Who plays Spider-Man?", a: "Tom Holland." }
        ])
      ]
    }
  };

  // the order the reel walks them in: a mix of series and films, and of what is
  // in the plan against what is not, so the feed does not run in blocks
  const order = [
    "reacher", "superman", "lizzie", "prada", "slowhorses", "spiderman",
    "gentlemen", "supergirl", "lasso", "odyssey", "neagley", "whisper",
    "lanterns", "mandalorian", "stranger", "mayday", "minsec", "residentevil",
    "bestofbest", "youme"
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

  const feed = order.map(id => reelItem(catalog[id])).filter(x => x.youtube);
  // Minimum Security shipped without a clip, so it is a poster title only
  const posterOnly = order.filter(id => !catalog[id].clip);

  const questions = {};
  order.forEach(id => { questions[catalog[id].title] = catalog[id].chips; });

  global.IntlTitles = { catalog, order, feed, questions, reelItem, posterOnly };
})(window);
