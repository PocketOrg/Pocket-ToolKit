# DigitalOcean

Manage DigitalOcean droplets, databases and app platform deployments. Use for infrastructure operations.

- **Category** — Cloud & DevOps
- **Transport** — stdio
- **Auth** — apiKey (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_droplets` — Lists droplets with size, region and status.
- `list_apps` — Lists App Platform apps and deployment status.
- `get_app_logs` — Returns logs for an app deployment.
- `list_databases` — Lists managed database clusters.

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
npx -y @digitalocean/mcp
```

Requires a DigitalOcean personal access token. Create operations incur cost.
