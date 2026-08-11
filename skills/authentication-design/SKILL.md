---
name: authentication-design
description: >-
  Implements sign-in, sessions and password handling without common flaws. Use when building or reviewing authentication, session handling, or a password reset flow.
---

# Authentication Design

## Passwords

Hash with a memory-hard algorithm designed for the purpose — Argon2id, scrypt or bcrypt. Never a general-purpose hash, however many times you apply it.

Never impose a maximum length or restrict character classes. Length is the strongest factor.

Check against known-breached password lists rather than enforcing arbitrary composition rules.

## Sessions and tokens

Set `HttpOnly`, `Secure` and `SameSite` on session cookies. A token readable by JavaScript is a token stolen by any XSS.

Rotate the session identifier on privilege change — sign-in, elevation — to prevent fixation.

Invalidate server-side on logout and on password change. A stateless token that cannot be revoked is a liability.

Keep access tokens short-lived and refresh tokens rotating with reuse detection.

## Flows that leak

Return the same response and take the same time whether or not an account exists — for sign-in, reset and registration alike.

Reset tokens must be single-use, short-lived, and tied to one account.

Compare tokens with a constant-time function. A short-circuiting comparison leaks the value one byte at a time.

Rate-limit per account and per address, and lock progressively rather than permanently.

## Watch out for

- Rolling your own crypto or token format when a reviewed library exists.
- Different error messages for wrong password versus unknown user, enumerating your user base.
- Long-lived tokens with no revocation path.
- Storing a password reset token in plaintext, so a database read is account takeover.

## Finishing

Passwords are hashed with a memory-hard function, sessions rotate and revoke, and no flow reveals whether an account exists.
