# Filesystem

Read, write and search files in an allowed directory. Use for working with a local project.

- **Category** — Tools & Automation
- **Transport** — stdio
- **Auth** — none
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `read_file` — Reads a file's contents.
- `write_file` — Writes content to a file, creating or overwriting it.
- `search_files` — Searches file contents by pattern.
- `list_directory` — Lists entries in a directory.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
