# Meilisearch

Search and manage Meilisearch indexes. Use for fast typo-tolerant search over application data.

- **Category** — Data & Analytics
- **Transport** — stdio
- **Auth** — apiKey (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_indexes` — Lists indexes with document counts.
- `search` — Searches an index and returns ranked hits.
- `get_settings` — Returns an index's searchable and filterable attributes.
- `add_documents` — Adds or replaces documents in an index.

See [TOOLS.md](./TOOLS.md) for parameters.

## Icon

`icon.svg` is this connector's official mark **in full brand colour**, rendered on
its marketplace card. It comes from [Simple Icons](https://simpleicons.org), which
publishes brand SVGs and their official hex colours under CC0.

Trademarks belong to their respective owners. A mark here indicates the service
this connector talks to, not endorsement by it.

## Install

Pocket runs the server for you. To run it directly:

```bash
npx -y meilisearch-mcp
```

Requires a Meilisearch host URL and API key.
