---
name: input-validation
description: >-
  Validates and encodes untrusted input at the right boundaries. Use when handling user input, reviewing a request handler, or fixing an injection vulnerability.
---

# Input Validation

## Validate at the edge, encode at the sink

These are two separate jobs. Validation decides whether to accept; encoding makes data safe for a specific destination.

Validate once at the boundary against an explicit schema, then trust the parsed shape internally.

Encode at every sink, correctly for that sink: SQL parameters, HTML escaping, shell argument arrays, URL encoding. The right encoding for one is wrong for another.

## Allowlists over denylists

Define what is acceptable, not what is forbidden. A denylist is a list of attacks you have thought of.

Constrain type, length, format and range. An unbounded string field is a denial-of-service vector.

For enums, compare against the known set — never interpolate the value.

## The sinks that matter

- **SQL** — parameterised queries only. String building is unsafe no matter how careful the escaping.

- **Shell** — pass an argument array, never a constructed command string.

- **Filesystem** — resolve the path and confirm it stays within the allowed root; `../` traversal is trivial otherwise.

- **HTML** — escape by context. Attribute, text node and script contexts have different rules.

- **Redirects** — validate the target against an allowlist, or you have an open redirect.

## Watch out for

- Validating on the client only, which is a usability feature and not a security control.
- Sanitising by stripping characters, which mangles legitimate input and misses encoded variants.
- Trusting data read back from your own database — it was user input once.
- One escaping function applied everywhere regardless of destination.

## Finishing

Every entry point validates against an explicit schema, and every sink encodes for its own context.
