---
name: data-quality-checks
description: >-
  Catches broken data before a dashboard does. Use when building a pipeline, after a silent data incident, or when deciding what to assert on a table.
---
# Data Quality Checks

## Assert what must be true, not what happens to be

A test that says "this table has more than 1,000 rows" passes forever and catches nothing. A test that says "order_id is unique and never null" fails the moment a join goes wrong.

Write assertions from the model's contract: keys, relationships, ranges, allowed values.

## The four checks worth having everywhere

**Uniqueness** on the primary key. Duplicates are the most common cause of inflated measures.

**Not null** on keys and anything a join depends on.

**Referential integrity** — every foreign key exists in the dimension. Orphans silently disappear from inner joins.

**Freshness** — the newest row is younger than the pipeline's promise. A stale table looks perfectly healthy otherwise.

## Row count deltas beat absolute thresholds

Data volumes drift, so fixed bounds either fire constantly or never. Compare against the trailing average and alert on a large relative change in either direction.

A sudden drop matters as much as a spike: it usually means an upstream filter changed.

## Distribution checks catch what row counts miss

A column can be complete, unique and entirely wrong. Watch the share of nulls, the set of distinct values, and the mean of key measures.

A new enum value appearing upstream is invisible to row counts and breaks every `CASE` statement that did not expect it.

## Fail loudly, and stop the pipeline

A warning nobody reads is not a check. Decide per assertion whether a failure blocks downstream tables or merely notifies — and make blocking the default for anything a dashboard reads.

Serving stale-but-correct data is almost always better than serving fresh-but-wrong data.

## Watch out for

- Testing the transformation instead of the data. Both matter, but a passing unit test says nothing about today's input.
- Alerts that fire on every seasonal weekend dip, which train people to ignore them.
- Checks only at the end of the pipeline, so you learn something broke but not where.
- Sampling for checks on the exact tables where rare bad rows do the damage.

## Finishing

Keys are asserted unique and non-null. Freshness is monitored. A failure stops the pipeline rather than emailing someone.

