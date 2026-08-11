/**
 * Regenerates `src/catalog/icons.data.mjs` from Simple Icons.
 *
 * Kept as a committed script rather than a one-off because it is the honest
 * record of where the artwork came from: run it again to pick up upstream fixes
 * or to add a connector, instead of hand-editing 26 SVG paths.
 *
 *   node build-icons.mjs
 *
 * Not part of the normal build — the generated data file is committed, so a
 * clone works offline with no network access.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

/** connector slug -> Simple Icons `title`, which is their lookup key. */
const WANT = {
  github: "GitHub",
  gitlab: "GitLab",
  sentry: "Sentry",
  postgres: "PostgreSQL",
  sqlite: "SQLite",
  supabase: "Supabase",
  docker: "Docker",
  kubernetes: "Kubernetes",
  aws: "Amazon Web Services",
  cloudflare: "Cloudflare",
  vercel: "Vercel",
  slack: "Slack",
  notion: "Notion",
  linear: "Linear",
  jira: "Jira",
  "google-drive": "Google Drive",
  gmail: "Gmail",
  "google-calendar": "Google Calendar",
  figma: "Figma",
  "web-search": "Brave",
  fetch: "curl",
  filesystem: "Files",
  stripe: "Stripe",
  hubspot: "HubSpot",
  snyk: "Snyk",
  onepassword: "1Password",
};

/** The Simple Icons file slug, where it differs from a slugified title. */
const FILE_SLUG = {
  aws: "amazonwebservices",
  postgres: "postgresql",
  "web-search": "brave",
  fetch: "curl",
  filesystem: "files",
  onepassword: "1password",
  "google-drive": "googledrive",
  "google-calendar": "googlecalendar",
};

/**
 * Dark-theme colours.
 *
 * These are the brands' own dark-surface treatments, not a computed lightening
 * of the light-mode hex. Tinting #181717 algorithmically yields a muddy grey;
 * GitHub's actual dark-mode mark is white. Only connectors whose brand colour
 * fails on a near-black card appear here.
 */
const DARK_OVERRIDES = {
  github: "FFFFFF",
  vercel: "FFFFFF",
  notion: "FFFFFF",
  aws: "FF9900",
  slack: "E01E5A",
  sentry: "F1B71C",
  sqlite: "5CADCF",
  fetch: "73C2E8",
  jira: "2684FF",
  snyk: "A28BFF",
};

/**
 * Light-theme colours, for the mirror problem.
 *
 * A few brand colours are bright enough to wash out on white: Supabase's green
 * reads at 2.0:1, GitLab's orange at 2.9:1. These are the brands' own darker
 * shades — the ones they use for text and icons on light backgrounds — rather
 * than an arbitrary darkening.
 */
const LIGHT_OVERRIDES = {
  gitlab: "E24329", // GitLab's darker red-orange, from its own palette
  supabase: "1F8A5C", // Supabase's deeper green, used for text on light
  cloudflare: "D96B0B", // darker of Cloudflare's two oranges
  hubspot: "E8532F", // HubSpot's darker orange
};

const CDN = "https://cdn.jsdelivr.net/npm/simple-icons@latest";

/* ------------------------------------------------------------- contrast */

const luminance = (hex) => {
  const channels = [0, 2, 4]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};

const contrast = (hex, backgroundLuminance) => {
  const l = luminance(hex);
  return (
    (Math.max(l, backgroundLuminance) + 0.05) / (Math.min(l, backgroundLuminance) + 0.05)
  );
};

const ON_LIGHT = luminance("ffffff");
const ON_DARK = luminance("141414");
/** A 24px glyph needs roughly this much separation to read cleanly. */
const MIN_CONTRAST = 3.0;

/* ---------------------------------------------------------------- fetch */

const metaResponse = await fetch(`${CDN}/_data/simple-icons.json`);
if (!metaResponse.ok) throw new Error(`metadata returned ${metaResponse.status}`);
const meta = await metaResponse.json();
const byTitle = new Map(meta.map((entry) => [entry.title.toLowerCase(), entry]));

const icons = {};
const problems = [];

for (const [slug, title] of Object.entries(WANT)) {
  const entry = byTitle.get(title.toLowerCase());
  if (!entry) {
    problems.push(`${slug}: no Simple Icons entry titled "${title}"`);
    continue;
  }

  const fileSlug = FILE_SLUG[slug] ?? title.toLowerCase().replace(/[^a-z0-9]/g, "");
  const svgResponse = await fetch(`${CDN}/icons/${fileSlug}.svg`);
  if (!svgResponse.ok) {
    problems.push(`${slug}: ${fileSlug}.svg returned ${svgResponse.status}`);
    continue;
  }
  const svg = await svgResponse.text();
  const d = svg.match(/<path[^>]*\sd="([^"]+)"/)?.[1];
  if (!d) {
    problems.push(`${slug}: no path found in ${fileSlug}.svg`);
    continue;
  }

  // `hex` is what renders on light; `darkHex` swaps in under a dark scheme.
  const hex = LIGHT_OVERRIDES[slug] ?? entry.hex;
  const darkHex = DARK_OVERRIDES[slug];
  const light = contrast(hex, ON_LIGHT);
  const dark = contrast(darkHex ?? hex, ON_DARK);
  if (light < MIN_CONTRAST) problems.push(`${slug}: only ${light.toFixed(1)}:1 on light`);
  if (dark < MIN_CONTRAST) problems.push(`${slug}: only ${dark.toFixed(1)}:1 on dark`);

  icons[slug] = {
    title: entry.title,
    hex,
    darkHex,
    path: d,
    light,
    dark,
    // Recorded so the data file can note where we departed from the brand hex.
    brandHex: entry.hex,
  };
}

if (problems.length) {
  console.error("Problems:\n  " + problems.join("\n  "));
  process.exit(1);
}

/* ----------------------------------------------------------------- emit */

const key = (slug) => (/^[a-z][a-z0-9]*$/.test(slug) ? slug : JSON.stringify(slug));

const entries = Object.entries(icons)
  .map(
    ([slug, icon]) =>
      `  ${key(slug)}: {\n` +
      `    title: ${JSON.stringify(icon.title)},\n` +
      `    hex: "#${icon.hex}",\n` +
      (icon.darkHex ? `    darkHex: "#${icon.darkHex}",\n` : "") +
      `    path: ${JSON.stringify(icon.path)},\n` +
      `  },`,
  )
  .join("\n");

const file = `/**
 * Connector icons — the official brand marks, in full brand colour.
 *
 * GENERATED by \`build-icons.mjs\` from Simple Icons (https://simpleicons.org),
 * which publishes brand SVGs and their official hex colours under CC0. Do not
 * edit by hand; re-run the script instead.
 *
 * ## Why some entries carry two colours
 *
 * A brand colour picked for a white page does not necessarily survive on a dark
 * one. Measured against a near-black card, several of these fall below any usable
 * contrast: GitHub's #181717 lands at 1.0:1, and Vercel and Notion are pure
 * black — all three effectively invisible.
 *
 * \`darkHex\` is that connector's dark-surface treatment, taken from how the brand
 * itself presents on dark rather than by lightening the light-mode hex. GitHub
 * inverts to white; AWS uses its orange; Slack its #E01E5A. An algorithmic tint
 * produces muddy greys that look nothing like the brand.
 *
 * Every icon here clears ${MIN_CONTRAST.toFixed(1)}:1 against both a white and a near-black surface.
 *
 * ## Rendering
 *
 * Each generated \`icon.svg\` sets the light colour as \`fill\` and, where a dark
 * variant exists, includes a \`<style>\` block with a \`prefers-color-scheme: dark\`
 * media query that swaps it. One file, both themes, no JavaScript and no
 * duplicate asset. Backgrounds stay transparent so the card's surface shows
 * through.
 *
 * Trademarks belong to their respective owners. Simple Icons distributes the
 * artwork under CC0; using a logo to identify the service it represents is
 * nominative use.
 */

/** Applied by the generator to every root \`<svg>\`. */
export const SVG_ATTRS = {
  viewBox: "0 0 24 24",
};

/** Official marks and brand colours, keyed by connector slug. */
export const ICONS = {
${entries}
};

/** Fallback for a connector with no mapped brand mark: a plug, in neutral grey. */
export const FALLBACK_ICON = {
  title: "Connector",
  hex: "#5A5A5A",
  darkHex: "#9A9A9A",
  path: "M9 2v6h6V2h2v6a5 5 0 0 1-4 4.9V22h-2v-9.1A5 5 0 0 1 7 8V2h2Z",
};
`;

fs.writeFileSync(path.join(here, "src/catalog/icons.data.mjs"), file, "utf8");

const overrides = Object.values(icons).filter((i) => i.darkHex).length;
console.log(`wrote ${Object.keys(icons).length} icons`);
console.log(`  ${overrides} with a dark-theme override, ${Object.keys(icons).length - overrides} using the brand colour in both themes`);
console.log(
  `  contrast floor: light ${Math.min(...Object.values(icons).map((i) => i.light)).toFixed(1)}:1, dark ${Math.min(...Object.values(icons).map((i) => i.dark)).toFixed(1)}:1`,
);
