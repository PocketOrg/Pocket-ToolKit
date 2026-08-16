# ClickHouse — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_databases`

Lists databases on the cluster.

Read-only — safe to call without confirmation.

Takes no parameters.

## `list_tables`

Lists tables with engine and size.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `database` | string | yes | Database name. |

## `query`

Runs a SELECT query.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `sql` | string | yes | SELECT statement. |
| `limit` | number | no | Maximum rows. |
