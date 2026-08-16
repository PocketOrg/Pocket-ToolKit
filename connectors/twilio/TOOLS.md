# Twilio — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_messages`

Lists recent messages with delivery status.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `to` | string | no | Filter by recipient. |
| `limit` | number | no | Maximum messages. |

## `send_message`

Sends an SMS or WhatsApp message. Costs money.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `to` | string | yes | Recipient number in E.164 format. |
| `from` | string | yes | Sender number. |
| `body` | string | yes | Message text. |

## `get_call_logs`

Lists recent calls with duration and status.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `limit` | number | no | Maximum calls. |
