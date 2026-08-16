# Perplexity — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `ask`

Asks a question and returns an answer with citations.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | Question text. |
| `model` | string | no | Model name to use. |
