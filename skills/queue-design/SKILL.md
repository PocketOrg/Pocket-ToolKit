---
name: queue-design
description: >-
  Designs message queues and background jobs that survive failure. Use when adding asynchronous processing, or debugging a queue that loses or duplicates work.
---
# Queue Design

## Assume every message is delivered more than once

At-least-once delivery is what almost every queue actually provides. Exactly-once is a marketing claim about a narrow configuration.

Therefore consumers must be idempotent. Key each operation by a stable id and make reprocessing a no-op, rather than hoping duplicates do not happen.

## Assume order is not preserved

Unless the queue guarantees ordering within a partition — and you are using that partition key correctly — messages arrive out of order.

Design handlers so a later state does not get overwritten by an earlier message arriving second. Compare versions or timestamps rather than blindly applying.

## Put the payload's identity in, not the payload

Send an id and let the consumer fetch current state. Embedding a full object means the consumer acts on data that was true when it was queued, which may be minutes stale.

The exception is when you deliberately want a point-in-time snapshot — say so explicitly.

## Retry with backoff, then give up somewhere

Immediate retries on a failing dependency amplify the outage. Exponential backoff with jitter spreads the load.

Every retry policy needs a terminal state: a dead letter queue, monitored, that a person actually looks at. An unmonitored dead letter queue is a data loss mechanism with extra steps.

## Watch the depth and the age

Queue depth alone is ambiguous — a large queue draining fast is fine. The age of the oldest message tells you whether you are keeping up.

Alert on oldest-message age, not just on count.

## Watch out for

- Poison messages that fail forever and block a partition.
- Consumers that acknowledge before doing the work, losing messages on crash.
- Long-running handlers that exceed the visibility timeout, causing the same work to run twice concurrently.
- Fan-out that multiplies a spike downstream with no throttle.
- Using a queue as a database, where the messages become the only record of state.

## Finishing

Consumers are idempotent and order-tolerant. Retries back off and terminate in a monitored dead letter queue. Oldest-message age is alerted on.

