// Live answers from Claude, with the scripted bank as the safety net.
//
// The rule this file follows: the prototype must never get worse because the
// network did. Every failure path -- no key, offline, slow, refusal -- falls
// back to the written answer, so a demo keeps working.
(function (global) {
  const ENDPOINT = "/api/ask";
  const TIMEOUT_MS = 12000;

  // null until the first call tells us; false disables every later call, so a
  // deployment without a key costs one failed request, not one per question.
  let available = null;

  function isOff() {
    // ?llm=off forces the scripted bank, for a demo that must not vary
    try {
      return new URLSearchParams(global.location.search).get("llm") === "off";
    } catch (_) { return false; }
  }

  function enabled() {
    return !isOff() && available !== false;
  }

  // Reads the SSE stream, calling onDelta as text arrives so the answer types
  // out the way the scripted one does.
  async function ask(question, opts) {
    const o = opts || {};
    if (!enabled()) return null;

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), o.timeout || TIMEOUT_MS);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          context: o.context || null,
          history: o.history || [],
        }),
        signal: ctrl.signal,
      });
      if (res.status === 503 || res.status === 404) { available = false; return null; }
      if (!res.ok || !res.body) return null;
      available = true;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let out = "";
      let results = null;
      let follow = null;
      let failed = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        // SSE frames are separated by a blank line
        let cut;
        while ((cut = buf.indexOf("\n\n")) !== -1) {
          const frame = buf.slice(0, cut);
          buf = buf.slice(cut + 2);
          let event = "message", data = "";
          frame.split("\n").forEach(line => {
            if (line.startsWith("event: ")) event = line.slice(7).trim();
            else if (line.startsWith("data: ")) data += line.slice(6);
          });
          if (!data) continue;
          let parsed;
          try { parsed = JSON.parse(data); } catch (_) { continue; }
          if (event === "delta" && parsed.text) {
            out += parsed.text;
            if (o.onDelta) o.onDelta(out);
          } else if (event === "done") {
            if (parsed.text) out = parsed.text;
            if (Array.isArray(parsed.results)) results = parsed.results;
            if (Array.isArray(parsed.follow)) follow = parsed.follow;
          } else if (event === "error") {
            failed = true;
          }
        }
      }
      if (failed && !out) return null;
      if (!out.trim()) return null;
      return { text: out.trim(), results: results || [], follow: follow || [] };
    } catch (_) {
      return null;                     // abort, offline, parse -- all fall back
    } finally {
      clearTimeout(timer);
    }
  }

  global.AlforaLLM = { ask, enabled, isOff, state: () => available };
})(window);
