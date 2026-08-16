# Apache Kafka — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_topics`

Lists topics with partition counts.

Read-only — safe to call without confirmation.

Takes no parameters.

## `describe_topic`

Returns a topic's partitions, replicas and configuration.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `topic` | string | yes | Topic name. |

## `get_consumer_lag`

Returns consumer group offsets and lag per partition.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `group` | string | yes | Consumer group id. |

## `consume_messages`

Reads recent messages from a topic.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `topic` | string | yes | Topic name. |
| `limit` | number | no | Maximum messages. |
