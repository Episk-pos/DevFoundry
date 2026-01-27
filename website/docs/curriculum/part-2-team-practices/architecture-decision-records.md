---
sidebar_position: 4
title: "Architecture Decision Records"
description: "Documenting the 'why' behind technical decisions"
---

# Module 10: Architecture Decision Records

**Documenting the "why" behind technical decisions — for your team, your future self, and AI assistants**

---

## Learning Objectives

By the end of this module, you will:

- Understand why documenting decisions matters
- Know the ADR format and when to use it
- Write clear, useful ADRs
- Use ADRs to improve AI-assisted development
- Maintain ADRs as projects evolve
- Recognize decision-worthy moments

**Time**: 2-3 hours (reading + exercises)

---

## Introduction

Code tells you **what** the system does. Comments (sometimes) tell you **how**.

But neither tells you **why**.

Why did we choose React over Vue? Why is the database SQLite instead of PostgreSQL? Why does the API use REST instead of GraphQL?

These decisions shaped your entire codebase. Yet most projects leave them undocumented, living only in the memories of developers who might leave.

**Architecture Decision Records (ADRs)** capture the why. They're short documents recording significant technical decisions, their context, and their consequences.

---

## Part 1: Why Document Decisions?

### The Knowledge Problem

Every codebase accumulates decisions:
- Technology choices
- Architectural patterns
- Conventions and standards
- Trade-offs accepted

Without documentation, new team members (or future you) encounter code and think:

> "Why is it done this way? Is this intentional or accidental? Can I change it?"

### The Cost of Lost Context

**Scenario 1: Repeating debates**
- Team argues about X in 2024
- Decides on approach A for good reasons
- Nobody documents why
- New developer joins in 2025
- "Why don't we just do X differently?"
- Same debate repeats

**Scenario 2: Breaking unknown constraints**
- System uses pattern Y
- Looks suboptimal
- Developer "improves" it
- Breaks because Y existed for subtle reasons
- Hours of debugging

**Scenario 3: AI assistance fails**
- AI assistant sees the code
- Doesn't understand constraints
- Suggests changes that violate unwritten rules
- Creates inconsistency

### What ADRs Provide

1. **Institutional memory** — Decisions survive team changes
2. **Onboarding acceleration** — New members understand quickly
3. **Debate prevention** — Documented decisions don't need re-arguing
4. **Change confidence** — Know what's safe to modify
5. **AI context** — Assistants understand the "why"

---

## Part 2: The ADR Format

### Core Structure

An ADR answers four questions:

1. **What** is the decision? (title)
2. **Why** now? (context)
3. **What** did we decide? (decision)
4. **What** follows? (consequences)

### The Template

```markdown
# [Number]. [Title]

**Date**: YYYY-MM-DD
**Status**: Proposed | Accepted | Deprecated | Superseded by [ADR-XXX]

## Context

What is the issue that we're seeing that is motivating this decision or change?
What forces are at play (technical, political, social)?
What constraints exist?

## Decision

What is the change that we're proposing and/or doing?
State the decision in full sentences, with active voice.
"We will use X" not "X was chosen."

## Consequences

What becomes easier or harder to do because of this change?
Include both positive and negative consequences.
Be honest about trade-offs.
```

### Real Example: DevFoundry ADR

From this project's own ADRs:

```markdown
# 1. Use React, Vite, and TypeScript for Frontend Examples

**Date**: 2024-12-21
**Status**: Accepted

## Context

DevFoundry teaches web development through progressive examples.
We need to choose a frontend stack for curriculum examples.

Key considerations:
- AI assistants work better with widely-used technologies
- Students should learn industry-relevant skills
- Build tooling should be fast and simple
- Type safety helps catch errors early

## Decision

We will use:
- **React 18+** with functional components and hooks
- **Vite** as the build tool
- **TypeScript** with gradual adoption (strict mode for new code)

## Consequences

**Positive:**
- React has the largest ecosystem and AI training data
- Vite provides fast HMR and simple configuration
- TypeScript catches errors before runtime
- Skills transfer directly to industry

**Negative:**
- React's abstraction may obscure DOM fundamentals
- TypeScript adds initial learning curve
- Students must understand build tooling
- More setup than plain HTML/JS
```

---

## Part 3: When to Write an ADR

### Decision-Worthy Moments

Write an ADR when:

1. **Choosing technologies** — Languages, frameworks, libraries, databases
2. **Defining patterns** — How components communicate, state management approach
3. **Setting conventions** — File structure, naming, error handling
4. **Making trade-offs** — Performance vs simplicity, DRY vs clarity
5. **Changing direction** — Migrating from X to Y, deprecating approaches

### The "Significant" Test

Ask: "Will someone wonder why we did this in 6 months?"

If yes → write an ADR.

### When NOT to Write an ADR

- Trivial decisions (variable naming, minor refactors)
- Standard practices (everyone uses .gitignore)
- Temporary spikes (exploratory code that will be rewritten)
- Implementation details (how a function works internally)

### Examples

**Write an ADR:**
- "We use PostgreSQL instead of MongoDB"
- "API endpoints follow REST conventions"
- "State management uses React Context, not Redux"
- "We don't use class components"

**Don't write an ADR:**
- "We named the variable `userCount`"
- "We added a `.gitignore` file"
- "We refactored `calculateTotal` for readability"

---

## Part 4: Writing Effective ADRs

### Context: Set the Stage

Bad context:
> "We need a database."

Good context:
> "Our chat application needs to persist messages between sessions. We expect low traffic (< 100 messages/day) during the learning phase, with potential growth if the app succeeds. The development team is one person with limited DevOps experience. We want to minimize infrastructure complexity while maintaining the option to scale later."

**Include:**
- What problem prompted this decision?
- What constraints exist?
- What options were considered?
- What factors matter most?

### Decision: Be Clear and Active

Bad decision:
> "SQLite was selected."

Good decision:
> "We will use SQLite as our primary database, accessed via the `better-sqlite3` npm package. Data will be stored in a `data/chat.db` file in the project root."

**Use active voice. Be specific. State what you will do, not what was done.**

### Consequences: Be Honest

Bad consequences:
> "This is the best choice."

Good consequences:
> "**Positive:**
> - Zero configuration — works out of the box
> - Single file — easy to backup, version, reset
> - Fast for read-heavy workloads
> - No separate server process
>
> **Negative:**
> - Single writer — won't scale for high concurrent writes
> - Migration to PostgreSQL will require code changes
> - No built-in replication or backup
>
> **Neutral:**
> - We accept these limitations for the learning phase
> - We'll revisit if the app reaches production scale"

**Every decision has trade-offs. Document them.**

---

## Part 5: ADRs and AI Assistants

### The AI Context Problem

AI assistants are powerful but contextless. They see:
- Your code
- Your immediate question
- Generic best practices

They don't see:
- Why you made past decisions
- Your team's constraints
- Your project's specific goals
- What you explicitly chose NOT to do

### How ADRs Help

When you reference ADRs in prompts:

```
I'm adding a new feature to persist user preferences.

Our project uses SQLite (see ADR-0002) because we prioritized
simplicity over scalability.

Given this context, how should I structure the preferences table?
```

The AI now understands:
- SQLite is intentional, not accidental
- Simplicity is valued
- It shouldn't suggest PostgreSQL migration

### ADR-First Prompting

Include relevant ADRs when asking AI for help with:

**New features:**
```
We're adding [feature]. Relevant ADRs:
- ADR-001: We use React with hooks
- ADR-003: We follow REST conventions

How should we implement this?
```

**Architecture questions:**
```
I'm considering [change]. Current architecture per ADR-002:
[paste relevant section]

What are the implications of changing to [alternative]?
```

**Code review:**
```
Review this code for consistency with our conventions:
- ADR-001: TypeScript with strict mode
- ADR-004: Error handling uses custom Result type

[paste code]
```

### Teaching AI Your Project

Create a "project context" document that references ADRs:

```markdown
# Project Context for AI Assistants

## Overview
Chat App — learning project for web development

## Key Decisions
- Frontend: React + Vite + TypeScript (ADR-001)
- Backend: Node.js + Express + SQLite (ADR-002)
- Diagrams: Mermaid with specific conventions (ADR-003)

## Conventions
- Functional components only (no classes)
- State in hooks (useState, useReducer)
- API routes under /api
```

Reference this in complex prompts.

---

## Part 6: Maintaining ADRs

### ADRs Are Immutable (Mostly)

Once accepted, don't edit the core decision. ADRs are historical records.

If a decision changes:
1. Create a new ADR
2. Mark the old one as "Superseded by ADR-XXX"
3. The new ADR references the old one

### Status Lifecycle

```
Proposed → Accepted → [Deprecated | Superseded]
```

**Proposed**: Under discussion, not yet decided
**Accepted**: Decision is in effect
**Deprecated**: No longer relevant (tech removed)
**Superseded**: Replaced by a newer ADR

### Example: Superseding an ADR

Original ADR-002:
```markdown
# 2. Use SQLite for Database

**Status**: Superseded by ADR-007
...
```

New ADR-007:
```markdown
# 7. Migrate from SQLite to PostgreSQL

**Date**: 2025-06-15
**Status**: Accepted

## Context

ADR-002 established SQLite as our database for simplicity
during the learning phase.

We've now reached production scale with:
- 10,000+ daily messages
- Multiple server instances needed
- Concurrent write conflicts occurring

SQLite's single-writer limitation is now causing issues.

## Decision

We will migrate from SQLite to PostgreSQL.
[details...]

## Consequences

[details...]
```

### Where to Store ADRs

Common locations:
- `/adr` or `/docs/adr` directory in repo
- Numbered files: `0001-use-react.md`, `0002-backend-stack.md`
- Version controlled alongside code

This project uses `/adr` with sequential numbering.

---

## Part 7: ADRs for Solo Developers

### "But I'm the Only Developer"

You still need ADRs. Here's why:

**Future you is a different person.** In 6 months, you won't remember why you chose X over Y.

**AI assistants need context.** Even solo, you're collaborating with AI.

**Projects outlive assumptions.** You might add collaborators, hand off the project, or return after a break.

### Lightweight Solo ADRs

You don't need formal process. Just capture:

1. What you decided
2. Why (even briefly)
3. What you traded off

```markdown
# 3. Use Tailwind Instead of Plain CSS

**Date**: 2024-12-28
**Status**: Accepted

## Context

Styling the chat UI. Options: plain CSS, CSS modules,
Tailwind, styled-components.

I want fast iteration and AI can generate Tailwind effectively.

## Decision

Use Tailwind CSS with default config.

## Consequences

- Faster UI development
- Larger HTML class attributes
- Must learn Tailwind utilities
```

Takes 5 minutes. Saves hours later.

---

## Exercise 1: Write Your First ADR

Write an ADR for a decision in a project you're working on (or hypothetically for the chat app).

Pick something like:
- Why you chose your CSS approach
- Why you structured folders a certain way
- Why you use (or don't use) TypeScript

Use the template from Part 2.

<details>
<summary>Example: CSS Approach</summary>

```markdown
# 4. Use CSS Modules for Component Styling

**Date**: 2025-01-01
**Status**: Accepted

## Context

The chat app React frontend needs component styling.
Options considered:
- Global CSS: Simple but naming conflicts at scale
- CSS Modules: Scoped styles, standard tooling
- Tailwind: Utility-first, verbose HTML
- CSS-in-JS: Full power, runtime cost

Team is small (1-2 people). Project is learning-focused.
Want scoped styles without runtime overhead.

## Decision

We will use CSS Modules (`.module.css` files) for all
component styling. Each component has a co-located style file.

Example:
```
MenuItem/
  MenuItem.tsx
  MenuItem.module.css
```

## Consequences

**Positive:**
- Styles are scoped automatically (no naming conflicts)
- Standard CSS syntax (no new learning)
- No runtime cost (compiled away)
- Co-located with components

**Negative:**
- Verbose imports (`styles.className`)
- Can't share styles easily (need separate shared file)
- Less powerful than CSS-in-JS

**Accepted:**
We accept these trade-offs for simplicity in a learning project.
```

</details>

---

## Exercise 2: Evaluate an Existing Decision

Look at a decision in an existing project (yours or open source).

Without an ADR, try to answer:
1. Why was this choice made?
2. What alternatives existed?
3. What trade-offs were accepted?

How long did it take? What couldn't you determine?

Now write the ADR that should have existed.

---

## Exercise 3: Supersede an ADR

Imagine the chat app has grown. SQLite is hitting limits.

Write ADR-007 that supersedes the SQLite decision (ADR-002) with a migration to PostgreSQL.

Include:
- Why the original decision no longer fits
- The new decision
- Migration considerations in consequences

<details>
<summary>Example Solution</summary>

```markdown
# 7. Migrate to PostgreSQL for Production Scale

**Date**: 2025-06-15
**Status**: Accepted

## Context

ADR-002 established SQLite for database simplicity.
This was appropriate for learning and early development.

Current situation:
- 15,000 messages per day
- 3 server instances behind load balancer
- SQLite write locks causing 500 errors during peak hours
- Need for better backup/replication

SQLite served us well, but we've outgrown it.

## Decision

We will migrate from SQLite to PostgreSQL.

Implementation:
- Use `pg` npm package for connections
- Deploy managed PostgreSQL (Railway/Render/AWS RDS)
- Migrate data using custom script
- Update all database access code
- Keep SQLite for local development option

## Consequences

**Positive:**
- Concurrent writes work correctly
- Horizontal scaling possible
- Built-in replication and backup
- Better tooling for production monitoring

**Negative:**
- Infrastructure complexity increases
- New failure mode (database server down)
- Connection pooling needed
- Cost increases (~$15-50/month)

**Migration risks:**
- Data migration must be tested thoroughly
- Brief downtime during cutover
- Rollback plan needed

**Accepted:**
Cost and complexity are justified by reliability needs.
```

</details>

---

## Exercise 4: ADR-Informed AI Prompting

Take an ADR (real or from exercises) and practice using it in AI prompts.

1. Write a prompt asking for help that **doesn't** include ADR context
2. Write the same prompt **with** ADR context
3. Compare how the responses might differ

<details>
<summary>Example</summary>

**Without context:**
```
How should I add user authentication to my Node.js app?
```
*AI might suggest: Passport.js, JWT, sessions, OAuth, Auth0, Firebase Auth...*

**With context:**
```
I need to add user authentication to my chat app.

Relevant ADRs:
- ADR-002: We use SQLite for simplicity, running single instance
- ADR-001: React frontend, Express backend
- This is a learning project, not production-critical

We want the simplest auth that:
- Lets users create accounts
- Persists between sessions
- Doesn't require external services

What approach do you recommend?
```
*AI can now suggest: Simple session-based auth with SQLite user table, bcrypt for passwords, express-session for sessions. No OAuth complexity needed for this use case.*

</details>

---

## Key Takeaways

1. **Code shows what, ADRs show why** — Both are necessary documentation

2. **Decisions deserve documentation** — If someone will wonder why, write it down

3. **ADRs are immutable history** — Supersede, don't edit

4. **Context is everything** — Include constraints, alternatives, and trade-offs

5. **ADRs help AI** — Assistants need the "why" to give relevant advice

6. **Solo developers benefit too** — Future you is a different person

---

## What's Next

**Congratulations!** You've completed Part II: How Teams Build Software.

You now understand:
- How to design before coding (UX/UI)
- How to organize work (Methodologies)
- How to collaborate on code (Git)
- How to document decisions (ADRs)

**Continue with Part III: Building Complete Applications**

- **[Stage 1: Static Website](../part-3-building-applications/static-website)** — HTML, CSS, and vanilla JavaScript

---

## Vocabulary

| Term | Definition |
|------|------------|
| **ADR** | Architecture Decision Record — document capturing a significant technical decision |
| **Context** | The circumstances and constraints that motivate a decision |
| **Consequences** | The outcomes (positive and negative) of a decision |
| **Superseded** | An ADR replaced by a newer decision |
| **Deprecated** | An ADR no longer relevant (technology removed) |
| **Institutional memory** | Organizational knowledge that survives personnel changes |

---

## Further Reading

### Internal Resources

- [This Project's ADRs](../../adr) — Real examples from DevFoundry
- [ADR Template](../../adr/template) — Template used in this project

### External Resources

- [Michael Nygard's Original Post](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) — Where ADRs started
- [ADR GitHub Organization](https://adr.github.io/) — Community resources
- [Documenting Architecture Decisions](https://www.thoughtworks.com/radar/techniques/lightweight-architecture-decision-records) — ThoughtWorks radar entry

---

## Reflection

Before moving on, ensure you can:

- [ ] Explain why documenting decisions matters
- [ ] Identify decision-worthy moments
- [ ] Write an ADR with context, decision, and consequences
- [ ] Use ADRs to provide context to AI assistants
- [ ] Understand how to supersede outdated decisions
- [ ] See ADRs as communication tools, not bureaucracy

---

**You've completed Module 10 and all of Part II!** You now have the mental models and practices that separate hobbyist coding from professional software development. These skills — design thinking, iterative process, version control, and documented decisions — will serve you whether you're building alone or with a team.
