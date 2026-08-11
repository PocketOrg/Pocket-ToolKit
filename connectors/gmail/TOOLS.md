# Gmail — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `search_emails`

Searches messages using Gmail query syntax.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | e.g. from:x is:unread. |

## `read_email`

Returns headers and body for one message.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `message_id` | string | yes | Gmail message id. |

## `send_email`

Sends a message.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `to` | string | yes | Recipient address. |
| `subject` | string | yes | Subject line. |
| `body` | string | yes | Message body. |
