# OpenAI — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_models`

Lists models available to the key.

Read-only — safe to call without confirmation.

Takes no parameters.

## `create_completion`

Generates a completion. Billed per token.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | yes | Model name. |
| `prompt` | string | yes | Prompt text. |
| `max_tokens` | number | no | Maximum tokens to generate. |

## `create_embedding`

Returns an embedding vector for text. Billed per token.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | yes | Embedding model name. |
| `input` | string | yes | Text to embed. |
