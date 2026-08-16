---
name: accessibility-review
description: >-
  Finds and fixes accessibility barriers before users hit them. Use when reviewing an interface, before a launch, or when responding to an accessibility complaint.
---
# Accessibility Review

## Keyboard first, because it catches the most

Unplug the mouse and complete the main flow. Every barrier you hit is a barrier for keyboard, switch and screen reader users alike.

Check: can you reach every control, is focus visible at all times, does the order follow the visual layout, can you escape every modal.

A visible focus ring is not optional decoration. Removing `outline` without replacing it is the single most common regression.

## Semantics do the heavy lifting

A `<button>` is focusable, activates on space and enter, and announces itself. A `<div onClick>` does none of that and needs four attributes to catch up.

Use the native element. ARIA is for cases the platform genuinely lacks, and incorrect ARIA is worse than none — it overrides what the browser already knew.

Headings describe structure, not size. Skipping from `h1` to `h4` for visual reasons breaks navigation for screen reader users who jump by heading.

## Colour is never the only signal

Any information carried by colour must also be carried by text, shape or position. Red-only error states are invisible to a significant share of users.

Check contrast: 4.5:1 for body text, 3:1 for large text and for the boundaries of interactive controls. Placeholder-grey text usually fails.

## Every input needs a real label

A placeholder is not a label — it disappears on focus and is not reliably announced. Use `<label for>`, and connect error messages with `aria-describedby` so they are read with the field.

## Announce what changes

Content that appears without a page load — a validation summary, a toast, a loaded result — is silent unless it is in a live region.

Reserve assertive announcements for genuine interruptions; everything else should be polite.

## Watch out for

- Automated scanners as the whole review. They catch perhaps a third of issues and never catch a nonsensical tab order.
- Images with decorative alt text describing the file, rather than empty alt.
- Custom dropdowns that trap focus or cannot be operated without a pointer.
- Timeouts with no way to extend them.
- Motion that cannot be disabled, which triggers vestibular disorders.

## Finishing

The main flow completes on keyboard alone. Focus is always visible. Contrast passes. No information depends on colour alone.

