---
name: runbooks
description: >-
  Writes operational procedures someone can follow at 3am. Use when documenting a recurring task, after an incident, or when only one person knows how something works.
---
# Runbooks

## Write for a tired stranger

The reader is someone who has been woken up, does not have your context, and cannot ask you. Every assumption you leave implicit becomes a stall.

Test this by handing it to someone who has never done the task. Where they hesitate is where the runbook is wrong.

## Start with how to tell if you are in the right place

Open with the symptom and a check that confirms it. Half of incident time is spent establishing which problem you actually have.

"If the queue depth alert fired but consumers are healthy, you are in the wrong runbook — see X" saves more time than any later step.

## Numbered steps, one action each

A step containing two actions gets half-completed under pressure. Split them.

Give the exact command, not a description of it. `kubectl rollout restart deploy/api -n prod` is followable; "restart the API deployment" invites a guess about namespace and syntax.

## State what success looks like after each risky step

Without a verification, the operator does not know whether to continue or roll back. "Wait for all pods Ready — expect three within 60 seconds" turns a hopeful pause into a check.

## Say what to do when it does not work

The fallback path is the part that gets used at the worst moment. Name the rollback command, the escalation contact, and the point at which to stop trying and wake someone.

Give the boundary explicitly: "if this has not resolved within 15 minutes, escalate rather than continuing to retry."

## Watch out for

- Runbooks that were correct when written and never revisited after the system changed.
- Commands with placeholders nobody can resolve at 3am — say where to find the value.
- Steps that require access the on-call person may not have, discovered mid-incident.
- Prose paragraphs where a checklist belongs.
- Linking to a dashboard without saying what reading is normal.

## Finishing

Someone unfamiliar completed the task using only the runbook. Every risky step has a verification. The escalation point is explicit.

