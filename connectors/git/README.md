# Git

Read local Git history, diffs and branches. Use for understanding how code reached its current state.

- **Category** — Software Engineering
- **Transport** — stdio
- **Auth** — none (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `git_log` — Returns commit history for a path or branch.
- `git_diff` — Returns the diff between two refs.
- `git_show` — Returns a commit's message and changes.
- `git_blame` — Returns line-by-line authorship for a file.

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
npx -y mcp-server-git
```

Operates on a local repository path you specify.
