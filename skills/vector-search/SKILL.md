---
name: vector-search
description: >-
  Builds and tunes semantic search that returns relevant results. Use when adding vector search, choosing an index, or debugging poor recall.
---
# Vector Search

## Match the embedding to the task

Models are trained for different objectives: symmetric similarity (find similar documents) differs from asymmetric retrieval (find the passage answering this question).

Using a symmetric model for question-answering retrieval is a common and quiet mistake — short queries and long passages embed into different regions.

## Normalise and be consistent about distance

Cosine similarity requires normalised vectors; mixing normalised and unnormalised data produces nonsense ranking that looks plausible.

Whatever metric the index uses, the query must be embedded exactly as the documents were: same model, same version, same preprocessing.

## Understand what the index trades away

Exact search is accurate and slow. Approximate indexes — HNSW, IVF — are fast and return approximately the right neighbours.

Every approximate index has a knob trading recall for latency. Measure recall against exact search on a sample before choosing a value; the default is rarely right for your data.

## Filter and search together, not sequentially

Filtering after retrieval discards results and can return too few. Filtering before, without index support, degrades to a scan.

Use an index with native pre-filtering when metadata filters are common, and design the metadata schema around the filters you will actually use.

## Reindex is a first-class operation

Embedding models are updated, and a mixed index is silently broken — old and new vectors are not comparable.

Build reindexing as a routine, versioned operation with a switchover, not a one-off script written in an emergency.

## Watch out for

- Very long documents embedded as one vector, which averages away everything specific.
- Assuming similarity scores are comparable across models or absolute in meaning; they are ranking signals, not probabilities.
- Ignoring exact-match needs. Identifiers and rare terms need keyword search alongside.
- Unbounded index growth with no deletion path for removed source documents.
- Evaluating by eyeballing a few queries rather than measuring recall on a labelled set.

## Finishing

The embedding model matches the retrieval pattern. Query and documents are processed identically. Recall was measured before tuning latency. Reindexing is a routine operation.

