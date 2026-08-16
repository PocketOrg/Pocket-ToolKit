---
name: chaos-engineering
description: >-
  Tests resilience by injecting failure deliberately and safely. Use when validating redundancy, or when failover has never actually been exercised.
---
# Chaos Engineering

## Form a hypothesis first

This is an experiment, not vandalism. State what you believe will happen: "if one replica is killed, requests continue with no elevated error rate and recovery completes within 30 seconds."

Without a hypothesis you learn only that something broke, not whether the system behaved as designed.

## Establish steady state before touching anything

Define and measure normal: error rate, latency percentiles, throughput. You need the baseline to tell whether the experiment caused a deviation.

Abort criteria come from the same measurement — decide in advance what result stops the test immediately.

## Start small, and in the safest environment that is still meaningful

Begin in staging, then production with a tiny blast radius: one instance, one availability zone, a small share of traffic.

Staging-only chaos finds staging problems. The point is eventually to test production, but not on day one and never without a stop button.

## Inject the failures you actually face

Instance loss, network latency, dependency timeouts, DNS failure, disk full, clock skew, a slow rather than dead dependency.

Slow dependencies are the most valuable and most neglected: systems handle a hard failure far better than one that responds in nine seconds.

## Fix what you find before the next experiment

Running more experiments while findings are unaddressed produces a backlog and no resilience.

Each experiment should end with either a confirmed hypothesis or a specific fix, then rerun to verify.

## Watch out for

- Running without the on-call team knowing, which turns an experiment into an incident.
- No abort mechanism, or one that depends on the system being broken.
- Experiments during a change freeze or a peak business period.
- Testing only single failures when real incidents are correlated.
- Automating chaos before the basics — retries, timeouts, health checks — actually work.

## Finishing

Each experiment has a hypothesis, a measured steady state, a small blast radius, an abort criterion, and an owner for whatever it finds.

