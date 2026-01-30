# Agent Prompt: Align Beginner Start Points

Background
Two onboarding pages give different starting points for total beginners
(Module 00 vs Module 01). This confuses novices. Align both pages to a
single start without rewriting the content.

Project Context
DevFoundry is a learning-oriented docs repo for people new to software,
often Windows-first and CLI-anxious. Canonical docs live in `website/docs/`
and are deployed with Docusaurus. The broader request is a docs reorg to
make onboarding clearer, improve progression, and reinforce question-asking
and safe AI usage without adding new features.

Purpose
You are a coding agent. Resolve the inconsistency on where total beginners
start. Keep edits minimal.

Scope
- `website/docs/overview.md`
- `website/docs/how-to-use-this-repo.md`

What to change
1) Choose a single starting module for total beginners (Module 00 or Module 01).
2) Update only the minimum text in each file so both pages agree.
3) Do not alter other guidance or structure.

Constraints
- Preserve tone and intent.
- ASCII only.

Acceptance Criteria
- Both files explicitly point beginners to the same module.
- No other wording changes outside the conflicting lines.

Deliverable
- State which starting module you aligned to and list the exact lines updated.
