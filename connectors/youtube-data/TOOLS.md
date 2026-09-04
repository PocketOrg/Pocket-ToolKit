# YouTube — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `get_transcript`

Downloads a public video's transcript when captions exist.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `url` | string | yes | Video URL. |

## `get_metadata`

Reads a public video's title, description and duration.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `url` | string | yes | Video URL. |
