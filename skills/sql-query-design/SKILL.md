---
name: sql-query-design
description: >-
  Writes SQL that stays correct as data grows and stays readable when someone else inherits it. Use when writing analytical queries, debugging a wrong number, or reviewing someone else's SQL.
---
# SQL Query Design

## Get the grain right before anything else

Every query has a grain: one row per what? One row per order, per order line, per customer per day. Say it out loud before writing a line.

Most wrong numbers are a grain mistake. A join to a table with multiple matching rows silently multiplies your measures, and `SUM(revenue)` doubles without any error.

After every join, ask whether the grain changed. If it did and you did not intend it, aggregate before joining rather than after.

## Filter in the right place

A condition in `WHERE` on the right side of a `LEFT JOIN` silently converts it to an inner join. Put it in the `ON` clause if you meant to keep unmatched rows.

`WHERE` filters rows before aggregation; `HAVING` filters groups after. Using `HAVING` for a row condition works but scans far more than it needs to.

## NULL behaves differently from everything else

`NULL = NULL` is not true. Use `IS NULL`, or `IS DISTINCT FROM` when comparing nullable columns.

`NOT IN` with a NULL anywhere in the subquery returns no rows at all. Use `NOT EXISTS`, which handles NULLs the way you expect.

Aggregates skip NULLs, so `AVG(x)` over ten rows with three NULLs divides by seven. Sometimes that is right; decide rather than discover it.

## CTEs for readability, with a caveat

Name each step after what it produces: `monthly_active`, not `cte2`. A reader should follow the query without holding it all at once.

Be aware that some engines materialise CTEs and some inline them. A CTE referenced three times may be computed three times, or once — check your engine before assuming either.

## Window functions instead of self-joins

Running totals, rank within group, previous row: these are window functions, not correlated subqueries. `SUM(x) OVER (PARTITION BY customer ORDER BY date)` replaces a join that scales badly.

`ROW_NUMBER()` deduplicates cleanly: number the partition, keep row 1. Prefer it to `DISTINCT ON` when you need portability.

## Watch out for

- `SELECT *` in anything permanent — a new upstream column silently changes your output shape.
- Comparing a timestamp to a date, which drops everything after midnight on the last day.
- Implicit type casts in joins, which quietly disable index use.
- Reusing a column alias in `WHERE`, which most engines reject and the rest evaluate unpredictably.
- Assuming row order without `ORDER BY`. There is no default order, whatever you observed yesterday.

## Finishing

State the grain in a comment at the top. Verify one row by hand against the source. A reviewer can tell what the query counts without running it.

