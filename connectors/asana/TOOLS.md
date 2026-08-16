# Asana — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_workspaces`

Lists workspaces the token can reach.

Read-only — safe to call without confirmation.

Takes no parameters.

## `search_tasks`

Searches tasks by text within a workspace.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `workspace` | string | yes | Workspace identifier. |
| `query` | string | yes | Text to search for. |

## `get_task`

Returns a task with assignee, due date and status.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `task_id` | string | yes | Task identifier. |

## `create_task`

Creates a task in a project.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `project_id` | string | yes | Project identifier. |
| `name` | string | yes | Task title. |
| `notes` | string | no | Task description. |
| `assignee` | string | no | User identifier or email. |
| `due_on` | string | no | Due date, YYYY-MM-DD. |

## `add_comment`

Adds a comment to a task.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `task_id` | string | yes | Task identifier. |
| `text` | string | yes | Comment body. |
