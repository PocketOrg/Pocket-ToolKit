# Resend — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `send_email`

Sends an email. Delivers to real recipients.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `to` | string | yes | Recipient address. |
| `from` | string | yes | Verified sender address. |
| `subject` | string | yes | Subject line. |
| `html` | string | yes | Message body as HTML. |

## `get_email`

Returns an email's delivery status.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `email_id` | string | yes | Email identifier. |

## `list_domains`

Lists sending domains and their verification status.

Read-only — safe to call without confirmation.

Takes no parameters.
