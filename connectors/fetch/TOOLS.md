# Fetch — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `fetch`

Fetches a URL and returns its content as markdown.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `url` | string | yes | The URL to fetch. |
| `max_length` | number | no | Truncate to this many characters. |
