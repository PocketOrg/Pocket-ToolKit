# Jenkins — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_jobs`

Lists jobs with their last build status.

Read-only — safe to call without confirmation.

Takes no parameters.

## `get_build`

Returns a build's result, duration and cause.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `job` | string | yes | Job name. |
| `build_number` | string | no | Build number, or last if omitted. |

## `get_console_output`

Returns the console log for a build.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `job` | string | yes | Job name. |
| `build_number` | string | yes | Build number. |
