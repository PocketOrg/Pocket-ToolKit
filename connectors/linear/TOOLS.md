# Linear — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_issues`

Lists issues filtered by team, state or assignee.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `team_id` | string | no | Team id. |
| `state` | string | no | Workflow state name. |

## `create_issue`

Creates an issue with a title, description and priority.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `team_id` | string | yes | Team id. |
| `title` | string | yes | Issue title. |
| `description` | string | no | Markdown description. |
| `priority` | number | no | 0 none to 4 low. |

## `update_issue`

Updates an issue's state, assignee or fields.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `issue_id` | string | yes | Issue id. |
| `state_id` | string | no | New workflow state id. |
