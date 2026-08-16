---
name: regular-expressions
description: >-
  Writes regexes that are correct and maintainable, and knows when not to. Use when matching or extracting text, or reviewing a pattern nobody can read.
---
# Regular Expressions

## Anchor and be specific

An unanchored pattern matches anywhere, which is rarely what validation wants. `^...$` states that the whole string must match.

Prefer specific classes to `.`. Every `.*` is a place where the pattern will match more than you intended, usually on the one input that matters.

## Greedy by default, and that is usually wrong

`<.*>` on `<a><b>` matches the entire string, not the first tag. Use `<[^>]*>` — a negated class is clearer and faster than the lazy `<.*?>`.

Negated character classes generally express intent better than lazy quantifiers.

## Name your groups

`(?<year>\d{4})-(?<month>\d{2})` survives someone inserting a group before it; `\1` and `\2` do not.

For anything with more than two captures, names are the difference between a maintainable pattern and one that gets rewritten from scratch.

## Comment anything non-trivial

Extended mode — `/x` in most languages — allows whitespace and comments inside the pattern. A twelve-character regex is fine; a sixty-character one needs explanation.

If extended mode is unavailable, put a comment above with an example of what matches and what does not.

## Know the catastrophic case

Nested quantifiers over overlapping alternatives — `(a+)+b` — backtrack exponentially. On a 30-character non-matching input this hangs the process.

Never run a user-supplied pattern without a timeout, and avoid nesting quantifiers on patterns that touch untrusted input.

## Watch out for

- Parsing HTML, JSON or CSV with regex. Use a parser; the edge cases are endless and quoting rules defeat patterns.
- Email validation by regex. Check for an `@`, then send a confirmation — that is the only real validation.
- `\d` matching non-ASCII digits in Unicode mode, which surprises people validating numbers.
- Patterns that pass on the three examples in front of you and fail on the fourth nobody tried.
- Forgetting that `.` excludes newlines unless dotall is set.

## Finishing

The pattern is anchored, specific, and either short or commented. Untrusted input runs against it with a timeout. Structured formats use a parser instead.

