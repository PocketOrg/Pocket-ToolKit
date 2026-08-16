# Zendesk

Read and update Zendesk tickets and users. Use for support triage and finding recurring customer problems.

- **Category** — Documents & Communication
- **Transport** — stdio
- **Auth** — apiKey (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `search_tickets` — Searches tickets by query.
- `get_ticket` — Returns a ticket with its comment thread.
- `add_comment` — Adds a public or internal comment to a ticket.
- `update_ticket` — Changes a ticket's status, priority or assignee.

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
npx -y zendesk-mcp-server
```

Requires a Zendesk subdomain, email and API token.
