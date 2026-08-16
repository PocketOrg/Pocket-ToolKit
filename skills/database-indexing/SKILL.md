---
name: database-indexing
description: >-
  Adds the indexes a workload needs and removes the ones it does not. Use when queries are slow, before a traffic increase, or when writes have degraded.
---
# Database Indexing

## Read the plan before adding anything

An index added on intuition is as likely to be unused as to help. `EXPLAIN ANALYZE` shows what the planner actually does and where the time goes.

Look for sequential scans on large tables, and for a large gap between estimated and actual row counts — the latter usually means stale statistics, not a missing index.

## Column order in a composite index is the whole design

An index on `(a, b)` serves queries filtering on `a`, and on `a` and `b`. It does not serve a query filtering only on `b`.

Put equality columns first, then the range or sort column. Getting this backwards produces an index that looks relevant and is never chosen.

## Cover the query when the lookup is hot

Including the selected columns in the index lets the database answer entirely from it, skipping the table read. On a hot query that is a large win.

The cost is a wider index and slower writes, so reserve it for queries that genuinely matter.

## Every index taxes every write

Indexes are not free: each insert, update and delete maintains them all. A table with twelve indexes writes slowly and uses far more storage than the data itself.

Audit for unused indexes periodically — most databases track index usage — and drop what nothing reads.

## Watch for what silently disables an index

Wrapping a column in a function, comparing across types, leading wildcards in a pattern, and low selectivity all cause the planner to skip the index.

If a query ignores an index you expect it to use, the predicate is usually the reason.

## Watch out for

- Indexing a boolean or any column with two values; it rarely helps.
- Duplicate and redundant indexes, where `(a)` is already covered by `(a, b)`.
- Building indexes without the concurrent option on a live table, which takes a write lock.
- Optimising a query that runs once a day while ignoring one that runs constantly.
- Assuming an index helps a write-heavy table; sometimes removing one is the fix.

## Finishing

Changes are driven by query plans. Composite column order matches the predicates. Unused indexes are dropped. Write impact was considered.

