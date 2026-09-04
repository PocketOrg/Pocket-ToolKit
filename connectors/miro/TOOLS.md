# Miro — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_boards`

Lists boards the token can reach.

Read-only — safe to call without confirmation.

Takes no parameters.

## `list_items`

Lists items on a board.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `boardId` | string | yes | Board id. |

## `create_sticky`

Creates a sticky note on a board.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `boardId` | string | yes | Board id. |
| `text` | string | yes | Sticky note text. |
