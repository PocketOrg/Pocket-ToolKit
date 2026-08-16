# Mixpanel

Query Mixpanel events and funnels. Use for product usage analysis and retention reporting.

- **Category** — Data & Analytics
- **Transport** — stdio
- **Auth** — apiKey (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `query_events` — Returns event counts over a period.
- `get_funnel` — Returns conversion rates for a saved funnel.
- `get_retention` — Returns a retention cohort table.

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
npx -y mixpanel-mcp
```

Requires a Mixpanel service account and project id.
