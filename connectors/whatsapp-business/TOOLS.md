# WhatsApp — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `send_message`

Sends a text message to a number.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `to` | string | yes | Recipient phone number in international format. |
| `text` | string | yes | Message text. |

## `send_template`

Sends a pre-approved template message.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `to` | string | yes | Recipient phone number. |
| `template` | string | yes | Approved template name. |
| `variables` | string | no | JSON array of template variables. |

## `list_messages`

Lists recent messages for the number.

Read-only — safe to call without confirmation.

Takes no parameters.
