# Figma

Read Figma files, frames and design tokens. Use when implementing a design or extracting styles.

- **Category** — Design & Creative
- **Transport** — stdio
- **Auth** — apiKey (file_read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `get_file` — Returns a file's document tree, frames and components.
- `get_node` — Returns one node's properties, including layout and styles.
- `get_image` — Renders a node to an image URL.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
