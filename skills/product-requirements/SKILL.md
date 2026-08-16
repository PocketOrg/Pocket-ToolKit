---
name: product-requirements
description: >-
  Writes requirements engineers can build from without a meeting per question. Use when specifying a feature, or when a build has drifted from what was intended.
---
# Product Requirements

## Lead with the problem and who has it

A document that opens with a solution invites everyone to debate the solution. Opening with the problem lets the team propose better ones.

State who experiences it, how often, and what they do today instead. If you cannot answer those, the requirement is not ready.

## Specify behaviour, not implementation

"Store the draft every 30 seconds and on blur" is behaviour. "Use a debounced hook writing to local storage" is a design decision that belongs to whoever builds it.

Where an implementation constraint is real — a compliance requirement, an existing contract — say so explicitly and why.

## Write the edge cases, because they are the work

The happy path is usually obvious and small. What happens on empty state, on failure, on permission denied, on very large input, on concurrent edit — that is most of the build.

Every unanswered edge case becomes an assumption made silently by whoever hits it first.

## Define done as something observable

"Users can collaborate" cannot be verified. "Two users editing the same document see each other's changes within two seconds, and neither loses text on conflict" can.

Acceptance criteria are the contract. If you cannot write them, the requirement is still a wish.

## Say what is out of scope

Scope is defined by its boundary. Listing what this explicitly does not include prevents the slow expansion that turns a two-week feature into a quarter.

## Watch out for

- Requirements that specify a UI layout when the constraint is really about the information shown.
- "Fast", "intuitive" and "robust" as acceptance criteria.
- Documents that grow after work starts without anyone re-agreeing the estimate.
- Burying a hard requirement in a paragraph of context, where it is missed.
- Writing for stakeholders' approval instead of for the engineer who builds it.

## Finishing

The problem precedes the solution. Edge cases are enumerated. Acceptance criteria are observable. Out of scope is stated.

