# Agent Prompt: Add Canonical Links to Standalone Stubs

Background
The repo has GitHub-facing docs and stubs that are not always linked to
their canonical Docusaurus pages. This causes drift and confusion.
Your job is to add a single canonical-link line near the top of each file.

Project Context
DevFoundry's canonical docs live in `website/docs/` and are deployed via
Docusaurus. GitHub-level docs (e.g., `docs/`, `prompts/`, `adr/`,
`community/`) may be summaries or standalone references. The current effort
is a docs reorg to reduce redundancy, align stubs to canonical pages, and
improve discoverability for novice learners.

Purpose
You are a coding agent. Add canonical links exactly as described. Keep edits
minimal and localized.

Scope
- `docs/chat-app-trajectory.md`
- `prompts/07-build-vs-borrow.md`
- `adr/README.md`
- `community/README.md`

What to change
For each file, insert a single line near the top:
- Format: "Canonical page: <URL>"
- If no canonical page exists, use: "Canonical page: (missing)" and add a
  short parenthetical target path, e.g. "(suggest /docs/...)".

Guidance
- Prefer Docusaurus URLs when known (e.g., `https://dev.episkopos.community/docs/...`).
- If you cannot locate a canonical page in `website/docs/`, mark as missing.

Constraints
- Keep style consistent with the existing file (usually after the title).
- Do not add any other content or reformatting.

Acceptance Criteria
- Each listed file has exactly one canonical link line near the top.

Deliverable
- List each file and the canonical link line you added.
