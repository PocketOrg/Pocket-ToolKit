---
name: clinical-data-handling
description: >-
  Handles patient and health data without creating a breach or a compliance failure. Use when designing a system that touches health data, or reviewing one that does.
---
# Clinical Data Handling

## Identifiability is a spectrum, not a flag

Removing a name does not make data anonymous. Dates of birth, postcodes, rare diagnoses and visit timestamps re-identify people in combination, often trivially.

Distinguish three states and label datasets explicitly: identified, pseudonymised (keys held separately, re-identification possible), and anonymised (re-identification not reasonably possible). Most data people call anonymous is pseudonymised.

## Collect the minimum, keep it the shortest time

Every extra field is additional breach exposure with no benefit unless it is used. Justify each field against the stated purpose, and record that justification.

Set a retention period when the data is created, not when someone asks. Data with no deletion date is kept forever by default.

## Purpose limitation is a real constraint

Data collected for care cannot be silently reused for research or product analytics. Consent for one purpose is not consent for another.

Check the lawful basis before any new use. "We already have the data" is not a basis.

## Segregate and log access

Health data belongs in its own store with its own access controls, not in the general application database because it was convenient.

Log every read, not just every write. In an investigation the question is almost always who looked, not who changed.

## Plan for the subject's rights

People can ask what you hold, ask for correction, and often ask for deletion. If your architecture cannot answer those questions, it is not compliant regardless of its security.

Test the export and delete paths before you need them under a deadline.

## Watch out for

- Health data in application logs, error trackers and analytics tools, which are rarely covered by the same controls.
- Test environments seeded with real patient data.
- Free-text notes, which contain identifiers no schema-level redaction will catch.
- Third-party processors without an agreement covering the data class.
- Backups that outlive the retention policy the live data obeys.

## Finishing

Every field is justified and has a retention period. Access is logged. Export and deletion have been tested. The lawful basis is recorded.

