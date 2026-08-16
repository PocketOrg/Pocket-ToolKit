---
name: data-modelling
description: >-
  Designs warehouse schemas that answer tomorrow's questions without a rewrite. Use when modelling a new source, designing fact and dimension tables, or untangling a schema nobody can query.
---
# Data Modelling

## Facts measure, dimensions describe

A fact table holds things that happened, at one grain, with numeric measures and foreign keys. A dimension holds the attributes you slice by.

If you cannot decide whether something is a fact or a dimension, ask whether you would ever sum it. Revenue sums; a country name does not.

Keep facts narrow and long. Keep dimensions wide and short. That shape is what makes star schemas fast.

## One grain per fact table

Mixing grains — order headers and order lines in one table — forces every consumer to filter correctly forever, and most will not.

Build separate tables and let consumers join. Two clear tables beat one clever one.

## Slowly changing dimensions, decided deliberately

A customer moves city. Do you overwrite (type 1), or keep history with valid-from and valid-to (type 2)?

Type 1 is simpler and loses the past. Type 2 answers "what was true when the order was placed" and costs a join on date range.

Choose per attribute, not per table. Most dimensions want type 1 for corrections and type 2 for genuine changes.

## Surrogate keys over natural keys

Natural keys change: emails, usernames, even national identifiers get reissued. A surrogate key never does.

Keep the natural key as an attribute so you can trace back to the source. The two serve different purposes.

## Model for the question, not the source

A schema that mirrors the operational database inherits its normalisation, which is tuned for writes, not reads.

Denormalise deliberately in the warehouse. A join you avoid a thousand times a day is worth the storage.

## Watch out for

- Nullable foreign keys, which turn every join into a decision about missing rows. Use an "unknown" dimension row instead.
- Timestamps without a timezone. Store UTC, convert at the edge, and say which is which in the column name.
- Encoding business logic in the model that changes quarterly — put it in a view or a metrics layer.
- Reusing one date dimension role without aliasing: order date, ship date and refund date are three different joins.

## Finishing

Every fact states its grain. Every dimension has a documented key strategy. A new analyst can answer a typical question without asking which table to trust.

