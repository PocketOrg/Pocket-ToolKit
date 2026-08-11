---
name: writing-tests
description: >-
  Writes tests that catch real regressions and survive refactoring. Use when adding tests, reviewing test coverage, or deciding what to test for a change.
---

# Writing Tests

## Test behaviour, not implementation

Assert on what the unit produces, not how it produced it. A test that breaks when you rename a private method is a maintenance cost with no benefit.

Avoid asserting that a mock was called unless the call *is* the behaviour — sending an email, charging a card.

If a test needs to know about internals to pass, the interface is probably wrong.

## What actually deserves a test

Branches: every `if` is at least two cases.

Boundaries: empty, one, many, maximum, and one past maximum.

Error paths: what happens when the dependency fails or the input is malformed.

Every bug you fix — the test that fails before the fix is the point of the exercise.

## Structure

Arrange, act, assert — visibly separated, in that order.

One logical assertion per test. A test with six unrelated assertions reports one failure and hides five.

Name the test after the scenario and expectation: `rejects a transfer when the balance is insufficient`.

No branching inside a test. If it needs an `if`, it is two tests.

## Keeping them fast and deterministic

No real network, no real clock, no real randomness. Inject them.

Each test creates its own data and does not depend on execution order.

Prefer real objects over mocks where they are cheap — over-mocked tests pass while the system is broken.

## Watch out for

- Chasing a coverage percentage, which rewards testing trivial getters and ignoring hard branches.
- Snapshot tests over large outputs — they fail on every unrelated change and get blindly updated.
- Shared mutable fixtures, which make failures depend on test order.
- Testing the framework instead of your code.

## Finishing

Each new behaviour has a test that fails without it, the suite is deterministic, and failure messages say what broke without a debugger.
