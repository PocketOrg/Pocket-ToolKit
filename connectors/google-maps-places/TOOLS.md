# Google Maps — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `geocode`

Converts an address to coordinates.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | string | yes | Address to resolve. |

## `search_places`

Searches places near a location.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | Search terms. |
| `location` | string | no | Latitude,longitude to search near. |

## `get_place_details`

Reads a place's details including hours and rating.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `placeId` | string | yes | Place id. |

## `get_directions`

Computes a route between two points.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `origin` | string | yes | Start address or coordinates. |
| `destination` | string | yes | End address or coordinates. |
| `mode` | string | no | Travel mode. |
