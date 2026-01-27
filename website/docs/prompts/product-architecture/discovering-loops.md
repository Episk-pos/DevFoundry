---
sidebar_position: 1
title: "Discovering Your Loop"
description: "Identify the minimal user loop for any product"
---

# Discovering Your Minimal User Loop

**Find the atomic unit of value in your product**

---

## Overview

Before designing features, onboarding, or architecture, you need to understand your product's minimal user loop. This is the shortest path from user intent to delivered value.

This prompt template helps you:
- Identify what users actually want
- Find the minimum viable path to value
- Distinguish essential elements from nice-to-haves
- Avoid building complexity that doesn't serve the loop

---

## The Core Discovery Prompt

```
I'm building [PRODUCT TYPE] for [TARGET USERS].

The problem I'm solving: [1-2 SENTENCES]

Help me discover the minimal user loop by answering:

## 1. Value Definition
- What specific outcome does the user want?
- How do they know they got it?
- What would make them return for more?

## 2. Minimal Action
- What's the absolute minimum the user must do to receive value?
- What can be removed or deferred?
- What defaults can be assumed?

## 3. System Requirements
- What must the system do to close this loop?
- What's essential vs enhancement?
- What's the critical path?

## 4. Feedback Design
- How does the user know the action was received?
- How do they know processing is happening?
- How do they know they got the value?

## 5. Repeat Trigger
- Why would they complete this loop again?
- What brings them back?
- How does value compound over time?

Write out the complete loop as:
Intent → Action → Response → Feedback → Value → Repeat
```

---

## Deep Dive: Value Definition

Use when the core value isn't clear:

```
I'm building [PRODUCT] for [USERS].

I think the value is [YOUR HYPOTHESIS].

Challenge my assumption:

1. Is this the **actual** value or a means to an end?
   (e.g., "send messages" is a means; "feel connected" is the value)

2. What would users say they got after using my product?

3. What's the "before and after"?
   - Before using: [USER STATE]
   - After using: [USER STATE]

4. If I had to describe the value in one tweet, what would it be?

5. What's the equivalent value users get from alternatives/competitors?
```

---

## Deep Dive: Action Stripping

Use to find the minimum viable action:

```
Currently, to get value from my product, users must:

1. [ACTION 1]
2. [ACTION 2]
3. [ACTION 3]
...

For each action, ask:

1. **Is this essential to the loop?**
   - Can value be delivered without it?
   - Can it happen later, after first value?

2. **Can this be automated/defaulted?**
   - What reasonable default would work for 80% of users?
   - Can the system infer this instead of asking?

3. **Can this be combined with another action?**
   - Are there redundant steps?
   - Can multiple actions become one?

Goal: Find the true **minimum** — the fewest possible actions to first value.
```

---

## Deep Dive: Competitive Loop Analysis

Use to understand your market:

```
My product: [PRODUCT]
Main alternatives users consider:
1. [COMPETITOR/ALTERNATIVE A]
2. [COMPETITOR/ALTERNATIVE B]
3. [DOING NOTHING / MANUAL PROCESS]

For each alternative, map their loop:
- Intent: What need brings users there?
- Action: What do users do?
- Response: What happens?
- Feedback: How do they know it worked?
- Value: What do they get?
- Repeat: Why do they return?

Then analyze:
1. Which loop is tightest (fastest to value)?
2. Where do other loops have friction?
3. What's my loop advantage?
4. Where is my loop weaker?
```

---

## Deep Dive: Loop Validation

Use to test if you've found the right loop:

```
Here's the minimal user loop I've identified:

**Intent**: [WHAT USERS WANT]
**Action**: [WHAT THEY DO]
**Response**: [WHAT SYSTEM DOES]
**Feedback**: [HOW THEY KNOW]
**Value**: [WHAT THEY GET]
**Repeat**: [WHY THEY RETURN]

Validate this loop:

1. **Value Test**: Would a user describe the value the same way I do?

2. **Minimum Test**: Can I remove any step and still deliver value?

3. **Speed Test**: How fast can a new user complete their first loop?
   - Seconds? Good.
   - Minutes? Acceptable.
   - Hours/Days? Problem.

4. **Repeat Test**: Is there a natural trigger for the next loop, or do users have to remember?

5. **Word of Mouth Test**: After completing one loop, what would a user tell a friend?

What's weakest about this loop? What would make it stronger?
```

---

## Loop Patterns by Product Type

### SaaS Products

```
For my SaaS product targeting [USERS]:

Apply the "Job to Be Done" lens:
- When [SITUATION], I want to [MOTIVATION], so I can [EXPECTED OUTCOME]

Then find the loop:
- What job does this product do?
- What's the minimum action to get that job done?
- How quickly can the job be done?
- What's the recurring need (daily? weekly? event-triggered?)
```

### Dev Tools

```
For my dev tool:

Developer loops usually follow:
Intent: "I need to [ACCOMPLISH X] without breaking flow"

Questions:
1. What's the developer trying to accomplish?
2. What context/environment are they in when this need arises?
3. What's the fastest possible path from need to done?
4. How does this fit into their existing workflow?
5. What would make them reach for this tool habitually?
```

### Consumer Apps

```
For my consumer app:

Consumer loops often center on emotional value:
- Entertainment (I want to feel engaged)
- Connection (I want to feel connected)
- Achievement (I want to feel accomplished)
- Expression (I want to feel heard)

Questions:
1. What emotional need does this serve?
2. What's the "aha moment" when users get it?
3. How long until that moment?
4. What creates the habit loop?
5. What's the social component (if any)?
```

### Marketplaces

```
For my marketplace:

Marketplaces have TWO loops that must connect:
- Supply-side loop (providers)
- Demand-side loop (consumers)

For each side:
1. What value do they seek?
2. What's their minimum action?
3. What triggers their return?

Critical question: Which side's loop should you solve first?
(Hint: Usually the side that's harder to acquire)
```

---

## Red Flags in Loop Discovery

Use to identify problems early:

```
Review my loop for these red flags:

**Value Red Flags**:
- [ ] Value requires accumulation over time (cold start problem)
- [ ] Value depends on others being present (network effect dependency)
- [ ] Value is hard to demonstrate quickly

**Action Red Flags**:
- [ ] First action requires significant setup
- [ ] Actions require learning before doing
- [ ] Actions feel risky or irreversible

**Response Red Flags**:
- [ ] Response takes a long time
- [ ] Response requires human intervention
- [ ] Response might fail unpredictably

**Feedback Red Flags**:
- [ ] Success isn't clearly visible
- [ ] User has to check if it worked
- [ ] Failure isn't clearly explained

**Repeat Red Flags**:
- [ ] No natural trigger for next loop
- [ ] Value doesn't compound
- [ ] Once solved, problem doesn't recur

For each red flag that applies, what's the mitigation strategy?
```

---

## From Loop to Product

Once you've discovered your loop:

```
Now that I understand my loop:

**Intent**: [WHAT]
**Action**: [WHAT]
**Response**: [WHAT]
**Feedback**: [WHAT]
**Value**: [WHAT]
**Repeat**: [WHAT]

Help me translate this to product decisions:

1. **First screen**: What should users see first?

2. **First action**: What should be immediately obvious to do?

3. **Success state**: What does "it worked" look like?

4. **Time to value**: What's my target for first loop completion?

5. **Retention hook**: What will bring them back?

6. **Metrics**: What should I measure to know the loop is working?
```

---

## Checklist: Loop Discovery

Before moving to design and implementation:

- [ ] I can state the value in one sentence
- [ ] The action is truly minimal (nothing can be removed)
- [ ] I know what the system must do (not might do)
- [ ] Feedback exists for every action state
- [ ] There's a clear trigger for repeat
- [ ] I've validated against alternatives
- [ ] I've identified red flags and mitigations

---

## Related Prompts

- [Onboarding from Loop](onboarding-from-loop) — Design first-time experience
- [UX from Loop](ux-from-loop) — Make interface decisions
- [Backend from Loop](backend-from-loop) — Architect the system
- [Infrastructure from Loop](infra-from-loop) — Plan deployment and scaling
