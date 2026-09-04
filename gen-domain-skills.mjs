/**
 * Writes the domain-coverage skills to `skills/<name>/`.
 *
 * The same generator shape as `gen-skills.mjs` — see its header for why the boilerplate lives in a
 * script and the content lives in a data file. This one reads `skills-domains.data.mjs`, the batch
 * written against a measured routing gap rather than by topic.
 *
 *   node gen-domain-skills.mjs
 *
 * Existing directories are never overwritten, so this is safe to re-run.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DOMAIN_SKILLS } from "./skills-domains.data.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "skills");

let written = 0;
let skipped = 0;

for (const skill of DOMAIN_SKILLS) {
  const dir = path.join(root, skill.name);
  if (fs.existsSync(dir)) {
    skipped += 1;
    continue;
  }
  fs.mkdirSync(dir, { recursive: true });

  /*
   * The description is what an agent reads when deciding whether to load the skill at all, so it
   * states the trigger and not just the topic. Folded with `>-` because it is a single logical line
   * that would otherwise run past any reasonable width.
   */
  const frontmatter = [
    "---",
    `name: ${skill.name}`,
    "description: >-",
    `  ${skill.description}`,
    "---",
  ].join("\n");

  fs.writeFileSync(path.join(dir, "SKILL.md"), `${frontmatter}\n${skill.body.trimStart()}`);

  /*
   * `roles` is the routing key. `skillsForRole` matches on shared meaningful words, so every entry
   * here must be an exact role string from the agent catalogue — a near-miss silently reaches
   * nobody, which is the failure this batch exists to fix.
   */
  fs.writeFileSync(
    path.join(dir, "pocket.json"),
    `${JSON.stringify(
      {
        $schema: "https://usepocket.net/schema/skill.json",
        category: skill.category,
        author: "pocket",
        roles: skill.roles,
        license: "MIT",
      },
      null,
      2,
    )}\n`,
  );

  written += 1;
}

console.log(`domain skills: ${written} written, ${skipped} already present`);
