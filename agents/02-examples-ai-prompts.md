# Agent Prompt: Add AI Prompt Coaching to Chat CLI Example

Background
The Chat CLI example is a key early learning artifact, but it lacks
explicit guidance on forming high-quality questions. This addition should
teach novices how to ask specific questions and point them to the canonical
"Reading Code" prompt template.

Project Context
DevFoundry is a documentation-first learning repo aimed at novices and
early-intermediate builders, often Windows-first and uncomfortable with
terminals. Canonical docs live in `website/docs/` for Docusaurus. The
current reorg focuses on navigation clarity, scaffolding, and explicit
question-asking coaching, not adding new features or code.

Purpose
You are a coding agent. Implement the exact change below in the specified
file only. Keep edits minimal and localized.

Scope
- `website/docs/examples/chat-cli/index.md`

What to change
1) Insert a new section immediately after the "Key Concepts" section.
   - Heading: "Ask Better Questions (Use AI as a Guide)"
2) The section must include:
   - 2 to 3 short, TUI-friendly example prompts.
   - Prompts must reference specific files in this example (use real paths
     in this example, such as `src/messages.js` and `src/index.js`).
   - A single sentence that links to `/docs/prompts/reading-code`.

Constraints
- Keep tone beginner-friendly and concrete.
- No heavy formatting or long blocks.
- Do not change any other content.

Acceptance Criteria
- New section appears directly after "Key Concepts".
- Prompts mention real file paths from this example.
- Includes a link to `/docs/prompts/reading-code`.

Deliverable
- Provide a short summary and the exact insertion point.
