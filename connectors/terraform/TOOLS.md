# Terraform — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `search_modules`

Searches the Terraform registry for modules.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | yes | Search text. |

## `get_provider_docs`

Returns documentation for a provider resource.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `provider` | string | yes | Provider name, such as aws. |
| `resource` | string | yes | Resource type name. |

## `get_module`

Returns a module's inputs, outputs and versions.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `module` | string | yes | Module path, such as terraform-aws-modules/vpc/aws. |
