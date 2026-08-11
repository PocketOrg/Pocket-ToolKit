# Google Calendar — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_events`

Lists events in a time range.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `time_min` | string | yes | ISO start. |
| `time_max` | string | yes | ISO end. |

## `create_event`

Creates an event with attendees.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `summary` | string | yes | Event title. |
| `start` | string | yes | ISO start time. |
| `end` | string | yes | ISO end time. |
| `attendees` | array | no | Attendee email addresses. |
