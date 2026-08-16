# Airtable

Read and update Airtable bases, tables and records. Use for lightweight operational data an agent must query or maintain.

- **Category** — Data & Analytics
- **Transport** — stdio
- **Auth** — apiKey (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_bases` — Lists the bases the token can reach.
- `list_records` — Lists records from a table, optionally filtered by a formula.
- `get_record` — Returns one record with all its fields.
- `create_record` — Creates a record in a table.
- `update_record` — Updates fields on an existing record.

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
npx -y airtable-mcp-server
```

Requires a personal access token with scopes for the bases you want to reach.
