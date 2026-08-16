# Box

Browse and read files in Box. Use for enterprise document retrieval and content search.

- **Category** — Documents & Communication
- **Transport** — stdio
- **Auth** — oauth (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_items` — Lists items in a folder.
- `search` — Searches files by name and content.
- `read_file` — Returns a file's text content.

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
npx -y box-mcp-server
```

Requires Box OAuth or JWT credentials scoped to the folders you expose.
