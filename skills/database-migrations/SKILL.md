---
name: database-migrations
description: >-
  Changes schemas without downtime or data loss. Use when writing a migration, altering a column, or deploying a schema change to a live system.
---

# Database Migrations

## The expand-contract sequence

Never change a column in one step while old code is running. Deploys are not atomic, so both versions run simultaneously.

- **Expand** — add the new column, nullable, with no constraint. Deploy.

- **Migrate** — backfill in batches, and have the application write to both. Deploy.

- **Contract** — once nothing reads the old column, drop it. Deploy.

Each phase is independently reversible. A single-step rename is not.

## Safe and unsafe operations

Safe: adding a nullable column, adding an index concurrently, adding a table.

Unsafe on a live table: adding a NOT NULL column with no default, changing a type, renaming, adding a non-concurrent index — these take locks that block writes.

Know your engine's specifics. What is instant on one database rewrites the whole table on another.

## Backfills

Batch them. A single UPDATE across millions of rows holds locks and blows up replication lag.

Make the backfill resumable and idempotent; it will be interrupted.

Run it separately from the schema change, so a slow backfill does not block a deploy.

## Before running anything

Confirm a backup exists and that you have actually restored from one recently.

Write the rollback, and test it. A migration without a tested reverse is a one-way door.

Estimate the row count and lock duration on production-sized data, not on your development copy.

## Watch out for

- Renaming a column in one migration, breaking every running instance of the old code.
- A destructive migration with no backup verified beforehand.
- Assuming the migration will be fast because it was fast locally.
- Editing an already-applied migration instead of adding a new one.

## Finishing

The change deploys with old and new code running together, the rollback is tested, and no step holds a long lock on a live table.
