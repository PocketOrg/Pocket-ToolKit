# Gitea — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_repos`

Lists repositories the token can reach.

Read-only — safe to call without confirmation.

Takes no parameters.

## `list_issues`

Lists issues for a repository.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `owner` | string | yes | Owner name. |
| `repo` | string | yes | Repository name. |
| `state` | string | no | open or closed. |

## `get_pull_request`

Returns a pull request with its diff summary.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `owner` | string | yes | Owner name. |
| `repo` | string | yes | Repository name. |
| `index` | string | yes | Pull request number. |

## `create_issue`

Opens an issue.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `owner` | string | yes | Owner name. |
| `repo` | string | yes | Repository name. |
| `title` | string | yes | Issue title. |
| `body` | string | no | Issue description. |
