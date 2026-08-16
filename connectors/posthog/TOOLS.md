# PostHog — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `query_events`

Queries events with filters over a time range.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `event` | string | no | Event name. |
| `after` | string | no | Start time. |
| `limit` | number | no | Maximum events. |

## `get_insight`

Returns a saved insight's current result.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `insight_id` | string | yes | Insight identifier. |

## `list_feature_flags`

Lists feature flags and rollout percentages.

Read-only — safe to call without confirmation.

Takes no parameters.
