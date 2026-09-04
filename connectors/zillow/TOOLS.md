# Zillow — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `search_properties`

Searches properties by location and filters.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `location` | string | yes | City, state or postal code. |
| `maxPrice` | number | no | Maximum price. |

## `get_property`

Reads one property's details and estimate.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `propertyId` | string | yes | Property id or address. |
