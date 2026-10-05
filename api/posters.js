import { tmdbLookup } from "./_shared.js";

// Poster art for a list of titles, resolved exactly the way the title page
// resolves it. Collections used to ship their own files, so the art on an
// overview could differ from the art on the page it opened -- this endpoint
// exists so both sides ask the same question and get the same answer.
//
// It deliberately reuses tmdbLookup rather than doing its own cheaper search:
// a one-request search can pick a different hit to the search-then-detail that
// the title page runs, and "cheaper but occasionally different" is the bug this
// is fixing.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method" });
    return;
  }
  if (!process.env.TMDB_API_KEY) {
    // the caller keeps whatever art it already had
    res.status(503).json({ ok: false, error: "no_key" });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (_) { body = null; }
  }
  const wanted = Array.isArray(body && body.titles) ? body.titles.slice(0, 30) : [];
  if (!wanted.length) {
    res.status(400).json({ ok: false, error: "no_titles" });
    return;
  }

  const one = async (entry) => {
    const title = typeof entry === "string" ? entry : entry && entry.title;
    if (!title) return null;
    const year = typeof entry === "object" && entry ? entry.year || null : null;
    const kind = typeof entry === "object" && entry ? entry.kind || null : null;
    try {
      const facts = await tmdbLookup({ title, year, kind });
      return facts && facts.poster ? [title, facts.poster] : null;
    } catch (_) {
      return null;
    }
  };

  const pairs = (await Promise.all(wanted.map(one))).filter(Boolean);
  const posters = Object.fromEntries(pairs);

  // the answer for a given title does not change between page loads
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.status(200).json({ ok: true, posters });
}
