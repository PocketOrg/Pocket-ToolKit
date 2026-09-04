# Xero — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_contacts`

Lists contacts.

Read-only — safe to call without confirmation.

Takes no parameters.

## `list_invoices`

Lists invoices, optionally by status.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | string | no | Invoice status filter. |

## `create_invoice`

Creates a draft invoice.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `contactId` | string | yes | Contact id. |
| `lines` | string | yes | JSON array of line items. |

## `list_accounts`

Lists the chart of accounts.

Read-only — safe to call without confirmation.

Takes no parameters.

## `list_bank_transactions`

Lists bank transactions for reconciliation.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `since` | string | no | ISO start date. |
