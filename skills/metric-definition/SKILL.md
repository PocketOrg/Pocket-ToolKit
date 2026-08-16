---
name: metric-definition
description: >-
  Defines metrics precisely enough that two teams compute the same number. Use when a metric is disputed, when building a dashboard, or when 'active users' means three different things.
---
# Metric Definition

## A metric is a definition, not a name

"Active users" is not a metric. "Distinct users with at least one session of 30 seconds or longer, in the trailing 7 days, in UTC, excluding internal accounts" is.

Every ambiguity you leave gets resolved differently by each person who queries it, and the meeting becomes about whose number is right.

## Write the four parts

**Population** — who counts. Excluded: internal, test, bot, churned?

**Event** — what they must do, and how it is detected.

**Window** — over what period, in which timezone, aligned to what boundary.

**Aggregation** — count, distinct count, sum, rate. If a rate, state both numerator and denominator.

Miss one and the metric is underspecified.

## Choose denominators carefully

A conversion rate over "all visitors" and over "visitors who reached checkout" tell different stories, and both are honest. The wrong one is the one you did not name.

When a rate moves, always check whether the numerator or denominator caused it. A rising conversion rate from collapsing traffic is not good news.

## Decide how late data is handled

Events arrive late. Does the number for last Tuesday change when you rerun it on Friday?

Either freeze the window after a stated lag, or make it explicit that recent days are provisional. Silent restatement destroys trust faster than a slow number.

## One definition, one place

The definition belongs in a metrics layer or a documented view that every dashboard reads. Copies in six dashboards diverge within a quarter.

If two teams genuinely need different definitions, give them different names. `active_users_product` and `active_users_billing` argue less than two things both called "active users".

## Watch out for

- Averages over skewed data. Report a median and a percentile too, or the mean will mislead.
- Metrics that only ever go up — cumulative counts hide whether things are getting better.
- Ratios of ratios, which are almost never what someone wants.
- Timezone drift between the event timestamp and the reporting window, which shifts daily numbers by hours.

## Finishing

The definition names population, event, window and aggregation. It lives in one place. Two people querying independently get the same number.

