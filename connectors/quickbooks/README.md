# QuickBooks

Read and update QuickBooks Online customers, invoices and reports. Use when an accounting agent needs the actual books rather than a description of them.

- **Category** — Data & Analytics
- **Transport** — stdio
- **Auth** — oauth2 (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_customers` — Lists customers, optionally filtered.
- `get_invoice` — Reads one invoice by id.
- `list_invoices` — Lists invoices in a date range.
- `create_invoice` — Creates an invoice for a customer.
- `run_report` — Runs a standard report such as profit and loss or balance sheet.

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
npx -y quickbooks-mcp
```

Requires an Intuit app with the accounting scope and a company (realm) authorisation. Sandbox and production realms are separate.
