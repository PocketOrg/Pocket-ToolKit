# Brave Search — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `brave_web_search`

Searches the web and returns ranked results.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | Search text. |
| `count` | number | no | Maximum results. |

## `brave_news_search`

Searches recent news.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | Search text. |
| `count` | number | no | Maximum results. |
