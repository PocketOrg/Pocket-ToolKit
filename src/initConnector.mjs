import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { ask, c, confirm, heading, note, select } from "./prompt.mjs";
import { CATEGORIES, slugify, titleCase } from "./shared.mjs";

/**
 * Guided connector scaffolding.
 *
 * A Connector is an MCP server: a process exposing callable tools. That makes it
 * a different kind of thing from a Skill, and the questions reflect it —
 * transport, authentication and the scopes it needs, none of which a Skill has.
 *
 * The distinction worth holding on to: a Skill is knowledge (how to do
 * something), a Connector is capability (the ability to do it). A Connector
 * without a Skill is a tool the agent uses naively; a Skill without a Connector
 * is advice it cannot act on. Most useful pairs ship both.
 */

const TRANSPORTS = [
  { id: "stdio", label: "stdio", hint: "a local process — most common" },
  { id: "http", label: "HTTP", hint: "a hosted endpoint" },
  { id: "sse", label: "SSE", hint: "server-sent events, for streaming" },
];

const AUTH_KINDS = [
  { id: "none", label: "None", hint: "public or local-only" },
  { id: "apiKey", label: "API key", hint: "a single secret token" },
  { id: "oauth2", label: "OAuth 2", hint: "per-user authorisation" },
];

export async function initConnector(targetDir) {
  heading("Create a Pocket Connector");
  note("A connector is an MCP server — callable tools, not instructions.");
  note("If you want to teach the agent how to use something, create a Skill instead.\n");

  const rawName = await ask("Connector name", {
    def: path.basename(targetDir) === "." ? "my-connector" : slugify(path.basename(targetDir)),
    validate: (value) =>
      /^[a-z0-9][a-z0-9-]{1,63}$/.test(slugify(value))
        ? null
        : "Use lowercase letters, digits and hyphens (2–64 characters).",
  });
  const name = slugify(rawName);

  const summary = await ask("What service does it connect to, and what can it do?", {
    validate: (value) => (value.length >= 15 ? null : "A little more detail, please."),
  });

  const category = await select(
    "Category",
    CATEGORIES.map((label) => ({ label })),
    CATEGORIES.indexOf("Tools & Automation"),
  );

  const transport = await select("Transport", TRANSPORTS, 0);

  /*
   * How Pocket actually reaches the server, which differs by transport: a local
   * process needs a command to start, a hosted one needs a URL. The schema
   * requires whichever applies, so both are collected here rather than left for
   * the author to discover from a validation error.
   */
  let command;
  let endpoint;
  if (transport.id === "stdio") {
    const run = await ask("Command that starts the server", {
      def: "npx",
      validate: (value) => (value ? null : "Required for a stdio connector."),
    });
    const argsRaw = await ask("Arguments, space-separated", { def: `${name}-mcp` });
    command = { run, args: argsRaw.split(/\s+/).filter(Boolean) };
  } else {
    endpoint = await ask("HTTPS endpoint", {
      validate: (value) =>
        /^https:\/\/\S+$/.test(value) ? null : "Must be an https:// URL.",
    });
  }

  const auth = await select("Authentication", AUTH_KINDS, 0);

  const author = await ask("Your GitHub handle", {
    validate: (value) =>
      /^[A-Za-z0-9][A-Za-z0-9-]{0,38}$/.test(value) ? null : "That does not look like a handle.",
  });

  heading("Tools");
  note("Name the tools this connector exposes. One per line; blank line to finish.");
  note("Use verb-first names an agent can reason about: `create_issue`, not `issues`.\n");

  const tools = [];
  for (;;) {
    const tool = await ask(`Tool ${tools.length + 1} (blank to finish)`, { def: "" });
    if (!tool) break;
    const toolSlug = tool.trim().replace(/[^a-z0-9_]+/gi, "_").toLowerCase();
    const purpose = await ask(`  What does \`${toolSlug}\` do?`, {
      validate: (value) => (value.length >= 8 ? null : "A little more detail, please."),
    });
    tools.push({ name: toolSlug, purpose });
  }

  // Scopes are only meaningful once there is authentication to scope.
  const scopes =
    auth.id === "none"
      ? []
      : (
          await ask("Permission scopes it needs, comma-separated", { def: "read" })
        )
          .split(",")
          .map((scope) => scope.trim())
          .filter(Boolean);

  const root = path.resolve(targetDir === "." ? name : targetDir);
  if (existsSync(root)) {
    const proceed = await confirm(`${path.basename(root)}/ already exists. Write into it?`, false);
    if (!proceed) {
      console.log(`\n  ${c.yellow("Cancelled.")} Nothing was written.`);
      return null;
    }
  }

  const manifest = {
    $schema: "https://usepocket.net/schema/connector.json",
    name,
    summary,
    category: category.label,
    author,
    transport: transport.id,
    ...(command ? { command } : {}),
    ...(endpoint ? { endpoint } : {}),
    auth: auth.id,
    scopes,
    tools: tools.map((tool) => ({
      name: tool.name,
      description: tool.purpose,
      // Left for the author to complete: a guessed schema is worse than an
      // obviously empty one, because it looks finished.
      inputSchema: { type: "object", properties: {}, required: [] },
    })),
    license: "MIT",
  };

  const files = {
    "connector.json": `${JSON.stringify(manifest, null, 2)}\n`,
    "README.md": renderReadme({ name, summary, category: category.label, author, transport, auth, tools, scopes }),
    "TOOLS.md": renderTools({ name, tools }),
  };

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

  if (!tools.length) {
    console.log(
      `\n  ${c.yellow("!")} No tools declared. A connector with no tools does nothing —`,
    );
    console.log(`    add them to ${c.dim("connector.json")} before submitting.`);
  }

  heading("Next");
  note(`1. Fill in each tool's inputSchema in ${name}/connector.json`);
  note(`2. Document behaviour and limits in ${name}/TOOLS.md`);
  note(`3. Open a pull request against github.com/usepocket/connectors`);

  return root;
}

/* ------------------------------------------------------------- templates */

function renderReadme({ name, summary, category, author, transport, auth, tools, scopes }) {
  return `# ${titleCase(name)}

${summary}

- **Category** — ${category}
- **Author** — [@${author}](https://github.com/${author})
- **Transport** — ${transport.label}
- **Auth** — ${auth.label}${scopes.length ? ` (${scopes.join(", ")})` : ""}
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. Connectors provide *capability* — the ability to do
something. If you want to teach an agent *how* to use a service well, that is a
Skill, and the two work best shipped together.

## Tools

${
  tools.length
    ? tools.map((tool) => `- \`${tool.name}\` — ${tool.purpose}`).join("\n")
    : "_None declared yet._"
}

See [TOOLS.md](./TOOLS.md) for parameters, limits and failure modes.

## Configuration

${
  auth.id === "none"
    ? "No credentials required."
    : auth.id === "apiKey"
      ? `Set an API key in your Pocket workspace. The connector receives it at
runtime — never commit a key to this repository.`
      : `Users authorise this connector individually via OAuth 2. Register your
redirect URI with Pocket before submitting.`
}

## Licence

MIT
`;
}

function renderTools({ name, tools }) {
  const sections = tools.length
    ? tools
        .map(
          (tool) => `## \`${tool.name}\`

${tool.purpose}

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| | | | |

**Returns** — describe the shape, and what an empty result looks like.

**Errors** — what can fail, and what the agent should do about it.

**Limits** — rate limits, pagination, maximum sizes.
`,
        )
        .join("\n")
    : "_No tools declared yet._\n";

  return `# ${titleCase(name)} — tools

Reference for every tool this connector exposes. Agents read this to decide
which tool fits, so be precise about what each one does and does not do.

${sections}`;
}
