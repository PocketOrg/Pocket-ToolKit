# Shopify — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `search_docs`

Searches Shopify developer documentation.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | Search text. |

## `introspect_admin_schema`

Returns the Admin GraphQL schema for a type.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | string | no | Type name to inspect. |

## `list_orders`

Lists recent orders with status and total.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | string | no | Filter by fulfilment status. |
| `limit` | number | no | Maximum orders. |

## `get_product`

Returns a product with variants and inventory.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `product_id` | string | yes | Product identifier. |
