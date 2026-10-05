# 006 — Open the title overlay from the poster that was tapped

- **Status**: DONE
- **Commit**: 380efc9
- **Severity**: MEDIUM (additive — new motion, nothing is broken today)
- **Category**: Missed opportunities
- **Estimated scope**: 4 files, ~45 lines added

## Problem

Tapping a poster anywhere in the app opens the title overlay with the same
generic bottom-sheet slide:

```css
/* share/ah-gummy-title.css:2-10 — current */
.tpage{
  position:absolute;inset:0;z-index:80;
  display:flex;flex-direction:column;
  background:#0c0c10;color:#fff;
  transform:translateY(105%);
  visibility:hidden;
  pointer-events:none;
  transition:transform .55s cubic-bezier(.32,.72,.24,1), visibility 0s linear .55s;
}
```

```js
/* share/ah-gummy-title.js:1046-1063 — current */
    function open(raw, startId) {
      const item = enrich(raw);
      if (!item || !item.title) return;
      current = item;
      /* … */
      render();
      hydrate(item);
      root.classList.add("is-on");
      phone.classList.add("is-title");
      scroll.scrollTop = 0;
      if (typeof opts.onOpen === "function") opts.onOpen(item);
      if (startId && convo) convo.open(startId);
    }
```

`open()` never reads the tapped element. No `getBoundingClientRect`, no
transform-origin, no reference to the source node — the overlay has no idea where
it came from. The same 550ms slide plays whether you tapped the reel's dock
poster, a My Stuff grid card, or an `.ask-shot` poster inside a conversation.

This matters more than a usual "could animate" because **there is a real shared
element**: the overlay renders the same poster image you just tapped, at
`share/ah-gummy-title.css:54-61` (`.tpage-poster img`). The audit's category 8
case is "spatially-connected UI with no motion explaining where it came from",
and the connection here is literal, not hypothetical.

## Target

Keep the existing slide as the baseline, and add a short poster flight on top of
it: a clone of the tapped poster animates from its on-screen rect to where the
overlay's poster will sit, then hands off.

Add to `share/ah-gummy-title.css`:

```css
/* target — new rules at the end of share/ah-gummy-title.css */
/* A clone of the tapped poster, flown from its place in the page to the hero.
   It is a throwaway element: created on open, removed when it lands. */
.tpage-fly{
  position:absolute;z-index:81;
  border-radius:9px;overflow:hidden;
  box-shadow:0 18px 44px rgba(0,0,0,.5);
  pointer-events:none;
  will-change:transform;
  transition:transform .42s cubic-bezier(.22,.82,.28,1), opacity .12s linear .3s;
}
.tpage-fly img{width:100%;height:100%;object-fit:cover;display:block}
.tpage-fly.is-landing{opacity:0}
/* while a flight is running the real poster waits, so the two never double-expose */
.tpage.is-flying .tpage-poster{opacity:0}
.tpage.is-flying .tpage-poster{transition:opacity .12s linear .3s}

@media (prefers-reduced-motion: reduce){
  .tpage-fly{display:none}
  .tpage.is-flying .tpage-poster{opacity:1}
}
```

Add to `share/ah-gummy-title.js`, inside the same closure as `open()`:

```js
/* target — new function in share/ah-gummy-title.js, above open() */
    // Flies a copy of the tapped poster to the hero. Purely additive: if the
    // caller passed no source element, or the art is missing, the overlay just
    // does its normal slide and nothing here runs.
    function flyFrom(srcEl, posterUrl) {
      if (!srcEl || !posterUrl || reduceMotion) return;
      const from = srcEl.getBoundingClientRect();
      if (!from.width || !from.height) return;
      const host = phone.getBoundingClientRect();
      const target = root.querySelector(".tpage-poster");
      if (!target) return;
      const to = target.getBoundingClientRect();
      if (!to.width || !to.height) return;

      const fly = document.createElement("div");
      fly.className = "tpage-fly";
      fly.style.left = `${from.left - host.left}px`;
      fly.style.top = `${from.top - host.top}px`;
      fly.style.width = `${from.width}px`;
      fly.style.height = `${from.height}px`;
      fly.innerHTML = `<img src="${posterUrl}" alt="">`;
      phone.appendChild(fly);
      root.classList.add("is-flying");

      // translate + scale rather than animating left/top/width/height, so the
      // whole flight stays on the compositor
      const dx = (to.left - from.left);
      const dy = (to.top - from.top);
      const sx = to.width / from.width;
      const sy = to.height / from.height;
      requestAnimationFrame(() => {
        fly.style.transformOrigin = "top left";
        fly.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
        fly.classList.add("is-landing");
      });

      const done = () => {
        fly.remove();
        root.classList.remove("is-flying");
      };
      fly.addEventListener("transitionend", e => {
        if (e.propertyName === "transform") done();
      }, { once: true });
      setTimeout(done, 700);   // belt and braces if transitionend never fires
    }
```

And thread a source element through `open()`:

```js
/* target — share/ah-gummy-title.js, open() signature and body */
    function open(raw, startId, srcEl) {
      /* … everything unchanged up to … */
      root.classList.add("is-on");
      phone.classList.add("is-title");
      scroll.scrollTop = 0;
      flyFrom(srcEl, item.poster);
      if (typeof opts.onOpen === "function") opts.onOpen(item);
      if (startId && convo) convo.open(startId);
    }
```

Timings: `.42s` for the flight sits inside the audit's 200–500ms modal/drawer
band and lands before the overlay's own 550ms slide finishes, so the handoff
reads as one movement. `cubic-bezier(.22,.82,.28,1)` is the house ease-out curve.

## Repo conventions to follow

- `share/ah-gummy-title.js` is an IIFE exposing `global.GummyTitle`; `phone`,
  `root`, `scroll` and `reduceMotion` are already in scope inside `create()`.
  Add `flyFrom` in that same scope — do not create a module.
- The codebase appends throwaway overlay elements to `phone`, not `document.body`
  — exemplar: `phone.appendChild(root)` in `share/ah-algo.js:36`. Follow that, and
  note the coordinates above are deliberately made relative to `phone`'s rect for
  this reason.
- Comments explain *why*, in sentence case, above the code.

## Steps

1. `share/ah-gummy-title.css`: append the new rules from the Target section at
   the end of the file.
2. `share/ah-gummy-title.js`: add `flyFrom` immediately above `function open(`
   (currently line 1046).
3. `share/ah-gummy-title.js`: change `function open(raw, startId)` to
   `function open(raw, startId, srcEl)` and add the `flyFrom(srcEl, item.poster);`
   call on the line after `scroll.scrollTop = 0;`.
4. Pass the tapped element from each call site. All six, with the element to pass:
   - `share/ah-gummy-ask-carousel.html:2208` — inside the `feedEl` click handler;
     pass `e.target.closest("[data-poster]")`.
   - `share/ah-gummy-ask-carousel.html:1904` — `onOpenTitle(item)` from the convo;
     this one has no element to hand over. Leave it as is; the overlay will slide
     normally. Do not invent a source.
   - `share/ah-gummy-my-stuff.html:1888` — pass the closest card element the
     handler already has.
   - `share/ah-gummy-my-stuff.html:1819` — same as the carousel's convo case:
     leave alone.
   - `share/ah-gummy-search.html:2230` and `:2232` — these come from
     `openTitleFrom(el)`, which already receives the element. Pass `el` through as
     the third argument. Note `openTitleFrom` is also called with a synthetic
     `document.createElement("div")` in some paths — `flyFrom` already guards
     against a zero-size rect, so those fall back to the plain slide safely.
5. Verify no call site passes a detached element: `flyFrom` returns early when
   `from.width` or `from.height` is 0, which covers it.

## Boundaries

- Do NOT change the existing `.tpage` slide transition — the flight is layered on
  top, and must still work if `flyFrom` does nothing.
- Do NOT animate `left`/`top`/`width`/`height` on the flying clone. Position it
  once, then animate `transform` only.
- Do NOT make this a shared-element transition API or reach for the View
  Transitions API — browser support is uneven and this prototype is demoed on a
  phone.
- Do NOT touch `close()`. A reverse flight on close is a separate idea and is out
  of scope.
- Do NOT add dependencies.
- If `open()` does not match the excerpt, STOP and report.

## Verification

- **Mechanical**: `node --check share/ah-gummy-title.js` must pass.
- **Feel check**: serve `share/` and open a title from every route:
  1. Reel feed → tap the dock poster.
  2. Search → tap a collection card, and a poster in a collection detail.
  3. My Stuff → tap a Watch List card and a Continue-watching card.
  4. A conversation answer → tap a poster in the answer lane (this route has no
     source element, so it must do the plain slide — confirm it still works).
  Confirm:
  - The poster appears to travel from where you tapped to the hero, rather than
    the panel arriving with a poster already in it.
  - The flight lands *before* the overlay finishes sliding; there should be no
    moment where a flying poster sits over a finished page.
  - There is never a visible double poster — the real `.tpage-poster` must stay
    hidden until the clone has landed.
  - The clone is gone from the DOM afterwards: open and close the overlay ten
    times, then check `document.querySelectorAll('.tpage-fly').length === 0`.
  - In DevTools → Animations at 10%, the clone scales smoothly and does not
    jump at handoff.
  - Toggle `prefers-reduced-motion` (DevTools → Rendering) and confirm no flight
    happens at all and the poster is visible immediately.
- **Done when**: all four routes behave as described, no orphan `.tpage-fly`
  elements accumulate, and `node --check` passes.
