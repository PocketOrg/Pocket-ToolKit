---
name: penetration-testing
description: >-
  Runs and commissions authorised security testing that produces fixes. Use when scoping a pentest, preparing for one, or triaging its report.
---
# Penetration Testing

## Authorisation in writing, always

Scope, targets, time window, permitted techniques, and a named contact — signed, before anything starts. Testing without written authorisation is not a grey area.

Explicitly list what is out of scope: third-party services, production data, denial of service, social engineering. Testing a SaaS provider you merely use requires their permission, not yours.

## Scope by threat model, not by asset list

"Test everything" produces shallow coverage. Decide which attacker you care about — unauthenticated internet, authenticated low-privilege user, compromised employee — and test that path deeply.

Authenticated testing finds far more than unauthenticated scanning, and most real breaches involve credentials.

## Fix the class, not the finding

A report entry is one instance. The same missing authorisation check almost certainly exists on other endpoints written by the same team.

For every finding, ask where else this pattern occurs and fix them together.

## Triage by exploitability, not by scanner severity

A critical-rated finding on an unreachable internal service matters less than a medium on the login page. Rank by what an attacker could actually reach and chain.

Chained low-severity findings are how real compromises happen, so read the report for combinations, not just the top entries.

## Retest and record

A fix is not complete until it has been retested by whoever found it. Track findings to closure with dates.

Keep the report — the next test's value is partly in whether the same classes return.

## Watch out for

- Testing staging that differs from production in the exact controls being tested.
- Scanners reporting version-based vulnerabilities that a backported patch has already fixed.
- Findings closed as "won't fix" without a recorded risk acceptance and an owner.
- Credentials and tooling left behind on tested systems.
- Treating the report as a compliance artefact rather than a work list.

## Finishing

Written authorisation covers the scope. Findings are fixed by class. Priority reflects reachability. Every fix is retested and dated.

