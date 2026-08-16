# Salesforce

Query and update Salesforce records with SOQL. Use for pipeline questions, account lookups and CRM hygiene.

- **Category** — Sales & Marketing
- **Transport** — stdio
- **Auth** — oauth (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `run_soql` — Runs a SOQL query and returns matching records.
- `describe_object` — Returns the fields and types of an object.
- `get_record` — Returns one record by id.
- `update_record` — Updates fields on a record.

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
npx -y @salesforce/mcp
```

Authenticates against your Salesforce org; the connected user's permissions apply.
