---
sidebar_position: 6
title: "Designing Features"
description: "Plan architecture with AI before writing implementation"
---

# Designing Features Before Coding

**Plan architecture with AI before writing implementation**

---

## Overview

The best code comes from good design. Before jumping into implementation, use AI to think through architecture, tradeoffs, and approach.

This template is for:
- Planning new features before coding
- Evaluating different approaches
- Anticipating edge cases and issues
- Creating ADRs (Architecture Decision Records)

**Key insight**: 10 minutes of design saves hours of refactoring.

---

## The Feature Design Template

```
**Context**: [System description]

**Feature Goal**: [What you want to build]

**Users**: [Who will use this and how]

**Constraints**: [Technical and business limitations]

**Questions**:
1. What are the different approaches to implement this?
2. What are the tradeoffs of each approach?
3. What edge cases should I consider?
4. What's your recommended approach and why?

Don't write code yet — help me design the solution first.
```

---

## Template Deep Dive

### Section 1: Context

**Purpose**: Ground the design in your system

**What to include**:
- Current system architecture
- Tech stack
- Relevant existing code/patterns

**Example**:
```
**Context**:
Lemonade stand fullstack app (devfoundry examples/04).
- React frontend (Vite, TypeScript)
- Express backend (Node.js)
- SQLite database
- No authentication currently
```

---

### Section 2: Feature Goal

**Purpose**: Define what success looks like

**Good feature goals**:
- "Users can save their favorite orders for quick reordering"
- "Orders persist across browser sessions"
- "Admin can view all orders from all users"

**Bad feature goals**:
- "Make it better"
- "Add database stuff"
- "User feature"

---

### Section 3: Users

**Purpose**: Design for actual usage

**What to include**:
- Who uses the feature
- What they're trying to accomplish
- How often they'll use it
- Their technical level

**Example**:
```
**Users**:
- Customers ordering lemonade (daily use)
- They want to quickly reorder their "usual"
- Non-technical, expect simple UI
- Mobile and desktop users
```

---

### Section 4: Constraints

**Purpose**: Define the boundaries

**Types of constraints**:
- **Technical**: Must work with existing stack, performance requirements
- **Time**: MVP vs full feature
- **Resources**: Storage limits, API rate limits
- **Business**: Compliance, accessibility, compatibility

**Example**:
```
**Constraints**:
- Must work with SQLite (not switching to Postgres)
- No additional npm packages without good reason
- Must load favorites in < 500ms
- Should work offline (PWA planned for future)
```

---

## Complete Example

### Scenario: Design User Favorites Feature

```
**Context**:
Lemonade stand fullstack app (devfoundry examples/04).
- React frontend with useState for state management
- Express backend with REST API
- SQLite database with orders table
- No user authentication currently

**Feature Goal**:
Users can save their favorite orders and quickly reorder them.

**Users**:
- Regular customers who order the same thing often
- Want one-click reordering
- Use both mobile and desktop
- Non-technical — need simple, obvious UI

**Constraints**:
- No user accounts yet (identify by device/browser for MVP)
- Must work with current SQLite setup
- Keep UI simple (1-2 new buttons max)
- Should feel instant (< 200ms response)

**Questions**:
1. What are the different approaches to implement favorites without user auth?
2. What are the tradeoffs of storing favorites client-side vs server-side?
3. What edge cases should I consider? (device switching, clearing browser data, etc.)
4. What's your recommended approach and why?

Don't write code yet — help me design the solution first.
```

---

## Design-First Prompts

### Approach Comparison

```
I want to implement [FEATURE].

I see two approaches:
A) [APPROACH A]
B) [APPROACH B]

For each approach, explain:
1. How it would work
2. Pros
3. Cons
4. When to choose it

My constraints: [CONSTRAINTS]

Which approach fits my situation better?
```

### Edge Case Discovery

```
I'm designing [FEATURE].

Here's my planned approach:
[DESCRIBE APPROACH]

What edge cases should I consider?
Think about:
- Error states
- Empty states
- Boundary conditions
- Concurrent usage
- Data integrity
```

### Scope Definition

```
I want to build [FEATURE].

Full vision: [EVERYTHING YOU WANT]

Help me define:
1. MVP (minimum to be useful)
2. V1 (solid first version)
3. Future enhancements (nice to have)

What should be in each phase?
```

### Architecture Diagram

```
I'm planning [FEATURE] for my [SYSTEM].

Current architecture:
[DESCRIBE OR DIAGRAM]

Create a Mermaid diagram showing:
1. New components needed
2. How they connect to existing system
3. Data flow for the main use case
```

---

## Designing for Different Concerns

### Data Design

```
I need to store [DATA] for [FEATURE].

Current database: [DESCRIBE TABLES]

Questions:
1. What new tables/columns do I need?
2. What relationships to existing data?
3. What indexes for performance?
4. How to handle data migration?
```

### API Design

```
I need API endpoints for [FEATURE].

Existing endpoints: [LIST OR DESCRIBE]

Questions:
1. What new endpoints do I need?
2. What HTTP methods and paths?
3. What request/response formats?
4. How to handle errors?
5. Any authentication needed?
```

### UI/UX Design

```
I need UI for [FEATURE].

Current UI: [DESCRIBE SCREENS]

Questions:
1. Where does this feature fit in the UI?
2. What new components are needed?
3. What's the user flow?
4. How to handle loading/error states?
5. Mobile considerations?
```

### State Management

```
I'm adding [FEATURE] to my React app.

Current state: [DESCRIBE STATE SHAPE]

Questions:
1. What new state do I need?
2. Where should it live (component, context, custom hook)?
3. How does it interact with existing state?
4. What actions/updates are needed?
```

---

## Creating ADRs with AI

### ADR Generation Prompt

```
I've decided to implement [FEATURE] using [APPROACH].

Help me write an ADR (Architecture Decision Record) with:

**Title**: [Short description of decision]

**Status**: Proposed

**Context**: Why we need this, what problem we're solving

**Decision**: What we're doing and key details

**Consequences**:
- Positive outcomes
- Negative outcomes (tradeoffs)
- Risks and mitigations

Use the devfoundry ADR format (see adr/template.md).
```

### ADR Review Prompt

```
Here's my draft ADR:

[PASTE ADR]

Review it for:
1. Is the context clear enough for someone new?
2. Does the decision section have enough detail?
3. Are consequences balanced (pros AND cons)?
4. What am I missing?
```

---

## Design Patterns

### When to Use What

```
I'm building [FEATURE] in [TECH STACK].

Should I use:
- [PATTERN A] or [PATTERN B]?

My situation:
- [RELEVANT DETAILS]

When is each pattern appropriate?
Which fits my case?
```

### Pattern Explanation

```
I keep seeing [PATTERN NAME] in codebases.

Examples I've seen:
[PASTE EXAMPLES]

Help me understand:
1. What problem does this pattern solve?
2. When should I use it?
3. When should I NOT use it?
4. How would I apply it to [MY SITUATION]?
```

---

## Thinking Through Tradeoffs

### Tradeoff Matrix

```
I'm choosing between:
A) [OPTION A]
B) [OPTION B]
C) [OPTION C]

Create a comparison table with:
- Implementation complexity
- Performance
- Maintainability
- Flexibility for future changes
- Learning curve

My priorities (ranked):
1. [FIRST PRIORITY]
2. [SECOND PRIORITY]
3. [THIRD PRIORITY]

Which option fits my priorities?
```

### "What Could Go Wrong"

```
I'm planning to implement:
[DESCRIBE APPROACH]

Play devil's advocate:
1. What could go wrong?
2. What's the worst-case scenario?
3. What assumptions am I making that might be wrong?
4. How would I know if this approach is failing?
```

---

## From Design to Implementation

### Breaking Down the Work

```
I've decided to build [FEATURE] using [APPROACH].

Break this into implementation steps:
1. What do I build first? (foundation)
2. What depends on what?
3. What can I test at each step?
4. What's a reasonable order?

Keep steps small (< 1 hour each ideally).
```

### Defining Done

```
For [FEATURE], help me define "done":

**Must have** (required for launch):
- [LIST]

**Should have** (expected but can ship without):
- [LIST]

**Nice to have** (future enhancement):
- [LIST]

**How to verify** (testing approach):
- [LIST]
```

---

## Common Mistakes

### Mistake 1: Jumping to Code

❌ "Write me a favorites feature"
✅ "Help me design a favorites feature before I implement it"

---

### Mistake 2: Vague Requirements

❌ "I want to add user stuff"
✅ "I want users to save their favorite orders for quick reordering"

---

### Mistake 3: Ignoring Constraints

❌ "What's the best way to do X?"
✅ "What's the best way to do X given my constraints: [list them]"

---

### Mistake 4: Not Considering Alternatives

❌ "I'm going to use Redux. How do I implement it?"
✅ "Should I use Redux, Context, or Zustand for my use case? Compare them."

---

## Checklist: Before Implementing

- [ ] Defined clear feature goal
- [ ] Identified who uses it and how
- [ ] Listed technical constraints
- [ ] Considered multiple approaches
- [ ] Evaluated tradeoffs
- [ ] Identified edge cases
- [ ] Chose approach with rationale
- [ ] Broke work into steps
- [ ] Defined what "done" looks like

---

## Related Templates

- [Architecture-First Prompting](architecture-first) — Implementing with architectural context
- [Reading Code](reading-code) — Understanding existing code before adding to it
- [Iterative Refinement](iterative-refinement) — Improving after initial implementation

---

## Summary

**Effective feature design prompts**:

1. ✓ Describe system context
2. ✓ Define clear feature goal
3. ✓ Identify users and their needs
4. ✓ State constraints explicitly
5. ✓ Ask for multiple approaches
6. ✓ Request tradeoff analysis
7. ✓ Consider edge cases
8. ✓ Get recommendation with rationale

**Remember**: Design is thinking. Use AI to think through problems before coding. The goal is a clear plan you understand, not just code to copy.

---

**Planning a feature?** Use the template above to design before you build!
