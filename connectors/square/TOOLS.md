# Square — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_payments`

Lists payments in a period.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `since` | string | no | ISO start date. |
| `until` | string | no | ISO end date. |

## `list_orders`

Lists orders for a location.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `locationId` | string | no | Location id. |

## `list_catalog`

Lists catalogue items and variations.

Read-only — safe to call without confirmation.

Takes no parameters.

## `get_inventory`

Reads inventory counts for catalogue items.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `itemIds` | string | no | Comma-separated catalogue item ids. |

## `update_catalog_item`

Updates a catalogue item's price or details.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `itemId` | string | yes | Catalogue item id. |
| `fields` | string | yes | JSON object of fields to change. |
