/**
 * Skill content, kept apart from the generator that writes it.
 *
 * Each entry is the whole skill: the description an agent reads when deciding
 * whether to load it, and the body it reads once loaded. Written to the same
 * standard as the hand-authored skills — concrete, opinionated, and about the
 * decisions a practitioner actually faces.
 */

export const SKILLS = [
  /* ------------------------------------------------ Data & Analytics */
  {
    name: "sql-query-design",
    category: "Data & Analytics",
    roles: ["Data Analyst", "Data Engineer", "Analytics Engineer"],
    description:
      "Writes SQL that stays correct as data grows and stays readable when someone else inherits it. Use when writing analytical queries, debugging a wrong number, or reviewing someone else's SQL.",
    body: `
# SQL Query Design

## Get the grain right before anything else

Every query has a grain: one row per what? One row per order, per order line, per customer per day. Say it out loud before writing a line.

Most wrong numbers are a grain mistake. A join to a table with multiple matching rows silently multiplies your measures, and \`SUM(revenue)\` doubles without any error.

After every join, ask whether the grain changed. If it did and you did not intend it, aggregate before joining rather than after.

## Filter in the right place

A condition in \`WHERE\` on the right side of a \`LEFT JOIN\` silently converts it to an inner join. Put it in the \`ON\` clause if you meant to keep unmatched rows.

\`WHERE\` filters rows before aggregation; \`HAVING\` filters groups after. Using \`HAVING\` for a row condition works but scans far more than it needs to.

## NULL behaves differently from everything else

\`NULL = NULL\` is not true. Use \`IS NULL\`, or \`IS DISTINCT FROM\` when comparing nullable columns.

\`NOT IN\` with a NULL anywhere in the subquery returns no rows at all. Use \`NOT EXISTS\`, which handles NULLs the way you expect.

Aggregates skip NULLs, so \`AVG(x)\` over ten rows with three NULLs divides by seven. Sometimes that is right; decide rather than discover it.

## CTEs for readability, with a caveat

Name each step after what it produces: \`monthly_active\`, not \`cte2\`. A reader should follow the query without holding it all at once.

Be aware that some engines materialise CTEs and some inline them. A CTE referenced three times may be computed three times, or once — check your engine before assuming either.

## Window functions instead of self-joins

Running totals, rank within group, previous row: these are window functions, not correlated subqueries. \`SUM(x) OVER (PARTITION BY customer ORDER BY date)\` replaces a join that scales badly.

\`ROW_NUMBER()\` deduplicates cleanly: number the partition, keep row 1. Prefer it to \`DISTINCT ON\` when you need portability.

## Watch out for

- \`SELECT *\` in anything permanent — a new upstream column silently changes your output shape.
- Comparing a timestamp to a date, which drops everything after midnight on the last day.
- Implicit type casts in joins, which quietly disable index use.
- Reusing a column alias in \`WHERE\`, which most engines reject and the rest evaluate unpredictably.
- Assuming row order without \`ORDER BY\`. There is no default order, whatever you observed yesterday.

## Finishing

State the grain in a comment at the top. Verify one row by hand against the source. A reviewer can tell what the query counts without running it.
`,
  },
  {
    name: "data-modelling",
    category: "Data & Analytics",
    roles: ["Data Engineer", "Analytics Engineer", "Architect"],
    description:
      "Designs warehouse schemas that answer tomorrow's questions without a rewrite. Use when modelling a new source, designing fact and dimension tables, or untangling a schema nobody can query.",
    body: `
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
`,
  },
  {
    name: "experiment-design",
    category: "Data & Analytics",
    roles: ["Data Analyst", "Growth Marketer", "Product Manager"],
    description:
      "Designs A/B tests that produce a decision rather than an argument. Use when planning an experiment, sizing a sample, or interpreting a result that looks too good.",
    body: `
# Experiment Design

## Decide what would change your mind, first

Write the decision before the test: "if conversion lifts by 2% or more, we ship; below that, we do not." An experiment without a pre-committed threshold becomes a search for a favourable slice.

State the primary metric — one — and the guardrail metrics that must not degrade. Everything else is exploratory and cannot justify shipping on its own.

## Size the sample before starting

Effect size, baseline rate, power and significance determine sample size. Fix three and the fourth follows; there is no way around the arithmetic.

If the required sample exceeds your traffic in a reasonable window, the test cannot answer the question. Test something with a larger expected effect, or accept a slower cadence, but do not run it underpowered and interpret the result anyway.

Small effects need enormous samples. A 1% relative lift on a 3% baseline is a months-long test for most products.

## Do not peek

Checking significance repeatedly and stopping at the first \`p < 0.05\` inflates the false positive rate dramatically — well past one in three with frequent looks.

Either fix the duration in advance and look once, or use a method built for continuous monitoring (sequential testing, Bayesian with a decision rule). Do not mix the two.

## Randomise the right unit

Randomise by the unit that experiences the change. User-level for anything they notice across sessions; session-level only when the change genuinely cannot leak between sessions.

Watch for interference: marketplace and social features let the treatment group affect the control group, and the measured difference understates or invents an effect.

## Read the result honestly

A non-significant result is not "no effect". It means the test could not detect one at this sample size. Report the confidence interval, which shows what effects remain plausible.

Significance is not size. A statistically significant 0.1% lift may not be worth the complexity it adds.

Check the randomisation actually worked: sample ratio mismatch — arms not splitting as configured — invalidates the test regardless of how good the result looks.

## Watch out for

- Segmenting after the fact until something is significant. With twenty segments, one will be.
- Novelty effects, where any change lifts metrics briefly. Run long enough to see it decay.
- Ignoring the guardrails because the primary metric won.
- Comparing this week's treatment to last week's baseline. That is not a controlled experiment.

## Finishing

The decision rule was written before the data. The sample was sized in advance. The result reports an interval, not just a verdict.
`,
  },
  {
    name: "metric-definition",
    category: "Data & Analytics",
    roles: ["Data Analyst", "Product Manager", "Analytics Engineer"],
    description:
      "Defines metrics precisely enough that two teams compute the same number. Use when a metric is disputed, when building a dashboard, or when 'active users' means three different things.",
    body: `
# Metric Definition

## A metric is a definition, not a name

"Active users" is not a metric. "Distinct users with at least one session of 30 seconds or longer, in the trailing 7 days, in UTC, excluding internal accounts" is.

Every ambiguity you leave gets resolved differently by each person who queries it, and the meeting becomes about whose number is right.

## Write the four parts

**Population** — who counts. Excluded: internal, test, bot, churned?

**Event** — what they must do, and how it is detected.

**Window** — over what period, in which timezone, aligned to what boundary.

**Aggregation** — count, distinct count, sum, rate. If a rate, state both numerator and denominator.

Miss one and the metric is underspecified.

## Choose denominators carefully

A conversion rate over "all visitors" and over "visitors who reached checkout" tell different stories, and both are honest. The wrong one is the one you did not name.

When a rate moves, always check whether the numerator or denominator caused it. A rising conversion rate from collapsing traffic is not good news.

## Decide how late data is handled

Events arrive late. Does the number for last Tuesday change when you rerun it on Friday?

Either freeze the window after a stated lag, or make it explicit that recent days are provisional. Silent restatement destroys trust faster than a slow number.

## One definition, one place

The definition belongs in a metrics layer or a documented view that every dashboard reads. Copies in six dashboards diverge within a quarter.

If two teams genuinely need different definitions, give them different names. \`active_users_product\` and \`active_users_billing\` argue less than two things both called "active users".

## Watch out for

- Averages over skewed data. Report a median and a percentile too, or the mean will mislead.
- Metrics that only ever go up — cumulative counts hide whether things are getting better.
- Ratios of ratios, which are almost never what someone wants.
- Timezone drift between the event timestamp and the reporting window, which shifts daily numbers by hours.

## Finishing

The definition names population, event, window and aggregation. It lives in one place. Two people querying independently get the same number.
`,
  },
  {
    name: "dashboard-design",
    category: "Data & Analytics",
    roles: ["Data Analyst", "Analytics Engineer", "Product Designer"],
    description:
      "Builds dashboards people act on rather than glance at. Use when creating a dashboard, cutting one that has grown unreadable, or deciding what belongs on a screen.",
    body: `
# Dashboard Design

## Answer one question per dashboard

A dashboard that serves marketing, finance and engineering serves none of them. Each audience skims past two-thirds of it and stops trusting the rest.

Name the dashboard after the question: "Are signups healthy this week?" not "Growth Metrics".

## Lead with the number that triggers action

The top-left is the most-read space on the screen. Put the metric that would make someone do something there, with its comparison — versus last week, versus target.

A number without a reference point cannot be interpreted. 4,182 signups is neither good nor bad until you say what it usually is.

## Show change, not just level

Most decisions come from a trend, not a snapshot. A sparkline beside a number costs almost no space and turns it from a fact into a signal.

Pick the comparison that matches the metric's natural cycle. Week-over-week for anything with a weekday pattern; year-over-year for anything seasonal.

## Cut relentlessly

Every chart that has never changed a decision is costing attention that the important ones need.

If someone asks for "just one more chart", ask what they would do differently based on it. Usually the answer reveals the chart belongs in an analysis, not a dashboard.

## Make the definition reachable

Every metric needs a way to see how it is computed — a tooltip, a link, a description. Without it, the first question about any surprising number is "what does this actually measure?", and the dashboard stalls.

## Watch out for

- Dual axes, which can be arranged to imply any correlation you like.
- Pie charts with more than about four slices; a bar chart is easier to read and orders itself.
- Truncated y-axes that turn a 2% move into a cliff. Start at zero unless you say clearly that you have not.
- Filters defaulted to a state nobody uses, so everyone sees the wrong thing first.
- Red and green as the only signal, which excludes a meaningful share of readers.

## Finishing

The dashboard answers one named question. The top metric has a comparison. Every chart on it has changed a decision at least once.
`,
  },
  {
    name: "data-quality-checks",
    category: "Data & Analytics",
    roles: ["Data Engineer", "Analytics Engineer", "Data Analyst"],
    description:
      "Catches broken data before a dashboard does. Use when building a pipeline, after a silent data incident, or when deciding what to assert on a table.",
    body: `
# Data Quality Checks

## Assert what must be true, not what happens to be

A test that says "this table has more than 1,000 rows" passes forever and catches nothing. A test that says "order_id is unique and never null" fails the moment a join goes wrong.

Write assertions from the model's contract: keys, relationships, ranges, allowed values.

## The four checks worth having everywhere

**Uniqueness** on the primary key. Duplicates are the most common cause of inflated measures.

**Not null** on keys and anything a join depends on.

**Referential integrity** — every foreign key exists in the dimension. Orphans silently disappear from inner joins.

**Freshness** — the newest row is younger than the pipeline's promise. A stale table looks perfectly healthy otherwise.

## Row count deltas beat absolute thresholds

Data volumes drift, so fixed bounds either fire constantly or never. Compare against the trailing average and alert on a large relative change in either direction.

A sudden drop matters as much as a spike: it usually means an upstream filter changed.

## Distribution checks catch what row counts miss

A column can be complete, unique and entirely wrong. Watch the share of nulls, the set of distinct values, and the mean of key measures.

A new enum value appearing upstream is invisible to row counts and breaks every \`CASE\` statement that did not expect it.

## Fail loudly, and stop the pipeline

A warning nobody reads is not a check. Decide per assertion whether a failure blocks downstream tables or merely notifies — and make blocking the default for anything a dashboard reads.

Serving stale-but-correct data is almost always better than serving fresh-but-wrong data.

## Watch out for

- Testing the transformation instead of the data. Both matter, but a passing unit test says nothing about today's input.
- Alerts that fire on every seasonal weekend dip, which train people to ignore them.
- Checks only at the end of the pipeline, so you learn something broke but not where.
- Sampling for checks on the exact tables where rare bad rows do the damage.

## Finishing

Keys are asserted unique and non-null. Freshness is monitored. A failure stops the pipeline rather than emailing someone.
`,
  },

  /* ------------------------------------------------ Sales & Marketing */
  {
    name: "positioning",
    category: "Sales & Marketing",
    roles: ["Growth Marketer", "Product Marketer", "Founder"],
    description:
      "Decides what a product is, for whom, and instead of what. Use when a message is not landing, when entering a new segment, or when everyone describes the product differently.",
    body: `
# Positioning

## Positioning is a choice about competition

Position is not a slogan. It is the answer to "what would they use if we did not exist?" — because that alternative is what every claim is judged against.

The alternative is often a spreadsheet, an agency, or doing nothing. Naming it wrong makes every downstream message wrong: you argue against a competitor while the buyer is weighing whether to bother at all.

## Start from the capability that is hard to copy

List what you do that the alternative cannot. Discard everything that a determined competitor could ship this quarter — that is a feature, not a position.

What remains is usually one or two things. Build the position on those and let the rest be supporting detail.

## Segment by problem, not by demographic

"Mid-market SaaS companies" is a billing category, not a segment. "Teams whose release process spans three tools and breaks at handoff" is a segment, because it names a shared problem you can address.

The best segment is the one where your hard-to-copy capability matters most, not the largest one.

## Say what you are not

A position that excludes nothing communicates nothing. "Not for enterprises with dedicated ops teams" makes the fit obvious to everyone else and saves sales time.

Buyers trust a product that turns business away far more than one that claims to fit everyone.

## Test it with the words buyers use

Read your positioning back using only vocabulary you have heard from customers. Every word you had to invent is a word that will need explaining in every conversation.

If a sentence needs a diagram, it is not positioning yet.

## Watch out for

- Positioning against a competitor's weakness they will fix, which dates your message.
- Category creation, which is expensive and usually unnecessary — most products win inside an existing category.
- Feature lists standing in for a position. A longer list is not a stronger claim.
- Changing position every quarter. Positioning compounds only if it holds still.

## Finishing

One sentence names the segment, the alternative, and the capability. Everyone on the team says roughly the same thing unprompted.
`,
  },
  {
    name: "landing-page-copy",
    category: "Sales & Marketing",
    roles: ["Growth Marketer", "Product Marketer", "Copywriter"],
    description:
      "Writes landing pages that convert attention into action. Use when launching a page, rewriting one that is not converting, or reviewing copy before it ships.",
    body: `
# Landing Page Copy

## The headline earns the next five seconds

A visitor decides whether to keep reading from the headline alone. It should state the outcome they want, in their words, not what the product is.

"Ship on Fridays without fear" beats "CI/CD automation platform" for the same product, because the first names a feeling the reader already has.

Avoid cleverness that requires the subhead to explain the joke.

## Match the message to the source

Someone arriving from a pricing comparison and someone arriving from a technical blog post want different first sentences. A single generic page underperforms both.

The strongest lift usually comes from message match, not from button colour.

## One page, one action

Every additional call to action divides attention. Pick the single next step, repeat it, and make every other link secondary.

If you genuinely have two audiences with two actions, that is two pages.

## Specifics beat adjectives

"Fast" is a claim. "Deploys in 40 seconds" is evidence. Numbers, names and screenshots are believed; superlatives are discounted.

Replace every "powerful", "seamless" and "world-class" with the fact that made you want to write it.

## Handle the objection where it arises

The reader's doubt has an order: does this solve my problem, will it work for my setup, what does it cost, what if I am wrong. Answer each where it appears, not all at the bottom.

Pricing hidden behind a form reads as expensive. If you cannot publish a number, publish the shape.

## Watch out for

- Social proof that proves the wrong thing — a logo wall of companies unlike the reader.
- Testimonials that praise the company instead of describing a result.
- Hero images of abstract dashboards nobody can read.
- Long forms above the fold. Ask for the minimum the next step needs.
- Copy written for the founder's pride rather than the reader's problem.

## Finishing

The headline names an outcome. One action repeats down the page. Every claim has a specific behind it.
`,
  },
  {
    name: "email-sequences",
    category: "Sales & Marketing",
    roles: ["Growth Marketer", "Sales Lead", "Copywriter"],
    description:
      "Designs lifecycle and outreach email that gets read rather than filtered. Use when building onboarding email, a nurture sequence, or cold outreach.",
    body: `
# Email Sequences

## Earn the open before the click

The subject line and the first visible sentence are the entire pitch in most inboxes. Preview text is real estate — set it deliberately rather than letting it repeat the first line.

Specific and plain outperforms clever. "Your three unfinished imports" gets opened; "Unlock your potential" does not.

## Behaviour beats schedule

A sequence timed purely by day count sends the wrong message to most people on it. Trigger on what the person did or failed to do: signed up but never invited anyone, imported data but never queried it.

The best onboarding email arrives because of a gap in what they have done, and names that gap.

## One idea, one action

An email with four links gets no clicks. Decide the single next action and remove everything competing with it.

Length matters less than focus. A long email about one thing outperforms a short email about three.

## Write to one person

Address the reader as an individual with a specific problem. "Teams like yours" is a mass-mail tell; "you imported 4,000 rows last week and have not built a report" is not.

For outreach, personalisation must reference something real. A merge field in a generic template is worse than no personalisation, because it advertises the automation.

## Make leaving easy

A visible unsubscribe reduces spam complaints, which protect deliverability far more than the marginal subscriber is worth.

Offer a frequency reduction as well as a full unsubscribe — many people want less, not none.

## Watch out for

- Sending from a no-reply address, which tells the reader the relationship is one-way.
- Image-only emails, which break with images off and score badly with filters.
- Reusing the same subject formula until it stops working, then blaming the audience.
- Ignoring reply handling on an automated sequence; a real reply deserves a person.
- Sending to an unengaged list, which damages deliverability for everyone else.

## Finishing

Each email has one action. Triggers are behavioural. A reply reaches a human.
`,
  },
  {
    name: "customer-interviews",
    category: "Sales & Marketing",
    roles: ["Product Manager", "Growth Marketer", "Researcher", "Founder"],
    description:
      "Runs interviews that surface what people actually do rather than what they say they would. Use when validating a problem, before building, or when feedback is contradictory.",
    body: `
# Customer Interviews

## Ask about the past, not the future

"Would you use this?" produces polite agreement and no information. People are poor predictors of their own behaviour and generous to someone who built something.

Ask what they did: "Walk me through the last time this came up. What did you do?" A story about last Tuesday is evidence; an opinion about next quarter is not.

## Look for evidence of cost

The strongest signal is that someone already spent something on the problem — time, money, or a workaround they maintain. A spreadsheet held together with macros is a stronger buying signal than enthusiasm.

If nobody has done anything about the problem, it may be real but not urgent, and urgency is what funds purchases.

## Stay silent after the answer

Most useful material arrives in the pause after the first answer. Count to three before speaking; the elaboration is usually the real answer.

Never fill silence by suggesting an answer. "Was it because it was slow?" hands them a reason and destroys the data point.

## Do not pitch

The moment you describe the solution, the interview becomes a sales call and the person becomes agreeable. Save any demo for the end, after every question is asked.

If they ask what you are building, deflect once: "I will show you at the end — I want your view uncoloured first."

## Separate the signal from the sample

Five interviews with people who share a problem is a finding. Five interviews with whoever replied is a coincidence.

Recruit against a written screener. Note who declined and why — systematic refusal is itself a result.

## Watch out for

- Leading questions that contain the desired answer.
- Talking to friendly users only, who have already selected into liking you.
- Recording insights as quotes without the behaviour that prompted them.
- Treating a feature request as a requirement. Ask what it would let them stop doing.
- Interviewing the buyer about the user's daily experience, or the reverse.

## Finishing

Each interview produced at least one concrete story. Findings cite behaviour, not agreement. The screener is written down.
`,
  },
  {
    name: "pricing-strategy",
    category: "Sales & Marketing",
    roles: ["Founder", "Product Manager", "Product Marketer"],
    description:
      "Sets and changes prices with a defensible rationale. Use when pricing a new product, adding a tier, or considering an increase.",
    body: `
# Pricing Strategy

## Price against value, not cost

Cost-plus pricing anchors on your infrastructure bill, which the buyer does not care about. Value-based pricing anchors on what the alternative costs them — the tool they would otherwise buy, or the hours they would otherwise spend.

The ceiling is the alternative's cost. The floor is your marginal cost. Everything between is a positioning decision.

## Pick a metric that grows with value received

The billing metric should rise when the customer gets more out of the product, and stay flat when they do not. Seats work when value is per-person; they punish adoption when it is not.

A metric the buyer cannot predict — raw API calls, storage bytes — makes budgeting hard and generates support load at every invoice.

## Three tiers, chosen deliberately

Most buyers pick the middle. Design the middle tier as the one you want most people on, and the others to make it look correct.

The cheapest tier exists to qualify, not to earn. The most expensive exists to anchor and to catch the few who need it.

Differentiate tiers by capability, not by arbitrary quotas — a quota that forces an upgrade without adding value is felt as a penalty.

## Raise prices on new customers first

Grandfather existing customers through at least one increase. The goodwill is worth more than the incremental revenue, and it makes the increase defensible publicly.

Announce increases with notice and a reason. Silent increases are discovered and shared.

## Discount with a reason and an expiry

An unconditional discount tells the buyer the list price was fiction. Trade every discount for something: annual commitment, a case study, a reference call.

Never discount to win a deal that was lost on fit. It converts a lost deal into a difficult customer.

## Watch out for

- Pricing so low that support is unaffordable, which caps quality permanently.
- Free tiers with no natural upgrade trigger, which attract users who will never convert.
- Per-seat pricing on a product whose value is automation, which taxes the outcome you promise.
- Complex calculators that make buyers ask sales, when they wanted to buy without talking to anyone.

## Finishing

The metric grows with delivered value. The middle tier is the intended default. Every discount has a condition and an end date.
`,
  },
  {
    name: "seo-fundamentals",
    category: "Sales & Marketing",
    roles: ["Growth Marketer", "Content Strategist", "Engineer"],
    description:
      "Makes pages findable without gaming anything. Use when planning content, diagnosing lost traffic, or reviewing a site's technical setup.",
    body: `
# SEO Fundamentals

## Match the intent behind the query

Every query has an intent: to learn, to compare, to buy, or to reach a specific page. A page that answers a different intent than the query implies will not rank however well written it is.

Search the term and look at what already ranks. If the results are all comparison tables, a narrative essay will not displace them.

## One page per intent

Two pages targeting the same intent compete with each other and split their signals. Consolidate them and redirect the weaker one.

Conversely, cramming three intents into one long page serves none of them well.

## Structure so it can be read by machine and human

The title tag is the headline in the results and the strongest on-page signal. Write it for the click, keep it under about sixty characters, and put the distinguishing words first.

Use one \`h1\` that matches the promise, and subheadings that would work as a table of contents. A reader skimming the headings should learn the shape of the answer.

## Fix the technical basics before writing more

Pages that are slow, that block crawling, or that render entirely client-side without server output start at a disadvantage no amount of content overcomes.

Check: is it indexable, does it return the right status code, does it have one canonical URL, does it load quickly on a phone. These are cheap to fix and expensive to ignore.

## Links still matter, and cannot be faked cheaply

Earned links from relevant sites remain the strongest external signal. Purchased links are detectable and the penalty outlasts the benefit.

Internal linking is under-used and entirely within your control: link new pages from existing relevant ones, with descriptive anchor text.

## Watch out for

- Publishing volume over quality, which dilutes the site's overall signal.
- Keyword stuffing, which reads badly and no longer works.
- Changing URLs without redirects, which discards every accumulated signal.
- Blocking the very pages you want indexed via robots rules or noindex left from staging.
- Chasing high-volume head terms with a new site instead of specific long-tail queries you can actually win.

## Finishing

Each page targets one intent. Titles are written for the click. The site is crawlable, fast and internally linked.
`,
  },

  /* --------------------------------- Documents & Communication */
  {
    name: "meeting-notes",
    category: "Documents & Communication",
    roles: ["Chief of Staff", "Project Manager", "Any"],
    description:
      "Captures meetings so decisions survive and actions happen. Use when taking notes, writing up a discussion, or fixing a team where meetings evaporate.",
    body: `
# Meeting Notes

## Record decisions, not dialogue

A transcript is not notes. Nobody rereads the back-and-forth; they come looking for what was decided and what they owe.

Three sections carry almost all the value: decisions, actions, and open questions. Discussion belongs in a paragraph of context, not a play script.

## Every action needs a name and a date

"We should look into caching" is not an action. "Priya to benchmark the cache layer by Thursday" is.

An action without an owner is a wish. An action without a date is a wish with a deadline of never. If the meeting cannot supply both, note that it is unassigned — visibly, so someone fixes it.

## Write the decision with its reason

"Chose Postgres" is half a note. "Chose Postgres over DynamoDB because the access patterns are relational and the team already operates it" survives the person who wrote it.

Six months later the reason is what tells a newcomer whether the decision still holds.

## Note what was explicitly not decided

Meetings often close without resolving something, and everyone leaves with a different impression of whether it was settled.

An "open questions" list prevents the follow-up meeting that discovers the disagreement.

## Send within the hour

Notes sent the next day are read by nobody and correct nothing. Send while the meeting is still fresh enough that a misrecorded decision gets challenged.

Post where the work happens, not in a document nobody opens.

## Watch out for

- Recording who said what, which makes people guard their words.
- Summarising so aggressively that the reason disappears.
- Actions phrased as topics — "pricing" rather than "draft the pricing page".
- Notes that only make sense to attendees. Write for the person who missed it.
- Attributing an unpopular decision to the room rather than to its owner.

## Finishing

Decisions carry their reasons. Every action has an owner and a date. Someone who missed the meeting can act on the notes alone.
`,
  },
  {
    name: "status-updates",
    category: "Documents & Communication",
    roles: ["Project Manager", "Chief of Staff", "Engineer", "Any"],
    description:
      "Writes updates that keep people informed without a meeting. Use when reporting progress, escalating a risk, or replacing a standup that has stopped working.",
    body: `
# Status Updates

## Lead with the answer

The reader wants to know one thing: is this on track. Say it in the first line — on track, at risk, or blocked — then explain.

Burying the status under a chronology of activity forces every reader to do the interpretation themselves, and they will each do it differently.

## Distinguish progress from activity

"Attended three meetings and reviewed the spec" is activity. "The import path now handles partial failures; two of five endpoints remain" is progress.

Report against the outcome, not the calendar. If a week produced no progress toward the outcome, that is the news, and hiding it in activity wastes everyone's time.

## Escalate early and specifically

A risk raised while there is still time to act is useful. The same risk raised at the deadline is an excuse.

Name what you need: a decision, a person, a dependency unblocked. "Blocked" without an ask puts the work of diagnosis on the reader.

## Keep the shape constant

Same sections, same order, every time. A reader who knows where the risks live can skim in ten seconds; a freeform update has to be read in full.

Consistency also makes omissions visible — a missing risks section reads as "none", so say none explicitly.

## Write for the person two levels away

The immediate team already knows the context. Someone further out needs the project's purpose restated briefly, and needs jargon expanded.

One sentence of context at the top costs you little and makes the update forwardable.

## Watch out for

- Green status that turns red without ever passing through amber.
- Percentages invented to sound precise. "Two of five endpoints" is honest; "40% complete" usually is not.
- Updates that only report good news, which train readers to discount them.
- Long updates. If it takes more than two minutes to read, the important part is being missed.

## Finishing

The first line states the status. Progress is measured against outcomes. Every risk names what would unblock it.
`,
  },
  {
    name: "technical-decision-records",
    category: "Documents & Communication",
    roles: ["Architect", "Tech Lead", "Engineer"],
    description:
      "Records architectural decisions so future teams know why, not just what. Use when making a consequential technical choice or reconstructing one nobody can explain.",
    body: `
# Technical Decision Records

## Record the decision when it is made

A decision written up months later is a reconstruction, and the alternatives that were seriously considered have already been forgotten.

Write it while the disagreement is still fresh. The record is most valuable precisely where the choice was hard.

## Five parts, kept short

**Context** — what forced a decision now. Include the constraints that were real at the time.

**Options** — what was genuinely considered, each with its trade-off. An option list of one is not a decision.

**Decision** — what was chosen, stated plainly.

**Consequences** — what this makes easy, and what it makes hard or expensive later.

**Status** — proposed, accepted, or superseded by a named later record.

## Consequences are the part people skip and later need

Every architectural choice buys something and pays for it elsewhere. Writing the cost down is what stops a future team from treating the decision as free.

Be specific: "this ties us to Postgres-specific features, so a migration would require rewriting the search layer".

## Never edit a decision — supersede it

Rewriting history destroys the record's purpose. When a decision changes, write a new one that references the old, and mark the old superseded.

The trail of superseded records is the most useful part of the archive for someone new.

## Keep them with the code

A record in a wiki nobody opens is lost. In the repository, it is versioned alongside what it describes and found by search.

## Watch out for

- Recording decisions nobody disputed, which buries the important ones in noise.
- Writing them as proposals for approval rather than as records of what happened.
- Omitting the option that was rejected for political rather than technical reasons — note it neutrally.
- Vague consequences like "may affect performance" that commit to nothing.

## Finishing

Context, options, decision and consequences are all present. Superseded records are linked, not deleted. A new engineer can tell why, not just what.
`,
  },
  {
    name: "runbooks",
    category: "Documents & Communication",
    roles: ["SRE", "Engineer", "Support Engineer"],
    description:
      "Writes operational procedures someone can follow at 3am. Use when documenting a recurring task, after an incident, or when only one person knows how something works.",
    body: `
# Runbooks

## Write for a tired stranger

The reader is someone who has been woken up, does not have your context, and cannot ask you. Every assumption you leave implicit becomes a stall.

Test this by handing it to someone who has never done the task. Where they hesitate is where the runbook is wrong.

## Start with how to tell if you are in the right place

Open with the symptom and a check that confirms it. Half of incident time is spent establishing which problem you actually have.

"If the queue depth alert fired but consumers are healthy, you are in the wrong runbook — see X" saves more time than any later step.

## Numbered steps, one action each

A step containing two actions gets half-completed under pressure. Split them.

Give the exact command, not a description of it. \`kubectl rollout restart deploy/api -n prod\` is followable; "restart the API deployment" invites a guess about namespace and syntax.

## State what success looks like after each risky step

Without a verification, the operator does not know whether to continue or roll back. "Wait for all pods Ready — expect three within 60 seconds" turns a hopeful pause into a check.

## Say what to do when it does not work

The fallback path is the part that gets used at the worst moment. Name the rollback command, the escalation contact, and the point at which to stop trying and wake someone.

Give the boundary explicitly: "if this has not resolved within 15 minutes, escalate rather than continuing to retry."

## Watch out for

- Runbooks that were correct when written and never revisited after the system changed.
- Commands with placeholders nobody can resolve at 3am — say where to find the value.
- Steps that require access the on-call person may not have, discovered mid-incident.
- Prose paragraphs where a checklist belongs.
- Linking to a dashboard without saying what reading is normal.

## Finishing

Someone unfamiliar completed the task using only the runbook. Every risky step has a verification. The escalation point is explicit.
`,
  },
  {
    name: "release-notes",
    category: "Documents & Communication",
    roles: ["Product Manager", "Engineer", "Technical Writer"],
    description:
      "Writes release notes users read and act on. Use when shipping a release, announcing a breaking change, or replacing a changelog of commit messages.",
    body: `
# Release Notes

## Write for the user's decision

The reader wants to know one thing: does anything here require me to do something. Structure the notes to answer that first.

Breaking changes and required actions go at the top, unmissably. Everything else is optional reading.

## Group by impact, not by component

Users do not know your service boundaries. "Fixed in auth-service" means nothing; "You will no longer be signed out when switching workspaces" does.

Three groups usually suffice: what needs action, what is new, what is fixed.

## Describe the change from outside

A commit says what was altered. A release note says what is now different for the person using it.

"Refactored the export pipeline" is internal news. "Exports over 100MB now complete instead of timing out" is a release note.

## Breaking changes need a migration path, in the note

Do not link away to it. State what breaks, what to change it to, and by when — inline, where someone scanning will see it.

If a deprecation has a removal date, repeat the date in every release until it lands.

## Skip the noise

Dependency bumps, internal refactors and typo fixes belong in the commit log, not the release notes. Including them trains readers to skim past the important entries.

If a release genuinely has nothing user-visible, say so in one line rather than padding.

## Watch out for

- Version numbers as headings with no summary, forcing readers to diff mentally.
- "Various improvements and bug fixes", which tells the reader nothing and reads as concealment.
- Announcing a fix without saying what the symptom was, so nobody knows if it affected them.
- Notes written after the release, when the person who made the change has moved on.

## Finishing

Required actions are at the top. Every entry describes an externally visible difference. Breaking changes include the migration inline.
`,
  },

  /* --------------------------------------------- Design & Creative */
  {
    name: "design-critique",
    category: "Design & Creative",
    roles: ["Product Designer", "Design Lead", "Product Manager"],
    description:
      "Gives and runs design critique that improves the work instead of bruising it. Use when reviewing a design, running a critique session, or receiving feedback you disagree with.",
    body: `
# Design Critique

## Critique against the goal, not your taste

Open every critique by restating what the design is trying to achieve and for whom. Without that, feedback collapses into preference and the loudest preference wins.

"I would have used a card layout" is taste. "The card layout hides the comparison the user came to make" is critique.

## Ask before asserting

A design usually reflects constraints the reviewer cannot see. "What made you rule out a single-column form?" gets to the reasoning; "this should be one column" skips it and is often wrong.

If the answer reveals no reasoning, that itself is the finding.

## Separate the three kinds of feedback

**Blocking** — this will not work for a stated reason. Rare, and must be justified.

**Concern** — a risk worth discussing, which the designer may accept.

**Preference** — label it as such and let it go.

Most damage in critique comes from preferences delivered in the tone of blockers.

## Critique the strongest version

If part of the design is unfinished or a placeholder, ask before attacking it. Time spent on a known gap is time not spent on the real question.

## Receiving: understand before defending

Repeat the feedback back before responding. Half of disagreements dissolve when the comment turns out to be about something else.

You are allowed to decline feedback. Say why, once, and record the reason — a decision explained is not a decision reopened next week.

## Watch out for

- Design by committee, where every voice is averaged and the result has no point of view.
- Critique of visual polish on a flow whose structure is not settled.
- Reviewers who have not been told the constraints, then blamed for missing them.
- Silent approval, which is not consent and resurfaces after launch.
- Feedback delivered as a redesign rather than a problem.

## Finishing

Every comment names the goal it relates to. Blockers are distinguished from preferences. Declined feedback has a recorded reason.
`,
  },
  {
    name: "design-systems",
    category: "Design & Creative",
    roles: ["Product Designer", "Design Lead", "Frontend Engineer"],
    description:
      "Builds and maintains a component system teams actually use. Use when starting a design system, when components have drifted, or when nobody uses the library.",
    body: `
# Design Systems

## A system is adopted, or it is decoration

The measure of a design system is the share of the product built from it. A beautiful library nobody imports has failed regardless of its craft.

Adoption comes from being easier than the alternative. If using the component is slower than writing a div, engineers write the div, and they are right to.

## Start from what exists

Audit the product before designing anything. Count the button variants, the greys, the spacing values actually in use.

The first version of the system is a consolidation of reality, not a greenfield ideal. Systems that ignore the existing product require a migration nobody funds.

## Tokens before components

Colour, spacing, type scale and radius are the vocabulary. Get them named and stable first — components built on ad-hoc values inherit the inconsistency you are trying to remove.

Name tokens by role, not appearance. \`--color-danger\` survives a rebrand; \`--color-red\` does not.

## Design the API, not just the visuals

A component's props are its contract. Too few and teams fork it; too many and it becomes a configuration language nobody understands.

Prefer variants over booleans: \`variant="danger"\` scales, while \`isDanger\` plus \`isWarning\` produces impossible combinations.

## Version and deprecate deliberately

Breaking a component breaks every consumer at once. Add the new prop, deprecate the old with a warning, and remove it a release later.

Publish what changed in terms of what consumers must do, not what you refactored.

## Watch out for

- Documenting only appearance and not when to use which component.
- One-off components added for a single screen, which quietly become the majority.
- Accessibility treated as a later pass rather than built into the component.
- Designers and engineers maintaining two systems with the same names and different behaviour.
- A contribution process so heavy that forking is faster.

## Finishing

Tokens are named by role. Every component documents when to use it. Contributing is easier than forking.
`,
  },
  {
    name: "accessibility-review",
    category: "Design & Creative",
    roles: ["Product Designer", "Frontend Engineer", "QA Engineer"],
    description:
      "Finds and fixes accessibility barriers before users hit them. Use when reviewing an interface, before a launch, or when responding to an accessibility complaint.",
    body: `
# Accessibility Review

## Keyboard first, because it catches the most

Unplug the mouse and complete the main flow. Every barrier you hit is a barrier for keyboard, switch and screen reader users alike.

Check: can you reach every control, is focus visible at all times, does the order follow the visual layout, can you escape every modal.

A visible focus ring is not optional decoration. Removing \`outline\` without replacing it is the single most common regression.

## Semantics do the heavy lifting

A \`<button>\` is focusable, activates on space and enter, and announces itself. A \`<div onClick>\` does none of that and needs four attributes to catch up.

Use the native element. ARIA is for cases the platform genuinely lacks, and incorrect ARIA is worse than none — it overrides what the browser already knew.

Headings describe structure, not size. Skipping from \`h1\` to \`h4\` for visual reasons breaks navigation for screen reader users who jump by heading.

## Colour is never the only signal

Any information carried by colour must also be carried by text, shape or position. Red-only error states are invisible to a significant share of users.

Check contrast: 4.5:1 for body text, 3:1 for large text and for the boundaries of interactive controls. Placeholder-grey text usually fails.

## Every input needs a real label

A placeholder is not a label — it disappears on focus and is not reliably announced. Use \`<label for>\`, and connect error messages with \`aria-describedby\` so they are read with the field.

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
`,
  },
  {
    name: "user-research-synthesis",
    category: "Design & Creative",
    roles: ["Researcher", "Product Designer", "Product Manager"],
    description:
      "Turns raw research into findings a team can act on. Use after interviews or usability sessions, or when research produced notes nobody used.",
    body: `
# User Research Synthesis

## Separate observation from interpretation

Write what happened before writing what it means. "Four of six participants scrolled past the filter without seeing it" is an observation. "The filter is poorly positioned" is an interpretation.

Keeping them apart lets someone disagree with your conclusion while accepting your data — which is how research survives contact with opinion.

## Code before you theme

Tag each observation with a short label as you go. Only once everything is tagged should you group tags into themes.

Building themes first makes you sort evidence into the story you already have. The order matters more than it sounds.

## Count, then weigh

Note how many participants showed each behaviour, not how strongly one person felt about it. A single vivid quote is memorable and frequently unrepresentative.

Report as "four of six", never as a percentage. Percentages on a sample of six imply a precision you do not have.

## Distinguish the problem from the requested solution

Participants propose solutions constantly. Record the request, then record the underlying difficulty it was meant to solve, because the difficulty is what you design against.

"I want a bulk export button" often means "I cannot tell which records changed".

## Report severity, not just presence

A finding that blocked a task matters more than one that caused a pause. Rank by whether the participant failed, struggled, or merely commented.

Give the team a defensible order to work in, or they will pick by ease.

## Watch out for

- Synthesising alone when several people observed. Independent coding then comparison surfaces disagreement early.
- Discarding the participant who did not fit the pattern; that person is often the finding.
- Letting the loudest session dominate because it was most recent.
- Findings phrased so generally they cannot be acted on.
- Research that ends at a deck and never reaches a backlog.

## Finishing

Observations are separable from interpretations. Findings carry counts and severity. Each one implies a concrete change.
`,
  },

  /* ------------------------------------------- Research & Knowledge */
  {
    name: "source-evaluation",
    category: "Research & Knowledge",
    roles: ["Researcher", "Analyst", "Any"],
    description:
      "Judges whether a source can be trusted before relying on it. Use when researching an unfamiliar topic, citing evidence, or assessing a claim that seems convenient.",
    body: `
# Source Evaluation

## Find the primary source

Most claims encountered online are third-hand: a post citing an article citing a press release citing a study. Each hop drops caveats and sharpens numbers.

Follow the chain until you reach the original. Surprisingly often the original says something more modest, or does not exist.

## Ask who benefits

Funding, affiliation and publication venue do not make a claim false, but they tell you where to look hardest.

A vendor's benchmark of its own product is not worthless — it is a claim to verify against an independent measurement, not evidence on its own.

## Check the date and whether it still holds

An accurate article from four years ago may describe a world that has changed. For anything technical, regulatory or market-related, recency is part of correctness.

Look for whether the source has been corrected, retracted or superseded.

## Distinguish the kinds of claim

**Measured** — someone observed it, with a method you can inspect.

**Modelled** — someone projected it from assumptions. The assumptions are the claim.

**Asserted** — someone said it, and the citation leads nowhere.

Treating a model's output as a measurement is the most common research error.

## Prefer independent corroboration to volume

Ten articles repeating one wire story are one source. Check whether apparently separate confirmations trace back to the same origin.

Genuine corroboration comes from a different method or a different dataset, not a different website.

## Watch out for

- Statistics quoted without a denominator or a sample size.
- Charts reproduced without their axes or original caption.
- "Studies show" with no study named.
- A confident secondary summary of a paper whose abstract says something weaker.
- Your own preference for the source that agrees with you, which is the hardest one to catch.

## Finishing

Every load-bearing claim traces to a primary source. The method and date are known. Corroboration is genuinely independent.
`,
  },
  {
    name: "literature-review",
    category: "Research & Knowledge",
    roles: ["Researcher", "Analyst", "Scientist"],
    description:
      "Surveys what is already known before adding to it. Use when starting research, writing a background section, or checking whether a question is already answered.",
    body: `
# Literature Review

## Write the question first, precisely

A vague question returns an unbounded literature. Narrow it until you can say what would count as an answer: population, intervention, comparison, outcome.

The narrowing is the work. A well-formed question makes the search tractable and the stopping point obvious.

## Search systematically, and record how

Note the databases, the exact query strings, the date, and the inclusion criteria. Without that record the review cannot be repeated or extended, including by you in six months.

Vary vocabulary deliberately — different fields name the same concept differently, and a single phrasing misses whole literatures.

## Mine the citations in both directions

From a relevant paper, read backwards through its references and forwards through papers citing it. This finds work that keyword search misses because it uses different terms.

Two or three iterations usually reach saturation, where new papers stop appearing.

## Read in three passes

Title and abstract to exclude. Introduction and conclusion to judge relevance. Full method and results only for what survives.

Reading everything fully is how reviews stall. Most papers are excluded correctly at pass one.

## Synthesise, do not enumerate

A list of paper summaries is not a review. Group by claim, method or finding, and say where the literature agrees, where it conflicts, and what nobody has examined.

The gap you identify is the contribution of the review.

## Watch out for

- Citing an abstract without reading the method, which is where the caveats live.
- Publication bias — null results are underpublished, so the literature looks more decisive than the evidence is.
- Treating a preprint as peer-reviewed, or dismissing it because it is not.
- Reviews of reviews, which compound each layer's selection choices.
- Stopping when you find agreement rather than when you stop finding new work.

## Finishing

The question is precise. The search is recorded and repeatable. The synthesis names agreements, conflicts and gaps.
`,
  },
  {
    name: "note-taking-systems",
    category: "Research & Knowledge",
    roles: ["Researcher", "Analyst", "Any"],
    description:
      "Keeps notes that stay useful months later. Use when setting up a knowledge system, or when your notes have become an archive nobody searches.",
    body: `
# Note-Taking Systems

## Write for your future self, who has forgotten everything

A note that made sense while the source was open is often meaningless a month later. Include enough context that the note stands alone.

The test: could you act on this note without reopening the source? If not, it is a bookmark, not a note.

## Capture in your own words

Copying a passage records that you saw it. Restating it records that you understood it, and the restating is where the understanding happens.

Quote directly only when the exact wording matters, and mark quotes clearly so you never later mistake someone else's sentence for your own.

## One idea per note

Notes containing five ideas can only be linked as a block, and only the dominant idea gets found in search.

Splitting them is what lets ideas from different sources connect later.

## Link rather than file

Hierarchies force a single home for each note, and most useful notes belong in several places. Links let a note sit in every context that wants it.

When you write a note, link it to at least one existing note. A note with no links is nearly unfindable.

## Prune deliberately

A system that only grows becomes an archive. Periodically delete notes that were never linked and never revisited — they are costing search quality.

Keeping everything is not free.

## Watch out for

- Elaborate tag taxonomies that require remembering which tag you used.
- Capturing far more than you process, so the inbox becomes the system.
- Tool migration as a substitute for actually reading the notes.
- Notes that record conclusions without the reasoning, which cannot be re-evaluated when the conclusion is challenged.

## Finishing

Each note holds one idea, in your words, with enough context to stand alone, and at least one link.
`,
  },
  {
    name: "competitive-analysis",
    category: "Research & Knowledge",
    roles: ["Product Manager", "Product Marketer", "Founder", "Analyst"],
    description:
      "Studies competitors to inform decisions rather than to feel busy. Use when entering a market, pricing against alternatives, or responding to a competitor's launch.",
    body: `
# Competitive Analysis

## Start from the decision it should inform

"Analyse our competitors" produces a slide deck. "Should we build integrations or depth?" produces an analysis someone acts on.

Without a decision attached, competitive research becomes a feature matrix that ages immediately and changes nothing.

## Define competitors by the buyer's alternatives

The competitor set is whatever the buyer would do instead — which usually includes spreadsheets, internal tools, an agency, and doing nothing.

Restricting the set to companies in your category misses where most deals are actually lost.

## Use the product, do not read the marketing

Sign up. Complete the core flow. Note where it is genuinely better than yours, because that is the part your positioning must respect.

Marketing pages describe intent; the product describes reality. They differ more than people expect.

## Study what they will not copy

Anything a competitor could add next quarter is not a durable difference. What matters is where their architecture, business model or customer base prevents them from following.

A free tier is copyable. A business model that makes a free tier unprofitable for them is not.

## Track direction, not just state

A snapshot says who is ahead today. Changelogs, hiring and pricing changes say where they are going, which is what a roadmap decision needs.

Three data points over six months beat an exhaustive audit of one afternoon.

## Watch out for

- Feature matrices with every row marked in your favour, which means the rows were chosen after the conclusion.
- Reacting to a competitor's launch before knowing whether their customers wanted it.
- Copying a competitor's roadmap, which guarantees permanent second place.
- Treating funding announcements as evidence of product success.
- Analysis nobody revisits, so it silently goes stale and is still cited.

## Finishing

The analysis answers a named decision. Competitors include non-product alternatives. Differences are assessed for how hard they are to copy.
`,
  },

  /* --------------------------------------- Healthcare & Science */
  {
    name: "clinical-data-handling",
    category: "Healthcare & Science",
    roles: ["Data Engineer", "Researcher", "Compliance Officer"],
    description:
      "Handles patient and health data without creating a breach or a compliance failure. Use when designing a system that touches health data, or reviewing one that does.",
    body: `
# Clinical Data Handling

## Identifiability is a spectrum, not a flag

Removing a name does not make data anonymous. Dates of birth, postcodes, rare diagnoses and visit timestamps re-identify people in combination, often trivially.

Distinguish three states and label datasets explicitly: identified, pseudonymised (keys held separately, re-identification possible), and anonymised (re-identification not reasonably possible). Most data people call anonymous is pseudonymised.

## Collect the minimum, keep it the shortest time

Every extra field is additional breach exposure with no benefit unless it is used. Justify each field against the stated purpose, and record that justification.

Set a retention period when the data is created, not when someone asks. Data with no deletion date is kept forever by default.

## Purpose limitation is a real constraint

Data collected for care cannot be silently reused for research or product analytics. Consent for one purpose is not consent for another.

Check the lawful basis before any new use. "We already have the data" is not a basis.

## Segregate and log access

Health data belongs in its own store with its own access controls, not in the general application database because it was convenient.

Log every read, not just every write. In an investigation the question is almost always who looked, not who changed.

## Plan for the subject's rights

People can ask what you hold, ask for correction, and often ask for deletion. If your architecture cannot answer those questions, it is not compliant regardless of its security.

Test the export and delete paths before you need them under a deadline.

## Watch out for

- Health data in application logs, error trackers and analytics tools, which are rarely covered by the same controls.
- Test environments seeded with real patient data.
- Free-text notes, which contain identifiers no schema-level redaction will catch.
- Third-party processors without an agreement covering the data class.
- Backups that outlive the retention policy the live data obeys.

## Finishing

Every field is justified and has a retention period. Access is logged. Export and deletion have been tested. The lawful basis is recorded.
`,
  },
  {
    name: "reproducible-analysis",
    category: "Healthcare & Science",
    roles: ["Scientist", "Data Analyst", "Researcher"],
    description:
      "Makes an analysis someone else can rerun and get the same numbers. Use when producing results others will rely on, or when you cannot reproduce your own work from last month.",
    body: `
# Reproducible Analysis

## The result is the code, not the output

A number in a document with no path back to its computation cannot be checked, corrected or extended. Treat the script as the deliverable and the figure as a by-product.

Every table and chart in the write-up should be regenerable by one command.

## Pin the inputs

Record the exact dataset version, not just its name. A file that is overwritten in place makes every past result unverifiable.

Hash the input, or snapshot it. If the data cannot be shared, share the hash so someone with access can confirm they have the same file.

## Pin the environment

Package versions change behaviour silently — a default parameter shifts and the result moves. Record the language version and every dependency version, and commit that record.

An environment file is the difference between "works on my machine" and a result someone can confirm.

## Set seeds, and say so

Anything involving randomness — sampling, cross-validation, initialisation — must set an explicit seed, or the analysis is unreproducible by construction.

Report that the seed was set. Also check that the conclusion survives a different seed; if it does not, the conclusion is noise.

## Separate the stages

Raw data stays untouched. Cleaning produces an intermediate. Analysis reads the intermediate. Never edit raw data in place, and never clean inside the analysis script.

This makes it possible to find where a number changed when it changes.

## Watch out for

- Manual steps in the middle — a spreadsheet edit between two scripts breaks the chain invisibly.
- Absolute paths that only exist on one machine.
- Results copied into a document by hand, which drift from the code that produced them.
- Notebooks run out of order, where the visible output does not correspond to the visible code.
- Undocumented exclusions, which are the most common source of irreproducible results.

## Finishing

One command regenerates every reported number. Data and environment versions are pinned. Exclusions are stated in code, not applied by hand.
`,
  },
  {
    name: "statistical-reasoning",
    category: "Healthcare & Science",
    roles: ["Data Analyst", "Scientist", "Researcher"],
    description:
      "Reads and reports statistics without overclaiming. Use when interpreting a result, reviewing an analysis, or writing up findings.",
    body: `
# Statistical Reasoning

## A p-value is not the probability you are right

It is the probability of seeing data this extreme if the null hypothesis were true. It says nothing about the size of the effect, its importance, or the chance the hypothesis is correct.

\`p = 0.049\` and \`p = 0.051\` are the same evidence. The threshold is a convention, not a boundary in nature.

## Report the interval, always

A confidence interval carries everything a p-value does and adds the magnitude and the precision. "3.2% lift, 95% CI [0.1%, 6.3%]" is honest; "significant" is not.

A wide interval that excludes zero is a weak result presented as a strong one when only significance is reported.

## Correct for multiplicity, or say you did not

Twenty comparisons at the 5% level produce one false positive on average. Testing many outcomes and reporting the significant one is not a finding.

Pre-register the primary outcome, or apply a correction, or label the analysis exploratory. All three are acceptable; silence is not.

## Absolute risk, not just relative

"Doubles the risk" is meaningless without the baseline. A rise from 1 in 100,000 to 2 in 100,000 is a doubling and almost never actionable.

Report both. Relative effects alone are the most common way statistics mislead honestly.

## Correlation, confounding and selection

Before concluding causation, ask what else differs between the groups, and how people entered the sample.

Selection effects produce strong, stable, entirely spurious relationships. Survivor bias in particular looks exactly like a real finding.

## Watch out for

- Means on skewed distributions; report medians and a spread.
- Dichotomising a continuous variable, which discards information and inflates apparent effects.
- Comparing significance between groups instead of testing the interaction directly.
- Regression to the mean read as improvement, especially after selecting on an extreme.
- Precision implied by decimal places the sample size cannot support.

## Finishing

Effects are reported with intervals and absolute magnitudes. Multiplicity is handled or disclosed. Causal language is used only where the design supports it.
`,
  },

  /* ------------------------------ AI & Accelerated Computing */
  {
    name: "prompt-engineering",
    category: "AI & Accelerated Computing",
    roles: ["AI Engineer", "Engineer", "Product Manager"],
    description:
      "Writes prompts that produce reliable output instead of impressive demos. Use when building on a language model, debugging inconsistent responses, or reviewing a prompt.",
    body: `
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
`,
  },
  {
    name: "rag-pipelines",
    category: "AI & Accelerated Computing",
    roles: ["AI Engineer", "Data Engineer", "Engineer"],
    description:
      "Builds retrieval-augmented generation that answers from your data instead of guessing. Use when designing a RAG system, or fixing one that retrieves the wrong passages.",
    body: `
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
`,
  },
  {
    name: "llm-evaluation",
    category: "AI & Accelerated Computing",
    roles: ["AI Engineer", "Data Analyst", "Engineer"],
    description:
      "Measures whether a model change actually helped. Use before shipping a prompt or model change, or when quality debates rely on anecdotes.",
    body: `
# LLM Evaluation

## Build the eval set before tuning

A fixed set of inputs with known-good expectations turns "this feels better" into a number. Fifty well-chosen cases beat a thousand random ones.

Include the failures you have actually seen in production. An eval set of easy cases certifies nothing.

## Choose the metric the task allows

Exact match for classification and extraction. Structural validity for anything that must parse. Human or model judgement for open generation.

Do not use a similarity score where correctness is binary — a wrong answer phrased like the right one scores well and is still wrong.

## Model-as-judge, used carefully

An LLM judge is fast and reasonable for pairwise comparison. It is also biased toward longer responses, toward its own style, and toward the first option presented.

Randomise the order, give the judge a rubric rather than "which is better", and calibrate it against human labels periodically. An uncalibrated judge measures its own preferences.

## Test the same input repeatedly

Above temperature zero the same prompt gives different answers. A single run cannot distinguish an improvement from variance.

Run each case several times and report the pass rate, not one sample.

## Guard against regression, not just progress

Keep a set of cases that currently pass and must continue to. Prompt changes that improve one behaviour routinely break another, and without a regression set nobody notices until a user does.

## Watch out for

- Tuning on the eval set until it passes, which measures memorisation of the set.
- Evals that only cover the happy path, missing refusals, empty inputs and adversarial content.
- Comparing across model versions without rerunning the baseline.
- Averaging away a catastrophic failure mode in an otherwise good score.
- Treating a benchmark number as evidence about your specific task.

## Finishing

The eval set contains real failures. Cases run multiple times. A regression set guards existing behaviour. Any judge is calibrated.
`,
  },
  {
    name: "model-selection",
    category: "AI & Accelerated Computing",
    roles: ["AI Engineer", "Engineer", "Architect"],
    description:
      "Chooses a model on cost, latency and capability rather than benchmark headlines. Use when picking a model, considering a switch, or justifying spend.",
    body: `
# Model Selection

## Start from the constraint that binds

Every task is limited by one of: quality, latency, cost, or privacy. Identify which, because it eliminates most of the field immediately.

A task with a 200ms budget cannot use the largest model regardless of its quality. A task on data that cannot leave your network cannot use a hosted API at all.

## Benchmark on your own task

Public benchmarks measure general capability on problems unlike yours. A model that leads a leaderboard can be worse at your specific extraction task.

Run your eval set. It is a day of work and routinely reverses the intuition.

## Route by difficulty rather than picking one model

Most workloads contain a majority of easy cases and a minority of hard ones. Sending everything to the largest model pays a premium on the easy majority.

A small model with an escalation path — confidence check, or a validator that triggers a retry on the larger model — often beats both single-model options on cost and quality together.

## Count the total cost, not the token price

Input tokens dominate in retrieval-heavy applications. A cheaper model that needs more examples, longer prompts or more retries can cost more per successful result.

Measure cost per accepted output, which is the number that matters.

## Plan for the model changing under you

Hosted models are updated, deprecated and retired. Pin a version where the provider allows it, keep the eval set runnable, and rerun it when you move.

Keep the model choice behind an interface so switching is a configuration change, not a rewrite.

## Watch out for

- Choosing on context-window size when retrieval quality is the actual limit.
- Ignoring rate limits and concurrency, which bind long before token cost does.
- Assuming a fine-tune is needed before trying better prompting and retrieval.
- Comparing a tuned prompt on one model to an untuned prompt on another.
- Overlooking data-retention terms when the constraint was privacy.

## Finishing

The binding constraint is named. Models were compared on your eval set. Cost is measured per accepted output. The choice sits behind an interface.
`,
  },

  /* ------------------------------------------ Tools & Automation */
  {
    name: "shell-scripting",
    category: "Tools & Automation",
    roles: ["Engineer", "SRE", "DevOps Engineer"],
    description:
      "Writes shell scripts that fail loudly instead of silently corrupting things. Use when automating a task, hardening an existing script, or reviewing one that runs in CI.",
    body: `
# Shell Scripting

## Start every script with the safety line

\`set -euo pipefail\` turns three classes of silent failure into loud ones: a failing command that continues, an unset variable expanding to nothing, and a failing command in the middle of a pipe.

Without \`pipefail\`, \`generate | process\` reports success when \`generate\` failed. That is how empty files get deployed.

Be aware that \`-e\` has genuine exceptions — commands in conditions, and anything followed by \`||\` — so check exit codes explicitly where it matters.

## Quote every expansion

\`$file\` unquoted splits on spaces and expands globs. \`"$file"\` does not. This is the single most common shell bug and the easiest to prevent.

Use \`"$@"\` rather than \`$*\` to pass arguments through with their boundaries intact.

## Fail before you act

Check that required commands exist, required variables are set, and required paths are present — at the top, before anything is modified.

A script that fails halfway through leaves the system in a state neither the script nor the operator understands.

## Clean up with a trap

Temporary files and directories should be removed by \`trap ... EXIT\` so they disappear whether the script succeeds, fails or is interrupted.

Create temporary files with \`mktemp\`, never a fixed path in \`/tmp\` — a predictable name is both a race and a security problem.

## Know when to stop using shell

Shell is excellent for orchestrating commands. Once you need arrays of structured data, arithmetic, or error handling with more than two branches, it is the wrong language.

A hundred-line shell script that manipulates JSON is a Python script waiting to be rewritten.

## Watch out for

- Parsing \`ls\`, which breaks on any unusual filename. Use globs or \`find -print0\`.
- \`cd\` without checking it succeeded, so the next command runs in the wrong directory.
- Assuming GNU flags on a machine with BSD utilities.
- Recursive deletes built from a variable that may be empty, which resolve to the filesystem root. Validate the path is non-empty and expected before deleting anything.
- Secrets passed as arguments, visible in the process list to every user.

## Finishing

The script sets strict mode, quotes expansions, validates preconditions, and cleans up on exit. It fails before it modifies anything.
`,
  },
  {
    name: "regular-expressions",
    category: "Tools & Automation",
    roles: ["Engineer", "Data Analyst", "Any"],
    description:
      "Writes regexes that are correct and maintainable, and knows when not to. Use when matching or extracting text, or reviewing a pattern nobody can read.",
    body: `
# Regular Expressions

## Anchor and be specific

An unanchored pattern matches anywhere, which is rarely what validation wants. \`^...$\` states that the whole string must match.

Prefer specific classes to \`.\`. Every \`.*\` is a place where the pattern will match more than you intended, usually on the one input that matters.

## Greedy by default, and that is usually wrong

\`<.*>\` on \`<a><b>\` matches the entire string, not the first tag. Use \`<[^>]*>\` — a negated class is clearer and faster than the lazy \`<.*?>\`.

Negated character classes generally express intent better than lazy quantifiers.

## Name your groups

\`(?<year>\\d{4})-(?<month>\\d{2})\` survives someone inserting a group before it; \`\\1\` and \`\\2\` do not.

For anything with more than two captures, names are the difference between a maintainable pattern and one that gets rewritten from scratch.

## Comment anything non-trivial

Extended mode — \`/x\` in most languages — allows whitespace and comments inside the pattern. A twelve-character regex is fine; a sixty-character one needs explanation.

If extended mode is unavailable, put a comment above with an example of what matches and what does not.

## Know the catastrophic case

Nested quantifiers over overlapping alternatives — \`(a+)+b\` — backtrack exponentially. On a 30-character non-matching input this hangs the process.

Never run a user-supplied pattern without a timeout, and avoid nesting quantifiers on patterns that touch untrusted input.

## Watch out for

- Parsing HTML, JSON or CSV with regex. Use a parser; the edge cases are endless and quoting rules defeat patterns.
- Email validation by regex. Check for an \`@\`, then send a confirmation — that is the only real validation.
- \`\\d\` matching non-ASCII digits in Unicode mode, which surprises people validating numbers.
- Patterns that pass on the three examples in front of you and fail on the fourth nobody tried.
- Forgetting that \`.\` excludes newlines unless dotall is set.

## Finishing

The pattern is anchored, specific, and either short or commented. Untrusted input runs against it with a timeout. Structured formats use a parser instead.
`,
  },
  {
    name: "task-automation",
    category: "Tools & Automation",
    roles: ["Engineer", "Operations", "Any"],
    description:
      "Decides what to automate and builds it so it does not become a liability. Use when a manual task keeps recurring, or when automation has become harder to maintain than the work it replaced.",
    body: `
# Task Automation

## Automate the second time, not the first

The first occurrence teaches you what the task actually is. Automating it immediately encodes a misunderstanding.

Estimate honestly: time to build, plus maintenance, against time saved. Many tasks done monthly are cheaper to keep doing by hand.

## Make it idempotent

Running it twice must be safe. Interruptions, retries and nervous operators all produce double runs, and an automation that corrupts on the second run is worse than no automation.

Check current state before acting rather than assuming the starting point.

## Fail loudly, and to a person

Silent failure is the characteristic automation disaster: it stops working, nobody notices, and the gap is discovered weeks later.

Alert on failure and on not having run — a job that never starts produces no error at all. Heartbeat monitoring catches what error alerting cannot.

## Log what it did, not that it ran

"Sync complete" is useless in an investigation. "Synced 412 records, skipped 3 (missing id), took 8s" lets someone confirm it did the right thing.

Include the counts that would look wrong if something broke.

## Keep a manual path

Automation fails at the worst time. Document how to perform the task by hand, and check occasionally that the instructions still work.

If the manual path has become impossible, you have built a dependency, not a convenience.

## Watch out for

- Automating a broken process, which produces broken results faster.
- Scripts on someone's laptop that only they can run.
- Credentials embedded in the automation instead of a secret store.
- Silent partial success, where three of ten items processed and it reported done.
- Automation nobody owns after its author leaves.

## Finishing

It is idempotent, alerts on failure and on silence, logs counts, and has a documented manual fallback with a named owner.
`,
  },
  {
    name: "web-scraping",
    category: "Tools & Automation",
    roles: ["Engineer", "Data Engineer", "Researcher"],
    description:
      "Extracts data from websites reliably and responsibly. Use when building a scraper, fixing one that broke, or deciding whether scraping is the right approach.",
    body: `
# Web Scraping

## Look for the API first

Many sites have a JSON endpoint behind the page, a documented API, or a bulk download. Any of them is more stable and cheaper than parsing HTML.

Open the network tab before writing a parser. The page is frequently rendering data from a call you could make directly.

## Check what you are permitted to do

Read the terms of service and \`robots.txt\` before building. They are not merely technical hints — ignoring them creates legal exposure and gets you blocked.

Personal data carries obligations regardless of whether it was publicly visible. Copyright applies to scraped content.

## Be a good client

Identify yourself in the user agent with a way to be contacted. Rate limit well below what the server can handle, and back off on 429 and 5xx.

Scraping at a volume that degrades the site for its users is the behaviour that causes blanket blocks for everyone.

## Select on structure, not styling

Class names change with every redesign. Prefer stable attributes — \`data-\` hooks, ids, or the document structure — over generated CSS classes.

Anchor to a nearby label where possible: the cell after the one containing "Price" survives a restyle that \`.pc-4a2f\` does not.

## Expect it to break, and detect it

Sites change without notice. Validate what you extracted — expected field count, plausible types, non-empty results — and fail loudly rather than storing empty strings.

A scraper that silently returns nothing looks identical to a site with no data.

## Watch out for

- Parsing rendered HTML when the content is loaded by script; either drive a browser or call the underlying endpoint.
- Ignoring pagination and assuming the first page is everything.
- Storing raw HTML forever, which is usually both unnecessary and legally awkward.
- Hammering a site from CI on every commit.
- Sessions and cookies that expire, producing a login page parsed as data.

## Finishing

Permission was checked. Requests are rate limited and identifiable. Selectors are structural. Output is validated and failures are loud.
`,
  },
  {
    name: "spreadsheet-modelling",
    category: "Tools & Automation",
    roles: ["Analyst", "Finance", "Founder", "Operations"],
    description:
      "Builds spreadsheets that others can audit and trust. Use when building a financial model, a forecast, or any sheet someone will make a decision from.",
    body: `
# Spreadsheet Modelling

## Separate inputs, calculations and outputs

Three areas, visually distinct: assumptions you can change, formulas that derive from them, and results you present.

The commonest spreadsheet failure is a hardcoded number typed into the middle of a formula. It cannot be found, cannot be flexed, and is wrong six weeks later.

Colour inputs consistently — the convention of blue for inputs and black for formulas is worth adopting simply because it is widespread.

## One formula per row, copied across

A row where column F differs from the rest is invisible and is where errors hide. If a row needs an exception, make it a separate row with its own label.

Consistency lets a reviewer check one cell and trust the row.

## Label everything, including units

"Revenue" is ambiguous. "Revenue (£000s, monthly, excl. VAT)" is not. Most model disagreements are unit disagreements.

Put the units in the row label, not in a note nobody opens.

## Build the check row

Add rows that must be true — balances reconcile, percentages sum to 100, cash never goes negative — and make them flag loudly when violated.

A model without checks is asserted correct. A model with checks demonstrates it on every recalculation.

## Make assumptions visible and flexible

Every assumption on one sheet, each with a source or rationale beside it. Then a reviewer can challenge the assumption rather than the arithmetic.

Build a simple scenario switch rather than three copies of the model — copies diverge silently.

## Watch out for

- \`VLOOKUP\` with an approximate match, which returns wrong values silently. Use exact match, or \`INDEX/MATCH\`.
- Ranges that do not extend when rows are added.
- Circular references resolved by enabling iterative calculation, which hides a modelling error.
- Hidden rows and columns containing live calculations.
- Merged cells, which break sorting, referencing and most formulas.

## Finishing

Inputs are separated and labelled with units. Formulas are consistent across each row. Check rows pass. A reviewer can trace any output to its assumptions.
`,
  },

  /* ------------------------------------------- batch 4: breadth */
  {
    name: "product-requirements",
    category: "Documents & Communication",
    roles: ["Product Manager", "Founder", "Tech Lead"],
    description:
      "Writes requirements engineers can build from without a meeting per question. Use when specifying a feature, or when a build has drifted from what was intended.",
    body: `
# Product Requirements

## Lead with the problem and who has it

A document that opens with a solution invites everyone to debate the solution. Opening with the problem lets the team propose better ones.

State who experiences it, how often, and what they do today instead. If you cannot answer those, the requirement is not ready.

## Specify behaviour, not implementation

"Store the draft every 30 seconds and on blur" is behaviour. "Use a debounced hook writing to local storage" is a design decision that belongs to whoever builds it.

Where an implementation constraint is real — a compliance requirement, an existing contract — say so explicitly and why.

## Write the edge cases, because they are the work

The happy path is usually obvious and small. What happens on empty state, on failure, on permission denied, on very large input, on concurrent edit — that is most of the build.

Every unanswered edge case becomes an assumption made silently by whoever hits it first.

## Define done as something observable

"Users can collaborate" cannot be verified. "Two users editing the same document see each other's changes within two seconds, and neither loses text on conflict" can.

Acceptance criteria are the contract. If you cannot write them, the requirement is still a wish.

## Say what is out of scope

Scope is defined by its boundary. Listing what this explicitly does not include prevents the slow expansion that turns a two-week feature into a quarter.

## Watch out for

- Requirements that specify a UI layout when the constraint is really about the information shown.
- "Fast", "intuitive" and "robust" as acceptance criteria.
- Documents that grow after work starts without anyone re-agreeing the estimate.
- Burying a hard requirement in a paragraph of context, where it is missed.
- Writing for stakeholders' approval instead of for the engineer who builds it.

## Finishing

The problem precedes the solution. Edge cases are enumerated. Acceptance criteria are observable. Out of scope is stated.
`,
  },
  {
    name: "stakeholder-communication",
    category: "Documents & Communication",
    roles: ["Project Manager", "Chief of Staff", "Product Manager"],
    description:
      "Keeps stakeholders aligned without endless meetings. Use when managing expectations, delivering bad news, or when a project has stakeholders who disagree.",
    body: `
# Stakeholder Communication

## Map who needs what, once

Not everyone needs the same information at the same cadence. Sort stakeholders by whether they decide, are affected, or merely want visibility.

Deciders need options and a recommendation. The affected need timing and impact. Observers need a summary they can skim. Sending all three the same update fails all three.

## Deliver bad news early and with a plan

Bad news does not improve with age; it compounds, and late disclosure costs trust that the original problem never would have.

Bring the problem, its impact, what you are doing about it, and what you need. A problem delivered without those reads as an escalation for someone else to solve.

## Give options, not just a recommendation

Presenting a single path invites suspicion that alternatives were not considered. Two or three options with trade-offs, and a clear recommendation, gets a faster decision.

Include the "do nothing" option honestly — sometimes it wins, and pretending it does not exist damages your credibility when it does.

## Separate a decision from a discussion

Say explicitly which you are asking for. "I need a decision on X by Thursday" produces a decision; "thoughts?" produces a thread.

Record decisions where they can be found later, and confirm them in writing. Verbal agreement is remembered differently by different people.

## Manage expectations by narrowing, not by hedging

"Somewhere between six and sixteen weeks" is honest but useless. Give the current best estimate, its confidence, and what would narrow it.

Update the estimate when it changes rather than defending the old one until the deadline.

## Watch out for

- Different messages to different stakeholders, which is discovered and is fatal.
- Confusing consensus with alignment — people can disagree and still commit.
- Escalating without first telling the person you are escalating past.
- Optimistic status that only turns red when the deadline arrives.
- Meetings held because an update was not written.

## Finishing

Each audience gets what it needs. Bad news arrives with a plan. Asks are labelled as decision or discussion. Decisions are recorded.
`,
  },
  {
    name: "code-comments",
    category: "Software Engineering",
    roles: ["Engineer", "Tech Lead"],
    description:
      "Writes comments that stay true and earn their space. Use when reviewing code, documenting something subtle, or cleaning up comments that lie.",
    body: `
# Code Comments

## Comment the why, never the what

The code already says what it does. A comment restating it is noise that goes stale the moment the line changes.

\`// increment counter\` above \`counter++\` is worse than nothing. \`// counted per attempt, not per request, because retries must not reset the budget\` is worth its line.

## The best comment is often a name

Before writing an explanation, try naming the thing well. \`retryBudgetPerAttempt\` removes the need for the comment entirely.

Extract a confusing expression into a named variable rather than annotating it.

## Explain the non-obvious decision

Comments earn their place where the reader would otherwise ask "why like this?": a workaround for an upstream bug, a deliberate performance trade-off, an order dependency that looks arbitrary.

Link the issue, the spec section or the incident. Future readers can then judge whether the reason still holds.

## Warn about the trap

If touching this code in the obvious way breaks something, say so at the point of the trap. This is the highest-value comment there is.

"Do not reorder these two calls — the second reads state the first commits" prevents a specific, likely bug.

## Delete commented-out code

Version control remembers it. Commented-out blocks confuse readers about what is live and are never restored.

## Watch out for

- Comments that contradict the code, which are worse than none because they are trusted.
- Doc comments generated to satisfy a linter, restating the signature in prose.
- TODOs with no name and no date, which accumulate forever.
- Long comments explaining code that should simply be rewritten.
- Section banners that survive the refactor that moved the section.

## Finishing

Every comment explains why, warns of a trap, or links a reason. None restates the code. None contradicts it.
`,
  },
  {
    name: "pull-request-reviews",
    category: "Software Engineering",
    roles: ["Engineer", "Tech Lead"],
    description:
      "Reviews changes in a way that catches problems without stalling delivery. Use when reviewing a PR, or when reviews in a team are slow, harsh or rubber-stamped.",
    body: `
# Pull Request Reviews

## Review in priority order

Correctness first: does it do what it claims, and what happens when the inputs are hostile. Then security and data safety. Then design. Style last, and preferably by a formatter rather than a person.

Reviews that open with naming comments and never reach the concurrency bug are the common failure.

## Say what kind of comment each one is

Prefix them: **blocking**, **suggestion**, **question**, **nit**. Without labels, every comment reads as a change request and the author cannot tell what actually stops the merge.

A review of fifteen nits and one blocker looks like a rejection. Labelled, it takes five minutes.

## Ask rather than assert when unsure

"What happens if this list is empty?" is better than "this breaks on empty lists" when you have not checked. It surfaces the issue without being wrong in public.

Often the answer is that a guard exists elsewhere — and that exchange is worth having.

## Pull the branch for anything non-trivial

Reading a diff shows what changed, not what the code now does. For a change of any size, run it and read the surrounding code the diff does not show.

Most subtle bugs live in the interaction between changed and unchanged code, which a diff hides by construction.

## Approve when it is better, not when it is perfect

If the change improves the codebase and nothing blocking remains, approve it with the non-blocking comments attached. Holding a PR for preferences is how review becomes a bottleneck and gets bypassed.

## Watch out for

- Enormous PRs, which get approved unread. Ask for a split rather than pretending to review it.
- Reviewing only the diff of a rebase, missing what came with it.
- Comment threads that become design debates; move those to a call and record the outcome.
- Approving because the author is senior, or blocking because they are not.
- Letting a review sit for days, which is the most expensive review outcome of all.

## Finishing

Correctness was checked before style. Comments are labelled by severity. Anything non-trivial was run, not just read.
`,
  },
  {
    name: "technical-debt",
    category: "Software Engineering",
    roles: ["Tech Lead", "Engineer", "Architect"],
    description:
      "Identifies, records and pays down technical debt deliberately. Use when planning work, justifying a refactor, or when a codebase has become slow to change.",
    body: `
# Technical Debt

## Debt is a deliberate trade, not a mess

Real technical debt is a conscious decision to take a shortcut for speed, with the intention of paying it back. Code that is simply bad was never a trade.

The distinction matters because the remedies differ: debt is repaid on a schedule, bad code is fixed when touched.

## Record it where the work is planned

Debt in someone's head is not tracked. Write it as an item with the same fields as any other: what it costs now, what it will cost later, and what fixing it involves.

The cost must be concrete. "The auth module is messy" competes badly with a feature. "Every auth change takes three days instead of one, and we make roughly two a month" competes on equal terms.

## Prioritise by interest rate, not by ugliness

Debt in code nobody touches costs nothing. Debt in the file changed weekly compounds fast.

Rank by change frequency multiplied by the friction it causes. The ugliest code is often not the most expensive.

## Pay it down alongside the work, mostly

Refactoring the area you are already changing is cheap: you have the context, and the tests are being exercised anyway.

Reserve dedicated refactoring projects for debt too large to fold in — a migration, a boundary that needs redrawing.

## Say no to more debt sometimes

Taking on debt is legitimate when the deadline is real and the payback is scheduled. It is illegitimate when the shortcut has no plan and the deadline was arbitrary.

If the same "we'll fix it after launch" has been said three times, that is not a trade any more.

## Watch out for

- Refactors with no behavioural test coverage, which cannot be verified as safe.
- Rewrites proposed instead of incremental repair, which take longer than anyone estimates.
- Debt used as a label for "code I did not write".
- Cleanup PRs mixed with behaviour changes, so neither can be reviewed properly.
- Tracking debt in a list nobody prioritises, which is the same as not tracking it.

## Finishing

Each item states its ongoing cost in time. Priority reflects change frequency. Cleanup is separated from behaviour change in review.
`,
  },
  {
    name: "feature-flags",
    category: "Software Engineering",
    roles: ["Engineer", "Tech Lead", "Product Manager"],
    description:
      "Ships behind flags without accumulating a maze of dead conditionals. Use when planning a risky release, running a gradual rollout, or cleaning up stale flags.",
    body: `
# Feature Flags

## Know which kind of flag you are creating

**Release** flags hide unfinished work and are removed within weeks.

**Experiment** flags split traffic and are removed when the test concludes.

**Operational** flags — kill switches, load shedding — are permanent by design.

**Permission** flags gate by plan or role and are really product configuration, not flags.

Confusing them is why flag systems rot: release flags treated as permanent never get deleted.

## Give every temporary flag an owner and an expiry

Record who removes it and by when, at creation. Without both, the flag outlives the feature and nobody dares delete it because nobody knows what it does.

Fail the build, or at least warn loudly, when a flag passes its expiry.

## Default to off, and make the off path the safe one

A flag whose failure mode is "everyone gets the new thing" is not a safety mechanism.

If the flag service is unreachable, the code must choose the safe default deliberately rather than throwing.

## Evaluate once, near the top

Checking the same flag in six places produces inconsistent behaviour within one request when the value changes mid-flight.

Resolve it at the entry point and pass the decision down.

## Delete aggressively

A flag that is fully rolled out is dead code plus a conditional. Removing it is the last step of shipping, not optional tidying.

Every stale flag doubles the paths a reader must reason about, and they multiply.

## Watch out for

- Nested flags, which produce combinations nobody has tested or can enumerate.
- Flags controlling database migrations, where the two branches diverge irreversibly.
- Testing only the on state, then discovering the off path broke months ago.
- Flag names that describe the implementation rather than the behaviour.
- Long-lived flags per customer, which are a fork with extra steps.

## Finishing

Each flag has a type, an owner and an expiry. The off path is the safe default. Fully rolled-out flags are deleted, not left on.
`,
  },
  {
    name: "api-versioning",
    category: "Software Engineering",
    roles: ["Engineer", "Architect", "Tech Lead"],
    description:
      "Evolves a public API without breaking the clients you cannot control. Use when planning a breaking change, designing a versioning scheme, or deprecating an endpoint.",
    body: `
# API Versioning

## Most changes should not need a version

Adding an optional field, adding an endpoint, adding an enum value that clients can ignore — these are compatible if clients are tolerant readers.

Document that clients must ignore unknown fields. That single rule removes the need for most version bumps.

## Know exactly what breaks

Removing a field. Renaming one. Narrowing a type or a range. Making an optional request field required. Changing a default. Changing an error code. Tightening validation on input that used to pass.

That last one is the most commonly missed: rejecting previously accepted input is a breaking change even though the schema looks unchanged.

## Version at a boundary you can afford to run

Whatever scheme you choose — URL path, header, or date-based — you will run two versions simultaneously. Choose the granularity you can maintain: whole-API versioning is simple to reason about and expensive to support.

Never version per endpoint unless you are prepared for a matrix nobody can test.

## Deprecate on a published schedule

Announce, mark deprecated in the response headers and the docs, and give a removal date proportional to the integration cost — months, not weeks, for anything a customer built against.

Measure usage per version. Removing something with active traffic is an outage you scheduled.

## Migrate for people where you can

A migration guide that maps old field to new field, with examples, converts a support burden into a self-service change.

Where the change is mechanical, offer a compatibility shim rather than making every client do the same work.

## Watch out for

- Silently changing behaviour without changing the version, which is the worst outcome for trust.
- Version numbers in the URL that never increment because nobody wants the migration.
- Supporting old versions indefinitely, which multiplies every future change.
- Breaking changes shipped in a patch release because the schema technically validated.
- Undocumented behaviour that clients depend on anyway — it is part of your contract whether you meant it or not.

## Finishing

Compatible changes ship without a version. Breaking changes are announced with a date and a migration guide. Usage per version is measured before removal.
`,
  },
  {
    name: "queue-design",
    category: "Software Engineering",
    roles: ["Engineer", "Architect", "SRE"],
    description:
      "Designs message queues and background jobs that survive failure. Use when adding asynchronous processing, or debugging a queue that loses or duplicates work.",
    body: `
# Queue Design

## Assume every message is delivered more than once

At-least-once delivery is what almost every queue actually provides. Exactly-once is a marketing claim about a narrow configuration.

Therefore consumers must be idempotent. Key each operation by a stable id and make reprocessing a no-op, rather than hoping duplicates do not happen.

## Assume order is not preserved

Unless the queue guarantees ordering within a partition — and you are using that partition key correctly — messages arrive out of order.

Design handlers so a later state does not get overwritten by an earlier message arriving second. Compare versions or timestamps rather than blindly applying.

## Put the payload's identity in, not the payload

Send an id and let the consumer fetch current state. Embedding a full object means the consumer acts on data that was true when it was queued, which may be minutes stale.

The exception is when you deliberately want a point-in-time snapshot — say so explicitly.

## Retry with backoff, then give up somewhere

Immediate retries on a failing dependency amplify the outage. Exponential backoff with jitter spreads the load.

Every retry policy needs a terminal state: a dead letter queue, monitored, that a person actually looks at. An unmonitored dead letter queue is a data loss mechanism with extra steps.

## Watch the depth and the age

Queue depth alone is ambiguous — a large queue draining fast is fine. The age of the oldest message tells you whether you are keeping up.

Alert on oldest-message age, not just on count.

## Watch out for

- Poison messages that fail forever and block a partition.
- Consumers that acknowledge before doing the work, losing messages on crash.
- Long-running handlers that exceed the visibility timeout, causing the same work to run twice concurrently.
- Fan-out that multiplies a spike downstream with no throttle.
- Using a queue as a database, where the messages become the only record of state.

## Finishing

Consumers are idempotent and order-tolerant. Retries back off and terminate in a monitored dead letter queue. Oldest-message age is alerted on.
`,
  },
  {
    name: "cost-optimisation",
    category: "Cloud & DevOps",
    roles: ["SRE", "DevOps Engineer", "Engineering Manager"],
    description:
      "Reduces cloud spend without degrading the service. Use when a bill grows unexpectedly, before scaling up, or when planning capacity.",
    body: `
# Cost Optimisation

## Attribute before you optimise

You cannot reduce what you cannot attribute. Tag every resource by team, environment and service, and enforce it at creation.

Most organisations discover that a small number of resources dominate the bill, and several of them belong to nobody.

## Look for the three usual dominators

**Idle capacity** — non-production environments running overnight and at weekends, instances provisioned for a peak that passed.

**Data transfer** — cross-zone and egress charges, which are invisible in instance pricing and frequently exceed compute.

**Storage that only grows** — snapshots, logs and old backups with no lifecycle policy.

Check these before optimising application code.

## Right-size on observed usage

Instances are typically provisioned from an estimate made once and never revisited. Compare actual CPU and memory percentiles against what is allocated.

Right-size gradually and watch latency, since some headroom absorbs spikes that averages hide.

## Commit only to a proven baseline

Reserved capacity and savings plans are large discounts on a commitment you cannot easily exit. Commit to the floor of your usage, not the average, and buy incrementally.

Over-committing converts a variable cost into a fixed one at the moment you most want flexibility.

## Make cost visible to the people who cause it

A monthly bill reviewed by finance changes nothing. A per-team dashboard, and an alert when a service's spend jumps, moves decisions to where they are made.

Set anomaly alerts on rate of change — a forgotten test cluster is caught in a day rather than a month.

## Watch out for

- Optimising a bill that is a rounding error while ignoring the largest line.
- Cutting redundancy for savings, then paying for it in an outage.
- Log retention set to "forever" by default.
- Autoscaling with no upper bound, which turns a traffic spike or a loop into a very large invoice.
- Chasing savings that cost more engineering time than they return.

## Finishing

Resources are tagged and attributable. Idle, transfer and storage have been checked first. Commitments cover the baseline only. Anomaly alerts are live.
`,
  },
  {
    name: "disaster-recovery",
    category: "Cloud & DevOps",
    roles: ["SRE", "DevOps Engineer", "Architect"],
    description:
      "Plans for the failure that takes everything down. Use when designing recovery, after a near-miss, or when nobody knows whether the backups work.",
    body: `
# Disaster Recovery

## Two numbers drive every decision

**RPO** — how much data you can afford to lose, which sets backup frequency.

**RTO** — how long you can afford to be down, which sets the recovery architecture.

Agree both with the business before designing anything. An hour of RPO and five minutes of RTO are wildly different systems and costs.

## An untested backup is not a backup

The only evidence that a backup works is a restore. Restore to a clean environment on a schedule, and time it — that measured duration is your real RTO, not the estimate.

Most backup failures are discovered during the first real restore, which is the worst possible moment.

## Protect against deletion, not just hardware failure

Replication faithfully copies a destructive command to every replica. Ransomware and a bad migration both defeat replication entirely.

Keep point-in-time recovery and at least one immutable or offline copy that a compromised credential cannot delete.

## Write the plan for people under pressure

Who declares a disaster, who executes, who communicates. What order services come back in, and what depends on what.

Include the access needed — an unreachable credential vault during an outage is a common and paralysing failure.

## Exercise it, including the hard parts

A tabletop exercise finds gaps cheaply. A real failover finds the ones that matter.

Rehearse at least annually, including the parts people avoid: DNS changes, certificate reissue, and bringing a stale replica up to date.

## Watch out for

- Backups stored in the same account, region or provider as the thing they protect.
- Recovery that depends on a service which is itself down.
- Configuration that lives only in a running system and not in version control.
- A plan that names people who have left.
- Assuming a managed service's default retention meets your RPO — check the number.

## Finishing

RPO and RTO are agreed and met by a timed restore. An immutable copy exists. The plan names roles, order and access, and has been exercised.
`,
  },
  {
    name: "load-testing",
    category: "Cloud & DevOps",
    roles: ["SRE", "Engineer", "QA Engineer"],
    description:
      "Finds the breaking point before users do. Use before a launch or a traffic event, or when capacity is a guess.",
    body: `
# Load Testing

## Decide what question the test answers

"Can we handle Black Friday" and "where does this service break" need different tests. Load, stress, soak and spike tests each answer one.

A load test at expected volume proves you can serve it. Only a stress test tells you the margin, and only a soak test finds leaks.

## Model realistic traffic

Real users are not a uniform loop over one endpoint. They arrive unevenly, use a mix of endpoints in sequence, carry sessions, and request data with realistic cardinality.

A test that hits one cached endpoint proves the cache works and nothing else.

## Test with production-shaped data

A database with a thousand rows behaves nothing like one with fifty million. Query plans change, indexes matter, caches stop fitting.

Volume and distribution both matter — evenly distributed synthetic keys hide the hot-partition problem real data has.

## Watch saturation, not just averages

Report percentiles: p50 tells you the common case, p99 tells you what a meaningful share of users experience.

Track the resource that saturates first — connections, threads, file descriptors, database pool — because that is your actual limit, not CPU.

## Find the knee, then stop

Increase load until latency degrades sharply. That knee is the capacity number worth recording, and the point beyond which autoscaling must already have triggered.

Note what failed first: that component is where the next engineering effort belongs.

## Watch out for

- Load generators that saturate before the system does, so you measure the test.
- Testing against a scaled-down environment and extrapolating linearly, which is rarely valid.
- Ignoring dependencies — a third party you are also loading, or rate limiting you have not hit yet.
- Running against production without a plan for the damage.
- Cleanup that leaves millions of synthetic rows behind.

## Finishing

The test answers a named question with realistic traffic and data. Percentiles are reported. The knee and the first component to fail are recorded.
`,
  },
  {
    name: "blue-green-deployment",
    category: "Cloud & DevOps",
    roles: ["DevOps Engineer", "SRE", "Engineer"],
    description:
      "Releases with an instant rollback path. Use when designing a deployment strategy, or when rollbacks currently mean redeploying the previous build.",
    body: `
# Blue-Green Deployment

## The point is the rollback, not the deploy

Two identical environments where one serves traffic; you deploy to the idle one, verify, then switch. The value is that reverting is a traffic switch measured in seconds.

If your rollback still means rebuilding and redeploying, you have two environments and none of the benefit.

## Verify before the switch, on the real thing

Run smoke tests against the idle environment through its own address, with real dependencies. Testing a stub proves nothing about the deploy.

Keep the checks short — this is the window where an outage would begin.

## The database is the hard part

Two application versions share one database, so schema changes must work with both. That forces expand-and-contract: add the new column, deploy code writing to both, backfill, switch reads, and only then drop the old column, several releases later.

A migration that renames or drops in one step makes rollback impossible regardless of your deployment strategy.

## Drain, do not cut

Switching instantly severs in-flight requests. Drain connections from the old environment and let existing requests finish while new ones go to the new one.

Long-lived connections — websockets, streams — need an explicit strategy or they pin users to the old version indefinitely.

## Keep the old environment until you are confident

Tearing down immediately after the switch removes the rollback you built the whole system for. Keep it warm through at least one full traffic cycle.

## Watch out for

- Cached DNS holding clients on the old environment far longer than the TTL suggests.
- Background jobs and cron running in both environments at once, doing work twice.
- Migrations run by the deploy that are not backward compatible.
- Sticky sessions stored in memory, which are lost at the switch.
- Config drift between blue and green, so the idle environment is not actually identical.

## Finishing

Rollback is a traffic switch. Migrations are expand-and-contract. Connections drain. The previous environment stays available after the switch.
`,
  },
  {
    name: "supply-chain-security",
    category: "Security",
    roles: ["Security Engineer", "Engineer", "DevOps Engineer"],
    description:
      "Defends against compromised dependencies and build systems. Use when hardening a build, reviewing dependencies, or responding to a compromised package.",
    body: `
# Supply Chain Security

## Your dependencies are your attack surface

A typical application ships far more third-party code than first-party. Every one of those packages runs with your privileges, and most pull further packages you never chose.

Review what a dependency actually needs. A date formatter that requires network access at install time deserves scrutiny.

## Pin everything, and verify integrity

Lockfiles with hashes are the baseline. A floating version means your build is not reproducible and a compromised release reaches you automatically.

Commit the lockfile. Ensure CI installs from it strictly rather than resolving fresh.

## Treat install scripts as code execution

Post-install hooks run arbitrary code on developer machines and CI runners, often with credentials in the environment.

Disable them by default where your ecosystem allows, and allowlist the few that genuinely need to run.

## Protect the build system as tightly as production

CI holds signing keys, deployment credentials and source access. It is a more valuable target than any single server.

Restrict which branches can run privileged workflows. Never expose secrets to builds triggered by untrusted pull requests — that is a well-worn exfiltration path.

## Know what you shipped

Generate an SBOM at build time and store it with the artefact. When a vulnerability is announced, the question is "are we affected, and where" — and without an inventory that takes days.

Scan continuously, not once at build: today's clean dependency is next month's advisory.

## Watch out for

- Typosquatted package names, especially on a fresh install of an unfamiliar tool.
- Dependency confusion, where an internal package name is claimed on a public registry.
- Abandoned packages transferred to a new maintainer, which is how several compromises began.
- Vendored code copied in years ago and never patched.
- Container base images pinned by tag rather than digest, so the contents change silently.

## Finishing

Dependencies are pinned with hashes. Install scripts are restricted. CI secrets are unavailable to untrusted triggers. An SBOM exists and is scanned continuously.
`,
  },
  {
    name: "privacy-by-design",
    category: "Security",
    roles: ["Engineer", "Product Manager", "Compliance Officer"],
    description:
      "Builds systems that collect and expose less by default. Use when designing a feature that handles personal data, or reviewing one before launch.",
    body: `
# Privacy by Design

## Decide the lawful basis before the schema

Why you are allowed to hold each piece of data determines what you may do with it, how long you may keep it, and what rights the person has.

Consent is the weakest basis — it can be withdrawn, and it must be specific and freely given. A checkbox required to use the product is not freely given.

## Collect less

Every field is a liability that must be secured, retained, disclosed on request and deleted on demand. If a field has no current use, not collecting it is strictly cheaper.

Prefer derived answers to raw data: store whether someone is over 18, not their date of birth, when the age is all you need.

## Set retention at design time

Data without a deletion date is kept forever. Decide the period per data class when you design the store, and implement the deletion, not just the policy.

Include backups, logs, analytics and any downstream copies in the deletion path — that is where forgotten personal data survives.

## Default to the private setting

Defaults are what almost everyone lives with. A visibility setting defaulting to public means most users are public without deciding to be.

Make the privacy-preserving option the one that requires no action.

## Build the rights paths early

Access, correction, export and deletion are functional requirements, not legal paperwork. Retrofitting them into a system that spread personal data across a dozen services is expensive and slow.

Test them as you would any other feature.

## Watch out for

- Personal data in logs, error reports and analytics, which are rarely covered by the same controls.
- Identifiers used as URL parameters, which end up in referrer headers and third-party logs.
- Re-identifiable "anonymised" data — a few quasi-identifiers are usually enough.
- Third-party scripts on pages handling sensitive input.
- Copying production data into staging for convenience.

## Finishing

Each field has a lawful basis and a retention period. Defaults are private. Access, export and deletion work end to end, including backups and logs.
`,
  },
  {
    name: "penetration-testing",
    category: "Security",
    roles: ["Security Engineer", "Engineer"],
    description:
      "Runs and commissions authorised security testing that produces fixes. Use when scoping a pentest, preparing for one, or triaging its report.",
    body: `
# Penetration Testing

## Authorisation in writing, always

Scope, targets, time window, permitted techniques, and a named contact — signed, before anything starts. Testing without written authorisation is not a grey area.

Explicitly list what is out of scope: third-party services, production data, denial of service, social engineering. Testing a SaaS provider you merely use requires their permission, not yours.

## Scope by threat model, not by asset list

"Test everything" produces shallow coverage. Decide which attacker you care about — unauthenticated internet, authenticated low-privilege user, compromised employee — and test that path deeply.

Authenticated testing finds far more than unauthenticated scanning, and most real breaches involve credentials.

## Fix the class, not the finding

A report entry is one instance. The same missing authorisation check almost certainly exists on other endpoints written by the same team.

For every finding, ask where else this pattern occurs and fix them together.

## Triage by exploitability, not by scanner severity

A critical-rated finding on an unreachable internal service matters less than a medium on the login page. Rank by what an attacker could actually reach and chain.

Chained low-severity findings are how real compromises happen, so read the report for combinations, not just the top entries.

## Retest and record

A fix is not complete until it has been retested by whoever found it. Track findings to closure with dates.

Keep the report — the next test's value is partly in whether the same classes return.

## Watch out for

- Testing staging that differs from production in the exact controls being tested.
- Scanners reporting version-based vulnerabilities that a backported patch has already fixed.
- Findings closed as "won't fix" without a recorded risk acceptance and an owner.
- Credentials and tooling left behind on tested systems.
- Treating the report as a compliance artefact rather than a work list.

## Finishing

Written authorisation covers the scope. Findings are fixed by class. Priority reflects reachability. Every fix is retested and dated.
`,
  },
  {
    name: "zero-trust-architecture",
    category: "Security",
    roles: ["Security Engineer", "Architect", "DevOps Engineer"],
    description:
      "Designs systems that do not trust the network. Use when planning network security, replacing a VPN perimeter, or securing service-to-service traffic.",
    body: `
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
`,
  },
  {
    name: "onboarding-flows",
    category: "Design & Creative",
    roles: ["Product Designer", "Product Manager", "Growth Marketer"],
    description:
      "Designs first-run experiences that get people to value quickly. Use when building onboarding, or when signups do not convert into usage.",
    body: `
# Onboarding Flows

## Define the activation moment first

There is one thing a new user must experience before the product makes sense — the first query answered, the first teammate invited, the first import completed.

Name it, measure how many reach it, and design everything else to shorten the path. Onboarding without a defined destination becomes a tour.

## Cut every step that is not required to get there

Each screen between signup and value loses people. Ask of every field: is this needed now, or could it be asked later, inferred, or defaulted.

Company size and role are usually asked for sales' benefit and paid for in conversion.

## Show the product, not a tour of it

A carousel explaining features is read by almost nobody and retained by fewer. Put the user in the product with something real to do.

If the product is empty without data, provide sample data they can act on immediately and replace later.

## Make progress visible and resumable

People leave mid-onboarding and return. Save state, show what is done and what remains, and let them re-enter where they stopped rather than restarting.

A short, honest progress indicator beats an unbounded sequence of screens.

## Design the empty state as a first-class screen

The empty state is the most-seen screen by new users and usually the least designed. It should explain what goes here, why it is useful, and offer the single action that fills it.

## Watch out for

- Requiring a credit card before value, unless you deliberately want to filter.
- Tooltips layered over an interface the user has not yet looked at.
- Onboarding designed for the demo rather than the median user's context.
- Asking for permissions — notifications, contacts — before the reason is apparent.
- Optimising signup conversion while activation falls, which just moves the drop-off later.

## Finishing

The activation moment is named and measured. Every step before it is necessary. Progress is saved. The empty state offers one clear action.
`,
  },
  {
    name: "information-architecture",
    category: "Design & Creative",
    roles: ["Product Designer", "Content Strategist", "Researcher"],
    description:
      "Organises content and navigation so people find things. Use when structuring a product or site, or when users cannot find features that exist.",
    body: `
# Information Architecture

## Organise by the user's model, not the org chart

Products structured around internal teams produce navigation nobody can predict. Users do not know which department owns the feature they want.

Group by the task the user is doing. If two features are used together, they belong together regardless of who built them.

## Test the labels, do not debate them

Card sorting reveals how users group things; tree testing reveals whether they can find something in your proposed structure.

Both are cheap and settle arguments that would otherwise run on opinion. A label that seems obvious internally is often jargon.

## Keep the hierarchy shallow

Every level of nesting loses people. Prefer a wider top level to a deep one — humans scan a list of twelve faster than they navigate three levels of four.

Anything more than three levels deep is effectively invisible without search.

## Give every item exactly one home, then cross-link

Duplicating content in two places produces two versions that diverge. Choose the canonical home based on the primary task, and link from the secondary contexts.

## Design search as a primary path, not a fallback

In any product with substantial content, search is how most people navigate. Treat empty results, synonyms and misspellings as core work.

Search analytics are the cheapest usability data you have: the queries returning nothing tell you what the architecture is missing.

## Watch out for

- Navigation labels named after internal projects.
- A "Misc" or "Other" category, which grows until it holds everything.
- Adding a top-level item for each new feature, until the nav has eighteen entries.
- Structure that assumes expertise the new user does not have.
- Reorganising without redirects, breaking every bookmark and link.

## Finishing

Grouping reflects tasks, validated by tree testing. Hierarchy is shallow. Each item has one home. Search handles empty results and synonyms.
`,
  },
  {
    name: "microcopy",
    category: "Design & Creative",
    roles: ["Product Designer", "Copywriter", "Product Manager"],
    description:
      "Writes the small interface text that decides whether people succeed. Use when writing buttons, errors, empty states, or reviewing an interface that confuses users.",
    body: `
# Microcopy

## Label buttons with the action, not the acknowledgement

"OK" tells the user nothing about what will happen. "Delete 3 files" tells them exactly, and lets them cancel with confidence.

The button is the last thing read before an irreversible action. It should be the clearest text on the screen.

## Errors must say what to do next

"An error occurred" is a dead end. A useful error names what went wrong, why if known, and the next action.

"We could not save your changes — you are offline. We will retry automatically." Same failure, entirely different experience.

Never show a raw error code alone. If you must include one for support, put the human explanation first.

## Write in the second person, in the present

"Your invoice is ready" reads naturally. "The invoice has been generated" is a system talking about itself.

Avoid the passive voice in errors especially — it hides who must act.

## Set expectations before the wait

"This usually takes about 30 seconds" prevents the reload that duplicates the operation. A spinner alone is an unbounded promise.

For anything genuinely long, say what happens if they close the tab.

## Be plain, not clever

Humour ages badly and reads poorly during a failure. Nobody enjoys a joke while their data is missing.

Reserve personality for moments of success, and keep it out of errors, confirmations and anything financial.

## Watch out for

- Jargon that leaked from the codebase: "invalid payload", "null reference", "unauthorised" instead of "please sign in".
- Confirmations that do not say what is being confirmed.
- "Are you sure?" as the only guard on a destructive action — name the consequence.
- Placeholder text used as a label, which vanishes when typing starts.
- Inconsistent terms for the same object across screens.

## Finishing

Buttons name their action. Errors say what to do next. Waits carry an expectation. One term per concept, everywhere.
`,
  },
  {
    name: "brand-voice",
    category: "Design & Creative",
    roles: ["Copywriter", "Product Marketer", "Content Strategist"],
    description:
      "Defines and applies a consistent voice across everything a company writes. Use when establishing a voice, briefing writers, or when output sounds like several different companies.",
    body: `
# Brand Voice

## Voice is constant, tone varies

Voice is who you are and does not change. Tone is how you speak in a given moment — an outage notice and a launch announcement share a voice and need different tones.

Teams that conflate them either sound robotic everywhere or wildly inconsistent.

## Define it with contrasts

Adjectives alone are useless: everyone claims "friendly, professional, human". Define by what you choose over the near alternative.

"Direct, not blunt." "Confident, not boastful." "Warm, not chummy." The contrast is what makes it usable by someone else.

## Show pairs, not rules

The fastest way to transmit a voice is a table of "we write this, not that", drawn from real copy.

Three or four pairs teach more than a page of guidelines, and they settle disputes without appeal to taste.

## Decide the mechanical questions once

Contractions or not. Oxford comma. Sentence case or title case in headings. British or American spelling. How you refer to the product and to the user.

These are trivial individually and are the majority of inconsistency in practice. Write them down so nobody re-decides.

## Adapt tone to the reader's state

Someone hitting an error is frustrated; someone completing setup is pleased. Match the moment: less personality when things go wrong, more when they go right.

The rule is simple — the worse the user's moment, the plainer the writing.

## Watch out for

- Voice guidelines written aspirationally that no existing copy matches.
- Personality applied to legal, security and billing text, where clarity is the only virtue.
- Jokes that require cultural context, which fail for a global audience.
- A voice that only the founder can produce, which does not scale past them.
- Guidelines with no examples, which every writer interprets differently.

## Finishing

Voice is defined by contrasts with examples. Mechanical choices are settled in writing. Tone shifts with the reader's situation, not the writer's mood.
`,
  },
  {
    name: "fine-tuning",
    category: "AI & Accelerated Computing",
    roles: ["AI Engineer", "Data Engineer", "Engineer"],
    description:
      "Decides whether to fine-tune and does it without wasting a month. Use when prompting has plateaued, or when evaluating a fine-tuning proposal.",
    body: `
# Fine-Tuning

## Exhaust the cheaper options first

Better prompting, few-shot examples and retrieval solve most problems people reach for fine-tuning to fix, at a fraction of the cost and with no retraining when the base model improves.

Fine-tuning is the right tool for consistent format, a specific style, or a narrow classification task — not for teaching facts, which retrieval does better and keeps current.

## Data quality dominates data quantity

A few hundred carefully correct examples beat tens of thousands of scraped ones. The model learns your errors faithfully, including the inconsistencies between annotators.

Have two people label a sample independently and measure agreement. If they disagree often, the task definition is the problem, not the model.

## Hold out a test set before you start

Split before any training, and never look at the test set while iterating. Tuning against it produces a number that does not survive contact with production.

Keep a validation set for iteration, separate from the final test set.

## Compare against a real baseline

The comparison is not fine-tuned versus nothing. It is fine-tuned versus your best prompt on the same model, and against a larger model prompted well.

Frequently the larger model with a good prompt wins on quality and loses only on cost — which is a decision, not a failure.

## Plan for the retraining treadmill

A fine-tune is pinned to a base model that will be deprecated. Budget for redoing it, and keep the training data and pipeline reproducible so that is a day's work rather than a project.

## Watch out for

- Catastrophic forgetting: the model gets better at your task and worse at everything adjacent. Test general capability too.
- Training data leaking the test set, which inflates every number.
- Overfitting to a narrow slice, so it fails on inputs slightly outside the training distribution.
- Sensitive data in training examples, which the model may reproduce.
- Measuring loss instead of task performance; loss going down is not the goal.

## Finishing

Prompting and retrieval were tried first. Labels are consistent and measured. A held-out test set was untouched during iteration. The comparison is against the best prompted baseline.
`,
  },
  {
    name: "agent-tool-design",
    category: "AI & Accelerated Computing",
    roles: ["AI Engineer", "Engineer", "Architect"],
    description:
      "Designs tools that language models can call correctly. Use when adding tools to an agent, or when a model keeps calling them wrongly.",
    body: `
# Agent Tool Design

## The description is the interface

The model chooses a tool by reading its description and nothing else. It has no source, no docs and no colleague to ask.

Write what it does, when to use it, and when not to. "Searches invoices. Use for billing questions. Does not cover refunds — use search_refunds." prevents the most common misroute.

## Few tools, clearly distinct

A model given thirty tools with overlapping purposes picks badly. Consolidate near-duplicates and make the remaining boundaries obvious.

If two tools need a paragraph to distinguish, they should probably be one tool with a parameter.

## Make the parameters hard to get wrong

Prefer enums to free strings. Give every parameter a description with an example of the format. Mark required fields honestly.

Accept the shapes a model will naturally produce — a date as a plain string as well as ISO — rather than rejecting and forcing a retry.

## Return what the model needs to decide next

An opaque success flag leaves the model guessing. Return the resulting state, or the specific reason for failure, in a form it can act on.

Truncate large results, and say that you truncated them, so the model knows more exists rather than concluding it has everything.

## Make errors instructive

"Error 400" produces a blind retry. "start_date must be before end_date; you sent start 2026-03-01, end 2026-02-01" produces a correct second call.

Every error is a prompt for the next attempt. Write it that way.

## Watch out for

- Tools with side effects that are not obvious from the name — anything destructive should say so and require confirmation.
- Overlapping tools where the model must infer a convention you never stated.
- Returning raw API payloads with dozens of irrelevant fields, which fills context and buries the answer.
- Silent truncation, which makes the model confidently wrong.
- Untrusted content returned from a tool being treated as instruction; separate data from directives.

## Finishing

Each description states when to use and when not to. Parameters are constrained and exemplified. Errors explain the fix. Results are shaped for the next decision.
`,
  },
  {
    name: "vector-search",
    category: "AI & Accelerated Computing",
    roles: ["AI Engineer", "Data Engineer", "Engineer"],
    description:
      "Builds and tunes semantic search that returns relevant results. Use when adding vector search, choosing an index, or debugging poor recall.",
    body: `
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
`,
  },
  {
    name: "customer-support-workflows",
    category: "Sales & Marketing",
    roles: ["Support Engineer", "Operations", "Product Manager"],
    description:
      "Designs support processes that resolve issues and feed product improvement. Use when setting up support, when response times slip, or when the same ticket keeps arriving.",
    body: `
# Customer Support Workflows

## Triage on impact, not arrival order

First-in-first-out means an outage waits behind a feature question. Classify on arrival: is the customer blocked, degraded, or asking.

Publish the target response time per class and measure against it. An unstated target is missed silently.

## Resolve or escalate — never park

A ticket with no owner and no next action is the source of almost every complaint about support. Every ticket has one owner at all times.

Define the escalation path and the trigger explicitly: if not resolved in X, it goes to Y. Waiting for someone to notice is not a process.

## Reply with the state, even when there is no answer

"Still investigating, next update in two hours" costs a minute and prevents the follow-up that interrupts the investigation.

Silence is read as neglect. Most anger in support threads comes from not knowing whether anyone is looking.

## Feed the top repeats back into the product

Count ticket causes, not just volume. The same question arriving fifty times is a product or documentation defect, and answering it fifty times is the expensive fix.

Route the top three causes each month to the team that can remove them. Support without this loop grows linearly with users forever.

## Write macros for the answer, not the greeting

Templated pleasantries with a hand-typed answer save nothing. Template the technically correct explanation, then personalise the first line.

Review macros quarterly — a stale macro confidently gives outdated instructions at scale.

## Watch out for

- Deflection metrics that reward closing tickets rather than solving problems.
- Support with no path to engineering for genuine bugs.
- Knowledge base articles written from the internal model rather than the words customers use.
- Measuring first response time only, which encourages fast, useless replies.
- Losing the reproduction details, forcing the customer to explain twice.

## Finishing

Tickets are triaged by impact with published targets. Every ticket has an owner and a next action. Top repeat causes are routed to product monthly.
`,
  },
  {
    name: "content-strategy",
    category: "Sales & Marketing",
    roles: ["Content Strategist", "Growth Marketer", "Product Marketer"],
    description:
      "Plans content that serves a business goal instead of filling a calendar. Use when starting a content programme, or when publishing has produced no results.",
    body: `
# Content Strategy

## Pick the job the content is doing

Content can attract strangers, convince evaluators, or retain customers. These need different pieces, different placement and different measures.

A blog trying to do all three usually does none. Decide the primary job per piece before writing.

## Write for a question someone actually asks

The best subjects come from sales calls, support tickets and search queries — places where real people phrased a real problem.

Invented topics that seem interesting internally reliably underperform a mediocre article answering a question people type every week.

## Depth beats frequency

One thorough piece that fully answers a question outperforms five shallow ones, attracts links, and stays relevant for years.

A publishing cadence that forces thin content is worse than publishing half as often.

## Plan for the update, not just the launch

The highest-return work in most content programmes is updating existing pieces that already rank. Refreshing beats writing new for anything time-sensitive.

Schedule a review date per piece at publication and honour it.

## Measure against the job

Attraction: qualified traffic and links. Conversion: assisted signups. Retention: usage after reading.

Pageviews alone reward the piece that went briefly viral and taught nobody anything about the product.

## Watch out for

- Writing for competitors and peers rather than buyers, which feels rewarding and sells nothing.
- Gating every asset, which trades most of the reach for a small list.
- Publishing to a calendar with no distribution plan; publishing is not distribution.
- Chasing keywords with no relationship to what you sell.
- Ignoring the existing library while adding to it, so quality dilutes over time.

## Finishing

Each piece has one job and a real question behind it. Depth is preferred to cadence. Updates are scheduled. Measurement matches the job.
`,
  },
  {
    name: "sales-discovery",
    category: "Sales & Marketing",
    roles: ["Sales Lead", "Founder", "Account Executive"],
    description:
      "Runs discovery calls that qualify honestly and surface real needs. Use when preparing for a sales call, or when deals stall late after good early meetings.",
    body: `
# Sales Discovery

## Discovery is qualification in both directions

The goal is not to advance every deal. It is to find out quickly whether this is a fit, so neither side spends months on a purchase that will not happen.

Disqualifying early is a success. Late-stage stalls are usually discovery failures that were visible on the first call.

## Ask about the current process, in detail

"How do you do this today?" and "walk me through the last time" reveal the real workflow, the workarounds, and who touches it.

The cost of the status quo is what funds a purchase. If nobody can quantify it, urgency is missing regardless of interest.

## Find the compelling event

Something must have changed to make this a priority now: a new hire, a failed audit, a growth threshold, a contract renewal.

Without one, a deal that looks healthy will slip indefinitely. Ask directly: "why now, rather than next year?"

## Map the decision, not just the champion

Who signs, who can veto, what procurement and security require, and what the process has looked like for comparable purchases.

An enthusiastic champion with no authority is the most common cause of a deal dying quietly.

## Summarise back and get it corrected

End by restating the problem, its cost, the timeline and the process. Being corrected is valuable — it means your understanding was wrong and you found out now.

Send it in writing. Anything they will not confirm in writing is not agreed.

## Watch out for

- Demoing before understanding, which turns discovery into a feature tour.
- Accepting "we're just exploring" without finding what triggered the exploration.
- Talking more than the buyer. If you are, you are not learning.
- Solving in the call before the problem is fully described.
- Hearing what you want to hear from polite enthusiasm.

## Finishing

The current process, its cost, the compelling event and the decision path are all documented and confirmed in writing by the buyer.
`,
  },
  {
    name: "retention-analysis",
    category: "Data & Analytics",
    roles: ["Data Analyst", "Product Manager", "Growth Marketer"],
    description:
      "Measures and improves retention using cohorts rather than averages. Use when analysing churn, judging product-market fit, or interpreting a retention curve.",
    body: `
# Retention Analysis

## Cohorts, never a single average

Aggregate retention mixes users who joined at different times under different products. Growth can hide worsening retention entirely: new users inflate the numerator while the older cohorts decay.

Group by signup period and follow each forward. The comparison between cohorts is where the signal is.

## The shape of the curve is the finding

A curve that flattens means you have a set of users for whom the product genuinely works — that plateau is the honest measure of product-market fit.

A curve decaying toward zero means no durable value, and acquisition spending will never compensate.

The first period's drop is usually onboarding; the slope after it is the product.

## Define retention as the action that matters

"Logged in" is not retention for most products. Choose the action that indicates the user got value — a query run, a document created, a message sent.

State the window honestly. Weekly retention for a monthly-use product manufactures churn that is not real.

## Segment to find who it works for

An overall flat-ish curve often hides one segment retaining superbly and another leaving immediately. That split is more actionable than the average.

Segment by acquisition source, initial use case and company size first — those usually explain the most.

## Distinguish churn from dormancy

Some products are used in bursts. A user absent for a month may be between projects rather than gone.

Look at return rates after long gaps before treating absence as churn, or you will spend on winning back people who were never lost.

## Watch out for

- Survivorship in the denominator, where cohorts shrink and the percentage rises misleadingly.
- Reporting retention only for users who completed onboarding, which excludes the worst outcome.
- Comparing cohorts of very different sizes without noting the noise.
- Counting a cancelled subscription as churned before it lapses.
- Fixing early-period drop with onboarding tweaks when the plateau is the real problem.

## Finishing

Retention is cohorted, defined by a value action, and measured over a window matching natural usage. The curve's plateau is identified and segmented.
`,
  },
  {
    name: "forecasting",
    category: "Data & Analytics",
    roles: ["Data Analyst", "Finance", "Operations"],
    description:
      "Produces forecasts with honest uncertainty. Use when projecting revenue, demand or capacity, or when a forecast has been badly wrong.",
    body: `
# Forecasting

## A point estimate is not a forecast

A single number is wrong with probability one. Report a range with a stated confidence, and the assumptions that would move it.

Decision-makers need the range: planning for the p90 and the p50 are different decisions, and hiding the spread makes that choice for them badly.

## Start with a naive baseline

"Next month equals this month" or "equals the same month last year" is the bar any model must beat. Many sophisticated models do not.

Report your model's error against the naive baseline, not in isolation. An 8% error means nothing until you know the baseline was 7%.

## Decompose before modelling

Separate trend, seasonality and the remainder. Most series have a weekly and an annual cycle, and a model blind to them attributes cycles to trend and projects nonsense.

Know your calendar effects: holidays, month-end, billing cycles, marketing campaigns.

## Forecast the drivers when the outcome is composite

Revenue is volume times price times conversion. Forecasting each and combining is usually more accurate and always more explainable than forecasting the total.

It also tells you which assumption to challenge when the forecast is wrong.

## Backtest honestly

Evaluate on data the model never saw, respecting time order. Random cross-validation leaks the future into training and produces a flattering, useless score.

Roll the window forward as it would run in production and measure the error at the horizon you actually need.

## Watch out for

- Fitting the past too closely, which captures noise and forecasts it confidently.
- Extrapolating exponential growth, which ends in every real system.
- Ignoring a known upcoming change — a price rise, a launch — because the model cannot see it.
- Revising the forecast quietly until it matches the outcome.
- Confusing accuracy with usefulness: a slightly worse forecast that explains its drivers is often more valuable.

## Finishing

The forecast is a range with assumptions. It beats a naive baseline on a time-respecting backtest. Drivers are forecast separately where the outcome is composite.
`,
  },
  {
    name: "etl-pipeline-design",
    category: "Data & Analytics",
    roles: ["Data Engineer", "Analytics Engineer"],
    description:
      "Builds data pipelines that recover from failure without manual repair. Use when designing ingestion, or when a pipeline needs babysitting.",
    body: `
# ETL Pipeline Design

## Make every step idempotent

Reruns happen: failures, late data, backfills, nervous operators. A step that appends blindly duplicates rows on the second run.

Write with a deterministic key and replace, or delete-then-insert the partition being processed. "Insert if not exists" over a natural key is the usual pattern.

## Partition by time, and process partitions independently

Time-partitioned processing lets you reprocess one day without touching the rest, and lets late data be handled by rerunning a narrow window.

Pipelines that only process "everything since last run" cannot be backfilled without reprocessing history.

## Keep the raw layer immutable

Land the source data untransformed and never modify it. Every derived table is rebuildable from raw, which is what makes a logic bug recoverable rather than permanent.

Storage is cheaper than the incident where a transformation error destroyed the only copy.

## Fail the run, do not skip the row

Silently dropping malformed records produces quietly wrong numbers that nobody notices for months.

Route rejects to a quarantine table with the reason, count them, and alert when the count exceeds a threshold. Visible failure beats invisible loss.

## Separate extraction, transformation and loading

One script doing all three cannot be retried partially, and a transformation change forces re-extraction from the source system.

Extract once, transform many times. Source systems in particular should be read as little as possible.

## Watch out for

- Schema drift upstream, which breaks loads or silently nulls columns.
- Timezone handling that shifts records between days.
- Full reloads that grow until they exceed the window they run in.
- Pipelines with implicit ordering dependencies that are not declared.
- Credentials and connection limits shared with production traffic.

## Finishing

Steps are idempotent and time-partitioned. Raw data is immutable. Rejects are quarantined and counted. Extraction is separate from transformation.
`,
  },
  {
    name: "incident-postmortems",
    category: "Cloud & DevOps",
    roles: ["SRE", "Engineering Manager", "Engineer"],
    description:
      "Runs postmortems that prevent recurrence rather than assign blame. Use after an incident, or when the same failure keeps happening.",
    body: `
# Incident Postmortems

## Blameless is a practical choice, not a courtesy

People who expect blame withhold detail, and the detail is where the cause is. A blameless postmortem is how you find out what actually happened.

Ask what made the wrong action look reasonable at the time. If a mistake was easy to make, the system permitted it, and the system is the fixable part.

## Build the timeline before the analysis

Reconstruct what happened and when, from logs and messages rather than memory. Include when it started, when it was detected, when it was understood, and when it was mitigated.

The gaps between those four are the most instructive numbers: a long detection gap and a long diagnosis gap need entirely different fixes.

## Look for contributing factors, not a root cause

Serious incidents almost never have one cause. The change, the missing alert, the misleading dashboard and the stale runbook all contributed.

"Root cause: human error" is a place people stop looking, not an explanation.

## Actions must be specific, owned and dated

"Improve monitoring" changes nothing. "Alert when queue age exceeds 5 minutes — Sam, by 30 April" does.

Cap the action list at what will actually be done. Twenty actions produce none; three produce three.

## Publish it, including the uncomfortable parts

Circulate beyond the team involved. Most value comes from people elsewhere recognising the same latent problem in their own system.

Track actions to completion in the same place as other work, or they evaporate.

## Watch out for

- Counterfactuals — "if only they had checked" — which describe an alternative history rather than a mechanism.
- Postmortems only for outages, ignoring near misses that were equally informative.
- Action items that are really the whole project someone wanted anyway.
- Meetings held so late that memory has degraded.
- Treating the document as the deliverable rather than the changes it produces.

## Finishing

The timeline is evidence-based with detection and diagnosis gaps measured. Contributing factors are plural. Actions are few, owned, dated and tracked.
`,
  },
  {
    name: "capacity-planning",
    category: "Cloud & DevOps",
    roles: ["SRE", "DevOps Engineer", "Architect"],
    description:
      "Plans headroom so growth does not become an outage. Use before a scaling event, when utilisation is climbing, or when planning next year's infrastructure.",
    body: `
# Capacity Planning

## Find the binding constraint

Systems rarely run out of everything at once. One resource saturates first — database connections, memory, IOPS, a third-party rate limit, a licence count.

Load test to find which, because it is almost never the one people assume, and planning around CPU when connections bind wastes the budget.

## Plan against peak, with a shape

Averages hide the moment that breaks you. Know the daily and weekly peak, and the multiplier of your largest known event over a normal day.

Provision for peak plus headroom for the failure of one unit of redundancy, since capacity planning and resilience planning share the same arithmetic.

## Headroom is a decision with a number

Pick a utilisation target and defend it — typically 50-70% of the saturation point for the binding resource, depending on how quickly you can add capacity.

Running at 90% is efficient right up until a modest spike, and leaves no room for the slow degradation nobody noticed.

## Know your time to add capacity

Autoscaling that takes eight minutes cannot absorb a two-minute spike. Measure the real time from trigger to serving traffic, including image pull and warm-up.

Where that time is long, you are pre-provisioning, not scaling, and should plan accordingly.

## Watch the trend, not the instant

Track utilisation against growth over months and project when it meets your target. That date is when the work must be finished, not started.

Set alerts on the trend crossing a threshold, not only on the resource being nearly exhausted.

## Watch out for

- Scaling one tier and moving the bottleneck to the next, unmeasured.
- Cold caches after a scale-up, which briefly increase load on the database.
- Connection pools sized per instance, so scaling out exhausts the database.
- Quotas and limits at the provider that bind before your own capacity does.
- Assuming linear scaling across a shared resource that does not scale linearly.

## Finishing

The binding resource is identified by measurement. Provisioning targets peak plus redundancy loss. Time-to-capacity is known. Trend alerts precede exhaustion.
`,
  },
  {
    name: "chaos-engineering",
    category: "Cloud & DevOps",
    roles: ["SRE", "Engineer", "Architect"],
    description:
      "Tests resilience by injecting failure deliberately and safely. Use when validating redundancy, or when failover has never actually been exercised.",
    body: `
# Chaos Engineering

## Form a hypothesis first

This is an experiment, not vandalism. State what you believe will happen: "if one replica is killed, requests continue with no elevated error rate and recovery completes within 30 seconds."

Without a hypothesis you learn only that something broke, not whether the system behaved as designed.

## Establish steady state before touching anything

Define and measure normal: error rate, latency percentiles, throughput. You need the baseline to tell whether the experiment caused a deviation.

Abort criteria come from the same measurement — decide in advance what result stops the test immediately.

## Start small, and in the safest environment that is still meaningful

Begin in staging, then production with a tiny blast radius: one instance, one availability zone, a small share of traffic.

Staging-only chaos finds staging problems. The point is eventually to test production, but not on day one and never without a stop button.

## Inject the failures you actually face

Instance loss, network latency, dependency timeouts, DNS failure, disk full, clock skew, a slow rather than dead dependency.

Slow dependencies are the most valuable and most neglected: systems handle a hard failure far better than one that responds in nine seconds.

## Fix what you find before the next experiment

Running more experiments while findings are unaddressed produces a backlog and no resilience.

Each experiment should end with either a confirmed hypothesis or a specific fix, then rerun to verify.

## Watch out for

- Running without the on-call team knowing, which turns an experiment into an incident.
- No abort mechanism, or one that depends on the system being broken.
- Experiments during a change freeze or a peak business period.
- Testing only single failures when real incidents are correlated.
- Automating chaos before the basics — retries, timeouts, health checks — actually work.

## Finishing

Each experiment has a hypothesis, a measured steady state, a small blast radius, an abort criterion, and an owner for whatever it finds.
`,
  },
  {
    name: "mobile-app-release",
    category: "Software Engineering",
    roles: ["Engineer", "Product Manager", "QA Engineer"],
    description:
      "Ships mobile releases given review delays and users who never update. Use when planning a mobile release, or after a bad build reached users.",
    body: `
# Mobile App Release

## You cannot recall a release

Once a build is downloaded it is on the device until the user updates. There is no equivalent of rolling back a server deploy.

This single fact should shape everything: staged rollout, feature flags, and a server-side kill switch for anything risky.

## Roll out in stages and watch

Release to a small percentage first and hold. Watch crash-free rate, not just crash count, and compare against the previous version rather than an absolute threshold.

Give each stage enough time to cover a full daily cycle. Problems that only appear on the morning commute are invisible in an afternoon.

## Put risky behaviour behind a server-controlled flag

A flag you can turn off without a release converts a fatal bug into a bad afternoon. Without it, the fix requires a build, a review and a user update — days, at best.

## Support the versions your users are actually on

A meaningful share of users update slowly or never. Your API must keep working for builds shipped a year ago, or you break people who did nothing wrong.

Track the version distribution and decide deliberately when to force an upgrade — with a clear in-app message, not a silent failure.

## Test on real devices, especially old ones

Simulators miss memory pressure, thermal throttling, poor networks and manufacturer variations. The cheapest popular device in your market is the one that finds the most bugs.

Test on a slow, lossy connection. Most mobile bugs are network bugs.

## Watch out for

- Store review timing before a holiday or a launch date.
- Silent failures when a permission is denied, which the simulator grants automatically.
- Migrations of local data on update, which run once on a device you cannot inspect.
- Deep links and push handling untested from a cold start.
- Analytics that only report from users who successfully launched the app.

## Finishing

Rollout is staged and monitored on crash-free rate. Risky behaviour has a server-side switch. Old app versions remain supported. Testing covered real, slow devices.
`,
  },
  {
    name: "frontend-performance",
    category: "Software Engineering",
    roles: ["Frontend Engineer", "Engineer", "Product Designer"],
    description:
      "Makes web interfaces load and respond quickly. Use when a page feels slow, before a launch, or when performance metrics regress.",
    body: `
# Frontend Performance

## Measure on real conditions, not your machine

A developer's laptop on office wifi is the least representative environment available. Test on a mid-range phone on a throttled connection.

Field data from real users beats lab data for knowing whether you have a problem; lab data beats field data for diagnosing it. Use both.

## Know which metric maps to which complaint

Slow to appear is loading — largest contentful paint. Janky and unresponsive to taps is interactivity — long tasks blocking the main thread. Things jumping around is layout shift.

Optimising the wrong one is why performance work sometimes changes nothing users notice.

## JavaScript is the usual cause

Bytes of script cost far more than equivalent bytes of image: they must be downloaded, parsed, compiled and executed, largely on the main thread.

Audit the bundle before optimising anything else. A date library, a moment of duplicated dependencies, or an analytics script frequently dominates.

Split by route, defer what is not needed for first paint, and remove what nothing imports.

## Reserve space for anything that loads late

Images, ads and embeds inserted without dimensions shove content down as they arrive, causing mis-taps and frustration.

Set width and height, or an aspect ratio, on every element whose content arrives asynchronously.

## Cache deliberately at every layer

Immutable, content-hashed filenames with long cache lifetimes turn repeat visits into near-instant loads.

Serve a stale response while revalidating where correctness allows it. The fastest request is the one that never leaves the device.

## Watch out for

- Third-party scripts, which are usually the largest cost and the least controlled. Measure each one's real contribution.
- Web fonts blocking text rendering; use a fallback and swap.
- Rendering thousands of rows without virtualisation.
- Loading everything for a page most users never scroll to the bottom of.
- Chasing a lab score while field metrics stay flat.

## Finishing

Measured on a mid-range device and throttled network. The bundle has been audited. Late-loading content reserves space. Static assets are content-hashed and cached.
`,
  },
  {
    name: "database-indexing",
    category: "Software Engineering",
    roles: ["Engineer", "Data Engineer", "Architect"],
    description:
      "Adds the indexes a workload needs and removes the ones it does not. Use when queries are slow, before a traffic increase, or when writes have degraded.",
    body: `
# Database Indexing

## Read the plan before adding anything

An index added on intuition is as likely to be unused as to help. \`EXPLAIN ANALYZE\` shows what the planner actually does and where the time goes.

Look for sequential scans on large tables, and for a large gap between estimated and actual row counts — the latter usually means stale statistics, not a missing index.

## Column order in a composite index is the whole design

An index on \`(a, b)\` serves queries filtering on \`a\`, and on \`a\` and \`b\`. It does not serve a query filtering only on \`b\`.

Put equality columns first, then the range or sort column. Getting this backwards produces an index that looks relevant and is never chosen.

## Cover the query when the lookup is hot

Including the selected columns in the index lets the database answer entirely from it, skipping the table read. On a hot query that is a large win.

The cost is a wider index and slower writes, so reserve it for queries that genuinely matter.

## Every index taxes every write

Indexes are not free: each insert, update and delete maintains them all. A table with twelve indexes writes slowly and uses far more storage than the data itself.

Audit for unused indexes periodically — most databases track index usage — and drop what nothing reads.

## Watch for what silently disables an index

Wrapping a column in a function, comparing across types, leading wildcards in a pattern, and low selectivity all cause the planner to skip the index.

If a query ignores an index you expect it to use, the predicate is usually the reason.

## Watch out for

- Indexing a boolean or any column with two values; it rarely helps.
- Duplicate and redundant indexes, where \`(a)\` is already covered by \`(a, b)\`.
- Building indexes without the concurrent option on a live table, which takes a write lock.
- Optimising a query that runs once a day while ignoring one that runs constantly.
- Assuming an index helps a write-heavy table; sometimes removing one is the fix.

## Finishing

Changes are driven by query plans. Composite column order matches the predicates. Unused indexes are dropped. Write impact was considered.
`,
  },
];
