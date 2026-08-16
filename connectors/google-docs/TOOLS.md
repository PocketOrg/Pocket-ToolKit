# Google Docs — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `read_document`

Returns a document's text content.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `document_id` | string | yes | Document identifier. |

## `create_document`

Creates a document with optional content.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | string | yes | Document title. |
| `content` | string | no | Initial body text. |

## `append_text`

Appends text to the end of a document.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `document_id` | string | yes | Document identifier. |
| `text` | string | yes | Text to append. |
