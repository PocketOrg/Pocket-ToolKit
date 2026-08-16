# Google Maps

Geocode addresses, search places and get directions. Use for location lookups and travel planning.

- **Category** — Tools & Automation
- **Transport** — stdio
- **Auth** — apiKey (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `geocode` — Converts an address to coordinates.
- `search_places` — Searches for places near a location.
- `get_directions` — Returns a route between two points.

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
npx -y @modelcontextprotocol/server-google-maps
```

Requires a Google Maps Platform API key. Requests are billed.
