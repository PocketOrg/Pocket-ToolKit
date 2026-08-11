---
name: code-documentation
description: >-
  Writes comments and docstrings that explain intent rather than restating code. Use when documenting code, reviewing comments, or explaining a non-obvious decision.
---

# Code Documentation

## Comment the why, never the what

The code says what it does. A comment repeating it is noise that will drift out of date.

Explain the decision: why this approach, what was tried and rejected, what constraint forced it.

The most valuable comment describes something surprising — a workaround, an ordering requirement, a non-obvious performance reason.

## Where comments earn their place

Above a regular expression, stating what it matches in words.

Where a bug was fixed subtly, so nobody reintroduces it while tidying.

On a magic number, giving its source.

At the top of a module, explaining its responsibility and boundary.

## Docstrings

Say what the function does, what it returns, and what it throws. Skip the obvious parameter restatements.

Document behaviour a caller cannot infer: is it idempotent, does it mutate its argument, does it hit the network.

State units and ranges. `timeout` is meaningless without knowing whether it is seconds or milliseconds.

## Watch out for

- Comments that restate the line beneath them.
- Commented-out code left in place — delete it, version control remembers.
- A `TODO` with no owner and no context, which becomes permanent.
- Documentation that contradicts the code, which is worse than none because it is believed.

## Finishing

Every non-obvious decision has a stated reason, and no comment merely paraphrases the code.
