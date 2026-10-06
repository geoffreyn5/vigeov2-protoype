// The questions a title is asked, shared by the reel feed on Home and the title
// page a poster opens, so the two never drift apart. Edit them here.
(function (global) {
  const REEL_QUESTIONS = {
    "Wednesday": [
      {q: "How scary is it?", a: "Spooky rather than scary. Gothic atmosphere and a few jump scares, more teen drama than horror.",
        follow: [
          {id: "wed-horror", q: "I don’t like horror. Is it okay for me?", a: "Yes. It’s deadpan comedy with a murder mystery."},
          {id: "wed-tone", q: "Is it more comedy or more mystery?", a: "Both, in about equal parts."}
        ]},
      {q: "Give me a recap of season 1", a: "Wednesday is sent to Nevermore, a boarding school for outcasts, and ends up solving a monster mystery with help from Thing, the walking hand. By the end she has saved the school and gone viral for one dance scene.",
        follow: [
          {id: "wed-s2", q: "Do I need season 1 for season 2?", a: "It helps. Season 1 sets up Nevermore and the characters."},
          {id: "wed-jenna", q: "Who made it?", a: "Tim Burton directed several episodes.", who: "Jenna Ortega"}
        ]},
      {q: "Is it okay for a 12-year-old?", a: "Yes, twelve is about right. There are murders and a monster, but it isn’t gory.",
        follow: [
          {id: "wed-sofa", q: "Is it okay for someone who scares easily?", a: "Mostly. Watch episode one together. If that’s fine, the rest will be too."},
          {id: "wed-one", q: "How long is an episode?", a: "About 50 minutes, on Netflix."}
        ]},
      {q: "Do I need to know the Addams Family?", a: "No. The show stands on its own. The 90s films and the 60s series are there if you’re curious.",
        follow: [
          {id: "wed-more", q: "Who plays Wednesday?", a: "Jenna Ortega.", who: "Jenna Ortega"}
        ]}
    ],
    "Dune: Part Two": [
      {q: "Do I need to see Part One first?", a: "Yes, ideally. Part Two assumes you know the characters and the politics. If you’ve seen it before, a recap can be enough.",
        follow: [
          {id: "dune-names", q: "How long is Part One?", a: "About 2h 35. It’s on HBO Max too."},
          {id: "dune-ok", q: "Can I follow it without Part One?", a: "The battles, yes. The politics and the relationships are harder to follow."}
        ]},
      {q: "Recap Part One for me", a: "House Atreides takes over the desert planet Arrakis, source of the spice everyone fights over. It’s a trap: the Harkonnens retake it in one night, Duke Leto is killed, and Paul and his mother escape into the desert to join the Fremen. Part Two starts there.",
        follow: [
          {id: "dune-part-short", q: "Who’s who again?", a: "Paul (Timothée Chalamet) is the young duke, Jessica (Rebecca Ferguson) is his mother, and Chani (Zendaya) is a Fremen fighter. The Harkonnens are the enemy."},
          {id: "dune-skip", q: "What is the spice?", a: "A substance found only on Arrakis. It’s needed for space travel, which is why everyone fights over the planet."}
        ]},
      {q: "What’s it about, without spoilers?", a: "A young duke who has lost everything joins the desert people who may become his army. Everyone, himself included, wonders if he’s a saviour or a weapon.",
        follow: [
          {id: "dune-split", q: "How violent is it?", a: "Lots of big battles, but little blood."},
          {id: "dune-stress-wk", q: "Is there a Part Three?", a: "Yes, a third film is in the works, based on the book Dune Messiah."}
        ]},
      {q: "How long is it?", a: "2h 46. You’re already 18% in.", posterTitles: ["Gladiator II"],
        follow: [
          {id: "dune-tonight", q: "Is there a good place to split it?", a: "Yes. The time jump halfway through works as a break."},
          {id: "dune-wk-room", q: "Where can I watch it?", a: "On HBO Max, which you don’t have yet."}
        ]}
    ],
    "Undercover": [
      {q: "How violent does it get?", a: "Tense rather than graphic. The tension comes from the double life, not from gore.",
        follow: [
          {id: "uc-room", q: "Can I watch it with others?", a: "Yes, if they like crime drama. Episodes run about 50 minutes."},
          {id: "uc-narcos", q: "Is it like Narcos?", a: "Similar subject: drugs, undercover work and double lives. But it’s Belgian-Dutch and mostly set on a campsite."}
        ]},
      {q: "Should I watch Ferry before this?", a: "No. Undercover first, then Ferry. You’re in season 3, so keep going.", posterTitles: ["Undercover", "Ferry"],
        follow: [
          {id: "uc-order", q: "Can I watch Ferry after the series?", a: "Yes, that order works well."},
          {id: "uc-s4", q: "When is season 4 out?", a: "Thursday, on Netflix."}
        ]},
      {q: "Is it based on a true story?", a: "Loosely. Police really did run an undercover operation from a campsite on the Belgian-Dutch border against an XTC lab. The characters are fiction.",
        follow: [
          {id: "uc-ferry", q: "Who is Ferry?", a: "The drug boss at the centre of Undercover, played by Frank Lammers. The film Ferry tells his earlier story.", who: "Ferry"},
          {id: "uc-lang", q: "Is it in Dutch?", a: "Yes, Flemish and Dutch, with subtitles."}
        ]}
    ],
    "Ferry": [
      {q: "How violent is it?", a: "Hard crime, but not graphic. Drugs, loyalty, and a man building his name.",
        follow: [
          {id: "ferry-week", q: "How long is it?", a: "1h 46, with a proper ending."},
          {id: "ferry-fl", q: "Any Flemish crime series like it?", a: "Assisen and De Bende van Jan de Lichte, but both need another app. Undercover is already in your plan."}
        ]},
      {q: "Do I need to have seen Undercover?", a: "No. The film has its own story and ending. Knowing Undercover adds a layer.",
        follow: [
          {id: "ferry-who", q: "Who is Ferry?", a: "Ferry Bouman, the drug boss from Undercover. The film shows how he became that man.", who: "Ferry"},
          {id: "ferry-alone", q: "Who plays him?", a: "Frank Lammers, the same actor as in the series."}
        ]},
      {q: "Should I watch Ferry or Undercover first?", a: "Undercover first. The film works better once you know the character. You’re in season 3, so finish the series, then watch Ferry.", posterTitles: ["Undercover", "Ferry"],
        follow: [
          {id: "ferry-after", q: "Where can I watch it?", a: "On Netflix, included in your plan.", who: "Ferry"},
          {id: "ferry-series", q: "Is there a Ferry series too?", a: "Yes, also on Netflix. It picks up after the film."}
        ]}
    ],
    "Oppenheimer": [
      {q: "How close is it to the real history?", a: "Close on the main events. Los Alamos, the Trinity test and the 1954 security hearing all happened. The private conversations are the film’s interpretation.",
        follow: [
          {id: "opp-hearing", q: "What was the 1954 hearing about?", a: "Whether Oppenheimer was a security risk. His clearance was taken away in a closed hearing, which takes up much of the second half."},
          {id: "opp-feel", q: "Is it based on a book?", a: "Yes, American Prometheus, the biography by Kai Bird and Martin J. Sherwin."}
        ]},
      {q: "Do I need to understand the science?", a: "No. The film is about ambition, guilt and politics. The physics stays in the background.",
        follow: [
          {id: "opp-cast", q: "Who’s in it?", a: "Cillian Murphy as Oppenheimer, with Robert Downey Jr., Emily Blunt and Matt Damon."},
          {id: "opp-split", q: "How long is it?", a: "Three hours. Around the two-hour mark is a good place to split it."}
        ]},
      {q: "Is it okay for teenagers?", a: "For older teens, yes. It’s mostly talk and politics, with some nudity and a sex scene. Younger kids would get lost in the hearing scenes.",
        follow: [
          {id: "opp-barbie", q: "Is it linked to Barbie?", a: "Only by release date. They came out the same weekend, so people watched them as a double bill."},
          {id: "opp-just", q: "Why are some scenes in black and white?", a: "Those scenes show events from Lewis Strauss’s point of view. The colour scenes are Oppenheimer’s."}
        ]}
    ],
    "Barbie": [
      {q: "Is it linked to Oppenheimer?", a: "Only by release date. Both opened on the same weekend in 2023, so people watched them as a double bill. The stories have nothing to do with each other.",
        follow: [
          {id: "barb-punch", q: "How long is the double bill?", a: "About five hours: 1h 54 for Barbie and 3h for Oppenheimer."},
          {id: "barb-sofa", q: "Which one do people watch first?", a: "Usually Oppenheimer, so the evening ends on the lighter film."}
        ]},
      {q: "Is it okay for a 9-year-old?", a: "Yes. There’s nothing unsuitable. Kids enjoy the colour, and the jokes aimed at adults go over their heads.",
        follow: [
          {id: "barb-kids", q: "Is there anything scary in it?", a: "No. It’s a bright comedy. There’s one emotional scene near the end, nothing more."},
          {id: "barb-length", q: "How long is it?", a: "1h 54, on HBO Max. You don’t have HBO Max yet, so you’d need to add it first."}
        ]},
      {q: "What’s it about?", a: "Barbie’s perfect life in Barbie Land starts going wrong, so she travels to the real world to find out why. It starts as a bright comedy and gets more thoughtful.", posterTitles: ["Zeg Eens Euh", "Jade en de Belgen"],
        follow: [
          {id: "barb-double", q: "Who’s in it?", a: "Margot Robbie as Barbie and Ryan Gosling as Ken. Greta Gerwig directed it."},
          {id: "barb-only", q: "Does it get serious?", a: "In places. There’s one emotional scene near the end, but most of the film is funny and light."}
        ]}
    ],
    "Zillion": [
      {q: "Do I need to know the real story?", a: "No. The film tells it: the Antwerp mega-club, the man who built it, the money and the crash.",
        follow: [
          {id: "zill-true", q: "Was Zillion a real club?", a: "Yes, a real club in Antwerp. The film tightens the events, so it’s a drama, not a documentary."},
          {id: "zill-club", q: "Who is the film about?", a: "Frank Verstraeten, the owner who built the club and lost everything, including time in court and prison."}
        ]},
      {q: "How explicit is it?", a: "Very. Drugs, sex and 90s excess. Wait until the kids are in bed.",
        follow: [
          {id: "zill-room", q: "How long is it?", a: "About two hours."},
          {id: "zill-lock", q: "Where can I watch it?", a: "On Streamz, which you don’t have yet. It’s €9,99 a month."}
        ]},
      {q: "Any Belgian films like this?", a: "Ferry is the closest, on Netflix in your plan. Same kind of rise-and-fall story, 1h 46.", posterTitles: ["Ferry", "Undercover"],
        follow: [
          {id: "zill-close", q: "What can I watch tonight instead?", a: "Ferry, included with Netflix."},
          {id: "zill-belg", q: "Anything Flemish that isn’t crime?", a: "Alex Agnew for stand-up, or Jade en de Belgen for comedy."}
        ]}
    ],
    "Gladiator II": [
      {q: "Do I need to have seen the first Gladiator?", a: "Not strictly. The story stands alone, but Maximus from the first film matters throughout. It means more if you know him.",
        follow: [
          {id: "glad-ghost", q: "Who’s in it?", a: "Paul Mescal, Pedro Pascal, Denzel Washington and Connie Nielsen. Ridley Scott directed both films."}
        ]},
      {q: "How violent is it?", a: "Quite violent, with frequent battles and visible injuries. Not one for kids.",
        follow: [
          {id: "glad-room", q: "How long is it?", a: "2h 28."}
        ]},
      {q: "Where can I watch it?", a: "On Apple TV, which you don’t have yet. It’s €9,99 a month.",
        follow: [
          {id: "glad-plan", q: "What else is on Apple TV?", a: "Severance, Slow Horses, Ted Lasso and Mayday."}
        ]}
    ],
    "Wicked": [
      {q: "Do I need to know the musical?", a: "No. The story works on its own. If ‘Defying Gravity’ rings a bell, that’s a bonus.",
        follow: [
          {id: "wk-songs", q: "Who’s in it?", a: "Cynthia Erivo as Elphaba and Ariana Grande as Glinda."}
        ]},
      {q: "How much of it is singing?", a: "A lot. It’s a full musical, with spoken scenes in between.",
        follow: [
          {id: "wk-skip", q: "How long is it?", a: "2h 40."}
        ]},
      {q: "Is this only part one?", a: "Yes. It’s the first half of the story. Wicked: For Good finishes it.",
        follow: [
          {id: "wk-end", q: "Does it end on a cliffhanger?", a: "Yes, on purpose. The story continues in the second film."}
        ]}
    ],
    "Deadpool & Wolverine": [
      {q: "How crude is it?", a: "Very. Crude jokes, comic gore and Deadpool talking to the camera the whole time. Not a family film.",
        follow: [
          {id: "dp-kids", q: "Is it okay for teenagers?", a: "From about 16. The gore and the language are strong. Inside Out 2 or Barbie are the family options."}
        ]},
      {q: "Do I need to know the other Marvel films?", a: "No. Knowing who Deadpool and Wolverine are is enough. Marvel fans get more out of the cameos.",
        follow: [
          {id: "dp-cameo", q: "Do I need the earlier Deadpool films?", a: "It helps a little, but the film catches you up."}
        ]},
      {q: "Who’s in it?", a: "Ryan Reynolds as Deadpool and Hugh Jackman as Wolverine.",
        follow: [
          {id: "dp-date", q: "Are there a lot of cameos?", a: "Yes, and some are surprises, so we won’t list them."}
        ]}
    ],
    "Challengers": [
      {q: "Do I need to like tennis?", a: "No. Tennis is the setting. The film is about three people and their rivalry.",
        follow: [
          {id: "ch-tennis", q: "Who’s in it besides Zendaya?", a: "Josh O’Connor and Mike Faist. Luca Guadagnino directed it."}
        ]},
      {q: "How steamy is it?", a: "Charged rather than explicit. Probably not one to watch with your parents.",
        follow: [
          {id: "ch-shy", q: "Is it okay for teenagers?", a: "From about 16. The language is strong and the sexual tension runs through the whole film."}
        ]},
      {q: "Does it work for a date night?", a: "It can. It’s tense, flirty and a bit mean, and runs 2h 11.",
        follow: [
          {id: "ch-wrong", q: "Something lighter for a date?", a: "Barbie is the lighter pick."}
        ]}
    ],
    "Inside Out 2": [
      {q: "Is it just for kids?", a: "No. Kids get the adventure, adults get a sharp film about anxiety and growing up.",
        follow: [
          {id: "io-age", q: "What age is it for?", a: "Any child who managed the first film. Anxiety is talked about, never used to scare."}
        ]},
      {q: "Do I need the first film?", a: "It helps. The first film explains how the emotions and Headquarters work, but you’d follow this one anyway.",
        follow: [
          {id: "io-fuzzy", q: "What happens in the first film?", a: "Riley moves to a new city at eleven, and her emotions, led by Joy, struggle to cope. Joy and Sadness get lost in her mind and learn that both of them matter."}
        ]},
      {q: "Will it make me cry?", a: "Possibly. It’s about growing up and anxiety, and it often hits adults hardest.",
        follow: [
          {id: "io-night", q: "How long is it?", a: "1h 36."}
        ]}
    ]
  };

  global.ReelQuestions = REEL_QUESTIONS;
})(window);
