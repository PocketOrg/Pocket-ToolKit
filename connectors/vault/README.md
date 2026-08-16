# Vault

Read HashiCorp Vault secrets metadata and audit policy. Use for secret inventory and access review.

- **Category** — Security
- **Transport** — stdio
- **Auth** — apiKey (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_secrets` — Lists secret paths under a mount. Returns names, not values.
- `get_secret_metadata` — Returns version history and timestamps for a secret.
- `list_policies` — Lists policies defined on the server.

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
npx -y vault-mcp-server
```

Requires a Vault address and token. Grant a policy limited to metadata where possible.
