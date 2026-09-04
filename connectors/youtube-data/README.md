# YouTube

Fetch YouTube video metadata and transcripts. Use for research and content analysis without watching the video.

- **Category** — Research & Knowledge
- **Transport** — stdio
- **Auth** — none (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `get_transcript` — Downloads a public video's transcript when captions exist.
- `get_metadata` — Reads a public video's title, description and duration.

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
npx -y @anaisbetts/mcp-youtube
```

No credential required for public videos. Transcripts are only available where the uploader published captions.
