# Jira — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `search_issues`

Searches issues using JQL.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `jql` | string | yes | A JQL query. |

## `create_issue`

Creates an issue in a project.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `project_key` | string | yes | Project key. |
| `summary` | string | yes | Issue summary. |
| `issue_type` | string | yes | Bug, Task, Story. |
| `description` | string | no | Issue description. |

## `transition_issue`

Moves an issue to a new workflow state.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `issue_key` | string | yes | Issue key, e.g. ENG-42. |
| `transition` | string | yes | Target state name. |
