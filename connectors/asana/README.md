# Asana

Read and update Asana projects, tasks and comments. Use to check assignments, track delivery and file work.

- **Category** — Documents & Communication
- **Transport** — stdio
- **Auth** — apiKey (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_workspaces` — Lists workspaces the token can reach.
- `search_tasks` — Searches tasks by text within a workspace.
- `get_task` — Returns a task with assignee, due date and status.
- `create_task` — Creates a task in a project.
- `add_comment` — Adds a comment to a task.

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
npx -y @roychri/mcp-server-asana
```

Requires an Asana personal access token.
