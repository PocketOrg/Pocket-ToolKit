# Canvas — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_courses`

Lists courses the token can reach.

Read-only — safe to call without confirmation.

Takes no parameters.

## `list_assignments`

Lists assignments in a course.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `courseId` | string | yes | Course id. |

## `list_submissions`

Lists submissions for an assignment.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `courseId` | string | yes | Course id. |
| `assignmentId` | string | yes | Assignment id. |

## `get_course_content`

Reads a course's pages and modules.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `courseId` | string | yes | Course id. |
