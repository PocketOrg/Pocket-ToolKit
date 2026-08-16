# Todoist — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_tasks`

Lists active tasks, optionally filtered.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `filter` | string | no | Todoist filter query, such as today. |

## `create_task`

Creates a task.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | string | yes | Task text. |
| `due_string` | string | no | Natural language due date. |
| `project_id` | string | no | Project identifier. |

## `complete_task`

Marks a task complete.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `task_id` | string | yes | Task identifier. |

## `list_projects`

Lists projects.

Read-only — safe to call without confirmation.

Takes no parameters.
