# Google Maps

Geocode addresses, search places and compute routes. Use for local business research, service areas and travel planning.

- **Category** — Research & Knowledge
- **Transport** — stdio
- **Auth** — apiKey (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `geocode` — Converts an address to coordinates.
- `search_places` — Searches places near a location.
- `get_place_details` — Reads a place's details including hours and rating.
- `get_directions` — Computes a route between two points.

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

Requires a Google Maps Platform API key with Places, Geocoding and Directions enabled. Billing applies per request.
