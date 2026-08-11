---
name: incident-response
description: >-
  Restores service during an outage, then learns from it without blame. Use when a service is degraded or down, or writing a post-incident review.
---

# Incident Response

## Mitigate before diagnosing

The first objective is restoring service, not understanding the cause. Roll back, fail over, disable the feature — then investigate with the pressure off.

If a recent deploy correlates, revert it first. Being wrong about the cause costs a deploy; being slow costs the outage.

Resist the urge to fix forward under pressure. A rushed patch during an incident frequently makes it worse.

## Run it deliberately

Name one coordinator. Without one, three people investigate the same thing and nobody talks to stakeholders.

Keep a timestamped log as you go: what you observed, what you changed, what happened. Memory is unreliable afterwards and this becomes the review.

Communicate on a schedule even when there is nothing new. Silence reads as nobody working on it.

Change one thing at a time, and say what you are about to do before doing it.

## Afterwards

Write it up while it is fresh, focused on the system rather than the person. "The deploy had no health gate" is actionable; "someone deployed carelessly" is not.

Establish the timeline, the contributing factors, and what made detection or recovery slow.

Produce a small number of owned, dated actions. A review with twenty unassigned items changes nothing.

## Watch out for

- Debugging in production while users are affected instead of rolling back.
- No single coordinator, so effort is duplicated and stakeholders hear nothing.
- A review that identifies a person as the root cause, which stops people reporting problems.
- Actions with no owner or date, which are never done.

## Finishing

Service is restored, a timeline exists, contributing factors are identified, and each action has an owner and a date.
