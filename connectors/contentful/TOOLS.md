# Contentful — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_entries`

Lists entries of a content type.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `content_type` | string | no | Content type id. |
| `limit` | number | no | Maximum entries. |

## `get_entry`

Returns an entry with all its fields.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `entry_id` | string | yes | Entry identifier. |

## `list_content_types`

Lists content types and their fields.

Read-only — safe to call without confirmation.

Takes no parameters.

## `publish_entry`

Publishes an entry, making it live.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `entry_id` | string | yes | Entry identifier. |
