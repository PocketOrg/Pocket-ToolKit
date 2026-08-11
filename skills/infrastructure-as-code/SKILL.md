---
name: infrastructure-as-code
description: >-
  Manages infrastructure declaratively so environments are reproducible and reviewable. Use when writing or reviewing Terraform or similar, or reconciling drift between config and reality.
---

# Infrastructure As Code

## Declare, never click

Any change made in a console is invisible to the next person and lost on the next apply. If it is not in code, it does not exist.

Review the plan before every apply. The plan is the diff; applying without reading it is committing blind.

Treat drift as a defect: either bring reality back to the code, or bring the code up to date deliberately.

## State

Store state remotely with locking. Two concurrent applies against local state will corrupt it.

State contains secrets in plaintext. Encrypt it and restrict access as tightly as production.

Never edit state by hand except as a last resort, and back it up first.

## Structure

Separate environments by directory or workspace, never by a commented-out variable.

Modules for genuinely repeated patterns only. A module wrapping one resource adds indirection for nothing.

Keep blast radius small: separate state per environment, and per system where it makes sense, so one mistake cannot destroy everything.

## Watch out for

- A resource that will be destroyed and recreated rather than updated — read the plan for `forces replacement`.
- Hardcoded account ids, regions or ARNs, which make the code unusable elsewhere.
- Committing state or a `.tfvars` file containing secrets.
- One giant state file, where an unrelated change risks the entire estate.

## Finishing

Every resource is declared, the plan was read before applying, state is remote and locked, and no environment differs from its code.
