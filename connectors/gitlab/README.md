# Gitlab

Manage GitLab projects, merge requests, issues and pipelines. Use for teams hosting on GitLab.

- **Category** — Software Engineering
- **Transport** — stdio
- **Auth** — apiKey (api, read_repository)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `search_repositories` — Searches projects the token can see.
- `get_file_contents` — Reads a file at a given ref.
- `create_merge_request` — Opens a merge request between two branches.
- `create_issue` — Opens an issue on a project.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
