# PubMed — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `search`

Searches PubMed with a query.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | Search text or MeSH terms. |
| `max_results` | number | no | Maximum results. |

## `get_abstract`

Returns a publication's abstract and metadata.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `pmid` | string | yes | PubMed identifier. |
