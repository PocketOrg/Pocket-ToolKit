# Greenhouse

Read Greenhouse jobs, candidates and interview stages. Use for hiring pipeline work where Greenhouse is the ATS.

- **Category** — Documents & Communication
- **Transport** — stdio
- **Auth** — apiKey (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_jobs` — Lists open jobs.
- `list_candidates` — Lists candidates for a job.
- `get_candidate` — Reads one candidate's application and stage.
- `list_stages` — Lists interview stages for a job.

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
npx -y greenhouse-mcp
```

Requires a Greenhouse Harvest API key. Candidate data is personal data — scope the key narrowly and treat every read accordingly.
