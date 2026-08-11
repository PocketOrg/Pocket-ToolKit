import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { auditSkill } from "../audit.mjs";
import { titleCase } from "../shared.mjs";
import { SKILLS } from "./skills.data.mjs";
import { CONNECTORS } from "./connectors.data.mjs";

/**
 * Generates the seed catalogue from the definitions in `*.data.mjs`.
 *
 * The content lives as data rather than as hundreds of hand-maintained markdown
 * files so the *shape* is guaranteed consistent — every skill has scope, ordered
 * method, pitfalls and a completion criterion — while the words stay specific to
 * each subject. A skill whose body is generic boilerplate is worse than no skill
 * at all, because it teaches users the catalogue is not worth browsing.
 *
 * Every generated skill is audited as it is written, and the run fails if any of
 * them would not pass the gate. That way the seed catalogue can never ship
 * something the marketplace would reject.
 */

const here = path.dirname(fileURLToPath(import.meta.url));
const skillsRoot = path.resolve(here, "../../skills");
const connectorsRoot = path.resolve(here, "../../connectors");

/** Renders one skill's SKILL.md from its definition. */
function renderSkill(skill) {
  const description = `${skill.what.replace(/\.?$/, ".")} Use when ${skill.when.replace(/\.$/, "")}.`;

  const body = skill.sections
    .map(([heading, lines]) => {
      const rendered = lines
        .map((line) =>
          // A line already starting with a bold label is a definition-style
          // bullet; anything else is a paragraph or a numbered step.
          line.startsWith("**") ? `- ${line}` : line,
        )
        .join("\n\n");
      return `## ${heading}\n\n${rendered}`;
    })
    .join("\n\n");

  const traps = skill.traps.map((trap) => `- ${trap}`).join("\n");

  return `---
name: ${skill.slug}
description: >-
  ${description}
---

# ${titleCase(skill.slug)}

${body}

## Watch out for

${traps}

## Finishing

${skill.done}
`;
}

function renderSkillMeta(skill) {
  return `${JSON.stringify(
    {
      $schema: "https://usepocket.net/schema/skill.json",
      category: skill.cat,
      author: "pocket",
      roles: skill.roles ?? [],
      license: "MIT",
      ...(skill.keywords ? { keywords: skill.keywords } : {}),
      ...(skill.requiresConnectors ? { requiresConnectors: skill.requiresConnectors } : {}),
      ...(skill.adaptedFrom ? { adaptedFrom: skill.adaptedFrom } : {}),
    },
    null,
    2,
  )}\n`;
}

function renderConnector(connector) {
  const manifest = {
    $schema: "https://usepocket.net/schema/connector.json",
    name: connector.slug,
    summary: connector.summary,
    category: connector.cat,
    author: "pocket",
    transport: connector.transport ?? "stdio",
    ...(connector.transport === "http" || connector.transport === "sse"
      ? { endpoint: connector.endpoint }
      : { command: connector.command ?? { run: "npx", args: [`${connector.slug}-mcp`] } }),
    auth: connector.auth,
    scopes: connector.auth === "none" ? [] : (connector.scopes ?? []),
    tools: connector.tools.map((tool) => ({
      name: tool.name,
      description: tool.desc,
      inputSchema: {
        type: "object",
        properties: Object.fromEntries(
          Object.entries(tool.params ?? {}).map(([key, spec]) => [
            key,
            typeof spec === "string"
              ? { type: "string", description: spec }
              : { type: spec.type, description: spec.desc },
          ]),
        ),
        required: Object.entries(tool.params ?? {})
          .filter(([, spec]) => typeof spec !== "string" && spec.required)
          .map(([key]) => key),
      },
      ...(tool.readOnly ? { readOnly: true } : {}),
    })),
    license: "MIT",
    ...(connector.homepage ? { homepage: connector.homepage } : {}),
  };
  return `${JSON.stringify(manifest, null, 2)}\n`;
}

function renderConnectorTools(connector) {
  const sections = connector.tools
    .map((tool) => {
      const params = Object.entries(tool.params ?? {});
      const rows = params.length
        ? params
            .map(([key, spec]) => {
              const type = typeof spec === "string" ? "string" : spec.type;
              const required = typeof spec !== "string" && spec.required ? "yes" : "no";
              const desc = typeof spec === "string" ? spec : spec.desc;
              return `| \`${key}\` | ${type} | ${required} | ${desc} |`;
            })
            .join("\n")
        : "| _none_ | | | |";

      return `## \`${tool.name}\`

${tool.desc}${tool.readOnly ? "\n\nRead-only — safe to call without confirmation." : ""}

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
${rows}
`;
    })
    .join("\n");

  return `# ${titleCase(connector.slug)} — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

${sections}`;
}

function renderConnectorReadme(connector) {
  return `# ${titleCase(connector.slug)}

${connector.summary}

- **Category** — ${connector.cat}
- **Transport** — ${connector.transport ?? "stdio"}
- **Auth** — ${connector.auth}${connector.scopes?.length ? ` (${connector.scopes.join(", ")})` : ""}
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

${connector.tools.map((tool) => `- \`${tool.name}\` — ${tool.desc}`).join("\n")}

See [TOOLS.md](./TOOLS.md) for parameters.

## Licence

MIT
`;
}

/* ------------------------------------------------------------------- run */

let written = 0;
let rejected = 0;
const seen = new Set();

for (const skill of SKILLS) {
  if (seen.has(skill.slug)) throw new Error(`Duplicate skill slug: ${skill.slug}`);
  seen.add(skill.slug);

  const markdown = renderSkill(skill);
  const result = auditSkill({ skillMarkdown: markdown });

  // The seed catalogue must never contain something the gate would reject.
  if (result.verdict !== "pass") {
    rejected += 1;
    console.error(
      `  REJECTED ${skill.slug} — ${result.verdict}: ${result.findings
        .map((f) => f.rule)
        .join(", ")}`,
    );
    continue;
  }

  const dir = path.join(skillsRoot, skill.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "SKILL.md"), markdown, "utf8");
  await writeFile(path.join(dir, "pocket.json"), renderSkillMeta(skill), "utf8");
  written += 1;
}

let connectorsWritten = 0;
const connectorSlugs = new Set();

for (const connector of CONNECTORS) {
  if (connectorSlugs.has(connector.slug)) {
    throw new Error(`Duplicate connector slug: ${connector.slug}`);
  }
  connectorSlugs.add(connector.slug);

  if (!connector.tools?.length) {
    throw new Error(`${connector.slug} declares no tools`);
  }

  const dir = path.join(connectorsRoot, connector.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "connector.json"), renderConnector(connector), "utf8");
  await writeFile(path.join(dir, "README.md"), renderConnectorReadme(connector), "utf8");
  await writeFile(path.join(dir, "TOOLS.md"), renderConnectorTools(connector), "utf8");
  connectorsWritten += 1;
}

console.log(`\nskills      ${written} written${rejected ? `, ${rejected} REJECTED` : ""}`);
console.log(`connectors  ${connectorsWritten} written`);

if (rejected) {
  console.error("\nSome skills failed the audit. Fix them before shipping the catalogue.");
  process.exit(1);
}
