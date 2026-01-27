---
sidebar_position: 2
title: "Onboarding from Loop"
description: "Design first-time user experience from the minimal user loop"
---

# Designing Onboarding from the Loop

**Get users to their first completed loop as fast as possible**

---

## Overview

Onboarding has one goal: **get users to experience value**.

Not "explain the product." Not "show all features." Not "collect information." The goal is completing the first minimal user loop.

Every screen, every field, every step between signup and value is friction. Some friction is necessary. Most isn't.

This prompt template helps you design onboarding that:
- Minimizes time to first value
- Collects only essential information
- Builds momentum toward the loop
- Converts signups into active users

---

## The Core Onboarding Prompt

```
My minimal user loop:
**Intent**: [WHAT USERS WANT]
**Action**: [WHAT THEY DO]
**Response**: [WHAT SYSTEM DOES]
**Feedback**: [HOW THEY KNOW]
**Value**: [WHAT THEY GET]

Currently, a new user must:
1. [STEP 1 — e.g., create account]
2. [STEP 2 — e.g., verify email]
3. [STEP 3 — e.g., complete profile]
...

Help me design onboarding that gets to the first loop faster:

1. **What can be removed entirely?**
   (Can the loop work without this step?)

2. **What can be deferred until after first value?**
   (Ask after they're hooked, not before)

3. **What can be inferred or defaulted?**
   (Assume instead of ask)

4. **What's the true minimum path?**
   (If I could only have 3 steps, what would they be?)

Goal: First value in under [TARGET TIME — e.g., 60 seconds]
```

---

## Onboarding Audit

Use to evaluate existing onboarding:

```
Here's my current onboarding flow:

1. [STEP + TIME] — e.g., "Landing page → Sign up button (5 sec)"
2. [STEP + TIME] — e.g., "Sign up form: email, password (30 sec)"
3. [STEP + TIME] — e.g., "Email verification (variable)"
...

First loop completion: Step [N]

Analyze each step:

| Step | Required for loop? | Can defer? | Can automate? | Time cost |
|------|-------------------|------------|---------------|-----------|
| 1    |                   |            |               |           |
| 2    |                   |            |               |           |
...

Calculate:
- Current time to first loop: [X minutes]
- Theoretical minimum: [Y seconds]
- Gap to close: [X - Y]

What's the biggest friction point?
What's the easiest fix?
```

---

## Progressive Disclosure Design

Use to structure information collection:

```
I need to collect the following information from users:
1. [INFO — e.g., email]
2. [INFO — e.g., name]
3. [INFO — e.g., company]
4. [INFO — e.g., role]
5. [INFO — e.g., preferences]
...

Classify each:

**Before first loop** (required for the loop to work):
- ...

**After first loop** (needed for personalization/features):
- ...

**After engagement** (needed for billing/advanced features):
- ...

**Never** (we don't actually need this):
- ...

Design a flow where:
- Pre-loop collection is minimal
- Each ask comes at the moment it's needed
- Users understand why we're asking
```

---

## Zero-State Design

Use when the product needs content/data to be valuable:

```
My product has a cold-start problem:

Value requires: [WHAT — e.g., "data to analyze", "connections", "content"]

Without it: [WHAT HAPPENS — e.g., "empty dashboard"]

Help me design around this:

1. **Fake Value**: Sample data that demonstrates the loop
   - What would a realistic sample look like?
   - How do we make clear it's a sample?

2. **Earned Value**: Small first win that's real
   - What's the simplest real value we could deliver?
   - How do we set up for that first win?

3. **Borrowed Value**: Import from elsewhere
   - What existing data/connections could we import?
   - How do we make import frictionless?

4. **Instant Value**: Doesn't require content
   - What value can we provide immediately?
   - How does that lead into the main loop?

Which approach fits my product? How do we implement it?
```

---

## Authentication Timing

Use to decide when to require accounts:

```
My loop: [DESCRIBE LOOP]

Currently, authentication happens: [BEFORE LOOP / DURING LOOP / AFTER LOOP]

Analyze authentication placement:

**Option A: Auth before loop**
- Pros: [e.g., personalization from start]
- Cons: [e.g., friction before value]
- Conversion impact: [estimate]

**Option B: Auth during loop**
- Pros: [e.g., save progress makes sense]
- Cons: [e.g., interrupts flow]
- When this makes sense: [conditions]

**Option C: Auth after loop**
- Pros: [e.g., value before commitment]
- Cons: [e.g., might lose work without save]
- When this makes sense: [conditions]

**Option D: Optional auth**
- Pros: [e.g., lowest friction]
- Cons: [e.g., engagement tracking harder]
- When this makes sense: [conditions]

For my specific loop, what's the right choice and why?
```

---

## Onboarding Flows by Product Type

### SaaS Onboarding

```
For my SaaS product:

**The loop**: [DESCRIBE]
**Key value moment**: [WHAT]

Design an onboarding that follows this pattern:

1. **Promise** (landing page → signup)
   - What headline captures the value?
   - What's the call to action?

2. **Setup** (minimum viable configuration)
   - What's truly required?
   - What can be wizard-style vs. form-style?

3. **First Win** (guided first loop)
   - What's the simplest first task?
   - How do we celebrate success?

4. **Expansion** (after first value)
   - What's the second thing to try?
   - How do we suggest next steps?

Time budget: [X] minutes total
```

### Dev Tool Onboarding

```
For my dev tool:

**The loop**: [DESCRIBE]
**Context**: Developer is in [IDE / Terminal / Browser]

Design onboarding for:

1. **Discovery** (how they find it)
   - README first impression
   - Installation command

2. **Installation** (getting it running)
   - One-liner ideal: [COMMAND]
   - Fallback for edge cases

3. **First Command** (immediate value)
   - What's the simplest useful command?
   - What output proves it works?

4. **Configuration** (when needed)
   - What's the minimal config file?
   - Smart defaults for common cases

Include example output for each step.
Time budget: Under 5 minutes to first working command.
```

### Consumer App Onboarding

```
For my consumer app:

**The loop**: [DESCRIBE]
**Emotional hook**: [WHAT FEELING]

Design onboarding around:

1. **Hook** (first 3 seconds)
   - What do they see immediately?
   - What makes them want to continue?

2. **Value Preview** (before any signup)
   - Can they experience something without an account?
   - What sample content/experience hooks them?

3. **Light Signup** (minimal friction)
   - Social login options
   - Email-only to start
   - Skip for now option?

4. **Personalization** (after hook)
   - What preferences improve their experience?
   - How do we ask without overwhelming?

5. **First Share** (social proof/growth)
   - What's worth sharing after first loop?
   - How do we make sharing easy?

Time budget: Value in 30 seconds, signup only if hooked.
```

---

## Measuring Onboarding Success

```
For my onboarding flow:

Define metrics:

**Funnel Metrics**:
- Landing → Signup: [X]%
- Signup → First Action: [X]%
- First Action → First Loop: [X]%
- First Loop → Return Visit: [X]%

**Time Metrics**:
- Time to signup: [X] seconds
- Time to first action: [X] seconds
- Time to first value: [X] seconds

**Drop-off Analysis**:
- Where do most users quit?
- At what step?
- After how long?

What would "good" look like for each metric?
What's my current baseline?
What's the biggest opportunity?
```

---

## Common Onboarding Mistakes

```
Review my onboarding for these antipatterns:

**The Feature Tour**
- [ ] Showing features before value
- [ ] Explaining instead of experiencing
- [ ] Carousel of "here's what you can do"

**The Interrogation**
- [ ] Long forms before any value
- [ ] Questions we could infer
- [ ] Required fields that aren't required

**The Waiting Room**
- [ ] Email verification blocking progress
- [ ] Approval workflows before value
- [ ] "We'll be in touch" as the endpoint

**The Overwhelming**
- [ ] Too many options at once
- [ ] No clear path forward
- [ ] Everything equally emphasized

**The Abandoned**
- [ ] No guidance after signup
- [ ] Empty state with no direction
- [ ] "You're all set!" with nowhere to go

Which apply to my current flow?
How would I fix each one?
```

---

## Onboarding Copywriting

```
For each step of my onboarding, I need:

**Headlines** that:
- Describe value, not action
- Use user's language
- Create momentum

**CTAs** that:
- Describe the next step clearly
- Use action verbs
- Feel like progress

**Help text** that:
- Explains why (not just how)
- Reduces anxiety
- Sets expectations

Current flow:
1. Step: [NAME] — Current headline: [X] — Current CTA: [Y]
2. Step: [NAME] — Current headline: [X] — Current CTA: [Y]
...

Rewrite each step with better copy.
```

---

## Checklist: Onboarding from Loop

- [ ] First loop completes in target time
- [ ] Only essential info collected before loop
- [ ] Empty states are handled
- [ ] Success is clearly communicated
- [ ] Next action is obvious after first loop
- [ ] Auth happens at the right moment
- [ ] Metrics are defined and trackable

---

## Related Prompts

- [Discovering Your Loop](discovering-loops) — Find the loop first
- [UX from Loop](ux-from-loop) — Interface decisions
- [Zero-State Design](../designing-features) — Handling empty states
