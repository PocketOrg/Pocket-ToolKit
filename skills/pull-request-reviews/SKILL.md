---
name: pull-request-reviews
description: >-
  Reviews changes in a way that catches problems without stalling delivery. Use when reviewing a PR, or when reviews in a team are slow, harsh or rubber-stamped.
---
# Pull Request Reviews

## Review in priority order

Correctness first: does it do what it claims, and what happens when the inputs are hostile. Then security and data safety. Then design. Style last, and preferably by a formatter rather than a person.

Reviews that open with naming comments and never reach the concurrency bug are the common failure.

## Say what kind of comment each one is

Prefix them: **blocking**, **suggestion**, **question**, **nit**. Without labels, every comment reads as a change request and the author cannot tell what actually stops the merge.

A review of fifteen nits and one blocker looks like a rejection. Labelled, it takes five minutes.

## Ask rather than assert when unsure

"What happens if this list is empty?" is better than "this breaks on empty lists" when you have not checked. It surfaces the issue without being wrong in public.

Often the answer is that a guard exists elsewhere — and that exchange is worth having.

## Pull the branch for anything non-trivial

Reading a diff shows what changed, not what the code now does. For a change of any size, run it and read the surrounding code the diff does not show.

Most subtle bugs live in the interaction between changed and unchanged code, which a diff hides by construction.

## Approve when it is better, not when it is perfect

If the change improves the codebase and nothing blocking remains, approve it with the non-blocking comments attached. Holding a PR for preferences is how review becomes a bottleneck and gets bypassed.

## Watch out for

- Enormous PRs, which get approved unread. Ask for a split rather than pretending to review it.
- Reviewing only the diff of a rebase, missing what came with it.
- Comment threads that become design debates; move those to a call and record the outcome.
- Approving because the author is senior, or blocking because they are not.
- Letting a review sit for days, which is the most expensive review outcome of all.

## Finishing

Correctness was checked before style. Comments are labelled by severity. Anything non-trivial was run, not just read.

