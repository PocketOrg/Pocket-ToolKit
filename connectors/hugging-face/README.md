# Hugging Face

Call Hugging Face Spaces as tools. Use to run hosted models for images, audio and text without local GPUs.

- **Category** — AI & Accelerated Computing
- **Transport** — stdio
- **Auth** — apiKey (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_spaces` — Lists configured Spaces available as tools.
- `call_space` — Runs a Space with the given inputs. May incur compute cost.

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
npx -y @llmindset/mcp-hfspace
```

A Hugging Face token is needed for private or rate-limited Spaces.
