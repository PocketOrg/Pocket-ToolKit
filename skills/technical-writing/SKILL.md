---
name: technical-writing
description: >-
  Writes and edits documentation, READMEs, changelogs and release notes so a
  reader can act on them. Use when writing or reviewing docs, a README, an API
  reference, or any explanation intended for other engineers.
---

# Technical Writing

Documentation exists to get someone unblocked. Every choice below follows from
that: lead with what the reader needs to do, and cut anything that does not help
them do it.

## Structure

Open with the thing the reader came for, not with context they can infer.

- **Bad** — "This library was created to address the growing need for…"
- **Good** — "Parse and validate webhooks in one call. `npm i webhookd`."

Then, in order: what it does, the smallest working example, the common cases, the
reference. A reader scanning for a method signature should not have to read your
motivation section.

## Sentences

- **Present tense, active voice.** "The server rejects the request", not "the
  request will be rejected by the server."
- **Second person for instructions.** "Set `retries` to 3." Not "one should set".
- **One idea per sentence.** If it needs a semicolon to hold together, it is
  probably two sentences.
- **Cut hedges.** "Simply", "just", "basically", "obviously" — these add nothing
  and make a stuck reader feel stupid.

## Examples

An example that cannot be run is decoration.

- Show real values, not `foo` and `bar`.
- Include the imports. A snippet that fails on paste wastes the reader's time.
- Show the output, or what success looks like.
- If a step can fail, show the error and what to do about it.

## What to document that people skip

- **Failure modes.** What happens on timeout, on bad input, on a missing
  permission — with the actual error text so it is searchable.
- **Defaults.** Every optional parameter's default value, stated explicitly.
- **Limits.** Rate limits, maximum sizes, pagination behaviour.
- **Migration.** When behaviour changes, what breaks and how to update.

## READMEs

In this order:

1. One sentence on what it is.
2. Install.
3. A working example, under fifteen lines.
4. Links to deeper docs.
5. Licence.

Badges and a logo are optional. A working example is not.

## Changelogs and release notes

Write for someone deciding whether to upgrade.

- Group by **Added / Changed / Fixed / Removed**.
- Lead each entry with the user-visible effect, not the commit subject.
- Mark breaking changes explicitly and say what to do.
- Link the issue or PR.

> **Bad** — "Refactored the auth middleware"
> **Good** — "Fixed sessions expiring early when the server clock drifted (#412)"

## Editing someone else's writing

Change what is wrong or unclear. Do not rewrite correct prose into your own
voice — it costs the author trust and gains the reader nothing. When you cut
something substantial, say why.

## Finishing

Read it as someone who does not already know the answer. If any step assumes
knowledge you have not provided or linked, that is the gap to fix.
