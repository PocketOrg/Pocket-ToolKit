# Vault — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_secrets`

Lists secret paths under a mount. Returns names, not values.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `mount` | string | yes | Secret engine mount path. |
| `path` | string | no | Path prefix. |

## `get_secret_metadata`

Returns version history and timestamps for a secret.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `mount` | string | yes | Mount path. |
| `path` | string | yes | Secret path. |

## `list_policies`

Lists policies defined on the server.

Read-only — safe to call without confirmation.

Takes no parameters.
