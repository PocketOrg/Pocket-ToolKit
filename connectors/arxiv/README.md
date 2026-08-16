# arXiv

Search and read arXiv preprints. Use for literature review in physics, mathematics and computer science.

- **Category** — Healthcare & Science
- **Transport** — stdio
- **Auth** — none (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `search_papers` — Searches arXiv by query, author or category.
- `get_paper` — Returns a paper's abstract and metadata.
- `download_paper` — Downloads a paper's full text for reading.

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
npx -y arxiv-mcp-server
```

No credentials required. Respect arXiv's rate limits.
