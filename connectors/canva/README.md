# Canva

Work with Canva designs and assets. Use for generating and exporting branded visual content.

- **Category** — Design & Creative
- **Transport** — stdio
- **Auth** — oauth (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_designs` — Lists designs in the account.
- `get_design` — Returns a design's metadata and pages.
- `export_design` — Exports a design to an image or PDF.

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
npx -y @canva/cli
```

Authenticates against your Canva account via OAuth.
