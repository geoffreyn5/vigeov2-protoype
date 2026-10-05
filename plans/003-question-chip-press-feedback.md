# 003 — Give the question chips press feedback

- **Status**: DONE
- **Commit**: 380efc9
- **Severity**: HIGH
- **Category**: Physicality & origin
- **Estimated scope**: 3 files, ~6 lines added

## Problem

`.qcard-q` is the question chip in the rail. It is a `<button>`, it is the most
tapped control in the product, and it appears on three separate screens. None of
the three has any `:active` state, and all of them remove the focus ring:

```css
/* share/ah-gummy-ask-carousel.html:637-650 — current */
  .qcard-q{
    position:relative;
    flex:0 0 auto;height:100%;
    display:flex;align-items:center;justify-content:center;
    padding:0 4px;
    font-size:14px;font-weight:500;letter-spacing:-.02em;line-height:1;
    color:rgba(255,255,255,.92);text-align:center;
    text-shadow:0 1px 10px rgba(0,0,0,.4);
    white-space:nowrap;
    scroll-snap-align:center;scroll-snap-stop:always;
    opacity:.38;
    outline:none;
  }
```

The other two definitions are at `share/ah-gummy-title.css:176`
(`.tpage .lane-q .qcard-q`) and `share/ah-gummy-my-stuff.html:705`
(`.lane-q .qcard-q`). Verified: `grep ".qcard-q:active"` returns nothing in any
file.

The audit rule: "Press feedback: `transform: scale(0.97)` on `:active` with
`transition: transform 160ms ease-out`." Tapping a question currently produces no
acknowledgement at all until the conversation sheet begins to open.

**One caveat the executor must respect:** `.qcard-q` already animates `opacity`
from JavaScript on every scroll frame (`btn.style.opacity = op` in `syncDots`,
`share/ah-gummy-ask-carousel.html:1774`). Do **not** add `opacity` to the
transition — it would fight the per-frame writes and smear the rail's focus
falloff. Transition `transform` only.

## Target

In each of the three files, add a `transition` for transform to the existing
`.qcard-q` rule and a new `:active` rule directly after it.

```css
/* target — added to the existing .qcard-q rule in each file */
    transition:transform .16s cubic-bezier(.22,.82,.28,1);

/* target — new rule immediately after each .qcard-q rule */
  .qcard-q:active{transform:scale(.97)}
```

Selector prefixes must match each file's existing specificity:

| File | Existing selector | New rule |
| --- | --- | --- |
| `share/ah-gummy-ask-carousel.html` | `.qcard-q` | `.qcard-q:active{transform:scale(.97)}` |
| `share/ah-gummy-title.css` | `.tpage .lane-q .qcard-q` | `.tpage .lane-q .qcard-q:active{transform:scale(.97)}` |
| `share/ah-gummy-my-stuff.html` | `.lane-q .qcard-q` | `.lane-q .qcard-q:active{transform:scale(.97)}` |

`cubic-bezier(.22,.82,.28,1)` is this repo's house ease-out curve (30 uses). `.16s`
matches the audit's 160ms press-feedback target. `scale(.97)` is inside the
prescribed 0.95–0.98 band.

## Repo conventions to follow

Two rules already do exactly this correctly — imitate them:

- `share/ah-gummy-title.css:83,85`
  ```css
    transition:transform .2s cubic-bezier(.22,.82,.28,1);
  /* … */
  .tpage-btn:active{transform:scale(.97)}
  ```
- `share/ah-algo.css:72,74`
  ```css
    transition:transform .18s cubic-bezier(.22,.82,.28,1), background .2s ease, border-color .2s ease;
  /* … */
  .algo-pill:active{transform:scale(.95)}
  ```

Both put the `:active` rule on its own single line immediately after the base
rule. Follow that.

## Steps

1. `share/ah-gummy-ask-carousel.html`: in the `.qcard-q{` rule (line 637), add
   `transition:transform .16s cubic-bezier(.22,.82,.28,1);` as a new line directly
   before the closing `}`. Then add `.qcard-q:active{transform:scale(.97)}` on its
   own line immediately after that rule's closing brace.
2. `share/ah-gummy-title.css`: same change inside `.tpage .lane-q .qcard-q` (line
   176), then add `.tpage .lane-q .qcard-q:active{transform:scale(.97)}` after it.
3. `share/ah-gummy-my-stuff.html`: same change inside `.lane-q .qcard-q` (line
   705), then add `.lane-q .qcard-q:active{transform:scale(.97)}` after it.
4. Check each file's `@media (prefers-reduced-motion: reduce)` block. If
   `.qcard-q` is **not** already listed there, leave it — a 0.97 press scale is
   feedback, not travel, and the audit says reduced motion should keep feedback.
   If `.qcard-q` **is** already caught by a blanket `transition:none` selector
   list in that block, do nothing about it here; plan 008 (reduced-motion, not yet
   written) handles that and will restore it.

## Boundaries

- Do NOT add `opacity` to the transition — see the caveat in Problem.
- Do NOT remove `outline:none`. Restoring a focus ring is a separate
  accessibility decision, not part of this motion fix.
- Do NOT change `scroll-snap-align`, `scroll-snap-stop`, or any layout property.
- Do NOT touch `.qcard-q.is-on`.
- Do NOT add dependencies.
- If a `.qcard-q` rule does not match the excerpt, STOP and report.

## Verification

- **Mechanical**: none — CSS only, no build. Load each page and confirm no
  console errors.
- **Feel check**: serve `share/` and test all three surfaces:
  1. `ah-gummy-ask-carousel.html` — wait for the rail, press and hold a question.
  2. `ah-gummy-search.html` → open any title → the question rail on the detail page.
  3. `ah-gummy-my-stuff.html` → the Watch List question rail.
  Confirm in each:
  - The chip shrinks slightly on finger-down and springs back on release. It
    should read as a button acknowledging the press, not as the chip moving.
  - Dragging the rail sideways does **not** leave chips stuck at 0.97 — press
    feedback must release when the gesture becomes a scroll.
  - The rail's dim-to-bright focus falloff while dragging is unchanged (if it now
    stutters, `opacity` was wrongly added to the transition).
  - In DevTools → Animations panel at 10% speed, the press and release are a
    single smooth scale, not a jump.
- **Done when**: all three rails give press feedback, the falloff is unchanged,
  and no chip can be left visually stuck mid-press.
