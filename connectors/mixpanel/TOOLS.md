# Mixpanel — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `query_events`

Returns event counts over a period.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `event` | string | yes | Event name. |
| `from_date` | string | yes | Start date. |
| `to_date` | string | yes | End date. |

## `get_funnel`

Returns conversion rates for a saved funnel.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `funnel_id` | string | yes | Funnel identifier. |

## `get_retention`

Returns a retention cohort table.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `from_date` | string | yes | Start date. |
| `to_date` | string | yes | End date. |
