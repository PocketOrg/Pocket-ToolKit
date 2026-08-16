# Keycloak — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_realms`

Lists realms on the server.

Read-only — safe to call without confirmation.

Takes no parameters.

## `list_clients`

Lists clients in a realm.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `realm` | string | yes | Realm name. |

## `search_users`

Searches users in a realm.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `realm` | string | yes | Realm name. |
| `query` | string | no | Search text. |

## `get_user_sessions`

Returns active sessions for a user.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `realm` | string | yes | Realm name. |
| `user_id` | string | yes | User identifier. |
