# Heroku — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_apps`

Lists apps the account can reach.

Read-only — safe to call without confirmation.

Takes no parameters.

## `get_logs`

Returns recent log output for an app.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | string | yes | App name. |
| `lines` | number | no | Number of lines. |

## `list_dynos`

Lists dynos with size and state.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | string | yes | App name. |

## `restart_dynos`

Restarts an app's dynos. Causes brief downtime.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | string | yes | App name. |
