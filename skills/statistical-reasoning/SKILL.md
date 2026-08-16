---
name: statistical-reasoning
description: >-
  Reads and reports statistics without overclaiming. Use when interpreting a result, reviewing an analysis, or writing up findings.
---
# Statistical Reasoning

## A p-value is not the probability you are right

It is the probability of seeing data this extreme if the null hypothesis were true. It says nothing about the size of the effect, its importance, or the chance the hypothesis is correct.

`p = 0.049` and `p = 0.051` are the same evidence. The threshold is a convention, not a boundary in nature.

## Report the interval, always

A confidence interval carries everything a p-value does and adds the magnitude and the precision. "3.2% lift, 95% CI [0.1%, 6.3%]" is honest; "significant" is not.

A wide interval that excludes zero is a weak result presented as a strong one when only significance is reported.

## Correct for multiplicity, or say you did not

Twenty comparisons at the 5% level produce one false positive on average. Testing many outcomes and reporting the significant one is not a finding.

Pre-register the primary outcome, or apply a correction, or label the analysis exploratory. All three are acceptable; silence is not.

## Absolute risk, not just relative

"Doubles the risk" is meaningless without the baseline. A rise from 1 in 100,000 to 2 in 100,000 is a doubling and almost never actionable.

Report both. Relative effects alone are the most common way statistics mislead honestly.

## Correlation, confounding and selection

Before concluding causation, ask what else differs between the groups, and how people entered the sample.

Selection effects produce strong, stable, entirely spurious relationships. Survivor bias in particular looks exactly like a real finding.

## Watch out for

- Means on skewed distributions; report medians and a spread.
- Dichotomising a continuous variable, which discards information and inflates apparent effects.
- Comparing significance between groups instead of testing the interaction directly.
- Regression to the mean read as improvement, especially after selecting on an extreme.
- Precision implied by decimal places the sample size cannot support.

## Finishing

Effects are reported with intervals and absolute magnitudes. Multiplicity is handled or disclosed. Causal language is used only where the design supports it.

