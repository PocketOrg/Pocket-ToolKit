# Hubspot

Read and update HubSpot contacts, companies and deals. Use for CRM hygiene and pipeline review.

- **Category** — Sales & Marketing
- **Transport** — stdio
- **Auth** — oauth2 (crm.objects.contacts.read, crm.objects.deals.read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `search_contacts` — Searches contacts by name, email or property.
- `list_deals` — Lists deals in a pipeline stage.
- `update_contact` — Updates properties on a contact.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
