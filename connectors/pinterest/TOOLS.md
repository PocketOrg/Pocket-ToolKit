# Pinterest — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `search_pins`

Searches pins by keyword.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | Search terms. |
| `limit` | number | no | Maximum results. |

## `list_boards`

Lists the authorised account's boards.

Read-only — safe to call without confirmation.

Takes no parameters.
