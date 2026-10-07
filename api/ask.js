import Anthropic from "@anthropic-ai/sdk";
import { VOICE, PROFILE } from "./_shared.js";

// Answers are generated rather than read from the scripted bank. The key stays
// here: this runs on Vercel, the browser never sees it.
//
// Model is an env var so it can be pointed at whatever the account has without
// a code change and a redeploy of this file.
//
// Sonnet rather than Haiku: the chat is asked about Flemish rappers, presenters
// and local shows that neither TMDB nor the app knows, and Haiku answered those
// by guessing from the sound of the name. Sonnet knows the ground far better and
// is one of the models the current web_search tool runs on. Set ANTHROPIC_MODEL
// to claude-haiku-5-5 to trade that back for speed and cost.
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";

// The reply shape lives here rather than in the shared voice: the title endpoint
// asks for a different one. The shape is instructed rather than enforced -- the
// streaming answer is read out of half-written JSON as it arrives, and the
// schema-enforced path is a single non-streaming call, which would put the
// cursor back to waiting for the whole reply.
const SHAPE = `Reply with JSON only, in this exact shape:
{"answer": "<your answer, following the rules above>",
 "titles": [{"title": "<exact title>", "year": <release year or null>, "kind": "film" | "series"}],
 "follow": ["<short follow-up>", "<short follow-up>"]}

Search first if you need to, then reply. Your entire reply is the JSON object
and nothing else -- no narration before it, no note about having searched.

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

// Reads the "answer" string out of a JSON object that is still being written.
// Stops at the first unescaped quote, so a half-written escape is never shown.
function partialAnswer(buf) {
  const at = buf.indexOf('"answer"');
  if (at === -1) return "";
  const open = buf.indexOf('"', buf.indexOf(":", at) + 1);
  if (open === -1) return "";
  let out = "";
  for (let i = open + 1; i < buf.length; i++) {
    const c = buf[i];
    if (c === "\\") {
      const n = buf[i + 1];
      if (n === undefined) break;             // escape not finished yet
      out += n === "n" ? "\n" : n === "t" ? "\t" : n === "u" ? "" : n;
      if (n === "u") { if (i + 5 >= buf.length) break; out += String.fromCharCode(parseInt(buf.slice(i + 2, i + 6), 16)); i += 4; }
      i++;
      continue;
    }
    if (c === '"') break;                     // the string is closed
    out += c;
  }
  return out;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method" });
    return;
  }
  if (!process.env.ANTHROPIC_API_KEY) {
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

  const system = buildSystem(body.context);
  const messages = [];
  for (const t of turns) {
    if (!t || !t.q || !t.a) continue;
    messages.push({ role: "user", content: String(t.q) });
    messages.push({ role: "assistant", content: String(t.a) });
  }
  messages.push({ role: "user", content: question });

  const client = new Anthropic();

  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");

  const send = (event, data) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  // The answer streams. It used to be one call and one frame at the end, which
  // meant six or seven seconds of cursor before a word appeared -- and the
  // model is the whole of that wait, not the poster lookups, which cost about
  // 150ms. "answer" is the first key in the reply, so its text arrives while
  // the titles and follow-ups are still being written.
  let raw = "";
  try {
    const stream = client.messages.stream({
      model: MODEL,
      system,
      messages,
      // the answer is short and the shape is fixed; there is little here to
      // deliberate over, and the thinking this saves comes straight off the wait.
      // Thinking cannot be turned off on this model -- effort is the control.
      output_config: { effort: "low" },
      // the budget covers the thinking and any searching as well as the answer
      max_tokens: 4000,
      // Lets an answer go past TMDB and the app's own copy. Most questions are
      // answered without it -- the model only reaches for it when it is unsure,
      // which is exactly the case that used to produce a confident invention.
      // Capped, because every search is time the viewer spends watching a cursor.
      tools: [{ type: "web_search_20260209", name: "web_search", max_uses: 3 }],
    });

    let sentLen = 0;
    for await (const event of stream) {
      if (event.type !== "content_block_delta") continue;
      if (event.delta.type !== "text_delta") continue;
      const piece = event.delta.text;
      if (!piece) continue;
      raw += piece;
      const soFar = partialAnswer(raw);
      if (soFar.length > sentLen) {
        send("delta", { text: soFar.slice(sentLen) });
        sentLen = soFar.length;
      }
    }

    let parsed = null;
    try { parsed = JSON.parse(raw); } catch (_) {}
    // a truncated reply still has a readable answer in it, and it is already on
    // screen -- sending the raw JSON instead would replace it with braces
    const text = (parsed && typeof parsed.answer === "string" ? parsed.answer
      : partialAnswer(raw) || raw).trim();
    const results = await withPosters(parsed && Array.isArray(parsed.titles) ? parsed.titles : []);
    const follow = parsed && Array.isArray(parsed.follow)
      ? parsed.follow.filter(x => typeof x === "string" && x.trim()).slice(0, 3).map(x => x.trim())
      : [];
    send("done", { text, results, follow, streamed: sentLen > 0, model: MODEL });
  } catch (err) {
    const status = err && typeof err.status === "number" ? err.status : 0;
    send("error", { error: "api", status, message: err && err.message ? err.message : "failed" });
  }
  res.end();
}
