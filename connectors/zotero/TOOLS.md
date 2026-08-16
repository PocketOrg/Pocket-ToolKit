# Zotero — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `search_items`

Searches the library by title, author or tag.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | Search text. |

## `get_item`

Returns an item's full metadata and notes.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `item_key` | string | yes | Item key. |

## `list_collections`

Lists collections in the library.

Read-only — safe to call without confirmation.

Takes no parameters.
