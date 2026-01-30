# Agent Prompt: Add "Questioning Before Commands" Coaching

Background
Learners are CLI-anxious and may run commands without understanding them.
Add a short coaching block to normalize pausing and to model safer
questioning before running commands.

Project Context
DevFoundry is a docs-first curriculum for novice builders, many of whom are
Windows-first and uncomfortable with the terminal. Canonical docs live in
`website/docs/` and ship via Docusaurus. The current reorg emphasizes
better scaffolding, navigation clarity, and explicit coaching on safe AI
use and high-quality questions.

Purpose
You are a coding agent. Add a short coaching block as described, without
touching other content.

Scope
- `website/docs/curriculum/part-1-foundations/terminal-basics.md`

What to change
1) Insert a short subsection near the "Common Questions" area, or just
   before "Going Further" if that section exists.
2) The subsection must include:
   - A reminder to pause before running commands you do not understand.
   - A 3-step checklist: goal, target, reversibility.
   - A single example AI prompt for clarifying a command safely.

Constraints
- Keep it concise; avoid long code blocks.
- ASCII only.

Acceptance Criteria
- The new subsection is visible without altering unrelated sections.
- Includes the three checklist items and one example prompt.

Deliverable
- Provide the exact inserted text and placement location.
