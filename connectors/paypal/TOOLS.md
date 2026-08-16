# PayPal — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_transactions`

Lists transactions in a date range.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `start_date` | string | yes | Start date, ISO 8601. |
| `end_date` | string | yes | End date, ISO 8601. |

## `get_invoice`

Returns an invoice with its line items and status.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `invoice_id` | string | yes | Invoice identifier. |

## `list_disputes`

Lists open disputes needing a response.

Read-only — safe to call without confirmation.

Takes no parameters.
