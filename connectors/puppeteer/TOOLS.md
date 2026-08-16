# Puppeteer — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `navigate`

Opens a URL.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `url` | string | yes | Destination URL. |

## `get_content`

Returns the rendered HTML of the page.

Read-only — safe to call without confirmation.

Takes no parameters.

## `click`

Clicks an element by selector.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `selector` | string | yes | CSS selector. |

## `screenshot`

Captures a screenshot.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `full_page` | string | no | true to capture the whole page. |
