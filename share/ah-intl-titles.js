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
        F("Was Lizzie Borden a real person?", "Yes. She was tried for the 1892 killings of her father and stepmother and acquitted. The series dramatises the case; an acquittal does not resolve every historical question."),
        F("Is this the “forty whacks” story?", "Yes. The rhyme refers to Lizzie Borden, but its famous count of axe blows is inaccurate."),
        F("Is this linked to the Dahmer series?", "Yes. It is another instalment of the Monster anthology, focused on a different historical case.")
      ]
    },

    stranger: {
      id: "stranger", title: "Not a Stranger",
      syn: "Turkish thriller, a nanny with secrets", kind: "Series", length: "8 ep", ...P.netflix, ...art("not-a-stranger"),
      about: "A Turkish psychological thriller. A painter goes back to work, hires the nanny she has been looking for, and the house slowly stops being hers. Eight episodes on Netflix, already in your plan.",
      chips: [
        F("Is the nanny a supernatural threat?", "No. The tension comes from the nanny’s unsettling presence and the family’s secrets, rather than a supernatural threat."),
        F("Is Funda played by the Love for Rent star?", "Yes. Elçin Sangu plays Funda, the painter and new mother who hires Nazlı."),
        F("Is this adapted from a thriller novel?", "No. Not a Stranger is an original series, created and written by Tuğba Doğan.")
      ]
    },

    gentlemen: {
      id: "gentlemen", title: "The Gentlemen",
      syn: "Inherited estate, inherited weed farm", kind: "Series", length: "2 seasons", ...P.netflix, ...art("the-gentlemen"),
      about: "Guy Ritchie's series spin on his own film. Eddie inherits a duke's estate and the enormous cannabis operation underneath it, and cannot get rid of either. Two seasons on Netflix, already in your plan.",
      chips: [
        F("Is it the same story as the film?", "No. The series uses the same criminal world and Guy Ritchie sensibility, but follows different characters and a different story."),
        F("Is Guy Ritchie behind this too?", "Yes. The fast dialogue, sharply dressed criminals and bursts of violence carry over from his film style."),
        F("Is that Effy from Skins?", "Yes. Kaya Scodelario plays Susie Glass, who runs her father’s criminal business.")
      ]
    },

    lanterns: {
      id: "lanterns", title: "Lanterns",
      syn: "Green Lantern cops on a murder case", kind: "Series", length: "8 ep", ...P.hbo, ...art("lanterns"),
      about: "Two Green Lanterns, a rookie and a legend, investigating a murder in the American heartland. Damon Lindelof behind it, Aaron Pierre and Kyle Chandler in front. Eight episodes on HBO Max, which is not in your plan.",
      chips: [
        F("Why are Green Lanterns solving a murder?", "The series puts Hal Jordan and John Stewart on an Earth-based murder investigation in the American heartland. It uses the Green Lantern characters in a detective-story setting."),
        F("Is it like True Detective?", "The point of comparison is the pair of mismatched investigators working on one dark case. Lanterns brings that structure into the DC universe."),
        F("Are there two Green Lanterns?", "Yes. Hal Jordan is the experienced Lantern and John Stewart is the new recruit. The series follows them working together.")
      ]
    },

    neagley: {
      id: "neagley", title: "Neagley",
      syn: "Reacher spin-off, Neagley on her own case", kind: "Series", length: "8 ep", ...P.prime, ...art("neagley"),
      about: "The Reacher spin-off. Frances Neagley, ex-110th and now a private investigator in Chicago, goes after the suspicious death of an old friend. Eight episodes on Prime Video, which is not in your plan.",
      chips: [
        F("Is this Reacher’s Neagley?", "Yes. Maria Sten returns as Frances Neagley, this time leading her own story as a private investigator in Chicago."),
        F("How is it different from Reacher?", "It keeps the same world but centres on Neagley’s investigation, with less emphasis on Reacher’s overpowering fights."),
        F("Does she have her own Lee Child book?", "Her first standalone novel, Zero Margin, is due in March 2027, written by Lee Child and Yasmin Angoe. The TV spin-off arrives before it.")
      ]
    },

    reacher: {
      id: "reacher", title: "Reacher",
      syn: "Action series, one case per season", kind: "Series", length: "4 seasons", ...P.prime, ...art("reacher"),
      about: "Jack Reacher drifts into a town, finds something rotten, and takes it apart. Four seasons and no homework needed. On Prime Video, which is not in your plan, at EUR 5,99 a month.",
      chips: [
        F("Is this the Reacher from the books?", "Yes. The series adapts Lee Child’s Jack Reacher novels."),
        F("Is this connected to the Tom Cruise films?", "It is a separate adaptation of Lee Child’s character. Alan Ritchson plays Reacher in the series; Tom Cruise played him in the films."),
        F("Does each season adapt a different book?", "Yes. The series takes a different Reacher novel for each season, rather than dividing one book across the whole show.")
      ]
    },

    lasso: {
      id: "lasso", title: "Ted Lasso",
      syn: "Comedy, an American coaching English football", kind: "Series", length: "4 seasons", ...P.apple, ...art("ted-lasso"),
      about: "An American football coach is hired to manage an English club he knows nothing about, and refuses to be cynical about any of it. Four seasons on Apple TV, which is not in your plan, at EUR 9,99 a month.",
      chips: [
        F("Is AFC Richmond a real club?", "No. AFC Richmond is fictional, although the show places it within the real world of English football."),
        F("Will I like it if I don’t follow football?", "Football gives it its setting, but the relationships and comedy are the main draw. You don’t need to know the sport’s rules."),
        F("Does Ted even know how football works?", "Not when he first arrives. His unfamiliarity with the sport is part of the joke as he tries to lead AFC Richmond.")
      ]
    },

    slowhorses: {
      id: "slowhorses", title: "Slow Horses",
      syn: "Spy series about MI5’s rejects", kind: "Series", length: "6 seasons", ...P.apple, ...art("slow-horses"),
      about: "The spies MI5 could not fire are parked in a dead-end office under Jackson Lamb, who is vile and the best of them. Gary Oldman in the part. Six seasons on Apple TV, which is not in your plan.",
      chips: [
        F("Is Slow Horses anything like Bond?", "It is closer to a grubby, bureaucratic spy story, with plenty of dark humour. These agents are MI5’s sidelined staff rather than glamorous secret agents."),
        F("Is that Gary Oldman under all that hair?", "Yes. He plays Jackson Lamb, the boss of the sidelined agents at Slough House."),
        F("Is Mick Jagger singing the theme?", "Yes. He sings “Strange Game”, the theme written for Slow Horses.")
      ]
    },

    minsec: {
      id: "minsec", title: "Minimum Security",
      syn: "French sitcom set in a prison", kind: "Series", length: "8 ep", ...P.streamz, ...art("minimum-security"),
      about: "A French workplace comedy set inside Chénoise prison, where the staff are more trouble than the inmates. Audrey Lamy and Jean-Pascal Zadi lead it. Eight episodes on Streamz, which is not in your plan, at EUR 9,99 a month for Basic.",
      chips: [
        F("Is the comedy about guards or prisoners?", "The focus is the prison staff: idealistic Corinne and the mismatched team trying to keep the place running."),
        F("Is her own son in the prison?", "That is the opening complication: Corinne’s beliefs about rehabilitation are tested when her own son is arrested."),
        F("Do the inmates really get a day out?", "In the prison-outing episode, Corinne does take the inmates out. Keeping that trip under control is another matter.")
      ]
    },

    superman: {
      id: "superman", title: "Superman",
      syn: "DC reboot, a hopeful Superman", kind: "Film", length: "2h 10", ...P.netflix, ...art("superman"),
      about: "James Gunn's reset. Clark Kent reporting in Metropolis, trying to square Krypton with Kansas, with Nicholas Hoult's Lex Luthor against him. 2h 10 on Netflix, already in your plan.",
      chips: [
        F("Who is the dog with superpowers?", "That is Krypto, the superdog."),
        F("Is this a fresh start for Superman?", "Yes. This begins a new version of Superman’s story rather than continuing the older films."),
        F("Is this by the Guardians director?", "Yes. James Gunn directed Guardians of the Galaxy and this Superman film.")
      ]
    },

    bestofbest: {
      id: "bestofbest", title: "Best of the Best",
      syn: "Bollywood-fusion dance, college stakes", kind: "Film", length: "1h 52", ...P.netflix, ...art("best-of-the-best"),
      about: "Two childhood friends join UCLA's Bollywood-fusion dance team and find the road to nationals rougher than expected. Maitreyi Ramakrishnan leads. 1h 52 on Netflix, already in your plan.",
      chips: [
        F("Are these dance competitions real?", "Yes. Bollywood-fusion dance teams compete on a real US college circuit. The film turns that world into a fictional comedy."),
        F("Is that Devi from Never Have I Ever?", "Yes. Maitreyi Ramakrishnan, who played Devi, plays Maya in Best of the Best."),
        F("What does Bollywood fusion mix together?", "The routines mix Bollywood dance and Hindi tracks with Western pop. That mix is central to the college dance competitions in the film.")
      ]
    },

    whisper: {
      id: "whisper", title: "The Whisper Man",
      syn: "A missing boy, a retired detective", kind: "Film", length: "1h 51", ...P.netflix, ...art("the-whisper-man"),
      about: "A widower's son vanishes, and the only person who can help is his estranged father, the detective who caught the serial killer the case now points back at. Robert De Niro and Michelle Monaghan. 1h 51 on Netflix, already in your plan.",
      chips: [
        F("Are De Niro and Adam Scott father and son?", "Yes. They play an estranged father and son drawn together when the younger man’s child disappears."),
        F("Is this the Alex North book?", "Yes. The film adapts Alex North’s novel The Whisper Man."),
        F("Is the killer already in prison?", "The original Whisper Man was convicted years earlier. A new child’s disappearance raises questions about the connection to that old case.")
      ]
    },

    supergirl: {
      id: "supergirl", title: "Supergirl",
      syn: "DC film, Superman’s cousin on her own", kind: "Film", length: "1h 48", ...P.hbo, ...art("supergirl"),
      about: "Kara Zor-El remembers Krypton, which Clark never did, and that makes her a harder character. Milly Alcock in the part, with Jason Momoa alongside. 1h 48 on HBO Max, which is not in your plan.",
      chips: [
        F("Why is Supergirl angrier than Superman?", "Kara remembers the loss of Krypton in a way Superman does not. Her experience gives this story a harder emotional edge."),
        F("Is that Rhaenyra from House of the Dragon?", "Yes. Milly Alcock, who played young Rhaenyra, plays Supergirl."),
        F("Which comic is Supergirl based on?", "Supergirl: Woman of Tomorrow, written by Tom King.")
      ]
    },

    mandalorian: {
      id: "mandalorian", title: "The Mandalorian and Grogu",
      syn: "Star Wars film, Mando and Grogu", kind: "Film", length: "2h 12", ...P.disney, ...art("mandalorian-and-grogu"),
      about: "Din Djarin and Grogu on a proper film budget, in a galaxy where the Empire has fallen and the warlords have not. Jon Favreau directing. 2h 12 on Disney+, already in your plan.",
      chips: [
        F("Is Grogu the one called Baby Yoda?", "Yes. “Baby Yoda” is the nickname viewers gave Grogu before learning his name. He belongs to Yoda’s species, but is a different character."),
        F("Do I need to catch up on The Mandalorian?", "The series gives you the history of Din Djarin and Grogu’s bond, but the film also introduces the pair for new viewers."),
        F("Who does Jeremy Allen White play?", "He voices Rotta the Hutt, Jabba’s son. You hear him rather than see him on screen.")
      ]
    },

    prada: {
      id: "prada", title: "The Devil Wears Prada 2",
      syn: "Sequel, back at Runway twenty years on", kind: "Film", length: "1h 59", ...P.disney, ...art("devil-wears-prada-2"),
      about: "Andy comes back to Runway, Miranda is fighting for the magazine's survival, and Emily now runs the luxury brand holding the money. Streep, Hathaway, Blunt and Tucci all back. 1h 59 on Disney+, already in your plan.",
      chips: [
        F("Do I need to rewatch the first one?", "A rewatch is optional. Remembering Andy’s time working for Miranda will give you more context for the reunions."),
        F("Is the original cast back?", "Yes. Meryl Streep, Anne Hathaway, Emily Blunt and Stanley Tucci return as Miranda, Andy, Emily and Nigel."),
        F("How is this different from the first one?", "The sequel revisits Runway in a struggling magazine industry, with Miranda under new pressure and Andy and Emily back in her orbit.")
      ]
    },

    mayday: {
      id: "mayday", title: "Mayday",
      syn: "Cold War buddy comedy", kind: "Film", length: "1h 51", ...P.apple, ...art("mayday"),
      about: "A US Navy pilot goes down behind enemy lines on a secret Cold War run and has to get out with an eccentric ex-KGB agent. Ryan Reynolds and Kenneth Branagh. 1h 51 on Apple TV, which is not in your plan.",
      chips: [
        F("Is Kenneth Branagh doing comedy here?", "Yes. He teams up with Ryan Reynolds in a buddy comedy built around a Cold War spy adventure."),
        F("Is Reynolds playing it like Deadpool?", "He brings the fast, sarcastic style, but this is a Cold War buddy comedy rather than another superhero role."),
        F("Are the American and KGB man allies?", "Yes. Reynolds plays an American pilot who ends up relying on an eccentric former KGB agent, played by Branagh.")
      ]
    },

    youme: {
      id: "youme", title: "You+Me - Against the World",
      syn: "French teen romance with a thriller turn", kind: "Film", length: "1h 34", ...P.prime, ...art("you-me-against-the-world"),
      about: "Alma is supposed to be studying law and is secretly making films. Vadim is the trouble she was not planning on. Someone is watching both of them. 1h 34 on Prime Video, which is not in your plan.",
      chips: [
        F("Is this based on a book?", "Yes. It is one of Prime Video’s adaptations of an international bestselling book."),
        F("Is there a thriller behind the romance?", "Yes. The attraction between the leads is complicated by a threat trying to pull them apart."),
        F("Why is Alma lying about her studies?", "She tells her parents she is studying law, while actually pursuing her ambition to become a filmmaker.")
      ]
    },

    residentevil: {
      id: "residentevil", title: "Resident Evil",
      syn: "Horror reboot, one night of outbreak", kind: "Film", length: "1h 35", ...P.netflix, ...art("resident-evil"),
      about: "Zach Cregger's take: a medical courier on an ordinary night shift as the city comes apart around him. Austin Abrams and Paul Walter Hauser. 1h 35 on Netflix, already in your plan.",
      chips: [
        F("Is this another reboot?", "Yes. Zach Cregger’s film reinvents the franchise with a new story and a new lead, medical courier Bryan."),
        F("Is it by the director of Barbarian?", "Yes. Zach Cregger directed Barbarian and Weapons before this Resident Evil film."),
        F("Is that Dylan from Severance?", "Yes. Zach Cherry, who plays Dylan in Severance, is in the cast of this Resident Evil film.")
      ]
    },

    odyssey: {
      id: "odyssey", title: "The Odyssey",
      syn: "Nolan’s take on Homer’s epic", kind: "Film", length: "2h 53", ...P.disney, ...art("the-odyssey"),
      about: "Christopher Nolan on Homer. Odysseus taking ten years to get back from Troy, with the gods and the monsters in his way. Matt Damon, Tom Holland, Anne Hathaway, Robert Pattinson. 2h 53 on Disney+, already in your plan.",
      chips: [
        F("Is this the story from Homer’s poem?", "Yes. Nolan’s film adapts The Odyssey, the story of Odysseus’s journey home after the Trojan War."),
        F("Was the whole film shot in IMAX?", "Yes. It was the first theatrical feature filmed entirely with IMAX 70mm film cameras."),
        F("Are Damon and Holland playing relatives?", "Yes. Matt Damon plays Odysseus and Tom Holland plays his son Telemachus.")
      ]
    },

    spiderman: {
      id: "spiderman", title: "Spider-Man: Brand New Day",
      syn: "Spider-Man, after the world forgot him", kind: "Film", length: "2h 25", ...P.disney, ...art("spider-man-brand-new-day"),
      about: "Peter Parker doing the job full-time in a city that has forgotten who he is, while his friends move on without him. Tom Holland, Zendaya, Mark Ruffalo and Jon Bernthal. 2h 25 on Disney+, already in your plan.",
      chips: [
        F("Why has everyone forgotten Peter?", "At the end of No Way Home, Doctor Strange’s spell erased the world’s memory of Peter Parker. Brand New Day follows him living with that consequence."),
        F("Is that the same Punisher actor?", "Yes. Jon Bernthal returns as Frank Castle, the Punisher."),
        F("How long after No Way Home is this?", "Four years later. Peter is still living with the consequences of the spell that made everyone forget him.")
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
