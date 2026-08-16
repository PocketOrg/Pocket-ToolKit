# Resend

Send transactional email and inspect delivery through Resend. Use for developer-focused email workflows.

- **Category** — Sales & Marketing
- **Transport** — stdio
- **Auth** — apiKey (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `send_email` — Sends an email. Delivers to real recipients.
- `get_email` — Returns an email's delivery status.
- `list_domains` — Lists sending domains and their verification status.

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
npx -y resend-mcp
```

Requires a Resend API key and a verified sending domain.
