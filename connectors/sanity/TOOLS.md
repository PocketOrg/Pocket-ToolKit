# Sanity — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `query`

Runs a GROQ query against the dataset.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `groq` | string | yes | GROQ query. |

## `get_document`

Returns a document by id.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `document_id` | string | yes | Document identifier. |

## `create_document`

Creates a document.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | string | yes | Document type. |
| `fields` | string | yes | Field values as JSON. |
