# Mapbox — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `geocode`

Converts a place name to coordinates.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | Place or address text. |

## `reverse_geocode`

Converts coordinates to a place name.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `longitude` | string | yes | Longitude. |
| `latitude` | string | yes | Latitude. |

## `get_directions`

Returns a route with distance and duration.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `coordinates` | string | yes | Semicolon-separated lon,lat pairs. |
| `profile` | string | no | driving, walking or cycling. |
