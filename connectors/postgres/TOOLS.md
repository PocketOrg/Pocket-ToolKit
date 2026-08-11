# Postgres — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `query`

Runs a read-only SQL query and returns rows. Writes are rejected.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `sql` | string | yes | A SELECT statement. |

## `list_tables`

Lists tables and views in a schema.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `schema` | string | no | Schema name. Defaults to public. |

## `describe_table`

Returns columns, types, indexes and constraints for one table.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `table` | string | yes | Table name. |
