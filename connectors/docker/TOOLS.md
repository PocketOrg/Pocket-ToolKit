# Docker — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_containers`

Lists containers with status and ports.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `all` | boolean | no | Include stopped containers. |

## `get_logs`

Returns recent log output for a container.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `container` | string | yes | Container name or id. |
| `tail` | number | no | Number of lines. Defaults to 100. |

## `restart_container`

Restarts a container.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `container` | string | yes | Container name or id. |
