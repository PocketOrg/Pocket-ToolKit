# Cloudinary — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `search_assets`

Searches media assets by tag, folder or format.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `expression` | string | yes | Search expression. |
| `max_results` | number | no | Maximum assets. |

## `get_asset`

Returns an asset's metadata and delivery URL.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `public_id` | string | yes | Asset public id. |

## `upload_asset`

Uploads a file to the media library.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `file` | string | yes | File path or URL. |
| `folder` | string | no | Destination folder. |
