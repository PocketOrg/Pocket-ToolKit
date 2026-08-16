# Reddit — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `get_subreddit_posts`

Returns posts from a subreddit.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `subreddit` | string | yes | Subreddit name without r/. |
| `sort` | string | no | hot, new or top. |
| `limit` | number | no | Maximum posts. |

## `search`

Searches Reddit for posts matching a query.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | Search text. |
| `subreddit` | string | no | Restrict to one subreddit. |

## `get_comments`

Returns the comment thread for a post.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `post_id` | string | yes | Post identifier. |
