import OpenAI from "openai";
import { VOICE, PROFILE } from "./_shared.js";

// Answers are generated rather than read from the scripted bank. The key stays
// here: this runs on Vercel, the browser never sees it.
//
// Model is an env var so it can be pointed at whatever the account has without
// a code change and a redeploy of this file.
const MODEL = process.env.OPENAI_MODEL || "gpt-5.5";

// The reply shape lives here rather than in the shared voice: the title endpoint
// asks for a different one. It also has to name JSON, or the API refuses
// response_format: json_object.
const SHAPE = `Reply with JSON only, in this exact shape:
{"answer": "<your answer, following the rules above>",
 "titles": [{"title": "<exact title>", "year": <release year or null>, "kind": "film" | "series"}],
 "follow": ["<short follow-up>", "<short follow-up>"]}

"titles" lists the films or series your answer is about, at most eight. Put any
that appear in the service list above FIRST, in the order they are most relevant,
then fill the rest out with other real titles that fit the question. If the
question names a person, list their work. Use the title as it is best known in
English or Dutch -- it is looked up in a film database, so spelling matters more
than style.

"follow" is two or three short follow-up questions the viewer might tap next,
written in their voice, first person, no question mark longer than about forty
characters. They must follow from this exact answer -- name a title or a person
from it where that reads naturally. Never repeat the question just asked.`;

function buildSystem(ctx) {
  const parts = [VOICE, PROFILE, SHAPE];
  if (ctx && ctx.title) {
    parts.push(`The viewer is looking at ${ctx.title}${ctx.meta ? ` (${ctx.meta})` : ""}.` +
      (ctx.about ? `\nWhat the app says about it: ${ctx.about}` : ""));
  }
  if (ctx && ctx.screen) parts.push(`They are on the ${ctx.screen} screen.`);
  // A few scripted pairs from the same context, so the generated answer lands in
  // the same register as the copy already on the page.
  if (ctx && Array.isArray(ctx.examples) && ctx.examples.length) {
    const shown = ctx.examples.slice(0, 4)
      .map(e => `Q: ${e.q}\nA: ${e.a}`).join("\n\n");
    parts.push(`Answers already written for this context, as a tone reference.\n` +
      `Match their length and register. Do not repeat them verbatim.\n\n${shown}`);
  }
  return parts.join("\n\n");
}

// Resolves a title to real poster art. TMDB is where the prototype's existing
// posters come from, so anything found here matches the art already on screen.
async function withPosters(titles) {
  const key = process.env.TMDB_API_KEY;
  if (!key || !Array.isArray(titles) || !titles.length) {
    return (titles || []).map(t => ({ ...t, poster: null }));
  }
  const lookup = async (t) => {
    try {
      const url = "https://api.themoviedb.org/3/search/multi?api_key=" + encodeURIComponent(key) +
        "&include_adult=false&query=" + encodeURIComponent(t.title);
      const r = await fetch(url);
      if (!r.ok) return { ...t, poster: null };
      const j = await r.json();
      const hits = (j.results || []).filter(x => x.poster_path && (x.media_type === "movie" || x.media_type === "tv"));
      // prefer a hit whose year matches, so remakes do not win on popularity
      const dated = t.year ? hits.find(x => String(x.release_date || x.first_air_date || "").startsWith(String(t.year))) : null;
      const hit = dated || hits[0];
      if (!hit) return { ...t, poster: null };
      return {
        title: hit.title || hit.name || t.title,
        year: t.year || Number(String(hit.release_date || hit.first_air_date || "").slice(0, 4)) || null,
        kind: hit.media_type === "tv" ? "series" : "film",
        poster: "https://image.tmdb.org/t/p/w500" + hit.poster_path,
      };
    } catch (_) { return { ...t, poster: null }; }
  };
  const out = await Promise.all(titles.slice(0, 6).map(lookup));
  return out.filter(x => x.poster);          // no art, no card
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method" });
    return;
  }
  if (!process.env.OPENAI_API_KEY) {
    // The client falls back to the scripted answer on this, so a deployment
    // without a key still demos -- it just stops being live.
    res.status(503).json({ ok: false, error: "no_key" });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (_) { body = null; }
  }
  const question = body && typeof body.question === "string" ? body.question.trim() : "";
  if (!question) {
    res.status(400).json({ ok: false, error: "no_question" });
    return;
  }
  const turns = Array.isArray(body.history) ? body.history.slice(-6) : [];

  const messages = [{ role: "system", content: buildSystem(body.context) }];
  for (const t of turns) {
    if (!t || !t.q || !t.a) continue;
    messages.push({ role: "user", content: String(t.q) });
    messages.push({ role: "assistant", content: String(t.a) });
  }
  messages.push({ role: "user", content: question });

  const client = new OpenAI();

  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");

  const send = (event, data) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  try {
    const completion = await client.chat.completions.create({
      model: MODEL,
      messages,
      response_format: { type: "json_object" },
      // this model family wants max_completion_tokens, and the budget has to
      // cover any reasoning tokens as well as the visible answer
      max_completion_tokens: 2000,
    });

    const raw = completion.choices?.[0]?.message?.content || "";
    let parsed = null;
    try { parsed = JSON.parse(raw); } catch (_) {}
    const text = (parsed && typeof parsed.answer === "string" ? parsed.answer : raw).trim();
    const results = await withPosters(parsed && Array.isArray(parsed.titles) ? parsed.titles : []);
    const follow = parsed && Array.isArray(parsed.follow)
      ? parsed.follow.filter(x => typeof x === "string" && x.trim()).slice(0, 3).map(x => x.trim())
      : [];
    send("done", { text, results, follow, model: MODEL });
  } catch (err) {
    const status = err && typeof err.status === "number" ? err.status : 0;
    send("error", { error: "api", status, message: err && err.message ? err.message : "failed" });
  }
  res.end();
}
