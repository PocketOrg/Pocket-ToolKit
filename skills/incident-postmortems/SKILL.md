---
name: incident-postmortems
description: >-
  Runs postmortems that prevent recurrence rather than assign blame. Use when writing up an incident, or when the same failure keeps happening.
---
# Incident Postmortems

## Blameless is a practical choice, not a courtesy

People who expect blame withhold detail, and the detail is where the cause is. A blameless postmortem is how you find out what actually happened.

Ask what made the wrong action look reasonable at the time. If a mistake was easy to make, the system permitted it, and the system is the fixable part.

## Build the timeline before the analysis

Reconstruct what happened and when, from logs and messages rather than memory. Include when it started, when it was detected, when it was understood, and when it was mitigated.

The gaps between those four are the most instructive numbers: a long detection gap and a long diagnosis gap need entirely different fixes.

## Look for contributing factors, not a root cause

Serious incidents almost never have one cause. The change, the missing alert, the misleading dashboard and the stale runbook all contributed.

"Root cause: human error" is a place people stop looking, not an explanation.

## Actions must be specific, owned and dated

"Improve monitoring" changes nothing. "Alert when queue age exceeds 5 minutes — Sam, by 30 April" does.

Cap the action list at what will actually be done. Twenty actions produce none; three produce three.

## Publish it, including the uncomfortable parts

Circulate beyond the team involved. Most value comes from people elsewhere recognising the same latent problem in their own system.

Track actions to completion in the same place as other work, or they evaporate.

## Watch out for

- Counterfactuals — "if only they had checked" — which describe an alternative history rather than a mechanism.
- Postmortems only for outages, ignoring near misses that were equally informative.
- Action items that are really the whole project someone wanted anyway.
- Meetings held so late that memory has degraded.
- Treating the document as the deliverable rather than the changes it produces.

## Finishing

The timeline is evidence-based with detection and diagnosis gaps measured. Contributing factors are plural. Actions are few, owned, dated and tracked.

