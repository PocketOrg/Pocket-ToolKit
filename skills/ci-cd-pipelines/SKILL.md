---
name: ci-cd-pipelines
description: >-
  Builds pipelines that catch problems early and deploy predictably. Use when setting up or fixing CI, adding a deployment stage, or diagnosing a slow or flaky pipeline.
---

# Ci Cd Pipelines

## Order stages by cost

Fast and cheap first: lint, typecheck, unit tests. Slow and expensive last: integration, end-to-end, deploy.

Fail fast — there is no value in running a twenty-minute suite when the build does not compile.

Run independent stages in parallel, but keep the dependency graph honest so nothing races.

## Make it reproducible

Install from the lockfile only. A pipeline that resolves fresh versions is not testing what you will ship.

Pin tool and image versions, including the runner image. `latest` turns someone else's release into your outage.

The same artifact should move through every environment. Rebuilding per environment means you deploy something you never tested.

## Deployment

Deploy the artifact, not the source. Build once, promote the result.

Make rollback a single action, and rehearse it — an untested rollback is not a rollback plan.

Health-check after deploying and roll back automatically on failure, rather than waiting for a user report.

## Secrets and permissions

Use the platform's secret store; never echo secrets, and be aware that a debug flag can print an entire environment.

Give the pipeline the narrowest credentials it needs. CI credentials are a frequent lateral-movement path.

Do not expose secrets to pull-request builds from forks.

## Watch out for

- A pipeline so slow people bypass it, which makes it worthless.
- Flaky tests retried until green, which hides real intermittent bugs.
- Caching so aggressively that a stale cache makes a broken build pass.
- Deploy steps that only exist in one person's shell history.

## Finishing

The pipeline is reproducible from the lockfile, fails fast, promotes a single artifact, and rollback has been tested.
