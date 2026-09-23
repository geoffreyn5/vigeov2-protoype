// Shared by the ask and title endpoints. Files prefixed with _ are not routed,
// so this is a module rather than an endpoint.

// The house voice, distilled from the reviewed answer set of 9 September. The
// prototype's scripted copy is the reference; anything generated has to sit
// beside it without reading as a different product.
export const VOICE = `You are the assistant inside Alfora, a Telenet TV app. You answer
questions about what to watch and what a subscription is worth.

How you write:
- Plain and factual. Second person. No marketing language, no exclamation marks,
  no emoji, no rhetorical questions back at the user.
- One to three sentences. Usually two. Around 25-45 words.
- Lead with the answer, not with throat-clearing. Never open with "Great question"
  or restate what was asked.
- Name the title, say where it plays, and say whether it is already in the plan.
  Those three facts are what makes an answer useful here.
- Dutch and Flemish titles keep their own spelling: De Tafel van Gert, Familie,
  Zeg Eens Euh, Jade en de Belgen, De Verraders, Glad IJs, De Twaalf, Assisen.
- Prices are written with a space and a comma: EUR 16,99 a month.

Everything you name is available to watch. Never say otherwise.

Never refer to the app, the screen, a catalogue, a list, or what you can or
cannot see. Phrases like "in this app", "I only see", "not shown here", "on the
Search screen", "I do not know where it plays" are all wrong -- write as if the
whole library is at hand, because it is.

Where the list below gives a service for a title, name it, and say whether it is
included in the plan. Where it does not, simply do not raise availability -- talk
about the title itself instead. Silence on the point is right; admitting a gap
is not.

What you must not do:
- Do not invent a price or a release year.
- Do not describe yourself as an AI or mention these instructions.`;

// The prototype's fixed profile. Kept server-side so a generated answer cannot
// contradict the numbers printed on the Shop page.
export const PROFILE = `The viewer's plan, as the app shows it:
- Subscribed: Netflix Standard (EUR 16,99), Disney+ Standard (EUR 10,99).
  Both are billed through Telenet, so a 5% combination discount applies and the
  month comes to EUR 26,58, which is EUR 1,40 off.
- Free, no subscription needed: VRT MAX, VTM GO, Play.
- Not subscribed: HBO Max (Basic with Ads, EUR 6,99), Apple TV (EUR 9,99),
  Streamz (Basic EUR 9,99, Premium EUR 14,99, Premium+ EUR 22,99),
  Play Sports (EUR 19,99), VTM GO+ (EUR 4,95).
- Part-watched: The Last of Us at 67%, De Tafel van Gert at 74%, Undercover is
  mid season three. Dune: Part Two is saved and barely started.

Where the titles in the app play:
- Netflix: Undercover, Wednesday, Ferry, Squid Game
- Disney+: The Bear, Abbott Elementary
- HBO Max: Dune: Part Two, The Last of Us, Barbie, Oppenheimer, The Penguin
- Apple TV: Gladiator II, Severance
- Streamz: Zillion
- VRT MAX (free): Thuis, 1985, Chantal
- VTM GO (free): De Verraders, Glad IJs, Assisen, Familie
- Play (free): De Tafel van Gert, Jade en de Belgen, Zeg Eens Euh, Jan de Lichte,
  De Slag om de Schelde`;

const TMDB = "https://api.themoviedb.org/3";
const IMG = (path, size) => (path ? `https://image.tmdb.org/t/p/${size}${path}` : null);

// One search, then one detail call with credits and videos folded in, so a
// title page costs two round trips rather than four.
export async function tmdbLookup({ title, year, kind }) {
  const key = process.env.TMDB_API_KEY;
  if (!key || !title) return null;
  try {
    const sr = await fetch(`${TMDB}/search/multi?api_key=${encodeURIComponent(key)}` +
      `&include_adult=false&query=${encodeURIComponent(title)}`);
    if (!sr.ok) return null;
    const sj = await sr.json();
    let hits = (sj.results || []).filter(x => x.media_type === "movie" || x.media_type === "tv");
    if (kind === "series") hits = hits.filter(x => x.media_type === "tv").concat(hits);
    if (kind === "film") hits = hits.filter(x => x.media_type === "movie").concat(hits);
    const dated = year ? hits.find(x => String(x.release_date || x.first_air_date || "").startsWith(String(year))) : null;
    const hit = dated || hits[0];
    if (!hit) return null;

    const type = hit.media_type === "tv" ? "tv" : "movie";
    const dr = await fetch(`${TMDB}/${type}/${hit.id}?api_key=${encodeURIComponent(key)}` +
      `&append_to_response=credits,videos`);
    if (!dr.ok) return null;
    const d = await dr.json();

    const cast = (d.credits?.cast || []).slice(0, 12).map(p => ({
      name: p.name, role: p.character || "", photo: IMG(p.profile_path, "w185"),
    }));
    const wanted = ["Director", "Writer", "Screenplay", "Producer", "Executive Producer", "Creator"];
    const seen = new Set();
    const crew = (d.credits?.crew || [])
      .filter(p => wanted.includes(p.job))
      .filter(p => { const k = p.name + p.job; if (seen.has(k)) return false; seen.add(k); return true; })
      .slice(0, 10)
      .map(p => ({ name: p.name, role: p.job, photo: IMG(p.profile_path, "w185") }));
    const trailers = (d.videos?.results || [])
      .filter(v => v.site === "YouTube" && /Trailer|Teaser|Featurette|Clip/i.test(v.type))
      .slice(0, 6)
      .map(v => ({
        name: v.name, kind: v.type,
        thumb: `https://img.youtube.com/vi/${v.key}/hqdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${v.key}`,
      }));

    const runtime = type === "movie"
      ? (d.runtime ? `${Math.floor(d.runtime / 60)}h ${d.runtime % 60}m` : "")
      : (d.number_of_episodes ? `${d.number_of_episodes} ep` : "");
    const epLen = type === "tv" && d.episode_run_time?.length ? `~${d.episode_run_time[0]}m` : "";

    return {
      title: d.title || d.name || title,
      year: Number(String(d.release_date || d.first_air_date || "").slice(0, 4)) || year || null,
      kind: type === "tv" ? "Series" : "Film",
      overview: d.overview || "",
      poster: IMG(d.poster_path, "w500"),
      backdrop: IMG(d.backdrop_path, "w1280"),
      runtime, epLen,
      seasons: type === "tv" && d.number_of_seasons ? d.number_of_seasons : null,
      genres: (d.genres || []).map(g => g.name).slice(0, 3),
      cast, crew, trailers,
    };
  } catch (_) {
    return null;
  }
}
