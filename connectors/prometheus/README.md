# Prometheus

Query Prometheus metrics with PromQL. Use for investigating performance and alert conditions.

- **Category** — Cloud & DevOps
- **Transport** — stdio
- **Auth** — none (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `query` — Runs an instant PromQL query.
- `query_range` — Runs a PromQL query over a time range.
- `list_metrics` — Lists available metric names.
- `list_alerts` — Lists currently firing alerts.

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
npx -y prometheus-mcp-server
```

Requires the Prometheus server URL. Add auth if your deployment requires it.
