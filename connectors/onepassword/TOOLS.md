# Onepassword — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_items`

Lists item titles in a vault. Never returns secret values.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `vault` | string | yes | Vault name or id. |

## `resolve_reference`

Resolves an op:// secret reference for injection into a process environment.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `reference` | string | yes | An op:// URI. |
