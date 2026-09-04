# QuickBooks — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_customers`

Lists customers, optionally filtered.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | no | Filter expression. |

## `get_invoice`

Reads one invoice by id.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `invoiceId` | string | yes | Invoice id. |

## `list_invoices`

Lists invoices in a date range.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `since` | string | no | ISO start date. |
| `until` | string | no | ISO end date. |

## `create_invoice`

Creates an invoice for a customer.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `customerId` | string | yes | Customer id. |
| `lines` | string | yes | JSON array of line items. |

## `run_report`

Runs a standard report such as profit and loss or balance sheet.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `report` | string | yes | Report name. |
| `since` | string | no | ISO start date. |
| `until` | string | no | ISO end date. |
