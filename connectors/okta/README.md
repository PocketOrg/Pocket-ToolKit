# Okta

Inspect Okta users, groups, applications and system logs. Use for access reviews and login troubleshooting.

- **Category** — Security
- **Transport** — stdio
- **Auth** — apiKey (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_users` — Searches users in the directory.
- `list_groups` — Lists groups and their membership counts.
- `get_system_logs` — Returns recent authentication and admin events.
- `list_applications` — Lists assigned applications and their sign-on modes.

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
npx -y okta-mcp-server
```

Requires an Okta domain and API token. Use a read-only admin role.
