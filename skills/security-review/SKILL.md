---
name: security-review
description: >-
  Audits code for exploitable vulnerabilities by tracing untrusted input to
  dangerous sinks. Use when reviewing code for security, assessing a
  vulnerability report, or hardening an endpoint that handles user input.
---

# Security Review

Security review is not a checklist sweep — it is following data. Start from
where untrusted input enters and trace it to somewhere it can cause harm. A
finding is only real if you can name both ends of that path.

## Method

1. **Find the entry points.** Request bodies, query strings, headers, cookies,
   uploaded files, webhook payloads, message queues, and anything read from a
   database that a user previously wrote.
2. **Find the sinks.** SQL queries, shell commands, file paths, HTML output,
   deserialisation, redirects, template rendering, `eval`.
3. **Trace between them.** For each sink, work backwards: can any entry point
   reach this, and is it neutralised on the way?
4. **Report only reachable paths.** "This function is unsafe if called with
   attacker input" is not a finding unless attacker input can reach it. Say so
   when you cannot establish reachability.

## The classes that actually matter

**Injection** — input reaching an interpreter.
- SQL: string concatenation instead of parameterised queries.
- Command: user data in `exec`/`system`, even inside a quoted string.
- Path traversal: `../` reaching a filesystem read or write.
- Server-side template injection: user input rendered as a template, not data.

**Broken access control** — the most commonly missed, and the most severe.
- Authorisation checked in the UI but not the API.
- Object references accepted without verifying ownership (IDOR): can changing
  an id in the request return someone else's record?
- Privilege checks on the create path but not update or delete.

**Authentication and session**
- Tokens that do not expire, or are not invalidated on logout or password change.
- Secrets compared with `==` rather than a constant-time comparison.
- Password reset flows that leak whether an account exists.

**Data exposure**
- Sensitive fields serialised by default — an ORM returning a whole row.
- Secrets in logs, stack traces, or error responses.
- Verbose errors in production revealing schema, paths or versions.

**Cross-site scripting**
- Unescaped output, especially `dangerouslySetInnerHTML` or equivalents.
- `javascript:` URLs reaching an `href`.
- User-controlled data in a `<script>` block, where HTML escaping is not enough.

**Server-side request forgery**
- A user-supplied URL fetched by the server. Check whether internal addresses
  and cloud metadata endpoints are blocked.

## Reporting a finding

Each one needs four things. Without them a report cannot be triaged.

> **Severity** — Critical
> **Path** — `POST /api/invoices` → `body.customerId` → `Invoice.find()` with no
> ownership check.
> **Impact** — Any authenticated user can read any customer's invoices by
> changing one id.
> **Fix** — Scope the query to the session's organisation, not just the id.

## Severity

Rate by impact and reachability together, not by how clever the bug is.

- **Critical** — Unauthenticated, remote, leads to data loss or full compromise.
- **High** — Authenticated but cross-tenant, or privilege escalation.
- **Medium** — Requires unusual conditions, or the impact is limited.
- **Low** — Defence-in-depth. Worth fixing, not worth blocking a release.

## What not to do

- **Do not report scanner output verbatim.** A dependency CVE in a code path that
  is never called is noise; say that you checked reachability.
- **Do not speculate about intent.** Describe what the code does.
- **Do not write exploit code** beyond the minimum needed to demonstrate the
  path is real.
- **Do not conflate style with security.** A missing `const` is not a finding.

## Finishing

State what you reviewed, what you deliberately did not, and your confidence.
An honest "I traced the auth paths but did not review the payment integration"
is far more useful than an implied all-clear.
