# Amazon S3 — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_buckets`

Lists buckets the credentials can reach.

Read-only — safe to call without confirmation.

Takes no parameters.

## `list_objects`

Lists objects under a prefix.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `bucket` | string | yes | Bucket name. |
| `prefix` | string | no | Key prefix to filter by. |
| `limit` | number | no | Maximum objects. |

## `get_object`

Reads an object's contents.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `bucket` | string | yes | Bucket name. |
| `key` | string | yes | Object key. |
