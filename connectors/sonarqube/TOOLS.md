# SonarQube — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_issues`

Lists issues for a project, filtered by severity or type.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `project` | string | yes | Project key. |
| `severity` | string | no | Severity filter. |
| `type` | string | no | BUG, VULNERABILITY or CODE_SMELL. |

## `get_quality_gate`

Returns the quality gate status for a project.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `project` | string | yes | Project key. |

## `list_hotspots`

Lists security hotspots needing review.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `project` | string | yes | Project key. |
