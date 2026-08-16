# HackerOne — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_reports`

Lists reports for a program, filtered by state.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `program` | string | yes | Program handle. |
| `state` | string | no | Report state filter. |

## `get_report`

Returns a report with its timeline and severity.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `report_id` | string | yes | Report identifier. |
