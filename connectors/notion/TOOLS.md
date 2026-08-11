# Notion — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `search`

Searches pages and databases by title and content.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | Search text. |

## `get_page`

Returns a page's properties and block content.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `page_id` | string | yes | Notion page id. |

## `create_page`

Creates a page in a parent page or database.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `parent_id` | string | yes | Parent page or database id. |
| `title` | string | yes | Page title. |
| `content` | string | no | Markdown content for the body. |

## `query_database`

Queries a database with filters and sorts.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `database_id` | string | yes | Database id. |
| `filter` | object | no | Notion filter object. |
