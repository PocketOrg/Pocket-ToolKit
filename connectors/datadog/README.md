# Datadog

Query Datadog metrics, monitors, logs and incidents. Use to investigate alerts and check service health.

- **Category** — Cloud & DevOps
- **Transport** — stdio
- **Auth** — apiKey (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `query_metrics` — Queries a metric over a time range.
- `list_monitors` — Lists monitors and their current states.
- `search_logs` — Searches logs over a time range.
- `list_incidents` — Lists recent incidents.

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
npx -y @winor30/mcp-server-datadog
```

Requires a Datadog API key and application key.
