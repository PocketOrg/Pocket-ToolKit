# arXiv — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `search_papers`

Searches arXiv by query, author or category.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | Search text. |
| `category` | string | no | arXiv category, such as cs.LG. |
| `max_results` | number | no | Maximum papers. |

## `get_paper`

Returns a paper's abstract and metadata.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `arxiv_id` | string | yes | arXiv identifier. |

## `download_paper`

Downloads a paper's full text for reading.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `arxiv_id` | string | yes | arXiv identifier. |
