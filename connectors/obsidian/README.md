# Obsidian

Read and search an Obsidian vault. Use for retrieving personal or team notes and linked knowledge.

- **Category** — Research & Knowledge
- **Transport** — stdio
- **Auth** — none (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `search_notes` — Searches note content across the vault.
- `read_note` — Returns a note's markdown content.
- `list_notes` — Lists notes, optionally under a folder.

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
npx -y mcp-obsidian
```

Reads a local vault directory. Point it only at vaults you want the agent to see.
