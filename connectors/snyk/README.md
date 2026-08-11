# Snyk

Scan dependencies and code for known vulnerabilities. Use before a release or when auditing a project.

- **Category** — Security
- **Transport** — stdio
- **Auth** — apiKey (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `test_dependencies` — Scans a manifest for vulnerable dependencies and returns severities.
- `list_projects` — Lists monitored projects and their issue counts.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
