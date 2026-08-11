# Postgres

Query PostgreSQL and inspect schemas. Use for analysis, debugging data problems, or checking a migration.

- **Category** — Data & Analytics
- **Transport** — stdio
- **Auth** — apiKey (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `query` — Runs a read-only SQL query and returns rows. Writes are rejected.
- `list_tables` — Lists tables and views in a schema.
- `describe_table` — Returns columns, types, indexes and constraints for one table.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
