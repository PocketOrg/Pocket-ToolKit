# Slack — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_channels`

Lists channels the token can see.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| _none_ | | | |

## `get_channel_history`

Returns recent messages from a channel.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `channel_id` | string | yes | Channel id. |
| `limit` | number | no | Messages to return. Defaults to 50. |

## `post_message`

Posts a message to a channel or thread.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `channel_id` | string | yes | Channel id. |
| `text` | string | yes | Message text. |
| `thread_ts` | string | no | Reply in this thread rather than the channel. |
