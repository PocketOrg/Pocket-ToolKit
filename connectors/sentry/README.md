# Sentry

Inspect Sentry errors, stack traces and release health. Use when triaging a production exception.

- **Category** — Software Engineering
- **Transport** — stdio
- **Auth** — apiKey (project:read, event:read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_issues` — Lists unresolved issues for a project, most frequent first.
- `get_issue_details` — Returns the full stack trace, breadcrumbs and tags for one issue.
- `resolve_issue` — Marks an issue resolved.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
