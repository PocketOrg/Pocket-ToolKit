---
name: etl-pipeline-design
description: >-
  Builds data pipelines that recover from failure without manual repair. Use when designing ingestion, or when a pipeline needs babysitting.
---
# ETL Pipeline Design

## Make every step idempotent

Reruns happen: failures, late data, backfills, nervous operators. A step that appends blindly duplicates rows on the second run.

Write with a deterministic key and replace, or delete-then-insert the partition being processed. "Insert if not exists" over a natural key is the usual pattern.

## Partition by time, and process partitions independently

Time-partitioned processing lets you reprocess one day without touching the rest, and lets late data be handled by rerunning a narrow window.

Pipelines that only process "everything since last run" cannot be backfilled without reprocessing history.

## Keep the raw layer immutable

Land the source data untransformed and never modify it. Every derived table is rebuildable from raw, which is what makes a logic bug recoverable rather than permanent.

Storage is cheaper than the incident where a transformation error destroyed the only copy.

## Fail the run, do not skip the row

Silently dropping malformed records produces quietly wrong numbers that nobody notices for months.

Route rejects to a quarantine table with the reason, count them, and alert when the count exceeds a threshold. Visible failure beats invisible loss.

## Separate extraction, transformation and loading

One script doing all three cannot be retried partially, and a transformation change forces re-extraction from the source system.

Extract once, transform many times. Source systems in particular should be read as little as possible.

## Watch out for

- Schema drift upstream, which breaks loads or silently nulls columns.
- Timezone handling that shifts records between days.
- Full reloads that grow until they exceed the window they run in.
- Pipelines with implicit ordering dependencies that are not declared.
- Credentials and connection limits shared with production traffic.

## Finishing

Steps are idempotent and time-partitioned. Raw data is immutable. Rejects are quarantined and counted. Extraction is separate from transformation.

