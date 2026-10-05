# 004 — Consolidate press feedback onto one scale and one curve

- **Status**: DONE
- **Commit**: 380efc9
- **Severity**: HIGH
- **Category**: Cohesion & tokens
- **Estimated scope**: 5 files, ~20 small edits

## Problem

Press feedback exists nearly everywhere, which is good. But it has drifted into
**nine different scale values** across the app:

```
.92  .94  .95  .96  .97  .978  .98  .982  .985
```

The audit rule is "Press feedback: `transform: scale(0.97)` on `:active` with
`transition: transform 160ms ease-out`. Keep it subtle (0.95–0.98)."

Two classes of problem follow from that spread:

**(a) Values outside the 0.95–0.98 band.**

```css
/* share/ah-gummy-title.css:31 — current */
.tpage-close:active{transform:scale(.92)}
```
```css
/* share/ah-algo.css:34 — current */
.algo-back:active{transform:scale(.94)}
```
On 40px circular targets an 8% and 6% shrink read as the button collapsing
rather than depressing.

**(b) Press scale declared with no transition at all**, so press and release are
both instantaneous jumps rather than motion:

```css
/* share/ah-algo.css:27-34 — current, .algo-back has no transition property */
.algo-back{
  flex:0 0 auto;width:40px;height:40px;border-radius:50%;padding:0;cursor:pointer;
  display:grid;place-items:center;
  background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);
  color:#fff;
}
.algo-back svg{...}
.algo-back:active{transform:scale(.94)}
```
```css
/* share/ah-algo.css:102-108 — current, .algo-sheet-handle has no :active at all */
.algo-sheet-handle{
  display:block;width:100%;padding:8px 0 14px;background:none;border:0;cursor:pointer;
}
```

**(c) Transitions far over the 160ms press budget**, so the release lags the
finger:

```css
/* share/ah-gummy-following.html:344 (base rule at :324-343) — current */
  .pill{
    /* … */
    transition:transform .42s var(--ease-jelly), box-shadow .42s ease;
  }
  .pill:active{transform:scale(.96)}
```
420ms means the shrink is still travelling a quarter-second after release.

## Target

One value, one curve, one duration for every press target in the app:

```css
/* target, applied to every :active press rule listed in Steps */
<selector>:active{transform:scale(.97)}

/* and on each corresponding base rule, for the transform only */
transition:transform .16s cubic-bezier(.22,.82,.28,1);
```

`cubic-bezier(.22,.82,.28,1)` is the house ease-out curve (30 existing uses).
`.16s` is the audit's press target. `.97` is the audit's prescribed value and sits
mid-band.

Where a base rule already transitions other properties alongside transform, keep
those and change only the transform segment. Example:

```css
/* share/ah-gummy-following.html .pill — target */
    transition:transform .16s cubic-bezier(.22,.82,.28,1), box-shadow .42s ease;
```

## Repo conventions to follow

- `share/ah-gummy-title.css:83,85` and `share/ah-algo.css:72,74` are the two
  reference implementations — base rule carries the transform transition, the
  `:active` rule sits on its own line directly after.
- Values are written without a leading zero (`.97`, `.16s`) throughout this
  codebase. Match that.

## Steps

Apply the target to each of the following. For each: set the `:active` scale to
`.97`, and ensure the base rule transitions `transform` at
`.16s cubic-bezier(.22,.82,.28,1)` (adding the transition if absent, or replacing
only the transform segment if a transition already exists).

**share/ah-algo.css**
1. `.algo-back` (base :27, active :34) — scale `.94` → `.97`; add transition (none present).
2. `.algo-pill` (base :68, active :74) — scale `.95` → `.97`; existing transition is `.18s` → change the transform segment to `.16s`, keep `background .2s ease, border-color .2s ease`.
3. `.algo-sheet-handle` (:102) — has no `:active` at all. Add `.algo-sheet-handle:active{transform:scale(.97)}` and a transform transition on the base rule.

**share/ah-gummy-title.css**
4. `.tpage-close` (base :24, active :31) — scale `.92` → `.97`; existing transition is `.2s` → `.16s`.
5. `.tpage-btn` (base :79, active :85) — scale already `.97`; existing transition `.2s` → `.16s`.

**share/ah-gummy-convo.css**
6. `.ask-shot` (active :189) — scale `.96` → `.97`; base rule at :184 already has `transition:transform .2s cubic-bezier(.22,.82,.28,1)` → `.16s`.

**share/ah-gummy-following.html**
7. `.pill` (:344), `.tcard` (:388), `.ai-card` (:471), `.mood` (:559), `.j-poster` (:688), `.j-empty` (:706), `.plan-week` (:727).

**share/ah-gummy-my-stuff.html**
8. `.cont-card` (:358), `.lane-card` (:518), `.up-card` (:533), `.event` (:619), `.sb-fychip` (:883).

**share/ah-gummy-search.html**
9. `.sr-reel` (:794), `.sr-coll` (:834), `.sr-genre` (:859), `.sr-d-card` (:914), `.qcell` (:1008), `.prev-card` (:1040), `.hints.follow .mood` (:435).

**share/ah-gummy-ask-carousel.html**
10. `.ad-cta` (:450).

11. After all edits, verify the spread is gone:
    ```
    grep -rhoE ":active\{transform:scale\(\.[0-9]+\)" share/*.css share/ah-gummy-ask-carousel.html share/ah-gummy-my-stuff.html share/ah-gummy-search.html share/ah-gummy-following.html | sort | uniq -c
    ```
    Expected: a single line, all occurrences `scale(.97)`.

## Boundaries

- Do NOT touch `share/ah-gummy-shop.html` or `share/ah-gummy-ask-smear.html` —
  neither is reachable from the shell. Their press rules stay as they are, and
  they are excluded from the step 11 grep.
- Do NOT touch `.qcard-q` — plan 003 adds its press feedback; if 003 has already
  run, its value is already `.97` and needs no change here.
- Do NOT change any non-transform segment of an existing transition (keep
  `box-shadow`, `background`, `border-color`, `opacity` segments at their current
  durations).
- Do NOT introduce a shared CSS custom property for this. Each page is a separate
  iframe document, so a token defined in one file cannot inherit into another —
  that is exactly the trap plan 005 documents. Write the literal value.
- Do NOT add dependencies.
- If a selector is not found at the cited line, search the file for it before
  giving up; if it genuinely does not exist, note it and continue with the rest.

## Verification

- **Mechanical**: run the step 11 grep. One output line, `scale(.97)`.
- **Feel check**: serve `share/` and press-and-hold a control on each surface —
  a reel poster, a My Stuff card, a Following pill, a Search collection, the
  title page's Watch button, an algorithm pill, and the algorithm back button.
  Confirm:
  - Every press feels like the same gesture. The depth should be identical
    whether the target is a 40px circle or a 162px card.
  - `.tpage-close` and `.algo-back` no longer look like they collapse.
  - `.algo-back` and `.algo-sheet-handle` now animate rather than snapping.
  - The Following `.pill` releases with the finger rather than a beat later.
  - In DevTools → Animations at 10%, a press and release is one smooth scale.
- **Done when**: the grep shows a single value, and no press target in the app
  either jumps instantly or lags noticeably behind release.
