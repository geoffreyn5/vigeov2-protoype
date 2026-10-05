// A same-origin pass-through for TMDB artwork.
//
// image.tmdb.org sends no Access-Control-Allow-Origin, so a canvas that draws
// one of its images is tainted and getImageData throws. That is why the title
// page's tone extraction silently produced nothing and every hero fell back to
// the same grey wash. Loading the art through here instead makes it same-origin,
// so the colour can be read and the gradient becomes the title's own.
//
// Only used for the colour read -- the visible <img> still points straight at
// TMDB, so this adds no weight to what the viewer waits for.
const ALLOWED = new Set(["image.tmdb.org"]);

export default async function handler(req, res) {
  const raw = (req.query && req.query.u) || "";
  if (!raw) {
    res.status(400).json({ ok: false, error: "no_url" });
    return;
  }

  let url;
  try { url = new URL(raw); } catch (_) {
    res.status(400).json({ ok: false, error: "bad_url" });
    return;
  }
  // an open proxy is a liability, so only the one host this exists for
  if (url.protocol !== "https:" || !ALLOWED.has(url.hostname)) {
    res.status(403).json({ ok: false, error: "host_not_allowed" });
    return;
  }

  try {
    const upstream = await fetch(url.toString());
    if (!upstream.ok) {
      res.status(upstream.status).json({ ok: false, error: "upstream" });
      return;
    }
    const buf = Buffer.from(await upstream.arrayBuffer());
    res.setHeader("Content-Type", upstream.headers.get("content-type") || "image/jpeg");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=86400, immutable");
    res.status(200).send(buf);
  } catch (_) {
    res.status(502).json({ ok: false, error: "fetch_failed" });
  }
}
