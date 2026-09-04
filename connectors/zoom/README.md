# Zoom

Create and read Zoom meetings. Use for scheduling calls and retrieving joining details.

- **Category** — Documents & Communication
- **Transport** — stdio
- **Auth** — oauth2 (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_meetings` — Lists upcoming meetings for the authorised user.
- `get_meeting` — Reads a meeting's details and join URL.
- `create_meeting` — Schedules a meeting.

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
npx -y zoom-mcp-server
```

Requires a Zoom server-to-server OAuth app with meeting scopes.
