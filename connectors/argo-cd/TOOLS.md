# Argo CD — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_applications`

Lists applications with sync and health status.

Read-only — safe to call without confirmation.

Takes no parameters.

## `get_application`

Returns an application's resources and last sync result.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | yes | Application name. |

## `get_sync_history`

Returns recent sync operations for an application.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | yes | Application name. |
