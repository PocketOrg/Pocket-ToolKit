# Zendesk — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `search_tickets`

Searches tickets by query.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | Zendesk search query. |
| `limit` | number | no | Maximum tickets. |

## `get_ticket`

Returns a ticket with its comment thread.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `ticket_id` | string | yes | Ticket identifier. |

## `add_comment`

Adds a public or internal comment to a ticket.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `ticket_id` | string | yes | Ticket identifier. |
| `body` | string | yes | Comment text. |
| `public` | string | no | true for a public reply. |

## `update_ticket`

Changes a ticket's status, priority or assignee.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `ticket_id` | string | yes | Ticket identifier. |
| `status` | string | no | New status. |
| `priority` | string | no | New priority. |
| `assignee_id` | string | no | Assignee identifier. |
