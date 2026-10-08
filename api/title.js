import Anthropic from "@anthropic-ai/sdk";
import { VOICE, PROFILE, tmdbLookup } from "./_shared.js";

const MODEL = process.env.ANTHROPIC_MODEL || "claude-haiku-5-5";

// A reply is a list of content blocks, not one string: thinking blocks ride
// alongside the text. Join the text ones and leave the rest. A safety decline
// comes back as a 200 with stop_reason "refusal" and no text, so it lands here
// as an empty string and the caller's own fallback takes over.
function textOf(msg) {
  if (!msg || !Array.isArray(msg.content)) return "";
  return msg.content.filter(b => b.type === "text").map(b => b.text).join("");
}

// Everything a title page needs that the prototype does not already hold:
// facts and art from TMDB, the blurb and the questions written in the house
// voice. Both run at once, so the page waits for the slower of the two rather
// than for the sum.
// What the model is told about the title. Cast comes with the characters
// attached, because "is that the one who played X" is the question the brief
// is after, and crew because an adaptation or a sequel usually shows up in who
// made it. Everything here is TMDB's, so a question built on it is built on
// something checked.
function brief(title, year, kind, f) {
  const lines = [`${title}${(f?.year || year) ? ` (${f?.year || year})` : ""}` +
                 `${(f?.kind || kind) ? `, ${f?.kind || kind}` : ""}.`];
  if (!f) return lines[0];
  if (f.title && f.title !== title) lines.push(`Known in English as ${f.title}; the viewer sees ${title}.`);
  if (f.genres?.length) lines.push(`Genres: ${f.genres.join(", ")}.`);
  if (f.seasons) lines.push(`${f.seasons} season${f.seasons > 1 ? "s" : ""}.`);
  if (f.overview) lines.push(`Synopsis (already on the page, do not just rephrase it): ${f.overview}`);
  const cast = (f.cast || []).slice(0, 8)
    .map(p => p.role ? `${p.name} as ${p.role}` : p.name);
  if (cast.length) lines.push(`Cast: ${cast.join("; ")}.`);
  const crew = (f.crew || []).slice(0, 5).map(p => `${p.name} (${p.role})`);
  if (crew.length) lines.push(`Crew: ${crew.join("; ")}.`);
  return lines.join("\n");
}

// Questions wait for the TMDB lookup rather than racing it. The brief asks for
// the connection, the familiar face, the real event behind it -- and a model
// given nothing but a title and a year has to supply those from memory, which
// is where it starts inventing. The lookup answers in a few hundred ms against
// a blurb that takes seconds, so the rail still fills first.
async function writeQuestions(title, year, kind, facts) {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  try {
    const client = new Anthropic();
    const c = await client.messages.create({
      model: MODEL,
      // three short strings need no deliberation, and the rail is the first
      // thing the page waits on -- low effort roughly halves the wait
      output_config: { effort: "low" },
      max_tokens: 2000,
      system: `You write the three questions a viewer taps when they open a
title page in a Belgian TV app. Reply with JSON only:
{"questions": ["<question>", "<question>", "<question>"]}

Exactly three questions someone might naturally ask when opening this film or
series. Use the title and whatever context you are given to find what makes
this one interesting: connections to other titles, pop-culture references,
familiar actors or characters, real events, adaptations, or what changes in a
sequel.

Each question must:
- be specific to this title, and useful before watching
- reveal something beyond the synopsis and the details already on screen
- stand on its own, with no fixed order and no follow-up structure
- sound conversational, and ideally stay under forty-five characters
- explore a different curiosity from the other two

Avoid generic questions about the plot, the runtime, the language or the tone.
Ask about an earlier instalment only where that connection genuinely matters.
Avoid spoilers, and avoid anything that assumes a fact you are not sure of --
a question that quietly asserts something untrue is worse than a duller one.
No emoji, no exclamation marks.

Always write in English, including for Dutch and Flemish titles -- those keep
their own spelling, but the question around them is English.`,
      messages: [
        { role: "user", content: brief(title, year, kind, facts) },
      ],
    });
    const j = JSON.parse(textOf(c));
    return Array.isArray(j.questions)
      ? j.questions.filter(x => typeof x === "string" && x.trim()).slice(0, 3).map(x => x.trim())
      : null;
  } catch (_) {
    return null;
  }
}

async function writeAbout(title, year, kind, overview) {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  try {
    const client = new Anthropic();
    const c = await client.messages.create({
      model: MODEL,
      output_config: { effort: "low" },
      max_tokens: 2000,
      system: VOICE + "\n\n" + PROFILE + `

Write the page blurb for one title. Reply with JSON only:
{"about": "<2 or 3 sentences -- what it is, who it is for, and whether it is a
  weeknight or a proper night>"}`,
      messages: [
        { role: "user", content: `${title}${year ? ` (${year})` : ""}${kind ? `, ${kind}` : ""}.` +
          (overview ? `\nSynopsis: ${overview}` : "") },
      ],
    });
    const j = JSON.parse(textOf(c));
    return typeof j.about === "string" ? j.about.trim() : null;
  } catch (_) {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method" });
    return;
  }
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (_) { body = null; }
  }
  const title = body && typeof body.title === "string" ? body.title.trim() : "";
  if (!title) {
    res.status(400).json({ ok: false, error: "no_title" });
    return;
  }
  const year = body.year || null;
  const kind = body.kind || null;

  // Two phases on one connection. TMDB answers in a few hundred ms and carries
  // everything visible -- art, meta, cast, crew, trailers -- so it goes out the
  // moment it lands. The written copy takes seconds and follows on its own.
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  const send = (event, data) => res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);

  // The lookup goes first and both writers hang off it. Questions are the
  // smaller ask and are emitted the moment they land, so the rail still fills
  // ahead of the blurb.
  // A page that already has its reviewed questions says so, and the call is
  // skipped: nothing to pay for, and the lanes have nothing to wait on.
  const fP = tmdbLookup({ title, year, kind });
  const qP = body.questions === false
    ? Promise.resolve(null)
    : fP.catch(() => null).then(f => writeQuestions(title, year, kind, f));
  let sent = 0;
  const emit = (event, data) => { if (data) { send(event, data); sent++; } };

  const [questions, facts] = await Promise.all([
    qP.then(q => { emit("questions", q && q.length ? { questions: q } : null); return q; }),
    fP.then(f => { emit("facts", f); return f; }),
  ]);

  const about = await writeAbout(
    facts?.title || title, facts?.year || year, facts?.kind || kind, facts?.overview);
  emit("about", about ? { about } : (facts?.overview ? { about: facts.overview } : null));

  if (!sent) send("error", { error: "no_source" });
  res.end();
}
