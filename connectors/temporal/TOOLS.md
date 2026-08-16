# Temporal — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_workflows`

Lists workflow executions, filtered by status.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | no | List filter query. |
| `limit` | number | no | Maximum executions. |

## `get_workflow_history`

Returns the event history for one execution.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `workflow_id` | string | yes | Workflow identifier. |
| `run_id` | string | no | Run identifier. |

## `describe_workflow`

Returns current status, task queue and pending activities.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `workflow_id` | string | yes | Workflow identifier. |
