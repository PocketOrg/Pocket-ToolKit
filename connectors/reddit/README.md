# Reddit

Read Reddit posts and comments. Use for community sentiment and finding discussion of a problem.

- **Category** — Research & Knowledge
- **Transport** — stdio
- **Auth** — none (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `get_subreddit_posts` — Returns posts from a subreddit.
- `search` — Searches Reddit for posts matching a query.
- `get_comments` — Returns the comment thread for a post.

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
npx -y mcp-server-reddit
```

Reads public content. Reddit rate limits unauthenticated requests.
