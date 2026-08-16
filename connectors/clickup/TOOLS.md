# ClickUp — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_tasks`

Lists tasks in a list with status and assignee.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `list_id` | string | yes | List identifier. |
| `status` | string | no | Filter by status. |

## `get_task`

Returns a task with description and custom fields.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `task_id` | string | yes | Task identifier. |

## `create_task`

Creates a task in a list.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `list_id` | string | yes | List identifier. |
| `name` | string | yes | Task title. |
| `description` | string | no | Task body. |
| `assignees` | string | no | Assignee ids as JSON array. |

## `update_task`

Updates a task's status or fields.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `task_id` | string | yes | Task identifier. |
| `status` | string | no | New status. |
| `description` | string | no | New description. |
