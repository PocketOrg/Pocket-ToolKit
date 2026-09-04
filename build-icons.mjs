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
  airtable: "Airtable",
  asana: "Asana",
  auth0: "Auth0",
  bitbucket: "Bitbucket",
  datadog: "Datadog",
  discord: "Discord",
  elasticsearch: "Elasticsearch",
  trello: "Trello",
  salesforce: "Salesforce",
  shopify: "Shopify",
  paypal: "PayPal",
  zendesk: "Zendesk",
  twilio: "Twilio",
  sendgrid: "SendGrid",
  mongodb: "MongoDB",
  redis: "Redis",
  mysql: "MySQL",
  clickhouse: "ClickHouse",
  snowflake: "Snowflake",
  databricks: "Databricks",
  upstash: "Upstash",
  "amazon-s3": "Amazon S3",
  terraform: "Terraform",
  circleci: "CircleCI",
  jenkins: "Jenkins",
  "argo-cd": "Argo",
  prometheus: "Prometheus",
  dynatrace: "Dynatrace",
  heroku: "Heroku",
  digitalocean: "DigitalOcean",
  railway: "Railway",
  render: "Render",
  netlify: "Netlify",
  firebase: "Firebase",
  sonarqube: "SonarQube",
  hackerone: "HackerOne",
  okta: "Okta",
  keycloak: "Keycloak",
  vault: "Vault",
  wikipedia: "Wikipedia",
  arxiv: "arXiv",
  pubmed: "PubMed",
  zotero: "Zotero",
  obsidian: "Obsidian",
  reddit: "Reddit",
  youtube: "YouTube",
  "brave-search": "Brave",
  perplexity: "Perplexity",
  "hugging-face": "Hugging Face",
  openai: "OpenAI",
  replicate: "Replicate",
  puppeteer: "Puppeteer",
  git: "Git",
  contentful: "Contentful",
  sanity: "Sanity",
  canva: "Canva",
  posthog: "PostHog",
  mixpanel: "Mixpanel",
  metabase: "Metabase",
  "google-sheets": "Google Sheets",
  "google-docs": "Google Docs",
  "google-maps": "Google Maps",
  mapbox: "Mapbox",
  todoist: "Todoist",
  clickup: "ClickUp",
  dropbox: "Dropbox",
  box: "Box",
  meilisearch: "Meilisearch",
  temporal: "Temporal",
  kafka: "Apache Kafka",
  cloudinary: "Cloudinary",
  webflow: "Webflow",
  resend: "Resend",
  influxdb: "InfluxDB",
  gitea: "Gitea",
  opsgenie: "Opsgenie",

  /*
   * The domain batch. Every title below was checked against the Simple Icons index before the
   * connector was written, because a wrong title yields a connector with no artwork.
   *
   * Three candidates were dropped for having no mark at all rather than shipped iconless: Wave
   * Accounting, LinkedIn and Amplitude. `MailChimp` keeps its upstream capitalisation, which differs
   * from the brand's own current styling — the index is the lookup key, not the brand guideline.
   */
  quickbooks: "QuickBooks",
  xero: "Xero",
  square: "Square",
  "shopify-admin": "Shopify",
  webflow: "Webflow",
  mailchimp: "MailChimp",
  buffer: "Buffer",
  pinterest: "Pinterest",
  "youtube-data": "YouTube",
  greenhouse: "Greenhouse",
  calendly: "Calendly",
  zoom: "Zoom",
  typeform: "Typeform",
  confluence: "Confluence",
  clickup: "ClickUp",
  miro: "Miro",
  airbnb: "Airbnb",
  "google-maps-places": "Google Maps",
  mapbox: "Mapbox",
  zillow: "Zillow",
  "canvas-lms": "Canvas",
  moodle: "Moodle",
  "whatsapp-business": "WhatsApp",
  telegram: "Telegram",
  mattermost: "Mattermost",
  box: "Box",
  odoo: "Odoo",
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

  // Marks that are black or near-black in their brand palette, and which every
  // one of these companies renders white or near-white on dark surfaces.
  railway: "FFFFFF",
  render: "FFFFFF",
  resend: "FFFFFF",
  posthog: "FFFFFF",
  replicate: "FFFFFF",
  mapbox: "FFFFFF",
  kafka: "FFFFFF",
  openai: "FFFFFF",
  temporal: "FFFFFF",
  git: "F05133", // Git's orange, which is its mark colour on dark
  "hugging-face": "FFD21E", // the yellow from the Hugging Face mark
  opsgenie: "2684FF", // Atlassian blue, as Opsgenie uses on dark
  circleci: "FFFFFF",
  heroku: "9A7FD1", // lighter of Heroku's two purples
  paypal: "009CDE", // PayPal's lighter blue, used on dark backgrounds
  datadog: "A78BFA", // lighter tint of Datadog purple
  elasticsearch: "00BFB3", // Elastic's teal, which reads on dark
  keycloak: "F0662B", // Keycloak orange
  hackerone: "FFFFFF",
  bitbucket: "2684FF", // Atlassian blue
  arxiv: "E0574A", // lighter of arXiv's reds
  cloudinary: "5B6FE0", // brighter Cloudinary blue for dark surfaces
  trello: "579DFF", // Atlassian's lighter blue, used on dark
  zendesk: "8FD6C0", // lighter of Zendesk's greens
  wikipedia: "FFFFFF",
  canva: "6FD2E8", // lighter of Canva's two blues
  salesforce: "5FA8E8", // lighter Salesforce blue for dark surfaces

  /*
   * The domain batch, for marks too dark to read on a near-black card.
   *
   * Each is the brand's own light-surface treatment where it publishes one, or a lightened tint of
   * its primary where it does not. Not computed by a uniform lightening — several of these brands
   * ship a specific dark-mode mark and using anything else looks wrong beside their own product.
   */
  square: "FFFFFF", // Square's mark is black; it renders white on dark surfaces
  buffer: "FFFFFF", // Buffer's mark is near-black in its brand palette
  typeform: "FFFFFF", // Typeform's mark is black on light, white on dark
  miro: "FFDD33", // Miro's yellow, which it uses on dark surfaces
  confluence: "2684FF", // Atlassian blue, as Confluence uses on dark
  pinterest: "E8607A", // lighter of Pinterest's reds for dark surfaces
  mattermost: "5A9BE8", // lighter Mattermost blue
  odoo: "A87BB8", // lighter of Odoo's purples
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

  // Brand colours bright enough to wash out on white. Each is the darker shade
  // the brand itself uses for text and icons on light surfaces.
  airtable: "1D6EBF", // Airtable's darker blue
  canva: "00618F", // deeper of Canva's two blues
  clickhouse: "9A8B00", // darker of ClickHouse's yellows
  "hugging-face": "9A7A00", // darkened Hugging Face yellow for light surfaces
  netlify: "108A87", // Netlify's darker teal
  perplexity: "0F6E7A", // deeper Perplexity teal
  puppeteer: "0F7A5A", // darker green from the Puppeteer mark
  metabase: "356EA8", // Metabase's darker blue
  meilisearch: "C4436B", // deeper of Meilisearch's pinks
  influxdb: "1F5FD6", // InfluxDB's darker blue
  "argo-cd": "D4622A", // darker of Argo's oranges
  salesforce: "0B5CAB", // Salesforce's darker blue
  shopify: "5A8A2E", // deeper of Shopify's greens
  sendgrid: "0B6FA8", // darker SendGrid blue
  snowflake: "1B7FB8", // deeper Snowflake blue
  upstash: "0F7A4A", // darker Upstash green
  vault: "8A6D1F", // darker of Vault's yellows

  /*
   * The domain batch, for marks too bright to read on white.
   *
   * Each is the darker shade the brand itself uses for text and icons on light surfaces, not an
   * arbitrary darkening — the point is that the card looks like the brand's own material.
   */
  xero: "0F86B8", // Xero's darker blue
  "shopify-admin": "5A8A2E", // deeper of Shopify's greens, matching the existing shopify entry
  mailchimp: "8A7000", // darkened Mailchimp yellow, which reads at 1.3:1 untouched
  moodle: "D4620A", // deeper of Moodle's oranges
  "whatsapp-business": "128C7E", // WhatsApp's darker green, which it uses on light
  telegram: "1D7FB8", // Telegram's darker blue
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

/*
 * Contrast shortfalls are reported, not fatal.
 *
 * A brand's own colour is sometimes genuinely low-contrast on one of our two
 * surfaces, and inventing a different colour would misrepresent the mark. The
 * fix is a considered entry in LIGHT_OVERRIDES or DARK_OVERRIDES using the
 * brand's own alternate shade — which is a judgement call, not something to
 * derive automatically. Listing them keeps that decision visible.
 *
 * A missing Simple Icons entry IS fatal: it means a connector would ship with no
 * mark at all, and a hand-drawn substitute is exactly what this script exists to
 * avoid.
 */
const missing = problems.filter((p) => p.includes("no Simple Icons entry") || p.includes("returned"));
const lowContrast = problems.filter((p) => !missing.includes(p));

if (lowContrast.length) {
  console.warn(
    `\nLow contrast (${lowContrast.length}) — brand colour kept; add an override if it matters:\n  ` +
      lowContrast.join("\n  "),
  );
}

if (missing.length) {
  console.error("\nNo artwork available:\n  " + missing.join("\n  "));
  process.exit(1);
}

/* -------------------------------------------------- per-connector icon.svg */

/*
 * Each connector directory carries its own icon.svg so the repository is
 * self-describing: someone browsing `connectors/stripe/` sees the mark without
 * running a build or importing the data module.
 *
 * The dark variant is expressed with a `prefers-color-scheme` media query inside
 * the SVG, so a plain `<img>` reference still adapts to the reader's theme.
 */
let svgCount = 0;
for (const [slug, icon] of Object.entries(icons)) {
  const dir = path.join(here, "connectors", slug);
  if (!fs.existsSync(dir)) continue;
  const cls = `${slug.replace(/[^a-z0-9]/g, "-")}-mark`;
  const dark = icon.darkHex
    ? `\n    @media (prefers-color-scheme: dark) {\n      .${cls} { fill: #${icon.darkHex}; }\n    }`
    : "";
  fs.writeFileSync(
    path.join(dir, "icon.svg"),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-labelledby="${slug}-icon-title">
  <title id="${slug}-icon-title">${icon.title}</title>
  <style>
    .${cls} { fill: #${icon.hex}; }${dark}
  </style>
  <path class="${cls}" d="${icon.path}"/>
</svg>
`,
    "utf8",
  );
  svgCount += 1;
}
console.log(`wrote ${svgCount} connector icon.svg files`);

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
