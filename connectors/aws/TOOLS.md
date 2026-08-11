# Aws — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_resources`

Lists resources of a given type in a region.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `service` | string | yes | Service, e.g. ec2, s3, lambda. |
| `region` | string | no | AWS region. |

## `query_logs`

Runs a CloudWatch Logs Insights query.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `log_group` | string | yes | Log group name. |
| `query` | string | yes | Insights query string. |

## `get_cost_summary`

Returns cost broken down by service for a period.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `start` | string | yes | ISO start date. |
| `end` | string | yes | ISO end date. |
