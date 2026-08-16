---
name: technical-debt
description: >-
  Identifies, records and pays down technical debt deliberately. Use when planning work, justifying a refactor, or when a codebase has become slow to change.
---
# Technical Debt

## Debt is a deliberate trade, not a mess

Real technical debt is a conscious decision to take a shortcut for speed, with the intention of paying it back. Code that is simply bad was never a trade.

The distinction matters because the remedies differ: debt is repaid on a schedule, bad code is fixed when touched.

## Record it where the work is planned

Debt in someone's head is not tracked. Write it as an item with the same fields as any other: what it costs now, what it will cost later, and what fixing it involves.

The cost must be concrete. "The auth module is messy" competes badly with a feature. "Every auth change takes three days instead of one, and we make roughly two a month" competes on equal terms.

## Prioritise by interest rate, not by ugliness

Debt in code nobody touches costs nothing. Debt in the file changed weekly compounds fast.

Rank by change frequency multiplied by the friction it causes. The ugliest code is often not the most expensive.

## Pay it down alongside the work, mostly

Refactoring the area you are already changing is cheap: you have the context, and the tests are being exercised anyway.

Reserve dedicated refactoring projects for debt too large to fold in — a migration, a boundary that needs redrawing.

## Say no to more debt sometimes

Taking on debt is legitimate when the deadline is real and the payback is scheduled. It is illegitimate when the shortcut has no plan and the deadline was arbitrary.

If the same "we'll fix it after launch" has been said three times, that is not a trade any more.

## Watch out for

- Refactors with no behavioural test coverage, which cannot be verified as safe.
- Rewrites proposed instead of incremental repair, which take longer than anyone estimates.
- Debt used as a label for "code I did not write".
- Cleanup PRs mixed with behaviour changes, so neither can be reviewed properly.
- Tracking debt in a list nobody prioritises, which is the same as not tracking it.

## Finishing

Each item states its ongoing cost in time. Priority reflects change frequency. Cleanup is separated from behaviour change in review.

