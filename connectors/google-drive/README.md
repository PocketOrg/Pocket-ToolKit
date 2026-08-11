# Google Drive

Search and read Google Drive files, Docs and Sheets. Use for finding and summarising shared documents.

- **Category** — Documents & Communication
- **Transport** — stdio
- **Auth** — oauth2 (drive.readonly)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `search_files` — Searches Drive by name and content.
- `read_file` — Reads a file's contents, converting Docs and Sheets to text.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
