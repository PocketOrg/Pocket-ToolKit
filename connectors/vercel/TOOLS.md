# Vercel — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_deployments`

Lists recent deployments with status.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `project` | string | no | Project name or id. |

## `get_deployment_logs`

Returns build and runtime logs for a deployment.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `deployment_id` | string | yes | Deployment id. |
