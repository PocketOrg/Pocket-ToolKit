# Apache Kafka

Inspect Kafka topics, consumer groups and lag. Use for diagnosing streaming pipelines and backlogs.

- **Category** — Data & Analytics
- **Transport** — stdio
- **Auth** — apiKey (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_topics` — Lists topics with partition counts.
- `describe_topic` — Returns a topic's partitions, replicas and configuration.
- `get_consumer_lag` — Returns consumer group offsets and lag per partition.
- `consume_messages` — Reads recent messages from a topic.

See [TOOLS.md](./TOOLS.md) for parameters.

## Icon

`icon.svg` is this connector's official mark **in full brand colour**, rendered on
its marketplace card. It comes from [Simple Icons](https://simpleicons.org), which
publishes brand SVGs and their official hex colours under CC0.

Trademarks belong to their respective owners. A mark here indicates the service
this connector talks to, not endorsement by it.

## Install

Pocket runs the server for you. To run it directly:

```bash
npx -y kafka-mcp-server
```

Requires broker addresses and, where enabled, SASL credentials.
