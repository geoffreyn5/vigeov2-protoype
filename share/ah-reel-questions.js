// The questions a title is asked, shared by the reel feed on Home and the title
// page a poster opens, so the two never drift apart. Edit them here.
(function (global) {
  const REEL_QUESTIONS = {
    "Wednesday": [
      {q: "How scary does it get?", a: "Spooky rather than scary. Gothic atmosphere, mild jump scares, more teen drama than horror. The first episode tells you everything about the tone.",
        follow: [
          {id: "wed-horror", q: "I don’t like horror. Is this still okay for me?", a: "Yes. If jump-scare horror is what you avoid, this isn’t that. It’s deadpan comedy with a murder mystery underneath."},
          {id: "wed-tone", q: "Is this more comedy or more murder?", a: "Both, deliberately: deadpan comedy first, with a real murder case running through it. Expect jokes and bodies in equal measure."}
        ]},
      {q: "Give me a recap of season 1", a: "Wednesday is sent to Nevermore, a boarding school for outcasts, and ends up solving a monster mystery nobody wants solved. Helped by Thing, the walking hand. By the end she has saved the school, gone viral for one dance scene, and learned to trust almost no one.",
        follow: [
          {id: "wed-s2", q: "Does season two need season one in my head?", a: "You’ll follow season 2 fine, but season 1 sets up Nevermore and the characters. Worth a rewatch if the family lore has gone fuzzy."},
          {id: "wed-jenna", q: "Where do I know her from?", a: "Jenna Ortega. You’ve likely seen her in other films, but Wednesday is the role that made her a star. No need to know the old Addams Family films first.", who: "Jenna Ortega"}
        ]},
      {q: "Is it okay for a 12-year-old?", a: "Yes, twelve is about right. There are murders and a monster, but it’s deadpan rather than gory. Watch the first episode together to be sure it suits them.",
        follow: [
          {id: "wed-sofa", q: "Can I watch this with someone who’s easily spooked?", a: "Mostly, yes. The scares are atmosphere more than shocks. Watch episode one with them. If that’s too much, the rest will be too."},
          {id: "wed-one", q: "Is one episode enough for tonight?", a: "Yes. Episodes run for about 50 minutes, so watching one still feels complete. It is included with Netflix."}
        ]},
      {q: "Are there other Addams Family films or shows?", a: "Yes. The two 90s films are the classics, plus the original 60s series and several animated versions. None are required for this show. It stands on its own.",
        follow: [
          {id: "wed-more", q: "What else has she been in that’s this weird?", a: "Wednesday is her defining weird role. Jenna Ortega’s other work leans horror rather than gothic comedy. I can list those too.", who: "Jenna Ortega"}
        ]}
    ],
    "Dune: Part Two": [
      {q: "Do I need to see Part One first?", a: "Ideally, yes. Part Two assumes you know the characters and the politics. If you’ve seen it and just need a refresher, ask me for a recap instead.",
        follow: [
          {id: "dune-names", q: "What if I barely remember the names?", a: "Then watch Part One first. This film assumes you know the houses and the prophecy. A recap covers the events, but not two hours of world-building."},
          {id: "dune-ok", q: "I’ll be fine. I just want the war.", a: "You can start with Part Two if you mainly want the battles and sandworms. Some of the politics and character relationships will be harder to follow without Part One."}
        ]},
      {q: "Recap Part One for me", a: "House Atreides is given the desert planet Arrakis, source of the spice everyone fights over. But it’s a trap. The Harkonnens retake it in one night, Duke Leto is killed, and Paul and his mother escape into the desert to join the Fremen. That’s exactly where Part Two picks up.",
        follow: [
          {id: "dune-part-short", q: "Is Part One a shorter night than this?", a: "Part One is about 2h 35. Barely shorter. If you need the setup, watch it first and save Part Two for a free evening."},
          {id: "dune-skip", q: "What if I just wanted spectacle, not prophecy?", a: "You’ll get plenty of worms and war either way. But the prophecy is the plot, so if it starts to itch, Part One is where it’s explained."}
        ]},
      {q: "What’s it about, without spoilers?", a: "A young duke who has lost everything joins the desert people who might become his army. And everyone, himself included, wonders whether he’s a liberator or a weapon. Sandworms, politics, and one very tense family dinner.",
        follow: [
          {id: "dune-split", q: "Can I split it if 2h 46 is too much?", a: "Yes. The mid-film time jump is a natural break point. Two evenings of about 1h 20 instead of one long sit."},
          {id: "dune-stress-wk", q: "So not a Tuesday after work?", a: "At 2h 46 it’s a tough weeknight film. Split it at the time jump, or keep it for Friday."}
        ]},
      {q: "Show me more epic sci-fi like this", a: "Part One is the closest match, but it also requires HBO Max. If you want something epic that is already included, Squid Game on Netflix is the best alternative. Gladiator II needs Apple TV.", posterTitles: ["Gladiator II"],
        follow: [
          {id: "dune-tonight", q: "I started it already. Should I just finish?", a: "If you have the evening, yes. You’re only 18% in, so tonight is more a fresh start than a finish."},
          {id: "dune-wk-room", q: "Is this okay to watch with other people around?", a: "It needs your full attention and runs for 2h 46, so I would save it for another time. A shorter film is a better choice while people are around."}
        ]}
    ],
    "Undercover": [
      {q: "How violent or dark does it get?", a: "Tense rather than graphic. The dread comes from the double life, not gore. Think Narcos, but on a Limburg campsite.",
        follow: [
          {id: "uc-room", q: "Is this okay to watch with other people around?", a: "It works for a group that likes crime drama, but it is not a light background show. Episodes run for about 50 minutes."},
          {id: "uc-narcos", q: "So it’s Narcos, but camping?", a: "Pretty much. It has the drugs, undercover work and double lives of Narcos, but the story is Belgian-Dutch and much of it takes place at a campsite."}
        ]},
      {q: "Should I watch Ferry before this?", a: "No. Undercover first, then Ferry. The film is a prequel that works best once you know the character. You’re already in season 3, so keep going and save Ferry for a single evening.", posterTitles: ["Undercover", "Ferry"],
        follow: [
          {id: "uc-order", q: "I’m already in season three. Did I mess up?", a: "Not at all. Ferry works fine after the series. That’s arguably the better order. Keep going."},
          {id: "uc-s4", q: "Isn’t the new season about to start?", a: "Yes. Season 4 premieres Thursday on Netflix. Finishing season 3 first would be ideal timing."}
        ]},
      {q: "Is it based on a true story?", a: "Loosely. The police really did run an undercover operation from a campsite on the Belgian-Dutch border against an XTC lab. The setting and method are real. The characters, including Ferry Bouman, are fiction.",
        follow: [
          {id: "uc-ferry", q: "Who is Ferry supposed to be?", a: "Ferry is the drug boss at the centre of Undercover. The film Ferry tells his earlier story if you want to know how he got there.", who: "Ferry"},
          {id: "uc-lang", q: "Will I miss it if my Dutch isn’t great?", a: "You’ll be fine. Subtitles carry the slang, and the story does the rest."}
        ]}
    ],
    "Ferry": [
      {q: "How violent is it?", a: "Hard crime, but not graphic. Drugs, loyalty and a man building his myth. If you can watch Narcos, you can watch this.",
        follow: [
          {id: "ferry-week", q: "So 1h 46 is actually a weeknight?", a: "Yes. 1h 46 and it ends properly, no cliffhanger. That’s what makes it a weeknight film where Dune isn’t."},
          {id: "ferry-fl", q: "What’s the more Flemish crime if I wanted that?", a: "Assisen and Jan de Lichte are the more Flemish picks, but both need another app. Undercover and Ferry are the crime pair inside your Netflix plan."}
        ]},
      {q: "Does the film stand on its own?", a: "Yes. It’s a complete story with its own ending. Knowing Undercover adds a layer, but nothing in the film requires it.",
        follow: [
          {id: "ferry-who", q: "Where do I know him from?", a: "Ferry Bouman. The drug boss from Undercover you end up rooting for despite yourself. This film shows how he became that man.", who: "Ferry"},
          {id: "ferry-alone", q: "Will I be lost if I’ve never seen Undercover?", a: "No. The film explains itself completely. It’s an earlier chapter, not a sequel."}
        ]},
      {q: "In what order should I watch Ferry and Undercover?", a: "Undercover first, then Ferry. The film works better once you know where the character ends up. You’re already in season 3, so you’re doing it right: finish the series, then Ferry as a closed single evening.", posterTitles: ["Undercover", "Ferry"],
        follow: [
          {id: "ferry-after", q: "I’m already in Undercover. So this is dessert?", a: "Yes. Ferry follows the same character earlier in his life, runs for 1h 46 and is included with Netflix.", who: "Ferry"},
          {id: "ferry-series", q: "Isn’t there a Ferry series as well?", a: "Yes. A Ferry series followed the film, also on Netflix. Film first. The series picks up from it."}
        ]}
    ],
    "Oppenheimer": [
      {q: "How close is it to the real history?", a: "Close on the main events. Los Alamos, the Trinity test and the 1954 security hearing are all real, drawn from a biography. The private conversations are Nolan’s interpretation of what nobody recorded.",
        follow: [
          {id: "opp-hearing", q: "What was the hearing actually about?", a: "Whether Oppenheimer was a security risk. In 1954 his clearance was stripped in a closed hearing, and the film treats that as the real explosion. It takes up most of the second half."},
          {id: "opp-feel", q: "Is it going to sit on me after?", a: "It’s a film that stays with you, yes. It’s meant to. Not one to have on in the background."}
        ]},
      {q: "Do I need to understand the science to follow it?", a: "No. The physics is scenery. The film is about ambition, guilt and politics. Nobody quizzes you on the equations.",
        follow: [
          {id: "opp-cast", q: "Who am I looking at?", a: "Cillian Murphy carries the film as Oppenheimer. Robert Downey Jr. Gives the performance people talk about after. The film reminds you who everyone else is as you go."},
          {id: "opp-split", q: "Can I split it?", a: "You can. The natural break is around the two-hour mark. It plays better as one sitting if you have the evening for it."}
        ]},
      {q: "Is it suitable for teenagers?", a: "Yes. It’s dialogue and politics rather than violence, though there’s some nudity and a lot of smoking. Younger kids would be lost in the hearing scenes long before anything else.",
        follow: [
          {id: "opp-barbie", q: "Should I really pair this with Barbie?", a: "Only if you have about five hours. The two films were released on the same weekend, which made the double bill popular, but they do not need to be watched together."},
          {id: "opp-just", q: "What if I only want this one?", a: "Then just this one. It doesn’t need a companion film. Three hours is a full evening anyway."}
        ]}
    ],
    "Barbie": [
      {q: "What’s it actually about?", a: "Barbie leaves her perfect life in Barbie Land when things start going wrong and travels to the real world to find out why. It begins as a bright comedy and becomes more thoughtful as it goes.",
        follow: [
          {id: "barb-punch", q: "How much of a gut punch are we talking?", a: "There is one emotional scene near the end, but most of the film stays funny and light."},
          {id: "barb-sofa", q: "Will people on the sofa still have a good time?", a: "Yes. The comedy carries it even for people who came for the pink. The serious turn is brief."}
        ]},
      {q: "Is it okay for a 9-year-old?", a: "Yes. Nothing they shouldn’t see. They’ll enjoy the pink, and the jokes aimed at adults will simply sail past them.",
        follow: [
          {id: "barb-kids", q: "Can I still put it on if kids are around?", a: "Yes, comfortably. Kids get the colour, adults get the satire, and nobody needs the volume down."},
          {id: "barb-length", q: "How long is it?", a: "It runs for 1h 54 and is on HBO Max. HBO Max is not currently subscribed, so you would need to add it first."}
        ]},
      {q: "Show me more comedies like this", a: "Nothing you currently have is quite like Barbie. Zeg Eens Euh is good for a light group watch, and Jade en de Belgen is another comedy option on Play. Barbie itself needs HBO Max.", posterTitles: ["Zeg Eens Euh", "Jade en de Belgen"],
        follow: [
          {id: "barb-double", q: "Is the Oppenheimer double bill worth it?", a: "It is fun if you genuinely have five hours. Watch Oppenheimer first and Barbie afterwards if you want to end on the lighter film."},
          {id: "barb-only", q: "What if I just want this one?", a: "It works perfectly well on its own. It runs for 1h 54 on HBO Max, which is not currently subscribed."}
        ]}
    ],
    "Zillion": [
      {q: "Do I need to know the real story first?", a: "No. The film tells you everything: the Antwerp mega-club, the man who built it, the money and the crash. Knowing the real headlines only changes which scenes sting.",
        follow: [
          {id: "zill-true", q: "So this is based on a real club?", a: "Yes. Zillion was a real Antwerp club, and the crash really happened. The film tightens events for the screen. It’s a drama, not a documentary."},
          {id: "zill-club", q: "Who is the man it’s built around?", a: "Frank Verstraeten, the owner who built the club and then lost everything. Courts and prison included. The film covers his rise and the morning after."}
        ]},
      {q: "How explicit is it?", a: "Very. Drugs, sex and 90s excess shown straight, without a wink. Wait until the kids are in bed.",
        follow: [
          {id: "zill-room", q: "Fine with people in the room?", a: "It depends on who is watching. Zillion is explicit and runs for two hours. Pick something lighter if children or easily uncomfortable viewers are around."},
          {id: "zill-lock", q: "I don’t have Streamz. Is it worth adding for this?", a: "Only if Belgian 90s nightlife is exactly what you’re after. It’s the one big reason to add Streamz. Ferry scratches a similar itch on Netflix, no extra app needed."}
        ]},
      {q: "Show me more Belgian films like this", a: "Ferry is the closest match and is included with Netflix. It has a similar rise-and-fall story and runs for 1h 46. Undercover follows the same character across a series.", posterTitles: ["Ferry", "Undercover"],
        follow: [
          {id: "zill-close", q: "What’s close if I can’t play this tonight?", a: "Ferry is the closest option you can watch now. It is included with Netflix and runs for 1h 46."},
          {id: "zill-belg", q: "Anything Flemish that isn’t crime?", a: "Alex Agnew for two hours of Antwerp with no plot, or Jade en de Belgen for the country laughing at itself. Both comedy, both Flemish, no crime in sight."}
        ]}
    ],
    "Gladiator II": [
      {q: "Do I need to have seen the first Gladiator?", a: "Not strictly. The story stands alone, but Maximus haunts the whole film. It means more if you know why that name matters.",
        follow: [
          {id: "glad-ghost", q: "What if I barely remember Maximus?", a: "Then rewatch the first, or accept watching a son live in the shadow of a legend you can’t quite place. The arena spectacle works either way."}
        ]},
      {q: "How violent is it?", a: "It is quite violent, with frequent battles and visible injuries, but it is not especially graphic or cruel.",
        follow: [
          {id: "glad-room", q: "Is this okay to watch while other people are around?", a: "It is loud and violent, so it is not ideal while other people are around. Apple TV is not currently subscribed. Inside Out 2 on Disney+ is the easier option for a mixed group."}
        ]},
      {q: "Is it worth adding Apple TV for?", a: "Probably not for this film alone. Apple TV costs € 9,99 a month, and Gladiator II is the only saved title pointing to it. Add it if you also want to watch Severance or more of the catalogue.",
        follow: [
          {id: "glad-plan", q: "What can I watch without adding another subscription?", a: "Squid Game is the strongest action option already included with Netflix. Dune: Part Two needs HBO Max, so it would still mean adding another subscription."}
        ]}
    ],
    "Wicked": [
      {q: "Do I need to know the musical first?", a: "No. The plot works without it. Knowing the songs just adds recognition. If ‘Defying Gravity’ rings a bell, you’re ahead.",
        follow: [
          {id: "wk-songs", q: "Will I be lost if I don’t know the songs?", a: "You’ll follow the story fine. What you’ll miss is the ‘ah, that one’ moment when the big numbers start. That’s all."}
        ]},
      {q: "How much of it is singing?", a: "A lot. It’s a full musical, and the big emotional moments arrive in song. There are plenty of spoken scenes in between, but if musicals aren’t your thing, this won’t convert you.",
        follow: [
          {id: "wk-skip", q: "So I should skip it if I hate musicals?", a: "Yes. It is a full musical, so it is unlikely to win you over if you normally dislike musicals. Barbie has a similar sense of colour without the singing."}
        ]},
      {q: "This is only part one, right?", a: "Yes. It’s the first half of the story and ends on a high point, not a conclusion. Part Two completes it.",
        follow: [
          {id: "wk-end", q: "Will I be annoyed it doesn’t finish?", a: "Possibly. It stops mid-story by design. Pick a closed film like Ferry (1h 46) if that would bother you."}
        ]}
    ],
    "Deadpool & Wolverine": [
      {q: "How crude is it?", a: "Very. R-rated jokes, comic gore and constant fourth-wall breaking. Great fun for the right audience. Firmly not a family film.",
        follow: [
          {id: "dp-kids", q: "So definitely not with kids in the room?", a: "Correct. Wait until they’re in bed. Inside Out 2 or Barbie cover the family slot."}
        ]},
      {q: "Do I need to know the other Marvel films?", a: "No. Knowing who Deadpool and Wolverine are is enough to follow the plot. Deep Marvel knowledge only pays off in the cameos.",
        follow: [
          {id: "dp-cameo", q: "Will I be lost on the cameos?", a: "You’ll miss a few winks, nothing more. The claws and the jokes need no background knowledge."}
        ]},
      {q: "Is it a good one to watch with friends?", a: "Yes. The jokes and cameos work especially well with friends, although it is still enjoyable alone.",
        follow: [
          {id: "dp-date", q: "Bad date film?", a: "Depends on the date. It’s loud, crude and self-aware. If they already quote Deadpool, perfect. If not, Barbie is the safer laugh."}
        ]}
    ],
    "Challengers": [
      {q: "Do I need to care about tennis?", a: "Not at all. Tennis is the frame, not the point. It’s about three people locked in rivalry and desire. The matches are just where they say it.",
        follow: [
          {id: "ch-tennis", q: "Do I need to care about tennis?", a: "No. You need to care about the looks they exchange between points. The tennis explains itself."}
        ]},
      {q: "How steamy is it?", a: "Steamy. Charged rather than explicit. Not one for watching with your parents. Fine for almost anyone else.",
        follow: [
          {id: "ch-shy", q: "Too much if I’m watching with parents around?", a: "Probably. The sexual tension is central to the film, so it may be uncomfortable to watch with parents. Barbie is the safer choice."}
        ]},
      {q: "Would this work as a date night?", a: "Yes, if you like a film that leaves you talking. It’s competitive, sexy and a little mean. Choose the date accordingly.",
        follow: [
          {id: "ch-wrong", q: "Is this a risky date-night choice?", a: "Then it’s a long 2h 11. Barbie is the safer date pick. Dune if the plan is not talking at all."}
        ]}
    ],
    "Inside Out 2": [
      {q: "Is it just for kids?", a: "No. It’s properly aimed at both. Kids get the adventure. Adults get a surprisingly sharp film about anxiety and growing up.",
        follow: [
          {id: "io-age", q: "How young is too young?", a: "Any kid who managed the first film will be fine. Anxiety is named and talked about, never used to frighten. Watching together helps if puberty is still a distant country."}
        ]},
      {q: "Do I need the first film?", a: "It helps. The first film sets up how the emotions and Headquarters work. You’d follow this one anyway, but the setup makes it work better.",
        follow: [
          {id: "io-fuzzy", q: "Joy and Sadness are fuzzy. Should I rewind?", a: "Then rewatch the first. It’s short, and this one assumes you know how Headquarters works."}
        ]},
      {q: "Am I going to cry?", a: "Quite possibly. It’s short, sharp and aimed straight at whoever you were at thirteen. Keep a tissue within reach.",
        follow: [
          {id: "io-night", q: "Is 1h 36 a weeknight?", a: "Yes. At 1h 36, it is short enough to finish on a normal weeknight."}
        ]}
    ]
  };

  global.ReelQuestions = REEL_QUESTIONS;
})(window);
