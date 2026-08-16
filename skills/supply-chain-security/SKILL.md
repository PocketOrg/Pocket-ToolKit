---
name: supply-chain-security
description: >-
  Defends against compromised dependencies and build systems. Use when hardening a build, reviewing dependencies, or responding to a compromised package.
---
# Supply Chain Security

## Your dependencies are your attack surface

A typical application ships far more third-party code than first-party. Every one of those packages runs with your privileges, and most pull further packages you never chose.

Review what a dependency actually needs. A date formatter that requires network access at install time deserves scrutiny.

## Pin everything, and verify integrity

Lockfiles with hashes are the baseline. A floating version means your build is not reproducible and a compromised release reaches you automatically.

Commit the lockfile. Ensure CI installs from it strictly rather than resolving fresh.

## Treat install scripts as code execution

Post-install hooks run arbitrary code on developer machines and CI runners, often with credentials in the environment.

Disable them by default where your ecosystem allows, and allowlist the few that genuinely need to run.

## Protect the build system as tightly as production

CI holds signing keys, deployment credentials and source access. It is a more valuable target than any single server.

Restrict which branches can run privileged workflows. Never expose secrets to builds triggered by untrusted pull requests — that is a well-worn exfiltration path.

## Know what you shipped

Generate an SBOM at build time and store it with the artefact. When a vulnerability is announced, the question is "are we affected, and where" — and without an inventory that takes days.

Scan continuously, not once at build: today's clean dependency is next month's advisory.

## Watch out for

- Typosquatted package names, especially on a fresh install of an unfamiliar tool.
- Dependency confusion, where an internal package name is claimed on a public registry.
- Abandoned packages transferred to a new maintainer, which is how several compromises began.
- Vendored code copied in years ago and never patched.
- Container base images pinned by tag rather than digest, so the contents change silently.

## Finishing

Dependencies are pinned with hashes. Install scripts are restricted. CI secrets are unavailable to untrusted triggers. An SBOM exists and is scanned continuously.

