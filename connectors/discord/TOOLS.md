# Discord — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_channels`

Lists channels in a server.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `guild_id` | string | yes | Server identifier. |

## `read_messages`

Reads recent messages from a channel.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `channel_id` | string | yes | Channel identifier. |
| `limit` | number | no | Maximum messages to return. |

## `send_message`

Posts a message to a channel.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `channel_id` | string | yes | Channel identifier. |
| `content` | string | yes | Message text. |
