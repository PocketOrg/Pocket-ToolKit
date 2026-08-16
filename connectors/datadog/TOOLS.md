# Datadog — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `query_metrics`

Queries a metric over a time range.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | Datadog metric query. |
| `from` | string | yes | Start time, epoch seconds. |
| `to` | string | yes | End time, epoch seconds. |

## `list_monitors`

Lists monitors and their current states.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `group_states` | string | no | Filter by state, such as alert. |

## `search_logs`

Searches logs over a time range.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | Log search query. |
| `from` | string | no | Start time. |
| `to` | string | no | End time. |
| `limit` | number | no | Maximum entries. |

## `list_incidents`

Lists recent incidents.

Read-only — safe to call without confirmation.

Takes no parameters.
