# Google Sheets — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `read_range`

Reads values from a range.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `spreadsheet_id` | string | yes | Spreadsheet identifier. |
| `range` | string | yes | A1 notation range. |

## `write_range`

Writes values to a range, overwriting existing cells.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `spreadsheet_id` | string | yes | Spreadsheet identifier. |
| `range` | string | yes | A1 notation range. |
| `values` | string | yes | Rows as a JSON array of arrays. |

## `append_row`

Appends a row to a sheet.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `spreadsheet_id` | string | yes | Spreadsheet identifier. |
| `range` | string | yes | Sheet or range to append to. |
| `values` | string | yes | Row values as a JSON array. |
