# Wikipedia — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `search`

Searches Wikipedia article titles and content.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | Search text. |
| `limit` | number | no | Maximum results. |

## `get_article`

Returns an article's text.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | string | yes | Article title. |

## `get_summary`

Returns the lead section of an article.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | string | yes | Article title. |
