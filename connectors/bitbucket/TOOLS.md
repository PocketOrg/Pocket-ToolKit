# Bitbucket — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_pull_requests`

Lists open pull requests for a repository.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `workspace` | string | yes | Workspace slug. |
| `repo` | string | yes | Repository slug. |
| `state` | string | no | OPEN, MERGED or DECLINED. |

## `get_pull_request`

Returns a pull request with its description and reviewers.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `workspace` | string | yes | Workspace slug. |
| `repo` | string | yes | Repository slug. |
| `id` | string | yes | Pull request number. |

## `get_diff`

Returns the diff for a pull request.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `workspace` | string | yes | Workspace slug. |
| `repo` | string | yes | Repository slug. |
| `id` | string | yes | Pull request number. |

## `add_pr_comment`

Comments on a pull request.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `workspace` | string | yes | Workspace slug. |
| `repo` | string | yes | Repository slug. |
| `id` | string | yes | Pull request number. |
| `text` | string | yes | Comment body. |
