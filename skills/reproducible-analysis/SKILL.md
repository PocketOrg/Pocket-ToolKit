---
name: reproducible-analysis
description: >-
  Makes an analysis someone else can rerun and get the same numbers. Use when producing results others will rely on, or when you cannot reproduce your own work from last month.
---
# Reproducible Analysis

## The result is the code, not the output

A number in a document with no path back to its computation cannot be checked, corrected or extended. Treat the script as the deliverable and the figure as a by-product.

Every table and chart in the write-up should be regenerable by one command.

## Pin the inputs

Record the exact dataset version, not just its name. A file that is overwritten in place makes every past result unverifiable.

Hash the input, or snapshot it. If the data cannot be shared, share the hash so someone with access can confirm they have the same file.

## Pin the environment

Package versions change behaviour silently — a default parameter shifts and the result moves. Record the language version and every dependency version, and commit that record.

An environment file is the difference between "works on my machine" and a result someone can confirm.

## Set seeds, and say so

Anything involving randomness — sampling, cross-validation, initialisation — must set an explicit seed, or the analysis is unreproducible by construction.

Report that the seed was set. Also check that the conclusion survives a different seed; if it does not, the conclusion is noise.

## Separate the stages

Raw data stays untouched. Cleaning produces an intermediate. Analysis reads the intermediate. Never edit raw data in place, and never clean inside the analysis script.

This makes it possible to find where a number changed when it changes.

## Watch out for

- Manual steps in the middle — a spreadsheet edit between two scripts breaks the chain invisibly.
- Absolute paths that only exist on one machine.
- Results copied into a document by hand, which drift from the code that produced them.
- Notebooks run out of order, where the visible output does not correspond to the visible code.
- Undocumented exclusions, which are the most common source of irreproducible results.

## Finishing

One command regenerates every reported number. Data and environment versions are pinned. Exclusions are stated in code, not applied by hand.

