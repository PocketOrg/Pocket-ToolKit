---
name: fine-tuning
description: >-
  Decides whether to fine-tune and does it without wasting a month. Use when prompting has plateaued, or when evaluating a fine-tuning proposal.
---
# Fine-Tuning

## Exhaust the cheaper options first

Better prompting, few-shot examples and retrieval solve most problems people reach for fine-tuning to fix, at a fraction of the cost and with no retraining when the base model improves.

Fine-tuning is the right tool for consistent format, a specific style, or a narrow classification task — not for teaching facts, which retrieval does better and keeps current.

## Data quality dominates data quantity

A few hundred carefully correct examples beat tens of thousands of scraped ones. The model learns your errors faithfully, including the inconsistencies between annotators.

Have two people label a sample independently and measure agreement. If they disagree often, the task definition is the problem, not the model.

## Hold out a test set before you start

Split before any training, and never look at the test set while iterating. Tuning against it produces a number that does not survive contact with production.

Keep a validation set for iteration, separate from the final test set.

## Compare against a real baseline

The comparison is not fine-tuned versus nothing. It is fine-tuned versus your best prompt on the same model, and against a larger model prompted well.

Frequently the larger model with a good prompt wins on quality and loses only on cost — which is a decision, not a failure.

## Plan for the retraining treadmill

A fine-tune is pinned to a base model that will be deprecated. Budget for redoing it, and keep the training data and pipeline reproducible so that is a day's work rather than a project.

## Watch out for

- Catastrophic forgetting: the model gets better at your task and worse at everything adjacent. Test general capability too.
- Training data leaking the test set, which inflates every number.
- Overfitting to a narrow slice, so it fails on inputs slightly outside the training distribution.
- Sensitive data in training examples, which the model may reproduce.
- Measuring loss instead of task performance; loss going down is not the goal.

## Finishing

Prompting and retrieval were tried first. Labels are consistent and measured. A held-out test set was untouched during iteration. The comparison is against the best prompted baseline.

