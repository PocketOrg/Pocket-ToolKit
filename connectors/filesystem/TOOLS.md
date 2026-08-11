# Filesystem — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `read_file`

Reads a file's contents.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `path` | string | yes | File path. |

## `write_file`

Writes content to a file, creating or overwriting it.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `path` | string | yes | File path. |
| `content` | string | yes | Content to write. |

## `search_files`

Searches file contents by pattern.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `pattern` | string | yes | Search pattern. |
| `path` | string | no | Directory to search in. |

## `list_directory`

Lists entries in a directory.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `path` | string | yes | Directory path. |
