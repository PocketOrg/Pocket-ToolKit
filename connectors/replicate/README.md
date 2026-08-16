# Replicate

Run models hosted on Replicate. Use for image generation, upscaling and specialised model inference.

- **Category** — AI & Accelerated Computing
- **Transport** — stdio
- **Auth** — apiKey (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `search_models` — Searches available models.
- `run_prediction` — Runs a model and returns its output. Billed by runtime.
- `get_prediction` — Returns the status and output of a prediction.

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
npx -y replicate-mcp
```

Requires a Replicate API token. Predictions are billed by runtime.
