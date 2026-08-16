# Dynatrace — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_problems`

Lists open and recent problems.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | string | no | Start of time range. |

## `get_problem`

Returns a problem with affected entities and root cause.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `problem_id` | string | yes | Problem identifier. |

## `query_metrics`

Queries a metric selector over a time range.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `selector` | string | yes | Metric selector. |
| `from` | string | no | Start time. |
| `to` | string | no | End time. |
