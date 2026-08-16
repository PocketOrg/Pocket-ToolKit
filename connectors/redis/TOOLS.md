# Redis — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `get`

Returns the value at a key.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `key` | string | yes | Key name. |

## `list_keys`

Lists keys matching a pattern.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `pattern` | string | no | Glob pattern, such as session:*. |

## `set`

Sets a key to a value, optionally with expiry.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `key` | string | yes | Key name. |
| `value` | string | yes | Value to store. |
| `ttl_seconds` | number | no | Expiry in seconds. |

## `delete`

Deletes a key.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `key` | string | yes | Key name. |
