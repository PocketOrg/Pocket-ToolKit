---
name: model-selection
description: >-
  Chooses a model on cost, latency and capability rather than benchmark headlines. Use when picking a model, considering a switch, or justifying spend.
---
# Model Selection

## Start from the constraint that binds

Every task is limited by one of: quality, latency, cost, or privacy. Identify which, because it eliminates most of the field immediately.

A task with a 200ms budget cannot use the largest model regardless of its quality. A task on data that cannot leave your network cannot use a hosted API at all.

## Benchmark on your own task

Public benchmarks measure general capability on problems unlike yours. A model that leads a leaderboard can be worse at your specific extraction task.

Run your eval set. It is a day of work and routinely reverses the intuition.

## Route by difficulty rather than picking one model

Most workloads contain a majority of easy cases and a minority of hard ones. Sending everything to the largest model pays a premium on the easy majority.

A small model with an escalation path — confidence check, or a validator that triggers a retry on the larger model — often beats both single-model options on cost and quality together.

## Count the total cost, not the token price

Input tokens dominate in retrieval-heavy applications. A cheaper model that needs more examples, longer prompts or more retries can cost more per successful result.

Measure cost per accepted output, which is the number that matters.

## Plan for the model changing under you

Hosted models are updated, deprecated and retired. Pin a version where the provider allows it, keep the eval set runnable, and rerun it when you move.

Keep the model choice behind an interface so switching is a configuration change, not a rewrite.

## Watch out for

- Choosing on context-window size when retrieval quality is the actual limit.
- Ignoring rate limits and concurrency, which bind long before token cost does.
- Assuming a fine-tune is needed before trying better prompting and retrieval.
- Comparing a tuned prompt on one model to an untuned prompt on another.
- Overlooking data-retention terms when the constraint was privacy.

## Finishing

The binding constraint is named. Models were compared on your eval set. Cost is measured per accepted output. The choice sits behind an interface.

