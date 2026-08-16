# Opsgenie — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_alerts`

Lists alerts, filtered by status or priority.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | no | Alert search query. |
| `limit` | number | no | Maximum alerts. |

## `get_alert`

Returns an alert with its notes and timeline.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `alert_id` | string | yes | Alert identifier. |

## `who_is_on_call`

Returns the current on-call responders for a schedule.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `schedule` | string | yes | Schedule name or identifier. |
