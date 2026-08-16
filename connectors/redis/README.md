# Redis

Read and write Redis keys. Use for cache inspection, debugging session state and checking queue depth.

- **Category** — Data & Analytics
- **Transport** — stdio
- **Auth** — apiKey (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `get` — Returns the value at a key.
- `list_keys` — Lists keys matching a pattern.
- `set` — Sets a key to a value, optionally with expiry.
- `delete` — Deletes a key.

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
npx -y @modelcontextprotocol/server-redis
```

Requires a Redis connection URL.
