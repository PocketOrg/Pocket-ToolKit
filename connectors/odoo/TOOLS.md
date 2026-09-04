# Odoo — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `search_records`

Searches records in a model with a domain filter.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | yes | Odoo model name, e.g. res.partner. |
| `domain` | string | no | JSON domain filter. |

## `read_record`

Reads one record's fields.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | yes | Odoo model name. |
| `id` | number | no | Record id. |

## `create_record`

Creates a record in a model.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | yes | Odoo model name. |
| `values` | string | yes | JSON object of field values. |

## `update_record`

Updates a record's fields.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | yes | Odoo model name. |
| `id` | number | no | Record id. |
| `values` | string | yes | JSON object of field values. |
