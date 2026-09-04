# Telegram — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_dialogs`

Lists chats and channels the session can reach.

Read-only — safe to call without confirmation.

Takes no parameters.

## `read_messages`

Reads recent messages from a chat.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `chatId` | string | yes | Chat id or username. |
| `limit` | number | no | Maximum messages. |

## `send_message`

Sends a message to a chat.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `chatId` | string | yes | Chat id or username. |
| `text` | string | yes | Message text. |
