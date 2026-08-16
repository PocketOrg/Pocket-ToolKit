# Heroku

Manage Heroku apps, dynos, config and logs. Use for deployment checks and incident response.

- **Category** — Cloud & DevOps
- **Transport** — stdio
- **Auth** — apiKey (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_apps` — Lists apps the account can reach.
- `get_logs` — Returns recent log output for an app.
- `list_dynos` — Lists dynos with size and state.
- `restart_dynos` — Restarts an app's dynos. Causes brief downtime.

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
npx -y @heroku/mcp-server
```

Requires a Heroku API key. Scale and restart operations affect running services.
