---
name: code-comments
description: >-
  Writes comments that stay true and earn their space. Use when reviewing code, documenting something subtle, or cleaning up comments that lie.
---
# Code Comments

## Comment the why, never the what

The code already says what it does. A comment restating it is noise that goes stale the moment the line changes.

`// increment counter` above `counter++` is worse than nothing. `// counted per attempt, not per request, because retries must not reset the budget` is worth its line.

## The best comment is often a name

Before writing an explanation, try naming the thing well. `retryBudgetPerAttempt` removes the need for the comment entirely.

Extract a confusing expression into a named variable rather than annotating it.

## Explain the non-obvious decision

Comments earn their place where the reader would otherwise ask "why like this?": a workaround for an upstream bug, a deliberate performance trade-off, an order dependency that looks arbitrary.

Link the issue, the spec section or the incident. Future readers can then judge whether the reason still holds.

## Warn about the trap

If touching this code in the obvious way breaks something, say so at the point of the trap. This is the highest-value comment there is.

"Do not reorder these two calls — the second reads state the first commits" prevents a specific, likely bug.

## Delete commented-out code

Version control remembers it. Commented-out blocks confuse readers about what is live and are never restored.

## Watch out for

- Comments that contradict the code, which are worse than none because they are trusted.
- Doc comments generated to satisfy a linter, restating the signature in prose.
- TODOs with no name and no date, which accumulate forever.
- Long comments explaining code that should simply be rewritten.
- Section banners that survive the refactor that moved the section.

## Finishing

Every comment explains why, warns of a trap, or links a reason. None restates the code. None contradicts it.

