---
name: api-design
description: >-
  Designs HTTP APIs that are predictable to consume and cheap to evolve. Use when designing a new endpoint, reviewing an API surface, or versioning a breaking change.
---

# API Design

## Resources before verbs

Name endpoints after things, not actions. `POST /invoices` rather than `/createInvoice` — the method already carries the verb.

Use plural collections consistently: `/invoices`, `/invoices/{id}`, `/invoices/{id}/lines`.

When an operation genuinely is not CRUD, make it a sub-resource: `POST /invoices/{id}/void` beats `POST /voidInvoice`.

## Status codes that mean something

`200` returns a body. `201` returns the created resource and a `Location` header. `204` returns nothing.

`400` is malformed input; `422` is well-formed but semantically wrong. Pick one convention and hold to it.

`401` means not authenticated, `403` means authenticated but not allowed. Confusing these makes debugging much harder for consumers.

Never return `200` with an error in the body. Clients check status first.

## Errors clients can act on

Return a machine-readable code and a human message: `{ code: "card_declined", message: "...", field: "payment.card" }`.

Validation errors should list every failure, not just the first — otherwise a form round-trips once per field.

Never leak stack traces, SQL or internal hostnames.

## Pagination and filtering

Cursor pagination for anything that changes while being read; offset pagination silently skips and repeats rows as data shifts.

Always cap page size server-side, whatever the client asks for.

Return the total only if it is cheap. An exact count on a large table costs more than the page itself.

## Evolving without breaking

Adding an optional field is safe. Removing one, renaming one, or narrowing a type is not.

Making a previously optional request field required is a breaking change even though the schema looks additive.

Version at the boundary you actually intend to support, and say how long the old version lives.

## Watch out for

- Leaking database column names and internal ids into the public surface, which freezes your schema.
- Inconsistent casing between endpoints — pick `snake_case` or `camelCase` and never mix.
- Returning different shapes for the same resource on different endpoints.
- Booleans that will obviously become enums later (`isActive` when there are four states coming).

## Finishing

Every endpoint has a documented request shape, response shape, error codes and auth requirement. A consumer can integrate without reading your source.
