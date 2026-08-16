# Hugging Face — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_spaces`

Lists configured Spaces available as tools.

Read-only — safe to call without confirmation.

Takes no parameters.

## `call_space`

Runs a Space with the given inputs. May incur compute cost.

**Writes or changes state.** Confirm before calling.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `space` | string | yes | Space identifier, such as owner/name. |
| `inputs` | string | yes | Inputs as JSON matching the Space's signature. |
