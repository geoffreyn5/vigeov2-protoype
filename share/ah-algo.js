// "Your algorithm" — what the app thinks it knows about you, opened from the
// filter icon above the reel.
//
// Everything on the page is read from MyLists: the summary sentence is written
// from the two lists by the model, and every pill is a service, a format or a
// tag that actually appears in them. Nothing here is invented copy, which is
// the point — it has to be defensible when someone taps a pill and asks why.
(function (global) {
  const esc = s => String(s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const backSvg = '<svg viewBox="0 0 24 24"><path d="M15 5.5 8.5 12 15 18.5"/></svg>';
  const chevSvg = '<svg viewBox="0 0 24 24"><path d="M9 5.5 15.5 12 9 18.5"/></svg>';

  // The house voice pushes every answer towards "where it plays and is it in
  // your plan", which is wrong for this page -- here the sentence is a portrait,
  // not a recommendation.
  const PROMPT = `Finish this sentence about me in ONE sentence of at most 25 words, starting exactly with "Lately you’ve been":
describe the kind of thing I have been watching -- the mood, the subjects, the shape of it.
Do not name individual titles. Do not mention services, subscriptions, prices, plans or availability.
Do not say "you might like" or recommend anything. Just the portrait.`;

  function create(opts) {
    const phone = opts.phone;
    const reduceMotion = !!opts.reduceMotion;
    if (!phone) return null;

    const root = document.createElement("div");
    root.className = "algo";
    root.innerHTML = `
      <div class="algo-glow" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="algo-head">
        <button class="algo-back" type="button" data-algo-close aria-label="Back">${backSvg}</button>
        <h2>Your algorithm</h2>
      </div>
      <div class="algo-scroll" data-algo-scroll></div>
      <div class="algo-sheet" data-algo-sheet aria-hidden="true">
        <div class="algo-sheet-scrim" data-algo-sheet-close></div>
        <div class="algo-sheet-panel">
          <button class="algo-sheet-handle" type="button" data-algo-sheet-close aria-label="Close"><i></i></button>
          <div class="algo-field">
            <input type="text" data-algo-input placeholder="Something you&rsquo;d rather not see" autocomplete="off" enterkeyhint="done">
          </div>
        </div>
      </div>`;
    phone.appendChild(root);
    const scroll = root.querySelector("[data-algo-scroll]");

    // ---- what the lists say -------------------------------------------------

    // Pills are what the titles are, not where they sit: genres first, then a
    // few facets of the content itself. Deliberately no services, channels or
    // series-versus-film -- none of those describe what you are in the mood for.
    function pills() {
      const p = global.MyLists && MyLists.profile();
      if (!p) return { more: [], add: [] };
      const rows = [...p.genres, ...p.meta].map(([label, n]) => ({ label, n }));
      rows.sort((a, b) => b.n - a.n);
      return {
        more: rows.filter(r => r.n >= 3).slice(0, 9),
        add: rows.filter(r => r.n > 0 && r.n < 3).slice(0, 3)
      };
    }

    // the fallback sentence, assembled rather than written -- used when the
    // model is off or unreachable, so a demo never shows an empty page
    function scriptedSummary() {
      const p = global.MyLists && MyLists.profile();
      if (!p || !p.genres.length) return "Lately you’ve not saved much — ask me and I’ll fill the list.";
      const top = p.genres.slice(0, 3).map(g => g[0].toLowerCase());
      const be = p.meta.find(m => m[0] === "Dutch-language");
      const tail = be && be[1] >= 5 ? ", and a steady run of Dutch-language television" : "";
      return `Lately you’ve been on ${top.slice(0, 2).join(" and ")} with a bit of ${top[2] || "everything"}${tail}.`;
    }

    function listForPrompt() {
      const p = global.MyLists && MyLists.profile();
      if (!p) return "";
      const row = t => `${t.title} — ${(t.genres || []).join("/") || t.kind}`;
      return `Part-watched: ${p.watching.map(row).join("; ")}\nSaved: ${p.saved.map(row).join("; ")}`;
    }

    // ---- the summary, written a word at a time ------------------------------

    let wordT = null;
    // Consumes a string that is still growing: every call adds whatever words
    // have arrived since the last one, so the sentence writes itself at the
    // speed the model produces it rather than after it.
    function wordWriter(el) {
      el.innerHTML = "";
      el.classList.remove("done");
      let written = 0;
      const queue = [];
      const flush = () => {
        const n = queue.shift();
        if (!n) { clearInterval(wordT); wordT = null; return; }
        n.classList.add("in");
      };
      return {
        push(text) {
          const words = String(text).trim().split(/\s+/).filter(Boolean);
          // the last word may still be half-generated, so hold it back
          const ready = words.slice(0, Math.max(0, words.length - 1));
          for (let i = written; i < ready.length; i++) {
            const n = document.createElement("w");
            n.textContent = ready[i] + " ";
            el.appendChild(n);
            if (reduceMotion) n.classList.add("in"); else queue.push(n);
          }
          written = Math.max(written, ready.length);
          if (!reduceMotion && !wordT && queue.length) wordT = setInterval(flush, 55);
        },
        finish(text) {
          const words = String(text).trim().split(/\s+/).filter(Boolean);
          for (let i = written; i < words.length; i++) {
            const n = document.createElement("w");
            n.textContent = words[i] + " ";
            el.appendChild(n);
            if (reduceMotion) n.classList.add("in"); else queue.push(n);
          }
          written = words.length;
          if (reduceMotion) { el.classList.add("done"); return; }
          if (!wordT && queue.length) wordT = setInterval(flush, 55);
          const settle = setInterval(() => {
            if (queue.length) return;
            clearInterval(settle);
            setTimeout(() => el.classList.add("done"), 380);
          }, 80);
        }
      };
    }

    function skeleton() {
      return `
        <div class="algo-sum" data-algo-sum>
          <span class="algo-sk line w90"></span>
          <span class="algo-sk line w75"></span>
          <span class="algo-sk line w55"></span>
        </div>
        <div class="algo-skrow">
          ${[150, 118, 96, 132, 104, 160, 88, 124, 112].map(w =>
            `<span class="algo-sk pill" style="width:${w}px"></span>`).join("")}
        </div>`;
    }

    function body() {
      const { more, add } = pills();
      return `
        <div class="algo-sum" data-algo-sum></div>

        <div class="algo-h">What you want to see more of</div>
        <div class="algo-sub">Based on your two lists, summarised by AI ${chevSvg}</div>
        <div class="algo-pills" data-algo-more>
          ${more.map(r => `<button class="algo-pill" type="button" data-pill="${esc(r.label)}">${esc(r.label)}</button>`).join("")}
          ${add.map(r => `<button class="algo-pill add" type="button" data-pill="${esc(r.label)}" data-add>${esc(r.label)}</button>`).join("")}
        </div>

        <div class="algo-h">What you want to see less of</div>
        <div class="algo-pills" data-algo-less>
          <button class="algo-pill add" type="button" data-algo-add>Add</button>
        </div>`;
    }

    let loaded = false;
    // The skeleton holds until the first words exist, then the page appears and
    // the sentence keeps writing into it. Waiting for the whole answer meant six
    // seconds of grey bars; this shows the page at about two.
    async function fill() {
      let writer = null;
      const reveal = () => {
        if (writer) return writer;
        scroll.innerHTML = body();
        writer = wordWriter(scroll.querySelector("[data-algo-sum]"));
        return writer;
      };

      let text = null;
      const live = global.AlforaLLM;
      if (live && live.enabled()) {
        const out = await live.ask(PROMPT, {
          context: { screen: "Your algorithm", about: listForPrompt() },
          onDelta: soFar => { if (isOpen() && soFar.trim().split(/\s+/).length > 2) reveal().push(soFar); }
        }).catch(() => null);
        text = out && out.text;
      }
      if (!isOpen()) { loaded = false; return; }
      if (!text) {
        text = scriptedSummary();
        // nothing streamed, so give the skeleton a readable beat before the swap
        if (!writer) await new Promise(r => setTimeout(r, 420));
        if (!isOpen()) { loaded = false; return; }
      }
      reveal().finish(text);
      loaded = true;
    }

    function open() {
      if (!loaded) scroll.innerHTML = skeleton();
      root.classList.add("is-on");
      scroll.scrollTop = 0;
      if (typeof opts.onOpen === "function") opts.onOpen();
      if (!loaded) fill();
    }

    function close() {
      closeSheet();
      root.classList.remove("is-on");
      clearInterval(wordT);
      if (typeof opts.onClose === "function") opts.onClose();
    }

    function isOpen() { return root.classList.contains("is-on"); }

    // One field and nothing else: you type the thing you would rather not see
    // and it joins the list. No suggestions -- the page already made those.
    const sheet = root.querySelector("[data-algo-sheet]");
    const field = root.querySelector("[data-algo-input]");

    function openSheet(){
      sheet.classList.add("is-on");
      sheet.setAttribute("aria-hidden", "false");
      // focus without letting the browser scroll the phone to reach the field:
      // the overlay is absolutely positioned, so a scroll pushes it off screen
      setTimeout(() => {
        try { field.focus({ preventScroll: true }); } catch (_) { field.focus(); }
        if (phone.scrollTop) phone.scrollTop = 0;
      }, 320);
    }
    function closeSheet(){
      sheet.classList.remove("is-on");
      sheet.setAttribute("aria-hidden", "true");
      field.blur();
      field.value = "";
    }
    function commit(){
      const v = field.value.trim();
      if (!v) { closeSheet(); return; }
      const less = scroll.querySelector("[data-algo-less]");
      const addBtn = scroll.querySelector("[data-algo-add]");
      const already = [...scroll.querySelectorAll(".algo-pill[data-pill]")]
        .some(p => p.getAttribute("data-pill").toLowerCase() === v.toLowerCase());
      if (!already) {
        const pill = document.createElement("button");
        pill.type = "button";
        pill.className = "algo-pill less";
        pill.setAttribute("data-pill", v);
        pill.textContent = v;
        less.insertBefore(pill, addBtn);
      }
      closeSheet();
    }
    sheet.addEventListener("click", e => {
      if (e.target.closest("[data-algo-sheet-close]")) closeSheet();
    });
    field.addEventListener("keydown", e => {
      if (e.key === "Enter") { e.preventDefault(); commit(); }
      if (e.key === "Escape") closeSheet();
    });

    root.addEventListener("click", e => {
      if (e.target.closest("[data-algo-close]")) { close(); return; }

      const less = scroll.querySelector("[data-algo-less]");
      const more = scroll.querySelector("[data-algo-more]");
      const addBtn = scroll.querySelector("[data-algo-add]");

      if (e.target.closest("[data-algo-add]")) { openSheet(); return; }

      const pill = e.target.closest(".algo-pill");
      if (!pill) return;
      // a tap moves a pill between the two lists, which is the only thing the
      // page is actually for
      if (pill.classList.contains("less")) {
        pill.classList.remove("less");
        more.appendChild(pill);
      } else {
        pill.classList.remove("add");
        pill.classList.add("less");
        less.insertBefore(pill, addBtn);
      }
    });

    return { open, close, isOpen, el: root };
  }

  global.GummyAlgo = { create };
})(window);
