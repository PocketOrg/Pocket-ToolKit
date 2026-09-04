# Calendly — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_event_types`

Lists bookable event types.

Read-only — safe to call without confirmation.

Takes no parameters.

## `list_scheduled_events`

Lists scheduled bookings in a period.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `since` | string | no | ISO start date. |
| `until` | string | no | ISO end date. |

## `get_invitee`

Reads an invitee's answers for a booking.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `eventId` | string | yes | Scheduled event id. |
