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

When you encounter a new problem, follow this sequence:

### Step 1: Search Before You Code

Before writing a single line:

```bash
# Check npm for existing packages
npm search <problem>

# Check GitHub for implementations
# Search: "<problem> language:javascript"

# Check if your framework has built-in support
# Read the docs, not just tutorials
```

**Spend 30 minutes researching** before spending 30 hours building.

### Step 2: Evaluate Candidates

For each potential solution:

1. **Read the README** — Does it solve your problem?
2. **Check the repo health** — Recent activity? Responsive maintainers?
3. **Review the API** — Is it well-designed? Will it be pleasant to use?
4. **Scan the issues** — What problems do users report?
5. **Check the bundle** — Is the size appropriate for your use case?

### Step 3: Prototype with the Top Choice

Don't just read — try it:

```javascript
// Quick spike to validate the solution
import { library } from 'candidate-library';

// Does it actually do what you need?
// Is the API ergonomic?
// Any surprises?
```

**Timebox this**: 1-2 hours maximum. You're validating fit, not building features.

### Step 4: Decide and Document

Make an explicit decision and record it:

```markdown
## Decision: Use date-fns for date formatting

### Context
- Need to format dates in multiple locales
- Need timezone-aware parsing
- Bundle size matters (client-side app)

### Options Considered
1. **Moment.js** — Large bundle, legacy maintenance mode
2. **date-fns** — Tree-shakeable, active development, good docs
3. **Build custom** — Would take weeks, no benefit to users

### Decision
Use date-fns. Tree-shaking keeps bundle small, API is intuitive,
and we can focus engineering time on our actual product.

### Consequences
- Team needs to learn date-fns API (minimal, good docs)
- We depend on external maintenance (acceptable, large community)
```

This is an [Architecture Decision Record](/docs/curriculum/part-2-team-practices/architecture-decision-records) — a practice that makes your reasoning visible and reviewable.

---

## Real-World Examples

### Example 1: Form Validation

**Scenario**: You need client-side form validation for a signup flow.

**Build temptation**: "Validation is just if-statements. I'll write my own."

**Reality check**:
- Email regex that actually works is notoriously complex
- Async validation (username availability) needs debouncing
- Error message display, field-level vs form-level
- Accessibility (ARIA attributes, focus management)
- Schema definition and reuse

**Better approach**: Use a form library (React Hook Form, Formik, Zod) that's solved these problems. Read the source code if you want to understand validation deeply.

### Example 2: State Management

**Scenario**: Your React app needs global state.

**Build temptation**: "I'll just use Context and useReducer. Redux is overkill."

**Reality check**:
- Context re-renders all consumers on any change
- You'll reinvent selectors, middleware, devtools
- Performance optimization becomes your problem
- "Simple" custom solutions grow complex

**Better approach**: Start with the simplest solution (maybe just React state). When you hit real pain points, reach for Zustand, Jotai, or Redux Toolkit — understanding *why* you need it.

### Example 3: Authentication

**Scenario**: Your SaaS needs user authentication.

**Build temptation**: "Auth is important. I should understand it by building it."

**Reality check**:
- Password hashing algorithms and security
- Session management and token refresh
- OAuth integration with multiple providers
- Email verification, password reset flows
- Rate limiting, brute force protection
- Compliance considerations (GDPR, etc.)

**Better approach**: Use Auth0, Clerk, Supabase Auth, or similar. Study their documentation to understand auth concepts. Read their security whitepapers. You'll learn *more* than building an insecure version yourself.

### Example 4: When Building IS Right

**Scenario**: You're building a specialized data visualization product. Existing charting libraries don't support the unique interaction patterns your users need.

**Analysis**:
- This IS your core differentiator
- Existing solutions genuinely don't solve the problem
- You have domain expertise users are paying for
- The "edge case" is your entire product

**Decision**: Build it. But still *study* existing libraries first — learn from their architecture, patterns, and mistakes.

---

## Common Mistakes

### Mistake 1: Not-Invented-Here Syndrome

**Pattern**: Dismissing external solutions without evaluation.

> "That library is bloated/slow/badly designed. I'll write something better."

**Reality**: You probably won't. And if you could, it would take far longer than you think.

**Fix**: Force yourself to articulate *specific* inadequacies before building. "I don't like it" isn't a reason.

### Mistake 2: Premature Abstraction

**Pattern**: Building "reusable" solutions before you have multiple use cases.

> "I'll build a flexible form system we can use everywhere."

**Reality**: You'll build the wrong abstraction. You don't yet know what "everywhere" needs.

**Fix**: Use existing solutions. When you've felt real pain across multiple features, *then* consider whether custom tooling is warranted.

### Mistake 3: Sunk Cost Continuation

**Pattern**: Continuing to maintain custom code because you already built it.

> "We have our own date library. We should keep using it."

**Reality**: Past investment doesn't justify future cost.

**Fix**: Regularly evaluate whether custom code is still the right choice. Migrating to a maintained library is often worth the one-time cost.

### Mistake 4: Dependency Paranoia

**Pattern**: Avoiding all dependencies out of fear.

> "What if the library is abandoned? What if there's a security vulnerability?"

**Reality**: These risks are real but manageable. Your custom code has the same risks, plus you're the sole maintainer.

**Fix**: Choose well-maintained libraries with active communities. The "truck factor" of popular open source is usually better than your custom code.

### Mistake 5: Confusing Building with Understanding

**Pattern**: Believing you must build something to understand it.

> "I built my own Promise implementation, so now I really understand async."

**Reality**: Building a simplified version teaches you a simplified mental model. You could learn more accurately by reading actual implementations and documentation.

**Fix**: Study existing code. Read specs. Understand *why* decisions were made. Building isn't the only path to understanding — and often isn't the best one.

---

## Standing on Shoulders

Isaac Newton wrote: "If I have seen further, it is by standing on the shoulders of giants."

Software development is the same. Every library you use represents thousands of hours of collective problem-solving. Every edge case handled, every security vulnerability patched, every API refined through real-world usage.

**Borrowing isn't weakness. It's wisdom.**

The developers who ship the most value aren't the ones who build everything themselves. They're the ones who:
- Focus their building energy on unique problems
- Leverage existing solutions for solved problems
- Make deliberate decisions about the tradeoff
- Ship products, not just code

---

## Summary

**Build vs. Borrow** means:

1. **Recognize the hidden costs** — Building involves far more than the initial implementation
2. **Question the "learning" excuse** — The meta-skill of evaluation compounds more than reimplementation
3. **Follow the evaluation framework** — Systematic decision-making over gut instinct
4. **Search before you code** — Spend 30 minutes researching before 30 hours building
5. **Document your decisions** — Make reasoning explicit and reviewable
6. **Reserve building for differentiation** — Your unique value, not solved problems

:::tip[Key insight]
The skill of knowing *when* to leverage existing solutions is more valuable than the ability to reimplement them. Practice discernment, not just coding.
:::

---

## Next Steps

1. **Audit a recent decision** — Think of something you built recently. Was building the right choice? What would evaluation have revealed?
2. **Practice the search-first workflow** — For your next task, spend 30 minutes researching existing solutions before writing any code
3. **Write a decision record** — Document a build-vs-borrow decision using the framework above
4. **Read library source code** — Pick a library you use daily. Read its implementation. Notice how much complexity exists beneath the simple API

---

## Related

- [Friction to Opportunity](friction-to-opportunity) — Identifying what problems to solve
- [Flow-Based Development](flow-based-dev) — How to build once you've decided to build
- [Architecture Decision Records](/docs/curriculum/part-2-team-practices/architecture-decision-records) — Documenting technology choices
- [Build Tools and Modern Development](/docs/curriculum/part-1-foundations/build-tools) — Understanding the package ecosystem
