---
name: container-images
description: >-
  Builds container images that are small, cacheable and safe to run. Use when writing or reviewing a Dockerfile, reducing image size, or hardening a container.
---

# Container Images

## Layer order for caching

Copy dependency manifests and install before copying source. Otherwise every source edit reinstalls everything.

Order instructions from least to most frequently changing. A cache miss invalidates every layer after it.

Combine related shell commands in one `RUN`, cleaning up within the same layer — deleting a file in a later layer does not shrink the image.

## Keep it small

Multi-stage builds: compile in a full image, copy only the artifact into a minimal runtime.

Use a slim or distroless base. Fewer packages means both a smaller image and a smaller attack surface.

Add a `.dockerignore`. Without one you ship `node_modules`, `.git` and local env files into the build context.

## Run safely

Create and use a non-root user. A container process running as root that escapes is root on the host.

Never bake secrets in. They persist in the layer history even if a later step deletes them.

Pin base images by digest for anything you deploy — a moving tag means an unreviewed change.

Declare a healthcheck so the orchestrator knows the difference between running and working.

## Watch out for

- `COPY . .` before installing dependencies, defeating the layer cache entirely.
- `ADD` with a URL, which silently fetches unverified content at build time.
- Using `latest`, which makes builds unreproducible.
- Installing debugging tools in a production image and leaving them there.

## Finishing

The image builds reproducibly, caches on dependency changes only, runs as a non-root user, contains no secrets, and pins its base by digest.
