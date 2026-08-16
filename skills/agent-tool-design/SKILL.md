---
name: agent-tool-design
description: >-
  Designs tools that language models can call correctly. Use when adding tools to an agent, or when a model keeps calling them wrongly.
---
# Agent Tool Design

## The description is the interface

The model chooses a tool by reading its description and nothing else. It has no source, no docs and no colleague to ask.

Write what it does, when to use it, and when not to. "Searches invoices. Use for billing questions. Does not cover refunds — use search_refunds." prevents the most common misroute.

## Few tools, clearly distinct

A model given thirty tools with overlapping purposes picks badly. Consolidate near-duplicates and make the remaining boundaries obvious.

If two tools need a paragraph to distinguish, they should probably be one tool with a parameter.

## Make the parameters hard to get wrong

Prefer enums to free strings. Give every parameter a description with an example of the format. Mark required fields honestly.

Accept the shapes a model will naturally produce — a date as a plain string as well as ISO — rather than rejecting and forcing a retry.

## Return what the model needs to decide next

An opaque success flag leaves the model guessing. Return the resulting state, or the specific reason for failure, in a form it can act on.

Truncate large results, and say that you truncated them, so the model knows more exists rather than concluding it has everything.

## Make errors instructive

"Error 400" produces a blind retry. "start_date must be before end_date; you sent start 2026-03-01, end 2026-02-01" produces a correct second call.

Every error is a prompt for the next attempt. Write it that way.

## Watch out for

- Tools with side effects that are not obvious from the name — anything destructive should say so and require confirmation.
- Overlapping tools where the model must infer a convention you never stated.
- Returning raw API payloads with dozens of irrelevant fields, which fills context and buries the answer.
- Silent truncation, which makes the model confidently wrong.
- Untrusted content returned from a tool being treated as instruction; separate data from directives.

## Finishing

Each description states when to use and when not to. Parameters are constrained and exemplified. Errors explain the fix. Results are shaped for the next decision.

