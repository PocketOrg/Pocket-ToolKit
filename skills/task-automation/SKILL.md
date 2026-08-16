---
name: task-automation
description: >-
  Decides what to automate and builds it so it does not become a liability. Use when a manual task keeps recurring, or when automation has become harder to maintain than the work it replaced.
---
# Task Automation

## Automate the second time, not the first

The first occurrence teaches you what the task actually is. Automating it immediately encodes a misunderstanding.

Estimate honestly: time to build, plus maintenance, against time saved. Many tasks done monthly are cheaper to keep doing by hand.

## Make it idempotent

Running it twice must be safe. Interruptions, retries and nervous operators all produce double runs, and an automation that corrupts on the second run is worse than no automation.

Check current state before acting rather than assuming the starting point.

## Fail loudly, and to a person

Silent failure is the characteristic automation disaster: it stops working, nobody notices, and the gap is discovered weeks later.

Alert on failure and on not having run — a job that never starts produces no error at all. Heartbeat monitoring catches what error alerting cannot.

## Log what it did, not that it ran

"Sync complete" is useless in an investigation. "Synced 412 records, skipped 3 (missing id), took 8s" lets someone confirm it did the right thing.

Include the counts that would look wrong if something broke.

## Keep a manual path

Automation fails at the worst time. Document how to perform the task by hand, and check occasionally that the instructions still work.

If the manual path has become impossible, you have built a dependency, not a convenience.

## Watch out for

- Automating a broken process, which produces broken results faster.
- Scripts on someone's laptop that only they can run.
- Credentials embedded in the automation instead of a secret store.
- Silent partial success, where three of ten items processed and it reported done.
- Automation nobody owns after its author leaves.

## Finishing

It is idempotent, alerts on failure and on silence, logs counts, and has a documented manual fallback with a named owner.

