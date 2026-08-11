---
name: monitoring-and-alerting
description: >-
  Defines alerts that fire on real user impact and stay quiet otherwise. Use when setting up alerts, tuning noisy pages, or deciding what to monitor for a new service.
---

# Monitoring And Alerting

## Alert on symptoms, not causes

Page on what users experience: error rate, latency, failed checkouts. High CPU is only worth an alert if it causes one of those.

Every page must be actionable. If the responder's only option is to wait, it should be a dashboard, not a page.

Set thresholds from your objective, not from a round number that looked reasonable.

## Reduce noise deliberately

Require a duration — a threshold crossed for five minutes, not a single spike.

Alert on rate of change for slow-burning problems like disk fill, so you are warned with time to act.

Group related alerts. One incident should page once, not thirty times.

Delete alerts nobody acts on. An ignored alert trains people to ignore all of them, including the real one.

## What every service needs

Availability from outside — an external check, since a service cannot report that it is unreachable.

Error rate and latency percentiles per endpoint.

Saturation for every pool and queue: connections, workers, disk, memory.

Freshness for anything asynchronous — a queue that silently stops is invisible to error-rate alerting.

## Watch out for

- Alerting on every metric available, which produces fatigue and guarantees a missed real incident.
- Thresholds on averages, so a bad p99 never fires.
- No alert on the absence of events — a stopped cron job looks exactly like success.
- Pages with no runbook, so the responder starts from nothing at 3am.

## Finishing

Every alert maps to user impact, has a duration condition, and links a runbook. Anything not acted on has been deleted.
