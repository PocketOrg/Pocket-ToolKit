# Supabase

Manage Supabase projects: query Postgres, inspect auth users and storage. Use for Supabase-backed apps.

- **Category** — Data & Analytics
- **Transport** — stdio
- **Auth** — apiKey (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `execute_sql` — Runs SQL against the project database.
- `list_tables` — Lists tables with their schemas.
- `apply_migration` — Applies a named DDL migration.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
