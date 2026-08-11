---
name: git-workflow
description: >-
  Produces reviewable commits and clean history. Use when committing work, preparing a branch for review, or resolving a rebase or merge conflict.
---

# Git Workflow

## Commits

One logical change per commit. If the subject line needs an "and", split it.

Subject in the imperative, under ~60 characters: `Fix session expiry when the clock drifts`.

Use the body to explain *why*. The diff already shows what.

Never commit generated files, secrets, or unrelated formatting churn.

## Branches and rebasing

Rebase your own unpushed work to tidy it; never rebase a branch others have based work on.

`git rebase -i` to squash fixup commits before review — reviewers should not read your false starts.

Resolve conflicts by understanding both sides, not by taking whichever compiles.

## Recovering

`git reflog` finds almost anything you think you lost, including after a hard reset.

`git revert` for published history; `git reset` only for local work.

Before any destructive operation, note the current SHA — it makes the mistake reversible.

## Watch out for

- Force-pushing a shared branch, which rewrites history others depend on.
- One giant commit at the end of a week, which cannot be reviewed or bisected.
- Commit messages like "fix", "wip" or "changes" in permanent history.
- Committing a merge conflict marker — grep for `<<<<<<<` before pushing.

## Finishing

Each commit is self-contained and explains itself, the branch rebases cleanly, and history reads as a sequence of decisions.
