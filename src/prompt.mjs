// The promises variant, not `node:readline` — the callback API's `question()`
// returns undefined, so awaiting it yields undefined rather than the answer.
import readline from "node:readline/promises";

/**
 * Minimal interactive prompt helpers.
 *
 * Written against `node:readline` rather than a prompt library on purpose: this
 * package is meant to be run with `npx` by people who have never installed
 * anything of ours, so a zero-dependency tool starts instantly and cannot break
 * because of a transitive update.
 */

const ESC = "";
const styles = {
  reset: `${ESC}[0m`,
  bold: `${ESC}[1m`,
  dim: `${ESC}[2m`,
  red: `${ESC}[31m`,
  green: `${ESC}[32m`,
  yellow: `${ESC}[33m`,
  cyan: `${ESC}[36m`,
};

// Honour NO_COLOR and non-TTY output, so piping to a file or a CI log does not
// fill it with escape codes.
const colourEnabled = process.stdout.isTTY && !process.env.NO_COLOR;

export const c = Object.fromEntries(
  Object.entries(styles).map(([name, code]) => [
    name,
    (text) => (colourEnabled ? `${code}${text}${styles.reset}` : String(text)),
  ]),
);

let rl = null;

function io() {
  rl ??= readline.createInterface({ input: process.stdin, output: process.stdout });
  return rl;
}

/**
 * Queued answers for non-interactive runs.
 *
 * When stdin is a pipe rather than a TTY, readline's first `question()` consumes
 * the whole buffer and every later call hangs forever. That makes the tool
 * untestable and unusable from CI, so piped input is read once up front and
 * served a line at a time. Interactive use is unaffected — `lines` stays null
 * and every question goes to readline as normal.
 */
let lines = null;
let cursor = 0;

async function readPipedInput() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8").split(/\r?\n/);
}

/**
 * Call once before prompting. Detects a non-TTY stdin and buffers it.
 *
 * Safe to call when stdin IS a TTY: it does nothing, so callers need no
 * conditional.
 */
export async function primeInput() {
  if (process.stdin.isTTY) return;
  lines = await readPipedInput();
  cursor = 0;
}

/** One line of input, from the pipe buffer or from readline. */
async function readLine(promptText) {
  if (lines) {
    process.stdout.write(promptText);
    // Past the end of piped input, behave as if enter was pressed, so a short
    // script falls through to defaults instead of hanging.
    const value = cursor < lines.length ? lines[cursor++] : "";
    process.stdout.write(`${value}\n`);
    return value;
  }
  return io().question(promptText);
}

export function closePrompt() {
  rl?.close();
  rl = null;
}

/** A free-text question with an optional default and validation. */
export async function ask(question, { def = "", validate } = {}) {
  const suffix = def ? c.dim(` (${def})`) : "";
  for (;;) {
    const answer = (await readLine(`${c.cyan("?")} ${question}${suffix} `)).trim() || def;
    if (!validate) return answer;
    const problem = validate(answer);
    if (!problem) return answer;
    console.log(`  ${c.red("✗")} ${problem}`);
  }
}

/** A yes/no question. `def` is the value used when the answer is empty. */
export async function confirm(question, def = true) {
  const hint = def ? "Y/n" : "y/N";
  const answer = (await readLine(`${c.cyan("?")} ${question} ${c.dim(`(${hint})`)} `))
    .trim()
    .toLowerCase();
  if (!answer) return def;
  return answer.startsWith("y");
}

/**
 * A single-choice list.
 *
 * Numbered rather than arrow-key driven: arrow navigation needs raw mode, which
 * misbehaves inside the nested shells and CI runners this will be used from.
 */
export async function select(question, options, def = 0) {
  console.log(`${c.cyan("?")} ${question}`);
  options.forEach((option, index) => {
    const marker = index === def ? c.cyan("›") : " ";
    const hint = option.hint ? c.dim(` — ${option.hint}`) : "";
    console.log(`  ${marker} ${c.bold(String(index + 1))}. ${option.label}${hint}`);
  });

  for (;;) {
    const raw = (await readLine(`  ${c.dim(`1-${options.length}`)} `)).trim();
    if (!raw) return options[def];
    const index = Number.parseInt(raw, 10) - 1;
    if (Number.isInteger(index) && index >= 0 && index < options.length) return options[index];
    console.log(`  ${c.red("✗")} Enter a number between 1 and ${options.length}.`);
  }
}

/** A multi-select list, answered as comma-separated numbers. */
export async function multiSelect(question, options) {
  console.log(`${c.cyan("?")} ${question} ${c.dim("(comma-separated, or blank for none)")}`);
  options.forEach((option, index) => {
    const hint = option.hint ? c.dim(` — ${option.hint}`) : "";
    console.log(`    ${c.bold(String(index + 1))}. ${option.label}${hint}`);
  });

  for (;;) {
    const raw = (await readLine(`  ${c.dim("e.g. 1,3")} `)).trim();
    if (!raw) return [];
    const parts = raw.split(",").map((part) => Number.parseInt(part.trim(), 10) - 1);
    if (parts.every((index) => Number.isInteger(index) && index >= 0 && index < options.length)) {
      return [...new Set(parts)].map((index) => options[index]);
    }
    console.log(`  ${c.red("✗")} Use numbers between 1 and ${options.length}, separated by commas.`);
  }
}

export function heading(text) {
  console.log(`\n${c.bold(text)}`);
}

export function note(text) {
  console.log(`  ${c.dim(text)}`);
}
