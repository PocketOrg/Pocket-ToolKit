# Supabase — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `execute_sql`

Runs SQL against the project database.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | The SQL to run. |

## `list_tables`

Lists tables with their schemas.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| _none_ | | | |

## `apply_migration`

Applies a named DDL migration.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | yes | Migration name. |
| `query` | string | yes | DDL to apply. |
