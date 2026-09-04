# Shopify

Read and update Shopify products, orders, customers and inventory. Use for storefront and merchandising work against the live shop.

- **Category** — Sales & Marketing
- **Transport** — stdio
- **Auth** — apiKey (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_products` — Lists products with variants.
- `get_product` — Reads one product.
- `update_product` — Updates a product's fields.
- `list_orders` — Lists orders, optionally by status.
- `list_customers` — Lists customers.
- `adjust_inventory` — Adjusts an inventory level at a location.

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
npx -y shopify-mcp-server
```

Requires a custom-app Admin API access token with the product, order, customer and inventory scopes you intend to use.
