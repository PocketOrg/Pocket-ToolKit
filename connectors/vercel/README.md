# Vercel

Inspect Vercel deployments, build logs and environment variables. Use when a deploy fails or a preview needs checking.

- **Category** — Cloud & DevOps
- **Transport** — stdio
- **Auth** — apiKey (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_deployments` — Lists recent deployments with status.
- `get_deployment_logs` — Returns build and runtime logs for a deployment.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
