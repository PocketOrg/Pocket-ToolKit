---
name: caching-strategy
description: >-
  Adds caching that speeds things up without serving wrong data. Use when introducing a cache, debugging stale data, or deciding what to cache and for how long.
---

# Caching Strategy

## Decide invalidation first

Caching is easy; invalidation is the whole problem. If you cannot say how an entry becomes stale, do not add the cache yet.

Prefer a short TTL you can reason about over a clever invalidation scheme you cannot.

Event-based invalidation is correct but needs every writer to participate — including migrations and admin tools.

## Choose the layer deliberately

- **In-process** — fastest, but each instance has its own copy, so invalidation must fan out.

- **Shared (Redis, Memcached)** — consistent across instances, at the cost of a network hop.

- **HTTP/CDN** — best for public, identical responses. Never for anything user-specific unless the cache key includes identity.

Cache the expensive thing, not the cheap wrapper around it.

## Keys

Include every input that changes the output — including locale, permissions and feature flags.

Leaving identity out of a key is how one user sees another's data. This is the most serious caching bug.

Version the key format so a deploy does not read entries written under different assumptions.

## Failure behaviour

A cache miss must be correct, just slower. Never let the cache be the only source of truth.

Handle the stampede: when a hot key expires, many requests recompute at once. Use a lock or serve stale while revalidating.

The cache being down should degrade performance, not availability.

## Watch out for

- Caching per-user data under a global key.
- Unbounded cache growth with no eviction policy.
- Caching an error response, turning a transient failure into a persistent one.
- Adding a cache to hide a missing index instead of adding the index.

## Finishing

Every cached entry has a defined lifetime and invalidation path, keys include all inputs affecting the result, and a cache outage only costs speed.
