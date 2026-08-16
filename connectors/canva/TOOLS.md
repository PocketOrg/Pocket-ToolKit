# Canva — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_designs`

Lists designs in the account.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `limit` | number | no | Maximum designs. |

## `get_design`

Returns a design's metadata and pages.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `design_id` | string | yes | Design identifier. |

## `export_design`

Exports a design to an image or PDF.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `design_id` | string | yes | Design identifier. |
| `format` | string | no | png, jpg or pdf. |
