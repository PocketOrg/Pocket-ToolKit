# Stripe

Inspect Stripe customers, subscriptions, payments and disputes. Use for billing questions and revenue checks.

- **Category** — Sales & Marketing
- **Transport** — stdio
- **Auth** — apiKey (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_customers` — Lists customers, optionally filtered by email.
- `get_subscription` — Returns a subscription with its items and status.
- `list_payments` — Lists recent payment intents with status.
- `create_refund` — Refunds a charge, fully or partially.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
