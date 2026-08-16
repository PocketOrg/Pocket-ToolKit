---
name: cost-optimisation
description: >-
  Reduces cloud spend without degrading the service. Use when a bill grows unexpectedly, before scaling up, or when planning capacity.
---
# Cost Optimisation

## Attribute before you optimise

You cannot reduce what you cannot attribute. Tag every resource by team, environment and service, and enforce it at creation.

Most organisations discover that a small number of resources dominate the bill, and several of them belong to nobody.

## Look for the three usual dominators

**Idle capacity** — non-production environments running overnight and at weekends, instances provisioned for a peak that passed.

**Data transfer** — cross-zone and egress charges, which are invisible in instance pricing and frequently exceed compute.

**Storage that only grows** — snapshots, logs and old backups with no lifecycle policy.

Check these before optimising application code.

## Right-size on observed usage

Instances are typically provisioned from an estimate made once and never revisited. Compare actual CPU and memory percentiles against what is allocated.

Right-size gradually and watch latency, since some headroom absorbs spikes that averages hide.

## Commit only to a proven baseline

Reserved capacity and savings plans are large discounts on a commitment you cannot easily exit. Commit to the floor of your usage, not the average, and buy incrementally.

Over-committing converts a variable cost into a fixed one at the moment you most want flexibility.

## Make cost visible to the people who cause it

A monthly bill reviewed by finance changes nothing. A per-team dashboard, and an alert when a service's spend jumps, moves decisions to where they are made.

Set anomaly alerts on rate of change — a forgotten test cluster is caught in a day rather than a month.

## Watch out for

- Optimising a bill that is a rounding error while ignoring the largest line.
- Cutting redundancy for savings, then paying for it in an outage.
- Log retention set to "forever" by default.
- Autoscaling with no upper bound, which turns a traffic spike or a loop into a very large invoice.
- Chasing savings that cost more engineering time than they return.

## Finishing

Resources are tagged and attributable. Idle, transfer and storage have been checked first. Commitments cover the baseline only. Anomaly alerts are live.

