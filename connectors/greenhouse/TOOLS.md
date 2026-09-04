# Greenhouse — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_jobs`

Lists open jobs.

Read-only — safe to call without confirmation.

Takes no parameters.

## `list_candidates`

Lists candidates for a job.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `jobId` | string | yes | Job id. |

## `get_candidate`

Reads one candidate's application and stage.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `candidateId` | string | yes | Candidate id. |

## `list_stages`

Lists interview stages for a job.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `jobId` | string | yes | Job id. |
