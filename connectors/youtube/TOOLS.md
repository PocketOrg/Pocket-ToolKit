# YouTube — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `search_videos`

Searches for videos by query.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | Search text. |
| `limit` | number | no | Maximum results. |

## `get_transcript`

Returns a video's transcript.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `video_id` | string | yes | Video identifier. |

## `get_video_details`

Returns a video's title, channel and statistics.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `video_id` | string | yes | Video identifier. |
