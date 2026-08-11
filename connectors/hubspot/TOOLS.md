# Hubspot — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `search_contacts`

Searches contacts by name, email or property.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | Search text. |

## `list_deals`

Lists deals in a pipeline stage.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `stage` | string | no | Pipeline stage id. |

## `update_contact`

Updates properties on a contact.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `contact_id` | string | yes | Contact id. |
| `properties` | object | yes | Properties to set. |
