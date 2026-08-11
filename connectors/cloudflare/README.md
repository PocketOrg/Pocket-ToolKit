# Cloudflare

Manage Cloudflare Workers, DNS, KV and analytics. Use when deploying or debugging on Cloudflare.

- **Category** — Cloud & DevOps
- **Transport** — stdio
- **Auth** — apiKey (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_workers` — Lists Workers in the account.
- `get_worker_logs` — Tails recent logs for a Worker.
- `list_dns_records` — Lists DNS records for a zone.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
