/**
 * Skill definitions for the seed catalogue.
 *
 * Each entry carries the real substance of one skill — what it covers, the
 * ordered steps, the traps, and how to finish. The generator turns these into
 * SKILL.md files; keeping the content as data rather than as 100 markdown files
 * means the *shape* stays consistent (every skill has scope, method, pitfalls,
 * completion) while the words stay specific to the subject.
 *
 * Fields:
 *   slug      URL-safe id, also the folder name
 *   cat       category, must match the schema enum
 *   what      what it does — first half of the description
 *   when      when to use it — completes "Use when ..."
 *   roles     agent roles it suits (empty = any)
 *   sections  [heading, [line, ...]] — the body, in order
 *   traps     things that go wrong, as bullet lines
 *   done      what finishing looks like
 */

export const SKILLS = [
  /* ------------------------------------------------ Software Engineering */
  {
    slug: "api-design",
    cat: "Software Engineering",
    what: "Designs HTTP APIs that are predictable to consume and cheap to evolve",
    when: "designing a new endpoint, reviewing an API surface, or versioning a breaking change",
    roles: ["Engineer", "Tech Lead", "Architect"],
    sections: [
      [
        "Resources before verbs",
        [
          "Name endpoints after things, not actions. `POST /invoices` rather than `/createInvoice` — the method already carries the verb.",
          "Use plural collections consistently: `/invoices`, `/invoices/{id}`, `/invoices/{id}/lines`.",
          "When an operation genuinely is not CRUD, make it a sub-resource: `POST /invoices/{id}/void` beats `POST /voidInvoice`.",
        ],
      ],
      [
        "Status codes that mean something",
        [
          "`200` returns a body. `201` returns the created resource and a `Location` header. `204` returns nothing.",
          "`400` is malformed input; `422` is well-formed but semantically wrong. Pick one convention and hold to it.",
          "`401` means not authenticated, `403` means authenticated but not allowed. Confusing these makes debugging much harder for consumers.",
          "Never return `200` with an error in the body. Clients check status first.",
        ],
      ],
      [
        "Errors clients can act on",
        [
          "Return a machine-readable code and a human message: `{ code: \"card_declined\", message: \"...\", field: \"payment.card\" }`.",
          "Validation errors should list every failure, not just the first — otherwise a form round-trips once per field.",
          "Never leak stack traces, SQL or internal hostnames.",
        ],
      ],
      [
        "Pagination and filtering",
        [
          "Cursor pagination for anything that changes while being read; offset pagination silently skips and repeats rows as data shifts.",
          "Always cap page size server-side, whatever the client asks for.",
          "Return the total only if it is cheap. An exact count on a large table costs more than the page itself.",
        ],
      ],
      [
        "Evolving without breaking",
        [
          "Adding an optional field is safe. Removing one, renaming one, or narrowing a type is not.",
          "Making a previously optional request field required is a breaking change even though the schema looks additive.",
          "Version at the boundary you actually intend to support, and say how long the old version lives.",
        ],
      ],
    ],
    traps: [
      "Leaking database column names and internal ids into the public surface, which freezes your schema.",
      "Inconsistent casing between endpoints — pick `snake_case` or `camelCase` and never mix.",
      "Returning different shapes for the same resource on different endpoints.",
      "Booleans that will obviously become enums later (`isActive` when there are four states coming).",
    ],
    done: "Every endpoint has a documented request shape, response shape, error codes and auth requirement. A consumer can integrate without reading your source.",
  },
  {
    slug: "debugging-methodically",
    cat: "Software Engineering",
    what: "Finds root causes by forming and testing hypotheses instead of changing code speculatively",
    when: "investigating a bug, a test failure, or behaviour you cannot explain",
    roles: ["Engineer", "Tech Lead"],
    sections: [
      [
        "Reproduce first",
        [
          "Do not attempt a fix until you can trigger the problem on demand. A fix for a bug you cannot reproduce cannot be verified.",
          "Reduce to the smallest input that still fails. Every element you remove eliminates a class of cause.",
          "Write the reproduction down. It becomes the regression test.",
        ],
      ],
      [
        "Read the error properly",
        [
          "Read the whole trace, not the first line. The frame that matters is usually the deepest one in your own code.",
          "Note the exact values in the message. `undefined` versus `null` versus `\"\"` point to different origins.",
          "If the error is swallowed or generic, make it loud before you go further — you cannot debug what you cannot see.",
        ],
      ],
      [
        "Bisect the space",
        [
          "Form one hypothesis, predict what you would observe if it were true, then test only that.",
          "Change one thing at a time. Two simultaneous changes make the result uninterpretable.",
          "When it worked before, use `git bisect` — it beats reasoning about a large diff.",
          "Verify assumptions rather than trusting them: print the value, check the config actually loaded, confirm the request reached the server.",
        ],
      ],
      [
        "Common shapes",
        [
          "**Works locally, fails deployed** — environment variables, version drift, filesystem case sensitivity, timezone.",
          "**Intermittent** — ordering, concurrency, a shared cache, or a clock.",
          "**Fails only in CI** — parallel test pollution, or state leaking between tests.",
          "**Started suddenly with no deploy** — an upstream dependency, an expired credential, or a full disk.",
        ],
      ],
    ],
    traps: [
      "Changing several things at once, then not knowing which fixed it.",
      "Fixing the symptom — silencing a warning or adding a null check — without asking why the value was missing.",
      "Trusting a comment or a variable name over the actual behaviour.",
      "Declaring victory on a flaky bug after one passing run.",
    ],
    done: "You can explain the causal chain from trigger to symptom, the fix addresses the cause, and a test fails without it.",
  },
  {
    slug: "writing-tests",
    cat: "Software Engineering",
    what: "Writes tests that catch real regressions and survive refactoring",
    when: "adding tests, reviewing test coverage, or deciding what to test for a change",
    roles: ["Engineer", "QA Engineer"],
    sections: [
      [
        "Test behaviour, not implementation",
        [
          "Assert on what the unit produces, not how it produced it. A test that breaks when you rename a private method is a maintenance cost with no benefit.",
          "Avoid asserting that a mock was called unless the call *is* the behaviour — sending an email, charging a card.",
          "If a test needs to know about internals to pass, the interface is probably wrong.",
        ],
      ],
      [
        "What actually deserves a test",
        [
          "Branches: every `if` is at least two cases.",
          "Boundaries: empty, one, many, maximum, and one past maximum.",
          "Error paths: what happens when the dependency fails or the input is malformed.",
          "Every bug you fix — the test that fails before the fix is the point of the exercise.",
        ],
      ],
      [
        "Structure",
        [
          "Arrange, act, assert — visibly separated, in that order.",
          "One logical assertion per test. A test with six unrelated assertions reports one failure and hides five.",
          "Name the test after the scenario and expectation: `rejects a transfer when the balance is insufficient`.",
          "No branching inside a test. If it needs an `if`, it is two tests.",
        ],
      ],
      [
        "Keeping them fast and deterministic",
        [
          "No real network, no real clock, no real randomness. Inject them.",
          "Each test creates its own data and does not depend on execution order.",
          "Prefer real objects over mocks where they are cheap — over-mocked tests pass while the system is broken.",
        ],
      ],
    ],
    traps: [
      "Chasing a coverage percentage, which rewards testing trivial getters and ignoring hard branches.",
      "Snapshot tests over large outputs — they fail on every unrelated change and get blindly updated.",
      "Shared mutable fixtures, which make failures depend on test order.",
      "Testing the framework instead of your code.",
    ],
    done: "Each new behaviour has a test that fails without it, the suite is deterministic, and failure messages say what broke without a debugger.",
  },
  {
    slug: "refactoring-safely",
    cat: "Software Engineering",
    what: "Restructures code without changing behaviour, in steps that stay releasable",
    when: "cleaning up code, splitting a large module, or preparing a change that is hard to make",
    roles: ["Engineer", "Tech Lead"],
    sections: [
      [
        "Preconditions",
        [
          "Tests first. Without them you are rewriting, not refactoring — you have no way to know behaviour held.",
          "If coverage is missing, add characterisation tests that capture what the code does now, including any bugs.",
          "Refactor separately from behaviour changes. A diff that does both cannot be reviewed properly.",
        ],
      ],
      [
        "Work in small steps",
        [
          "Each step should leave the code working and committable. Long-lived broken states cannot be abandoned safely.",
          "Rename, extract, inline, move — apply one at a time and run the tests between.",
          "Use the tooling's automated refactors where available; they do not typo.",
        ],
      ],
      [
        "Where to start",
        [
          "The thing you must change next. Refactoring for its own sake competes with delivery and rarely wins.",
          "Duplication that has already drifted — that is a bug waiting to happen.",
          "Files that have grown to do several unrelated things; split along the seams that already exist.",
        ],
      ],
    ],
    traps: [
      "Rewriting from scratch instead of transforming, which discards the accumulated fixes nobody remembers.",
      "Bundling behaviour changes in, so a regression cannot be attributed.",
      "Refactoring code that is about to be deleted.",
      "Introducing an abstraction for a single case — wait for the third.",
    ],
    done: "Behaviour is provably unchanged, the tests pass at every intermediate commit, and the change you needed is now easy.",
  },
  {
    slug: "git-workflow",
    cat: "Software Engineering",
    what: "Produces reviewable commits and clean history",
    when: "committing work, preparing a branch for review, or resolving a rebase or merge conflict",
    roles: ["Engineer"],
    sections: [
      [
        "Commits",
        [
          "One logical change per commit. If the subject line needs an \"and\", split it.",
          "Subject in the imperative, under ~60 characters: `Fix session expiry when the clock drifts`.",
          "Use the body to explain *why*. The diff already shows what.",
          "Never commit generated files, secrets, or unrelated formatting churn.",
        ],
      ],
      [
        "Branches and rebasing",
        [
          "Rebase your own unpushed work to tidy it; never rebase a branch others have based work on.",
          "`git rebase -i` to squash fixup commits before review — reviewers should not read your false starts.",
          "Resolve conflicts by understanding both sides, not by taking whichever compiles.",
        ],
      ],
      [
        "Recovering",
        [
          "`git reflog` finds almost anything you think you lost, including after a hard reset.",
          "`git revert` for published history; `git reset` only for local work.",
          "Before any destructive operation, note the current SHA — it makes the mistake reversible.",
        ],
      ],
    ],
    traps: [
      "Force-pushing a shared branch, which rewrites history others depend on.",
      "One giant commit at the end of a week, which cannot be reviewed or bisected.",
      "Commit messages like \"fix\", \"wip\" or \"changes\" in permanent history.",
      "Committing a merge conflict marker — grep for `<<<<<<<` before pushing.",
    ],
    done: "Each commit is self-contained and explains itself, the branch rebases cleanly, and history reads as a sequence of decisions.",
  },
  {
    slug: "performance-profiling",
    cat: "Software Engineering",
    what: "Finds and fixes real performance problems by measuring before changing anything",
    when: "something is slow, a page fails a performance budget, or a query is timing out",
    roles: ["Engineer", "Tech Lead"],
    sections: [
      [
        "Measure before you change",
        [
          "Establish a number first. Without a baseline you cannot tell whether a change helped, and most intuitions about what is slow are wrong.",
          "Profile under conditions resembling production: real data volumes, real network latency, a production build. A dev-mode profile mostly measures the dev tooling.",
          "Find the actual bottleneck before optimising anything. Time spent on code that accounts for two percent of the total is time wasted.",
        ],
      ],
      [
        "Where the time usually goes",
        [
          "**Waiting, not computing.** Most slow applications are slow because of sequential I/O — queries, HTTP calls, filesystem reads — not CPU.",
          "**N+1 queries.** One query per row in a loop. Batch them, or join.",
          "**Missing indexes.** Read the query plan; a sequential scan on a large table is the usual culprit.",
          "**Payload size.** Shipping fields nobody reads, or unbounded result sets with no limit.",
          "**Repeated work.** The same value computed per request when it could be computed once.",
        ],
      ],
      [
        "Reading a profile",
        [
          "Distinguish total time from self time. A function with high total but low self time is a caller, not the problem.",
          "Look for the widest bar, not the deepest stack. Depth is structure; width is cost.",
          "Repeated identical frames usually mean a loop doing I/O.",
        ],
      ],
      [
        "Fix in order of leverage",
        [
          "Remove the work entirely if you can. Not doing something is faster than doing it efficiently.",
          "Then batch, then cache, then parallelise. Caching first hides the real problem and adds an invalidation bug.",
          "Re-measure after each change. Two optimisations at once make attribution impossible.",
        ],
      ],
    ],
    traps: [
      "Optimising a microbenchmark that does not reflect real usage.",
      "Adding a cache without deciding how it is invalidated, trading a slow bug for a wrong one.",
      "Micro-optimising CPU while the request spends most of its time on the network.",
      "Reporting a percentage improvement without stating the absolute numbers.",
    ],
    done: "The bottleneck is identified with evidence, the fix is measured against the baseline, and the numbers are stated in absolute terms.",
  },
  {
    slug: "error-handling",
    cat: "Software Engineering",
    what: "Designs failure paths that preserve information and degrade predictably",
    when: "adding error handling, reviewing a catch block, or deciding how a failure should propagate",
    roles: ["Engineer", "Tech Lead"],
    sections: [
      [
        "Decide who handles it",
        [
          "Only catch an error where you can do something about it. A catch that logs and rethrows adds noise, not safety.",
          "Let unexpected errors propagate to a boundary that knows how to respond — a request handler, a job runner, a UI error boundary.",
          "Never swallow silently. An empty catch block is a bug you will spend hours finding later.",
        ],
      ],
      [
        "Preserve the cause",
        [
          "When wrapping, attach the original: `throw new Error(\"could not load profile\", { cause: err })`. A rewritten message with no cause destroys the trace.",
          "Add context the caller lacks — which id, which file, which endpoint — not just a restatement of the error type.",
          "Never log an error and also return a success value. The caller will believe it worked.",
        ],
      ],
      [
        "Expected versus exceptional",
        [
          "A user typing an invalid email is expected: return a validation result, do not throw.",
          "A database being unreachable is exceptional: throw, and let the boundary decide.",
          "Reserve exceptions for things that genuinely break the flow. Using them for control flow makes the happy path hard to read.",
        ],
      ],
      [
        "Retries and timeouts",
        [
          "Every network call needs a timeout. Without one, a hung dependency exhausts your connections.",
          "Retry only idempotent operations, with exponential backoff and jitter.",
          "Cap total attempts and surface the final failure. Infinite retries turn an outage into a silent stall.",
        ],
      ],
    ],
    traps: [
      "`catch (e) {}` — the most expensive two characters in software.",
      "Returning `null` on failure, which pushes the problem to a caller who will forget to check.",
      "Logging the same error at three levels of the stack, making one failure look like three.",
      "Exposing internal error text to end users, leaking implementation detail.",
    ],
    done: "Every failure either resolves locally or reaches a boundary with its cause intact, and no path swallows an error silently.",
  },
  {
    slug: "code-documentation",
    cat: "Software Engineering",
    what: "Writes comments and docstrings that explain intent rather than restating code",
    when: "documenting code, reviewing comments, or explaining a non-obvious decision",
    roles: ["Engineer", "Tech Lead"],
    sections: [
      [
        "Comment the why, never the what",
        [
          "The code says what it does. A comment repeating it is noise that will drift out of date.",
          "Explain the decision: why this approach, what was tried and rejected, what constraint forced it.",
          "The most valuable comment describes something surprising — a workaround, an ordering requirement, a non-obvious performance reason.",
        ],
      ],
      [
        "Where comments earn their place",
        [
          "Above a regular expression, stating what it matches in words.",
          "Where a bug was fixed subtly, so nobody reintroduces it while tidying.",
          "On a magic number, giving its source.",
          "At the top of a module, explaining its responsibility and boundary.",
        ],
      ],
      [
        "Docstrings",
        [
          "Say what the function does, what it returns, and what it throws. Skip the obvious parameter restatements.",
          "Document behaviour a caller cannot infer: is it idempotent, does it mutate its argument, does it hit the network.",
          "State units and ranges. `timeout` is meaningless without knowing whether it is seconds or milliseconds.",
        ],
      ],
    ],
    traps: [
      "Comments that restate the line beneath them.",
      "Commented-out code left in place — delete it, version control remembers.",
      "A `TODO` with no owner and no context, which becomes permanent.",
      "Documentation that contradicts the code, which is worse than none because it is believed.",
    ],
    done: "Every non-obvious decision has a stated reason, and no comment merely paraphrases the code.",
  },
  {
    slug: "dependency-management",
    cat: "Software Engineering",
    what: "Adds, updates and removes dependencies without inheriting avoidable risk",
    when: "adding a package, updating dependencies, or auditing what a project pulls in",
    roles: ["Engineer", "Tech Lead"],
    sections: [
      [
        "Before adding anything",
        [
          "Ask whether the standard library or existing dependencies already do it. Every package is a permanent maintenance and security commitment.",
          "Check the transitive weight, not just the package. A small utility pulling forty dependencies is not small.",
          "Look at last release date, open issue count, and whether one person maintains it. An unmaintained dependency becomes your code.",
          "Verify the package name character by character. Typosquatting is a real and common attack.",
        ],
      ],
      [
        "Pinning and lockfiles",
        [
          "Always commit the lockfile. Without it, two machines build different software from the same source.",
          "Use exact versions for anything security-sensitive; ranges are fine for dev tooling.",
          "In CI, install from the lockfile only — never let it resolve fresh versions mid-pipeline.",
        ],
      ],
      [
        "Updating",
        [
          "Update in small batches so a regression can be attributed. A single commit bumping sixty packages is unbisectable.",
          "Read the changelog for major bumps. Semver is a convention, not a guarantee.",
          "Security patches first, features later.",
        ],
      ],
    ],
    traps: [
      "Adding a dependency for a function you could write in five lines.",
      "Ignoring audit warnings indefinitely until the count is too high to triage.",
      "Committing `node_modules`, or a lockfile from a different package manager.",
      "Postinstall scripts from packages you have not reviewed — they run arbitrary code on install.",
    ],
    done: "Every dependency has a reason, the lockfile is committed, and known vulnerabilities are either fixed or explicitly accepted with a note.",
  },
  {
    slug: "concurrency",
    cat: "Software Engineering",
    what: "Writes concurrent code that does not corrupt state or deadlock",
    when: "working with async operations, shared state, background jobs, or diagnosing an intermittent bug",
    roles: ["Engineer", "Tech Lead"],
    sections: [
      [
        "Find the shared mutable state",
        [
          "Concurrency bugs live where two paths touch the same data. Enumerate what is shared before reasoning about anything else.",
          "The safest design has no sharing: pass values, return new state, avoid module-level mutables.",
          "A read followed by a write is a race unless something guarantees nothing intervened. Check-then-act is the classic bug shape.",
        ],
      ],
      [
        "Common failures",
        [
          "**Lost update.** Two writers read the same value, both increment, one write is lost. Use an atomic operation or a conditional update.",
          "**Deadlock.** Two holders each wait on the other's lock. Always acquire locks in a consistent global order.",
          "**Unawaited promise.** The function returns before the work finishes, so errors vanish and ordering breaks.",
          "**Duplicate job execution.** Assume every queue delivers at least once, and make handlers idempotent.",
        ],
      ],
      [
        "Practical rules",
        [
          "Prefer atomic database operations over read-modify-write in application code.",
          "Use optimistic concurrency — a version column checked on update — rather than holding a lock across a request.",
          "Bound your parallelism. Unlimited concurrent requests exhaust connections and turn a fast path into a timeout.",
          "Make every handler idempotent, keyed on something stable, so a retry is harmless.",
        ],
      ],
    ],
    traps: [
      "Testing concurrency serially, which passes reliably while the bug remains.",
      "Assuming a single-threaded runtime means no races — interleaving at await points is enough.",
      "Adding a lock without considering ordering, creating a deadlock instead of a race.",
      "Treating an intermittent failure as flakiness rather than as the race it usually is.",
    ],
    done: "Shared state is enumerated, each access is either atomic or guarded, handlers are idempotent, and parallelism is bounded.",
  },
  {
    slug: "logging-and-observability",
    cat: "Software Engineering",
    what: "Emits logs, metrics and traces that make production diagnosable",
    when: "adding logging, instrumenting a service, or unable to explain a production incident",
    roles: ["Engineer", "SRE", "Tech Lead"],
    sections: [
      [
        "Log for the person debugging at 3am",
        [
          "Structured, not prose. Emit fields — `{ event, userId, durationMs, outcome }` — so logs can be queried rather than grepped.",
          "Include a correlation id on every line for a request, so one trace can be reassembled across services.",
          "Log decisions and boundaries: what came in, which branch was taken, what went out. Not every intermediate step.",
        ],
      ],
      [
        "Levels that mean something",
        [
          "**error** — something failed and needs a human. If it does not, it is not an error.",
          "**warn** — degraded but handled; worth a dashboard, not a page.",
          "**info** — significant state changes and boundaries.",
          "**debug** — detail you would enable temporarily to investigate.",
          "If everything is `error`, alerts get muted and the level carries no information.",
        ],
      ],
      [
        "What to measure",
        [
          "Latency as a distribution, not an average — p50, p95, p99. An average hides the experience of your slowest users entirely.",
          "Rate, errors, duration per endpoint. Saturation for anything with a pool or queue.",
          "Business outcomes alongside technical ones: signups completed, payments succeeded.",
        ],
      ],
      [
        "Never log",
        [
          "Passwords, tokens, keys, full card numbers, or authorisation headers.",
          "Whole request bodies containing personal data.",
          "Anything you would not want in a screenshot pasted into a ticket.",
        ],
      ],
    ],
    traps: [
      "Logging inside a tight loop, producing gigabytes that cost money and hide the signal.",
      "Alerting on a symptom nobody can act on, which trains people to ignore alerts.",
      "Only averages, so a bad p99 is invisible.",
      "No correlation id, making a multi-service failure impossible to reconstruct.",
    ],
    done: "A production failure can be diagnosed from telemetry alone, without adding logging and waiting for it to recur.",
  },
  {
    slug: "database-migrations",
    cat: "Software Engineering",
    what: "Changes schemas without downtime or data loss",
    when: "writing a migration, altering a column, or deploying a schema change to a live system",
    roles: ["Engineer", "Tech Lead", "DBA"],
    sections: [
      [
        "The expand-contract sequence",
        [
          "Never change a column in one step while old code is running. Deploys are not atomic, so both versions run simultaneously.",
          "**Expand** — add the new column, nullable, with no constraint. Deploy.",
          "**Migrate** — backfill in batches, and have the application write to both. Deploy.",
          "**Contract** — once nothing reads the old column, drop it. Deploy.",
          "Each phase is independently reversible. A single-step rename is not.",
        ],
      ],
      [
        "Safe and unsafe operations",
        [
          "Safe: adding a nullable column, adding an index concurrently, adding a table.",
          "Unsafe on a live table: adding a NOT NULL column with no default, changing a type, renaming, adding a non-concurrent index — these take locks that block writes.",
          "Know your engine's specifics. What is instant on one database rewrites the whole table on another.",
        ],
      ],
      [
        "Backfills",
        [
          "Batch them. A single UPDATE across millions of rows holds locks and blows up replication lag.",
          "Make the backfill resumable and idempotent; it will be interrupted.",
          "Run it separately from the schema change, so a slow backfill does not block a deploy.",
        ],
      ],
      [
        "Before running anything",
        [
          "Confirm a backup exists and that you have actually restored from one recently.",
          "Write the rollback, and test it. A migration without a tested reverse is a one-way door.",
          "Estimate the row count and lock duration on production-sized data, not on your development copy.",
        ],
      ],
    ],
    traps: [
      "Renaming a column in one migration, breaking every running instance of the old code.",
      "A destructive migration with no backup verified beforehand.",
      "Assuming the migration will be fast because it was fast locally.",
      "Editing an already-applied migration instead of adding a new one.",
    ],
    done: "The change deploys with old and new code running together, the rollback is tested, and no step holds a long lock on a live table.",
  },
  {
    slug: "caching-strategy",
    cat: "Software Engineering",
    what: "Adds caching that speeds things up without serving wrong data",
    when: "introducing a cache, debugging stale data, or deciding what to cache and for how long",
    roles: ["Engineer", "Tech Lead"],
    sections: [
      [
        "Decide invalidation first",
        [
          "Caching is easy; invalidation is the whole problem. If you cannot say how an entry becomes stale, do not add the cache yet.",
          "Prefer a short TTL you can reason about over a clever invalidation scheme you cannot.",
          "Event-based invalidation is correct but needs every writer to participate — including migrations and admin tools.",
        ],
      ],
      [
        "Choose the layer deliberately",
        [
          "**In-process** — fastest, but each instance has its own copy, so invalidation must fan out.",
          "**Shared (Redis, Memcached)** — consistent across instances, at the cost of a network hop.",
          "**HTTP/CDN** — best for public, identical responses. Never for anything user-specific unless the cache key includes identity.",
          "Cache the expensive thing, not the cheap wrapper around it.",
        ],
      ],
      [
        "Keys",
        [
          "Include every input that changes the output — including locale, permissions and feature flags.",
          "Leaving identity out of a key is how one user sees another's data. This is the most serious caching bug.",
          "Version the key format so a deploy does not read entries written under different assumptions.",
        ],
      ],
      [
        "Failure behaviour",
        [
          "A cache miss must be correct, just slower. Never let the cache be the only source of truth.",
          "Handle the stampede: when a hot key expires, many requests recompute at once. Use a lock or serve stale while revalidating.",
          "The cache being down should degrade performance, not availability.",
        ],
      ],
    ],
    traps: [
      "Caching per-user data under a global key.",
      "Unbounded cache growth with no eviction policy.",
      "Caching an error response, turning a transient failure into a persistent one.",
      "Adding a cache to hide a missing index instead of adding the index.",
    ],
    done: "Every cached entry has a defined lifetime and invalidation path, keys include all inputs affecting the result, and a cache outage only costs speed.",
  },

  /* ---------------------------------------------------------------- Security */
  {
    slug: "threat-modelling",
    cat: "Security",
    what: "Identifies what an attacker would target before code is written",
    when: "designing a feature that handles sensitive data, money or permissions, or planning a security review",
    roles: ["Security Engineer", "Architect", "Tech Lead"],
    sections: [
      [
        "Four questions, in order",
        [
          "**What are we building?** Draw the data flow: entry points, trust boundaries, data stores, external calls. You cannot threat-model a system you cannot diagram.",
          "**What can go wrong?** Walk each boundary and ask how it could be abused.",
          "**What are we doing about it?** Decide per threat: mitigate, transfer, accept, or eliminate.",
          "**Did we do a good job?** Revisit when the design changes.",
        ],
      ],
      [
        "Prompts that surface real threats",
        [
          "**Spoofing** — can someone claim to be another user or service?",
          "**Tampering** — can data be modified in transit or at rest?",
          "**Repudiation** — could someone deny an action with no evidence to contradict them?",
          "**Information disclosure** — what leaks through errors, logs, timing or metadata?",
          "**Denial of service** — what is unbounded and cheap for an attacker to trigger?",
          "**Elevation of privilege** — how does a normal user become an admin?",
        ],
      ],
      [
        "Rank by expected cost",
        [
          "Likelihood times impact. A trivial-to-exploit information leak usually outranks a hard-to-reach remote execution path.",
          "Weight anything reachable without authentication far higher — the attacker pool is the entire internet.",
          "Note explicitly what you are choosing to accept, and why. An undocumented accepted risk becomes a surprise later.",
        ],
      ],
    ],
    traps: [
      "Modelling only the happy path, so abuse cases never surface.",
      "Treating internal services as trusted, which fails the moment one is compromised.",
      "Producing a long list with no ranking, which gets ignored wholesale.",
      "Threat-modelling once at design time and never revisiting it.",
    ],
    done: "Trust boundaries are drawn, threats are enumerated per boundary and ranked, and each has a decision recorded — including the accepted ones.",
  },
  {
    slug: "secrets-management",
    cat: "Security",
    what: "Keeps credentials out of code and limits the damage when one leaks",
    when: "handling API keys or credentials, reviewing a config change, or responding to a leaked secret",
    roles: ["Security Engineer", "Engineer", "SRE"],
    sections: [
      [
        "Where secrets belong",
        [
          "In a secret manager, injected as environment variables at runtime. Never in source, never in a committed config file, never in a container image layer.",
          "Reference them indirectly — a URI resolved at start-up — so the value never appears in a repository or a log.",
          "`.env` files are for local development only, and must be gitignored from the first commit rather than added later.",
        ],
      ],
      [
        "Scope and rotation",
        [
          "One credential per service per environment. A single shared key means one leak compromises everything and rotation breaks everything at once.",
          "Grant the narrowest scope that works. Read-only where reading is all that happens.",
          "Set expiry. A credential that never expires is one that never gets rotated.",
        ],
      ],
      [
        "When one leaks",
        [
          "Revoke first, investigate second. Every minute of delay is exposure.",
          "Assume it was used. Check logs for activity from unexpected addresses and times.",
          "Removing the commit does not help — it is in the reflog, in forks, and in anything that mirrored the repository. Rotate.",
          "Then fix the process that allowed it: a pre-commit scanner, or a review checklist.",
        ],
      ],
    ],
    traps: [
      "Committing a secret and then deleting it in a later commit, which leaves it in history.",
      "Logging an entire config object, secrets included.",
      "Passing secrets as command-line arguments, where any process can read them.",
      "Sharing production credentials in chat, which puts them in a searchable archive forever.",
    ],
    done: "No secret appears in source or logs, each is scoped and expiring, and there is a tested revocation path.",
  },
  {
    slug: "authentication-design",
    cat: "Security",
    what: "Implements sign-in, sessions and password handling without common flaws",
    when: "building or reviewing authentication, session handling, or a password reset flow",
    roles: ["Security Engineer", "Engineer", "Tech Lead"],
    sections: [
      [
        "Passwords",
        [
          "Hash with a memory-hard algorithm designed for the purpose — Argon2id, scrypt or bcrypt. Never a general-purpose hash, however many times you apply it.",
          "Never impose a maximum length or restrict character classes. Length is the strongest factor.",
          "Check against known-breached password lists rather than enforcing arbitrary composition rules.",
        ],
      ],
      [
        "Sessions and tokens",
        [
          "Set `HttpOnly`, `Secure` and `SameSite` on session cookies. A token readable by JavaScript is a token stolen by any XSS.",
          "Rotate the session identifier on privilege change — sign-in, elevation — to prevent fixation.",
          "Invalidate server-side on logout and on password change. A stateless token that cannot be revoked is a liability.",
          "Keep access tokens short-lived and refresh tokens rotating with reuse detection.",
        ],
      ],
      [
        "Flows that leak",
        [
          "Return the same response and take the same time whether or not an account exists — for sign-in, reset and registration alike.",
          "Reset tokens must be single-use, short-lived, and tied to one account.",
          "Compare tokens with a constant-time function. A short-circuiting comparison leaks the value one byte at a time.",
          "Rate-limit per account and per address, and lock progressively rather than permanently.",
        ],
      ],
    ],
    traps: [
      "Rolling your own crypto or token format when a reviewed library exists.",
      "Different error messages for wrong password versus unknown user, enumerating your user base.",
      "Long-lived tokens with no revocation path.",
      "Storing a password reset token in plaintext, so a database read is account takeover.",
    ],
    done: "Passwords are hashed with a memory-hard function, sessions rotate and revoke, and no flow reveals whether an account exists.",
  },
  {
    slug: "input-validation",
    cat: "Security",
    what: "Validates and encodes untrusted input at the right boundaries",
    when: "handling user input, reviewing a request handler, or fixing an injection vulnerability",
    roles: ["Security Engineer", "Engineer"],
    sections: [
      [
        "Validate at the edge, encode at the sink",
        [
          "These are two separate jobs. Validation decides whether to accept; encoding makes data safe for a specific destination.",
          "Validate once at the boundary against an explicit schema, then trust the parsed shape internally.",
          "Encode at every sink, correctly for that sink: SQL parameters, HTML escaping, shell argument arrays, URL encoding. The right encoding for one is wrong for another.",
        ],
      ],
      [
        "Allowlists over denylists",
        [
          "Define what is acceptable, not what is forbidden. A denylist is a list of attacks you have thought of.",
          "Constrain type, length, format and range. An unbounded string field is a denial-of-service vector.",
          "For enums, compare against the known set — never interpolate the value.",
        ],
      ],
      [
        "The sinks that matter",
        [
          "**SQL** — parameterised queries only. String building is unsafe no matter how careful the escaping.",
          "**Shell** — pass an argument array, never a constructed command string.",
          "**Filesystem** — resolve the path and confirm it stays within the allowed root; `../` traversal is trivial otherwise.",
          "**HTML** — escape by context. Attribute, text node and script contexts have different rules.",
          "**Redirects** — validate the target against an allowlist, or you have an open redirect.",
        ],
      ],
    ],
    traps: [
      "Validating on the client only, which is a usability feature and not a security control.",
      "Sanitising by stripping characters, which mangles legitimate input and misses encoded variants.",
      "Trusting data read back from your own database — it was user input once.",
      "One escaping function applied everywhere regardless of destination.",
    ],
    done: "Every entry point validates against an explicit schema, and every sink encodes for its own context.",
  },
  {
    slug: "access-control",
    cat: "Security",
    what: "Enforces authorisation consistently so users cannot reach each other's data",
    when: "adding permissions, reviewing an endpoint's authorisation, or investigating a data exposure",
    roles: ["Security Engineer", "Engineer", "Tech Lead"],
    sections: [
      [
        "Check ownership, not just identity",
        [
          "Being signed in is not permission to act on a specific record. Every object access must verify the caller owns or may reach that object.",
          "Scope queries by tenant at the data layer: `where organisationId = session.org`. Filtering after fetching is one forgotten line away from a leak.",
          "This class of bug — an id in the request returning someone else's data — is the most common serious vulnerability in web applications.",
        ],
      ],
      [
        "Enforce server-side, in one place",
        [
          "Hiding a button is presentation, not authorisation. Every endpoint must check independently.",
          "Centralise the decision — a policy function or middleware — so a new endpoint cannot silently omit it.",
          "Default to denying. A permission check that returns `true` when the rule is unrecognised will eventually be reached.",
        ],
      ],
      [
        "Cover every verb",
        [
          "Read, create, update, delete and list are five separate checks. Teams commonly secure create and forget delete.",
          "Check bulk and export paths too — they are the highest-impact leak and the least reviewed.",
          "Verify nested resources against the parent, not only themselves.",
        ],
      ],
    ],
    traps: [
      "Trusting a client-supplied role, tenant or user id from the request body.",
      "Authorising the list endpoint but not the detail endpoint.",
      "Cache keys that omit identity, serving one user's data to another.",
      "An admin bypass with no audit trail.",
    ],
    done: "Every endpoint and every verb checks authorisation server-side, queries are tenant-scoped at the data layer, and the default is deny.",
  },
  {
    slug: "vulnerability-triage",
    cat: "Security",
    what: "Assesses reported vulnerabilities and scanner output by reachability and impact",
    when: "triaging a security report, reviewing scanner findings, or prioritising a backlog of CVEs",
    roles: ["Security Engineer", "Tech Lead"],
    sections: [
      [
        "Establish reachability first",
        [
          "A CVE in an installed package matters only if the vulnerable code path is reachable from your application. Check before scheduling work.",
          "Ask three things: is the vulnerable function called, can untrusted input reach it, and is the required precondition present.",
          "Record the reasoning when you close something as unreachable. The next person will ask.",
        ],
      ],
      [
        "Score by your context, not the headline",
        [
          "A published CVSS score describes a generic deployment. Yours differs — an internal-only service and a public endpoint do not share a risk profile.",
          "Adjust for exposure, authentication requirement, and what the vulnerable component can reach.",
          "Escalate anything unauthenticated and remote regardless of its published score.",
        ],
      ],
      [
        "Respond proportionately",
        [
          "**Exploited in the wild** — patch now, out of band.",
          "**Reachable, unauthenticated** — patch this cycle.",
          "**Reachable, authenticated** — schedule normally.",
          "**Unreachable** — record the assessment and revisit when the code changes.",
          "When no patch exists, mitigate: disable the feature, add a control at the boundary, or restrict access.",
        ],
      ],
    ],
    traps: [
      "Passing raw scanner output to engineers as a work list, which floods the backlog and trains people to ignore it.",
      "Dismissing findings as false positives without checking reachability.",
      "Patching the direct dependency while the vulnerable transitive one stays pinned.",
      "No re-check after the fix, so a failed upgrade goes unnoticed.",
    ],
    done: "Each finding has a reachability verdict with reasoning, a context-adjusted severity, and either a fix, a mitigation or a recorded acceptance.",
  },

  /* --------------------------------------------------------- Cloud & DevOps */
  {
    slug: "ci-cd-pipelines",
    cat: "Cloud & DevOps",
    what: "Builds pipelines that catch problems early and deploy predictably",
    when: "setting up or fixing CI, adding a deployment stage, or diagnosing a slow or flaky pipeline",
    roles: ["SRE", "Engineer", "DevOps Engineer"],
    sections: [
      [
        "Order stages by cost",
        [
          "Fast and cheap first: lint, typecheck, unit tests. Slow and expensive last: integration, end-to-end, deploy.",
          "Fail fast — there is no value in running a twenty-minute suite when the build does not compile.",
          "Run independent stages in parallel, but keep the dependency graph honest so nothing races.",
        ],
      ],
      [
        "Make it reproducible",
        [
          "Install from the lockfile only. A pipeline that resolves fresh versions is not testing what you will ship.",
          "Pin tool and image versions, including the runner image. `latest` turns someone else's release into your outage.",
          "The same artifact should move through every environment. Rebuilding per environment means you deploy something you never tested.",
        ],
      ],
      [
        "Deployment",
        [
          "Deploy the artifact, not the source. Build once, promote the result.",
          "Make rollback a single action, and rehearse it — an untested rollback is not a rollback plan.",
          "Health-check after deploying and roll back automatically on failure, rather than waiting for a user report.",
        ],
      ],
      [
        "Secrets and permissions",
        [
          "Use the platform's secret store; never echo secrets, and be aware that a debug flag can print an entire environment.",
          "Give the pipeline the narrowest credentials it needs. CI credentials are a frequent lateral-movement path.",
          "Do not expose secrets to pull-request builds from forks.",
        ],
      ],
    ],
    traps: [
      "A pipeline so slow people bypass it, which makes it worthless.",
      "Flaky tests retried until green, which hides real intermittent bugs.",
      "Caching so aggressively that a stale cache makes a broken build pass.",
      "Deploy steps that only exist in one person's shell history.",
    ],
    done: "The pipeline is reproducible from the lockfile, fails fast, promotes a single artifact, and rollback has been tested.",
  },
  {
    slug: "infrastructure-as-code",
    cat: "Cloud & DevOps",
    what: "Manages infrastructure declaratively so environments are reproducible and reviewable",
    when: "writing or reviewing Terraform or similar, or reconciling drift between config and reality",
    roles: ["SRE", "DevOps Engineer", "Architect"],
    sections: [
      [
        "Declare, never click",
        [
          "Any change made in a console is invisible to the next person and lost on the next apply. If it is not in code, it does not exist.",
          "Review the plan before every apply. The plan is the diff; applying without reading it is committing blind.",
          "Treat drift as a defect: either bring reality back to the code, or bring the code up to date deliberately.",
        ],
      ],
      [
        "State",
        [
          "Store state remotely with locking. Two concurrent applies against local state will corrupt it.",
          "State contains secrets in plaintext. Encrypt it and restrict access as tightly as production.",
          "Never edit state by hand except as a last resort, and back it up first.",
        ],
      ],
      [
        "Structure",
        [
          "Separate environments by directory or workspace, never by a commented-out variable.",
          "Modules for genuinely repeated patterns only. A module wrapping one resource adds indirection for nothing.",
          "Keep blast radius small: separate state per environment, and per system where it makes sense, so one mistake cannot destroy everything.",
        ],
      ],
    ],
    traps: [
      "A resource that will be destroyed and recreated rather than updated — read the plan for `forces replacement`.",
      "Hardcoded account ids, regions or ARNs, which make the code unusable elsewhere.",
      "Committing state or a `.tfvars` file containing secrets.",
      "One giant state file, where an unrelated change risks the entire estate.",
    ],
    done: "Every resource is declared, the plan was read before applying, state is remote and locked, and no environment differs from its code.",
  },
  {
    slug: "container-images",
    cat: "Cloud & DevOps",
    what: "Builds container images that are small, cacheable and safe to run",
    when: "writing or reviewing a Dockerfile, reducing image size, or hardening a container",
    roles: ["SRE", "Engineer", "DevOps Engineer"],
    sections: [
      [
        "Layer order for caching",
        [
          "Copy dependency manifests and install before copying source. Otherwise every source edit reinstalls everything.",
          "Order instructions from least to most frequently changing. A cache miss invalidates every layer after it.",
          "Combine related shell commands in one `RUN`, cleaning up within the same layer — deleting a file in a later layer does not shrink the image.",
        ],
      ],
      [
        "Keep it small",
        [
          "Multi-stage builds: compile in a full image, copy only the artifact into a minimal runtime.",
          "Use a slim or distroless base. Fewer packages means both a smaller image and a smaller attack surface.",
          "Add a `.dockerignore`. Without one you ship `node_modules`, `.git` and local env files into the build context.",
        ],
      ],
      [
        "Run safely",
        [
          "Create and use a non-root user. A container process running as root that escapes is root on the host.",
          "Never bake secrets in. They persist in the layer history even if a later step deletes them.",
          "Pin base images by digest for anything you deploy — a moving tag means an unreviewed change.",
          "Declare a healthcheck so the orchestrator knows the difference between running and working.",
        ],
      ],
    ],
    traps: [
      "`COPY . .` before installing dependencies, defeating the layer cache entirely.",
      "`ADD` with a URL, which silently fetches unverified content at build time.",
      "Using `latest`, which makes builds unreproducible.",
      "Installing debugging tools in a production image and leaving them there.",
    ],
    done: "The image builds reproducibly, caches on dependency changes only, runs as a non-root user, contains no secrets, and pins its base by digest.",
  },
  {
    slug: "incident-response",
    cat: "Cloud & DevOps",
    what: "Restores service during an outage, then learns from it without blame",
    when: "a service is degraded or down, or writing a post-incident review",
    roles: ["SRE", "Engineer", "Engineering Manager"],
    sections: [
      [
        "Mitigate before diagnosing",
        [
          "The first objective is restoring service, not understanding the cause. Roll back, fail over, disable the feature — then investigate with the pressure off.",
          "If a recent deploy correlates, revert it first. Being wrong about the cause costs a deploy; being slow costs the outage.",
          "Resist the urge to fix forward under pressure. A rushed patch during an incident frequently makes it worse.",
        ],
      ],
      [
        "Run it deliberately",
        [
          "Name one coordinator. Without one, three people investigate the same thing and nobody talks to stakeholders.",
          "Keep a timestamped log as you go: what you observed, what you changed, what happened. Memory is unreliable afterwards and this becomes the review.",
          "Communicate on a schedule even when there is nothing new. Silence reads as nobody working on it.",
          "Change one thing at a time, and say what you are about to do before doing it.",
        ],
      ],
      [
        "Afterwards",
        [
          "Write it up while it is fresh, focused on the system rather than the person. \"The deploy had no health gate\" is actionable; \"someone deployed carelessly\" is not.",
          "Establish the timeline, the contributing factors, and what made detection or recovery slow.",
          "Produce a small number of owned, dated actions. A review with twenty unassigned items changes nothing.",
        ],
      ],
    ],
    traps: [
      "Debugging in production while users are affected instead of rolling back.",
      "No single coordinator, so effort is duplicated and stakeholders hear nothing.",
      "A review that identifies a person as the root cause, which stops people reporting problems.",
      "Actions with no owner or date, which are never done.",
    ],
    done: "Service is restored, a timeline exists, contributing factors are identified, and each action has an owner and a date.",
  },
  {
    slug: "monitoring-and-alerting",
    cat: "Cloud & DevOps",
    what: "Defines alerts that fire on real user impact and stay quiet otherwise",
    when: "setting up alerts, tuning noisy pages, or deciding what to monitor for a new service",
    roles: ["SRE", "Engineer"],
    sections: [
      [
        "Alert on symptoms, not causes",
        [
          "Page on what users experience: error rate, latency, failed checkouts. High CPU is only worth an alert if it causes one of those.",
          "Every page must be actionable. If the responder's only option is to wait, it should be a dashboard, not a page.",
          "Set thresholds from your objective, not from a round number that looked reasonable.",
        ],
      ],
      [
        "Reduce noise deliberately",
        [
          "Require a duration — a threshold crossed for five minutes, not a single spike.",
          "Alert on rate of change for slow-burning problems like disk fill, so you are warned with time to act.",
          "Group related alerts. One incident should page once, not thirty times.",
          "Delete alerts nobody acts on. An ignored alert trains people to ignore all of them, including the real one.",
        ],
      ],
      [
        "What every service needs",
        [
          "Availability from outside — an external check, since a service cannot report that it is unreachable.",
          "Error rate and latency percentiles per endpoint.",
          "Saturation for every pool and queue: connections, workers, disk, memory.",
          "Freshness for anything asynchronous — a queue that silently stops is invisible to error-rate alerting.",
        ],
      ],
    ],
    traps: [
      "Alerting on every metric available, which produces fatigue and guarantees a missed real incident.",
      "Thresholds on averages, so a bad p99 never fires.",
      "No alert on the absence of events — a stopped cron job looks exactly like success.",
      "Pages with no runbook, so the responder starts from nothing at 3am.",
    ],
    done: "Every alert maps to user impact, has a duration condition, and links a runbook. Anything not acted on has been deleted.",
  },
];
