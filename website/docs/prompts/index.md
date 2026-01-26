---
sidebar_position: 1
title: "LLM Prompt Templates"
description: "Effective patterns for working with AI coding assistants"
---

# LLM Prompt Templates

**Effective patterns for working with AI coding assistants**

---

## Overview

This directory contains **prompt templates** for working with AI assistants (Claude, ChatGPT, GitHub Copilot, Cursor, etc.) throughout the devfoundry curriculum.

**Key insight**: AI assistants work best when you provide **architecture-first context** — not just "make this work," but "here's my system, here's where this fits."

---

## Available Templates

| Template | Purpose | When to Use |
|----------|---------|-------------|
| [Getting Started](prompts/getting-started) | First-time AI assistant usage | Starting your journey |
| [Architecture First](prompts/architecture-first) | Building features | Adding functionality |
| [Debugging](prompts/debugging) | Fixing issues | Something doesn't work |
| [Reading Code](prompts/reading-code) | Understanding unfamiliar code | Exploring codebases |
| [Designing Features](prompts/designing-features) | Planning before coding | Starting a new feature |
| [Iterative Refinement](prompts/iterative-refinement) | Improving existing code | Refactoring, optimizing |
| [Build vs. Borrow](prompts/build-vs-borrow) | Evaluating whether to use existing solutions | New project setup, feature planning |

---

## How to Use These Templates

### Step 1: Choose the Right Template

Match your goal to the template:
- Need to build something? → Architecture First
- Something broken? → Debugging
- Don't understand code? → Reading Code

### Step 2: Read the Guidance

Each template includes:
- **When to use it**
- **What context to provide**
- **Common mistakes to avoid**
- **Example filled-in prompts**

### Step 3: Fill in the Placeholders

Templates use `[PLACEHOLDERS]` for you to replace:
- `[YOUR SYSTEM]` → "lemonade stand SPA" (single-page application)
- `[TECH STACK]` → "React + Vite"
- `[FILE PATH]` → "src/components/OrderForm.jsx"

### Step 4: Iterate

First prompt rarely perfect. Use the AI's response to refine your next prompt.

---

## Core Principles

### 1. Context is King

❌ **Bad**:
```
"Add a shopping cart"
```

✅ **Good**:
```
"I'm building a lemonade stand SPA with React.

Current architecture:
- App.jsx holds state: {orders: [], total: 0}
- OrderForm.jsx for user input
- OrderList.jsx displays orders

I need to add a shopping cart feature that..."
```

### 2. Specify the View

Use architectural views:

- **Module view**: "Which file should contain...?"
- **Component-connector view**: "Show the data flow when..."
- **Allocation view**: "Where should this run (client/server)?"

### 3. Provide Constraints

- **Tech stack**: "Using React functional components, no class components"
- **Style**: "Follow existing naming convention (camelCase)"
- **Requirements**: "Must work offline", "Must be under 100 lines"

### 4. Reference Your Code

Don't assume AI knows your project:
- Paste relevant snippets
- Describe your structure
- Link to ADRs if applicable

---

## Template Philosophy

These templates follow **Flow-Based Development** principles:
1. Understand the flow (input → processing → output)
2. Design the architecture (components, connections)
3. Implement with clarity

See [Architecture First](/docs/mental-models/architecture-first) for the full philosophy.

---

## Examples in Context

### Example 1: Building a Feature

**Scenario**: Add discount logic to lemonade stand

**Template**: [Architecture First](prompts/architecture-first)

**Filled-in prompt**:
```
**Context**:
I'm building a lemonade stand app (React SPA, see devfoundry examples/03-lemonade-spa).

**Current architecture** (Component-Connector View):
OrderForm → App state → calculateTotal → display

**Files**:
- src/App.jsx (holds state)
- src/utils/pricing.js (contains calculateTotal)

**Task**:
Add 10% discount when order total > $50

**Requirements**:
- Pure function in pricing.js: calculateDiscount(subtotal)
- Called from App.jsx after calculateTotal
- Display discount and final total separately

Please implement.
```

---

### Example 2: Debugging

**Scenario**: Total price shows NaN

**Filled-in prompt**:
```
**Context**:
Lemonade stand app, React SPA. Pricing logic in src/utils/pricing.js.

**Problem**:
Total shows "NaN" instead of calculated price.

**Code**:
[paste calculateTotal function]

**Expected behavior**:
Should sum (price * quantity) for all order items.

**Actual behavior**:
Returns NaN

**Sample input**:
orders = [{item: "Lemonade", price: 2.50, quantity: 3}, ...]

What's wrong and how do I fix it?
```

---

## Common Mistakes

### Mistake 1: Too Vague

❌ "Fix my code"
✅ "In OrderForm.jsx, validation isn't working. Here's the code..."

### Mistake 2: No Context

❌ "Add authentication"
✅ "This is a React SPA with Express backend. I need JWT authentication. Where should token storage happen (client vs server)?"

### Mistake 3: Assuming AI Remembers

Long conversations lose context. Re-state key points in each prompt.

✅ "(Reminder: Using React hooks, no Redux) I need to add..."

---

## Advanced: ADR-Driven Prompting

If your project has ADRs (see [ADRs](/docs/adr)), reference them:

```
"According to ADR-0001, we use React functional components.

I need to implement [feature]. Please follow our established patterns."
```

**Why this works**: ADRs codify decisions. AI can follow them consistently.

---

## Prompt Cheat Sheet

| Goal | Key Context to Provide |
|------|------------------------|
| Build a feature | Architecture, tech stack, file structure, data flow |
| Fix a bug | Expected vs actual behavior, relevant code, input/output |
| Understand code | What you know, what you don't know, specific questions |
| Design something | Requirements, constraints, alternatives considered |
| Refactor code | Current structure, desired structure, why refactoring |

---

## Learning Path Integration

### Part I: Foundations

Use templates to:
- Understand example code (Reading Code)
- Experiment with modifications (Iterative Refinement)

### Part II: Team Practices

Use templates to:
- Draft ADRs (Designing Features)
- Plan git workflows

### Part III: Building with LLMs

Use templates to:
- Build the lemonade stand progressively (Architecture First)
- Debug issues (Debugging)
- Refine implementations (Iterative Refinement)

---

## Contributing

Have a prompt pattern that works well? Submit a PR with:
- Template file (numbered, following existing format)
- Example filled-in prompts
- When to use it
- Common pitfalls

---

## Quick Start

**New to AI assistants?** Start here:
👉 [Getting Started](prompts/getting-started)

**Building something?** Use this:
👉 [Architecture First](prompts/architecture-first)

**Something broken?** Use this:
👉 [Debugging](prompts/debugging)
