---
name: self-improving-agent
description: >-
  Captures corrections, failures and knowledge gaps so the same mistake is not
  repeated. Use when the user corrects you, when a tool or command fails
  unexpectedly, when you discover your knowledge was outdated, or when you find
  a better approach to a recurring task. Also review captured learnings before
  starting significant work.
---

# Self-Improving Agent

The value here is not the logging — it is the reading. A learnings file nobody
consults is a diary. Before any substantial task, check what has already been
recorded about it; after any correction, record what changed and why.

## When to capture

| Situation | Category |
| --- | --- |
| The user corrects you | `correction` |
| A tool, command or API fails unexpectedly | `failure` |
| Your knowledge turned out to be outdated or wrong | `knowledge-gap` |
| You found a better approach to something recurring | `best-practice` |
| The user asked for something that does not exist | `feature-request` |

Do **not** capture routine work. A log of everything is a log of nothing — if an
entry would not change how you act next time, leave it out.

## What an entry contains

Five fields. Anything less is not actionable later.

```markdown
## 2026-08-11 — correction — Group descriptions are not optional

**What happened**
I created a group with an empty description, assuming it was optional.

**What was wrong**
The API accepts it, but the sidebar falls back to the member summary, so the
group reads as unlabelled to the user.

**What to do instead**
Always set a description when creating a group, even a short one.

**Recurrence** 2
**Pattern-Key** group-create-description
```

The **Pattern-Key** is what makes this useful at scale: a stable slug for the
underlying issue. Before adding an entry, look for an existing one with the same
key — if it exists, increment its recurrence count rather than adding a
near-duplicate. Three occurrences of one pattern is a signal; three separate
entries saying the same thing is noise.

## Reading before acting

Before significant work, scan for entries whose Pattern-Key relates to what you
are about to do. Specifically:

- Anything with a recurrence of 2 or more — these are your known weak points.
- Anything in `correction` touching the same area.
- Anything in `knowledge-gap` about the library, API or tool you are about to use.

State briefly what you found and how it changes your approach. If nothing is
relevant, say so and continue — silence is ambiguous.

## What never goes in a learning

- **Secrets.** API keys, tokens, passwords, private keys, environment variables.
  Redact them, or describe the shape without the value.
- **Full file contents or transcripts.** Summarise. A learning is a conclusion,
  not an archive.
- **User personal data.** Record the lesson, not the person's information.
- **Speculation about the user.** Record what happened, not why you think they
  reacted that way.

If a failure cannot be described without including a secret, describe the
failure mode and omit the specifics.

## Writing the correction well

The most common failure is recording the symptom instead of the cause.

> **Weak** — "The build failed."
>
> **Useful** — "The build failed because the test script assumes a `.env` file
> that is gitignored. New checkouts fail until it is created. Document it in the
> README or provide a `.env.example`."

The second one prevents a recurrence. The first is a note that something once
went wrong.

## When the user corrects you

1. Acknowledge the correction plainly and briefly. Do not over-apologise.
2. Fix the immediate thing.
3. Record it — but only if it generalises. A one-off typo does not.
4. Do not repeat the correction back at length; it wastes the user's time.

## Watch out for

- **Logging instead of thinking.** Capturing a learning is not a substitute for
  fixing the problem now.
- **Growth without pruning.** Merge duplicates and delete entries that no longer
  apply. A file that only ever grows stops being read.
- **Recording your own reasoning as fact.** If you inferred something rather than
  verified it, mark it as an inference.
- **Treating a learnings file as authority.** It records what happened before,
  not what is true now. Verify before relying on an old entry.

## A note on storage

Where these entries live depends on your workspace — a `LEARNINGS.md` in the
repository, a group thread, or a document you maintain. Whatever the location,
keep it in one place, keep it in this format, and read it before you write to it.
