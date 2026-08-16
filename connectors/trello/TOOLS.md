# Trello — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_boards`

Lists boards the token can reach.

Read-only — safe to call without confirmation.

Takes no parameters.

## `get_lists`

Lists the lists on a board.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `board_id` | string | yes | Board identifier. |

## `get_cards`

Returns cards in a list with their labels and due dates.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `list_id` | string | yes | List identifier. |

## `create_card`

Creates a card in a list.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `list_id` | string | yes | List identifier. |
| `name` | string | yes | Card title. |
| `description` | string | no | Card body. |
| `due` | string | no | Due date, ISO 8601. |

## `move_card`

Moves a card to another list.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `card_id` | string | yes | Card identifier. |
| `list_id` | string | yes | Destination list identifier. |
