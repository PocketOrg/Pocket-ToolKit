---
name: forecasting
description: >-
  Produces forecasts with honest uncertainty. Use when projecting revenue, demand or capacity, or when a forecast has been badly wrong.
---
# Forecasting

## A point estimate is not a forecast

A single number is wrong with probability one. Report a range with a stated confidence, and the assumptions that would move it.

Decision-makers need the range: planning for the p90 and the p50 are different decisions, and hiding the spread makes that choice for them badly.

## Start with a naive baseline

"Next month equals this month" or "equals the same month last year" is the bar any model must beat. Many sophisticated models do not.

Report your model's error against the naive baseline, not in isolation. An 8% error means nothing until you know the baseline was 7%.

## Decompose before modelling

Separate trend, seasonality and the remainder. Most series have a weekly and an annual cycle, and a model blind to them attributes cycles to trend and projects nonsense.

Know your calendar effects: holidays, month-end, billing cycles, marketing campaigns.

## Forecast the drivers when the outcome is composite

Revenue is volume times price times conversion. Forecasting each and combining is usually more accurate and always more explainable than forecasting the total.

It also tells you which assumption to challenge when the forecast is wrong.

## Backtest honestly

Evaluate on data the model never saw, respecting time order. Random cross-validation leaks the future into training and produces a flattering, useless score.

Roll the window forward as it would run in production and measure the error at the horizon you actually need.

## Watch out for

- Fitting the past too closely, which captures noise and forecasts it confidently.
- Extrapolating exponential growth, which ends in every real system.
- Ignoring a known upcoming change — a price rise, a launch — because the model cannot see it.
- Revising the forecast quietly until it matches the outcome.
- Confusing accuracy with usefulness: a slightly worse forecast that explains its drivers is often more valuable.

## Finishing

The forecast is a range with assumptions. It beats a naive baseline on a time-respecting backtest. Drivers are forecast separately where the outcome is composite.

