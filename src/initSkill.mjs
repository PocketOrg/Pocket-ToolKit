import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { ask, c, confirm, heading, multiSelect, note, select } from "./prompt.mjs";
import { auditSkill } from "./audit.mjs";
import { CATEGORIES, slugify, titleCase } from "./shared.mjs";

/**
 * Guided skill scaffolding.
 *
 * The questions are ordered by how much they shape the result, and the ones that
 * matter most to whether the skill actually works come first. In particular the
 * description is asked about at length, because it is the only part always
 * loaded into context and therefore the only thing deciding whether the skill is
 * ever selected — a vague description produces a skill that silently never runs.
 */

/**
 * The generated layout.
 *
 *   my-skill/
 *   ├── SKILL.md          the skill itself: frontmatter + instructions
 *   ├── README.md         for humans browsing the repo on GitHub
 *   ├── pocket.json       Pocket-specific metadata the standard has no field for
 *   └── reference/        optional deep material, loaded only when needed
 *       └── examples.md
 *
 * SKILL.md stays portable — any Agent Skills runtime can read it. Everything
 * Pocket-specific lives in `pocket.json` rather than as non-standard frontmatter
 * keys, so the skill remains valid for other runtimes too.
 */
export async function initSkill(targetDir) {
  heading("Create a Pocket Skill");
  note("A skill is instructions your agent reads — knowledge, not code.");
  note("Press enter to accept the value in brackets.\n");

  const rawName = await ask("Skill name", {
    def: path.basename(targetDir) === "." ? "my-skill" : slugify(path.basename(targetDir)),
    validate: (value) =>
      /^[a-z0-9][a-z0-9-]{1,63}$/.test(slugify(value))
        ? null
        : "Use lowercase letters, digits and hyphens (2–64 characters).",
  });
  const name = slugify(rawName);

  heading("Description");
  note("This is the ONLY part always loaded into context. The agent reads it to");
  note("decide whether your skill is relevant, so it must say what the skill does");
  note("and when to use it. This single field decides if your skill ever runs.\n");

  const what = await ask("What does it do?", {
    validate: (value) => (value.length >= 10 ? null : "A little more detail, please."),
  });
  const when = await ask("When should the agent use it? (finishes “Use when …”)", {
    validate: (value) => (value.length >= 8 ? null : "A little more detail, please."),
  });

  const description = `${what.replace(/\.?$/, ".")} Use when ${when.replace(/\.$/, "")}.`;

  const category = await select(
    "Category",
    CATEGORIES.map((label) => ({ label })),
    CATEGORIES.indexOf("Software Engineering"),
  );

  const author = await ask("Your GitHub handle", {
    validate: (value) =>
      /^[A-Za-z0-9][A-Za-z0-9-]{0,38}$/.test(value) ? null : "That does not look like a handle.",
  });

  heading("Scope");
  const roles = await ask(
    "Agent roles this suits, comma-separated (blank = any)",
    { def: "" },
  );

  const extras = await multiSelect("Include optional files?", [
    { label: "reference/examples.md", hint: "worked examples, loaded on demand" },
    { label: "reference/checklist.md", hint: "a checklist the agent can follow" },
  ]);

  const root = path.resolve(targetDir === "." ? name : targetDir);
  if (existsSync(root)) {
    const proceed = await confirm(`${path.basename(root)}/ already exists. Write into it?`, false);
    if (!proceed) {
      console.log(`\n  ${c.yellow("Cancelled.")} Nothing was written.`);
      return null;
    }
  }

  const roleList = roles
    .split(",")
    .map((role) => role.trim())
    .filter(Boolean);

  const skillMarkdown = renderSkillMarkdown({ name, description, body: null });
  const files = {
    "SKILL.md": skillMarkdown,
    "README.md": renderReadme({ name, description, category: category.label, author }),
    "pocket.json": `${JSON.stringify(
      {
        $schema: "https://usepocket.net/schema/skill.json",
        category: category.label,
        author,
        roles: roleList,
        license: "MIT",
      },
      null,
      2,
    )}\n`,
  };

  if (extras.some((extra) => extra.label.endsWith("examples.md"))) {
    files["reference/examples.md"] = renderExamples(name);
  }
  if (extras.some((extra) => extra.label.endsWith("checklist.md"))) {
    files["reference/checklist.md"] = renderChecklist(name);
  }

  for (const [relative, contents] of Object.entries(files)) {
    const destination = path.join(root, relative);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, contents, "utf8");
  }

  heading("Created");
  console.log(`  ${c.green("✓")} ${path.relative(process.cwd(), root) || "."}/`);
  for (const relative of Object.keys(files)) {
    console.log(`      ${c.dim(relative)}`);
  }

  // Audit immediately. The point is to teach the constraints while the author is
  // still in the loop, rather than at pull-request time.
  const result = auditSkill({ skillMarkdown });
  heading("Audit");
  console.log(`  Structure ${result.verdict === "pass" ? c.green("OK") : c.yellow("see below")}`);
  console.log(
    `  Context cost ~${c.bold(result.tokens.total.toLocaleString())} tokens ${c.dim(
      `(${result.tokens.description} of that always loaded)`,
    )}`,
  );
  for (const finding of result.findings) {
    console.log(`  ${c.yellow("!")} ${finding.title} ${c.dim(`[${finding.rule}]`)}`);
  }

  heading("Next");
  note(`1. Write the instructions in ${name}/SKILL.md`);
  note(`2. Check it:  npx @pocket/create audit ${name}`);
  note(`3. Open a pull request against github.com/usepocket/skills`);

  return root;
}

/* ------------------------------------------------------------- templates */

function renderSkillMarkdown({ name, description, body }) {
  // Description is quoted and folded: it frequently contains a colon, which
  // would otherwise make the YAML ambiguous.
  return `---
name: ${name}
description: >-
  ${description.replace(/\n/g, " ")}
---

# ${titleCase(name)}

${body ?? `<!-- Replace everything below with your actual instructions. -->

Describe what the agent should do, in the order it should do it. Write for a
capable colleague who is new to this specific task: state the decisions, the
constraints and the things that are easy to get wrong.

## When this applies

Be concrete about the situations this covers, and say what it does NOT cover so
the agent hands back rather than guessing.

## How to do it

1. Start with the step that is most often skipped.
2. Prefer specifics over generalities — name the commands, files and formats.
3. Say what "done" looks like, so the agent can tell when to stop.

## Watch out for

- The mistake someone makes the first time they do this.
- The case where the obvious approach is wrong.

## Keep it tight

Every token here is spent on every message once this skill loads. Move long
reference material into \`reference/\` and mention it by filename — the agent
reads those only when it needs them.`}
`;
}

function renderReadme({ name, description, category, author }) {
  return `# ${titleCase(name)}

${description}

- **Category** — ${category}
- **Author** — [@${author}](https://github.com/${author})
- **Type** — Skill (instructions, no executable code)

## What this is

A [Pocket Skill](https://usepocket.net/skills): a \`SKILL.md\` file containing
instructions an AI agent loads when the task calls for it. It is portable — the
same file works in any runtime that supports the Agent Skills format.

## Files

| File | Purpose |
| --- | --- |
| \`SKILL.md\` | The skill. Frontmatter plus instructions. |
| \`pocket.json\` | Pocket metadata: category, roles, license. |
| \`reference/\` | Supporting material, loaded only when needed. |

## Checking it

\`\`\`bash
npx @pocket/create audit .
\`\`\`

This reports structural problems, prompt-injection risks and the skill's context
cost — the same checks that run in CI on the public repository.

## Licence

MIT
`;
}

function renderExamples(name) {
  return `# ${titleCase(name)} — examples

Worked examples the agent can follow. This file is NOT loaded automatically;
reference it from \`SKILL.md\` so it is read only when it is needed.

## Example: a typical case

**Input** — what the user asked for.

**Approach** — the decisions made, and why.

**Output** — what good looks like.

## Example: an edge case

Cover the case where the obvious approach fails, and say what to do instead.
`;
}

function renderChecklist(name) {
  return `# ${titleCase(name)} — checklist

A checklist the agent can work through. Keep the items verifiable — each one
should be something that is clearly either done or not done.

- [ ] The first thing that is usually forgotten
- [ ] The check that catches the common failure
- [ ] Confirm the output matches the expected shape
- [ ] State what was done, and what was deliberately not done
`;
}
