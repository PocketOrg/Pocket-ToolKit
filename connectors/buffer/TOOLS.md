# Buffer — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_channels`

Lists connected social channels.

Read-only — safe to call without confirmation.

Takes no parameters.

## `list_scheduled`

Lists queued posts for a channel.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `channelId` | string | no | Channel id. |

## `create_post`

Adds a post to a channel's queue.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `channelId` | string | yes | Channel id. |
| `text` | string | yes | Post text. |
| `scheduledAt` | string | no | ISO time to publish. |
