# Gmail

Search, read and send email through Gmail. Use for inbox triage and drafting replies.

- **Category** — Documents & Communication
- **Transport** — stdio
- **Auth** — oauth2 (gmail.readonly, gmail.send)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `search_emails` — Searches messages using Gmail query syntax.
- `read_email` — Returns headers and body for one message.
- `send_email` — Sends a message.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
