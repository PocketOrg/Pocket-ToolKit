---
name: logging-and-observability
description: >-
  Emits logs, metrics and traces that make production diagnosable. Use when adding logging, instrumenting a service, or unable to explain a production incident.
---

# Logging And Observability

## Log for the person debugging at 3am

Structured, not prose. Emit fields — `{ event, userId, durationMs, outcome }` — so logs can be queried rather than grepped.

Include a correlation id on every line for a request, so one trace can be reassembled across services.

Log decisions and boundaries: what came in, which branch was taken, what went out. Not every intermediate step.

## Levels that mean something

- **error** — something failed and needs a human. If it does not, it is not an error.

- **warn** — degraded but handled; worth a dashboard, not a page.

- **info** — significant state changes and boundaries.

- **debug** — detail you would enable temporarily to investigate.

If everything is `error`, alerts get muted and the level carries no information.

## What to measure

Latency as a distribution, not an average — p50, p95, p99. An average hides the experience of your slowest users entirely.

Rate, errors, duration per endpoint. Saturation for anything with a pool or queue.

Business outcomes alongside technical ones: signups completed, payments succeeded.

## Never log

Passwords, tokens, keys, full card numbers, or authorisation headers.

Whole request bodies containing personal data.

Anything you would not want in a screenshot pasted into a ticket.

## Watch out for

- Logging inside a tight loop, producing gigabytes that cost money and hide the signal.
- Alerting on a symptom nobody can act on, which trains people to ignore alerts.
- Only averages, so a bad p99 is invisible.
- No correlation id, making a multi-service failure impossible to reconstruct.

## Finishing

A production failure can be diagnosed from telemetry alone, without adding logging and waiting for it to recur.
