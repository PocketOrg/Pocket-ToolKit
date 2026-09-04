# Xero

Read and update Xero contacts, invoices and accounts. Use for bookkeeping and reconciliation work against the live ledger.

- **Category** — Data & Analytics
- **Transport** — stdio
- **Auth** — oauth2 (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_contacts` — Lists contacts.
- `list_invoices` — Lists invoices, optionally by status.
- `create_invoice` — Creates a draft invoice.
- `list_accounts` — Lists the chart of accounts.
- `list_bank_transactions` — Lists bank transactions for reconciliation.

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
npx -y @xeroapi/xero-mcp-server
```

Requires a Xero app with accounting scopes and a tenant authorisation. Published by Xero.
