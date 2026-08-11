---
name: error-handling
description: >-
  Designs failure paths that preserve information and degrade predictably. Use when adding error handling, reviewing a catch block, or deciding how a failure should propagate.
---

# Error Handling

## Decide who handles it

Only catch an error where you can do something about it. A catch that logs and rethrows adds noise, not safety.

Let unexpected errors propagate to a boundary that knows how to respond — a request handler, a job runner, a UI error boundary.

Never swallow silently. An empty catch block is a bug you will spend hours finding later.

## Preserve the cause

When wrapping, attach the original: `throw new Error("could not load profile", { cause: err })`. A rewritten message with no cause destroys the trace.

Add context the caller lacks — which id, which file, which endpoint — not just a restatement of the error type.

Never log an error and also return a success value. The caller will believe it worked.

## Expected versus exceptional

A user typing an invalid email is expected: return a validation result, do not throw.

A database being unreachable is exceptional: throw, and let the boundary decide.

Reserve exceptions for things that genuinely break the flow. Using them for control flow makes the happy path hard to read.

## Retries and timeouts

Every network call needs a timeout. Without one, a hung dependency exhausts your connections.

Retry only idempotent operations, with exponential backoff and jitter.

Cap total attempts and surface the final failure. Infinite retries turn an outage into a silent stall.

## Watch out for

- `catch (e) {}` — the most expensive two characters in software.
- Returning `null` on failure, which pushes the problem to a caller who will forget to check.
- Logging the same error at three levels of the stack, making one failure look like three.
- Exposing internal error text to end users, leaking implementation detail.

## Finishing

Every failure either resolves locally or reaches a boundary with its cause intact, and no path swallows an error silently.
