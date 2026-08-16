---
name: mobile-app-release
description: >-
  Ships mobile releases given review delays and users who never update. Use when planning a mobile release, or after a bad build reached users.
---
# Mobile App Release

## You cannot recall a release

Once a build is downloaded it is on the device until the user updates. There is no equivalent of rolling back a server deploy.

This single fact should shape everything: staged rollout, feature flags, and a server-side kill switch for anything risky.

## Roll out in stages and watch

Release to a small percentage first and hold. Watch crash-free rate, not just crash count, and compare against the previous version rather than an absolute threshold.

Give each stage enough time to cover a full daily cycle. Problems that only appear on the morning commute are invisible in an afternoon.

## Put risky behaviour behind a server-controlled flag

A flag you can turn off without a release converts a fatal bug into a bad afternoon. Without it, the fix requires a build, a review and a user update — days, at best.

## Support the versions your users are actually on

A meaningful share of users update slowly or never. Your API must keep working for builds shipped a year ago, or you break people who did nothing wrong.

Track the version distribution and decide deliberately when to force an upgrade — with a clear in-app message, not a silent failure.

## Test on real devices, especially old ones

Simulators miss memory pressure, thermal throttling, poor networks and manufacturer variations. The cheapest popular device in your market is the one that finds the most bugs.

Test on a slow, lossy connection. Most mobile bugs are network bugs.

## Watch out for

- Store review timing before a holiday or a launch date.
- Silent failures when a permission is denied, which the simulator grants automatically.
- Migrations of local data on update, which run once on a device you cannot inspect.
- Deep links and push handling untested from a cold start.
- Analytics that only report from users who successfully launched the app.

## Finishing

Rollout is staged and monitored on crash-free rate. Risky behaviour has a server-side switch. Old app versions remain supported. Testing covered real, slow devices.

