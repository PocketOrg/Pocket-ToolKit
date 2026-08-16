# Obsidian — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `search_notes`

Searches note content across the vault.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | Search text. |

## `read_note`

Returns a note's markdown content.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `path` | string | yes | Note path within the vault. |

## `list_notes`

Lists notes, optionally under a folder.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `folder` | string | no | Folder path. |
