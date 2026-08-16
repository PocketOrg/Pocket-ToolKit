---
name: api-versioning
description: >-
  Evolves a public API without breaking the clients you cannot control. Use when planning a breaking change, designing a versioning scheme, or deprecating an endpoint.
---
# API Versioning

## Most changes should not need a version

Adding an optional field, adding an endpoint, adding an enum value that clients can ignore — these are compatible if clients are tolerant readers.

Document that clients must ignore unknown fields. That single rule removes the need for most version bumps.

## Know exactly what breaks

Removing a field. Renaming one. Narrowing a type or a range. Making an optional request field required. Changing a default. Changing an error code. Tightening validation on input that used to pass.

That last one is the most commonly missed: rejecting previously accepted input is a breaking change even though the schema looks unchanged.

## Version at a boundary you can afford to run

Whatever scheme you choose — URL path, header, or date-based — you will run two versions simultaneously. Choose the granularity you can maintain: whole-API versioning is simple to reason about and expensive to support.

Never version per endpoint unless you are prepared for a matrix nobody can test.

## Deprecate on a published schedule

Announce, mark deprecated in the response headers and the docs, and give a removal date proportional to the integration cost — months, not weeks, for anything a customer built against.

Measure usage per version. Removing something with active traffic is an outage you scheduled.

## Migrate for people where you can

A migration guide that maps old field to new field, with examples, converts a support burden into a self-service change.

Where the change is mechanical, offer a compatibility shim rather than making every client do the same work.

## Watch out for

- Silently changing behaviour without changing the version, which is the worst outcome for trust.
- Version numbers in the URL that never increment because nobody wants the migration.
- Supporting old versions indefinitely, which multiplies every future change.
- Breaking changes shipped in a patch release because the schema technically validated.
- Undocumented behaviour that clients depend on anyway — it is part of your contract whether you meant it or not.

## Finishing

Compatible changes ship without a version. Breaking changes are announced with a date and a migration guide. Usage per version is measured before removal.

