# SendGrid — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `get_stats`

Returns delivery, open and bounce statistics.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `start_date` | string | yes | Start date, YYYY-MM-DD. |
| `end_date` | string | no | End date, YYYY-MM-DD. |

## `list_suppressions`

Lists bounced and unsubscribed addresses.

Read-only — safe to call without confirmation.

Takes no parameters.

## `send_email`

Sends an email. Delivers to real recipients.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `to` | string | yes | Recipient address. |
| `from` | string | yes | Verified sender address. |
| `subject` | string | yes | Subject line. |
| `body` | string | yes | Message body. |
