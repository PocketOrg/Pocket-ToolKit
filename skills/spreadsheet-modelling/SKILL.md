---
name: spreadsheet-modelling
description: >-
  Builds spreadsheets that others can audit and trust. Use when building a financial model, a forecast, or any sheet someone will make a decision from.
---
# Spreadsheet Modelling

## Separate inputs, calculations and outputs

Three areas, visually distinct: assumptions you can change, formulas that derive from them, and results you present.

The commonest spreadsheet failure is a hardcoded number typed into the middle of a formula. It cannot be found, cannot be flexed, and is wrong six weeks later.

Colour inputs consistently — the convention of blue for inputs and black for formulas is worth adopting simply because it is widespread.

## One formula per row, copied across

A row where column F differs from the rest is invisible and is where errors hide. If a row needs an exception, make it a separate row with its own label.

Consistency lets a reviewer check one cell and trust the row.

## Label everything, including units

"Revenue" is ambiguous. "Revenue (£000s, monthly, excl. VAT)" is not. Most model disagreements are unit disagreements.

Put the units in the row label, not in a note nobody opens.

## Build the check row

Add rows that must be true — balances reconcile, percentages sum to 100, cash never goes negative — and make them flag loudly when violated.

A model without checks is asserted correct. A model with checks demonstrates it on every recalculation.

## Make assumptions visible and flexible

Every assumption on one sheet, each with a source or rationale beside it. Then a reviewer can challenge the assumption rather than the arithmetic.

Build a simple scenario switch rather than three copies of the model — copies diverge silently.

## Watch out for

- `VLOOKUP` with an approximate match, which returns wrong values silently. Use exact match, or `INDEX/MATCH`.
- Ranges that do not extend when rows are added.
- Circular references resolved by enabling iterative calculation, which hides a modelling error.
- Hidden rows and columns containing live calculations.
- Merged cells, which break sorting, referencing and most formulas.

## Finishing

Inputs are separated and labelled with units. Formulas are consistent across each row. Check rows pass. A reviewer can trace any output to its assumptions.

