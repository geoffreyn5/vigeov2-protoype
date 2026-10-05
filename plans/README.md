# Animation plans

Produced by an audit of the prototype's motion against Emil Kowalski's animation
philosophy. Each plan is self-contained: exact file paths, current code, target
values and a feel check. They can be executed in any order unless noted.

Audit commit: `380efc9`.

| # | Title | Severity | Category | Files | Status |
| --- | --- | --- | --- | --- | --- |
| [001](001-convo-dead-layout-transitions.md) | Delete the dead layout-property transitions on `.convo` | HIGH | Performance | 1 | DONE |
| [002](002-question-rail-scroll-handler.md) | Strip dead work and layout thrash from the question-rail scroll handler | HIGH | Performance | 1 | DONE |
| [003](003-question-chip-press-feedback.md) | Give the question chips press feedback | HIGH | Physicality | 3 | DONE |
| [004](004-press-feedback-consolidation.md) | Consolidate press feedback onto one scale and one curve | HIGH | Cohesion | 5 | DONE |
| [005](005-sheet-drag-velocity-and-rubber-band.md) | Dismiss the conversation sheet on velocity, and rubber-band the top edge | HIGH | Interruptibility | 1 | DONE |
| [006](006-title-overlay-from-tapped-poster.md) | Open the title overlay from the poster that was tapped | MEDIUM | Missed opportunity | 4 | DONE |

## Recommended execution order

1. **001** — pure deletion, no visual change, zero risk. Gets a performance win
   banked before anything else moves.
2. **002** — also mostly deletion. Independent of 001.
3. **003** — adds the missing press feedback on the most-tapped control.
4. **004** — consolidates every *other* press target onto the same values. Run
   after 003 so the question chips are already at `.97` and need no second visit.
5. **005** — the biggest change in how the product feels, and the one that must
   be tried with a finger. Independent of everything above.
6. **006** — additive new motion. Do it last: it is the only plan that adds a
   feature rather than correcting one, and it benefits from 004 having settled
   the press values on the posters it flies from.

## Dependencies

- **003 → 004**: soft. 004 explicitly excludes `.qcard-q` on the assumption 003
  has set it to `.97`. If 004 runs first, add `.qcard-q` to its list.
- **004 → 006**: soft, ordering only. No shared code.
- 001, 002 and 005 are fully independent of each other and of the rest.

## Deliberately not planned

Three findings from the audit were rejected or deferred, recorded here so they
are not re-discovered later:

- **"Delete the auto-opening Ask sheet."** Rejected. The auto-arriving question
  rail is the prototype's documented premise — see the page's own description at
  `share/ah-gummy-ask-carousel.html:932`: *"After a beat a full-width question
  frame slides in above the tab bar, and the title moves up with it."* Changing it
  is a product decision, not a motion fix.
- **Easing and duration consolidation** (6 near-identical curves; `--ease-jelly`
  used 7× but defined 0× in `ah-gummy-search.html`; durations of 450–780ms on UI
  elements). Real and worth doing, but it touches every file and is better done as
  its own pass once the above have landed.
- **Reduced-motion blocks that nuke all feedback** (`ah-gummy-ask-carousel.html:901`,
  `ah-gummy-my-stuff.html:805`, `ah-gummy-following.html:888` blanket
  `transition:none !important`). A real accessibility finding; deferred because
  rewriting them safely depends on which transitions survive the plans above.

## Verified as already correct

Do not "fix" these:

- No `:hover` motion anywhere in the repo — correct for a touch prototype, so the
  `@media (hover: hover)` gate is unnecessary rather than missing.
- The shell's tab switch cuts instantly with no transition
  (`share/index.html:124-128`) — correct at that frequency.
- The gyro tilt sets `--rx`/`--ry` on the same element whose `transform` consumes
  them, not on a parent driving children — not a performance violation.
- `.csheet.is-drag .csheet-panel{transition:none}` — correct suppression during a
  drag.
- Skeleton and caret loops using `@keyframes` with `steps(1)` / `linear` — the
  right tool for continuous ambient motion.
