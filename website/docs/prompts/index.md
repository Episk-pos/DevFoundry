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
| [Getting Started](getting-started) | First-time AI assistant usage | Starting your journey |
| [Architecture First](architecture-first) | Building features | Adding functionality |
| [Debugging](debugging) | Fixing issues | Something doesn't work |
| [Reading Code](reading-code) | Understanding unfamiliar code | Exploring codebases |
| [Designing Features](designing-features) | Planning before coding | Starting a new feature |
| [Iterative Refinement](iterative-refinement) | Improving existing code | Refactoring, optimizing |
| [Build vs. Borrow](build-vs-borrow) | Evaluating whether to use existing solutions | New project setup, feature planning |

### Product Architecture Pack

For product-level decisions, use the [Product Architecture](product-architecture/) prompt pack:

| Template | Purpose | When to Use |
|----------|---------|-------------|
| [Discovering Loops](product-architecture/discovering-loops) | Find your minimal user loop | Starting a product, reassessing direction |
| [Onboarding from Loop](product-architecture/onboarding-from-loop) | Design first-time experience | Building signup/onboarding flows |
| [UX from Loop](product-architecture/ux-from-loop) | Ground interface decisions | Making UI/UX choices |
| [Backend from Loop](product-architecture/backend-from-loop) | Design APIs and data models | Architecting server-side |
| [Infrastructure from Loop](product-architecture/infra-from-loop) | Deployment and operations | Setting up infrastructure |

These prompts help you apply the [Minimal User Loop](../mental-models/minimal-user-loop) mental model to product design.

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
- `[YOUR SYSTEM]` → "chat app SPA" (single-page application)
- `[TECH STACK]` → "React + Vite"
- `[FILE PATH]` → "src/components/MessageInput.jsx"

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
"I'm building a chat app SPA with React.

Current architecture:
- App.jsx holds state: {messages: [], currentUser: 'You'}
- MessageInput.jsx for composing messages
- MessageList.jsx displays messages

I need to add a message reactions feature that..."
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

**Scenario**: Add message reactions to chat app

**Template**: [Architecture First](prompts/architecture-first)

**Filled-in prompt**:
```
**Context**:
I'm building a chat app (React SPA, see devfoundry examples/03-chat-spa).

**Current architecture** (Component-Connector View):
MessageInput → App state → MessageList → display

**Files**:
- src/App.jsx (holds state)
- src/utils/messages.js (contains formatMessage)

**Task**:
Add emoji reactions to messages (thumbs up, heart, laugh)

**Requirements**:
- Pure function in messages.js: addReaction(messageId, reactionType)
- Called from MessageList when user clicks reaction button
- Display reaction counts below each message

Please implement.
```

---

### Example 2: Debugging

**Scenario**: Timestamp shows "Invalid Date"

**Filled-in prompt**:
```
**Context**:
Chat app, React SPA. Message formatting in src/utils/messages.js.

**Problem**:
Timestamps show "Invalid Date" instead of formatted time.

**Code**:
[paste formatTimestamp function]

**Expected behavior**:
Should display time like "10:30 AM".

**Actual behavior**:
Returns "Invalid Date"

**Sample input**:
message = {sender: "Alice", content: "Hello!", timestamp: "2024-01-15T10:30:00Z"}

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
- Build the chat app progressively (Architecture First)
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
