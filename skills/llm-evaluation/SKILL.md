---
name: llm-evaluation
description: >-
  Measures whether a model change actually helped. Use when shipping a prompt or model change, or when quality debates rely on anecdotes.
---
# LLM Evaluation

## Build the eval set before tuning

A fixed set of inputs with known-good expectations turns "this feels better" into a number. Fifty well-chosen cases beat a thousand random ones.

Include the failures you have actually seen in production. An eval set of easy cases certifies nothing.

## Choose the metric the task allows

Exact match for classification and extraction. Structural validity for anything that must parse. Human or model judgement for open generation.

Do not use a similarity score where correctness is binary — a wrong answer phrased like the right one scores well and is still wrong.

## Model-as-judge, used carefully

An LLM judge is fast and reasonable for pairwise comparison. It is also biased toward longer responses, toward its own style, and toward the first option presented.

Randomise the order, give the judge a rubric rather than "which is better", and calibrate it against human labels periodically. An uncalibrated judge measures its own preferences.

## Test the same input repeatedly

Above temperature zero the same prompt gives different answers. A single run cannot distinguish an improvement from variance.

Run each case several times and report the pass rate, not one sample.

## Guard against regression, not just progress

Keep a set of cases that currently pass and must continue to. Prompt changes that improve one behaviour routinely break another, and without a regression set nobody notices until a user does.

## Watch out for

- Tuning on the eval set until it passes, which measures memorisation of the set.
- Evals that only cover the happy path, missing refusals, empty inputs and adversarial content.
- Comparing across model versions without rerunning the baseline.
- Averaging away a catastrophic failure mode in an otherwise good score.
- Treating a benchmark number as evidence about your specific task.

## Finishing

The eval set contains real failures. Cases run multiple times. A regression set guards existing behaviour. Any judge is calibrated.

