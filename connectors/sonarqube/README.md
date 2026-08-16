# SonarQube

Read SonarQube issues, hotspots and quality gates. Use for code quality review and security triage.

- **Category** — Security
- **Transport** — stdio
- **Auth** — apiKey (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_issues` — Lists issues for a project, filtered by severity or type.
- `get_quality_gate` — Returns the quality gate status for a project.
- `list_hotspots` — Lists security hotspots needing review.

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
npx -y sonarqube-mcp-server
```

Requires a SonarQube URL and user token.
