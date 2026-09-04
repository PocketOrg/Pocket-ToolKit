# Mailchimp — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_audiences`

Lists audiences and their member counts.

Read-only — safe to call without confirmation.

Takes no parameters.

## `list_campaigns`

Lists campaigns, optionally by status.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | string | no | Campaign status filter. |

## `get_campaign_report`

Reads open, click and bounce figures for a campaign.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `campaignId` | string | yes | Campaign id. |

## `add_member`

Adds or updates a member in an audience.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `audienceId` | string | yes | Audience id. |
| `email` | string | yes | Member email address. |
| `fields` | string | no | JSON object of merge fields. |

## `create_campaign`

Creates a draft campaign. Does not send it.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `audienceId` | string | yes | Audience id. |
| `subject` | string | yes | Subject line. |
| `html` | string | yes | Campaign HTML. |
