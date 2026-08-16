---
name: zero-trust-architecture
description: >-
  Designs systems that do not trust the network. Use when planning network security, replacing a VPN perimeter, or securing service-to-service traffic.
---
# Zero Trust Architecture

## Location is not a credential

The core idea is simple: being inside the network proves nothing. A laptop on the office LAN, a compromised container and an attacker with a stolen VPN credential all look identical from the network's point of view.

Every request authenticates and authorises on its own merits, regardless of where it came from.

## Identity for services, not just people

Service-to-service calls need verifiable identity — mutual TLS with short-lived certificates, or signed tokens with a narrow audience.

Shared static API keys between services are the internal equivalent of a shared password, and they leak into logs, images and repositories.

## Short-lived credentials, always

Long-lived secrets are the thing that gets stolen and reused. Issue credentials that expire in minutes or hours and are renewed automatically.

The security benefit is not that theft becomes impossible, but that the window of use becomes small and the theft becomes detectable.

## Authorise per request, close to the resource

A gateway check alone means anything that reaches the service directly bypasses it. The service itself must verify the caller's identity and permission.

Encode authorisation as policy that can be reviewed and tested, rather than scattered conditionals.

## Assume breach and limit blast radius

Segment so that compromising one service does not grant reach to everything. Default-deny between services, with explicit allowed paths.

Log every authorisation decision. During an incident the question is which identity accessed what, and that must be answerable.

## Watch out for

- A VPN relabelled as zero trust while the internal network stays flat and trusted.
- Device trust ignored — an authenticated user on a compromised laptop is still compromised.
- Certificate rotation that nobody has tested, causing a total outage on expiry.
- Policy engines that become a single point of failure with no cached fallback.
- Exceptions added "temporarily" for a legacy service and never removed.

## Finishing

No request is trusted for its origin. Services have verifiable identities and short-lived credentials. Authorisation happens at the resource and is logged.

