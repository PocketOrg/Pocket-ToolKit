---
name: privacy-by-design
description: >-
  Builds systems that collect and expose less by default. Use when designing a feature that handles personal data, or reviewing one before launch.
---
# Privacy by Design

## Decide the lawful basis before the schema

Why you are allowed to hold each piece of data determines what you may do with it, how long you may keep it, and what rights the person has.

Consent is the weakest basis — it can be withdrawn, and it must be specific and freely given. A checkbox required to use the product is not freely given.

## Collect less

Every field is a liability that must be secured, retained, disclosed on request and deleted on demand. If a field has no current use, not collecting it is strictly cheaper.

Prefer derived answers to raw data: store whether someone is over 18, not their date of birth, when the age is all you need.

## Set retention at design time

Data without a deletion date is kept forever. Decide the period per data class when you design the store, and implement the deletion, not just the policy.

Include backups, logs, analytics and any downstream copies in the deletion path — that is where forgotten personal data survives.

## Default to the private setting

Defaults are what almost everyone lives with. A visibility setting defaulting to public means most users are public without deciding to be.

Make the privacy-preserving option the one that requires no action.

## Build the rights paths early

Access, correction, export and deletion are functional requirements, not legal paperwork. Retrofitting them into a system that spread personal data across a dozen services is expensive and slow.

Test them as you would any other feature.

## Watch out for

- Personal data in logs, error reports and analytics, which are rarely covered by the same controls.
- Identifiers used as URL parameters, which end up in referrer headers and third-party logs.
- Re-identifiable "anonymised" data — a few quasi-identifiers are usually enough.
- Third-party scripts on pages handling sensitive input.
- Copying production data into staging for convenience.

## Finishing

Each field has a lawful basis and a retention period. Defaults are private. Access, export and deletion work end to end, including backups and logs.

