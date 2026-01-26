---
sidebar_position: 7
title: Build vs. Borrow
description: Evaluating whether to use existing solutions
---

# Build vs. Borrow Prompt

**Evaluating whether to use existing solutions**

---

## Overview

One of the most expensive mistakes in software engineering is building "scratch" implementations of solved problems. This prompt helps you leverage AI to perform a "Build vs. Borrow" analysis, ensuring you only build what actually differentiates your product.

**Key insight**: Asking an AI to "survey the landscape" is often more effective than manual Google/npm searches because models have ingested thousands of comparison articles and documentation sites.

---

## The Prompt Template

Copy and paste this into your AI assistant (Claude, Gemini, ChatGPT):

```markdown
I need to implement [SPECIFIC FEATURE/PROBLEM] for a [PROJECT CONTEXT, e.g., React Web App, Python CLI].

Please act as a Senior Technical Architect and help me conduct a "Build vs. Borrow" analysis.

### 1. The "Borrow" Landscape
Identify the industry-standard libraries or services for this problem in the [LANGUAGE/ECOSYSTEM] ecosystem.
Select the top 3 candidates based on **community adoption (downloads/stars)**, **recent maintenance activity**, and **relevance to my project constraints**.
For these candidates, please analyze:
- **Maturity**: Community usage, maintenance status.
- **Cost**: Bundle size, performance overhead, or financial cost (if SaaS).
- **Fit**: How well it matches my specific needs.

### 2. The "Build" Analysis
If I were to build this from scratch:
- What is the "Iceberg" complexity? (Hidden edge cases, security risks, maintenance burden).
- What is the estimated time to build a production-grade version (not just a prototype)?
- Is this problem unique to my domain, or is it a generic utility?

### 3. Strategic Recommendation
Based on the above, what do you recommend?
- **Borrow**: If high-quality solutions exist and this is not a core differentiator.
- **Build**: Only if existing solutions are critically flawed for my use case or this is core IP.

Please format the output as a decision matrix or pros/cons list.
```

---

## When to Use

- **New Feature Request**: When asked to add a calendar, auth, rich text editor, etc.
- **Refactoring**: When replacing a buggy custom implementation.
- **Architecture Planning**: When defining the stack for a new project.

---

## Example Scenario

**Goal**: Adding drag-and-drop to a React app.

**Filled-in Prompt**:

> I need to implement **drag-and-drop reordering for a list of cards** for a **React 18 SPA using TypeScript**.
>
> Please act as a Senior Technical Architect and help me conduct a "Build vs. Borrow" analysis.
>
> ### 1. The "Borrow" Landscape
> Identify the industry-standard libraries or services for this problem in the **React** ecosystem.
> Select the top 3 candidates based on **community adoption (downloads/stars)**, **recent maintenance activity**, and **relevance to my project constraints**.
> For these candidates, please analyze:
> - **Maturity**: Community usage, maintenance status.
> - **Cost**: Bundle size, performance overhead, or financial cost (if SaaS).
> - **Fit**: How well it matches my specific needs.
>
> ### 2. The "Build" Analysis
> If I were to build this from scratch:
> - What is the "Iceberg" complexity? (Hidden edge cases, security risks, maintenance burden).
> - What is the estimated time to build a production-grade version (not just a prototype)?
> - Is this problem unique to my domain, or is it a generic utility?
>
> ... [rest of prompt]

**Likely Outcome**:
The AI will recommend `dnd-kit` or `react-beautiful-dnd`, explaining that building accessible, mobile-friendly drag-and-drop from scratch is months of work (the "iceberg").

---

## Tips for Better Results

- **Plan Mode**: If your AI tool supports a "Plan" or "Reasoning" mode, use it. This encourages the model to search its knowledge base more thoroughly before answering.
- **Web Search**: Ensure the AI has access to the web if you need the absolute latest library statistics (e.g., "search npm for latest trends").
- **Ask for Prototypes**: After the analysis, ask: "Create a minimal prototype using your recommended library to prove it works."
