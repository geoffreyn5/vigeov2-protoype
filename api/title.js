import OpenAI from "openai";
import { VOICE, PROFILE, tmdbLookup } from "./_shared.js";

const MODEL = process.env.OPENAI_MODEL || "gpt-5.5";

// Everything a title page needs that the prototype does not already hold:
// facts and art from TMDB, the blurb and the questions written in the house
// voice. Both run at once, so the page waits for the slower of the two rather
// than for the sum.
// Questions come back on their own, ahead of everything else. Three short
// strings is a small ask, so it lands well before the blurb -- and the answers
// are generated on tap through /api/ask, which keeps this call light.
async function writeQuestions(title, year, kind, overview) {
  if (!process.env.OPENAI_API_KEY) return null;
  try {
    const client = new OpenAI();
    const c = await client.chat.completions.create({
      model: MODEL,
      response_format: { type: "json_object" },
      // three short strings need no deliberation, and the rail is the first
      // thing the page waits on -- low effort roughly halves the wait
      reasoning_effort: "low",
      max_completion_tokens: 400,
      messages: [
        { role: "system", content: `You write the questions a viewer would tap on a
title page in a Belgian TV app. Reply with JSON only:
{"questions": ["<question>", "<question>", "<question>"]}

Three questions, each specific to this title -- what someone would genuinely
wonder before pressing play on THIS one, not a template. Their voice, first
person where it reads naturally, under about forty-five characters. No emoji,
no exclamation marks.

Always write in English, including for Dutch and Flemish titles -- those keep
their own spelling, but the question around them is English.` },
        { role: "user", content: `${title}${year ? ` (${year})` : ""}${kind ? `, ${kind}` : ""}.` +
          (overview ? `\n${overview}` : "") },
      ],
    });
    const j = JSON.parse(c.choices?.[0]?.message?.content || "");
    return Array.isArray(j.questions)
      ? j.questions.filter(x => typeof x === "string" && x.trim()).slice(0, 3).map(x => x.trim())
      : null;
  } catch (_) {
    return null;
  }
}

async function writeAbout(title, year, kind, overview) {
  if (!process.env.OPENAI_API_KEY) return null;
  try {
    const client = new OpenAI();
    const c = await client.chat.completions.create({
      model: MODEL,
      response_format: { type: "json_object" },
      max_completion_tokens: 700,
      messages: [
        { role: "system", content: VOICE + "\n\n" + PROFILE + `

Write the page blurb for one title. Reply with JSON only:
{"about": "<2 or 3 sentences -- what it is, who it is for, and whether it is a
  weeknight or a proper night>"}` },
        { role: "user", content: `${title}${year ? ` (${year})` : ""}${kind ? `, ${kind}` : ""}.` +
          (overview ? `\nSynopsis: ${overview}` : "") },
      ],
    });
    const j = JSON.parse(c.choices?.[0]?.message?.content || "");
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

  // Three jobs at once. Questions are the smallest ask and the one the page
  // wants first, so it is not held behind the lookup or the blurb.
  // a page that already has its reviewed questions says so, and the call is
  // skipped: nothing to pay for, and the lanes have nothing to wait on
  const qP = body.questions === false
    ? Promise.resolve(null)
    : writeQuestions(title, year, kind, null);
  const fP = tmdbLookup({ title, year, kind });
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
