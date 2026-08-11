# Sentry — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_issues`

Lists unresolved issues for a project, most frequent first.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organization_slug` | string | yes | Organisation slug. |
| `project_slug` | string | yes | Project slug. |
| `query` | string | no | Sentry search query, e.g. is:unresolved. |

## `get_issue_details`

Returns the full stack trace, breadcrumbs and tags for one issue.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `issue_id` | string | yes | Sentry issue id. |

## `resolve_issue`

Marks an issue resolved.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `issue_id` | string | yes | Sentry issue id. |
