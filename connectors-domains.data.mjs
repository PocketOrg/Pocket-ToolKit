/**
 * Connectors for the business domains the original catalogue did not reach.
 *
 * ## Every entry here was verified before being written
 *
 * Two checks, both of which eliminated candidates:
 *
 *   1. **The npm package resolves and has a `bin`.** A connector's manifest names a package that
 *      `npx -y <pkg>` must launch, so a guessed name is a connector that fails on first use. Checked
 *      against `registry.npmjs.org`; entries without a `bin` were dropped even where the package
 *      existed, because there is nothing to run.
 *   2. **The icon title exists in Simple Icons.** `build-icons.mjs` looks up by their exact `title`,
 *      so a wrong title produces a connector with no artwork.
 *
 * Two candidates were rejected for a reason worth recording: `sap-mcp` is a Solana agent protocol
 * server, not SAP, and `loom-mcp` is a context store, not Loom video. Both would have shipped a
 * connector that authenticates against the wrong service entirely — the exact failure a name-only
 * check misses.
 *
 * ## Tool lists
 *
 * `tools` names the operations Pocket offers the model, with `readOnly` set honestly because
 * `classifyConnectorCall` now *enforces* it: a tool marked read-only is callable on a scheduled run,
 * and anything else requires a person present. Marking a write as read-only would defeat the
 * authorisation boundary, so where the upstream server's exact tool surface was not confirmed the
 * list is kept to the operations named in its published description.
 */

const req = (description) => ({ type: "string", description, required: true });
const opt = (description) => ({ type: "string", description });
const optNum = (description) => ({ type: "number", description });

export const DOMAIN_CONNECTORS = [
  /* ------------------------------------------------------ Accounting & finance */
  {
    slug: "quickbooks",
    title: "QuickBooks",
    icon: "QuickBooks",
    package: "quickbooks-mcp",
    category: "Data & Analytics",
    summary:
      "Read and update QuickBooks Online customers, invoices and reports. Use when an accounting agent needs the actual books rather than a description of them.",
    auth: "oauth2",
    scopes: ["read", "write"],
    homepage: "https://quickbooks.intuit.com",
    authNote:
      "Requires an Intuit app with the accounting scope and a company (realm) authorisation. Sandbox and production realms are separate.",
    tools: [
      { name: "list_customers", description: "Lists customers, optionally filtered.", readOnly: true, params: { query: opt("Filter expression.") } },
      { name: "get_invoice", description: "Reads one invoice by id.", readOnly: true, params: { invoiceId: req("Invoice id.") } },
      { name: "list_invoices", description: "Lists invoices in a date range.", readOnly: true, params: { since: opt("ISO start date."), until: opt("ISO end date.") } },
      { name: "create_invoice", description: "Creates an invoice for a customer.", readOnly: false, params: { customerId: req("Customer id."), lines: req("JSON array of line items.") } },
      { name: "run_report", description: "Runs a standard report such as profit and loss or balance sheet.", readOnly: true, params: { report: req("Report name."), since: opt("ISO start date."), until: opt("ISO end date.") } },
    ],
  },
  {
    slug: "xero",
    title: "Xero",
    icon: "Xero",
    package: "@xeroapi/xero-mcp-server",
    category: "Data & Analytics",
    summary:
      "Read and update Xero contacts, invoices and accounts. Use for bookkeeping and reconciliation work against the live ledger.",
    auth: "oauth2",
    scopes: ["read", "write"],
    homepage: "https://www.xero.com",
    authNote:
      "Requires a Xero app with accounting scopes and a tenant authorisation. Published by Xero.",
    tools: [
      { name: "list_contacts", description: "Lists contacts.", readOnly: true },
      { name: "list_invoices", description: "Lists invoices, optionally by status.", readOnly: true, params: { status: opt("Invoice status filter.") } },
      { name: "create_invoice", description: "Creates a draft invoice.", readOnly: false, params: { contactId: req("Contact id."), lines: req("JSON array of line items.") } },
      { name: "list_accounts", description: "Lists the chart of accounts.", readOnly: true },
      { name: "list_bank_transactions", description: "Lists bank transactions for reconciliation.", readOnly: true, params: { since: opt("ISO start date.") } },
    ],
  },
  {
    slug: "square",
    title: "Square",
    icon: "Square",
    package: "square-mcp-server",
    category: "Data & Analytics",
    summary:
      "Read Square payments, orders, catalogue and inventory. Use for retail and hospitality where Square is the till.",
    auth: "apiKey",
    scopes: ["read", "write"],
    homepage: "https://squareup.com",
    authNote:
      "Requires a Square access token. Sandbox and production tokens are separate; scope it to the locations you want reachable.",
    tools: [
      { name: "list_payments", description: "Lists payments in a period.", readOnly: true, params: { since: opt("ISO start date."), until: opt("ISO end date.") } },
      { name: "list_orders", description: "Lists orders for a location.", readOnly: true, params: { locationId: opt("Location id.") } },
      { name: "list_catalog", description: "Lists catalogue items and variations.", readOnly: true },
      { name: "get_inventory", description: "Reads inventory counts for catalogue items.", readOnly: true, params: { itemIds: opt("Comma-separated catalogue item ids.") } },
      { name: "update_catalog_item", description: "Updates a catalogue item's price or details.", readOnly: false, params: { itemId: req("Catalogue item id."), fields: req("JSON object of fields to change.") } },
    ],
  },
  {
    slug: "paypal",
    title: "PayPal",
    icon: "PayPal",
    package: "@paypal/mcp",
    category: "Data & Analytics",
    summary:
      "Read PayPal transactions, invoices and disputes. Use for reconciliation and dispute handling on PayPal-collected revenue.",
    auth: "oauth2",
    scopes: ["read", "write"],
    homepage: "https://www.paypal.com",
    authNote:
      "Requires PayPal REST app credentials. Published by PayPal. Live and sandbox credentials are separate.",
    tools: [
      { name: "list_transactions", description: "Lists transactions in a period.", readOnly: true, params: { since: opt("ISO start date."), until: opt("ISO end date.") } },
      { name: "get_invoice", description: "Reads one invoice.", readOnly: true, params: { invoiceId: req("Invoice id.") } },
      { name: "create_invoice", description: "Creates and optionally sends an invoice.", readOnly: false, params: { recipient: req("Recipient email."), lines: req("JSON array of line items.") } },
      { name: "list_disputes", description: "Lists open disputes.", readOnly: true },
    ],
  },

  /* ------------------------------------------------------------------ commerce */
  {
    slug: "shopify-admin",
    title: "Shopify",
    icon: "Shopify",
    package: "shopify-mcp-server",
    category: "Sales & Marketing",
    summary:
      "Read and update Shopify products, orders, customers and inventory. Use for storefront and merchandising work against the live shop.",
    auth: "apiKey",
    scopes: ["read", "write"],
    homepage: "https://www.shopify.com",
    authNote:
      "Requires a custom-app Admin API access token with the product, order, customer and inventory scopes you intend to use.",
    tools: [
      { name: "list_products", description: "Lists products with variants.", readOnly: true, params: { query: opt("Search query.") } },
      { name: "get_product", description: "Reads one product.", readOnly: true, params: { productId: req("Product id.") } },
      { name: "update_product", description: "Updates a product's fields.", readOnly: false, params: { productId: req("Product id."), fields: req("JSON object of fields to change.") } },
      { name: "list_orders", description: "Lists orders, optionally by status.", readOnly: true, params: { status: opt("Order status filter.") } },
      { name: "list_customers", description: "Lists customers.", readOnly: true },
      { name: "adjust_inventory", description: "Adjusts an inventory level at a location.", readOnly: false, params: { inventoryItemId: req("Inventory item id."), locationId: req("Location id."), delta: optNum("Change in available quantity.") } },
    ],
  },
  {
    slug: "webflow",
    title: "Webflow",
    icon: "Webflow",
    package: "webflow-mcp-server",
    category: "Design & Creative",
    summary:
      "Read and update Webflow sites, collections and CMS items. Use when the site content lives in Webflow rather than a repository.",
    auth: "apiKey",
    scopes: ["read", "write"],
    homepage: "https://webflow.com",
    authNote: "Requires a Webflow site API token with CMS scopes for the site you want to reach.",
    tools: [
      { name: "list_sites", description: "Lists the sites the token can reach.", readOnly: true },
      { name: "list_collections", description: "Lists CMS collections for a site.", readOnly: true, params: { siteId: req("Site id.") } },
      { name: "list_items", description: "Lists items in a collection.", readOnly: true, params: { collectionId: req("Collection id.") } },
      { name: "create_item", description: "Creates a CMS item.", readOnly: false, params: { collectionId: req("Collection id."), fields: req("JSON object of field values.") } },
      { name: "update_item", description: "Updates a CMS item.", readOnly: false, params: { collectionId: req("Collection id."), itemId: req("Item id."), fields: req("JSON object of field values.") } },
    ],
  },

  /* ---------------------------------------------------- marketing & social */
  {
    slug: "mailchimp",
    title: "Mailchimp",
    icon: "MailChimp",
    package: "mailchimp-mcp",
    category: "Sales & Marketing",
    summary:
      "Read and manage Mailchimp audiences, campaigns and reports. Use for email marketing where Mailchimp holds the list.",
    auth: "apiKey",
    scopes: ["read", "write"],
    homepage: "https://mailchimp.com",
    authNote:
      "Requires a Mailchimp API key. The key encodes its data centre, so it only reaches that account.",
    tools: [
      { name: "list_audiences", description: "Lists audiences and their member counts.", readOnly: true },
      { name: "list_campaigns", description: "Lists campaigns, optionally by status.", readOnly: true, params: { status: opt("Campaign status filter.") } },
      { name: "get_campaign_report", description: "Reads open, click and bounce figures for a campaign.", readOnly: true, params: { campaignId: req("Campaign id.") } },
      { name: "add_member", description: "Adds or updates a member in an audience.", readOnly: false, params: { audienceId: req("Audience id."), email: req("Member email address."), fields: opt("JSON object of merge fields.") } },
      { name: "create_campaign", description: "Creates a draft campaign. Does not send it.", readOnly: false, params: { audienceId: req("Audience id."), subject: req("Subject line."), html: req("Campaign HTML.") } },
    ],
  },
  {
    slug: "buffer",
    title: "Buffer",
    icon: "Buffer",
    package: "buffer-mcp-server",
    category: "Sales & Marketing",
    summary:
      "Queue and read scheduled social posts across connected channels. Use for social scheduling without giving an agent each platform's credentials.",
    auth: "apiKey",
    scopes: ["read", "write"],
    homepage: "https://buffer.com",
    authNote: "Requires a Buffer access token for the channels you want reachable.",
    tools: [
      { name: "list_channels", description: "Lists connected social channels.", readOnly: true },
      { name: "list_scheduled", description: "Lists queued posts for a channel.", readOnly: true, params: { channelId: opt("Channel id.") } },
      { name: "create_post", description: "Adds a post to a channel's queue.", readOnly: false, params: { channelId: req("Channel id."), text: req("Post text."), scheduledAt: opt("ISO time to publish.") } },
    ],
  },
  {
    slug: "pinterest",
    title: "Pinterest",
    icon: "Pinterest",
    package: "pinterest-mcp-server",
    category: "Design & Creative",
    summary:
      "Search Pinterest images and read board data. Use for visual research and reference gathering.",
    auth: "apiKey",
    scopes: ["read"],
    homepage: "https://www.pinterest.com",
    authNote: "Requires a Pinterest app access token. Read-only against the authorised account.",
    tools: [
      { name: "search_pins", description: "Searches pins by keyword.", readOnly: true, params: { query: req("Search terms."), limit: optNum("Maximum results.") } },
      { name: "list_boards", description: "Lists the authorised account's boards.", readOnly: true },
    ],
  },
  {
    slug: "youtube-data",
    title: "YouTube",
    icon: "YouTube",
    package: "@anaisbetts/mcp-youtube",
    category: "Research & Knowledge",
    summary:
      "Fetch YouTube video metadata and transcripts. Use for research and content analysis without watching the video.",
    auth: "none",
    scopes: ["read"],
    homepage: "https://www.youtube.com",
    authNote:
      "No credential required for public videos. Transcripts are only available where the uploader published captions.",
    tools: [
      { name: "get_transcript", description: "Downloads a public video's transcript when captions exist.", readOnly: true, params: { url: req("Video URL.") } },
      { name: "get_metadata", description: "Reads a public video's title, description and duration.", readOnly: true, params: { url: req("Video URL.") } },
    ],
  },

  /* ------------------------------------------------------ hiring & scheduling */
  {
    slug: "greenhouse",
    title: "Greenhouse",
    icon: "Greenhouse",
    package: "greenhouse-mcp",
    category: "Documents & Communication",
    summary:
      "Read Greenhouse jobs, candidates and interview stages. Use for hiring pipeline work where Greenhouse is the ATS.",
    auth: "apiKey",
    scopes: ["read"],
    homepage: "https://www.greenhouse.io",
    authNote:
      "Requires a Greenhouse Harvest API key. Candidate data is personal data — scope the key narrowly and treat every read accordingly.",
    tools: [
      { name: "list_jobs", description: "Lists open jobs.", readOnly: true },
      { name: "list_candidates", description: "Lists candidates for a job.", readOnly: true, params: { jobId: req("Job id.") } },
      { name: "get_candidate", description: "Reads one candidate's application and stage.", readOnly: true, params: { candidateId: req("Candidate id.") } },
      { name: "list_stages", description: "Lists interview stages for a job.", readOnly: true, params: { jobId: req("Job id.") } },
    ],
  },
  {
    slug: "calendly",
    title: "Calendly",
    icon: "Calendly",
    package: "calendly-mcp-server",
    category: "Documents & Communication",
    summary:
      "Read Calendly event types and scheduled bookings. Use for scheduling coordination without exposing a full calendar.",
    auth: "apiKey",
    scopes: ["read"],
    homepage: "https://calendly.com",
    authNote: "Requires a Calendly personal access token for the authorised user.",
    tools: [
      { name: "list_event_types", description: "Lists bookable event types.", readOnly: true },
      { name: "list_scheduled_events", description: "Lists scheduled bookings in a period.", readOnly: true, params: { since: opt("ISO start date."), until: opt("ISO end date.") } },
      { name: "get_invitee", description: "Reads an invitee's answers for a booking.", readOnly: true, params: { eventId: req("Scheduled event id.") } },
    ],
  },
  {
    slug: "zoom",
    title: "Zoom",
    icon: "Zoom",
    package: "zoom-mcp-server",
    category: "Documents & Communication",
    summary:
      "Create and read Zoom meetings. Use for scheduling calls and retrieving joining details.",
    auth: "oauth2",
    scopes: ["read", "write"],
    homepage: "https://zoom.us",
    authNote: "Requires a Zoom server-to-server OAuth app with meeting scopes.",
    tools: [
      { name: "list_meetings", description: "Lists upcoming meetings for the authorised user.", readOnly: true },
      { name: "get_meeting", description: "Reads a meeting's details and join URL.", readOnly: true, params: { meetingId: req("Meeting id.") } },
      { name: "create_meeting", description: "Schedules a meeting.", readOnly: false, params: { topic: req("Meeting topic."), startTime: req("ISO start time."), duration: optNum("Duration in minutes.") } },
    ],
  },
  {
    slug: "typeform",
    title: "Typeform",
    icon: "Typeform",
    package: "typeform-mcp-server",
    category: "Research & Knowledge",
    summary:
      "Create forms and read responses. Use for surveys and structured intake where the answers must be analysed.",
    auth: "apiKey",
    scopes: ["read", "write"],
    homepage: "https://www.typeform.com",
    authNote: "Requires a Typeform personal access token with form and response scopes.",
    tools: [
      { name: "list_forms", description: "Lists forms in the account.", readOnly: true },
      { name: "get_responses", description: "Reads responses for a form.", readOnly: true, params: { formId: req("Form id."), since: opt("ISO start date.") } },
      { name: "create_form", description: "Creates a form from a field definition.", readOnly: false, params: { title: req("Form title."), fields: req("JSON array of field definitions.") } },
    ],
  },

  /* -------------------------------------------------------- collaboration */
  {
    slug: "confluence",
    title: "Confluence",
    icon: "Confluence",
    package: "confluence-mcp-server",
    category: "Documents & Communication",
    summary:
      "Search, read and write Confluence pages. Use where team knowledge lives in Confluence rather than a repository.",
    auth: "apiKey",
    scopes: ["read", "write"],
    homepage: "https://www.atlassian.com/software/confluence",
    authNote:
      "Requires an Atlassian API token plus the account email and site URL. Cloud, Server and Data Center differ in their API paths.",
    tools: [
      { name: "search", description: "Searches pages by text or CQL.", readOnly: true, params: { query: req("Search terms or CQL.") } },
      { name: "get_page", description: "Reads one page's content.", readOnly: true, params: { pageId: req("Page id.") } },
      { name: "create_page", description: "Creates a page in a space.", readOnly: false, params: { spaceKey: req("Space key."), title: req("Page title."), body: req("Page body in storage format.") } },
      { name: "update_page", description: "Updates an existing page.", readOnly: false, params: { pageId: req("Page id."), body: req("New page body."), version: optNum("Expected current version.") } },
    ],
  },
  {
    slug: "clickup",
    title: "ClickUp",
    icon: "ClickUp",
    package: "@taazkareem/clickup-mcp-server",
    category: "Tools & Automation",
    summary:
      "Read and update ClickUp tasks, lists and docs. Use for project tracking where ClickUp is the system of record.",
    auth: "apiKey",
    scopes: ["read", "write"],
    homepage: "https://clickup.com",
    authNote: "Requires a ClickUp personal API token and the team id you want to reach.",
    tools: [
      { name: "list_tasks", description: "Lists tasks in a list.", readOnly: true, params: { listId: req("List id.") } },
      { name: "get_task", description: "Reads one task.", readOnly: true, params: { taskId: req("Task id.") } },
      { name: "create_task", description: "Creates a task in a list.", readOnly: false, params: { listId: req("List id."), name: req("Task name."), description: opt("Task description.") } },
      { name: "update_task", description: "Updates a task's status or fields.", readOnly: false, params: { taskId: req("Task id."), fields: req("JSON object of fields to change.") } },
    ],
  },
  {
    slug: "miro",
    title: "Miro",
    icon: "Miro",
    package: "miro-mcp-server",
    category: "Design & Creative",
    summary:
      "Read and create Miro board items. Use for collaborative diagramming and workshop artefacts.",
    auth: "oauth2",
    scopes: ["read", "write"],
    homepage: "https://miro.com",
    authNote: "Requires a Miro app access token with board read and write scopes.",
    tools: [
      { name: "list_boards", description: "Lists boards the token can reach.", readOnly: true },
      { name: "list_items", description: "Lists items on a board.", readOnly: true, params: { boardId: req("Board id.") } },
      { name: "create_sticky", description: "Creates a sticky note on a board.", readOnly: false, params: { boardId: req("Board id."), text: req("Sticky note text.") } },
    ],
  },

  /* ------------------------------------------------- hospitality, travel, local */
  {
    slug: "airbnb",
    title: "Airbnb",
    icon: "Airbnb",
    package: "@openbnb/mcp-server-airbnb",
    category: "Research & Knowledge",
    summary:
      "Search Airbnb listings and read their details. Use for travel research and competitive pricing comparison.",
    auth: "none",
    scopes: ["read"],
    homepage: "https://www.airbnb.com",
    authNote:
      "No credential required. Reads public listing data only; it cannot book or manage a listing.",
    tools: [
      { name: "search_listings", description: "Searches listings by location and dates.", readOnly: true, params: { location: req("Place name."), checkin: opt("ISO check-in date."), checkout: opt("ISO check-out date."), adults: optNum("Number of adults.") } },
      { name: "get_listing", description: "Reads one listing's details.", readOnly: true, params: { listingId: req("Listing id.") } },
    ],
  },
  {
    slug: "google-maps-places",
    title: "Google Maps",
    icon: "Google Maps",
    package: "@modelcontextprotocol/server-google-maps",
    category: "Research & Knowledge",
    summary:
      "Geocode addresses, search places and compute routes. Use for local business research, service areas and travel planning.",
    auth: "apiKey",
    scopes: ["read"],
    homepage: "https://developers.google.com/maps",
    authNote:
      "Requires a Google Maps Platform API key with Places, Geocoding and Directions enabled. Billing applies per request.",
    tools: [
      { name: "geocode", description: "Converts an address to coordinates.", readOnly: true, params: { address: req("Address to resolve.") } },
      { name: "search_places", description: "Searches places near a location.", readOnly: true, params: { query: req("Search terms."), location: opt("Latitude,longitude to search near.") } },
      { name: "get_place_details", description: "Reads a place's details including hours and rating.", readOnly: true, params: { placeId: req("Place id.") } },
      { name: "get_directions", description: "Computes a route between two points.", readOnly: true, params: { origin: req("Start address or coordinates."), destination: req("End address or coordinates."), mode: opt("Travel mode.") } },
    ],
  },
  {
    slug: "mapbox",
    title: "Mapbox",
    icon: "Mapbox",
    package: "@mapbox/mcp-server",
    category: "Research & Knowledge",
    summary:
      "Geocode, search and route with Mapbox. Use as an alternative mapping provider, including isochrone service areas.",
    auth: "apiKey",
    scopes: ["read"],
    homepage: "https://www.mapbox.com",
    authNote: "Requires a Mapbox access token. Published by Mapbox. Billing applies per request.",
    tools: [
      { name: "geocode", description: "Converts a place name or address to coordinates.", readOnly: true, params: { query: req("Address or place name.") } },
      { name: "reverse_geocode", description: "Converts coordinates to an address.", readOnly: true, params: { longitude: optNum("Longitude."), latitude: optNum("Latitude.") } },
      { name: "get_directions", description: "Computes a route between waypoints.", readOnly: true, params: { coordinates: req("Semicolon-separated longitude,latitude pairs."), profile: opt("Routing profile.") } },
      { name: "get_isochrone", description: "Computes the area reachable within a travel time.", readOnly: true, params: { coordinates: req("Longitude,latitude origin."), minutes: optNum("Travel time in minutes.") } },
    ],
  },
  {
    slug: "zillow",
    title: "Zillow",
    icon: "Zillow",
    package: "zillow-mcp-server",
    category: "Research & Knowledge",
    summary:
      "Read Zillow property and market data. Use for property research and valuation comparison in supported regions.",
    auth: "apiKey",
    scopes: ["read"],
    homepage: "https://www.zillow.com",
    authNote:
      "Requires a Zillow-compatible data API key. Coverage is United States only; do not rely on it elsewhere.",
    tools: [
      { name: "search_properties", description: "Searches properties by location and filters.", readOnly: true, params: { location: req("City, state or postal code."), maxPrice: optNum("Maximum price.") } },
      { name: "get_property", description: "Reads one property's details and estimate.", readOnly: true, params: { propertyId: req("Property id or address.") } },
    ],
  },

  /* ----------------------------------------------------------- education */
  {
    slug: "canvas-lms",
    title: "Canvas",
    icon: "Canvas",
    package: "canvas-mcp-server",
    category: "Research & Knowledge",
    summary:
      "Read Canvas courses, assignments and submissions. Use for teaching and learning administration where Canvas is the LMS.",
    auth: "apiKey",
    scopes: ["read"],
    homepage: "https://www.instructure.com/canvas",
    authNote:
      "Requires a Canvas API token and your institution's Canvas URL. Student data is personal data; scope the token narrowly.",
    tools: [
      { name: "list_courses", description: "Lists courses the token can reach.", readOnly: true },
      { name: "list_assignments", description: "Lists assignments in a course.", readOnly: true, params: { courseId: req("Course id.") } },
      { name: "list_submissions", description: "Lists submissions for an assignment.", readOnly: true, params: { courseId: req("Course id."), assignmentId: req("Assignment id.") } },
      { name: "get_course_content", description: "Reads a course's pages and modules.", readOnly: true, params: { courseId: req("Course id.") } },
    ],
  },
  {
    slug: "moodle",
    title: "Moodle",
    icon: "Moodle",
    package: "moodle-mcp-server",
    category: "Research & Knowledge",
    summary:
      "Read Moodle courses, activities and grades. Use for course administration where Moodle is the LMS.",
    auth: "apiKey",
    scopes: ["read"],
    homepage: "https://moodle.org",
    authNote:
      "Requires a Moodle web-service token and the site URL, with the relevant web-service functions enabled by an administrator.",
    tools: [
      { name: "list_courses", description: "Lists courses.", readOnly: true },
      { name: "get_course_contents", description: "Reads a course's sections and activities.", readOnly: true, params: { courseId: req("Course id.") } },
      { name: "list_grades", description: "Lists grade items for a course.", readOnly: true, params: { courseId: req("Course id.") } },
    ],
  },

  /* --------------------------------------------------------- communications */
  {
    slug: "whatsapp-business",
    title: "WhatsApp",
    icon: "WhatsApp",
    package: "whatsapp-mcp-server",
    category: "Documents & Communication",
    summary:
      "Send and read WhatsApp Business Cloud messages. Use for customer messaging where WhatsApp is the channel.",
    auth: "apiKey",
    scopes: ["read", "write"],
    homepage: "https://business.whatsapp.com",
    authNote:
      "Requires a WhatsApp Business Cloud API access token and phone number id. Message templates must be pre-approved by Meta before they can be sent.",
    tools: [
      { name: "send_message", description: "Sends a text message to a number.", readOnly: false, params: { to: req("Recipient phone number in international format."), text: req("Message text.") } },
      { name: "send_template", description: "Sends a pre-approved template message.", readOnly: false, params: { to: req("Recipient phone number."), template: req("Approved template name."), variables: opt("JSON array of template variables.") } },
      { name: "list_messages", description: "Lists recent messages for the number.", readOnly: true },
    ],
  },
  {
    slug: "telegram",
    title: "Telegram",
    icon: "Telegram",
    package: "mcp-telegram",
    category: "Documents & Communication",
    summary:
      "Read and send Telegram messages. Use for community and support channels hosted on Telegram.",
    auth: "apiKey",
    scopes: ["read", "write"],
    homepage: "https://telegram.org",
    authNote:
      "Requires Telegram API credentials and a session. This uses the client protocol rather than a bot token, so it acts as an account — grant it deliberately.",
    tools: [
      { name: "list_dialogs", description: "Lists chats and channels the session can reach.", readOnly: true },
      { name: "read_messages", description: "Reads recent messages from a chat.", readOnly: true, params: { chatId: req("Chat id or username."), limit: optNum("Maximum messages.") } },
      { name: "send_message", description: "Sends a message to a chat.", readOnly: false, params: { chatId: req("Chat id or username."), text: req("Message text.") } },
    ],
  },
  {
    slug: "mattermost",
    title: "Mattermost",
    icon: "Mattermost",
    package: "mattermost-mcp-server",
    category: "Documents & Communication",
    summary:
      "Read and post to Mattermost channels. Use for team chat on self-hosted infrastructure.",
    auth: "apiKey",
    scopes: ["read", "write"],
    homepage: "https://mattermost.com",
    authNote: "Requires a Mattermost personal access token and the server URL.",
    tools: [
      { name: "list_channels", description: "Lists channels in a team.", readOnly: true, params: { teamId: opt("Team id.") } },
      { name: "read_posts", description: "Reads recent posts in a channel.", readOnly: true, params: { channelId: req("Channel id."), limit: optNum("Maximum posts.") } },
      { name: "create_post", description: "Posts a message to a channel.", readOnly: false, params: { channelId: req("Channel id."), message: req("Message text.") } },
    ],
  },

  /* ------------------------------------------------------- files & analytics */
  {
    slug: "box",
    title: "Box",
    icon: "Box",
    package: "box-mcp-server",
    category: "Documents & Communication",
    summary:
      "Search, read and upload Box files. Use where documents are held in Box rather than a local workspace.",
    auth: "oauth2",
    scopes: ["read", "write"],
    homepage: "https://www.box.com",
    authNote:
      "Requires a Box app with the file scopes you intend to use. Enterprise Box accounts may require admin authorisation of the app.",
    tools: [
      { name: "search_files", description: "Searches files by name or content.", readOnly: true, params: { query: req("Search terms.") } },
      { name: "read_file", description: "Reads a text file's contents.", readOnly: true, params: { fileId: req("File id.") } },
      { name: "list_folder", description: "Lists a folder's contents.", readOnly: true, params: { folderId: opt("Folder id. Root when omitted.") } },
      { name: "upload_file", description: "Uploads a file to a folder.", readOnly: false, params: { folderId: req("Destination folder id."), name: req("File name."), content: req("File contents.") } },
    ],
  },
  {
    slug: "odoo",
    title: "Odoo",
    icon: "Odoo",
    package: "odoo-mcp-server",
    category: "Tools & Automation",
    summary:
      "Read and update Odoo records across sales, inventory and accounting modules. Use where Odoo is the ERP.",
    auth: "apiKey",
    scopes: ["read", "write"],
    homepage: "https://www.odoo.com",
    authNote:
      "Requires an Odoo URL, database name, username and API key. The key inherits that user's record rules, so create a dedicated user with the access you intend.",
    tools: [
      { name: "search_records", description: "Searches records in a model with a domain filter.", readOnly: true, params: { model: req("Odoo model name, e.g. res.partner."), domain: opt("JSON domain filter.") } },
      { name: "read_record", description: "Reads one record's fields.", readOnly: true, params: { model: req("Odoo model name."), id: optNum("Record id.") } },
      { name: "create_record", description: "Creates a record in a model.", readOnly: false, params: { model: req("Odoo model name."), values: req("JSON object of field values.") } },
      { name: "update_record", description: "Updates a record's fields.", readOnly: false, params: { model: req("Odoo model name."), id: optNum("Record id."), values: req("JSON object of field values.") } },
    ],
  },
];
