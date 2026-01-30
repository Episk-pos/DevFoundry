# Agent Prompt: Add TUI-Specific Guidance to Reading Code

Background
This doc targets AI prompting, but it assumes a chat UI. Add a short
TUI-focused subsection so Windows-first learners using a terminal-based
assistant know how to ask questions safely and precisely.

Project Context
DevFoundry is a documentation-driven learning repo for novices and early
intermediate builders, many of whom are Windows-first and unfamiliar with
CLI tools. Canonical docs live in `website/docs/` and are deployed via
Docusaurus. The broader request is a docs reorg to improve navigation,
reduce drift, and embed better question-asking and safe AI usage.

Purpose
You are a coding agent. Add a small TUI-focused subsection in the specified
file only.

Scope
- `website/docs/prompts/reading-code.md`

What to change
1) Add a short subsection explaining how to ask questions when using a
   terminal-based AI tool (TUI).
2) Emphasize using file paths and small snippets rather than pasting
   entire files.
3) Provide a minimal example prompt that references a file path.

Constraints
- Keep it concise and beginner-friendly.
- Do not remove or reorder existing content.

Acceptance Criteria
- New subsection exists and includes a file-path example.
- No other content is changed.

Deliverable
- Provide the exact inserted text and where it was placed.
