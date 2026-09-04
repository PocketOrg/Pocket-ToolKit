# Zoom — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_meetings`

Lists upcoming meetings for the authorised user.

Read-only — safe to call without confirmation.

Takes no parameters.

## `get_meeting`

Reads a meeting's details and join URL.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `meetingId` | string | yes | Meeting id. |

## `create_meeting`

Schedules a meeting.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `topic` | string | yes | Meeting topic. |
| `startTime` | string | yes | ISO start time. |
| `duration` | number | no | Duration in minutes. |
