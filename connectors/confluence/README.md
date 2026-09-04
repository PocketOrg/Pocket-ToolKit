# Confluence

Search, read and write Confluence pages. Use where team knowledge lives in Confluence rather than a repository.

- **Category** — Documents & Communication
- **Transport** — stdio
- **Auth** — apiKey (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `search` — Searches pages by text or CQL.
- `get_page` — Reads one page's content.
- `create_page` — Creates a page in a space.
- `update_page` — Updates an existing page.

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
npx -y confluence-mcp-server
```

Requires an Atlassian API token plus the account email and site URL. Cloud, Server and Data Center differ in their API paths.
