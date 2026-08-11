# Snyk — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `test_dependencies`

Scans a manifest for vulnerable dependencies and returns severities.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `path` | string | no | Project path. Defaults to the working directory. |

## `list_projects`

Lists monitored projects and their issue counts.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| _none_ | | | |
