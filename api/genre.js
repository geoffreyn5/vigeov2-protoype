// Everything a genre page needs from TMDB: the titles, the faces that keep
// turning up in them, and the people who direct them.
//
// TMDB has no "popular actors in comedy" endpoint, so the people are derived:
// take the genre's most popular films, read their credits, and count who
// appears. That is what "famous in this genre" actually means, and it stays true
// as the catalogue moves rather than being a list somebody typed once.
const TMDB = "https://api.themoviedb.org/3";
const IMG = (p, size) => (p ? `https://image.tmdb.org/t/p/${size}${p}` : null);

// TMDB splits its genre ids between film and television, and television has no
// Thriller, Horror or Romance -- the nearest standing in for each.
const GENRES = {
  Action:   { movie: 28,    tv: 10759 },
  Comedy:   { movie: 35,    tv: 35 },
  Drama:    { movie: 18,    tv: 18 },
  Thriller: { movie: 53,    tv: 9648 },   // Mystery
  Horror:   { movie: 27,    tv: 9648 },   // Mystery
  Romance:  { movie: 10749, tv: null }
};

const CREW_JOBS = ["Director"];

export default async function handler(req, res) {
  const key = process.env.TMDB_API_KEY;
  if (!key) {
    res.status(503).json({ ok: false, error: "no_key" });
    return;
  }
  const name = String((req.query && req.query.name) || "").trim();
  const ids = GENRES[name];
  if (!ids) {
    res.status(400).json({ ok: false, error: "unknown_genre" });
    return;
  }

  const get = async (path) => {
    const r = await fetch(`${TMDB}${path}${path.includes("?") ? "&" : "?"}api_key=${encodeURIComponent(key)}`);
    if (!r.ok) throw new Error(String(r.status));
    return r.json();
  };

  try {
    const [films, series] = await Promise.all([
      // vote_count, not popularity: popularity is "what is trending this week",
      // which fills a genre page with unreleased titles. Vote count is the
      // genre's best-known work, which is what someone browsing it expects.
      get(`/discover/movie?with_genres=${ids.movie}&sort_by=vote_count.desc&include_adult=false`),
      ids.tv
        ? get(`/discover/tv?with_genres=${ids.tv}&sort_by=vote_count.desc`)
        : Promise.resolve({ results: [] })
    ]);

    const titleRow = (x, kind) => ({
      title: x.title || x.name,
      year: Number(String(x.release_date || x.first_air_date || "").slice(0, 4)) || null,
      kind,
      poster: IMG(x.poster_path, "w500")
    });
    const filmRows = (films.results || []).filter(x => x.poster_path).slice(0, 12).map(x => titleRow(x, "film"));
    const seriesRows = (series.results || []).filter(x => x.poster_path).slice(0, 12).map(x => titleRow(x, "series"));

    // credits for the films at the top of the genre, which is where the faces
    // people associate with it actually are
    const sample = (films.results || []).slice(0, 16);
    const credits = await Promise.all(sample.map(m =>
      get(`/movie/${m.id}/credits`).catch(() => null)));

    const actors = new Map();
    const directors = new Map();
    credits.forEach(c => {
      if (!c) return;
      (c.cast || []).slice(0, 6).forEach(p => {
        if (!p.profile_path) return;
        const e = actors.get(p.name) || { name: p.name, photo: IMG(p.profile_path, "w185"), n: 0 };
        e.n++; actors.set(p.name, e);
      });
      (c.crew || []).forEach(p => {
        if (!CREW_JOBS.includes(p.job) || !p.profile_path) return;
        const e = directors.get(p.name) || { name: p.name, photo: IMG(p.profile_path, "w185"), n: 0 };
        e.n++; directors.set(p.name, e);
      });
    });
    const rank = m => [...m.values()].sort((a, b) => b.n - a.n).slice(0, 12)
      .map(({ name, photo, n }) => ({ name, photo, count: n }));

    res.setHeader("Cache-Control", "public, max-age=3600");
    res.status(200).json({
      ok: true,
      genre: name,
      films: filmRows,
      series: seriesRows,
      actors: rank(actors),
      directors: rank(directors)
    });
  } catch (_) {
    res.status(502).json({ ok: false, error: "tmdb_failed" });
  }
}
