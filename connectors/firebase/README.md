# Firebase

Query Firestore, inspect authentication users and manage Firebase storage. Use for app backend operations.

- **Category** — Cloud & DevOps
- **Transport** — stdio
- **Auth** — apiKey (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `firestore_query` — Queries a Firestore collection.
- `get_user` — Returns an authentication user by uid or email.
- `list_storage_files` — Lists files in a storage bucket path.

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
npx -y firebase-mcp
```

Requires a service account key. Scope it to the minimum roles needed.
