# Cloudinary

Manage and transform images and video in Cloudinary. Use for asset delivery and media pipelines.

- **Category** — Design & Creative
- **Transport** — stdio
- **Auth** — apiKey (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `search_assets` — Searches media assets by tag, folder or format.
- `get_asset` — Returns an asset's metadata and delivery URL.
- `upload_asset` — Uploads a file to the media library.

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
npx -y cloudinary-mcp-server
```

Requires a Cloudinary cloud name, API key and secret.
