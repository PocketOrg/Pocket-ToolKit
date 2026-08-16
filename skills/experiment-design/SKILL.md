---
name: experiment-design
description: >-
  Designs A/B tests that produce a decision rather than an argument. Use when planning an experiment, sizing a sample, or interpreting a result that looks too good.
---
# Experiment Design

## Decide what would change your mind, first

Write the decision before the test: "if conversion lifts by 2% or more, we ship; below that, we do not." An experiment without a pre-committed threshold becomes a search for a favourable slice.

State the primary metric — one — and the guardrail metrics that must not degrade. Everything else is exploratory and cannot justify shipping on its own.

## Size the sample before starting

Effect size, baseline rate, power and significance determine sample size. Fix three and the fourth follows; there is no way around the arithmetic.

If the required sample exceeds your traffic in a reasonable window, the test cannot answer the question. Test something with a larger expected effect, or accept a slower cadence, but do not run it underpowered and interpret the result anyway.

Small effects need enormous samples. A 1% relative lift on a 3% baseline is a months-long test for most products.

## Do not peek

Checking significance repeatedly and stopping at the first `p < 0.05` inflates the false positive rate dramatically — well past one in three with frequent looks.

Either fix the duration in advance and look once, or use a method built for continuous monitoring (sequential testing, Bayesian with a decision rule). Do not mix the two.

## Randomise the right unit

Randomise by the unit that experiences the change. User-level for anything they notice across sessions; session-level only when the change genuinely cannot leak between sessions.

Watch for interference: marketplace and social features let the treatment group affect the control group, and the measured difference understates or invents an effect.

## Read the result honestly

A non-significant result is not "no effect". It means the test could not detect one at this sample size. Report the confidence interval, which shows what effects remain plausible.

Significance is not size. A statistically significant 0.1% lift may not be worth the complexity it adds.

Check the randomisation actually worked: sample ratio mismatch — arms not splitting as configured — invalidates the test regardless of how good the result looks.

## Watch out for

- Segmenting after the fact until something is significant. With twenty segments, one will be.
- Novelty effects, where any change lifts metrics briefly. Run long enough to see it decay.
- Ignoring the guardrails because the primary metric won.
- Comparing this week's treatment to last week's baseline. That is not a controlled experiment.

## Finishing

The decision rule was written before the data. The sample was sized in advance. The result reports an interval, not just a verdict.

