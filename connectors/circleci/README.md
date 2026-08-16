# CircleCI

Inspect CircleCI pipelines, workflows and build failures. Use to diagnose why a build broke.

- **Category** — Cloud & DevOps
- **Transport** — stdio
- **Auth** — apiKey (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_pipelines` — Lists recent pipelines for a project.
- `get_build_failure` — Returns the failing step and its log output.
- `list_workflows` — Lists workflows in a pipeline with their status.

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
npx -y @circleci/mcp-server-circleci
```

Requires a CircleCI personal API token.
