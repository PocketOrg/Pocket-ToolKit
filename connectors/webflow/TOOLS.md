# Webflow — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_sites`

Lists sites the token can reach.

Read-only — safe to call without confirmation.

Takes no parameters.

## `list_collections`

Lists CMS collections for a site.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `site_id` | string | yes | Site identifier. |

## `list_items`

Lists items in a collection.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `collection_id` | string | yes | Collection identifier. |
| `limit` | number | no | Maximum items. |

## `create_item`

Creates a CMS item as draft or live.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `collection_id` | string | yes | Collection identifier. |
| `fields` | string | yes | Field values as JSON. |
| `live` | string | no | true to publish immediately. |
