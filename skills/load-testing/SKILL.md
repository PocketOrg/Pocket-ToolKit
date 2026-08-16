---
name: load-testing
description: >-
  Finds the breaking point before users do. Use when preparing for a launch or a traffic event, or when capacity is a guess.
---
# Load Testing

## Decide what question the test answers

"Can we handle Black Friday" and "where does this service break" need different tests. Load, stress, soak and spike tests each answer one.

A load test at expected volume proves you can serve it. Only a stress test tells you the margin, and only a soak test finds leaks.

## Model realistic traffic

Real users are not a uniform loop over one endpoint. They arrive unevenly, use a mix of endpoints in sequence, carry sessions, and request data with realistic cardinality.

A test that hits one cached endpoint proves the cache works and nothing else.

## Test with production-shaped data

A database with a thousand rows behaves nothing like one with fifty million. Query plans change, indexes matter, caches stop fitting.

Volume and distribution both matter — evenly distributed synthetic keys hide the hot-partition problem real data has.

## Watch saturation, not just averages

Report percentiles: p50 tells you the common case, p99 tells you what a meaningful share of users experience.

Track the resource that saturates first — connections, threads, file descriptors, database pool — because that is your actual limit, not CPU.

## Find the knee, then stop

Increase load until latency degrades sharply. That knee is the capacity number worth recording, and the point beyond which autoscaling must already have triggered.

Note what failed first: that component is where the next engineering effort belongs.

## Watch out for

- Load generators that saturate before the system does, so you measure the test.
- Testing against a scaled-down environment and extrapolating linearly, which is rarely valid.
- Ignoring dependencies — a third party you are also loading, or rate limiting you have not hit yet.
- Running against production without a plan for the damage.
- Cleanup that leaves millions of synthetic rows behind.

## Finishing

The test answers a named question with realistic traffic and data. Percentiles are reported. The knee and the first component to fail are recorded.

