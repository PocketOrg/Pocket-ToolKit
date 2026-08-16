---
name: release-notes
description: >-
  Writes release notes users read and act on. Use when shipping a release, announcing a breaking change, or replacing a changelog of commit messages.
---
# Release Notes

## Write for the user's decision

The reader wants to know one thing: does anything here require me to do something. Structure the notes to answer that first.

Breaking changes and required actions go at the top, unmissably. Everything else is optional reading.

## Group by impact, not by component

Users do not know your service boundaries. "Fixed in auth-service" means nothing; "You will no longer be signed out when switching workspaces" does.

Three groups usually suffice: what needs action, what is new, what is fixed.

## Describe the change from outside

A commit says what was altered. A release note says what is now different for the person using it.

"Refactored the export pipeline" is internal news. "Exports over 100MB now complete instead of timing out" is a release note.

## Breaking changes need a migration path, in the note

Do not link away to it. State what breaks, what to change it to, and by when — inline, where someone scanning will see it.

If a deprecation has a removal date, repeat the date in every release until it lands.

## Skip the noise

Dependency bumps, internal refactors and typo fixes belong in the commit log, not the release notes. Including them trains readers to skim past the important entries.

If a release genuinely has nothing user-visible, say so in one line rather than padding.

## Watch out for

- Version numbers as headings with no summary, forcing readers to diff mentally.
- "Various improvements and bug fixes", which tells the reader nothing and reads as concealment.
- Announcing a fix without saying what the symptom was, so nobody knows if it affected them.
- Notes written after the release, when the person who made the change has moved on.

## Finishing

Required actions are at the top. Every entry describes an externally visible difference. Breaking changes include the migration inline.

