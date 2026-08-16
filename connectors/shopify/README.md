# Shopify

Query Shopify store data and developer documentation. Use for order lookups, catalogue questions and storefront development.

- **Category** — Sales & Marketing
- **Transport** — stdio
- **Auth** — apiKey (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `search_docs` — Searches Shopify developer documentation.
- `introspect_admin_schema` — Returns the Admin GraphQL schema for a type.
- `list_orders` — Lists recent orders with status and total.
- `get_product` — Returns a product with variants and inventory.

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
npx -y @shopify/dev-mcp
```

Requires a Shopify Admin API access token for store data.
