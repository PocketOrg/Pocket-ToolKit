# Metabase — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_dashboards`

Lists dashboards and their cards.

Read-only — safe to call without confirmation.

Takes no parameters.

## `run_card`

Runs a saved question and returns rows.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `card_id` | string | yes | Card identifier. |

## `list_databases`

Lists connected databases and schemas.

Read-only — safe to call without confirmation.

Takes no parameters.
