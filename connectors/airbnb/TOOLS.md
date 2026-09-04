# Airbnb — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `search_listings`

Searches listings by location and dates.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `location` | string | yes | Place name. |
| `checkin` | string | no | ISO check-in date. |
| `checkout` | string | no | ISO check-out date. |
| `adults` | number | no | Number of adults. |

## `get_listing`

Reads one listing's details.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `listingId` | string | yes | Listing id. |
