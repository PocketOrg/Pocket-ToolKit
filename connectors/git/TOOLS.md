# Git — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `git_log`

Returns commit history for a path or branch.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `path` | string | no | File or directory to filter by. |
| `max_count` | number | no | Maximum commits. |

## `git_diff`

Returns the diff between two refs.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | string | yes | Base ref. |
| `to` | string | no | Target ref, defaults to working tree. |

## `git_show`

Returns a commit's message and changes.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `commit` | string | yes | Commit hash or ref. |

## `git_blame`

Returns line-by-line authorship for a file.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `path` | string | yes | File path. |
