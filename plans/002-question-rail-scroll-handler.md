# 002 — Strip dead work and layout thrash from the question-rail scroll handler

- **Status**: DONE
- **Commit**: 380efc9
- **Severity**: HIGH
- **Category**: Performance
- **Estimated scope**: 1 file, ~15 lines changed

## Problem

`syncDots` runs on every `scroll` event of the question rail — the rail the user
drags constantly on the reel feed, rated very-high-frequency.

```js
/* share/ah-gummy-ask-carousel.html:1752-1791 — current */
  const syncDots = () => {
    padTrack();
    const mid = track.scrollLeft + track.clientWidth / 2;
    const centers = qBtns.map(btn => btn.offsetLeft + btn.offsetWidth / 2);
    /* … interpolation … */
    qSkins.forEach((el, n) => {
      const inf = Math.max(0, 1 - Math.abs(p - n));
      el.style.opacity = inf;
      el.style.transform = reduceMotion ? "none" : `translateX(${((p - n) * -14).toFixed(1)}px)`;
    });
    /* … */
    if (wrap) {
      wrap.style.setProperty("--tone-0", String(Math.max(0, 1 - Math.abs(p - 0))));
      wrap.style.setProperty("--tone-1", String(Math.max(0, 1 - Math.abs(p - 1))));
      wrap.style.setProperty("--tone-2", String(Math.max(0, 1 - Math.abs(p - 2))));
      wrap.style.setProperty("--beam", TONE_BEAM[t > 0.5 ? i1 : i0]);
    }
  };
  track.addEventListener("scroll", syncDots, { passive: true });
```

Three separate problems, two of which are pure waste:

**(a) `qSkins` writes are dead.** `qSkins` is `slide.querySelectorAll("[data-qskin]")`
(:1726), and those elements are hidden:

```css
/* share/ah-gummy-ask-carousel.html:597 — current */
  .qskin{display:none}
```

Every scroll frame computes and writes `opacity` and a `translateX` transform to
elements that are `display:none`. Verified: `.qskin` has no other rule that
re-shows it.

**(b) `--beam` has no consumer.** `wrap.style.setProperty("--beam", …)` is written
every frame. A grep for `var(--beam` in this file returns **0 matches** — nothing
reads it.

**(c) Parent-variable writes driving children.** `--tone-0/1/2` are set on `.qwrap`
and consumed by descendants at :658, :662, :666 (`.q-star-in[data-starin="0"]{opacity:var(--tone-0)}`)
and :682, :686, :690 (`.qbeam-in[...]`). The audit rule: "**Don't drive child
transforms via a CSS variable on the parent** — it recalcs styles for all
children." These are opacity rather than transform, so the cost is lower than the
worst case, but it is still a subtree style invalidation on every scroll event.

Compounding all three, `padTrack()` and the `centers` map read `clientWidth`,
`offsetLeft` and `offsetWidth` **inside the scroll handler**, forcing synchronous
layout, and `padTrack()` also *writes* `track.style.paddingLeft/paddingRight` —
a write-then-read pattern.

## Target

Delete (a) and (b) outright. Keep (c) but stop recomputing it when nothing
changed. Keep all visible behaviour identical.

```js
/* target — share/ah-gummy-ask-carousel.html, replacing the three blocks noted */

    // .qskin is display:none (see the .qskin rule in this file), so the old
    // per-frame opacity/transform writes here were work with no output.
    aSkins.forEach((el, n) => {
      el.style.opacity = Math.max(0, 1 - Math.abs(p - n));
    });
    if (blob) blob.style.setProperty("--ask-glow", TONE_GLOW[t > 0.5 ? i1 : i0]);
    if (wrap) {
      // writing these invalidates style for every descendant that reads them, so
      // only write when the rounded value actually changed
      const k = `${Math.round(p * 100)}`;
      if (wrap._toneKey !== k) {
        wrap._toneKey = k;
        wrap.style.setProperty("--tone-0", String(Math.max(0, 1 - Math.abs(p - 0))));
        wrap.style.setProperty("--tone-1", String(Math.max(0, 1 - Math.abs(p - 1))));
        wrap.style.setProperty("--tone-2", String(Math.max(0, 1 - Math.abs(p - 2))));
      }
    }
```

Note `--beam` is simply gone, and the `qSkins.forEach` block is gone.

## Repo conventions to follow

- This codebase stashes per-element scratch state as an underscore-prefixed
  expando on the DOM node. Exemplar: `slide._qPadKey` at
  `share/ah-gummy-ask-carousel.html:1746` and `wrap._qOn` at :1735. `wrap._toneKey`
  above follows that convention — do not introduce a WeakMap or a module-level
  cache instead.
- Comments in this file explain *why*, in sentence case, above the code they
  describe. Match that.

## Steps

1. Open `share/ah-gummy-ask-carousel.html`.
2. In `syncDots` (starts line 1752), delete the entire `qSkins.forEach((el, n) => { … });`
   block (lines 1776-1780 in the current file), replacing it with the one-line
   comment shown in the Target section above the `aSkins.forEach` block.
3. In the `if (wrap) { … }` block, delete the `--beam` line entirely:
   ```
         wrap.style.setProperty("--beam", TONE_BEAM[t > 0.5 ? i1 : i0]);
   ```
4. Wrap the three remaining `--tone-*` writes in the `wrap._toneKey` guard exactly
   as shown in the Target section.
5. Check whether `qSkins` and `TONE_BEAM` are now unused. Search the file:
   - If `qSkins` has no remaining references, delete its declaration at line 1726
     (`const qSkins = slide.querySelectorAll("[data-qskin]");`).
   - If `TONE_BEAM` has no remaining references, delete its declaration too.
   - If either still has a reference elsewhere, leave the declaration alone.

## Boundaries

- Do NOT remove the `.qskin{display:none}` rule or the `[data-qskin]` markup —
  removing the dead *writes* is the whole scope. Someone may re-enable the skins
  later; that is a design decision, not a performance one.
- Do NOT touch `aSkins` — `.askin` at :505 is visible and those writes are live.
- Do NOT change `padTrack()` in this plan. Its read/write pattern is a real issue
  but fixing it safely needs a separate change; it is out of scope here.
- Do NOT change the visible interpolation maths (`p`, `i0`, `i1`, `t`) or the
  `btn.style.opacity` / `is-on` writes.
- Do NOT add dependencies.
- If the code does not match the excerpts above, STOP and report.

## Verification

- **Mechanical**: `node --check` does not apply (inline script in HTML). Instead,
  load the page and confirm the browser console is free of `ReferenceError` —
  particularly if you deleted `qSkins` or `TONE_BEAM` in step 5.
- **Feel check**: serve `share/` and open `ah-gummy-ask-carousel.html`. Wait for
  the question rail, then drag it left and right repeatedly. Confirm:
  - The focused question still brightens and the neighbours still dim, exactly as
    before — the `btn.style.opacity` behaviour is untouched.
  - The glow beam under the rail still changes colour as you swipe between
    questions (that is `--tone-0/1/2` driving `.qbeam-in`). If the beam stops
    responding, the `_toneKey` guard is too coarse — report it rather than
    widening the guard blindly.
  - The Ask blob still recolours as you swipe (`--ask-glow`, untouched).
  - In DevTools → Performance, record a 3-second rail drag before and after.
    "Recalculate Style" time during the drag should drop.
- **Done when**: the rail looks and behaves identically, the console is clean, and
  no `--beam` or `[data-qskin]` writes remain in `syncDots`.
