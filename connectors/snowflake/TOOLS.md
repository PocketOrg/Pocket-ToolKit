# Snowflake — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_databases`

Lists databases and schemas.

Read-only — safe to call without confirmation.

Takes no parameters.

## `describe_table`

Returns a table's columns and types.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `table` | string | yes | Fully qualified table name. |

## `query`

Runs a SELECT query. Consumes credits.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `sql` | string | yes | SELECT statement. |
| `limit` | number | no | Maximum rows. |
