/**
 * Writes a batch of skills to `skills/<name>/`.
 *
 * A generator rather than 72 hand-placed file pairs: SKILL.md's frontmatter and
 * pocket.json's shape are fixed by the schema, so the only thing worth writing by
 * hand is the guidance itself. Keeping the boilerplate here means every skill is
 * structurally identical and a schema change is one edit rather than a hundred.
 *
 * The content below is the actual deliverable. It is written to the same standard
 * as the existing skills — specific, opinionated, and about trade-offs rather than
 * definitions. Anything that reads like a summary of a tutorial does not belong.
 *
 *   node gen-skills.mjs
 *
 * Existing directories are never overwritten, so this is safe to re-run.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SKILLS } from "./skills.data.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "skills");

let written = 0;
let skipped = 0;

for (const skill of SKILLS) {
  const dir = path.join(root, skill.name);
  if (fs.existsSync(dir)) {
    skipped += 1;
    continue;
  }
  fs.mkdirSync(dir, { recursive: true });

  // The description is what an agent reads when deciding whether to load the
  // skill at all, so it states the trigger, not just the topic.
  const frontmatter = [
    "---",
    `name: ${skill.name}`,
    "description: >-",
    `  ${skill.description}`,
    "---",
    "",
  ].join("\n");

  fs.writeFileSync(path.join(dir, "SKILL.md"), frontmatter + skill.body.trimStart() + "\n", "utf8");

  fs.writeFileSync(
    path.join(dir, "pocket.json"),
    JSON.stringify(
      {
        $schema: "https://usepocket.net/schema/skill.json",
        category: skill.category,
        author: "pocket",
        roles: skill.roles,
        license: "MIT",
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );
  written += 1;
}

console.log(`skills: ${written} written, ${skipped} already present`);
console.log(`total now: ${fs.readdirSync(root).length}`);
