# Odoo

Read and update Odoo records across sales, inventory and accounting modules. Use where Odoo is the ERP.

- **Category** — Tools & Automation
- **Transport** — stdio
- **Auth** — apiKey (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `search_records` — Searches records in a model with a domain filter.
- `read_record` — Reads one record's fields.
- `create_record` — Creates a record in a model.
- `update_record` — Updates a record's fields.

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
npx -y odoo-mcp-server
```

Requires an Odoo URL, database name, username and API key. The key inherits that user's record rules, so create a dedicated user with the access you intend.
