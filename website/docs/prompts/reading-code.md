---
sidebar_position: 5
title: "Reading Code"
description: "Navigate unfamiliar codebases with AI assistance"
---

# Reading and Understanding Code

**Navigate unfamiliar codebases with AI assistance**

---

## Overview

Reading code is a critical skill. Whether you're exploring open source, onboarding to a new project, or understanding devfoundry examples, AI can accelerate your comprehension.

This template is for:
- Understanding what code does
- Learning how systems are structured
- Decoding unfamiliar syntax or patterns
- Building mental models of existing code

**Key insight**: Ask specific questions. "Explain this code" is less effective than "What does this function return and when is it called?"

---

## The Code Reading Template

```
**Context**: [What project/example this is from]

**My Goal**: [Why I'm reading this code]

**What I Understand**: [Parts I already get]

**What I Don't Understand**: [Specific confusions]

**Code**:
[Paste the code]

**Questions**:
1. [Specific question 1]
2. [Specific question 2]
3. [Specific question 3]

Please explain in beginner-friendly terms.
```

---

## Template Deep Dive

### Section 1: Context

**Purpose**: Help AI calibrate explanations

**What to include**:
- Project or example name
- Where the code is from (file path)
- Tech stack if relevant

**Example**:
```
**Context**:
This is from the devfoundry lemonade stand SPA example.
File: src/components/OrderForm.tsx
Tech: React with TypeScript
```

---

### Section 2: My Goal

**Purpose**: Focus the explanation

**Different goals get different explanations**:

| Goal | AI Focus |
|------|----------|
| "Understand the logic" | Step-by-step walkthrough |
| "Learn this pattern" | Pattern explanation + when to use |
| "Modify this code" | Entry points and dependencies |
| "Debug an issue" | Data flow and state changes |

**Example**:
```
**My Goal**:
I want to understand how form validation works so I can add my own validation rules.
```

---

### Section 3: What I Understand

**Purpose**: Avoid redundant explanations

**Example**:
```
**What I Understand**:
- This is a React component that renders a form
- useState creates state variables
- The form has onSubmit handler
```

---

### Section 4: What I Don't Understand

**Purpose**: Focus on your actual confusion

**Good examples**:
- "What does the `...` spread operator do here?"
- "Why is there a function inside the useState call?"
- "When does useEffect run?"

**Bad examples**:
- "I don't understand anything"
- "This is confusing"

---

### Section 5: Specific Questions

**Purpose**: Get targeted answers

**Question types**:
- **What**: "What does this line do?"
- **Why**: "Why is this structured this way?"
- **When**: "When does this function get called?"
- **How**: "How does data flow through this?"
- **What if**: "What happens if I change X?"

---

## Complete Example

### Scenario: Understanding a React Hook

```
**Context**:
devfoundry lemonade SPA, file: src/hooks/useOrders.ts
This is a custom React hook.

**My Goal**:
Understand how custom hooks work so I can create my own.

**What I Understand**:
- Hooks are functions that start with "use"
- useState and useEffect are built-in hooks
- This hook is being used in App.tsx

**What I Don't Understand**:
- Why is state defined inside this function?
- How does the component using this hook get the data?
- What does "returning an object" mean for the hook?

**Code**:
```typescript
import { useState, useEffect } from 'react';
import { Order } from '../types';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const newTotal = orders.reduce(
      (sum, order) => sum + order.price * order.quantity,
      0
    );
    setTotal(newTotal);
  }, [orders]);

  const addOrder = (order: Order) => {
    setOrders(prev => [...prev, order]);
  };

  const removeOrder = (id: string) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  return { orders, total, addOrder, removeOrder };
}
```

**Questions**:
1. Why are `orders` and `total` inside the hook and not in the component?
2. What does `return { orders, total, addOrder, removeOrder }` do?
3. When a component uses this hook, does it get its own copy of the state?
4. What does `[orders]` at the end of useEffect mean?

Please explain in beginner-friendly terms with analogies if helpful.
```

---

## Quick Reading Prompts

### Single Line Explanation

```
What does this line do?

```javascript
const [count, setCount] = useState(0);
```

Explain what each part means.
```

### Function Purpose

```
What does this function do?

[PASTE FUNCTION]

In one sentence, describe:
1. What it takes as input
2. What it does
3. What it returns
```

### Pattern Recognition

```
What pattern is this code using?

[PASTE CODE]

Is this a common pattern? What is it called? When should I use it?
```

### Data Flow

```
Trace the data flow in this code:

[PASTE CODE]

Starting from [INPUT], show me step-by-step how data flows through to [OUTPUT].
```

---

## Reading Strategies

### Strategy 1: Top-Down

**Start with the big picture**:

```
This is a [FILE/MODULE] from [PROJECT].

Before I read the details, please give me:
1. One sentence: What is the purpose of this file?
2. What are the main functions/components?
3. How does it fit into the larger system?

[PASTE CODE or just file path if AI has access]
```

### Strategy 2: Bottom-Up

**Start with specific confusion**:

```
I'm reading [FILE] and I don't understand this part:

[PASTE SPECIFIC SECTION]

What does this do? Then explain how it connects to the rest of the file.
```

### Strategy 3: Trace Execution

**Follow the code path**:

```
In this code:

[PASTE CODE]

Walk me through what happens when:
1. User clicks the submit button
2. What functions are called (in order)
3. How state changes
4. What the user sees
```

---

## Understanding Different Code Types

### React Components

```
**Code**: [PASTE COMPONENT]

**Questions**:
1. What props does this component accept?
2. What state does it manage?
3. What does it render?
4. What events does it handle?
```

### API Routes

```
**Code**: [PASTE ROUTE HANDLER]

**Questions**:
1. What HTTP method and path does this handle?
2. What data does it expect in the request?
3. What does it return?
4. What errors can occur?
```

### Utility Functions

```
**Code**: [PASTE FUNCTION]

**Questions**:
1. What are the inputs (parameters)?
2. What is the output (return value)?
3. What transformation happens?
4. Any edge cases I should know about?
```

### Configuration Files

```
**Code**: [PASTE CONFIG]

**Questions**:
1. What is this configuring?
2. What do the key settings mean?
3. Which settings are important to change?
4. Which should I leave alone?
```

---

## Building Mental Models

### Request: Diagram Generation

```
I'm reading this code:

[PASTE CODE]

Please create a Mermaid diagram showing:
- The main components/functions
- How they connect to each other
- The data flow direction
```

### Request: Analogy

```
I'm trying to understand:

[PASTE CODE or CONCEPT]

Can you explain this using a real-world analogy?
Something like a restaurant, library, or post office would help.
```

### Request: Simplified Version

```
This code is complex:

[PASTE CODE]

Can you show me a simplified version that does the same thing?
Then explain what the extra complexity in the original adds.
```

---

## Navigating Larger Codebases

### Finding Entry Points

```
I'm exploring [PROJECT/REPO].

Where should I start reading to understand:
1. How the app starts up?
2. Where the main logic lives?
3. How data flows through the system?

Key files I see: [LIST MAIN FILES]
```

### Understanding Architecture

```
This project has these directories:
[LIST DIRECTORY STRUCTURE]

Can you explain:
1. What each directory is likely for?
2. Which directories have the core logic?
3. Which are supporting (config, tests, utils)?
```

### Following Imports

```
This file imports from several places:

```javascript
import { useState } from 'react';
import { Order } from '../types';
import { calculateTotal } from '../utils/pricing';
import { useOrders } from '../hooks/useOrders';
```

What does each import bring in?
Which are library imports vs local files?
```

---

## Common Confusing Patterns

### Destructuring

```
I don't understand this syntax:

```javascript
const { name, age, ...rest } = person;
```

What does each part do?
What is `...rest`?
```

### Arrow Functions

```
What's the difference between these:

```javascript
function add(a, b) { return a + b; }
const add = (a, b) => a + b;
const add = (a, b) => { return a + b; };
```

When should I use each form?
```

### Async/Await

```
I'm confused by async code:

```javascript
async function fetchData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  return data;
}
```

What does `async` do?
What does `await` do?
What happens if I remove `await`?
```

### Callbacks and Closures

```
I don't understand why this works:

```javascript
function createCounter() {
  let count = 0;
  return function() {
    count += 1;
    return count;
  };
}
```

How does the inner function access `count`?
What is a closure?
```

---

## Checklist: Before Asking AI to Explain Code

- [ ] Stated what project/file the code is from
- [ ] Explained your goal (why you're reading this)
- [ ] Mentioned what you already understand
- [ ] Listed specific confusions
- [ ] Pasted the relevant code
- [ ] Asked specific questions (not just "explain this")

---

## Related Templates

- [Getting Started](getting-started) — First steps with AI assistants
- [Debugging](debugging) — When code you're reading has bugs
- [Designing Features](designing-features) — After understanding, planning new features

---

## Summary

**Effective code reading prompts**:

1. ✓ Provide context (project, file, tech)
2. ✓ State your goal (why you're reading)
3. ✓ Share what you understand already
4. ✓ Identify specific confusions
5. ✓ Ask targeted questions
6. ✓ Request appropriate format (explanation, diagram, analogy)

**Remember**: Reading code is a skill that improves with practice. Use AI to accelerate learning, but also spend time reading without help to build pattern recognition.

---

**Found confusing code?** Use the template above to get clarity!
