---
name: threat-modelling
description: >-
  Identifies what an attacker would target before code is written. Use when designing a feature that handles sensitive data, money or permissions, or planning a security review.
---

# Threat Modelling

## Four questions, in order

- **What are we building?** Draw the data flow: entry points, trust boundaries, data stores, external calls. You cannot threat-model a system you cannot diagram.

- **What can go wrong?** Walk each boundary and ask how it could be abused.

- **What are we doing about it?** Decide per threat: mitigate, transfer, accept, or eliminate.

- **Did we do a good job?** Revisit when the design changes.

## Prompts that surface real threats

- **Spoofing** — can someone claim to be another user or service?

- **Tampering** — can data be modified in transit or at rest?

- **Repudiation** — could someone deny an action with no evidence to contradict them?

- **Information disclosure** — what leaks through errors, logs, timing or metadata?

- **Denial of service** — what is unbounded and cheap for an attacker to trigger?

- **Elevation of privilege** — how does a normal user become an admin?

## Rank by expected cost

Likelihood times impact. A trivial-to-exploit information leak usually outranks a hard-to-reach remote execution path.

Weight anything reachable without authentication far higher — the attacker pool is the entire internet.

Note explicitly what you are choosing to accept, and why. An undocumented accepted risk becomes a surprise later.

## Watch out for

- Modelling only the happy path, so abuse cases never surface.
- Treating internal services as trusted, which fails the moment one is compromised.
- Producing a long list with no ranking, which gets ignored wholesale.
- Threat-modelling once at design time and never revisiting it.

## Finishing

Trust boundaries are drawn, threats are enumerated per boundary and ranked, and each has a decision recorded — including the accepted ones.
