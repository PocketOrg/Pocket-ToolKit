# Netlify — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_sites`

Lists sites with their production URL.

Read-only — safe to call without confirmation.

Takes no parameters.

## `list_deploys`

Lists deploys for a site with status.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `site_id` | string | yes | Site identifier. |

## `get_deploy_log`

Returns the build log for a deploy.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `deploy_id` | string | yes | Deploy identifier. |
