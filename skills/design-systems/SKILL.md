---
name: design-systems
description: >-
  Builds and maintains a component system teams actually use. Use when starting a design system, when components have drifted, or when nobody uses the library.
---
# Design Systems

## A system is adopted, or it is decoration

The measure of a design system is the share of the product built from it. A beautiful library nobody imports has failed regardless of its craft.

Adoption comes from being easier than the alternative. If using the component is slower than writing a div, engineers write the div, and they are right to.

## Start from what exists

Audit the product before designing anything. Count the button variants, the greys, the spacing values actually in use.

The first version of the system is a consolidation of reality, not a greenfield ideal. Systems that ignore the existing product require a migration nobody funds.

## Tokens before components

Colour, spacing, type scale and radius are the vocabulary. Get them named and stable first — components built on ad-hoc values inherit the inconsistency you are trying to remove.

Name tokens by role, not appearance. `--color-danger` survives a rebrand; `--color-red` does not.

## Design the API, not just the visuals

A component's props are its contract. Too few and teams fork it; too many and it becomes a configuration language nobody understands.

Prefer variants over booleans: `variant="danger"` scales, while `isDanger` plus `isWarning` produces impossible combinations.

## Version and deprecate deliberately

Breaking a component breaks every consumer at once. Add the new prop, deprecate the old with a warning, and remove it a release later.

Publish what changed in terms of what consumers must do, not what you refactored.

## Watch out for

- Documenting only appearance and not when to use which component.
- One-off components added for a single screen, which quietly become the majority.
- Accessibility treated as a later pass rather than built into the component.
- Designers and engineers maintaining two systems with the same names and different behaviour.
- A contribution process so heavy that forking is faster.

## Finishing

Tokens are named by role. Every component documents when to use it. Contributing is easier than forking.

