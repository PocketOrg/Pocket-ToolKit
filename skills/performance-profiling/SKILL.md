---
name: performance-profiling
description: >-
  Finds and fixes real performance problems by measuring before changing anything. Use when something is slow, a page fails a performance budget, or a query is timing out.
---

# Performance Profiling

## Measure before you change

Establish a number first. Without a baseline you cannot tell whether a change helped, and most intuitions about what is slow are wrong.

Profile under conditions resembling production: real data volumes, real network latency, a production build. A dev-mode profile mostly measures the dev tooling.

Find the actual bottleneck before optimising anything. Time spent on code that accounts for two percent of the total is time wasted.

## Where the time usually goes

- **Waiting, not computing.** Most slow applications are slow because of sequential I/O — queries, HTTP calls, filesystem reads — not CPU.

- **N+1 queries.** One query per row in a loop. Batch them, or join.

- **Missing indexes.** Read the query plan; a sequential scan on a large table is the usual culprit.

- **Payload size.** Shipping fields nobody reads, or unbounded result sets with no limit.

- **Repeated work.** The same value computed per request when it could be computed once.

## Reading a profile

Distinguish total time from self time. A function with high total but low self time is a caller, not the problem.

Look for the widest bar, not the deepest stack. Depth is structure; width is cost.

Repeated identical frames usually mean a loop doing I/O.

## Fix in order of leverage

Remove the work entirely if you can. Not doing something is faster than doing it efficiently.

Then batch, then cache, then parallelise. Caching first hides the real problem and adds an invalidation bug.

Re-measure after each change. Two optimisations at once make attribution impossible.

## Watch out for

- Optimising a microbenchmark that does not reflect real usage.
- Adding a cache without deciding how it is invalidated, trading a slow bug for a wrong one.
- Micro-optimising CPU while the request spends most of its time on the network.
- Reporting a percentage improvement without stating the absolute numbers.

## Finishing

The bottleneck is identified with evidence, the fix is measured against the baseline, and the numbers are stated in absolute terms.
