# Stripe — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_customers`

Lists customers, optionally filtered by email.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string | no | Filter to this email address. |

## `get_subscription`

Returns a subscription with its items and status.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `subscription_id` | string | yes | Subscription id. |

## `list_payments`

Lists recent payment intents with status.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `customer_id` | string | no | Filter to one customer. |

## `create_refund`

Refunds a charge, fully or partially.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `charge_id` | string | yes | Charge id. |
| `amount` | number | no | Amount in the smallest currency unit. |
