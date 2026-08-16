# Railway — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_projects`

Lists projects and their services.

Read-only — safe to call without confirmation.

Takes no parameters.

## `get_deployments`

Lists recent deployments with status.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `service_id` | string | yes | Service identifier. |

## `get_logs`

Returns logs for a deployment.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `deployment_id` | string | yes | Deployment identifier. |
