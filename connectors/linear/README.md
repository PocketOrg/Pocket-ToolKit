# Linear

Manage Linear issues, projects and cycles. Use for sprint planning and issue triage.

- **Category** — Documents & Communication
- **Transport** — stdio
- **Auth** — oauth2 (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_issues` — Lists issues filtered by team, state or assignee.
- `create_issue` — Creates an issue with a title, description and priority.
- `update_issue` — Updates an issue's state, assignee or fields.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
