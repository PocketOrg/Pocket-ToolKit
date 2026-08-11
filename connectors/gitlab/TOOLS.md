# Gitlab — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `search_repositories`

Searches projects the token can see.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `search` | string | yes | Search term. |

## `get_file_contents`

Reads a file at a given ref.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `project_id` | string | yes | Project id or path. |
| `file_path` | string | yes | Path within the project. |
| `ref` | string | no | Branch, tag or commit. |

## `create_merge_request`

Opens a merge request between two branches.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `project_id` | string | yes | Project id or path. |
| `title` | string | yes | Merge request title. |
| `source_branch` | string | yes | Branch with the changes. |
| `target_branch` | string | yes | Branch to merge into. |

## `create_issue`

Opens an issue on a project.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `project_id` | string | yes | Project id or path. |
| `title` | string | yes | Issue title. |
| `description` | string | no | Markdown description. |
