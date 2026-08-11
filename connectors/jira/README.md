# Jira

Manage Jira issues, sprints and boards. Use for teams tracking work in Jira.

- **Category** — Documents & Communication
- **Transport** — stdio
- **Auth** — apiKey (read:jira-work, write:jira-work)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `search_issues` — Searches issues using JQL.
- `create_issue` — Creates an issue in a project.
- `transition_issue` — Moves an issue to a new workflow state.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
