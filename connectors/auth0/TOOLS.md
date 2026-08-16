# Auth0 — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_applications`

Lists applications in the tenant.

Read-only — safe to call without confirmation.

Takes no parameters.

## `list_connections`

Lists identity connections and their strategies.

Read-only — safe to call without confirmation.

Takes no parameters.

## `get_logs`

Returns recent authentication log events.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | no | Log search query. |
| `limit` | number | no | Maximum events to return. |

## `list_users`

Searches users in the tenant directory.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | no | Lucene query over user fields. |
| `limit` | number | no | Maximum users to return. |
