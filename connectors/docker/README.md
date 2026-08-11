# Docker

Inspect and control Docker containers, images and logs. Use when debugging a container or checking what is running.

- **Category** — Cloud & DevOps
- **Transport** — stdio
- **Auth** — none
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_containers` — Lists containers with status and ports.
- `get_logs` — Returns recent log output for a container.
- `restart_container` — Restarts a container.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
