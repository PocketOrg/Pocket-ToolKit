# Aws

Query AWS resources, CloudWatch logs and costs. Use for infrastructure inspection and spend review.

- **Category** — Cloud & DevOps
- **Transport** — stdio
- **Auth** — apiKey (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_resources` — Lists resources of a given type in a region.
- `query_logs` — Runs a CloudWatch Logs Insights query.
- `get_cost_summary` — Returns cost broken down by service for a period.

See [TOOLS.md](./TOOLS.md) for parameters.

## Icon

`icon.svg` is this connector's official mark **in full brand colour**, rendered on
its marketplace card. It comes from [Simple Icons](https://simpleicons.org), which
publishes brand SVGs and their official hex colours under CC0.

The background is transparent, so the card's own surface shows through.

Where a brand colour would not survive one of the two themes, the file carries a
`prefers-color-scheme: dark` media query that swaps in that brand's dark-surface
colour. GitHub's #181717, for instance, reads at 1.0:1 on a near-black card —
invisible — so it inverts to white exactly as GitHub's own dark mode does. Every
icon in the catalogue clears 3:1 against both a white and a near-black surface.

If you replace it, keep these properties:

- 24×24 `viewBox` — the native Simple Icons format
- Fill applied via a `<style>` block, **not** a `fill="…"` attribute on the path.
  A presentation attribute beats the cascade, so the dark override would never
  apply.
- No background `<rect>`, gradients, filters or `<text>`
- A `<title>` naming the service, for screen readers

Trademarks belong to their owners; a logo used to identify the service it
represents is nominative use.

## Licence

MIT
