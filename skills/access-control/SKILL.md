---
name: access-control
description: >-
  Enforces authorisation consistently so users cannot reach each other's data. Use when adding permissions, reviewing an endpoint's authorisation, or investigating a data exposure.
---

# Access Control

## Check ownership, not just identity

Being signed in is not permission to act on a specific record. Every object access must verify the caller owns or may reach that object.

Scope queries by tenant at the data layer: `where organisationId = session.org`. Filtering after fetching is one forgotten line away from a leak.

This class of bug — an id in the request returning someone else's data — is the most common serious vulnerability in web applications.

## Enforce server-side, in one place

Hiding a button is presentation, not authorisation. Every endpoint must check independently.

Centralise the decision — a policy function or middleware — so a new endpoint cannot silently omit it.

Default to denying. A permission check that returns `true` when the rule is unrecognised will eventually be reached.

## Cover every verb

Read, create, update, delete and list are five separate checks. Teams commonly secure create and forget delete.

Check bulk and export paths too — they are the highest-impact leak and the least reviewed.

Verify nested resources against the parent, not only themselves.

## Watch out for

- Trusting a client-supplied role, tenant or user id from the request body.
- Authorising the list endpoint but not the detail endpoint.
- Cache keys that omit identity, serving one user's data to another.
- An admin bypass with no audit trail.

## Finishing

Every endpoint and every verb checks authorisation server-side, queries are tenant-scoped at the data layer, and the default is deny.
