# Getting Started with AI Coding Assistants

**Your first prompts: what to know, what to try**

---

## Introduction

AI coding assistants (Claude, ChatGPT, GitHub Copilot, Cursor, etc.) are powerful tools for learning and building software. But they work best when you guide them with **clear, contextual prompts**.

This guide helps you:
- Understand what AI assistants can and can't do
- Write your first effective prompts
- Avoid common beginner mistakes
- Build confidence in AI-assisted learning

---

## What AI Assistants Are Good At

✓ **Explaining concepts** in beginner-friendly terms
✓ **Generating boilerplate code** following patterns you specify
✓ **Debugging** when you provide context and symptoms
✓ **Suggesting implementations** based on requirements
✓ **Refactoring code** to improve clarity or structure
✓ **Creating diagrams** (like Mermaid syntax)
✓ **Answering "why"** questions about code or architecture

---

## What AI Assistants Struggle With

✗ **Guessing your intent** when prompts are vague
✗ **Remembering your project** without context in each prompt
✗ **Magic fixes** when the problem isn't clearly described
✗ **Choosing architecture** without knowing your constraints
✗ **Reading your mind** about style, conventions, or requirements

**Key insight**: AI assistants are **autocomplete for systems**, not magic. Give them structure, and they'll amplify your thinking.

---

## Your First Prompt: Understanding Code

### Template

```
I'm learning programming with the devfoundry curriculum.
I'm looking at [EXAMPLE NAME] (examples/[PATH]).

Here's the code:
[PASTE CODE]

Questions:
1. [SPECIFIC QUESTION 1]
2. [SPECIFIC QUESTION 2]
3. [SPECIFIC QUESTION 3]

Please explain in beginner-friendly terms with examples.
```

### Example (Filled In)

```
I'm learning programming with the devfoundry curriculum.
I'm looking at the "Hello World" example (examples/00-hello-world-console).

Here's the code:
```javascript
function sayHello() {
  console.log("Hello, World!");
}

sayHello();
```

Questions:
1. What does `function` mean?
2. Why do we need parentheses after `sayHello`?
3. What happens if I remove the line `sayHello();`?

Please explain in beginner-friendly terms with examples.
```

---

## Your Second Prompt: Modifying Code

### Template

```
I'm working on [EXAMPLE NAME] from devfoundry.

Current code:
[PASTE CODE]

I want to modify it to:
- [CHANGE 1]
- [CHANGE 2]

Please show me how to modify [FILENAME] to do this.
Explain what changes you made and why.
```

### Example (Filled In)

```
I'm working on the "Hello World" example from devfoundry.

Current code:
```javascript
function sayHello() {
  console.log("Hello, World!");
}

sayHello();
```

I want to modify it to:
- Accept a name as a parameter
- Print "Hello, [name]!" instead of "Hello, World!"
- Call it twice with different names

Please show me how to modify hello.js to do this.
Explain what changes you made and why.
```

---

## Your Third Prompt: Explaining Errors

### Template

```
I'm running [EXAMPLE NAME] and getting an error.

Code:
[PASTE CODE]

Command I ran:
[COMMAND]

Error message:
[PASTE ERROR]

What does this error mean and how do I fix it?
```

### Example (Filled In)

```
I'm running the Hello World example and getting an error.

Code:
```javascript
function sayHello() {
  console.log("Hello, World!");
}
```

Command I ran:
node hello.js

Error message:
(nothing prints)

What does this error mean and how do I fix it?
```

---

## Prompt Principles for Beginners

### 1. Be Specific

❌ **Vague**: "How do I make a website?"
✅ **Specific**: "How do I create an HTML file that displays 'Hello, World!' in a browser?"

### 2. Provide Context

❌ **No context**: "Why isn't this working?"
✅ **With context**: "I'm following the devfoundry tutorial. This code should print 'Hello' but nothing appears. Here's what I tried..."

### 3. Ask One Thing at a Time

❌ **Too broad**: "Explain JavaScript"
✅ **Focused**: "What does the `function` keyword do in JavaScript?"

### 4. Show Your Work

❌ **No attempt**: "Write me a program"
✅ **Show effort**: "I tried this code [paste], but it doesn't work. I expected [X] but got [Y]."

---

## Common Beginner Mistakes

### Mistake 1: Vague Requests

❌ "Build me an app"

**Problem**: AI doesn't know what kind, what features, what tech stack.

✅ "I'm following the lemonade stand example. Show me how to add a 'Clear Order' button that resets the order list."

---

### Mistake 2: No Code Provided

❌ "My function doesn't work"

**Problem**: AI can't see what you're doing.

✅ "Here's my function: [paste code]. Expected output: [X]. Actual output: [Y]. What's wrong?"

---

### Mistake 3: Asking for Magic

❌ "Make this faster"

**Problem**: AI doesn't know what "this" is or what "faster" means.

✅ "This function processes 1000 items and takes 5 seconds. Here's the code: [paste]. How can I optimize it?"

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

Can you explain how to pass data from a parent component to a child component?
Use a simple example (like a greeting component that takes a name).
```

---

### Exploring Code

```
I'm reading [FILE] from the [EXAMPLE NAME] example.

Code:
[PASTE SNIPPET]

Questions:
1. What does line [X] do?
2. Why is [THING] necessary?
3. What would happen if I changed [Y] to [Z]?
```

**Example**:
```
I'm reading App.jsx from the lemonade stand SPA example.

Code:
```jsx
const [orders, setOrders] = useState([]);
```

Questions:
1. What does `useState` do?
2. Why is there an empty array `[]`?
3. What would happen if I changed `[]` to `null`?
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
3. How can I undo it if it doesn't work?
```

**Example**:
```
I want to experiment with the Hello World example.

Current behavior: Prints "Hello, World!" once

I want to try: Print it 10 times using a loop

Questions:
1. Will this break anything?
2. What should I expect to happen?
3. How do I write a loop in JavaScript?
```

---

## Building Confidence

### Start Small

Don't ask AI to build entire apps. Ask for:
- Explanations of single concepts
- Modifications to existing code
- Help with specific errors

**Goal**: Understand every line of code the AI generates.

---

### Iterate

First attempt might not be perfect. That's OK!

**Pattern**:
1. Ask for something
2. Try it
3. Ask follow-up questions
4. Refine until you understand

**Example iteration**:
```
Prompt 1: "Show me how to add a parameter to sayHello"
[AI responds]

Prompt 2: "I tried that, but I want to use two parameters (first name and last name)"
[AI responds]

Prompt 3: "How do I handle the case where last name is optional?"
[AI responds]
```

---

### Ask "Why"

Don't just accept code. Ask why it works.

❌ Copy-paste AI code without understanding
✅ "Why did you use `const` instead of `let`?"
✅ "Why is this function defined inside the component?"
✅ "What's the purpose of this line?"

---

## Graduated Prompting Examples

As you progress through devfoundry, your prompts will evolve:

### Week 1: Total Beginner

```
"What does the `console.log()` function do?
Show me a simple example."
```

### Week 4: Understanding Basics

```
"In the lemonade CLI example, there's a function called `calculateTotal`.
It uses `reduce`. What does `reduce` do?
Can you show me step-by-step what happens with this data: [...] ?"
```

### Week 8: Building with Context

```
"I'm building a lemonade stand SPA (React, see devfoundry examples/03).

Current structure:
- App.jsx (state: {orders, total})
- OrderForm.jsx (user input)

I want to add validation: quantity must be > 0.

Where should validation happen? In the form or in App?
Show me how to implement it."
```

### Week 12: Architecture-First

```
"Per devfoundry's lemonade fullstack example, I have:
- React frontend (client/)
- Express backend (server/)

I want to add user accounts.

In the allocation view:
- Where should password hashing happen (client or server)?
- Where should session tokens be stored?

In the module view:
- What new files/routes do I need?

Please provide an architectural plan before showing code."
```

---

## When to Ask for Help

### Good times to use AI:

✓ **Explaining unfamiliar syntax** you encountered
✓ **Debugging specific errors** with error messages
✓ **Understanding concepts** from the curriculum
✓ **Brainstorming approaches** before implementing
✓ **Reviewing your code** for issues

### Times to struggle first:

⚠ **Exercises** — Try yourself before asking
⚠ **Design decisions** — Think through tradeoffs first
⚠ **Debugging** — Check obvious things (typos, file paths) first

**Balance**: Use AI to accelerate learning, not replace thinking.

---

## Next Steps

### Practice These Prompts

1. Pick an example from devfoundry
2. Use the "Understanding Code" template
3. Ask 3 specific questions
4. Try the AI's answers
5. Ask follow-up questions

### Move to Advanced Templates

Once comfortable:
- [02-architecture-first.md](02-architecture-first.md) — Building features
- [03-debugging.md](03-debugging.md) — Systematic debugging
- [04-reading-code.md](04-reading-code.md) — Understanding larger codebases

---

## Summary

**Effective AI-assisted learning**:

1. ✓ Be specific and provide context
2. ✓ Show your code and what you tried
3. ✓ Ask one thing at a time
4. ✓ Iterate and refine
5. ✓ Always ask "why"
6. ✓ Understand every line of generated code

**Remember**: AI assistants are **learning partners**, not replacements for thinking. Use them to amplify your understanding, not bypass it.

---

**Ready to start?** Open your AI assistant and try the "Understanding Code" template with the Hello World example!
