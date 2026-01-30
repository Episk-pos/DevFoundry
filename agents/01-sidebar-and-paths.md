# Agent Prompt: Restore Curriculum Nav + Fix Example Paths

Background
The docs site is Docusaurus-based. The curriculum content exists under
`website/docs/curriculum/` but Parts II-IV are missing from the sidebar,
making them invisible. The onboarding doc also lists outdated example
folder names. This task restores discoverability and fixes path accuracy.

Project Context
DevFoundry is a learning-focused documentation repo for novice and early-
intermediate learners, many of whom are Windows-first and CLI-anxious.
The canonical docs live in `website/docs/` and are deployed via Docusaurus.
GitHub-level docs and folders often act as stubs or summaries. The broader
request is a docs reorg/refactor to improve navigation, consistency, and
learning progression, while reinforcing high-quality question asking and
safe AI usage.

Purpose
You are a coding agent. Apply the changes exactly as described. Do not add
new content beyond what is requested. Keep edits minimal and localized.

Scope
- `website/sidebars.ts`
- `website/docs/how-to-use-this-repo.md`

References
- Existing curriculum files:
  - `website/docs/curriculum/part-2-team-practices/*`
  - `website/docs/curriculum/part-3-building-applications/*`
  - `website/docs/curriculum/part-4-historical-context/*`
- Existing sidebar structure in `website/sidebars.ts` (Curriculum category).
- Actual example folders under `examples/`.

What to change
1) `website/sidebars.ts`
   - Under the "Curriculum" category, insert Part II, Part III, and Part IV.
   - Use the exact file paths that exist in `website/docs/curriculum/...`.
   - Preserve ordering: Part I, Part II, Part III, Part IV, Part V.
   - Keep labels and collapse behavior consistent with Part I and Part V.
2) `website/docs/how-to-use-this-repo.md`
   - Find the directory tree or list that shows `examples/*`.
   - Update outdated entries like `examples/01-chat-cli` to actual folders
     (for example: `examples/11-chat-cli`, `examples/13-chat-cli-typescript`).
   - Only touch the directory list. Do not change surrounding prose.

Constraints
- ASCII only.
- No reformatting or unrelated cleanup.
- Do not invent new paths.

Acceptance Criteria
- Parts II-IV appear in the sidebar between Part I and Part V.
- All example paths in the directory list match real folders.

Deliverable
- Provide a short summary of edits and exact file paths changed.
