---
name: frontend-performance
description: >-
  Makes web interfaces load and respond quickly. Use when a page feels slow, before a launch, or when performance metrics regress.
---
# Frontend Performance

## Measure on real conditions, not your machine

A developer's laptop on office wifi is the least representative environment available. Test on a mid-range phone on a throttled connection.

Field data from real users beats lab data for knowing whether you have a problem; lab data beats field data for diagnosing it. Use both.

## Know which metric maps to which complaint

Slow to appear is loading — largest contentful paint. Janky and unresponsive to taps is interactivity — long tasks blocking the main thread. Things jumping around is layout shift.

Optimising the wrong one is why performance work sometimes changes nothing users notice.

## JavaScript is the usual cause

Bytes of script cost far more than equivalent bytes of image: they must be downloaded, parsed, compiled and executed, largely on the main thread.

Audit the bundle before optimising anything else. A date library, a moment of duplicated dependencies, or an analytics script frequently dominates.

Split by route, defer what is not needed for first paint, and remove what nothing imports.

## Reserve space for anything that loads late

Images, ads and embeds inserted without dimensions shove content down as they arrive, causing mis-taps and frustration.

Set width and height, or an aspect ratio, on every element whose content arrives asynchronously.

## Cache deliberately at every layer

Immutable, content-hashed filenames with long cache lifetimes turn repeat visits into near-instant loads.

Serve a stale response while revalidating where correctness allows it. The fastest request is the one that never leaves the device.

## Watch out for

- Third-party scripts, which are usually the largest cost and the least controlled. Measure each one's real contribution.
- Web fonts blocking text rendering; use a fallback and swap.
- Rendering thousands of rows without virtualisation.
- Loading everything for a page most users never scroll to the bottom of.
- Chasing a lab score while field metrics stay flat.

## Finishing

Measured on a mid-range device and throttled network. The bundle has been audited. Late-loading content reserves space. Static assets are content-hashed and cached.

