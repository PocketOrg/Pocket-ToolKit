# Web Search — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `web_search`

Searches the web and returns titles, URLs and snippets.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | Search query. |
| `count` | number | no | Results to return. Defaults to 10. |
