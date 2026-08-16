---
name: disaster-recovery
description: >-
  Plans for the failure that takes everything down. Use when designing recovery, after a near-miss, or when nobody knows whether the backups work.
---
# Disaster Recovery

## Two numbers drive every decision

**RPO** — how much data you can afford to lose, which sets backup frequency.

**RTO** — how long you can afford to be down, which sets the recovery architecture.

Agree both with the business before designing anything. An hour of RPO and five minutes of RTO are wildly different systems and costs.

## An untested backup is not a backup

The only evidence that a backup works is a restore. Restore to a clean environment on a schedule, and time it — that measured duration is your real RTO, not the estimate.

Most backup failures are discovered during the first real restore, which is the worst possible moment.

## Protect against deletion, not just hardware failure

Replication faithfully copies a destructive command to every replica. Ransomware and a bad migration both defeat replication entirely.

Keep point-in-time recovery and at least one immutable or offline copy that a compromised credential cannot delete.

## Write the plan for people under pressure

Who declares a disaster, who executes, who communicates. What order services come back in, and what depends on what.

Include the access needed — an unreachable credential vault during an outage is a common and paralysing failure.

## Exercise it, including the hard parts

A tabletop exercise finds gaps cheaply. A real failover finds the ones that matter.

Rehearse at least annually, including the parts people avoid: DNS changes, certificate reissue, and bringing a stale replica up to date.

## Watch out for

- Backups stored in the same account, region or provider as the thing they protect.
- Recovery that depends on a service which is itself down.
- Configuration that lives only in a running system and not in version control.
- A plan that names people who have left.
- Assuming a managed service's default retention meets your RPO — check the number.

## Finishing

RPO and RTO are agreed and met by a timed restore. An immutable copy exists. The plan names roles, order and access, and has been exercised.

