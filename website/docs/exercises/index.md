---
sidebar_position: 1
title: "Exercises"
description: "Hands-on practice to reinforce learning"
---

# Exercises

**Hands-on practice to reinforce learning**

---

## Philosophy

DevFoundry exercises are **contextualized** — they appear within the curriculum modules and examples where the concepts are taught. This keeps theory and practice tightly connected.

We believe:
- **Practice immediately after learning** reinforces concepts
- **Context matters** — exercises make more sense next to the material they test
- **Progressive difficulty** — each exercise builds on previous understanding
- **Solutions available** — but try first, check after

---

## Where to Find Exercises

### In Curriculum Modules

Each curriculum module contains exercises integrated into the content:

| Module | Exercises | Focus |
|--------|-----------|-------|
| [Part I, Module 01: What Software Is](/docs/curriculum/part-1-foundations/what-software-is) | 4 exercises | I/O/P model, predicting output, modification, design |
| [Part I, Module 02: Anatomy of Projects](/docs/curriculum/part-1-foundations/anatomy-of-projects) | 5 exercises | Language categories, architecture types, project structure, tool chains |
| [Part I, Module 03: How the Web Works](/docs/curriculum/part-1-foundations/how-the-web-works) | 4 exercises | Network inspection, HTML/CSS/JS, HTTP protocol, dev tools |

**Format**: Exercises appear with collapsible `<details>` tags containing solutions. Try the exercise, then expand to check your work.

---

### In Examples

Each example includes practice exercises in its README:

| Example | Exercises | Focus |
|---------|-----------|-------|
| [Hello World Console](/docs/examples/hello-world-console) | 4 exercises | Modification, parameters, return values, experimentation |
| [Lemonade CLI](/docs/examples/lemonade-cli) | 4 exercises | Menu data, discount logic, input validation, order IDs |
| [Lemonade Static Web](/docs/examples/lemonade-static-web) | 4 exercises | DOM manipulation, localStorage, animations, keyboard navigation |

**Format**: Exercises build on the working code in the example, encouraging experimentation.

---

## Exercise Types

### Type 1: Identify and Analyze

*Read code or a scenario and identify patterns.*

Example: "Identify the Input, Processing, and Output in this program."

**Skills practiced**: Pattern recognition, mental model building

---

### Type 2: Predict Output

*Look at code and predict what will happen before running it.*

Example: "What will this program print?"

**Skills practiced**: Code reading, execution model understanding

---

### Type 3: Modify and Extend

*Take working code and make specific changes.*

Example: "Modify the greeting to include the user's name."

**Skills practiced**: Code modification, experimentation, debugging

---

### Type 4: Design from Scratch

*Given a problem, design a solution.*

Example: "Design a program that converts temperatures. What are the inputs, processing steps, and outputs?"

**Skills practiced**: Problem decomposition, architectural thinking

---

## How to Use Exercises

### Step 1: Read the Context

Understand the concept being taught before attempting the exercise.

### Step 2: Try Without Looking

Attempt the exercise without peeking at the solution. Struggling is part of learning.

### Step 3: Check Your Work

Expand the solution and compare. Note differences — understanding *why* something works differently than expected is valuable.

### Step 4: Experiment Further

Don't stop at the solution. What happens if you change something? What if you combine this with a previous exercise?

---

## Using AI for Exercises

### When Stuck

If you're stuck after genuine effort, use the [debugging prompt template](/docs/prompts/03-debugging):

```
I'm working on Exercise 3 in Module 01 (modifying Hello World).

I tried: [what you tried]
Expected: [what you expected]
Got: [what happened]

What am I missing?
```

### After Completing

Ask AI to extend the exercise:

```
I completed Exercise 3 (adding a name parameter to sayHello).

What's a good next challenge that builds on this?
```

---

## Creating Your Own Exercises

The best exercise is one you create for yourself:

1. **Notice something** in the curriculum or examples
2. **Ask "what if"** — what if I changed X? Added Y?
3. **Try it** — experimentation is the best teacher
4. **Reflect** — what did you learn?

---

## Exercise Index

*Quick reference to all exercises in DevFoundry*

### Part I: Foundations

**Module 01: What Software Is**
1. Identify I/O/P — Analyze a food ordering app
2. Predict Output — What does modified code print?
3. Modify Hello World — Add personalization
4. Design a Program — Temperature converter

**Module 02: Anatomy of Projects**
1. Language Categories — Classify compiled vs interpreted
2. Identify the Architecture — Match apps to architecture types
3. Read a Project Structure — Understand lemonade-cli organization
4. Tool Chain Matching — Match problems to tools
5. Explore a Real Project — Navigate DevFoundry structure

**Module 03: How the Web Works**
1. Observe a Page Load — Use Network tab to analyze requests
2. Build a Minimal Page — Create HTML, CSS, JS files
3. Inspect HTTP Traffic — Examine request/response headers
4. Use Dev Tools — Experiment with Elements and Console

**Example: Hello World Console**
1. Change the greeting message
2. Call the function multiple times
3. Add a parameter for the name
4. Add a return value

**Example: Lemonade CLI**
1. Add a New Menu Item — Add Frozen Lemonade
2. Change the Discount — Modify threshold and percentage
3. Add Input Validation — Improve error messages
4. Add Order Numbering — Generate unique order IDs

**Example: Lemonade Static Web**
1. Add a Remove All Button — Remove entire item from order
2. Persist Order in LocalStorage — Survive page refresh
3. Add Animations — Bounce effect when adding items
4. Add Keyboard Navigation — Arrow keys and Enter

---

## Contributing Exercises

Have a good exercise idea? We welcome contributions:

1. **Match the format** — Follow the pattern of existing exercises
2. **Include solutions** — Use `<details>` tags for collapsible solutions
3. **Test it** — Make sure the exercise is doable and the solution works
4. **Provide context** — Exercises should connect to specific concepts

---

**Remember**: The goal isn't to complete exercises perfectly. It's to build understanding through practice. Mistakes are learning opportunities.
