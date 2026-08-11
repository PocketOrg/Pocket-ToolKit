# Onepassword

Read secrets from 1Password vaults by reference, without exposing values in the transcript.

- **Category** — Security
- **Transport** — stdio
- **Auth** — apiKey (vault.read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_items` — Lists item titles in a vault. Never returns secret values.
- `resolve_reference` — Resolves an op:// secret reference for injection into a process environment.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
