# MySQL — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_tables`

Lists tables with row estimates.

Read-only — safe to call without confirmation.

Takes no parameters.

## `describe_table`

Returns columns, types and indexes for a table.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `table` | string | yes | Table name. |

## `query`

Runs a read-only SQL query.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `sql` | string | yes | SELECT statement. |
| `limit` | number | no | Maximum rows to return. |
