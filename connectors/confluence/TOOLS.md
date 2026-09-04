# Confluence — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `search`

Searches pages by text or CQL.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | Search terms or CQL. |

## `get_page`

Reads one page's content.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `pageId` | string | yes | Page id. |

## `create_page`

Creates a page in a space.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `spaceKey` | string | yes | Space key. |
| `title` | string | yes | Page title. |
| `body` | string | yes | Page body in storage format. |

## `update_page`

Updates an existing page.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `pageId` | string | yes | Page id. |
| `body` | string | yes | New page body. |
| `version` | number | no | Expected current version. |
