# Okta — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_users`

Searches users in the directory.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | no | Search text. |
| `limit` | number | no | Maximum users. |

## `list_groups`

Lists groups and their membership counts.

Read-only — safe to call without confirmation.

Takes no parameters.

## `get_system_logs`

Returns recent authentication and admin events.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `filter` | string | no | Event filter expression. |
| `since` | string | no | Start time, ISO 8601. |

## `list_applications`

Lists assigned applications and their sign-on modes.

Read-only — safe to call without confirmation.

Takes no parameters.
