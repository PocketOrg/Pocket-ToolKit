---
name: debugging-methodically
description: >-
  Finds root causes by forming and testing hypotheses instead of changing code speculatively. Use when investigating a bug, a test failure, or behaviour you cannot explain.
---

# Debugging Methodically

## Reproduce first

Do not attempt a fix until you can trigger the problem on demand. A fix for a bug you cannot reproduce cannot be verified.

Reduce to the smallest input that still fails. Every element you remove eliminates a class of cause.

Write the reproduction down. It becomes the regression test.

## Read the error properly

Read the whole trace, not the first line. The frame that matters is usually the deepest one in your own code.

Note the exact values in the message. `undefined` versus `null` versus `""` point to different origins.

If the error is swallowed or generic, make it loud before you go further — you cannot debug what you cannot see.

## Bisect the space

Form one hypothesis, predict what you would observe if it were true, then test only that.

Change one thing at a time. Two simultaneous changes make the result uninterpretable.

When it worked before, use `git bisect` — it beats reasoning about a large diff.

Verify assumptions rather than trusting them: print the value, check the config actually loaded, confirm the request reached the server.

## Common shapes

- **Works locally, fails deployed** — environment variables, version drift, filesystem case sensitivity, timezone.

- **Intermittent** — ordering, concurrency, a shared cache, or a clock.

- **Fails only in CI** — parallel test pollution, or state leaking between tests.

- **Started suddenly with no deploy** — an upstream dependency, an expired credential, or a full disk.

## Watch out for

- Changing several things at once, then not knowing which fixed it.
- Fixing the symptom — silencing a warning or adding a null check — without asking why the value was missing.
- Trusting a comment or a variable name over the actual behaviour.
- Declaring victory on a flaky bug after one passing run.

## Finishing

You can explain the causal chain from trigger to symptom, the fix addresses the cause, and a test fails without it.
