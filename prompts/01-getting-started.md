# Getting Started with AI Coding Assistants

**Your first prompts: what to know, what to try**

---

## Introduction

AI coding assistants are powerful tools for learning and building software. But not all AI tools are equal — and the way you use them matters.

This guide helps you:
- Understand the difference between chat-based and terminal-based AI tools
- Write effective prompts for AI-assisted development
- Leverage tools that can see your code, run commands, and view screenshots
- Build confidence in AI-assisted learning

---

## Types of AI Coding Tools

### Chat-Based Tools

Traditional AI interfaces (ChatGPT web, Claude.ai) where you:
- Copy-paste code into a text box
- Manually describe your project
- Copy-paste responses back into your editor

These work, but require constant context-switching and manual work.

### Terminal/TUI-Based Tools

Modern development tools (Claude Code, Codex CLI, OpenCode, Cursor, Aider) that:
- **Read your files directly** — No copy-pasting needed
- **Run commands** — Execute tests, builds, and scripts
- **View screenshots** — See UI errors, design issues, terminal output
- **Make edits** — Modify files with your approval
- **Understand your project** — See package.json, directory structure, git history

**DevFoundry recommends TUI-based tools** because they match how developers actually work: in the terminal, with full project context.

---

## Why Terminal-Based Tools Are Better for Learning

### No Context Loss

Chat-based:
```
"Here's my function... [copy 50 lines]... and here's the file that imports it... [copy 30 more lines]..."
```

Terminal-based:
```
"Look at src/order.ts — why is calculateTotal returning undefined?"
```

The tool already sees your code. You describe the *problem*, not the *context*.

### Immediate Feedback

Chat-based:
```
1. AI suggests a fix
2. You copy it to your editor
3. You run the code
4. It fails
5. You copy the error back to chat
6. Repeat...
```

Terminal-based:
```
1. AI suggests a fix and applies it
2. AI runs the code
3. AI sees the error and iterates
4. You approve the working solution
```

### Visual Debugging

Terminal-based tools can view screenshots. This enables:
- "Here's a screenshot of the UI — why is the button in the wrong place?"
- "This error dialog appeared — what does it mean?"
- "The layout looks broken on mobile — here's what I see"

---

## Setting Up a TUI Tool

### Claude Code

```bash
# Install
npm install -g @anthropic-ai/claude-code

# Run in your project directory
cd my-project
claude
```

### Codex CLI

```bash
# Install
npm install -g @openai/codex

# Run
codex
```

### Basic Usage

Once running, you interact conversationally:

```
You: What files are in this project?

Claude: I can see the following structure:
├── src/
│   ├── index.ts
│   ├── menu.ts
│   └── order.ts
├── package.json
└── tsconfig.json

Would you like me to explain any of these files?
```

---

## Your First Prompt: Understanding Code

### With a TUI Tool

```
I'm learning programming with the devfoundry curriculum.
I'm looking at the lemonade-cli example.

Can you read src/order.ts and explain:
1. What does calculateTotal do?
2. Why does it use reduce?
3. What would happen if items was empty?

Please explain in beginner-friendly terms.
```

The tool reads the file directly — no pasting needed.

### With a Chat Tool (Fallback)

If you're using a chat-based tool, you'll need to provide context:

```
I'm learning programming with the devfoundry curriculum.
Here's code from the lemonade-cli example (src/order.ts):

[paste the code]

Questions:
1. What does calculateTotal do?
...
```

---

## Your Second Prompt: Modifying Code

### With a TUI Tool

```
I want to modify the lemonade-cli to add a new menu item:
- "Frozen Lemonade" for $3.25

Please:
1. Show me where menu items are defined
2. Add the new item
3. Run the app to verify it works
```

The tool will:
- Find the menu data
- Show you the change before making it
- Apply the edit (with your approval)
- Run `npm start` to verify

### With a Chat Tool (Fallback)

```
Here's my menu.ts file:
[paste code]

I want to add "Frozen Lemonade" for $3.25.
Show me the updated code.
```

Then you manually copy the result back.

---

## Debugging with Screenshots

One of the most powerful features of TUI tools is screenshot input.

### Example: UI Bug

```
The order summary isn't displaying correctly.
[attach screenshot of broken UI]

Here's what it should look like:
[attach screenshot of expected UI or describe it]

Can you find and fix the CSS issue?
```

### Example: Error Dialog

```
I'm getting this error when I click the submit button:
[attach screenshot of error]

What's causing this and how do I fix it?
```

### Example: Terminal Error

```
The build is failing with this error:
[attach screenshot of terminal output]

What's wrong?
```

---

## What AI Assistants Are Good At

✓ **Explaining concepts** in beginner-friendly terms
✓ **Generating boilerplate code** following patterns in your project
✓ **Debugging** when they can see your code and errors
✓ **Refactoring** while maintaining your existing patterns
✓ **Running tests** and fixing failures iteratively
✓ **Reading documentation** and applying it to your code

---

## What AI Assistants Struggle With

✗ **Guessing your intent** when prompts are vague
✗ **Choosing architecture** without knowing your constraints
✗ **Making decisions** that depend on business context you haven't shared
✗ **Knowing your preferences** for style, naming, etc.

**Key insight**: AI assistants are **collaborators**, not oracles. They work *with* your project context, not in isolation.

---

## Common Beginner Mistakes

### Mistake 1: Being Too Vague

❌ "Fix my code"

**Problem**: Which code? What's broken? What should it do?

✅ "The calculateTotal function in src/order.ts is returning NaN. Can you find out why?"

---

### Mistake 2: Providing No Context (Chat Tools)

❌ "My function doesn't work"

**Problem**: Chat tools can't see your code.

✅ "Here's my function: [paste code]. Expected output: X. Actual output: Y."

With TUI tools, this isn't an issue — they can see your files.

---

### Mistake 3: Asking for Magic

❌ "Make this faster"

**Problem**: Faster how? What's the current performance? What's acceptable?

✅ "This function processes 1000 items and takes 5 seconds. Can you profile it and suggest optimizations?"

---

## Effective Prompts for Learning

### Understanding a Concept

```
I'm learning about [CONCEPT] in the devfoundry curriculum.

I understand that [WHAT I KNOW].

I don't understand [WHAT I DON'T KNOW].

Can you explain [SPECIFIC QUESTION] with a simple example?
```

**Example**:
```
I'm learning about React components in the devfoundry curriculum.

I understand that components are reusable UI pieces.

I don't understand how props work.

Can you show me in the lemonade-react example how data flows
from App.tsx to the MenuItem component?
```

---

### Exploring a File

```
Can you read [FILE] and explain:
1. What is this file's responsibility?
2. What are the main functions/components?
3. How does it connect to other files?
```

**Example**:
```
Can you read src/order.ts from the lemonade-cli-typescript example
and explain:
1. What is this file's responsibility?
2. What are the main functions?
3. How does it use the types from types.ts?
```

---

### Experimenting Safely

```
I want to experiment with [EXAMPLE NAME].

Current behavior: [DESCRIBE]

I want to try: [CHANGE]

Questions:
1. Will this break anything?
2. What should I expect to happen?
3. Can you make the change so I can test it?
```

---

## Iteration and Conversation

Good AI-assisted development is conversational:

```
You: Why is the discount not applying in calculateTotal?

AI: Looking at order.ts... The discount logic checks if subtotal >= 10,
    but I see subtotal is calculated after the discount check.
    Would you like me to fix the order of operations?

You: Yes, and add a test to make sure it works.

AI: I'll fix the function and create a test file. Here's what I'm changing...
    [shows diff]
    Should I apply this?

You: Yes.

AI: Done. Running the tests now... All passing.
```

This flow is natural with TUI tools — impossible with copy-paste chat.

---

## Graduated Prompting Examples

As you progress through devfoundry, your prompts evolve:

### Week 1: Total Beginner

```
"What does the console.log() function do?
Show me a simple example in a new file."
```

### Week 4: Understanding Basics

```
"In the lemonade-cli example, can you read src/order.ts?
I don't understand what reduce does.
Walk me through it step-by-step with the actual data from menu.ts."
```

### Week 8: Building Features

```
"I want to add input validation to the lemonade-cli:
- Quantity must be a positive number
- Item ID must exist in the menu

Where should this validation happen?
Can you implement it and show me how to test it?"
```

### Week 12: Architecture-First

```
"I'm planning to add user accounts to the lemonade fullstack example.

Before we write code, can you:
1. Read the current project structure
2. Propose where auth logic should live
3. Identify what new files we need
4. Consider security implications

Then we'll implement it together."
```

---

## When to Ask for Help

### Good times to use AI:

✓ **Explaining unfamiliar syntax** you encountered
✓ **Debugging specific errors** — especially with screenshots
✓ **Understanding concepts** from the curriculum
✓ **Brainstorming approaches** before implementing
✓ **Reviewing your code** for issues
✓ **Running and testing** changes iteratively

### Times to struggle first:

⚠ **Exercises** — Try yourself before asking (that's how you learn)
⚠ **Design decisions** — Think through tradeoffs first
⚠ **Simple debugging** — Check obvious things (typos, file paths) first

**Balance**: Use AI to accelerate learning, not replace thinking.

---

## Best Practices

### 1. Let the Tool See Your Project

Start the TUI tool in your project root. Let it understand your structure.

### 2. Be Specific About Goals

Not "fix this" but "make this function return X when given Y."

### 3. Ask for Explanations

Don't just accept code changes. Ask:
- "Why did you use const instead of let?"
- "What does this line do?"
- "What would happen if I removed this?"

### 4. Review Before Approving

TUI tools show you changes before applying them. Read the diffs. Understand what's changing.

### 5. Use Screenshots for Visual Problems

UI issues, error dialogs, terminal output — a picture is worth a thousand words of description.

---

## Summary

| Aspect | Chat Tools | TUI Tools |
|--------|------------|-----------|
| Code access | Copy-paste | Direct file access |
| Running commands | Manual | Automatic |
| Visual input | Describe in words | Screenshots |
| Iteration speed | Slow (copy-paste loop) | Fast (approve and run) |
| Context | Provide each time | Persistent project context |

**For DevFoundry learners**: Start with a TUI tool if possible. The experience is dramatically better, especially when learning.

---

## Quick Reference

### Starting a Session

```
cd my-project
claude  # or codex, or your tool of choice
```

### Understanding Code

```
Read [file] and explain [specific question]
```

### Making Changes

```
I want to [change]. Can you implement it and run the tests?
```

### Debugging

```
[describe problem or attach screenshot]
What's causing this?
```

### Learning

```
I don't understand [concept].
Show me an example in [file] from this project.
```

---

*The best prompts give AI context and ask specific questions. With TUI tools, the context is automatic — you just need to ask.*
