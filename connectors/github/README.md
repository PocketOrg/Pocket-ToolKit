# Github

Read and write GitHub issues, pull requests, code and CI runs. Use for triage, review and release work.

- **Category** — Software Engineering
- **Transport** — stdio
- **Auth** — apiKey (repo, read:org)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `search_repositories` — Searches repositories by name, topic or owner.
- `get_file_contents` — Reads a file or lists a directory at a given ref.
- `create_issue` — Opens an issue with a title, body and optional labels and assignees.
- `create_pull_request` — Opens a pull request between two branches.
- `list_pull_requests` — Lists pull requests, filtered by state.
- `create_pull_request_review` — Submits a review with comments, approving or requesting changes.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
