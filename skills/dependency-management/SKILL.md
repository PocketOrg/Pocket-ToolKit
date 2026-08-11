---
name: dependency-management
description: >-
  Adds, updates and removes dependencies without inheriting avoidable risk. Use when adding a package, updating dependencies, or auditing what a project pulls in.
---

# Dependency Management

## Before adding anything

Ask whether the standard library or existing dependencies already do it. Every package is a permanent maintenance and security commitment.

Check the transitive weight, not just the package. A small utility pulling forty dependencies is not small.

Look at last release date, open issue count, and whether one person maintains it. An unmaintained dependency becomes your code.

Verify the package name character by character. Typosquatting is a real and common attack.

## Pinning and lockfiles

Always commit the lockfile. Without it, two machines build different software from the same source.

Use exact versions for anything security-sensitive; ranges are fine for dev tooling.

In CI, install from the lockfile only — never let it resolve fresh versions mid-pipeline.

## Updating

Update in small batches so a regression can be attributed. A single commit bumping sixty packages is unbisectable.

Read the changelog for major bumps. Semver is a convention, not a guarantee.

Security patches first, features later.

## Watch out for

- Adding a dependency for a function you could write in five lines.
- Ignoring audit warnings indefinitely until the count is too high to triage.
- Committing `node_modules`, or a lockfile from a different package manager.
- Postinstall scripts from packages you have not reviewed — they run arbitrary code on install.

## Finishing

Every dependency has a reason, the lockfile is committed, and known vulnerabilities are either fixed or explicitly accepted with a note.
