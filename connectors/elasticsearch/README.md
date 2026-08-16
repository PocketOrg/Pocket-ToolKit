# Elasticsearch

Search and inspect Elasticsearch indices. Use for log analysis, full-text search and index diagnostics.

- **Category** — Data & Analytics
- **Transport** — stdio
- **Auth** — apiKey (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_indices` — Lists indices with document counts and size.
- `get_mappings` — Returns the field mappings for an index.
- `search` — Runs a query DSL search against an index.

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
npx -y @elastic/mcp-server-elasticsearch
```

Requires a cluster URL and an API key with read privileges on the indices you expose.
