# 005 — Dismiss the conversation sheet on velocity, and rubber-band the top edge

- **Status**: DONE
- **Commit**: 380efc9
- **Severity**: HIGH
- **Category**: Interruptibility
- **Estimated scope**: 1 file, ~25 lines changed

## Problem

The conversation sheet's drag handle is the most physical gesture in the product
and it behaves like neither a sheet nor a real object.

```js
/* share/ah-gummy-convo.js:378-399 — current */
    const handle = sheet.querySelector(".csheet-handle");
    if (handle) {
      handle.addEventListener("pointerdown", e => {
        const p = panel();
        if (!p) return;
        drag = { y: e.clientY, id: e.pointerId };
        sheet.classList.add("is-drag");
        try { handle.setPointerCapture(e.pointerId); } catch (_) {}
      });
      handle.addEventListener("pointermove", e => {
        if (!drag || e.pointerId !== drag.id) return;
        const dy = Math.max(0, e.clientY - drag.y);
        const p = panel();
        if (p) p.style.transform = `translateY(${dy}px)`;
      });
      const end = e => {
        if (!drag || e.pointerId !== drag.id) return;
        const dy = Math.max(0, e.clientY - drag.y);
        drag = null;
        sheet.classList.remove("is-drag");
        const p = panel();
        if (p) p.style.transform = "";
        if (dy > 88 || dy < 8) close();
      };
```

**(a) Velocity is not merely unused — it is uncomputable.** `drag` stores only
`{ y, id }`. No timestamp is recorded at `pointerdown`, so elapsed time is not
available at `end`. Dismissal is `dy > 88`: pure distance. The audit rule is
"dismiss on `Math.abs(distance)/elapsedMs > ~0.11`, not distance thresholds
alone". Today a fast 60px flick — unmistakably a dismiss — springs back, while a
slow 90px creep dismisses.

**(b) The top boundary is a hard stop.** `Math.max(0, e.clientY - drag.y)` clamps
upward travel to exactly zero. Drag up and the panel does not move at all; the
finger detaches from the object. The audit rule names "hard stops at drag
boundaries instead of rising friction".

Note `dy < 8` closing the sheet is **correct and must be preserved** — it is the
tap-to-close affordance on the handle, not a drag threshold.

## Target

Record a timestamp, allow a damped overscroll upward, and dismiss on velocity OR
distance.

```js
/* target — share/ah-gummy-convo.js, replacing lines 378-399 */
    const handle = sheet.querySelector(".csheet-handle");
    if (handle) {
      handle.addEventListener("pointerdown", e => {
        const p = panel();
        if (!p) return;
        drag = { y: e.clientY, id: e.pointerId, t: e.timeStamp, last: e.clientY, lastT: e.timeStamp };
        sheet.classList.add("is-drag");
        try { handle.setPointerCapture(e.pointerId); } catch (_) {}
      });
      handle.addEventListener("pointermove", e => {
        if (!drag || e.pointerId !== drag.id) return;
        const raw = e.clientY - drag.y;
        // rising friction above the top edge rather than a dead stop: the panel
        // keeps following the finger, just less and less
        const dy = raw >= 0 ? raw : -Math.pow(-raw, 0.7) * 0.5;
        drag.last = e.clientY;
        drag.lastT = e.timeStamp;
        const p = panel();
        if (p) p.style.transform = `translateY(${dy.toFixed(1)}px)`;
      });
      const end = e => {
        if (!drag || e.pointerId !== drag.id) return;
        const dy = Math.max(0, e.clientY - drag.y);
        // px per ms over the whole gesture; 0.11 is the audit's flick threshold
        const ms = Math.max(1, e.timeStamp - drag.t);
        const v = dy / ms;
        drag = null;
        sheet.classList.remove("is-drag");
        const p = panel();
        if (p) p.style.transform = "";
        if (dy < 8) { close(); return; }            // a tap on the handle
        if (v > 0.11 || dy > 88) close();           // flicked away, or dragged far
      };
```

Values, all from the audit catalog or derived from the existing code:
- `0.11` px/ms — the catalog's flick threshold, verbatim.
- `88` px — the existing distance threshold, unchanged.
- `8` px — the existing tap threshold, unchanged.
- `0.7` exponent and `0.5` factor — standard rubber-band damping; at 100px of
  upward pull the panel rises about 12px, which reads as resistance rather than
  travel.

## Repo conventions to follow

- `share/ah-gummy-convo.js` uses plain pointer events with `setPointerCapture`,
  no library. Keep that.
- `share/ah-gummy-convo.css:54` already has `.csheet.is-drag .csheet-panel{transition:none}`
  so the panel follows the finger 1:1 during a drag and the transition resumes on
  release. That is correct — do not change it, and do not add a spring.
- The codebase comments *why* above the line, in sentence case. Match the style of
  the comments in the target block.

## Steps

1. Open `share/ah-gummy-convo.js`.
2. Replace the whole `pointerdown` handler body with the target version — the
   only change is adding `t`, `last` and `lastT` to the `drag` object.
3. Replace the `pointermove` handler with the target version — it introduces
   `raw`, the damped `dy`, and the `drag.last` / `drag.lastT` updates.
4. Replace the `end` function with the target version — it computes `ms` and `v`,
   and splits the old combined `if (dy > 88 || dy < 8) close();` into the tap case
   first and the flick-or-distance case second.
5. Leave the `pointerup` / `pointercancel` registrations below (currently lines
   400-401) exactly as they are.

## Boundaries

- Do NOT change `close()`, `panel()`, or anything else in the file.
- Do NOT remove the `dy < 8` tap-to-close behaviour.
- Do NOT touch `share/ah-gummy-convo.css` — the `is-drag` transition suppression
  is already correct.
- Do NOT apply this to `share/ah-algo.js`'s sheet; that one has no drag handle,
  only a tap-to-close button.
- Do NOT add a dependency or a spring library. This is a prototype with no build
  step.
- If the code does not match the excerpt above, STOP and report.

## Verification

- **Mechanical**: `node --check share/ah-gummy-convo.js` must pass.
- **Feel check**: this one genuinely cannot be judged from code — it must be
  tried with a finger or a trackpad drag. Serve `share/`, open
  `ah-gummy-ask-carousel.html`, tap a question to open the conversation sheet,
  then on the handle:
  - **Fast flick down, short distance (~50px, quick).** Must dismiss. This is the
    case that is broken today.
  - **Slow drag down past 88px.** Must dismiss.
  - **Slow drag down to ~60px then release.** Must spring back, not dismiss.
  - **Drag upward.** The panel must move slightly and resist, following the finger
    with decreasing travel — not freeze dead as it does today. Release must return
    it smoothly.
  - **Single tap on the handle.** Must still close the sheet.
  - Drag down and back up without releasing: the panel must track the finger the
    whole time with no jump at the zero crossing.
- **Done when**: all six cases above behave as described, and `node --check`
  passes.
