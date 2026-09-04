# Typeform — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_forms`

Lists forms in the account.

Read-only — safe to call without confirmation.

Takes no parameters.

## `get_responses`

Reads responses for a form.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `formId` | string | yes | Form id. |
| `since` | string | no | ISO start date. |

## `create_form`

Creates a form from a field definition.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | string | yes | Form title. |
| `fields` | string | yes | JSON array of field definitions. |
