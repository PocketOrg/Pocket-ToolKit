# Cloudflare — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_workers`

Lists Workers in the account.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| _none_ | | | |

## `get_worker_logs`

Tails recent logs for a Worker.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | yes | Worker name. |

## `list_dns_records`

Lists DNS records for a zone.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `zone` | string | yes | Zone name. |
