/**
 * Skill audit — the same rules the Pocket backend applies on submission.
 *
 * Deliberately duplicated rather than imported. This package is published for
 * `npx` use and open-sourced separately from the Pocket backend, so it cannot
 * depend on that codebase; and an author needs to be able to run the audit
 * offline before opening a pull request.
 *
 * Rule ids are identical to `Backend/src/algorithms/auditSkill.ts` on purpose:
 * the finding you see locally is the finding CI reports and the finding the
 * marketplace shows. If you change a rule in one place, change it in both.
 */

const WEIGHTS = { critical: 45, high: 20, medium: 8, low: 3, info: 0 };

const INSTRUCTION_RULES = [
  {
    rule: "inject/override-system",
    severity: "critical",
    title: "Attempts to override system instructions",
    detail:
      "The skill directs the agent to disregard its own rules. A skill supplies knowledge; it must not rewrite the agent's constraints.",
    pattern:
      /\b(ignore|disregard|forget|override|bypass|discard)\b[^.\n]{0,40}\b(previous|prior|above|earlier|all|any|system|initial)\b[^.\n]{0,20}\b(instruction|prompt|rule|direction|guideline|constraint)/i,
  },
  {
    rule: "inject/identity-reassignment",
    severity: "critical",
    title: "Reassigns the agent's identity or safety posture",
    detail: "Replacing who the agent is, or removing its restrictions, is a jailbreak.",
    pattern:
      /\byou\s+are\s+(now|no\s+longer)\b|\b(pretend|act\s+as\s+if)\b[^.\n]{0,30}\b(no|without)\b[^.\n]{0,20}\b(restriction|limit|filter|guardrail|rule)/i,
  },
  {
    rule: "inject/exfiltrate-context",
    severity: "critical",
    title: "Directs the agent to disclose conversation or system context",
    detail:
      "Asking the agent to reveal its prompt, prior messages or group history is a data-exfiltration path.",
    pattern:
      /\b(send|post|upload|transmit|report|forward|include|reveal|print|output|leak|share)\b[^.\n]{0,50}\b(system\s+prompt|these\s+instructions|conversation\s+history|chat\s+history|previous\s+messages|group'?s?\s+messages|full\s+context|entire\s+thread)/i,
  },
  {
    rule: "inject/credential-harvest",
    severity: "critical",
    title: "Requests credentials or secrets",
    detail: "No legitimate skill needs the agent to handle raw keys, tokens or passwords.",
    pattern:
      /\b(ask|request|obtain|retrieve|read|collect|extract|fetch)\b[^.\n]{0,45}\b(api[\s_-]?key|access[\s_-]?token|secret|password|credential|private[\s_-]?key|\.env\b)/i,
  },
  {
    rule: "inject/covert-channel",
    severity: "high",
    title: "Instructs the agent to hide behaviour from the user",
    detail: "Anything a skill causes must stay visible to the person it acts for.",
    pattern:
      /\b(do\s+not|don'?t|never|without)\b[^.\n]{0,30}\b(tell|inform|mention|notify|disclose|reveal|show)\b[^.\n]{0,25}\b(the\s+)?(user|human|person|them|anyone)/i,
  },
  {
    rule: "inject/silent-network",
    severity: "critical",
    title: "Sends data to an external endpoint",
    detail: "Data leaving the workspace belongs in a reviewed Connector, not a URL in prose.",
    pattern:
      /\b(curl|wget|fetch|POST|GET)\b[^.\n]{0,40}https?:\/\/(?!(?:www\.)?(?:github\.com|docs\.|developer\.|developers\.|.*\.readthedocs\.io))[^\s"'`)]+/i,
  },
  {
    rule: "inject/hidden-text",
    severity: "high",
    title: "Contains hidden or invisible characters",
    detail:
      "Zero-width and bidi-override characters hide instructions from a human reviewer while the model still reads them.",
    pattern: /[​-‍﻿‪-‮⁦-⁩]/,
  },
  {
    rule: "inject/tool-escalation",
    severity: "high",
    title: "Escalates tool or permission use",
    detail: "Tool use should follow from the task, not a blanket instruction.",
    // "without asking" must attach to an ACTION. A bare match flagged benign
    // prose such as "fixing the symptom without asking why the value was
    // missing", which is advice about diligence rather than an instruction.
    pattern:
      // Privilege tokens need an imperative too. Bare `as root` matched security
      // advice *against* running as root, which is a warning not an instruction.
      /\b(use|call|invoke|run)\b[^.\n]{0,25}\b(all|every|any)\b[^.\n]{0,20}\b(tool|connector|function|permission)|\b(run|execute|launch|start|invoke)\b[^.\n]{0,20}\b(as\s+root|with\s+sudo|as\s+administrator)\b|--(dangerously[\w-]*|no-sandbox|disable-web-security)\b|^\s*sudo\s+\S|\b(proceed|continue|execute|run|delete|modify|send|act)\b[^.\n]{0,25}\bwithout\s+(asking|confirmation|permission|approval)\b|\bwithout\s+(asking|confirmation|permission|approval)\b[^.\n]{0,25}\b(the\s+)?(user|human|anyone|first)\b/i,
  },
  {
    rule: "inject/destructive-action",
    severity: "high",
    title: "Describes destructive operations",
    detail:
      "Teaching these is legitimate, but an agent following them unprompted is a hazard — so a human should read it.",
    pattern:
      /\brm\s+-rf\b|\bDROP\s+(TABLE|DATABASE)\b|\bTRUNCATE\s+TABLE\b|\bgit\s+push\b[^.\n]{0,20}--force|\bforce[\s-]push\b/i,
  },
  {
    rule: "inject/persistence",
    severity: "medium",
    title: "Attempts to persist across conversations",
    detail: "Carrying instructions into unrelated sessions extends reach beyond the task.",
    pattern:
      /\b(remember|persist|retain|carry)\b[^.\n]{0,40}\b(future|subsequent|later|all)\b[^.\n]{0,20}\b(conversation|session|chat|message|thread)/i,
  },
  {
    rule: "inject/fake-authority",
    severity: "critical",
    title: "Impersonates the system or a Pocket instruction",
    detail:
      "A skill is third-party content; dressing it as a platform directive borrows authority it does not have.",
    pattern:
      /^\s*(\[?(system|important|admin|developer|pocket)\]?\s*[:>-]|<\s*\/?\s*(system|im_start|instructions?)\s*>)|\b(this|the\s+following)\s+is\s+an?\s+(official|system|mandatory|platform)\s+(instruction|directive|requirement|message)/im,
  },
  {
    rule: "inject/instruction-boundary",
    severity: "critical",
    title: "Contains chat or instruction delimiters",
    detail:
      "Turn markers like `<|im_start|>` or `[/INST]` inside skill content are an attempt to escape the block it was placed in.",
    pattern:
      /<\|[a-z_]+\|>|\[\/?INST\]|\[\/?SYS\]|<\|(end)?oftext\|>|^\s*#{2,}\s*(system|assistant|human|user)\s*:/im,
  },
  {
    rule: "inject/conditional-trigger",
    severity: "high",
    title: "Behaves differently when unobserved",
    detail: "Legitimate instructions do not need to know whether anyone is looking.",
    pattern:
      /\b(if|when|unless)\b[^.\n]{0,40}\b(not\s+being\s+(watched|monitored|reviewed|observed)|no\s+one\s+is\s+(looking|watching)|(review|audit|test|sandbox)(ing)?\s+mode|being\s+(audited|evaluated|tested))/i,
  },
  {
    rule: "inject/encoded-payload",
    severity: "high",
    title: "Contains an encoded block",
    detail:
      "Long base64 or hex runs hide content from a reviewer while staying readable to the model.",
    pattern: /\b(?:[A-Za-z0-9+/]{160,}={0,2}|(?:\\x[0-9a-f]{2}){24,}|(?:%[0-9A-F]{2}){40,})\b/,
  },
  {
    rule: "inject/prompt-leak-request",
    severity: "high",
    title: "Asks the agent to repeat or summarise its own instructions",
    detail:
      "Prompt-extraction attempts are usually phrased as harmless verification or debugging steps.",
    pattern:
      /\b(repeat|restate|echo|summar[iy]s?e|translate|verbatim|word[\s-]for[\s-]word)\b[^.\n]{0,40}\b(your|the|these|above)\b[^.\n]{0,25}\b(instruction|prompt|guideline|configuration|rule)/i,
  },
  {
    rule: "inject/autonomous-scope",
    severity: "high",
    title: "Claims authority beyond the current task",
    detail: "A skill that opts into every request is not scoped at all.",
    pattern:
      /\b(always|for\s+every|on\s+(all|every)|regardless\s+of)\b[^.\n]{0,30}\b(request|message|query|question|task|conversation)\b[^.\n]{0,30}\b(apply|use|follow|load|invoke|run)|\b(apply|use|follow)\s+(this|these)\b[^.\n]{0,20}\b(to\s+)?(all|every)\b/i,
  },
  {
    rule: "inject/homoglyph",
    severity: "medium",
    title: "Contains look-alike Unicode characters",
    detail:
      "Cyrillic or Greek letters rendering as Latin can smuggle a different instruction past a reader.",
    pattern: /[Ѐ-ӿͰ-Ͽ]/,
  },
];

const ASSET_RULES = [
  {
    rule: "asset/network-egress",
    severity: "high",
    title: "Script performs network requests",
    detail: "Outbound connections belong in a declared Connector.",
    pattern:
      /\b(requests\.(get|post|put)|urllib\.request|httpx\.|axios\.|fetch\s*\(|net\/http|curl\s|wget\s|socket\.socket)\b/i,
  },
  {
    rule: "asset/shell-execution",
    severity: "critical",
    title: "Script executes shell commands",
    detail: "Shelling out turns any injected string into command execution.",
    pattern:
      /\b(os\.system|subprocess\.(run|call|Popen|check_output)|child_process|execSync|spawnSync|shell_exec)\b/,
  },
  {
    rule: "asset/dynamic-eval",
    severity: "critical",
    title: "Script evaluates code at runtime",
    detail: "The code that runs is then not the code that was reviewed.",
    pattern: /\b(eval|exec|compile)\s*\(|\bnew\s+Function\s*\(|\bimportlib\.import_module\b/,
  },
  {
    rule: "asset/credential-access",
    severity: "critical",
    title: "Script reads credentials or environment secrets",
    detail: "Touching env vars, key files or credential stores.",
    pattern: /\b(os\.environ|process\.env|ENV\[)|\.(ssh|aws|npmrc|netrc|gitconfig)\b|\bid_rsa\b/i,
  },
  {
    rule: "asset/obfuscation",
    severity: "high",
    title: "Script contains encoded or obfuscated content",
    detail: "Base64 blobs and hex escapes hide behaviour from review.",
    pattern: /\b(base64\.b64decode|atob\s*\(|fromCharCode)|[A-Za-z0-9+/]{120,}={0,2}/,
  },
];

/** ~4 characters per token, the usual English approximation. */
export function estimateTokens(text) {
  return Math.ceil(String(text).trim().length / 4);
}

export function splitFrontmatter(markdown) {
  const match = markdown.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/);
  if (!match) return { frontmatter: "", body: markdown };
  return { frontmatter: match[1] ?? "", body: match[2] ?? "" };
}

export function frontmatterValue(frontmatter, key) {
  const lines = frontmatter.split(/\r?\n/);
  const index = lines.findIndex((line) => new RegExp(`^${key}\\s*:`).test(line));
  if (index < 0) return "";
  const first = lines[index].replace(new RegExp(`^${key}\\s*:\\s*`), "").trim();
  if (/^[|>][-+]?$/.test(first)) {
    const collected = [];
    for (let i = index + 1; i < lines.length; i += 1) {
      const line = lines[i] ?? "";
      if (line.trim() && !/^\s/.test(line)) break;
      collected.push(line.trim());
    }
    return collected.filter(Boolean).join(" ");
  }
  return first.replace(/^['"]|['"]$/g, "");
}

function applyRules(rules, text, file) {
  const findings = [];
  const lines = text.split(/\r?\n/);
  for (const rule of rules) {
    const lineIndex = lines.findIndex((line) => rule.pattern.test(line));
    if (lineIndex < 0 && !rule.pattern.test(text)) continue;
    const matchedLine = lineIndex >= 0 ? lines[lineIndex] : "";
    const match = matchedLine.match(rule.pattern) ?? text.match(rule.pattern);
    const evidence = (match?.[0] ?? matchedLine).trim().slice(0, 160);
    findings.push({
      rule: rule.rule,
      severity: rule.severity,
      title: rule.title,
      detail: rule.detail,
      file,
      line: lineIndex >= 0 ? lineIndex + 1 : undefined,
      evidence: evidence && !/^\s*$/.test(evidence) ? evidence : undefined,
    });
  }
  return findings;
}

function auditStructure(markdown) {
  const findings = [];
  const { frontmatter, body } = splitFrontmatter(markdown);

  if (!frontmatter) {
    return [
      {
        rule: "structure/no-frontmatter",
        severity: "high",
        title: "Missing YAML frontmatter",
        detail: "A skill must open with a `---` block declaring `name` and `description`.",
        file: "SKILL.md",
        line: 1,
      },
    ];
  }

  const name = frontmatterValue(frontmatter, "name");
  const description = frontmatterValue(frontmatter, "description");

  if (!name) {
    findings.push({
      rule: "structure/no-name",
      severity: "high",
      title: "Missing `name`",
      detail: "The frontmatter must declare a `name`.",
      file: "SKILL.md",
    });
  } else if (!/^[a-z0-9][a-z0-9-]{1,63}$/.test(name)) {
    findings.push({
      rule: "structure/bad-name",
      severity: "medium",
      title: "Name is not a valid slug",
      detail: "Lowercase letters, digits and hyphens, 2–64 characters.",
      file: "SKILL.md",
      evidence: name,
    });
  }

  if (!description) {
    findings.push({
      rule: "structure/no-description",
      severity: "high",
      title: "Missing `description`",
      detail:
        "The description is the only part always in context — it is how the agent decides the skill applies.",
      file: "SKILL.md",
    });
  } else {
    if (description.length < 40) {
      findings.push({
        rule: "structure/thin-description",
        severity: "medium",
        title: "Description is too short to match on",
        detail: "Say what it does AND when to use it.",
        file: "SKILL.md",
        evidence: description,
      });
    }
    if (!/\buse\s+(this\s+)?when\b|\btriggers?\s+(on|when)\b/i.test(description)) {
      findings.push({
        rule: "structure/no-trigger",
        severity: "low",
        title: "Description does not say when to use the skill",
        detail: "An explicit 'Use when …' clause markedly improves selection accuracy.",
        file: "SKILL.md",
      });
    }
  }

  const bodyTokens = estimateTokens(body);
  if (bodyTokens < 20) {
    findings.push({
      rule: "structure/empty-body",
      severity: "medium",
      title: "Skill body is effectively empty",
      detail: "The body carries the instructions.",
      file: "SKILL.md",
    });
  } else if (bodyTokens > 5_000) {
    findings.push({
      rule: "structure/oversized",
      severity: "medium",
      title: "Skill is very large",
      detail: `~${bodyTokens.toLocaleString()} tokens. Move reference material into supporting files.`,
      file: "SKILL.md",
    });
  } else if (bodyTokens > 2_000) {
    findings.push({
      rule: "structure/heavy",
      severity: "low",
      title: "Skill is heavier than typical",
      detail: `~${bodyTokens.toLocaleString()} tokens.`,
      file: "SKILL.md",
    });
  }

  return findings;
}

export function auditSkill({ skillMarkdown, assets = {} }) {
  const { frontmatter, body } = splitFrontmatter(skillMarkdown);
  const findings = [
    ...auditStructure(skillMarkdown),
    ...applyRules(INSTRUCTION_RULES, skillMarkdown, "SKILL.md"),
  ];

  for (const [path, content] of Object.entries(assets)) {
    const isScript = /\.(js|mjs|cjs|ts|py|rb|sh|bash|zsh|ps1|php|pl)$/i.test(path);
    findings.push(...applyRules(isScript ? ASSET_RULES : INSTRUCTION_RULES, content, path));
    if (isScript) {
      findings.push({
        rule: "asset/executable-present",
        severity: "medium",
        title: "Skill bundles an executable script",
        detail:
          "Pocket never runs bundled scripts — it loads instructions only. The skill must work without it.",
        file: path,
      });
    }
  }

  const summary = { critical: 0, high: 0, medium: 0, low: 0, info: 0 };
  for (const finding of findings) summary[finding.severity] += 1;

  const deduction = findings.reduce((total, f) => total + WEIGHTS[f.severity], 0);
  const score = Math.max(0, Math.min(100, 100 - deduction));
  const verdict = summary.critical > 0 ? "fail" : summary.high > 0 || score < 70 ? "review" : "pass";

  return {
    score,
    verdict,
    findings: findings.sort(
      (a, b) => WEIGHTS[b.severity] - WEIGHTS[a.severity] || a.file.localeCompare(b.file),
    ),
    summary,
    tokens: {
      description: estimateTokens(frontmatterValue(frontmatter, "description")),
      body: estimateTokens(body),
      total: estimateTokens(skillMarkdown),
    },
  };
}
