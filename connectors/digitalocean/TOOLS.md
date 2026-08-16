# DigitalOcean — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_droplets`

Lists droplets with size, region and status.

Read-only — safe to call without confirmation.

Takes no parameters.

## `list_apps`

Lists App Platform apps and deployment status.

Read-only — safe to call without confirmation.

Takes no parameters.

## `get_app_logs`

Returns logs for an app deployment.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `app_id` | string | yes | App identifier. |

## `list_databases`

Lists managed database clusters.

Read-only — safe to call without confirmation.

Takes no parameters.
