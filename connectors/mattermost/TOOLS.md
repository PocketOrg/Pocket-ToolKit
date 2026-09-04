# Mattermost — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_channels`

Lists channels in a team.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `teamId` | string | no | Team id. |

## `read_posts`

Reads recent posts in a channel.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `channelId` | string | yes | Channel id. |
| `limit` | number | no | Maximum posts. |

## `create_post`

Posts a message to a channel.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `channelId` | string | yes | Channel id. |
| `message` | string | yes | Message text. |
