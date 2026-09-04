# Calendly

Read Calendly event types and scheduled bookings. Use for scheduling coordination without exposing a full calendar.

- **Category** — Documents & Communication
- **Transport** — stdio
- **Auth** — apiKey (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_event_types` — Lists bookable event types.
- `list_scheduled_events` — Lists scheduled bookings in a period.
- `get_invitee` — Reads an invitee's answers for a booking.

See [TOOLS.md](./TOOLS.md) for parameters.

## Icon

`icon.svg` is this connector's official mark **in full brand colour**, rendered on
its marketplace card. It comes from [Simple Icons](https://simpleicons.org), which
publishes brand SVGs and their official hex colours under CC0.

Trademarks belong to their respective owners. A mark here indicates the service
this connector talks to, not endorsement by it.

## Install

Pocket runs the server for you. To run it directly:

```bash
npx -y calendly-mcp-server
```

Requires a Calendly personal access token for the authorised user.
