# Google Docs

Read and edit Google Docs. Use for drafting, reviewing and extracting document content.

- **Category** — Documents & Communication
- **Transport** — stdio
- **Auth** — oauth (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `read_document` — Returns a document's text content.
- `create_document` — Creates a document with optional content.
- `append_text` — Appends text to the end of a document.

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
npx -y google-docs-mcp
```

Requires Google OAuth credentials with the Docs scope.
