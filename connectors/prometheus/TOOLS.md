# Prometheus — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `query`

Runs an instant PromQL query.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | PromQL expression. |

## `query_range`

Runs a PromQL query over a time range.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | PromQL expression. |
| `start` | string | yes | Start time. |
| `end` | string | yes | End time. |
| `step` | string | no | Resolution step, such as 1m. |

## `list_metrics`

Lists available metric names.

Read-only — safe to call without confirmation.

Takes no parameters.

## `list_alerts`

Lists currently firing alerts.

Read-only — safe to call without confirmation.

Takes no parameters.
