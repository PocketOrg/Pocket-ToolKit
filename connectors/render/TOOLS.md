# Render — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_services`

Lists services with type and status.

Read-only — safe to call without confirmation.

Takes no parameters.

## `list_deploys`

Lists deploys for a service.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `service_id` | string | yes | Service identifier. |

## `get_logs`

Returns recent logs for a service.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `service_id` | string | yes | Service identifier. |
| `limit` | number | no | Maximum lines. |
