# 001 — Delete the dead layout-property transitions on `.convo`

- **Status**: DONE
- **Commit**: 380efc9
- **Severity**: HIGH
- **Category**: Performance
- **Estimated scope**: 1 file, 4 lines deleted

## Problem

`.convo` is the conversation panel on the reel feed — the highest-frequency
surface in the product. It declares a six-property transition running for
`var(--dur)` (620ms):

```css
/* share/ah-gummy-ask-carousel.html:710-729 — current */
  .convo{
    position:absolute;left:4.07cqw;right:4.07cqw;
    bottom:calc(8.45cqh + var(--safe-bottom));
    /* … */
    backdrop-filter:blur(18px) saturate(1.28);
    -webkit-backdrop-filter:blur(18px) saturate(1.28);
    box-shadow:0 10px 32px rgba(255,40,80,.07), inset 0 1px 0 rgba(255,255,255,.07);
    opacity:0;pointer-events:none;
    transform:translateY(18px);
    transition:
      transform var(--dur) var(--ease),
      opacity .28s ease,
      height var(--dur) var(--ease),
      left var(--dur) var(--ease),
      right var(--dur) var(--ease),
      border-radius var(--dur) var(--ease);
  }
```

`height`, `left`, `right` and `border-radius` are layout/paint properties. The
audit rule is "Animate `transform` and `opacity` only. `width`/`height`/
`margin`/`padding`/`top`/`left` trigger layout + paint + composite." This
element also carries a live `backdrop-filter` and two full-inset pseudo-elements
(`.convo::before` at :730, `.convo::after` at :734 using `mask-composite:exclude`),
so each frame would cost layout + repaint + backdrop re-sample + mask re-composite.

**Critical fact, verified before writing this plan:** those four properties never
change value. `.convo` has exactly two rules in the whole file — the base above
and the open state:

```css
/* share/ah-gummy-ask-carousel.html:742-744 — current */
  .slide.is-convo .convo{
    opacity:1;pointer-events:auto;transform:none;
  }
```

Only `opacity`, `pointer-events` and `transform` change. No JavaScript sets
`height`, `left`, `right` or `border-radius` on `.convo` (verified: no
`.style.height` / `.style.left` / `.style.right` assignments anywhere in the
file, and no other `.convo` rule exists besides the reduced-motion override at
:910 which sets `transform:none`).

So these four transition entries produce **no visual effect whatsoever**. They
are dead declarations that only give the browser more to watch. Deleting them is
a pure win with zero visual risk.

## Target

```css
/* target — share/ah-gummy-ask-carousel.html, inside .convo{} */
    transition:
      transform var(--dur) var(--ease),
      opacity .28s ease;
```

Nothing else in the rule changes. Do not alter `--dur`, `--ease`, the
`transform:translateY(18px)` start state, the backdrop-filter, or the open-state
rule at :742.

## Repo conventions to follow

- This file keeps its CSS in a single inline `<style>` block; edit it in place,
  do not extract to a stylesheet.
- Multi-property transitions in this codebase are written one property per line,
  indented six spaces, comma-separated — keep that shape (see the current code
  above, and `.ask-blob` at :501-503 for the same pattern).
- `var(--dur)` and `var(--ease)` are defined at :61-62. Leave them alone; plan
  007 (not yet written) may revisit the 620ms value separately.

## Steps

1. Open `share/ah-gummy-ask-carousel.html`.
2. Find the `.convo{` rule (starts at line 710).
3. In its `transition:` declaration, delete these four lines exactly:
   ```
         height var(--dur) var(--ease),
         left var(--dur) var(--ease),
         right var(--dur) var(--ease),
         border-radius var(--dur) var(--ease);
   ```
4. Change the line above them from `opacity .28s ease,` to `opacity .28s ease;`
   so the declaration terminates correctly.

## Boundaries

- Do NOT touch any other rule in this file.
- Do NOT change `--dur` or `--ease`.
- Do NOT touch `.csheet-panel` in `share/ah-gummy-convo.css`, which has a
  similar `height` transition — that one is a separate finding and the height
  there *does* change.
- Do NOT add dependencies or restructure markup.
- If the `.convo` rule does not match the excerpt above, STOP and report.

## Verification

- **Mechanical**: the file is static HTML; there is no build. Confirm the page
  still parses by loading it — see feel check.
- **Feel check**: serve `share/` and open `ah-gummy-ask-carousel.html`. Wait for
  the question rail to arrive, tap a question to open the conversation panel,
  then close it. Confirm:
  - The panel still fades and slides up from `translateY(18px)` exactly as before
    — this change must be visually **indistinguishable**.
  - The panel's size, side insets and corner radius are unchanged in both states.
  - In DevTools → Rendering → enable "Paint flashing", open and close the panel.
    Before the change the panel area repaints continuously during the 620ms;
    after, the repainting should be markedly reduced.
- **Done when**: the four transition entries are gone, and opening/closing the
  conversation panel looks identical to the pre-change build.
