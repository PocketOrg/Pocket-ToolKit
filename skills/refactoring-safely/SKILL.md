---
name: refactoring-safely
description: >-
  Restructures code without changing behaviour, in steps that stay releasable. Use when cleaning up code, splitting a large module, or preparing a change that is hard to make.
---

# Refactoring Safely

## Preconditions

Tests first. Without them you are rewriting, not refactoring — you have no way to know behaviour held.

If coverage is missing, add characterisation tests that capture what the code does now, including any bugs.

Refactor separately from behaviour changes. A diff that does both cannot be reviewed properly.

## Work in small steps

Each step should leave the code working and committable. Long-lived broken states cannot be abandoned safely.

Rename, extract, inline, move — apply one at a time and run the tests between.

Use the tooling's automated refactors where available; they do not typo.

## Where to start

The thing you must change next. Refactoring for its own sake competes with delivery and rarely wins.

Duplication that has already drifted — that is a bug waiting to happen.

Files that have grown to do several unrelated things; split along the seams that already exist.

## Watch out for

- Rewriting from scratch instead of transforming, which discards the accumulated fixes nobody remembers.
- Bundling behaviour changes in, so a regression cannot be attributed.
- Refactoring code that is about to be deleted.
- Introducing an abstraction for a single case — wait for the third.

## Finishing

Behaviour is provably unchanged, the tests pass at every intermediate commit, and the change you needed is now easy.
