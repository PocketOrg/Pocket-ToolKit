# Github — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `search_repositories`

Searches repositories by name, topic or owner.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | GitHub search syntax. |

## `get_file_contents`

Reads a file or lists a directory at a given ref.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `owner` | string | yes | Repository owner. |
| `repo` | string | yes | Repository name. |
| `path` | string | yes | Path within the repository. |
| `ref` | string | no | Branch, tag or commit SHA. Defaults to the default branch. |

## `create_issue`

Opens an issue with a title, body and optional labels and assignees.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `owner` | string | yes | Repository owner. |
| `repo` | string | yes | Repository name. |
| `title` | string | yes | Issue title. |
| `body` | string | no | Markdown body. |
| `labels` | array | no | Label names to apply. |

## `create_pull_request`

Opens a pull request between two branches.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `owner` | string | yes | Repository owner. |
| `repo` | string | yes | Repository name. |
| `title` | string | yes | Pull request title. |
| `head` | string | yes | Branch containing the changes. |
| `base` | string | yes | Branch to merge into. |
| `body` | string | no | Markdown description. |

## `list_pull_requests`

Lists pull requests, filtered by state.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `owner` | string | yes | Repository owner. |
| `repo` | string | yes | Repository name. |
| `state` | string | no | open, closed or all. Defaults to open. |

## `create_pull_request_review`

Submits a review with comments, approving or requesting changes.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `owner` | string | yes | Repository owner. |
| `repo` | string | yes | Repository name. |
| `pull_number` | number | yes | Pull request number. |
| `event` | string | yes | APPROVE, REQUEST_CHANGES or COMMENT. |
| `body` | string | no | Overall review comment. |
