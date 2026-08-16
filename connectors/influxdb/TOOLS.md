# InfluxDB — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_buckets`

Lists buckets with retention periods.

Read-only — safe to call without confirmation.

Takes no parameters.

## `query`

Runs a Flux query and returns rows.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `flux` | string | yes | Flux query text. |

## `list_measurements`

Lists measurements in a bucket.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `bucket` | string | yes | Bucket name. |
