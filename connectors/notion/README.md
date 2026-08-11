# Notion

Read and write Notion pages and databases. Use for specs, notes and structured project tracking.

- **Category** — Documents & Communication
- **Transport** — stdio
- **Auth** — oauth2 (read, insert, update)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `search` — Searches pages and databases by title and content.
- `get_page` — Returns a page's properties and block content.
- `create_page` — Creates a page in a parent page or database.
- `query_database` — Queries a database with filters and sorts.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
