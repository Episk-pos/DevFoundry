---
sidebar_position: 3
title: Build vs. Borrow
description: The critical skill of knowing when to leverage existing solutions
---

# Build vs. Borrow

**The critical skill of knowing when to leverage existing solutions**

---

## Introduction

One of the most consequential decisions you'll make as a developer — repeatedly, throughout your career — is whether to **build something yourself** or **borrow an existing solution**.

This isn't about laziness vs. hard work. It's about **leverage**.

Every hour you spend reimplementing something that already exists is an hour you're *not* spending on:
- The unique problem only you can solve
- Understanding your users better
- Shipping value to real people
- Learning skills that compound

**Build vs. Borrow** is a mental model for making this decision deliberately, not by default.

---

## The Hidden Cost of Building

### The Iceberg Problem

When you decide to "just build it yourself," you see the tip of the iceberg:

```
What you see:
┌─────────────────────────┐
│   Core functionality    │  ← "I can write this in a weekend"
└─────────────────────────┘

What's underneath:
┌─────────────────────────┐
│    Edge cases           │
│    Error handling       │
│    Security concerns    │
│    Performance tuning   │
│    Documentation        │
│    Maintenance          │
│    Bug fixes            │
│    Compatibility        │
└─────────────────────────┘
```

A date formatting library isn't just `formatDate()`. It's timezone handling, localization, leap years, daylight saving time, parsing ambiguous formats, and hundreds of edge cases discovered over years of production use.

### The Opportunity Cost

Time is finite. Every choice to build is a choice *not* to do something else.

**Example**: You're building a SaaS product. You decide to write your own authentication system "to understand it better."

**What you spend**:
- 2 weeks implementing login, registration, password reset
- 1 week on session management
- 1 week on security hardening (maybe)
- Ongoing maintenance forever

**What you could have done**:
- Integrated Auth0/Clerk/Supabase Auth in 1 day
- Spent 4 weeks on your actual product differentiator
- Shipped to users a month earlier
- Learned about authentication by *reading* how the library works

The authentication you built isn't your competitive advantage. Your product is.

---

## The "Learning Experience" Trap

Here's where less experienced developers often stumble:

> "But building it myself is a valuable learning experience!"

This sounds reasonable. It's also frequently wrong. Here's why.

### What You Actually Learn

When you reimplement a solved problem, you learn:
- How to solve that specific problem (once)
- Implementation details you'll likely forget
- Edge cases you'll discover painfully

### What You Don't Learn

When you skip the meta-skill of evaluation, you miss:
- How to assess existing solutions
- How to read and understand library code
- How to evaluate tradeoffs at scale
- How to make strategic technical decisions
- How to ship products, not just code

### The Meta-Skill That Actually Compounds

**The ability to evaluate, select, and effectively use existing solutions is itself a critical skill** — and one that compounds far more than reimplementation knowledge.

Consider two developers five years into their careers:

**Developer A**: Built everything from scratch "to learn"
- Deep knowledge of a few algorithms they implemented
- Limited exposure to production-quality code patterns
- Slow to ship; lots of reinvented wheels
- Still making build-vs-borrow decisions by instinct

**Developer B**: Practiced deliberate evaluation
- Broad familiarity with the ecosystem
- Learned patterns by reading excellent library code
- Fast to ship; focuses effort on unique value
- Makes confident, reasoned technology decisions

Developer B isn't less skilled — they're *differently* skilled in ways that matter more for building real products.

### When "Learning" Is a Valid Reason

To be clear: learning *is* sometimes a valid reason to build. But be honest about what you're doing:

| Valid learning context | Invalid learning excuse |
|------------------------|-------------------------|
| Explicit educational exercise | Production code for users |
| Building to understand, then discarding | Shipping your learning project |
| Studying existing implementations first | Ignoring what exists |
| Time-boxed exploration | Open-ended "I'll figure it out" |
| Deliberate practice of specific skills | Vague "good experience" |

:::tip[Key insight]
If you want to learn how authentication works, *read the source code of an auth library*. You'll learn more, faster, than building a worse version yourself.
:::

---

## The Evaluation Framework

When facing a build-vs-borrow decision, work through these questions:

### 1. Does This Problem Differentiate My Product?

**If no** → Strong bias toward borrowing.

Your users don't care if you wrote your own date picker. They care if your product solves their problem.

**Questions to ask**:
- Would users notice or care if I used an existing solution?
- Is this problem *the* thing I'm uniquely positioned to solve?
- Does building this create competitive advantage?

### 2. Do Quality Solutions Already Exist?

**If yes** → Understand why before dismissing them.

**Evaluate existing solutions on**:
- Maintenance status (recent commits? active issues?)
- Community adoption (stars, downloads, who uses it?)
- Documentation quality
- API design and ergonomics
- Bundle size / performance (if relevant)
- License compatibility

**If existing solutions are inadequate**:
- Can you contribute improvements upstream?
- Can you wrap/extend rather than replace?
- Is the inadequacy fundamental or superficial?

### 3. What's the True Cost of Building?

Be ruthlessly honest:

| Cost category | Questions |
|---------------|-----------|
| **Initial build** | How long to reach feature parity with existing solutions? |
| **Edge cases** | What will I discover in production that I haven't thought of? |
| **Maintenance** | Who fixes bugs in this code forever? |
| **Security** | Am I qualified to handle the security implications? |
| **Documentation** | Will future me (or teammates) understand this? |
| **Opportunity** | What am I *not* building while I build this? |

### 4. What's the True Cost of Borrowing?

Borrowing isn't free either:

| Cost category | Questions |
|---------------|-----------|
| **Dependencies** | Does this add significant weight/complexity? |
| **Lock-in** | How hard is it to switch later? |
| **Learning curve** | How long to understand the API? |
| **Mismatch** | Does it solve 80% of my problem or 100%? |
| **Maintenance risk** | What if this library is abandoned? |

### 5. The Decision Matrix

```
                    PROBLEM IS CORE           PROBLEM IS PERIPHERAL
                    TO YOUR VALUE             TO YOUR VALUE
                    ─────────────────────────────────────────────────
GOOD SOLUTIONS      Consider building         Almost always borrow
EXIST               if you can do better
                    ─────────────────────────────────────────────────
NO GOOD SOLUTIONS   Build it                  Build minimal version
EXIST               (this is your job)        or reconsider need
```

---

## The Borrow-First Workflow

When you encounter a new problem, follow this sequence using your AI development tools:

### Step 1: Consult Your AI Architect

Instead of manually searching npm or GitHub immediately, ask your AI assistant (Claude, Gemini, ChatGPT, etc.) to survey the landscape.

**Prompt:**
> "I need to add drag-and-drop functionality to my React app. Act as a Senior Architect: What are the current industry-standard libraries for this? Select the top 3 candidates based on **community adoption**, **recent maintenance**, and **relevance to modern React patterns**. Compare them based on bundle size, maintenance, and API ergonomics."

:::info[Use the template]
While the prompt above works for a quick search, use the full **[Build vs. Borrow Prompt](/docs/prompts/build-vs-borrow)** for a structured architectural analysis before making a final decision.
:::

**Why this works**: AI models have read thousands of blog posts, documentation sites, and comparisons. They can synthesize this information instantly.

### Step 2: Evaluate Candidates with AI

Once you have candidates, use AI to deepen your due diligence:

1.  **Summarize Tradeoffs**: "Compare `react-beautiful-dnd` vs `dnd-kit`. Which is more modern and better maintained?"
2.  **Explain Usage**: "Show me a minimal code example of using `dnd-kit` to reorder a list."
3.  **Check "Iceberg" Depth**: "What are the common edge cases or pitfalls when implementing drag-and-drop from scratch?"

### Step 3: Prototype with Assistance

Don't just read — try it. Ask your AI to generate a functional prototype.

**Prompt:**
> "Create a small, self-contained component using [Library Choice] that demonstrates [Key Feature]. Use TypeScript."

**Timebox this**: 30-60 minutes. You are validating *fit*, not building the final feature.

### Step 4: Formalize the Decision

Don't let this analysis live only in a chat window. The "Build vs. Borrow" analysis provides all the necessary content for an **Architecture Decision Record (ADR)**.

Use the **[ADR Template](/docs/curriculum/part-2-team-practices/architecture-decision-records)** to permanently record your choice in your repository.

*   **Context**: Summarize the "Borrow" landscape and "Build" complexity.
*   **Decision**: State your chosen path clearly.
*   **Consequences**: List the tradeoffs (e.g., "Positive: Saved 2 weeks of dev time. Negative: Bundle size increased by 20kb").

Use the **[Build vs. Borrow Prompt](/docs/prompts/build-vs-borrow)** to structure the initial analysis.

---

## Real-World Examples

### Example 1: Form Validation

**Scenario**: You need client-side form validation for a signup flow.

**Build temptation**: "Validation is just if-statements. I'll write my own."

**AI Reality Check**: Ask your AI tool: "I'm planning to write custom validation for an email/password form. What are the top 10 edge cases I'm likely to miss, and how do libraries like Zod or Yup handle them?"

**Better approach**: Use a form library (React Hook Form, Zod) that's solved these problems. Ask your AI to walk you through the library's source code to understand how it handles complex regex or async validation.

### Example 2: State Management

**Scenario**: Your React app needs global state.

**Build temptation**: "I'll just use Context and useReducer. Redux is overkill."

**AI Reality Check**: Ask your AI tool: "Compare using React Context for global state vs. Zustand for a project with [Your Complexity]. Show me the performance implications and potential for 're-render hell' in both approaches."

**Better approach**: Start with the simplest solution. When you hit pain points, use AI to prototype a migration to Zustand or Jotai, and ask it to explain the architectural tradeoffs.

### Example 3: Authentication

**Scenario**: Your SaaS needs user authentication.

**Build temptation**: "Auth is important. I should understand it by building it."

**AI Reality Check**: Ask your AI tool: "Act as a security auditor. What are the common vulnerabilities (OWASP Top 10) I need to protect against if I implement my own JWT-based auth? Compare this burden to using Supabase Auth or Clerk."

**Better approach**: Use Auth0, Clerk, or Supabase. Use your AI tool to explain the security whitepapers of these services. You'll learn more about production security by studying their implementation than by building a vulnerable one yourself.

### Example 4: When Building IS Right

**Scenario**: You're building a specialized data visualization product. Existing charting libraries don't support the unique interaction patterns your users need.

**Analysis**:
- This IS your core differentiator.
- Existing solutions genuinely don't solve the problem.
- Your AI tool confirms that custom canvas/SVG logic is the only way to achieve the goal.

**Decision**: Build it. But still use AI to study existing libraries first — ask: "Explain the internal rendering loop of D3.js or Recharts so I can use similar patterns in my custom implementation."

---

## Common Mistakes

### Mistake 1: Not-Invented-Here Syndrome

**Pattern**: Dismissing external solutions without evaluation.

**Fix**: Use AI to perform a "Devil's Advocate" audit. Ask: "I'm biased toward building this myself. Give me 5 reasons why using [Library X] is actually a better long-term strategic decision."

### Mistake 2: Premature Abstraction

**Pattern**: Building "reusable" solutions before you have multiple use cases.

**Fix**: Stick to existing solutions until you've felt real pain. Use AI to identify when your custom requirements have diverged enough from the "borrowed" solution to justify a custom build.

### Mistake 3: Sunk Cost Continuation

**Pattern**: Continuing to maintain custom code because you already built it.

**Fix**: Periodically ask your AI: "I'm currently maintaining [Custom Implementation]. Has the ecosystem produced a better/standard solution for this in the last year? Show me a migration path."

### Mistake 4: Dependency Paranoia

**Pattern**: Avoiding all dependencies out of fear of abandonment or security.

**Fix**: Use AI to audit the dependency. Ask: "Analyze the GitHub health of [Library]. Look at the 'truck factor', issue resolution time, and recent security CVEs. Is this a safe bet for a 2-year project?"

### Mistake 5: Confusing Building with Understanding

**Pattern**: Believing you must build something to understand it.

**Fix**: Use AI as a code tutor. Instead of building a worse version of a Promise library, ask: "Open the source for `p-limit` and explain how it manages concurrency. Trace the execution flow for me."

---

## Standing on Shoulders

Isaac Newton wrote: "If I have seen further, it is by standing on the shoulders of giants."

In the AI era, this is more true than ever. Your AI assistant has read the "giants'" code. It can help you find, evaluate, and integrate their work in minutes.

**Borrowing isn't weakness. It's wisdom.**

---

## Summary

**Build vs. Borrow** means:

1. **Recognize the hidden costs** — Building involves far more than the initial implementation.
2. **Question the "learning" excuse** — Use AI to study existing code instead of reinventing it.
3. **Follow the evaluation framework** — Systematic decision-making over gut instinct.
4. **Consult AI before you code** — Spend 15 minutes researching the landscape before 15 hours building.
5. **Document your decisions** — Use AI to help draft ADRs that explain the "why".
6. **Reserve building for differentiation** — Your unique value, not solved problems.

:::tip[Key insight]
The skill of knowing *when* to leverage existing solutions is more valuable than the ability to reimplement them. Practice discernment, not just coding.
:::

---

## Next Steps

1. **Audit a recent decision** — Think of something you built recently. Was building the right choice? What would an AI-assisted evaluation have revealed?
2. **Practice the search-first workflow** — For your next task, use the **[Build vs. Borrow Prompt](/docs/prompts/build-vs-borrow)** before writing any code.
3. **Write an ADR** — Document a build-vs-borrow decision using the [ADR framework](/docs/curriculum/part-2-team-practices/architecture-decision-records).
4. **Read library source code** — Pick a library you use daily. Ask your AI to explain its internal architecture. Notice how much complexity exists beneath the simple API.

---

## Related

- [Friction to Opportunity](friction-to-opportunity) — Identifying what problems to solve
- [Flow-Based Development](flow-based-dev) — How to build once you've decided to build
- [Architecture Decision Records](/docs/curriculum/part-2-team-practices/architecture-decision-records) — Documenting technology choices
- [Build Tools and Modern Development](/docs/curriculum/part-1-foundations/build-tools) — Understanding the package ecosystem
