#!/usr/bin/env node
import { readdir, readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { auditSkill } from "../src/audit.mjs";
import { initSkill } from "../src/initSkill.mjs";
import { initConnector } from "../src/initConnector.mjs";
import { c, closePrompt, heading, note, primeInput, select } from "../src/prompt.mjs";

/**
 * `pocket` — scaffold and audit Pocket Skills and Connectors.
 *
 *   pocket init [dir]           guided setup, asks which kind
 *   pocket init skill [dir]     scaffold a skill
 *   pocket init connector [dir] scaffold a connector
 *   pocket audit [dir]          audit a skill directory
 *
 * Exit codes matter here: `audit` returns non-zero on a failing verdict so it
 * works unchanged as a CI gate on the public repositories.
 */

const HELP = `${c.bold("pocket")} — create and check Pocket Skills and Connectors

${c.bold("Usage")}
  pocket init [skill|connector] [directory]
  pocket audit [directory]
  pocket --help

${c.bold("Commands")}
  init       Guided setup for a new skill or connector
  audit      Check a skill for structure, safety and context cost

${c.bold("Examples")}
  npx @pocket/create init
  npx @pocket/create init skill pr-conventions
  npx @pocket/create audit ./pr-conventions

${c.bold("What is the difference?")}
  ${c.cyan("Skill")}      Instructions the agent reads — knowledge. Costs context tokens.
  ${c.cyan("Connector")}  An MCP server exposing tools — capability. Costs a call.
`;

/** Reads a skill directory into the shape the audit expects. */
async function loadSkillDir(dir) {
  const root = path.resolve(dir);
  const skillPath = path.join(root, "SKILL.md");
  if (!existsSync(skillPath)) {
    throw new Error(`No SKILL.md in ${path.relative(process.cwd(), root) || "."}`);
  }

  const skillMarkdown = await readFile(skillPath, "utf8");
  const assets = {};

  // Everything alongside SKILL.md is part of the skill and gets audited, since a
  // reference file is also instructions the agent may read.
  const walk = async (current, prefix = "") => {
    for (const entry of await readdir(current, { withFileTypes: true })) {
      if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
      const absolute = path.join(current, entry.name);
      const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        await walk(absolute, relative);
        continue;
      }
      if (relative === "SKILL.md") continue;
      // Skip anything large or binary — it is not instructions, and reading it
      // would only slow the audit down.
      const info = await stat(absolute);
      if (info.size > 256 * 1024) continue;
      if (!/\.(md|markdown|txt|json|ya?ml|js|mjs|cjs|ts|py|rb|sh|bash|zsh|ps1|php|pl)$/i.test(relative))
        continue;
      assets[relative] = await readFile(absolute, "utf8");
    }
  };
  await walk(root);

  return { skillMarkdown, assets };
}

const SEVERITY_COLOUR = {
  critical: c.red,
  high: c.red,
  medium: c.yellow,
  low: c.dim,
  info: c.dim,
};

async function runAudit(dir) {
  const { skillMarkdown, assets } = await loadSkillDir(dir);
  const result = auditSkill({ skillMarkdown, assets });

  heading(`Audit — ${path.relative(process.cwd(), path.resolve(dir)) || "."}`);

  const verdictLabel =
    result.verdict === "pass"
      ? c.green("PASS")
      : result.verdict === "review"
        ? c.yellow("NEEDS REVIEW")
        : c.red("FAIL");
  console.log(`  ${verdictLabel}  ${c.bold(`${result.score}/100`)}`);
  console.log(
    `  Context cost ~${result.tokens.total.toLocaleString()} tokens ` +
      c.dim(`(${result.tokens.description} always loaded, ${result.tokens.body} on demand)`),
  );

  if (!result.findings.length) {
    console.log(`\n  ${c.green("✓")} No findings.`);
  } else {
    console.log("");
    for (const finding of result.findings) {
      const colour = SEVERITY_COLOUR[finding.severity];
      const where = `${finding.file}${finding.line ? `:${finding.line}` : ""}`;
      console.log(`  ${colour(finding.severity.toUpperCase())} ${c.bold(finding.title)}`);
      console.log(`    ${c.dim(`${where}  [${finding.rule}]`)}`);
      console.log(`    ${finding.detail}`);
      if (finding.evidence) console.log(`    ${c.dim(`→ ${finding.evidence}`)}`);
      console.log("");
    }
  }

  if (result.verdict === "fail") {
    note("Critical findings block publication. Fix them and run the audit again.");
  } else if (result.verdict === "review") {
    note("This needs a human read before publishing — that may be fine for your skill.");
  }

  // Non-zero only on `fail`: `review` is a judgement for a person, and failing
  // CI on it would block legitimate skills that discuss dangerous operations.
  return result.verdict === "fail" ? 1 : 0;
}

async function main() {
  const args = process.argv.slice(2).filter((arg) => arg !== "--");

  if (!args.length || args[0] === "--help" || args[0] === "-h" || args[0] === "help") {
    console.log(HELP);
    return 0;
  }

  const [command, ...rest] = args;

  if (command === "audit") {
    return runAudit(rest[0] ?? ".");
  }

  if (command === "init") {
    // Buffer piped stdin before the first prompt. No-op on a real terminal.
    await primeInput();

    let kind = rest[0];
    let dir = rest[1];

    // `pocket init my-thing` — the argument is a directory, not a kind.
    if (kind && kind !== "skill" && kind !== "connector") {
      dir = kind;
      kind = undefined;
    }

    if (!kind) {
      const choice = await select(
        "What are you creating?",
        [
          { label: "Skill", hint: "instructions — knowledge the agent reads" },
          { label: "Connector", hint: "an MCP server — tools the agent calls" },
        ],
        0,
      );
      kind = choice.label.toLowerCase();
    }

    const target = dir ?? ".";
    const created =
      kind === "skill" ? await initSkill(target) : await initConnector(target);
    return created ? 0 : 1;
  }

  console.log(`${c.red("Unknown command")} ${c.bold(command)}\n`);
  console.log(HELP);
  return 1;
}

main()
  .then((code) => {
    closePrompt();
    process.exit(code);
  })
  .catch((error) => {
    closePrompt();
    console.error(`\n${c.red("Error")} ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  });
