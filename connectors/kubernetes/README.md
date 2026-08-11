# Kubernetes

Inspect Kubernetes workloads, pods, events and logs. Use when diagnosing a cluster or a failing deployment.

- **Category** — Cloud & DevOps
- **Transport** — stdio
- **Auth** — apiKey (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_pods` — Lists pods in a namespace with phase and restart counts.
- `get_pod_logs` — Returns logs for a pod, optionally for the previous instance.
- `describe_resource` — Returns full detail and recent events for a resource.

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
