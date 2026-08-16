---
name: blue-green-deployment
description: >-
  Releases with an instant rollback path. Use when designing a deployment strategy, or when rollbacks currently mean redeploying the previous build.
---
# Blue-Green Deployment

## The point is the rollback, not the deploy

Two identical environments where one serves traffic; you deploy to the idle one, verify, then switch. The value is that reverting is a traffic switch measured in seconds.

If your rollback still means rebuilding and redeploying, you have two environments and none of the benefit.

## Verify before the switch, on the real thing

Run smoke tests against the idle environment through its own address, with real dependencies. Testing a stub proves nothing about the deploy.

Keep the checks short — this is the window where an outage would begin.

## The database is the hard part

Two application versions share one database, so schema changes must work with both. That forces expand-and-contract: add the new column, deploy code writing to both, backfill, switch reads, and only then drop the old column, several releases later.

A migration that renames or drops in one step makes rollback impossible regardless of your deployment strategy.

## Drain, do not cut

Switching instantly severs in-flight requests. Drain connections from the old environment and let existing requests finish while new ones go to the new one.

Long-lived connections — websockets, streams — need an explicit strategy or they pin users to the old version indefinitely.

## Keep the old environment until you are confident

Tearing down immediately after the switch removes the rollback you built the whole system for. Keep it warm through at least one full traffic cycle.

## Watch out for

- Cached DNS holding clients on the old environment far longer than the TTL suggests.
- Background jobs and cron running in both environments at once, doing work twice.
- Migrations run by the deploy that are not backward compatible.
- Sticky sessions stored in memory, which are lost at the switch.
- Config drift between blue and green, so the idle environment is not actually identical.

## Finishing

Rollback is a traffic switch. Migrations are expand-and-contract. Connections drain. The previous environment stays available after the switch.

