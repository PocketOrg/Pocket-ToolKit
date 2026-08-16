# Databricks — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_catalogs`

Lists Unity Catalog catalogs and schemas.

Read-only — safe to call without confirmation.

Takes no parameters.

## `query`

Runs a SQL query against a warehouse.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `sql` | string | yes | SELECT statement. |
| `warehouse_id` | string | no | SQL warehouse identifier. |

## `list_jobs`

Lists jobs with their last run status.

Read-only — safe to call without confirmation.

Takes no parameters.
