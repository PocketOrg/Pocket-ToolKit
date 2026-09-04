# Mailchimp

Read and manage Mailchimp audiences, campaigns and reports. Use for email marketing where Mailchimp holds the list.

- **Category** — Sales & Marketing
- **Transport** — stdio
- **Auth** — apiKey (read, write)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_audiences` — Lists audiences and their member counts.
- `list_campaigns` — Lists campaigns, optionally by status.
- `get_campaign_report` — Reads open, click and bounce figures for a campaign.
- `add_member` — Adds or updates a member in an audience.
- `create_campaign` — Creates a draft campaign. Does not send it.

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
npx -y mailchimp-mcp
```

Requires a Mailchimp API key. The key encodes its data centre, so it only reaches that account.
