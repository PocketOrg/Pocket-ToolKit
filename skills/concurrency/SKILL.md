---
name: concurrency
description: >-
  Writes concurrent code that does not corrupt state or deadlock. Use when working with async operations, shared state, background jobs, or diagnosing an intermittent bug.
---

# Concurrency

## Find the shared mutable state

Concurrency bugs live where two paths touch the same data. Enumerate what is shared before reasoning about anything else.

The safest design has no sharing: pass values, return new state, avoid module-level mutables.

A read followed by a write is a race unless something guarantees nothing intervened. Check-then-act is the classic bug shape.

## Common failures

- **Lost update.** Two writers read the same value, both increment, one write is lost. Use an atomic operation or a conditional update.

- **Deadlock.** Two holders each wait on the other's lock. Always acquire locks in a consistent global order.

- **Unawaited promise.** The function returns before the work finishes, so errors vanish and ordering breaks.

- **Duplicate job execution.** Assume every queue delivers at least once, and make handlers idempotent.

## Practical rules

Prefer atomic database operations over read-modify-write in application code.

Use optimistic concurrency — a version column checked on update — rather than holding a lock across a request.

Bound your parallelism. Unlimited concurrent requests exhaust connections and turn a fast path into a timeout.

Make every handler idempotent, keyed on something stable, so a retry is harmless.

## Watch out for

- Testing concurrency serially, which passes reliably while the bug remains.
- Assuming a single-threaded runtime means no races — interleaving at await points is enough.
- Adding a lock without considering ordering, creating a deadlock instead of a race.
- Treating an intermittent failure as flakiness rather than as the race it usually is.

## Finishing

Shared state is enumerated, each access is either atomic or guarded, handlers are idempotent, and parallelism is bounded.
