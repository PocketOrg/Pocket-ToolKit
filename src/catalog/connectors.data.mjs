/**
 * Connector definitions for the seed catalogue.
 *
 * A Connector is an MCP server: a process exposing callable tools. These
 * definitions describe popular services and the tools an agent needs from them.
 *
 * Two deliberate choices:
 *
 *   - **`command` points at the real published MCP package** where one exists
 *     (`@modelcontextprotocol/server-*` and vendor equivalents), so a connector
 *     is installable rather than illustrative.
 *   - **`readOnly` is marked honestly.** Pocket can run a read-only tool without
 *     asking; anything that mutates state must not be flagged, or the
 *     confirmation step is silently skipped.
 *
 * Scopes are minimal on purpose — they are shown to the user at install time, and
 * a connector asking for more than it uses will not be trusted.
 *
 * Fields: slug, cat, summary, transport, command|endpoint, auth, scopes,
 * tools[{ name, desc, params, readOnly }], homepage.
 */

const npx = (pkg) => ({ run: "npx", args: ["-y", pkg] });

export const CONNECTORS = [
  /* ------------------------------------------------------ dev & code hosting */
  {
    slug: "github",
    cat: "Software Engineering",
    summary:
      "Read and write GitHub issues, pull requests, code and CI runs. Use for triage, review and release work.",
    command: npx("@modelcontextprotocol/server-github"),
    auth: "apiKey",
    scopes: ["repo", "read:org"],
    homepage: "https://github.com",
    tools: [
      {
        name: "search_repositories",
        desc: "Searches repositories by name, topic or owner.",
        params: { query: { type: "string", desc: "GitHub search syntax.", required: true } },
        readOnly: true,
      },
      {
        name: "get_file_contents",
        desc: "Reads a file or lists a directory at a given ref.",
        params: {
          owner: { type: "string", desc: "Repository owner.", required: true },
          repo: { type: "string", desc: "Repository name.", required: true },
          path: { type: "string", desc: "Path within the repository.", required: true },
          ref: "Branch, tag or commit SHA. Defaults to the default branch.",
        },
        readOnly: true,
      },
      {
        name: "create_issue",
        desc: "Opens an issue with a title, body and optional labels and assignees.",
        params: {
          owner: { type: "string", desc: "Repository owner.", required: true },
          repo: { type: "string", desc: "Repository name.", required: true },
          title: { type: "string", desc: "Issue title.", required: true },
          body: "Markdown body.",
          labels: { type: "array", desc: "Label names to apply." },
        },
      },
      {
        name: "create_pull_request",
        desc: "Opens a pull request between two branches.",
        params: {
          owner: { type: "string", desc: "Repository owner.", required: true },
          repo: { type: "string", desc: "Repository name.", required: true },
          title: { type: "string", desc: "Pull request title.", required: true },
          head: { type: "string", desc: "Branch containing the changes.", required: true },
          base: { type: "string", desc: "Branch to merge into.", required: true },
          body: "Markdown description.",
        },
      },
      {
        name: "list_pull_requests",
        desc: "Lists pull requests, filtered by state.",
        params: {
          owner: { type: "string", desc: "Repository owner.", required: true },
          repo: { type: "string", desc: "Repository name.", required: true },
          state: "open, closed or all. Defaults to open.",
        },
        readOnly: true,
      },
      {
        name: "create_pull_request_review",
        desc: "Submits a review with comments, approving or requesting changes.",
        params: {
          owner: { type: "string", desc: "Repository owner.", required: true },
          repo: { type: "string", desc: "Repository name.", required: true },
          pull_number: { type: "number", desc: "Pull request number.", required: true },
          event: { type: "string", desc: "APPROVE, REQUEST_CHANGES or COMMENT.", required: true },
          body: "Overall review comment.",
        },
      },
    ],
  },
  {
    slug: "gitlab",
    cat: "Software Engineering",
    summary:
      "Manage GitLab projects, merge requests, issues and pipelines. Use for teams hosting on GitLab.",
    command: npx("@modelcontextprotocol/server-gitlab"),
    auth: "apiKey",
    scopes: ["api", "read_repository"],
    homepage: "https://gitlab.com",
    tools: [
      {
        name: "search_repositories",
        desc: "Searches projects the token can see.",
        params: { search: { type: "string", desc: "Search term.", required: true } },
        readOnly: true,
      },
      {
        name: "get_file_contents",
        desc: "Reads a file at a given ref.",
        params: {
          project_id: { type: "string", desc: "Project id or path.", required: true },
          file_path: { type: "string", desc: "Path within the project.", required: true },
          ref: "Branch, tag or commit.",
        },
        readOnly: true,
      },
      {
        name: "create_merge_request",
        desc: "Opens a merge request between two branches.",
        params: {
          project_id: { type: "string", desc: "Project id or path.", required: true },
          title: { type: "string", desc: "Merge request title.", required: true },
          source_branch: { type: "string", desc: "Branch with the changes.", required: true },
          target_branch: { type: "string", desc: "Branch to merge into.", required: true },
        },
      },
      {
        name: "create_issue",
        desc: "Opens an issue on a project.",
        params: {
          project_id: { type: "string", desc: "Project id or path.", required: true },
          title: { type: "string", desc: "Issue title.", required: true },
          description: "Markdown description.",
        },
      },
    ],
  },
  {
    slug: "sentry",
    cat: "Software Engineering",
    summary:
      "Inspect Sentry errors, stack traces and release health. Use when triaging a production exception.",
    command: npx("@sentry/mcp-server"),
    auth: "apiKey",
    scopes: ["project:read", "event:read"],
    homepage: "https://sentry.io",
    tools: [
      {
        name: "list_issues",
        desc: "Lists unresolved issues for a project, most frequent first.",
        params: {
          organization_slug: { type: "string", desc: "Organisation slug.", required: true },
          project_slug: { type: "string", desc: "Project slug.", required: true },
          query: "Sentry search query, e.g. is:unresolved.",
        },
        readOnly: true,
      },
      {
        name: "get_issue_details",
        desc: "Returns the full stack trace, breadcrumbs and tags for one issue.",
        params: { issue_id: { type: "string", desc: "Sentry issue id.", required: true } },
        readOnly: true,
      },
      {
        name: "resolve_issue",
        desc: "Marks an issue resolved.",
        params: { issue_id: { type: "string", desc: "Sentry issue id.", required: true } },
      },
    ],
  },

  /* ------------------------------------------------------ data & analytics */
  {
    slug: "postgres",
    cat: "Data & Analytics",
    summary:
      "Query PostgreSQL and inspect schemas. Use for analysis, debugging data problems, or checking a migration.",
    command: npx("@modelcontextprotocol/server-postgres"),
    auth: "apiKey",
    scopes: ["read"],
    homepage: "https://www.postgresql.org",
    tools: [
      {
        name: "query",
        desc: "Runs a read-only SQL query and returns rows. Writes are rejected.",
        params: { sql: { type: "string", desc: "A SELECT statement.", required: true } },
        readOnly: true,
      },
      {
        name: "list_tables",
        desc: "Lists tables and views in a schema.",
        params: { schema: "Schema name. Defaults to public." },
        readOnly: true,
      },
      {
        name: "describe_table",
        desc: "Returns columns, types, indexes and constraints for one table.",
        params: { table: { type: "string", desc: "Table name.", required: true } },
        readOnly: true,
      },
    ],
  },
  {
    slug: "sqlite",
    cat: "Data & Analytics",
    summary:
      "Query and inspect a local SQLite database. Use for analysis of a file-based dataset.",
    command: npx("@modelcontextprotocol/server-sqlite"),
    auth: "none",
    homepage: "https://sqlite.org",
    tools: [
      {
        name: "read_query",
        desc: "Runs a SELECT and returns rows.",
        params: { query: { type: "string", desc: "A SELECT statement.", required: true } },
        readOnly: true,
      },
      {
        name: "write_query",
        desc: "Runs an INSERT, UPDATE or DELETE.",
        params: { query: { type: "string", desc: "The statement to run.", required: true } },
      },
      {
        name: "list_tables",
        desc: "Lists every table in the database.",
        readOnly: true,
      },
    ],
  },
  {
    slug: "supabase",
    cat: "Data & Analytics",
    summary:
      "Manage Supabase projects: query Postgres, inspect auth users and storage. Use for Supabase-backed apps.",
    command: npx("@supabase/mcp-server-supabase"),
    auth: "apiKey",
    scopes: ["read", "write"],
    homepage: "https://supabase.com",
    tools: [
      {
        name: "execute_sql",
        desc: "Runs SQL against the project database.",
        params: { query: { type: "string", desc: "The SQL to run.", required: true } },
      },
      {
        name: "list_tables",
        desc: "Lists tables with their schemas.",
        readOnly: true,
      },
      {
        name: "apply_migration",
        desc: "Applies a named DDL migration.",
        params: {
          name: { type: "string", desc: "Migration name.", required: true },
          query: { type: "string", desc: "DDL to apply.", required: true },
        },
      },
    ],
  },

  /* --------------------------------------------------------- cloud & devops */
  {
    slug: "docker",
    cat: "Cloud & DevOps",
    summary:
      "Inspect and control Docker containers, images and logs. Use when debugging a container or checking what is running.",
    command: npx("docker-mcp"),
    auth: "none",
    homepage: "https://www.docker.com",
    tools: [
      {
        name: "list_containers",
        desc: "Lists containers with status and ports.",
        params: { all: { type: "boolean", desc: "Include stopped containers." } },
        readOnly: true,
      },
      {
        name: "get_logs",
        desc: "Returns recent log output for a container.",
        params: {
          container: { type: "string", desc: "Container name or id.", required: true },
          tail: { type: "number", desc: "Number of lines. Defaults to 100." },
        },
        readOnly: true,
      },
      {
        name: "restart_container",
        desc: "Restarts a container.",
        params: { container: { type: "string", desc: "Container name or id.", required: true } },
      },
    ],
  },
  {
    slug: "kubernetes",
    cat: "Cloud & DevOps",
    summary:
      "Inspect Kubernetes workloads, pods, events and logs. Use when diagnosing a cluster or a failing deployment.",
    command: npx("mcp-server-kubernetes"),
    auth: "apiKey",
    scopes: ["read"],
    homepage: "https://kubernetes.io",
    tools: [
      {
        name: "list_pods",
        desc: "Lists pods in a namespace with phase and restart counts.",
        params: { namespace: "Namespace. Defaults to default." },
        readOnly: true,
      },
      {
        name: "get_pod_logs",
        desc: "Returns logs for a pod, optionally for the previous instance.",
        params: {
          name: { type: "string", desc: "Pod name.", required: true },
          namespace: "Namespace.",
          previous: { type: "boolean", desc: "Read the crashed instance's logs." },
        },
        readOnly: true,
      },
      {
        name: "describe_resource",
        desc: "Returns full detail and recent events for a resource.",
        params: {
          kind: { type: "string", desc: "Resource kind, e.g. deployment.", required: true },
          name: { type: "string", desc: "Resource name.", required: true },
          namespace: "Namespace.",
        },
        readOnly: true,
      },
    ],
  },
  {
    slug: "aws",
    cat: "Cloud & DevOps",
    summary:
      "Query AWS resources, CloudWatch logs and costs. Use for infrastructure inspection and spend review.",
    command: npx("@aws/mcp-server-aws"),
    auth: "apiKey",
    scopes: ["read"],
    homepage: "https://aws.amazon.com",
    tools: [
      {
        name: "list_resources",
        desc: "Lists resources of a given type in a region.",
        params: {
          service: { type: "string", desc: "Service, e.g. ec2, s3, lambda.", required: true },
          region: "AWS region.",
        },
        readOnly: true,
      },
      {
        name: "query_logs",
        desc: "Runs a CloudWatch Logs Insights query.",
        params: {
          log_group: { type: "string", desc: "Log group name.", required: true },
          query: { type: "string", desc: "Insights query string.", required: true },
        },
        readOnly: true,
      },
      {
        name: "get_cost_summary",
        desc: "Returns cost broken down by service for a period.",
        params: {
          start: { type: "string", desc: "ISO start date.", required: true },
          end: { type: "string", desc: "ISO end date.", required: true },
        },
        readOnly: true,
      },
    ],
  },
  {
    slug: "cloudflare",
    cat: "Cloud & DevOps",
    summary:
      "Manage Cloudflare Workers, DNS, KV and analytics. Use when deploying or debugging on Cloudflare.",
    command: npx("@cloudflare/mcp-server-cloudflare"),
    auth: "apiKey",
    scopes: ["read", "write"],
    homepage: "https://cloudflare.com",
    tools: [
      {
        name: "list_workers",
        desc: "Lists Workers in the account.",
        readOnly: true,
      },
      {
        name: "get_worker_logs",
        desc: "Tails recent logs for a Worker.",
        params: { name: { type: "string", desc: "Worker name.", required: true } },
        readOnly: true,
      },
      {
        name: "list_dns_records",
        desc: "Lists DNS records for a zone.",
        params: { zone: { type: "string", desc: "Zone name.", required: true } },
        readOnly: true,
      },
    ],
  },
  {
    slug: "vercel",
    cat: "Cloud & DevOps",
    summary:
      "Inspect Vercel deployments, build logs and environment variables. Use when a deploy fails or a preview needs checking.",
    command: npx("@vercel/mcp-server"),
    auth: "apiKey",
    scopes: ["read"],
    homepage: "https://vercel.com",
    tools: [
      {
        name: "list_deployments",
        desc: "Lists recent deployments with status.",
        params: { project: "Project name or id." },
        readOnly: true,
      },
      {
        name: "get_deployment_logs",
        desc: "Returns build and runtime logs for a deployment.",
        params: { deployment_id: { type: "string", desc: "Deployment id.", required: true } },
        readOnly: true,
      },
    ],
  },

  /* --------------------------------------------- documents & communication */
  {
    slug: "slack",
    cat: "Documents & Communication",
    summary:
      "Read and post Slack messages, and search channel history. Use for team updates and finding past decisions.",
    command: npx("@modelcontextprotocol/server-slack"),
    auth: "oauth2",
    scopes: ["channels:read", "chat:write", "search:read"],
    homepage: "https://slack.com",
    tools: [
      {
        name: "list_channels",
        desc: "Lists channels the token can see.",
        readOnly: true,
      },
      {
        name: "get_channel_history",
        desc: "Returns recent messages from a channel.",
        params: {
          channel_id: { type: "string", desc: "Channel id.", required: true },
          limit: { type: "number", desc: "Messages to return. Defaults to 50." },
        },
        readOnly: true,
      },
      {
        name: "post_message",
        desc: "Posts a message to a channel or thread.",
        params: {
          channel_id: { type: "string", desc: "Channel id.", required: true },
          text: { type: "string", desc: "Message text.", required: true },
          thread_ts: "Reply in this thread rather than the channel.",
        },
      },
    ],
  },
  {
    slug: "notion",
    cat: "Documents & Communication",
    summary:
      "Read and write Notion pages and databases. Use for specs, notes and structured project tracking.",
    command: npx("@notionhq/notion-mcp-server"),
    auth: "oauth2",
    scopes: ["read", "insert", "update"],
    homepage: "https://notion.so",
    tools: [
      {
        name: "search",
        desc: "Searches pages and databases by title and content.",
        params: { query: { type: "string", desc: "Search text.", required: true } },
        readOnly: true,
      },
      {
        name: "get_page",
        desc: "Returns a page's properties and block content.",
        params: { page_id: { type: "string", desc: "Notion page id.", required: true } },
        readOnly: true,
      },
      {
        name: "create_page",
        desc: "Creates a page in a parent page or database.",
        params: {
          parent_id: { type: "string", desc: "Parent page or database id.", required: true },
          title: { type: "string", desc: "Page title.", required: true },
          content: "Markdown content for the body.",
        },
      },
      {
        name: "query_database",
        desc: "Queries a database with filters and sorts.",
        params: {
          database_id: { type: "string", desc: "Database id.", required: true },
          filter: { type: "object", desc: "Notion filter object." },
        },
        readOnly: true,
      },
    ],
  },
  {
    slug: "linear",
    cat: "Documents & Communication",
    summary:
      "Manage Linear issues, projects and cycles. Use for sprint planning and issue triage.",
    command: npx("@linear/mcp-server"),
    auth: "oauth2",
    scopes: ["read", "write"],
    homepage: "https://linear.app",
    tools: [
      {
        name: "list_issues",
        desc: "Lists issues filtered by team, state or assignee.",
        params: { team_id: "Team id.", state: "Workflow state name." },
        readOnly: true,
      },
      {
        name: "create_issue",
        desc: "Creates an issue with a title, description and priority.",
        params: {
          team_id: { type: "string", desc: "Team id.", required: true },
          title: { type: "string", desc: "Issue title.", required: true },
          description: "Markdown description.",
          priority: { type: "number", desc: "0 none to 4 low." },
        },
      },
      {
        name: "update_issue",
        desc: "Updates an issue's state, assignee or fields.",
        params: {
          issue_id: { type: "string", desc: "Issue id.", required: true },
          state_id: "New workflow state id.",
        },
      },
    ],
  },
  {
    slug: "jira",
    cat: "Documents & Communication",
    summary:
      "Manage Jira issues, sprints and boards. Use for teams tracking work in Jira.",
    command: npx("mcp-atlassian"),
    auth: "apiKey",
    scopes: ["read:jira-work", "write:jira-work"],
    homepage: "https://www.atlassian.com/software/jira",
    tools: [
      {
        name: "search_issues",
        desc: "Searches issues using JQL.",
        params: { jql: { type: "string", desc: "A JQL query.", required: true } },
        readOnly: true,
      },
      {
        name: "create_issue",
        desc: "Creates an issue in a project.",
        params: {
          project_key: { type: "string", desc: "Project key.", required: true },
          summary: { type: "string", desc: "Issue summary.", required: true },
          issue_type: { type: "string", desc: "Bug, Task, Story.", required: true },
          description: "Issue description.",
        },
      },
      {
        name: "transition_issue",
        desc: "Moves an issue to a new workflow state.",
        params: {
          issue_key: { type: "string", desc: "Issue key, e.g. ENG-42.", required: true },
          transition: { type: "string", desc: "Target state name.", required: true },
        },
      },
    ],
  },
  {
    slug: "google-drive",
    cat: "Documents & Communication",
    summary:
      "Search and read Google Drive files, Docs and Sheets. Use for finding and summarising shared documents.",
    command: npx("@modelcontextprotocol/server-gdrive"),
    auth: "oauth2",
    scopes: ["drive.readonly"],
    homepage: "https://drive.google.com",
    tools: [
      {
        name: "search_files",
        desc: "Searches Drive by name and content.",
        params: { query: { type: "string", desc: "Search text.", required: true } },
        readOnly: true,
      },
      {
        name: "read_file",
        desc: "Reads a file's contents, converting Docs and Sheets to text.",
        params: { file_id: { type: "string", desc: "Drive file id.", required: true } },
        readOnly: true,
      },
    ],
  },
  {
    slug: "gmail",
    cat: "Documents & Communication",
    summary:
      "Search, read and send email through Gmail. Use for inbox triage and drafting replies.",
    command: npx("@gongrzhe/server-gmail-autoauth-mcp"),
    auth: "oauth2",
    scopes: ["gmail.readonly", "gmail.send"],
    homepage: "https://mail.google.com",
    tools: [
      {
        name: "search_emails",
        desc: "Searches messages using Gmail query syntax.",
        params: { query: { type: "string", desc: "e.g. from:x is:unread.", required: true } },
        readOnly: true,
      },
      {
        name: "read_email",
        desc: "Returns headers and body for one message.",
        params: { message_id: { type: "string", desc: "Gmail message id.", required: true } },
        readOnly: true,
      },
      {
        name: "send_email",
        desc: "Sends a message.",
        params: {
          to: { type: "string", desc: "Recipient address.", required: true },
          subject: { type: "string", desc: "Subject line.", required: true },
          body: { type: "string", desc: "Message body.", required: true },
        },
      },
    ],
  },
  {
    slug: "google-calendar",
    cat: "Documents & Communication",
    summary:
      "Read and create Google Calendar events. Use for scheduling and checking availability.",
    command: npx("@cocal/google-calendar-mcp"),
    auth: "oauth2",
    scopes: ["calendar.events"],
    homepage: "https://calendar.google.com",
    tools: [
      {
        name: "list_events",
        desc: "Lists events in a time range.",
        params: {
          time_min: { type: "string", desc: "ISO start.", required: true },
          time_max: { type: "string", desc: "ISO end.", required: true },
        },
        readOnly: true,
      },
      {
        name: "create_event",
        desc: "Creates an event with attendees.",
        params: {
          summary: { type: "string", desc: "Event title.", required: true },
          start: { type: "string", desc: "ISO start time.", required: true },
          end: { type: "string", desc: "ISO end time.", required: true },
          attendees: { type: "array", desc: "Attendee email addresses." },
        },
      },
    ],
  },

  /* ------------------------------------------------------ design & creative */
  {
    slug: "figma",
    cat: "Design & Creative",
    summary:
      "Read Figma files, frames and design tokens. Use when implementing a design or extracting styles.",
    command: npx("figma-developer-mcp"),
    auth: "apiKey",
    scopes: ["file_read"],
    homepage: "https://figma.com",
    tools: [
      {
        name: "get_file",
        desc: "Returns a file's document tree, frames and components.",
        params: { file_key: { type: "string", desc: "Figma file key.", required: true } },
        readOnly: true,
      },
      {
        name: "get_node",
        desc: "Returns one node's properties, including layout and styles.",
        params: {
          file_key: { type: "string", desc: "Figma file key.", required: true },
          node_id: { type: "string", desc: "Node id.", required: true },
        },
        readOnly: true,
      },
      {
        name: "get_image",
        desc: "Renders a node to an image URL.",
        params: {
          file_key: { type: "string", desc: "Figma file key.", required: true },
          node_id: { type: "string", desc: "Node id.", required: true },
        },
        readOnly: true,
      },
    ],
  },

  /* --------------------------------------------------- research & knowledge */
  {
    slug: "web-search",
    cat: "Research & Knowledge",
    summary:
      "Search the web and read pages. Use when the answer depends on current information rather than training data.",
    command: npx("@modelcontextprotocol/server-brave-search"),
    auth: "apiKey",
    scopes: ["search"],
    tools: [
      {
        name: "web_search",
        desc: "Searches the web and returns titles, URLs and snippets.",
        params: {
          query: { type: "string", desc: "Search query.", required: true },
          count: { type: "number", desc: "Results to return. Defaults to 10." },
        },
        readOnly: true,
      },
    ],
  },
  {
    slug: "fetch",
    cat: "Research & Knowledge",
    summary:
      "Fetch a URL and convert the page to readable markdown. Use for reading documentation or an article.",
    command: npx("@modelcontextprotocol/server-fetch"),
    auth: "none",
    tools: [
      {
        name: "fetch",
        desc: "Fetches a URL and returns its content as markdown.",
        params: {
          url: { type: "string", desc: "The URL to fetch.", required: true },
          max_length: { type: "number", desc: "Truncate to this many characters." },
        },
        readOnly: true,
      },
    ],
  },
  {
    slug: "filesystem",
    cat: "Tools & Automation",
    summary:
      "Read, write and search files in an allowed directory. Use for working with a local project.",
    command: npx("@modelcontextprotocol/server-filesystem"),
    auth: "none",
    tools: [
      {
        name: "read_file",
        desc: "Reads a file's contents.",
        params: { path: { type: "string", desc: "File path.", required: true } },
        readOnly: true,
      },
      {
        name: "write_file",
        desc: "Writes content to a file, creating or overwriting it.",
        params: {
          path: { type: "string", desc: "File path.", required: true },
          content: { type: "string", desc: "Content to write.", required: true },
        },
      },
      {
        name: "search_files",
        desc: "Searches file contents by pattern.",
        params: {
          pattern: { type: "string", desc: "Search pattern.", required: true },
          path: "Directory to search in.",
        },
        readOnly: true,
      },
      {
        name: "list_directory",
        desc: "Lists entries in a directory.",
        params: { path: { type: "string", desc: "Directory path.", required: true } },
        readOnly: true,
      },
    ],
  },

  /* ------------------------------------------------------ sales & marketing */
  {
    slug: "stripe",
    cat: "Sales & Marketing",
    summary:
      "Inspect Stripe customers, subscriptions, payments and disputes. Use for billing questions and revenue checks.",
    command: npx("@stripe/mcp"),
    auth: "apiKey",
    scopes: ["read"],
    homepage: "https://stripe.com",
    tools: [
      {
        name: "list_customers",
        desc: "Lists customers, optionally filtered by email.",
        params: { email: "Filter to this email address." },
        readOnly: true,
      },
      {
        name: "get_subscription",
        desc: "Returns a subscription with its items and status.",
        params: { subscription_id: { type: "string", desc: "Subscription id.", required: true } },
        readOnly: true,
      },
      {
        name: "list_payments",
        desc: "Lists recent payment intents with status.",
        params: { customer_id: "Filter to one customer." },
        readOnly: true,
      },
      {
        name: "create_refund",
        desc: "Refunds a charge, fully or partially.",
        params: {
          charge_id: { type: "string", desc: "Charge id.", required: true },
          amount: { type: "number", desc: "Amount in the smallest currency unit." },
        },
      },
    ],
  },
  {
    slug: "hubspot",
    cat: "Sales & Marketing",
    summary:
      "Read and update HubSpot contacts, companies and deals. Use for CRM hygiene and pipeline review.",
    command: npx("@hubspot/mcp-server"),
    auth: "oauth2",
    scopes: ["crm.objects.contacts.read", "crm.objects.deals.read"],
    homepage: "https://hubspot.com",
    tools: [
      {
        name: "search_contacts",
        desc: "Searches contacts by name, email or property.",
        params: { query: { type: "string", desc: "Search text.", required: true } },
        readOnly: true,
      },
      {
        name: "list_deals",
        desc: "Lists deals in a pipeline stage.",
        params: { stage: "Pipeline stage id." },
        readOnly: true,
      },
      {
        name: "update_contact",
        desc: "Updates properties on a contact.",
        params: {
          contact_id: { type: "string", desc: "Contact id.", required: true },
          properties: { type: "object", desc: "Properties to set.", required: true },
        },
      },
    ],
  },

  /* -------------------------------------------------------------- security */
  {
    slug: "snyk",
    cat: "Security",
    summary:
      "Scan dependencies and code for known vulnerabilities. Use before a release or when auditing a project.",
    command: npx("snyk-mcp"),
    auth: "apiKey",
    scopes: ["read"],
    homepage: "https://snyk.io",
    tools: [
      {
        name: "test_dependencies",
        desc: "Scans a manifest for vulnerable dependencies and returns severities.",
        params: { path: "Project path. Defaults to the working directory." },
        readOnly: true,
      },
      {
        name: "list_projects",
        desc: "Lists monitored projects and their issue counts.",
        readOnly: true,
      },
    ],
  },
  {
    slug: "onepassword",
    cat: "Security",
    summary:
      "Read secrets from 1Password vaults by reference, without exposing values in the transcript.",
    command: npx("@1password/mcp-server"),
    auth: "apiKey",
    scopes: ["vault.read"],
    homepage: "https://1password.com",
    tools: [
      {
        name: "list_items",
        desc: "Lists item titles in a vault. Never returns secret values.",
        params: { vault: { type: "string", desc: "Vault name or id.", required: true } },
        readOnly: true,
      },
      {
        name: "resolve_reference",
        desc: "Resolves an op:// secret reference for injection into a process environment.",
        params: {
          reference: { type: "string", desc: "An op:// URI.", required: true },
        },
        readOnly: true,
      },
    ],
  },
];
