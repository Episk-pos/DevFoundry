---
sidebar_position: 1
title: "Architecture Decision Records"
description: "Documenting the 'why' behind architectural choices"
---

# Architecture Decision Records (ADRs)

**Documenting the "why" behind architectural choices**

---

## What are ADRs?

**Architecture Decision Records** document important architectural decisions made in a project, along with the context and consequences of those decisions.

Think of them as a project's **architectural memory**:
- Why did we choose React over Vue?
- Why SQLite instead of PostgreSQL?
- Why client-side rendering instead of server-side?

ADRs capture not just *what* was decided, but *why* — including alternatives considered and tradeoffs accepted.

---

## Why ADRs Matter

### For Humans

1. **Onboarding**: New team members understand decisions without asking
2. **Consistency**: Team stays aligned with established patterns
3. **Accountability**: Decisions are explicit and justified
4. **Learning**: Revisit past decisions to understand their outcomes

### For AI Assistants

ADRs are **critical** for LLM-assisted development:

- **Context**: AI understands your architectural constraints
- **Consistency**: AI generates code matching your decisions
- **Guidance**: AI can follow patterns you've established

**Example**:
```
"According to ADR-0001, we use React functional components with hooks.
Please implement the new OrderHistory component following this pattern."
```

**Result**: AI generates code consistent with your architecture.

---

## When to Write an ADR

### Write an ADR when:

✓ **Choosing a framework or library** (React, Express, SQLite)
✓ **Defining architectural patterns** (client/server split, state management)
✓ **Establishing conventions** (naming, file structure, testing strategy)
✓ **Making tradeoffs** (performance vs simplicity, cost vs features)
✓ **Restricting options** ("We will not use X because...")

### Don't write an ADR for:

✗ Implementation details (variable names, minor refactors)
✗ Obvious choices with no alternatives (using Git for version control)
✗ Temporary experiments (can document in comments instead)
✗ Decisions easily reversible without cost

**Rule of thumb**: If changing the decision later would require significant refactoring, write an ADR.

---

## ADR Format

We use a simplified format based on Michael Nygard's template:

```markdown
# [Number]. [Title]

Date: YYYY-MM-DD

## Status

[Proposed | Accepted | Deprecated | Superseded by ADR-XXXX]

## Context

What is the issue we're addressing? What factors are driving this decision?

## Decision

What did we decide to do?

## Consequences

What are the positive and negative outcomes of this decision?
```

See [template](adr/template) for a copy-paste template.

---

## Example ADR

### ADR-0001: Use React for Frontend Framework

**Date**: 2025-11-18

**Status**: Accepted

**Context**:
We need a frontend framework for the devfoundry chat app examples. The curriculum targets beginners learning to work with LLMs. Key requirements:
- Widely used (good documentation, AI training data)
- Component-based (teaches modularity)
- Beginner-accessible (gradual learning curve)
- Modern (reflects current industry practice)

Alternatives considered:
- Vue: Simpler syntax, but less AI training data
- Svelte: Elegant, but smaller ecosystem
- Plain JavaScript: No abstraction, but harder to scale examples

**Decision**:
Use React with functional components and hooks for all SPA (single-page application) examples in devfoundry.

**Consequences**:
- ✓ Positive: Large community, excellent AI assistant support, industry-relevant
- ✓ Positive: Hooks model teaches modern patterns
- ✓ Positive: Easy to find learning resources
- ✗ Negative: JSX syntax adds complexity vs plain JS
- ✗ Negative: Beginners must learn React-specific concepts (state, effects)

---

## ADR Lifecycle

### 1. Proposed
Decision is suggested but not yet accepted. Used for discussion.

### 2. Accepted
Decision is active and should be followed.

### 3. Deprecated
Decision is no longer recommended, but exists in old code.

### 4. Superseded
Decision has been replaced. Link to the new ADR.

**Example**:
```
Status: Superseded by ADR-0008

We originally chose localStorage for persistence (ADR-0004),
but have moved to a SQLite backend (ADR-0008) for better
data integrity.
```

---

## How to Write a Good ADR

### ✅ Good Context Section

**Describes**:
- The problem or need
- Constraints and requirements
- Alternatives considered
- Why this decision is being made now

**Example**:
```
## Context

The chat app fullstack example needs a database for message persistence.
Requirements:
- Must be simple for learners to set up (no separate server)
- Must work locally without internet
- Must demonstrate SQL concepts
- Must be portable (works on all OSes)

Alternatives:
- PostgreSQL: Too complex to set up for beginners
- MongoDB: NoSQL doesn't teach relational concepts
- In-memory: Data lost on restart
```

---

### ✅ Good Decision Section

**Describes**:
- What was chosen
- How it will be implemented
- Any important details

**Example**:
```
## Decision

Use SQLite for the fullstack chat app example.
- Store database in `server/db/chat.db`
- Use `better-sqlite3` npm package (synchronous, simpler API)
- Include setup script to initialize schema
- Document in example README how to inspect database
```

---

### ✅ Good Consequences Section

**Describes**:
- Positive outcomes
- Negative outcomes
- Mitigation strategies (if applicable)

**Example**:
```
## Consequences

Positive:
- Zero-config for learners: database file created automatically
- Portable: entire app + data in one directory
- SQL experience: students learn standard SQL
- Lightweight: no separate database server

Negative:
- Not production-ready: SQLite not ideal for high-concurrency
- File-based: harder to deploy to some platforms
- Synchronous API: doesn't teach async database patterns

Mitigation:
- Clearly document in curriculum that SQLite is for learning
- Provide ADR explaining when to migrate to PostgreSQL/MySQL in production
```

---

## Numbering ADRs

Use sequential numbers with leading zeros:
- `0001-frontend-stack.md`
- `0002-backend-stack.md`
- `0003-diagram-conventions.md`

**Why leading zeros?** Ensures correct file sorting (9 comes before 10).

**Numbering scheme**: Four digits supports up to 9999 ADRs (plenty for most projects).

---

## ADRs in This Repository

This repository uses ADRs to document its own architectural decisions:

| ADR | Title | Purpose |
|-----|-------|---------|
| [0001](adr/frontend-stack) | Frontend Stack | Why React + Vite + TypeScript |
| [0002](adr/backend-stack) | Backend Stack | Why Node + Express + SQLite |
| [0003](adr/diagram-conventions) | Diagram Conventions | Why Mermaid and specific notation |

These ADRs serve dual purposes:
1. **Practical**: Explain devfoundry's architecture
2. **Pedagogical**: Model how to write ADRs

---

## Using ADRs with AI Assistants

### Pattern: Reference ADRs in Prompts

```
"Per ADR-0001, we use React functional components with hooks.

I need a new component for displaying order history. It should:
- Follow our established component patterns
- Use hooks for state management
- Match our naming conventions (PascalCase for components)

Please implement OrderHistory.jsx."
```

### Pattern: Generate ADRs with AI

```
"Help me write an ADR for choosing between localStorage and
cookies for session persistence.

Context:
- SPA with JWT authentication
- Need to persist login state
- Security is important but users are low-risk (chat app example)

Please draft ADR-0005 following the template in adr/template.md."
```

---

## ADRs and Curriculum Learning

### Module 08: Architecture Decision Records

Students learn:
- Why ADRs exist
- How to write them
- How to use them in LLM prompts

### Part III: Building with LLMs

Students write ADRs for their own decisions:
- Why a specific state management approach?
- Why a specific API design?
- Why a specific deployment platform?

**Teaching goal**: Make architectural thinking explicit.

---

## Common ADR Topics

### Frontend

- Framework choice (React, Vue, Svelte, Angular)
- State management (Context, Redux, Zustand)
- Styling approach (CSS modules, Tailwind, styled-components)
- Build tool (Vite, Webpack, Parcel)
- Routing (React Router, TanStack Router)

### Backend

- Language/runtime (Node, Python, Go)
- Framework (Express, Fastify, NestJS)
- Database (PostgreSQL, MySQL, MongoDB, SQLite)
- Authentication (JWT, sessions, OAuth)
- API design (REST, GraphQL, tRPC)

### Architecture

- Monolith vs microservices
- Client-side vs server-side rendering
- Deployment strategy (serverless, containers, VMs)
- Testing strategy (unit, integration, e2e)

### Process

- Git workflow (trunk-based, feature branches)
- Code review process
- Documentation standards
- Versioning scheme

---

## Updating ADRs

### When to Update

**Don't** edit accepted ADRs. Instead:

1. **Create a new ADR** that supersedes the old one
2. **Update the old ADR's status** to "Superseded by ADR-XXXX"
3. **Explain why** in the new ADR's context section

### Example

**ADR-0004** (original):
```
# 0004. Use localStorage for Order Persistence

Status: Superseded by ADR-0008

[Original content remains]
```

**ADR-0008** (new):
```
# 0008. Use SQLite Backend for Order Persistence

Context:
We originally used localStorage (ADR-0004) for simplicity.
However, students asked for a "real" database example to
understand backend persistence.

Decision: Migrate to SQLite backend...
```

---

## ADR Anti-Patterns

### ❌ Too Vague

```
## Decision
Use React because it's popular.
```

**Problem**: No context, no alternatives, no tradeoffs.

### ❌ Too Detailed

```
## Decision
Use React version 18.2.0 with the following ESLint rules:
[50 lines of configuration]
```

**Problem**: ADRs should capture *why*, not *how* in detail.

### ❌ Justifying the Obvious

```
## Decision
We will use Git for version control.
```

**Problem**: Not a real choice — no alternatives worth considering.

---

## Tools and Workflow

### Creating a New ADR

1. Copy `template.md`
2. Rename with next sequential number: `000X-title.md`
3. Fill in sections
4. Submit for review (in team projects)
5. Update status to "Accepted" when finalized

### Reviewing ADRs

Ask:
- Is the context clear?
- Were reasonable alternatives considered?
- Are consequences honest (both positive and negative)?
- Will this help future developers (and AI assistants)?

---

## Further Reading

### External Resources

- **Original ADR concept**: [Michael Nygard's blog post](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- **ADR GitHub organization**: [github.com/joelparkerhenderson/architecture-decision-record](https://github.com/joelparkerhenderson/architecture-decision-record)
- **MADR format**: [Markdown Any Decision Records](https://adr.github.io/madr/)

### devfoundry Resources

- [template](adr/template) — Copy-paste ADR template
- [Architecture First](/docs/mental-models/architecture-first) — Using ADRs with LLMs

---

## Summary

ADRs are **architectural memory**:
- Document important decisions
- Explain context and consequences
- Enable consistency and onboarding
- Supercharge AI-assisted development

**Key insight**: The act of writing an ADR forces clear thinking. Even if no one reads it, the author benefits from articulating the decision.

**Next step**: Browse the ADRs in this repository to see examples, then write your own when making architectural decisions.
