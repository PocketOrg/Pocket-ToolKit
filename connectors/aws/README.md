# Aws

Query AWS resources, CloudWatch logs and costs. Use for infrastructure inspection and spend review.

- **Category** — Cloud & DevOps
- **Transport** — stdio
- **Auth** — apiKey (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_resources` — Lists resources of a given type in a region.
- `query_logs` — Runs a CloudWatch Logs Insights query.
- `get_cost_summary` — Returns cost broken down by service for a period.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
