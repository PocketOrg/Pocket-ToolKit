# Kubernetes — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_pods`

Lists pods in a namespace with phase and restart counts.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `namespace` | string | no | Namespace. Defaults to default. |

## `get_pod_logs`

Returns logs for a pod, optionally for the previous instance.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | yes | Pod name. |
| `namespace` | string | no | Namespace. |
| `previous` | boolean | no | Read the crashed instance's logs. |

## `describe_resource`

Returns full detail and recent events for a resource.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `kind` | string | yes | Resource kind, e.g. deployment. |
| `name` | string | yes | Resource name. |
| `namespace` | string | no | Namespace. |
