# Sqlite

Query and inspect a local SQLite database. Use for analysis of a file-based dataset.

- **Category** — Data & Analytics
- **Transport** — stdio
- **Auth** — none
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `read_query` — Runs a SELECT and returns rows.
- `write_query` — Runs an INSERT, UPDATE or DELETE.
- `list_tables` — Lists every table in the database.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
