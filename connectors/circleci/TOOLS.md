# CircleCI — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_pipelines`

Lists recent pipelines for a project.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `project_slug` | string | yes | Project slug, such as gh/org/repo. |

## `get_build_failure`

Returns the failing step and its log output.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `project_slug` | string | yes | Project slug. |
| `job_number` | string | yes | Job number. |

## `list_workflows`

Lists workflows in a pipeline with their status.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `pipeline_id` | string | yes | Pipeline identifier. |
