# Firebase — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `firestore_query`

Queries a Firestore collection.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `collection` | string | yes | Collection path. |
| `where` | string | no | Filter as JSON. |
| `limit` | number | no | Maximum documents. |

## `get_user`

Returns an authentication user by uid or email.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `identifier` | string | yes | User uid or email address. |

## `list_storage_files`

Lists files in a storage bucket path.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `path` | string | no | Path prefix. |
