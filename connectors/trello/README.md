# Trello

Read and update Trello boards, lists and cards. Use for lightweight project tracking and status checks.

- **Category** — Documents & Communication
- **Transport** — stdio
- **Auth** — apiKey (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_boards` — Lists boards the token can reach.
- `get_lists` — Lists the lists on a board.
- `get_cards` — Returns cards in a list with their labels and due dates.
- `create_card` — Creates a card in a list.
- `move_card` — Moves a card to another list.

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
npx -y @delorenj/mcp-server-trello
```

Requires a Trello API key and token.
