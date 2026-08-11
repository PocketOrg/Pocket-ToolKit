# Slack

Read and post Slack messages, and search channel history. Use for team updates and finding past decisions.

- **Category** — Documents & Communication
- **Transport** — stdio
- **Auth** — oauth2 (channels:read, chat:write, search:read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_channels` — Lists channels the token can see.
- `get_channel_history` — Returns recent messages from a channel.
- `post_message` — Posts a message to a channel or thread.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
