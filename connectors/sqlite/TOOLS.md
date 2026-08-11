# Sqlite — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `read_query`

Runs a SELECT and returns rows.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | A SELECT statement. |

## `write_query`

Runs an INSERT, UPDATE or DELETE.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | The statement to run. |

## `list_tables`

Lists every table in the database.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| _none_ | | | |
