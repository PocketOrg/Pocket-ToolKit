# Gitea

Browse Gitea repositories, issues and pull requests. Use for self-hosted Git workflows.

- **Category** — Software Engineering
- **Transport** — stdio
- **Auth** — apiKey (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_repos` — Lists repositories the token can reach.
- `list_issues` — Lists issues for a repository.
- `get_pull_request` — Returns a pull request with its diff summary.
- `create_issue` — Opens an issue.

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
npx -y gitea-mcp-server
```

Requires a Gitea instance URL and access token.
