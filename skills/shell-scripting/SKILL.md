---
name: shell-scripting
description: >-
  Writes shell scripts that fail loudly instead of silently corrupting things. Use when automating a task, hardening an existing script, or reviewing one that runs in CI.
---
# Shell Scripting

## Start every script with the safety line

`set -euo pipefail` turns three classes of silent failure into loud ones: a failing command that continues, an unset variable expanding to nothing, and a failing command in the middle of a pipe.

Without `pipefail`, `generate | process` reports success when `generate` failed. That is how empty files get deployed.

Be aware that `-e` has genuine exceptions — commands in conditions, and anything followed by `||` — so check exit codes explicitly where it matters.

## Quote every expansion

`$file` unquoted splits on spaces and expands globs. `"$file"` does not. This is the single most common shell bug and the easiest to prevent.

Use `"$@"` rather than `$*` to pass arguments through with their boundaries intact.

## Fail before you act

Check that required commands exist, required variables are set, and required paths are present — at the top, before anything is modified.

A script that fails halfway through leaves the system in a state neither the script nor the operator understands.

## Clean up with a trap

Temporary files and directories should be removed by `trap ... EXIT` so they disappear whether the script succeeds, fails or is interrupted.

Create temporary files with `mktemp`, never a fixed path in `/tmp` — a predictable name is both a race and a security problem.

## Know when to stop using shell

Shell is excellent for orchestrating commands. Once you need arrays of structured data, arithmetic, or error handling with more than two branches, it is the wrong language.

A hundred-line shell script that manipulates JSON is a Python script waiting to be rewritten.

## Watch out for

- Parsing `ls`, which breaks on any unusual filename. Use globs or `find -print0`.
- `cd` without checking it succeeded, so the next command runs in the wrong directory.
- Assuming GNU flags on a machine with BSD utilities.
- Recursive deletes built from a variable that may be empty, which resolve to the filesystem root. Validate the path is non-empty and expected before deleting anything.
- Secrets passed as arguments, visible in the process list to every user.

## Finishing

The script sets strict mode, quotes expansions, validates preconditions, and cleans up on exit. It fails before it modifies anything.

