# MongoDB — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_collections`

Lists collections in a database.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `database` | string | yes | Database name. |

## `find`

Runs a find query against a collection.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `collection` | string | yes | Collection name. |
| `filter` | string | no | Query filter as JSON. |
| `limit` | number | no | Maximum documents. |

## `aggregate`

Runs an aggregation pipeline.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `collection` | string | yes | Collection name. |
| `pipeline` | string | yes | Pipeline stages as JSON array. |

## `get_indexes`

Lists indexes on a collection.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `collection` | string | yes | Collection name. |
