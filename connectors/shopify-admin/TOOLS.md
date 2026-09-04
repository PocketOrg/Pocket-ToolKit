# Shopify — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_products`

Lists products with variants.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | no | Search query. |

## `get_product`

Reads one product.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `productId` | string | yes | Product id. |

## `update_product`

Updates a product's fields.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `productId` | string | yes | Product id. |
| `fields` | string | yes | JSON object of fields to change. |

## `list_orders`

Lists orders, optionally by status.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | string | no | Order status filter. |

## `list_customers`

Lists customers.

Read-only — safe to call without confirmation.

Takes no parameters.

## `adjust_inventory`

Adjusts an inventory level at a location.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `inventoryItemId` | string | yes | Inventory item id. |
| `locationId` | string | yes | Location id. |
| `delta` | number | no | Change in available quantity. |
