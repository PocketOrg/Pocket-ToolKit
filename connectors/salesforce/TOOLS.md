# Salesforce — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `run_soql`

Runs a SOQL query and returns matching records.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | SOQL query text. |

## `describe_object`

Returns the fields and types of an object.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | string | yes | API name, such as Opportunity. |

## `get_record`

Returns one record by id.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | string | yes | API name. |
| `record_id` | string | yes | Record identifier. |

## `update_record`

Updates fields on a record.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | string | yes | API name. |
| `record_id` | string | yes | Record identifier. |
| `fields` | string | yes | JSON object of field values. |
