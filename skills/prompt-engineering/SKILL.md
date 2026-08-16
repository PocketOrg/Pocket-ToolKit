---
name: prompt-engineering
description: >-
  Writes prompts that produce reliable output instead of impressive demos. Use when building on a language model, debugging inconsistent responses, or reviewing a prompt.
---
# Prompt Engineering

## Specify the output, not the vibe

"Be concise" is unmeasurable. "Reply in at most three sentences, with no preamble" is checkable, and the model can comply reliably.

State the format, the length, and what must not appear. Most inconsistency comes from underspecification, not from the model.

## Show rather than describe

Two or three examples of correct input-output pairs constrain behaviour better than a paragraph of instruction, especially for formatting.

Make examples cover the edge you care about — an example of the empty case teaches more than three of the normal case.

## Put the instruction where it survives

In long contexts, material in the middle is attended to least. Put the task at the start, the constraints at the end, and the input between.

Repeating a critical constraint at the end costs a few tokens and measurably improves compliance.

## Give it somewhere to think

For anything with reasoning, allow intermediate steps before the answer, then ask for the answer in a delimited block you can parse.

Forcing an immediate answer on a multi-step problem trades accuracy for latency, usually a bad trade.

## Handle the failure modes explicitly

Say what to do when the input is unanswerable, out of scope, or missing information. Without an instruction, the model will invent something plausible.

"If the document does not contain the answer, reply exactly: NOT_FOUND" converts hallucination into a handleable case.

## Watch out for

- Prompts that grow by accretion until nobody knows which line does the work. Test removals, not just additions.
- Treating one good response as evidence; sample repeatedly, especially above temperature zero.
- Putting untrusted user or web content in the same channel as instructions.
- Assuming a prompt tuned on one model transfers to another. It often does not.
- Long system prompts that contradict themselves in places nobody has reread.

## Finishing

Output format is specified and parseable. The unanswerable case has an instruction. Behaviour was checked across several samples, not one.

