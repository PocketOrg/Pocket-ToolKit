# Moodle — tools

Reference for every tool this connector exposes. Agents choose a tool by reading
its description, so each one states precisely what it does.

## `list_courses`

Lists courses.

Read-only — safe to call without confirmation.

Takes no parameters.

## `get_course_contents`

Reads a course's sections and activities.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `courseId` | string | yes | Course id. |

## `list_grades`

Lists grade items for a course.

Read-only — safe to call without confirmation.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `courseId` | string | yes | Course id. |
