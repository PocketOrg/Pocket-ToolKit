# Canvas

Read Canvas courses, assignments and submissions. Use for teaching and learning administration where Canvas is the LMS.

- **Category** — Research & Knowledge
- **Transport** — stdio
- **Auth** — apiKey (read)
- **Type** — Connector (MCP server: callable tools)

## What this is

A [Pocket Connector](https://usepocket.net/connectors): an MCP server exposing
tools an agent can call. A Connector provides *capability*; a Skill provides the
*knowledge* of how to use it well. Many are best installed as a pair.

## Tools

- `list_courses` — Lists courses the token can reach.
- `list_assignments` — Lists assignments in a course.
- `list_submissions` — Lists submissions for an assignment.
- `get_course_content` — Reads a course's pages and modules.

See [TOOLS.md](./TOOLS.md) for parameters.

## Icon

`icon.svg` is this connector's official mark **in full brand colour**, rendered on
its marketplace card. It comes from [Simple Icons](https://simpleicons.org), which
publishes brand SVGs and their official hex colours under CC0.

Trademarks belong to their respective owners. A mark here indicates the service
this connector talks to, not endorsement by it.

## Install

Pocket runs the server for you. To run it directly:

```bash
npx -y canvas-mcp-server
```

Requires a Canvas API token and your institution's Canvas URL. Student data is personal data; scope the token narrowly.
