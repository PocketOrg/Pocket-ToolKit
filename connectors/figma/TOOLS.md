# Figma — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `get_file`

Returns a file's document tree, frames and components.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `file_key` | string | yes | Figma file key. |

## `get_node`

Returns one node's properties, including layout and styles.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `file_key` | string | yes | Figma file key. |
| `node_id` | string | yes | Node id. |

## `get_image`

Renders a node to an image URL.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `file_key` | string | yes | Figma file key. |
| `node_id` | string | yes | Node id. |
