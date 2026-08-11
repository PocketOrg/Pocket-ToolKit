---
name: secrets-management
description: >-
  Keeps credentials out of code and limits the damage when one leaks. Use when handling API keys or credentials, reviewing a config change, or responding to a leaked secret.
---

# Secrets Management

## Where secrets belong

In a secret manager, injected as environment variables at runtime. Never in source, never in a committed config file, never in a container image layer.

Reference them indirectly — a URI resolved at start-up — so the value never appears in a repository or a log.

`.env` files are for local development only, and must be gitignored from the first commit rather than added later.

## Scope and rotation

One credential per service per environment. A single shared key means one leak compromises everything and rotation breaks everything at once.

Grant the narrowest scope that works. Read-only where reading is all that happens.

Set expiry. A credential that never expires is one that never gets rotated.

## When one leaks

Revoke first, investigate second. Every minute of delay is exposure.

Assume it was used. Check logs for activity from unexpected addresses and times.

Removing the commit does not help — it is in the reflog, in forks, and in anything that mirrored the repository. Rotate.

Then fix the process that allowed it: a pre-commit scanner, or a review checklist.

## Watch out for

- Committing a secret and then deleting it in a later commit, which leaves it in history.
- Logging an entire config object, secrets included.
- Passing secrets as command-line arguments, where any process can read them.
- Sharing production credentials in chat, which puts them in a searchable archive forever.

## Finishing

No secret appears in source or logs, each is scoped and expiring, and there is a tested revocation path.
