# Upstash — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_databases`

Lists Redis databases with region and size.

Read-only — safe to call without confirmation.

Takes no parameters.

## `get_usage`

Returns command counts and storage for a database.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `database_id` | string | yes | Database identifier. |

## `create_database`

Creates a Redis database. Incurs cost.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | yes | Database name. |
| `region` | string | yes | Region identifier. |
