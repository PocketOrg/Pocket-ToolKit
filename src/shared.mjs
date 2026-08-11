/**
 * Values shared by the skill and connector scaffolders.
 *
 * The category list is duplicated from the backend's classifier on purpose: this
 * package ships independently, and a mismatch shows up as a skill landing in the
 * wrong filter rather than as an error, so it is worth keeping the canonical list
 * visible in one obvious place here.
 */

export const CATEGORIES = [
  "AI & Accelerated Computing",
  "Cloud & DevOps",
  "Data & Analytics",
  "Design & Creative",
  "Documents & Communication",
  "Healthcare & Science",
  "Research & Knowledge",
  "Sales & Marketing",
  "Security",
  "Software Engineering",
  "Tools & Automation",
];

/** Words that should not be title-cased into something wrong. */
const ACRONYMS = new Set([
  "ai",
  "api",
  "cli",
  "css",
  "csv",
  "gpu",
  "html",
  "http",
  "json",
  "mcp",
  "pdf",
  "pr",
  "rag",
  "sdk",
  "sql",
  "ui",
  "ux",
  "yaml",
]);

export function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function titleCase(value) {
  return String(value)
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => (ACRONYMS.has(word) ? word.toUpperCase() : word[0].toUpperCase() + word.slice(1)))
    .join(" ");
}
