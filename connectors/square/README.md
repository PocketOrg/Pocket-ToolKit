# Square

Read Square payments, orders, catalogue and inventory. Use for retail and hospitality where Square is the till.

- **Category** — Data & Analytics
- **Transport** — stdio
- **Auth** — apiKey (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_payments` — Lists payments in a period.
- `list_orders` — Lists orders for a location.
- `list_catalog` — Lists catalogue items and variations.
- `get_inventory` — Reads inventory counts for catalogue items.
- `update_catalog_item` — Updates a catalogue item's price or details.

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
npx -y square-mcp-server
```

Requires a Square access token. Sandbox and production tokens are separate; scope it to the locations you want reachable.
