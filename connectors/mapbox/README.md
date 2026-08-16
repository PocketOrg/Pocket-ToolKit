# Mapbox

Geocode, route and query map data with Mapbox. Use for location intelligence and map generation.

- **Category** — Tools & Automation
- **Transport** — stdio
- **Auth** — apiKey (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `geocode` — Converts a place name to coordinates.
- `reverse_geocode` — Converts coordinates to a place name.
- `get_directions` — Returns a route with distance and duration.

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
npx -y @mapbox/mcp-server
```

Requires a Mapbox access token. Requests count against your quota.
