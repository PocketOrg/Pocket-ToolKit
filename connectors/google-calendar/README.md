# Google Calendar

Read and create Google Calendar events. Use for scheduling and checking availability.

- **Category** — Documents & Communication
- **Transport** — stdio
- **Auth** — oauth2 (calendar.events)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_events` — Lists events in a time range.
- `create_event` — Creates an event with attendees.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
