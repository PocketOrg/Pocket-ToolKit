# Airtable — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_bases`

Lists the bases the token can reach.

Read-only — safe to call without confirmation.

Takes no parameters.

## `list_records`

Lists records from a table, optionally filtered by a formula.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `base_id` | string | yes | Base identifier. |
| `table` | string | yes | Table name or id. |
| `filter_by_formula` | string | no | Airtable formula limiting which records return. |
| `max_records` | number | no | Maximum records to return. |

## `get_record`

Returns one record with all its fields.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `base_id` | string | yes | Base identifier. |
| `table` | string | yes | Table name or id. |
| `record_id` | string | yes | Record identifier. |

## `create_record`

Creates a record in a table.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `base_id` | string | yes | Base identifier. |
| `table` | string | yes | Table name or id. |
| `fields` | string | yes | JSON object of field values. |

## `update_record`

Updates fields on an existing record.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `base_id` | string | yes | Base identifier. |
| `table` | string | yes | Table name or id. |
| `record_id` | string | yes | Record identifier. |
| `fields` | string | yes | JSON object of field values to change. |
