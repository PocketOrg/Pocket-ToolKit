---
name: capacity-planning
description: >-
  Plans headroom so growth does not become an outage. Use when preparing for a scaling event, when utilisation is climbing, or when planning next year's infrastructure.
---
# Capacity Planning

## Find the binding constraint

Systems rarely run out of everything at once. One resource saturates first — database connections, memory, IOPS, a third-party rate limit, a licence count.

Load test to find which, because it is almost never the one people assume, and planning around CPU when connections bind wastes the budget.

## Plan against peak, with a shape

Averages hide the moment that breaks you. Know the daily and weekly peak, and the multiplier of your largest known event over a normal day.

Provision for peak plus headroom for the failure of one unit of redundancy, since capacity planning and resilience planning share the same arithmetic.

## Headroom is a decision with a number

Pick a utilisation target and defend it — typically 50-70% of the saturation point for the binding resource, depending on how quickly you can add capacity.

Running at 90% is efficient right up until a modest spike, and leaves no room for the slow degradation nobody noticed.

## Know your time to add capacity

Autoscaling that takes eight minutes cannot absorb a two-minute spike. Measure the real time from trigger to serving traffic, including image pull and warm-up.

Where that time is long, you are pre-provisioning, not scaling, and should plan accordingly.

## Watch the trend, not the instant

Track utilisation against growth over months and project when it meets your target. That date is when the work must be finished, not started.

Set alerts on the trend crossing a threshold, not only on the resource being nearly exhausted.

## Watch out for

- Scaling one tier and moving the bottleneck to the next, unmeasured.
- Cold caches after a scale-up, which briefly increase load on the database.
- Connection pools sized per instance, so scaling out exhausts the database.
- Quotas and limits at the provider that bind before your own capacity does.
- Assuming linear scaling across a shared resource that does not scale linearly.

## Finishing

The binding resource is identified by measurement. Provisioning targets peak plus redundancy loss. Time-to-capacity is known. Trend alerts precede exhaustion.

