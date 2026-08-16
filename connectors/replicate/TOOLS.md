# Replicate — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `search_models`

Searches available models.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | Search text. |

## `run_prediction`

Runs a model and returns its output. Billed by runtime.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | yes | Model identifier, such as owner/name. |
| `input` | string | yes | Model inputs as JSON. |

## `get_prediction`

Returns the status and output of a prediction.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `prediction_id` | string | yes | Prediction identifier. |
