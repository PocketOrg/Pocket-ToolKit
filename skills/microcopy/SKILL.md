---
name: microcopy
description: >-
  Writes the small interface text that decides whether people succeed. Use when writing buttons, errors, empty states, or reviewing an interface that confuses users.
---
# Microcopy

## Label buttons with the action, not the acknowledgement

"OK" tells the user nothing about what will happen. "Delete 3 files" tells them exactly, and lets them cancel with confidence.

The button is the last thing read before an irreversible action. It should be the clearest text on the screen.

## Errors must say what to do next

"An error occurred" is a dead end. A useful error names what went wrong, why if known, and the next action.

"We could not save your changes — you are offline. We will retry automatically." Same failure, entirely different experience.

Never show a raw error code alone. If you must include one for support, put the human explanation first.

## Write in the second person, in the present

"Your invoice is ready" reads naturally. "The invoice has been generated" is a system talking about itself.

Avoid the passive voice in errors especially — it hides who must act.

## Set expectations before the wait

"This usually takes about 30 seconds" prevents the reload that duplicates the operation. A spinner alone is an unbounded promise.

For anything genuinely long, say what happens if they close the tab.

## Be plain, not clever

Humour ages badly and reads poorly during a failure. Nobody enjoys a joke while their data is missing.

Reserve personality for moments of success, and keep it out of errors, confirmations and anything financial.

## Watch out for

- Jargon that leaked from the codebase: "invalid payload", "null reference", "unauthorised" instead of "please sign in".
- Confirmations that do not say what is being confirmed.
- "Are you sure?" as the only guard on a destructive action — name the consequence.
- Placeholder text used as a label, which vanishes when typing starts.
- Inconsistent terms for the same object across screens.

## Finishing

Buttons name their action. Errors say what to do next. Waits carry an expectation. One term per concept, everywhere.

