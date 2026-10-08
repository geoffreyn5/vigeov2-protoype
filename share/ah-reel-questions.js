// The questions a title is asked, shared by the reel feed on Home and the title
// page a poster opens, so the two never drift apart. Edit them here.
//
// The set comes from the reviewed workbook, vigeo-young-question-banks of
// 8 October 2026: exactly three per title, each standing on its own. The
// follow-up chains the earlier banks carried are gone -- row order prescribes
// no conversation, and the model answers whatever is asked next.
(function (global) {
  const REEL_QUESTIONS = {
    "Wednesday": [
      {q: "Is Thing a real hand or CGI?", a: "Mostly a real hand: performer Victor Dorobantu plays Thing on set, with visual effects removing his body and adding shots where needed."},
      {q: "Is she from The Addams Family?", a: "Yes. It is the same Addams Family character, with a new story centred on her time at Nevermore."},
      {q: "Did Jenna make up that dance herself?", a: "Yes. Jenna Ortega choreographed the dance, drawing on several influences including Lisa Loring’s original Wednesday."}
    ],
    "Dune: Part Two": [
      {q: "Do I need to rewatch Dune: Part One?", a: "If you remember the characters and the struggle over Arrakis, a recap can be enough. Part Two continues that story rather than starting again."},
      {q: "Why is everyone fighting over the spice?", a: "Spice makes interstellar travel possible. Controlling Arrakis, where it is found, means controlling a resource the whole empire depends on."},
      {q: "Is that the actor who played Elvis?", a: "Yes. Austin Butler plays Feyd-Rautha, the Harkonnen fighter."}
    ],
    "Undercover": [
      {q: "Was the campsite operation real?", a: "The premise is loosely inspired by a real undercover operation against an XTC network on the Belgian-Dutch border. The series’ characters and story are fictionalised."},
      {q: "Where does Ferry fit into Undercover?", a: "Undercover introduces Ferry as the drug boss. The Ferry film goes back to his earlier life."},
      {q: "Is this a Belgian version of Narcos?", a: "It shares the drug-trade subject, but Undercover tells its own Belgian-Dutch story. The central tension comes from officers living undercover near a drug boss on a campsite."}
    ],
    "Ferry": [
      {q: "Is Ferry set before Undercover?", a: "Yes. The film tells Ferry’s earlier story, before the events of Undercover."},
      {q: "Is this the Ferry film or the series?", a: "This is the film. There is also a Ferry series, which picks up after it."},
      {q: "Is it the same actor playing Ferry?", a: "Yes. Frank Lammers plays Ferry Bouman in both the film and Undercover."}
    ],
    "Oppenheimer": [
      {q: "How much of Oppenheimer really happened?", a: "The major events, including Los Alamos, the Trinity test and the security hearing, are historical. Private conversations are dramatised."},
      {q: "Why are some scenes black and white?", a: "Those scenes show events from Lewis Strauss’s point of view. The colour scenes are Oppenheimer’s."},
      {q: "How did they film the bomb explosion?", a: "They used practical effects and filmed real, non-nuclear explosions. Nolan did not detonate an atomic bomb for the scene."}
    ],
    "Barbie": [
      {q: "Is it linked to Oppenheimer?", a: "Only by release date. Both opened on the same weekend in 2023, so people watched them as a double bill. The stories have nothing to do with each other."},
      {q: "Did they really build Barbie Land?", a: "Yes. The Dreamhouses were built as physical sets, with rooms scaled smaller than real homes to recreate the proportions of the toys."},
      {q: "Is Ryan Gosling really singing?", a: "Yes. Gosling performs “I’m Just Ken”. He also performed it at the Oscars with Mark Ronson."}
    ],
    "Zillion": [
      {q: "Was Zillion an actual nightclub?", a: "Yes. Zillion was a real nightclub in Antwerp. The film dramatises its story rather than documenting every event exactly."},
      {q: "Was Frank Verstraeten a real person?", a: "Yes. He founded the real Zillion nightclub. The film tells a dramatised version of his rise and fall."},
      {q: "Is that Matteo Simoni under the wig?", a: "Yes. Matteo Simoni plays Dennis Black Magic in Zillion."}
    ],
    "Gladiator II": [
      {q: "Is Lucius the boy from the first film?", a: "Yes. Paul Mescal plays the grown-up Lucius, who witnessed Maximus in the arena as a boy."},
      {q: "Is Ridley Scott directing this one too?", a: "Yes. Ridley Scott directed both Gladiator films."},
      {q: "Is Lucilla played by the same actress?", a: "Yes. Connie Nielsen returns as Lucilla alongside the new cast."}
    ],
    "Wicked": [
      {q: "Does this cover the whole musical?", a: "No. This film covers the first part. Wicked: For Good continues the story."},
      {q: "Are Ariana and Cynthia singing live?", a: "Yes. Ariana Grande and Cynthia Erivo performed live on set, rather than only miming to prerecorded vocals."},
      {q: "Is this before The Wizard of Oz?", a: "Yes. This part of the story follows Elphaba and Glinda in the years before Dorothy arrives in Oz."}
    ],
    "Deadpool & Wolverine": [
      {q: "Are there surprise Marvel cameos?", a: "Yes. Some of the appearances are meant as surprises, so naming them would spoil the reveals."},
      {q: "Will I miss the jokes without Marvel?", a: "You can follow the central pairing without knowing every film, but the cameos and references reward familiarity with the earlier Marvel movies."},
      {q: "Is the yellow suit from the comics?", a: "Yes. Wolverine’s yellow-and-blue look goes back to his early comic appearances, long before Hugh Jackman played him."}
    ],
    "Challengers": [
      {q: "Is the tennis just a backdrop?", a: "The matches matter, but the rivalry and attraction between the three leads drive the story. You don’t need to follow tennis to understand those relationships."},
      {q: "Who made the soundtrack?", a: "Trent Reznor and Atticus Ross composed the score."},
      {q: "Did Zendaya learn to play tennis?", a: "Yes. She trained for the role with tennis professionals, including Melissa Nguyen."}
    ],
    "Inside Out 2": [
      {q: "What new emotions are introduced?", a: "Anxiety, Envy, Embarrassment and Ennui join the original emotions as Riley becomes a teenager."},
      {q: "How is Anxiety different from Fear?", a: "Fear reacts to immediate, visible dangers. Anxiety thinks ahead about everything that could go wrong, especially as Riley tries to fit in."},
      {q: "What does Ennui mean?", a: "It means boredom or listlessness. In Riley’s head, Ennui embodies that teenage feeling of being unimpressed by everything."}
    ]
  };

  global.ReelQuestions = REEL_QUESTIONS;
})(window);
