# Bitbucket

Browse Bitbucket repositories, pull requests and pipelines. Use for code review and release checks on Bitbucket-hosted code.

- **Category** — Software Engineering
- **Transport** — stdio
- **Auth** — apiKey (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_pull_requests` — Lists open pull requests for a repository.
- `get_pull_request` — Returns a pull request with its description and reviewers.
- `get_diff` — Returns the diff for a pull request.
- `add_pr_comment` — Comments on a pull request.

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
npx -y @nexus2520/bitbucket-mcp-server
```

Requires a Bitbucket app password with repository and pull request scopes.
