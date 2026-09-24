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
      syn: "Forty whacks, told slowly", kind: "Series", length: "8 ep", ...P.netflix, ...art("monster-lizzie-borden"),
      about: "The fourth Monster, and this time the case is the 1892 axe murders in Fall River. Ella Beatty plays Lizzie, with Sarah Paulson and Vicky Krieps around her. Eight episodes on Netflix, already in your plan.",
      chips: [
        F("How gruesome does this one get?", "Gruesome in a few moments rather than throughout. The murders are shown, and Monster never looks away, but most of the eight episodes are the household and the trial. It plays on Netflix, included in your plan.", [
          { id: "liz-vs", q: "Worse than the other Monster seasons?", a: "About the same. It is period rather than modern, so the violence is axes and corsets instead of forensics. If the earlier seasons were watchable for you, this is too." },
          { id: "liz-sleep", q: "Will this keep me up?", a: "The atmosphere might, the gore probably not. It is a slow, cold kind of dread. Watch an episode early rather than last thing and you will be fine." }
        ]),
        F("Do I need the other Monster seasons?", "No. Each season is a different case with a different cast. Start here and nothing is missing. All of them are on Netflix if you want more afterwards.", [
          { id: "liz-order", q: "Which season is the best one?", a: "Most people start with the first. But they are separate stories, so there is no order to get wrong. This one is the most period of the four." },
          { id: "liz-anthology", q: "So it is an anthology?", a: "Yes. Same makers, same title, a new true case each season. Ryan Murphy and Ian Brennan behind it, all on Netflix." }
        ]),
        F("Is it actually a true story?", "Yes, and famously unresolved. Lizzie Borden was tried for the murder of her father and stepmother in 1892 and acquitted, and nobody else was ever charged. The series fills the gaps the record leaves.", [
          { id: "liz-verdict", q: "So did she do it?", a: "The court said no. Almost everyone since has said yes. The series takes a position, which is the point of watching it, so I will leave that one to the episodes." },
          { id: "liz-rhyme", q: "Where does the rhyme come from?", a: "The playground rhyme about forty whacks came after the trial and got the count wrong. It stuck anyway. The series knows you arrive already knowing it." }
        ])
      ]
    },

    stranger: {
      id: "stranger", title: "Not a Stranger",
      syn: "The nanny knows too much", kind: "Series", length: "8 ep", ...P.netflix, ...art("not-a-stranger"),
      about: "A Turkish psychological thriller. A painter goes back to work, hires the nanny she has been looking for, and the house slowly stops being hers. Eight episodes on Netflix, already in your plan.",
      chips: [
        F("Is this a slow burn or does it move?", "It moves. The nanny is unsettling from the first episode and the pressure keeps rising for eight of them. No wasted season. It is on Netflix and included in your plan.", [
          { id: "str-binge", q: "Could I do this in a weekend?", a: "Easily. Eight episodes, one storyline, and it is built to make you start the next one. A Saturday and a Sunday covers it." },
          { id: "str-scary", q: "Is it scary or just tense?", a: "Tense. There is no horror in it, just a stranger in the house and a marriage with something in it. The dread is domestic." }
        ]),
        F("Do I have to read subtitles?", "It is Turkish, so yes unless you switch on the dub. Netflix has both. Subtitles keep the performances intact, and the performances are most of why this works.", [
          { id: "str-dub", q: "Is the dub any good?", a: "Serviceable, and fine if you want to half-watch. But a lot of this show is in faces and pauses, so the original audio is worth the reading." },
          { id: "str-turkish", q: "What else Turkish is like this?", a: "Netflix has a deep Turkish drama shelf and the thrillers share this register. Ask me and I will pull a few that match this one's tone." }
        ]),
        F("Is it okay to watch with someone else in the room?", "Yes. It is a talky thriller rather than a graphic one, so nothing will ambush the room. The plot needs some attention, but you can look away and catch up.", [
          { id: "str-kids", q: "With a teenager?", a: "Fifteen and up, roughly. There is no gore, but the themes are adult and the tension is the point. Watch the first episode and judge from there." },
          { id: "str-half", q: "Can I follow it while doing something else?", a: "Mostly. It is a slow build with a small cast, so a missed minute is not fatal. The later episodes reward paying attention." }
        ])
      ]
    },

    gentlemen: {
      id: "gentlemen", title: "The Gentlemen",
      syn: "Inherited estate, inherited weed farm", kind: "Series", length: "2 seasons", ...P.netflix, ...art("the-gentlemen"),
      about: "Guy Ritchie's series spin on his own film. Eddie inherits a duke's estate and the enormous cannabis operation underneath it, and cannot get rid of either. Two seasons on Netflix, already in your plan.",
      chips: [
        F("Do I need to see the film first?", "No. Same world, same director, different characters. The series stands alone and the film is a bonus rather than homework. The series is on Netflix and already in your plan.", [
          { id: "gen-film", q: "Is the film on here too?", a: "It is a separate thing and not needed. Start with the series. If you like the voice, I can find you the film afterwards." },
          { id: "gen-ritchie", q: "Is it very Guy Ritchie?", a: "Very. Fast dialogue, criminals with manners, violence that arrives suddenly and is over quickly. If that is a yes for you, this delivers it for two seasons." }
        ]),
        F("How violent is it?", "Sharp bursts rather than constant. People get hurt and the show finds it funny, which is the tone throughout. Less bloody than most crime drama, more casual about it.", [
          { id: "gen-room", q: "Can I put this on with people around?", a: "Yes, it is good company television. The plot is easy to follow and the dialogue carries it, so conversation over the top does not ruin it." },
          { id: "gen-funny", q: "Is it actually a comedy?", a: "A crime show with jokes, closer to comedy than most. Theo James plays it straight while everything around him is absurd, and that is where the laughs are." }
        ]),
        F("Is it worth starting a second season?", "Yes, and there are two, so there is a run in it. Sixteen episodes of about fifty minutes. One a night is an easy weeknight watch on Netflix.", [
          { id: "gen-two", q: "Does season two hold up?", a: "It keeps the cast and the tone and widens the scheme. If season one worked for you, there is no drop to warn you about." },
          { id: "gen-night", q: "Is one episode enough for an evening?", a: "Yes. Episodes run about fifty minutes and each has its own scheme inside the bigger one, so stopping at one feels complete." }
        ])
      ]
    },

    lanterns: {
      id: "lanterns", title: "Lanterns",
      syn: "Green Lantern, but a murder case", kind: "Series", length: "8 ep", ...P.hbo, ...art("lanterns"),
      about: "Two Green Lanterns, a rookie and a legend, investigating a murder in the American heartland. Damon Lindelof behind it, Aaron Pierre and Kyle Chandler in front. Eight episodes on HBO Max, which is not in your plan.",
      chips: [
        F("Do I need to know the comics?", "No. It is written as a crime story that happens to have space cops in it, and it explains its own rules. It plays on HBO Max, which you are not subscribed to. Basic with Ads is EUR 6,99 a month.", [
          { id: "lan-dc", q: "Does it connect to the Superman film?", a: "Same new DC world, so there are threads. But the series works on its own and does not ask you to have seen anything first." },
          { id: "lan-add", q: "What else would HBO Max get me?", a: "Dune: Part Two, The Last of Us and Barbie are all waiting on your list there, plus Supergirl. That is four things for one EUR 6,99 month." }
        ]),
        F("Is this superheroes or something slower?", "Slower, deliberately. Lindelof made it a murder mystery in small-town America with two cops who happen to have rings. Expect long conversations more than fights.", [
          { id: "lan-true", q: "So more True Detective than Marvel?", a: "That is the comparison everyone makes and it is fair. Two mismatched investigators, one bleak case, eight episodes. The powers are the setting, not the plot." },
          { id: "lan-pace", q: "Will it bore me if I wanted action?", a: "It might. There is spectacle, but it is rationed. If you want something loud tonight, say so and I will point you at Superman instead." }
        ]),
        F("Is eight episodes a complete story?", "Yes. The case opens and closes across the season, so you get an ending. It runs about an hour an episode on HBO Max.", [
          { id: "lan-month", q: "Could I do it in one month's subscription?", a: "Comfortably. Eight hours over four weeks, alongside Dune: Part Two and The Last of Us. One EUR 6,99 month clears a lot of your list." },
          { id: "lan-more", q: "Is there more coming?", a: "It is set up to continue, so this season closes its case but not the world. Nothing is left dangling in a way that spoils the watch." }
        ])
      ]
    },

    neagley: {
      id: "neagley", title: "Neagley",
      syn: "Reacher's sharpest friend, on her own", kind: "Series", length: "8 ep", ...P.prime, ...art("neagley"),
      about: "The Reacher spin-off. Frances Neagley, ex-110th and now a private investigator in Chicago, goes after the suspicious death of an old friend. Eight episodes on Prime Video, which is not in your plan.",
      chips: [
        F("Do I need to have watched Reacher?", "No, but it helps. Neagley is introduced there and this assumes you like her rather than that you know her history. Both are on Prime Video, which you are not subscribed to — it is EUR 5,99 a month.", [
          { id: "nea-order", q: "Should I just start with Reacher then?", a: "If you want the bigger run, yes: four seasons of Reacher against eight episodes here. One subscription covers both." },
          { id: "nea-cheap", q: "EUR 5,99 is the cheapest of them, right?", a: "It is, yes. Cheaper than HBO Max at EUR 6,99 and well under Apple TV at EUR 9,99. For Reacher and this, it is the least expensive month on your list." }
        ]),
        F("Is it the same kind of thing as Reacher?", "Same world, smaller scale. Neagley investigates rather than flattens, so it leans procedural where Reacher leans action. Still eight episodes of one case, still people getting hit.", [
          { id: "nea-fights", q: "Are there still fights?", a: "Yes, just fewer and less one-sided. She is not built like Reacher and the show knows it, so she wins by being ahead rather than bigger." },
          { id: "nea-sten", q: "Same actor as in Reacher?", a: "Maria Sten, yes, carrying her own show now. She has played Neagley since the first season, so nothing has been recast.", who: "Maria Sten" }
        ]),
        F("Is this a good binge or a weeknight thing?", "Either. Eight episodes with one case running through them, so it holds up a weekend, and each episode closes enough to stop after one.", [
          { id: "nea-first", q: "Does it get going quickly?", a: "The friend dies in episode one and she is on it immediately. No slow first act to survive." },
          { id: "nea-end", q: "Does it finish, or is it a cliffhanger?", a: "The case is settled by the end of the season. It leaves room for more without stranding you." }
        ])
      ]
    },

    reacher: {
      id: "reacher", title: "Reacher",
      syn: "Big man, small town, bad idea", kind: "Series", length: "4 seasons", ...P.prime, ...art("reacher"),
      about: "Jack Reacher drifts into a town, finds something rotten, and takes it apart. Four seasons and no homework needed. On Prime Video, which is not in your plan, at EUR 5,99 a month.",
      chips: [
        F("Where do I start with four seasons?", "Season one. Each season is its own self-contained book, so you could start anywhere, but the first is the best introduction and the one everyone means. It is on Prime Video, which you are not subscribed to.", [
          { id: "rea-skip", q: "Can I skip to the best season?", a: "You could. Most people rate the first and the third highest. But they are standalone cases, so starting at one costs you nothing but time." },
          { id: "rea-books", q: "Do the books matter?", a: "Not at all. Each season adapts one, but the show explains everything. Reading them first adds nothing you need." }
        ]),
        F("Is it just fighting?", "Mostly it is a mystery with fighting in it. Reacher works out what happened, then the last act is the reckoning. The violence is heavy but brief and the show is not grim about it.", [
          { id: "rea-gore", q: "How graphic is the violence?", a: "Blunt rather than bloody. Bones and bodies, not lingering gore. It is an action show that wants you cheering, not wincing." },
          { id: "rea-room", q: "Is this good with company?", a: "Very. The plots are clear, the fights are the point, and missing a line costs you nothing. Easy company television." }
        ]),
        F("Is it worth adding a subscription for?", "If you want the long run, yes. Four seasons plus the Neagley spin-off for EUR 5,99 a month makes it the cheapest large backlog on your list.", [
          { id: "rea-alt", q: "Anything like it already in my plan?", a: "Squid Game on Netflix if you want tension, and The Gentlemen if you want crime with a lighter touch. Neither is quite this, but both are already paid for." },
          { id: "rea-month", q: "How much could I get through in a month?", a: "Thirty-two episodes of about fifty minutes is a lot for four weeks, but a season of eight is very doable. Then Neagley on top." }
        ])
      ]
    },

    lasso: {
      id: "lasso", title: "Ted Lasso",
      syn: "American coach, English football, relentless kindness", kind: "Series", length: "4 seasons", ...P.apple, ...art("ted-lasso"),
      about: "An American football coach is hired to manage an English club he knows nothing about, and refuses to be cynical about any of it. Four seasons on Apple TV, which is not in your plan, at EUR 9,99 a month.",
      chips: [
        F("Do I need to like football?", "Not at all. The football is the setting and the show is about the people in the changing room. Plenty of people who have never watched a match love it. It is on Apple TV, which you are not subscribed to.", [
          { id: "las-rules", q: "Will I be lost if I don't know the rules?", a: "No. The show explains what matters as it goes, mostly because Ted does not know the rules either. That is the joke for the first season." },
          { id: "las-club", q: "Is it based on a real club?", a: "AFC Richmond is invented, but the league around it is real and the Premier League let them use it. It looks right for that reason." }
        ]),
        F("Is it as nice as everyone says?", "Yes, and it means it. The comedy comes from kindness landing in a cynical place rather than from people being cruel. It gets sadder in the later seasons without losing that.", [
          { id: "las-sad", q: "Does it get heavy?", a: "Season two goes into grief and anxiety properly and takes it seriously. Still funny, but it is not the light watch season one is." },
          { id: "las-bad", q: "Is the last season worth it?", a: "Opinion splits there. Most agree the first two are the strongest. Season three and four are still good company if you are attached to the cast by then." }
        ]),
        F("How long is an episode?", "About half an hour to start, closer to forty-five later on. That makes the first season the easiest weeknight watch of anything on your list.", [
          { id: "las-one", q: "Can I just try one episode?", a: "That is the right way in. The first episode tells you exactly whether the tone is for you, and it costs you half an hour." },
          { id: "las-apple", q: "What else would Apple TV get me?", a: "Gladiator II is sitting locked on your list, plus Severance, Slow Horses and Mayday. EUR 9,99 for a month clears several things at once." }
        ])
      ]
    },

    slowhorses: {
      id: "slowhorses", title: "Slow Horses",
      syn: "MI5's rejects, led by a slob", kind: "Series", length: "6 seasons", ...P.apple, ...art("slow-horses"),
      about: "The spies MI5 could not fire are parked in a dead-end office under Jackson Lamb, who is vile and the best of them. Gary Oldman in the part. Six seasons on Apple TV, which is not in your plan.",
      chips: [
        F("Is this a serious spy show or a funny one?", "Both, and it never picks. The jokes are constant and the deaths are real, which is why it works. It is on Apple TV, which you are not subscribed to, at EUR 9,99 a month.", [
          { id: "slo-oldman", q: "Is Gary Oldman the whole show?", a: "He is the reason to start and not the reason to stay. Jack Lowden and Kristin Scott Thomas carry as much of it. But yes, Lamb is a performance worth the subscription.", who: "Gary Oldman" },
          { id: "slo-bond", q: "So not Bond?", a: "The opposite. Bad coffee, worse offices, paperwork and betrayal. Closer to le Carré with jokes than to anything with gadgets." }
        ]),
        F("Six seasons is a lot. Where do I start?", "Season one, and it is only six episodes. Each season adapts one book and runs short, so the whole thing is less of a commitment than the number suggests.", [
          { id: "slo-len", q: "How long is a season really?", a: "Six episodes of about forty-five minutes, so roughly four and a half hours. You can finish a season in a weekend without trying." },
          { id: "slo-order", q: "Do the seasons connect?", a: "Each case closes, but the characters carry forward and there is a longer story underneath. Watch them in order and it pays off." }
        ]),
        F("Is it grim?", "It is bleak about institutions and warm about people, which keeps it from being a slog. People you like do die, so it is not a comfort watch.", [
          { id: "slo-room", q: "Can I watch this with other people?", a: "Yes, if they will follow the plot. The dialogue is quick and the betrayals matter, so it rewards a room that is actually watching." },
          { id: "slo-swap", q: "Something lighter already in my plan?", a: "The Gentlemen on Netflix has the same crime-with-jokes register and is already paid for. Start there if you would rather not add Apple TV tonight." }
        ])
      ]
    },

    minsec: {
      id: "minsec", title: "Minimum Security",
      syn: "A prison run badly, on purpose", kind: "Series", length: "8 ep", ...P.streamz, ...art("minimum-security"),
      about: "A French workplace comedy set inside Chénoise prison, where the staff are more trouble than the inmates. Audrey Lamy and Jean-Pascal Zadi lead it. Eight episodes on Streamz, which is not in your plan, at EUR 9,99 a month for Basic.",
      chips: [
        F("Is it a comedy or a prison drama?", "A comedy, firmly. The prison is the office and the jokes are about the staff, not the sentences. Eight episodes on Streamz, which you are not subscribed to.", [
          { id: "min-dark", q: "Does it get dark?", a: "It stays light. There is no grim prison drama hiding underneath, which is unusual for the setting and rather the point." },
          { id: "min-office", q: "So it is a workplace sitcom?", a: "Essentially, with bars. A manager holding together a team who should not be working together. The setting does the rest." }
        ]),
        F("Is it in French?", "Yes, with subtitles. It is a French production and the humour is in the dialogue, so it is worth reading rather than dubbing.", [
          { id: "min-sub", q: "How fast are the subtitles?", a: "Quick. Comedy usually is. If reading fast is not for you tonight, I can find something in English instead." },
          { id: "min-belg", q: "Anything Belgian like this?", a: "Zeg Eens Euh on Play is the closest in spirit and free, though it is a game show rather than a sitcom. Jade en de Belgen is the other one." }
        ]),
        F("Is it worth a subscription on its own?", "On its own, probably not. Streamz Basic is EUR 9,99 a month and Zillion is the title that usually justifies it. This makes a better second reason than a first.", [
          { id: "min-combo", q: "What would Streamz get me altogether?", a: "Zillion is the one that matches how you watch, plus the wider Belgian catalogue and this. With Telenet's 5% combination discount, Basic adds EUR 9,49." },
          { id: "min-short", q: "How long are the episodes?", a: "Short, in the half-hour comedy shape. Eight of them makes a very easy week of one a night." }
        ])
      ]
    },

    superman: {
      id: "superman", title: "Superman",
      syn: "The bright one, finally", kind: "Film", length: "2h 10", ...P.netflix, ...art("superman"),
      about: "James Gunn's reset. Clark Kent reporting in Metropolis, trying to square Krypton with Kansas, with Nicholas Hoult's Lex Luthor against him. 2h 10 on Netflix, already in your plan.",
      chips: [
        F("Do I need to have seen the old ones?", "No. This starts the story over and assumes only that you know who Superman is. It plays on Netflix and is already included in your plan.", [
          { id: "sup-dc", q: "Is this connected to the other DC films?", a: "It starts a new run, so nothing before it is required. Supergirl follows from it, and Lanterns sits in the same world." },
          { id: "sup-snyder", q: "Is it like the Zack Snyder ones?", a: "Deliberately not. This one is bright, fast and funny where those were heavy. If the grim version put you off, try this." }
        ]),
        F("Is it good with kids?", "Yes, from about eight. It is a big colourful superhero film with comic-book violence and no real nastiness. Two hours and ten minutes is the only obstacle.", [
          { id: "sup-split", q: "Can we split it over two nights?", a: "You can, though it moves quickly enough that most families get through it. There is a natural break about halfway if you need one." },
          { id: "sup-dog", q: "Is there really a dog?", a: "Krypto, and he is a lot of the film's best moments. If you have a room that wants a dog in it, this is the film." }
        ]),
        F("Is it a big-night film or a Tuesday?", "A Tuesday, comfortably. It is loud but light, two hours and ten, and it does not need your full attention to land. Already in your plan on Netflix.", [
          { id: "sup-loud", q: "Will it wake the house?", a: "It has a big sound mix, so the fights are loud. Worth a volume check before the last act if people are sleeping." },
          { id: "sup-next", q: "What do I watch after it?", a: "Supergirl carries on from it, though that is on HBO Max at EUR 6,99 rather than in your plan. Lanterns is there too." }
        ])
      ]
    },

    bestofbest: {
      id: "bestofbest", title: "Best of the Best",
      syn: "Bollywood-fusion dance, college stakes", kind: "Film", length: "1h 52", ...P.netflix, ...art("best-of-the-best"),
      about: "Two childhood friends join UCLA's Bollywood-fusion dance team and find the road to nationals rougher than expected. Maitreyi Ramakrishnan leads. 1h 52 on Netflix, already in your plan.",
      chips: [
        F("Is this just a dance film?", "It is a comedy about a friendship, with the competition as the frame. The dancing is the spectacle and the falling-out is the story. On Netflix, already in your plan.", [
          { id: "bob-dance", q: "Do I need to like dance films?", a: "It helps, but the shape is a college comedy. If Pitch Perfect worked for you, this works on the same terms." },
          { id: "bob-music", q: "Is the soundtrack the draw?", a: "Bollywood-fusion means Hindi tracks cut against western pop, and the routines are built on it. It is a big part of why it is fun." }
        ]),
        F("Is it a light night?", "Very. One hour fifty-two, funny, and it ends where you expect it to end. A good one for a room that does not want to concentrate.", [
          { id: "bob-room", q: "Good with a group?", a: "Yes. Broad comedy, big set pieces, nothing to follow closely. It is built for a sofa with people on it." },
          { id: "bob-kids", q: "Okay for younger ones?", a: "From about ten. College comedy language and romance, nothing worse. The dancing carries most of the running time." }
        ]),
        F("Anything else like it in my plan?", "Netflix has a deep shelf of this kind of comedy and Maitreyi Ramakrishnan's earlier work is the obvious next step. Ask and I will line a few up.", [
          { id: "bob-lead", q: "Where do I know her from?", a: "Maitreyi Ramakrishnan, who carried Never Have I Ever. Same warmth, bigger production here.", who: "Maitreyi Ramakrishnan" },
          { id: "bob-real", q: "Are these competitions a real thing?", a: "Yes. Bollywood-fusion is a genuine US college circuit with national championships. The film exaggerates the stakes, not the existence." }
        ])
      ]
    },

    whisper: {
      id: "whisper", title: "The Whisper Man",
      syn: "A missing boy, a retired detective", kind: "Film", length: "1h 51", ...P.netflix, ...art("the-whisper-man"),
      about: "A widower's son vanishes, and the only person who can help is his estranged father, the detective who caught the serial killer the case now points back at. Robert De Niro and Michelle Monaghan. 1h 51 on Netflix, already in your plan.",
      chips: [
        F("How dark does this get?", "Dark. A missing child and a serial killer, played straight. Very little is shown, but the subject sits heavily for the full hour and fifty-one. On Netflix, already in your plan.", [
          { id: "whi-kids", q: "Is anything shown on screen?", a: "Almost nothing explicit. The dread does the work. That said, the subject is a child in danger, so it is not one to put on lightly." },
          { id: "whi-sleep", q: "Will it keep me up?", a: "It might. It is a quiet, creeping kind of scary rather than a jumpy one, which tends to linger longer. Not a last-thing-at-night film." }
        ]),
        F("Is it worth it for De Niro?", "He is the reason most people press play, and he is good in it. But Michelle Monaghan's detective is as much of the film, and it is the father-and-son strand that holds it together.", [
          { id: "whi-deniro", q: "Is this a late-career coast?", a: "No. It is a proper part, quiet and worn, and he plays the father before the legend.", who: "Robert De Niro" },
          { id: "whi-scott", q: "Adam Scott in a thriller?", a: "Against type and it works. If you know him from comedy, this is a different register entirely." }
        ]),
        F("Is it a book first?", "Yes, Alex North's novel of the same name. The film follows it closely enough that reading first spoils it, and not reading costs you nothing.", [
          { id: "whi-end", q: "Does it actually resolve?", a: "It does, properly, within the hour and fifty-one. No sequel bait and no ambiguity dropped on you at the end." },
          { id: "whi-like", q: "What else is like this in my plan?", a: "The Gentlemen is crime but far lighter. For this exact register you are closer to the Nordic thrillers on Netflix — ask and I will find you one." }
        ])
      ]
    },

    supergirl: {
      id: "supergirl", title: "Supergirl",
      syn: "Krypton's angrier survivor", kind: "Film", length: "1h 48", ...P.hbo, ...art("supergirl"),
      about: "Kara Zor-El remembers Krypton, which Clark never did, and that makes her a harder character. Milly Alcock in the part, with Jason Momoa alongside. 1h 48 on HBO Max, which is not in your plan.",
      chips: [
        F("Do I need to see Superman first?", "It helps but it is not required. This follows from it and shares a world, though the story is hers. Superman is on Netflix in your plan; this is on HBO Max, which you are not subscribed to, at EUR 6,99 a month.", [
          { id: "sgl-order", q: "So Superman then this?", a: "That is the order that makes most sense, and the first one is already paid for. Watch it this week and add HBO Max when you want the follow-up." },
          { id: "sgl-both", q: "Is one month enough for both?", a: "More than enough for this at one hour forty-eight, and HBO Max also has Dune: Part Two, The Last of Us and Barbie waiting on your list." }
        ]),
        F("Is it as light as Superman?", "No, and deliberately. Kara survived Krypton and remembers it, so the film is angrier and colder. Still a big adventure, but the tone is harder.", [
          { id: "sgl-kids", q: "Still okay for kids?", a: "Older ones. Around twelve. The violence is comic-book but the grief is real and the film does not soften it the way Superman does." },
          { id: "sgl-alcock", q: "Who is playing her?", a: "Milly Alcock, who most people know from House of the Dragon. Very different part, same ability to look like she is about to do something unwise.", who: "Milly Alcock" }
        ]),
        F("Is it a big-screen kind of film?", "It is built that way, but it holds up at home. One hour forty-eight, a lot of it in space, and the sound mix is doing real work.", [
          { id: "sgl-sound", q: "Worth headphones?", a: "If you have them, yes. Much of the spectacle is in the audio, and it flattens badly on a TV speaker." },
          { id: "sgl-wait", q: "Should I wait until I have more to watch on HBO Max?", a: "That is the cheaper plan. Save it up with Dune: Part Two, The Last of Us, Barbie and Lanterns, then take one EUR 6,99 month and clear them." }
        ])
      ]
    },

    mandalorian: {
      id: "mandalorian", title: "The Mandalorian and Grogu",
      syn: "The helmet and the small one, on film", kind: "Film", length: "2h 12", ...P.disney, ...art("mandalorian-and-grogu"),
      about: "Din Djarin and Grogu on a proper film budget, in a galaxy where the Empire has fallen and the warlords have not. Jon Favreau directing. 2h 12 on Disney+, already in your plan.",
      chips: [
        F("Do I need to have watched the series?", "It helps, but the film is built as a way in. You need to know that the man in the helmet is raising the small green one, and it tells you that in the first ten minutes. On Disney+, already in your plan.", [
          { id: "man-series", q: "Should I watch the series first anyway?", a: "Three seasons is a lot before a film. If you have the time it pays off, but the film does not require it, and it is on the same subscription." },
          { id: "man-star", q: "Do I need the Star Wars films?", a: "No. Knowing the Empire lost is enough. This sits after the original trilogy and keeps its own company." }
        ]),
        F("Is it good with kids?", "Very. Grogu is the reason this works with a young room, and the violence is blasters and armour rather than anything nasty. Two hours twelve is the only ask.", [
          { id: "man-age", q: "How young?", a: "Six and up manages it. There are tense moments and a lot of shooting, but nothing that lands hard afterwards." },
          { id: "man-split", q: "Can we do it over two nights?", a: "Yes, and there is a clean break about halfway. At 2h 12 with young ones that is often the better plan." }
        ]),
        F("Is it a proper film or a long episode?", "A proper film. Bigger scale, one story, and it finishes. Jon Favreau made it to work for people who have never opened Disney+ for Star Wars before.", [
          { id: "man-pascal", q: "Is Pedro Pascal actually in it?", a: "Yes, and out of the helmet more than in the series. Jeremy Allen White and Sigourney Weaver are the new faces alongside him.", who: "Pedro Pascal" },
          { id: "man-next", q: "What next if the room likes it?", a: "The series, all three seasons, on the same Disney+ subscription you already have. Start at season one." }
        ])
      ]
    },

    prada: {
      id: "prada", title: "The Devil Wears Prada 2",
      syn: "Miranda Priestly, still terrifying", kind: "Film", length: "1h 59", ...P.disney, ...art("devil-wears-prada-2"),
      about: "Andy comes back to Runway, Miranda is fighting for the magazine's survival, and Emily now runs the luxury brand holding the money. Streep, Hathaway, Blunt and Tucci all back. 1h 59 on Disney+, already in your plan.",
      chips: [
        F("Do I need to rewatch the first one?", "Not really. It reintroduces everyone in the first twenty minutes. A rewatch makes the reunions land harder, but the plot does not need it. Both sit on subscriptions rather than purchases, and this one is on Disney+ in your plan.", [
          { id: "pra-first", q: "How much has changed since the first?", a: "The magazine industry, mostly, which is the film's subject. Andy has a career, Emily has money, Miranda has a problem. That is the setup." },
          { id: "pra-cast", q: "Is everyone actually back?", a: "Streep, Hathaway, Blunt and Tucci, yes. That is the whole reason this exists and the film knows it." }
        ]),
        F("Is it as funny as the original?", "Close. The jokes are sharper about the industry and gentler about the people, which is what happens when a cast comes back twenty years later. Meryl Streep still gets the best lines.", [
          { id: "pra-mean", q: "Is Miranda still cruel?", a: "Yes, but with something at stake now. The cruelty has a reason underneath it this time, and the film lets you see it.", who: "Meryl Streep" },
          { id: "pra-emily", q: "Is Emily the best part again?", a: "Emily Blunt gets more room than last time and takes all of it. For a lot of people she is the reason to watch this one.", who: "Emily Blunt" }
        ]),
        F("Is it a weeknight or a proper night?", "A weeknight. Just under two hours, funny, and it does not ask much. Good with company and already in your plan on Disney+.", [
          { id: "pra-room", q: "Good with people who haven't seen the first?", a: "Yes. It carries them. They will miss a few callbacks, but nothing that matters to following it." },
          { id: "pra-double", q: "Could we do both in a night?", a: "Four hours is a long sit, but it is a good double bill if the evening is free. The first one is the shorter of the two." }
        ])
      ]
    },

    mayday: {
      id: "mayday", title: "Mayday",
      syn: "Cold War, wrong side, worst partner", kind: "Film", length: "1h 51", ...P.apple, ...art("mayday"),
      about: "A US Navy pilot goes down behind enemy lines on a secret Cold War run and has to get out with an eccentric ex-KGB agent. Ryan Reynolds and Kenneth Branagh. 1h 51 on Apple TV, which is not in your plan.",
      chips: [
        F("Is this an action film or a comedy?", "Both, in the buddy shape. Reynolds does what Reynolds does and Branagh plays it completely straight against him, which is where it gets funny. On Apple TV, which you are not subscribed to, at EUR 9,99 a month.", [
          { id: "may-rey", q: "Is it just Ryan Reynolds being Ryan Reynolds?", a: "Largely, and that is the pitch. If the fast, sarcastic version of him is a yes for you, this is a straightforward good time.", who: "Ryan Reynolds" },
          { id: "may-branagh", q: "Branagh in a comedy?", a: "As the straight man, and he commits. The mismatch is the whole engine of the film." }
        ]),
        F("Do I need to know the history?", "No. Cold War, behind enemy lines, get home. That is all the setup it gives you and all you need. It is an adventure film wearing a history coat.", [
          { id: "may-real", q: "Is it based on anything real?", a: "Not a specific mission. The setting is real, the story is invented, and the film does not pretend otherwise." },
          { id: "may-tense", q: "Is it actually tense?", a: "In stretches. It takes the danger seriously enough for the jokes to land, then lets the pressure off. Nothing grim." }
        ]),
        F("Worth adding Apple TV for?", "Not on its own at EUR 9,99. But Gladiator II is locked on your list there, plus Severance, Slow Horses and Ted Lasso. Together that makes a month worth taking.", [
          { id: "may-month", q: "What would I get through in that month?", a: "This at 1h 51, Gladiator II, and a season of Slow Horses at about four and a half hours. That is a full month for one payment." },
          { id: "may-alt", q: "Anything like this already in my plan?", a: "Superman on Netflix is the closest for loud and light. Not the same film, but it scratches a similar evening." }
        ])
      ]
    },

    youme: {
      id: "youme", title: "You+Me - Against the World",
      syn: "Two students, one secret, one film", kind: "Film", length: "1h 34", ...P.prime, ...art("you-me-against-the-world"),
      about: "Alma is supposed to be studying law and is secretly making films. Vadim is the trouble she was not planning on. Someone is watching both of them. 1h 34 on Prime Video, which is not in your plan.",
      chips: [
        F("Is this just a teen romance?", "That is the shape, with a thriller underneath it. Two students forced to work together, then something older and uglier surfacing around them. It is on Prime Video, which you are not subscribed to, at EUR 5,99 a month.", [
          { id: "ym-thrill", q: "How much thriller is in it?", a: "Enough to change the last half hour. It starts as a romance and does not stay one, which is the reason to sit through the setup." },
          { id: "ym-age", q: "Who is this for?", a: "Teens and up. The leads are eighteen and twenty and the film is pitched at that audience, though the thriller turn plays for anyone." }
        ]),
        F("Is it in English?", "It is a French production, so subtitles or a dub. At an hour thirty-four it is a short read either way.", [
          { id: "ym-short", q: "Is an hour thirty-four the whole thing?", a: "Yes, and it is the reason this is an easy weeknight. Shorter than almost everything else on your list." },
          { id: "ym-dub", q: "Should I use the dub?", a: "Fine for this one. It is a plot-driven film rather than a performance piece, so a dub costs you less than it would elsewhere." }
        ]),
        F("Is it worth a subscription?", "As the only reason, no. But Prime Video is the cheapest of them at EUR 5,99, and Reacher's four seasons and Neagley are on the same subscription.", [
          { id: "ym-with", q: "What else is on there?", a: "Reacher, four seasons of it, and the Neagley spin-off. Those are the titles that make the EUR 5,99 worth it, with this as a bonus." },
          { id: "ym-plan", q: "Anything in my plan for the same evening?", a: "Best of the Best on Netflix if you want something light and young, and it is already paid for." }
        ])
      ]
    },

    residentevil: {
      id: "residentevil", title: "Resident Evil",
      syn: "One night, one city, gone wrong", kind: "Film", length: "1h 35", ...P.netflix, ...art("resident-evil"),
      about: "Zach Cregger's take: a medical courier on an ordinary night shift as the city comes apart around him. Austin Abrams and Paul Walter Hauser. 1h 35 on Netflix, already in your plan.",
      chips: [
        F("How scary is it?", "Properly scary. Cregger made Barbarian, and this is horror rather than an action film with monsters in it. An hour thirty-five, tight, and it does not let up much. On Netflix, already in your plan.", [
          { id: "re-gore", q: "Is it gory?", a: "Yes, in places. It is a Resident Evil film, so infection and bodies come with it. The dread does more work than the blood, but the blood is there." },
          { id: "re-alone", q: "Should I watch this alone?", a: "Only if you like that. It is a good one for company, and at an hour thirty-five it does not outstay the tension." }
        ]),
        F("Do I need to know the games?", "No. It is a fresh start rather than an adaptation of a particular game, and it explains its own night. Players will catch references, everyone else loses nothing.", [
          { id: "re-films", q: "What about the older films?", a: "Ignore them. This shares a name and nothing else. No homework, no continuity." },
          { id: "re-games", q: "Is it faithful at all?", a: "In feel more than plot: a city, an outbreak, ordinary people out of their depth. That is the part the games are known for." }
        ]),
        F("Is it a weeknight film?", "It is short enough at an hour thirty-five, but it is not a wind-down. If tomorrow is early, something else is the better call and I can find you one.", [
          { id: "re-after", q: "What would I watch after to come down?", a: "Best of the Best on Netflix, or The Gentlemen if you want something with jokes. Both already in your plan." },
          { id: "re-cregger", q: "Who is Zach Cregger?", a: "He made Barbarian, which is the closest thing to a warning label this film has. Same instinct for going somewhere you did not expect." }
        ])
      ]
    },

    odyssey: {
      id: "odyssey", title: "The Odyssey",
      syn: "Ten years home, in one sitting", kind: "Film", length: "2h 53", ...P.disney, ...art("the-odyssey"),
      about: "Christopher Nolan on Homer. Odysseus taking ten years to get back from Troy, with the gods and the monsters in his way. Matt Damon, Tom Holland, Anne Hathaway, Robert Pattinson. 2h 53 on Disney+, already in your plan.",
      chips: [
        F("Do I need to know the myth?", "No. It tells the story from the start, and most of it is already in your head from school. The point is the telling, not the surprise. It is on Disney+, already in your plan.", [
          { id: "ody-book", q: "Should I read it first?", a: "No. The poem is three thousand years old and the film is not trying to be a translation. Arrive knowing nothing and it works." },
          { id: "ody-know", q: "Do I at least need to know Troy?", a: "It opens after the war, so knowing there was one is enough. The film fills in what matters." }
        ]),
        F("Is it a big-night film?", "Very much. Two hours fifty-three, Nolan, and built to be watched properly. Not one for a Tuesday with a laptop open.", [
          { id: "ody-split", q: "Can I split it over two nights?", a: "You can, and the voyage gives you natural stopping points. But it is built as one sit and loses something broken up." },
          { id: "ody-loud", q: "Is the sound going to be a problem?", a: "It is a Nolan mix, so the quiet is very quiet and the loud is very loud. Headphones if the house is asleep." }
        ]),
        F("Is it hard to follow like his other films?", "No. This is the most straightforward story he has told: a man trying to get home, in order. The difficulty in Nolan's other work is the structure, and there is none of that here.", [
          { id: "ody-nolan", q: "So not like Tenet?", a: "Nothing like it. One timeline, one journey. The ambition is in the scale rather than in making you work." },
          { id: "ody-cast", q: "Is Tom Holland the son?", a: "Telemachus, yes, with Matt Damon as Odysseus and Anne Hathaway and Robert Pattinson around them. A heavy cast for a straight story.", who: "Matt Damon" }
        ])
      ]
    },

    spiderman: {
      id: "spiderman", title: "Spider-Man: Brand New Day",
      syn: "Nobody remembers him now", kind: "Film", length: "2h 25", ...P.disney, ...art("spider-man-brand-new-day"),
      about: "Peter Parker doing the job full-time in a city that has forgotten who he is, while his friends move on without him. Tom Holland, Zendaya, Mark Ruffalo and Jon Bernthal. 2h 25 on Disney+, already in your plan.",
      chips: [
        F("Do I need the earlier Spider-Man films?", "One thing helps: the world forgot Peter Parker at the end of the last one, and this starts there. Beyond that it re-establishes itself. On Disney+, already in your plan.", [
          { id: "spi-which", q: "Which one is the one before?", a: "No Way Home, which ends with everyone forgetting him. That single fact is the whole of what this film assumes." },
          { id: "spi-mcu", q: "Do I need the rest of Marvel?", a: "No. Mark Ruffalo turns up, but the story is Peter's and it stays in the city. You can watch this cold." }
        ]),
        F("Is it lighter or darker than the others?", "Darker. He is alone, the tone is street-level, and Jon Bernthal being in it tells you roughly where it is going. Still funny, but it is the heaviest of them.", [
          { id: "spi-kids", q: "Still okay for kids?", a: "Around ten and up. The violence is harder than the earlier ones and the loneliness is the actual subject, which is a lot for a young room." },
          { id: "spi-bern", q: "Is Bernthal playing the Punisher?", a: "That is the part he is known for and the reason this reads harder than previous Spider-Man films. It sets the register." }
        ]),
        F("Is two and a half hours too long for a weeknight?", "It is on the edge. Two hours twenty-five moves quickly, but it is a proper evening. Already in your plan on Disney+, so there is no rush to it.", [
          { id: "spi-split", q: "Does it break cleanly in half?", a: "There is a turn about halfway that works as a stopping point. Not ideal, but it will not ruin the film." },
          { id: "spi-room", q: "Good with company?", a: "Yes, if they are watching. The plot is clear but the emotional thread is the point, so it is better than background." }
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
