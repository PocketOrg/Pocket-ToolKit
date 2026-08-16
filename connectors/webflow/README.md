# Webflow

Read and update Webflow sites, collections and CMS items. Use for marketing site content operations.

- **Category** — Design & Creative
- **Transport** — stdio
- **Auth** — apiKey (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_sites` — Lists sites the token can reach.
- `list_collections` — Lists CMS collections for a site.
- `list_items` — Lists items in a collection.
- `create_item` — Creates a CMS item as draft or live.

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
npx -y webflow-mcp-server
```

Requires a Webflow API token scoped to the sites you expose.
