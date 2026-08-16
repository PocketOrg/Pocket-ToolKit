---
name: feature-flags
description: >-
  Ships behind flags without accumulating a maze of dead conditionals. Use when planning a risky release, running a gradual rollout, or cleaning up stale flags.
---
# Feature Flags

## Know which kind of flag you are creating

**Release** flags hide unfinished work and are removed within weeks.

**Experiment** flags split traffic and are removed when the test concludes.

**Operational** flags — kill switches, load shedding — are permanent by design.

**Permission** flags gate by plan or role and are really product configuration, not flags.

Confusing them is why flag systems rot: release flags treated as permanent never get deleted.

## Give every temporary flag an owner and an expiry

Record who removes it and by when, at creation. Without both, the flag outlives the feature and nobody dares delete it because nobody knows what it does.

Fail the build, or at least warn loudly, when a flag passes its expiry.

## Default to off, and make the off path the safe one

A flag whose failure mode is "everyone gets the new thing" is not a safety mechanism.

If the flag service is unreachable, the code must choose the safe default deliberately rather than throwing.

## Evaluate once, near the top

Checking the same flag in six places produces inconsistent behaviour within one request when the value changes mid-flight.

Resolve it at the entry point and pass the decision down.

## Delete aggressively

A flag that is fully rolled out is dead code plus a conditional. Removing it is the last step of shipping, not optional tidying.

Every stale flag doubles the paths a reader must reason about, and they multiply.

## Watch out for

- Nested flags, which produce combinations nobody has tested or can enumerate.
- Flags controlling database migrations, where the two branches diverge irreversibly.
- Testing only the on state, then discovering the off path broke months ago.
- Flag names that describe the implementation rather than the behaviour.
- Long-lived flags per customer, which are a fork with extra steps.

## Finishing

Each flag has a type, an owner and an expiry. The off path is the safe default. Fully rolled-out flags are deleted, not left on.

