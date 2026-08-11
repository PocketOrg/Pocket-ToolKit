---
name: code-review
description: >-
  Systematic code review covering correctness, security, performance and
  maintainability, with severity levels and structured feedback. Use when
  reviewing a pull request, a diff, or a change someone has asked you to check.
---

# Code Review

Review in passes. A single read-through mixing typos with security holes buries
the findings that matter, so make one pass per concern and report them together
at the end, ordered by severity.

## What to check, in order

**1. Correctness — does it do what it claims?**

- Off-by-one and boundary conditions: empty collection, single item, maximum.
- `null`/`undefined` reaching code that assumes a value.
- Error paths. An unhandled rejection or a swallowed exception is a real defect,
  not a style issue.
- Concurrency: shared mutable state, missing `await`, races between a check and
  the action that depends on it.

**2. Security — what can an attacker reach?**

- Untrusted input flowing into a query, a shell command, a file path, or HTML.
- Authorisation checked on every path, not just the one the author tested.
- Secrets in code, logs or error messages.
- Dependencies added in this change: is the package what it claims to be?

**3. Performance — does it get worse with scale?**

- Queries inside loops (N+1), where one batched call would do.
- Unbounded reads: no pagination, no limit, whole-table scans.
- Work repeated per request that could be computed once.

**4. Maintainability — can the next person change this?**

- Names that describe intent rather than mechanism.
- Comments explaining *why*, where the reasoning is not evident from the code.
- Duplication that will drift out of sync.

**5. Tests — would this change have been caught?**

- A test that fails before the fix and passes after it.
- Edge cases, not just the happy path.
- Tests asserting behaviour rather than implementation details.

## Severity

Assign one to every finding. Reviews without severity read as a flat wall of
equally-weighted complaints, and the author cannot tell what blocks merge.

| Level | Meaning |
| --- | --- |
| **Critical** | Data loss, security hole, or breaks production. Must fix. |
| **Major** | Wrong behaviour in a reachable case. Should fix before merge. |
| **Minor** | Works, but will cause friction later. Fix or file it. |
| **Nit** | Style or preference. Explicitly optional. |

## How to phrase it

State the problem, the consequence, and a suggested direction — not just the
problem. "This is wrong" gives the author nothing to act on.

> **Major** — `getUser` returns `undefined` when the id is missing, but
> `renderProfile` accesses `.name` directly, so a deleted user crashes the page.
> Either return a default or handle the null at the call site.

Distinguish what you know from what you suspect. If you are unsure whether
something is a bug, say so and ask — a confident-sounding wrong review costs the
author more time than a hedged correct one.

## Anti-patterns

- **Rewriting the author's approach** when theirs works. Review the change that
  was made, not the change you would have made.
- **Only nits.** If every comment is cosmetic, say plainly that the logic looks
  right — otherwise the author cannot tell whether you checked.
- **Vague approval.** "LGTM" on a 600-line diff tells nobody anything.
- **Reviewing the whole file.** Comment on the diff; pre-existing problems go in
  a separate issue.

## Finishing

Close with a verdict: approve, approve with comments, or request changes. Say
what you did *not* review — an untested area you skipped is information the
author needs.
