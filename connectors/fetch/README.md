# Fetch

Fetch a URL and convert the page to readable markdown. Use for reading documentation or an article.

- **Category** — Research & Knowledge
- **Transport** — stdio
- **Auth** — none
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `fetch` — Fetches a URL and returns its content as markdown.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
