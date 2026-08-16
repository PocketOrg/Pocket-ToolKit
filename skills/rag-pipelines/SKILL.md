---
name: rag-pipelines
description: >-
  Builds retrieval-augmented generation that answers from your data instead of guessing. Use when designing a RAG system, or fixing one that retrieves the wrong passages.
---
# RAG Pipelines

## Retrieval quality caps everything downstream

No prompt fixes a passage that was never retrieved. Measure retrieval separately from generation, or you will spend weeks tuning the wrong stage.

Build a small labelled set — question, and the passage that answers it — and track recall at k. Without it you are guessing.

## Chunk on meaning, not on character count

Splitting every 500 characters cuts sentences in half and separates a heading from what it introduces. Split on structure first: sections, paragraphs, list items.

Overlap slightly so a fact spanning a boundary survives, and keep the parent heading with each chunk so an isolated passage is still interpretable.

## Embeddings alone miss exact terms

Vector search is weak on product codes, error numbers, names and rare acronyms — precisely the terms users search for.

Combine with keyword search and merge the rankings. Hybrid retrieval consistently beats either alone, and the fix is cheap.

## Rerank before you spend context

First-stage retrieval optimises for recall. A cross-encoder reranker over the top 50 puts the genuinely relevant passages first, so the context window carries signal rather than filler.

More retrieved passages is not better — irrelevant context measurably degrades answers.

## Ground the answer and cite it

Instruct the model to answer only from the passages, and to say so when they do not contain the answer. Return the source alongside the answer so a reader can check.

Unciteable answers cannot be verified and quietly erode trust in the whole system.

## Watch out for

- Stale indexes. Deleted source documents that remain retrievable produce confidently wrong, unfalsifiable answers.
- Mixing tenants or permission levels in one index, which leaks across users.
- Embedding model changes without reindexing, which silently degrades everything.
- Evaluating only on questions the corpus answers well, ignoring the unanswerable ones.
- Retrieval over a corpus that simply does not contain the answer, where the fix is content, not code.

## Finishing

Retrieval is measured independently. Search is hybrid. Answers cite sources and can say "not found".

