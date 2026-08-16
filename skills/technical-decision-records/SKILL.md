---
name: technical-decision-records
description: >-
  Records architectural decisions so future teams know why, not just what. Use when making a consequential technical choice or reconstructing one nobody can explain.
---
# Technical Decision Records

## Record the decision when it is made

A decision written up months later is a reconstruction, and the alternatives that were seriously considered have already been forgotten.

Write it while the disagreement is still fresh. The record is most valuable precisely where the choice was hard.

## Five parts, kept short

**Context** — what forced a decision now. Include the constraints that were real at the time.

**Options** — what was genuinely considered, each with its trade-off. An option list of one is not a decision.

**Decision** — what was chosen, stated plainly.

**Consequences** — what this makes easy, and what it makes hard or expensive later.

**Status** — proposed, accepted, or superseded by a named later record.

## Consequences are the part people skip and later need

Every architectural choice buys something and pays for it elsewhere. Writing the cost down is what stops a future team from treating the decision as free.

Be specific: "this ties us to Postgres-specific features, so a migration would require rewriting the search layer".

## Never edit a decision — supersede it

Rewriting history destroys the record's purpose. When a decision changes, write a new one that references the old, and mark the old superseded.

The trail of superseded records is the most useful part of the archive for someone new.

## Keep them with the code

A record in a wiki nobody opens is lost. In the repository, it is versioned alongside what it describes and found by search.

## Watch out for

- Recording decisions nobody disputed, which buries the important ones in noise.
- Writing them as proposals for approval rather than as records of what happened.
- Omitting the option that was rejected for political rather than technical reasons — note it neutrally.
- Vague consequences like "may affect performance" that commit to nothing.

## Finishing

Context, options, decision and consequences are all present. Superseded records are linked, not deleted. A new engineer can tell why, not just what.

