# Elasticsearch — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_indices`

Lists indices with document counts and size.

Read-only — safe to call without confirmation.

Takes no parameters.

## `get_mappings`

Returns the field mappings for an index.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `index` | string | yes | Index name. |

## `search`

Runs a query DSL search against an index.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `index` | string | yes | Index name. |
| `query` | string | yes | Query DSL as JSON. |
| `size` | number | no | Maximum hits to return. |
