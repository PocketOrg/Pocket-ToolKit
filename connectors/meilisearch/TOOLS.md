# Meilisearch — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_indexes`

Lists indexes with document counts.

Read-only — safe to call without confirmation.

Takes no parameters.

## `search`

Searches an index and returns ranked hits.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `index` | string | yes | Index name. |
| `query` | string | yes | Search text. |
| `limit` | number | no | Maximum hits. |

## `get_settings`

Returns an index's searchable and filterable attributes.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `index` | string | yes | Index name. |

## `add_documents`

Adds or replaces documents in an index.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `index` | string | yes | Index name. |
| `documents` | string | yes | Documents as a JSON array. |
