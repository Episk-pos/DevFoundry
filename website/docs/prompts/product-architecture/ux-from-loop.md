---
sidebar_position: 3
title: "UX from Loop"
description: "Design user interfaces that serve the minimal user loop"
---

# Designing UX from the Loop

**Every interface decision should support the loop**

---

## Overview

UX isn't decoration. It's the mechanism through which users complete loops.

Every UI element either:
- **Supports the loop** — helps users act, see feedback, receive value
- **Obstructs the loop** — adds friction, confusion, or delay
- **Is irrelevant** — doesn't serve the loop at all

This prompt template helps you make interface decisions grounded in your minimal user loop rather than aesthetic preferences or feature checklists.

---

## The Core UX Prompt

```
My minimal user loop:
**Action**: [WHAT USERS DO]
**Feedback**: [HOW THEY KNOW]
**Value**: [WHAT THEY GET]

Design the UI to optimize this loop:

1. **Entry Point**: How does the user start the loop?
   - What's visible when they arrive?
   - What's the obvious first action?
   - What's de-emphasized/hidden?

2. **Action UI**: How do they execute the action?
   - What inputs are needed?
   - What's the interaction pattern?
   - How is friction minimized?

3. **Progress UI**: How do they know it's working?
   - What happens immediately?
   - What indicates processing?
   - How long can they wait?

4. **Success UI**: How do they know they got value?
   - What changes visually?
   - What confirmation appears?
   - What's the next action?

5. **Failure UI**: How do they know it didn't work?
   - What error states exist?
   - How do we explain what went wrong?
   - What's the recovery path?
```

---

## Information Architecture from Loop

Use to organize content/features:

```
My loop: [DESCRIBE]

Current features/sections:
1. [FEATURE A]
2. [FEATURE B]
3. [FEATURE C]
...

Classify by loop relevance:

**Primary** (directly in the loop path):
- ...

**Supporting** (helps complete the loop better):
- ...

**Secondary** (separate loops or occasional use):
- ...

**Candidates for removal** (doesn't serve any loop):
- ...

Based on this, design navigation that:
- Makes primary actions immediately accessible
- Groups supporting features logically
- Tucks secondary features appropriately
- Removes or archives irrelevant features
```

---

## Single Screen Focus

Use to design individual screens:

```
I'm designing the [SCREEN NAME] screen.

This screen serves the loop by: [ROLE IN LOOP]

What the user wants to accomplish here:
[USER GOAL]

Design this screen:

**Hero Element**: What's the most important thing?
- What takes visual priority?
- What should they look at first?

**Primary Action**: What's the main thing to do?
- What button/action is most prominent?
- How obvious is it?

**Supporting Information**: What helps them act?
- What context do they need?
- What reduces anxiety?

**Secondary Actions**: What else might they do?
- Less prominent options
- Navigation to other parts

**What's NOT on this screen**:
- What might we be tempted to add that doesn't belong?
- What distractions could we remove?
```

---

## State Design

Use to design for all UI states:

```
For the [COMPONENT/SCREEN]:

Map all possible states:

**Empty State**: Nothing there yet
- What do users see?
- How do they add their first item?
- What guidance do we provide?

**Loading State**: Waiting for data
- What indicator do we show?
- How long before it feels slow?
- What can they do while waiting?

**Populated State**: Has content
- How is content organized?
- What actions are available?
- How do they add/modify?

**Error State**: Something went wrong
- What went wrong?
- Whose fault is it (system vs user)?
- What can they do about it?

**Edge States**:
- One item (different from many?)
- Maximum items (limits?)
- Partial data (some fields missing?)

Design for each state explicitly.
```

---

## Mobile vs Desktop from Loop

Use to make responsive decisions:

```
My loop: [DESCRIBE]

On mobile, the loop happens:
- **Context**: Where/when do they use mobile?
- **Constraints**: Smaller screen, touch, interruptions
- **Priorities**: What matters most on mobile?

On desktop, the loop happens:
- **Context**: Where/when do they use desktop?
- **Affordances**: Larger screen, keyboard, focused time
- **Priorities**: What's possible that isn't on mobile?

Design decisions:

**Same on both**:
- Core loop mechanics
- Essential feedback
- ...

**Mobile-first considerations**:
- What's hidden/collapsed?
- What gestures are used?
- ...

**Desktop enhancements**:
- What's expanded/visible?
- What keyboard shortcuts exist?
- ...

**Not supported on mobile** (if any):
- What requires desktop?
- How do we communicate this?
```

---

## Interaction Patterns for Loops

### Real-Time Feedback

```
My action: [ACTION]
Response time: [ESTIMATE]

Design real-time feedback:

**Immediate (0-100ms)**:
- What changes instantly on click/tap?
- Button states, animations, visual acknowledgment

**Short wait (100ms-1s)**:
- What loading indicator appears?
- Is it subtle or prominent?

**Medium wait (1-10s)**:
- What progress indication exists?
- Can they do something else meanwhile?

**Long wait (>10s)**:
- Do they stay on page or continue?
- How are they notified when done?

Apply optimistic UI where appropriate:
- What can we show as "done" before confirmation?
- How do we handle if it actually fails?
```

### Form Design

```
My loop requires this input: [WHAT]

Current form fields:
1. [FIELD] — Type: [X] — Required: [Y/N]
2. [FIELD] — Type: [X] — Required: [Y/N]
...

Optimize this form:

**Field reduction**:
- What can we remove?
- What can we combine?
- What can we default?

**Field ordering**:
- What order matches mental model?
- What creates momentum?

**Validation approach**:
- When do we validate (inline, on submit)?
- How do we show errors?
- What helper text prevents errors?

**Completion experience**:
- What happens on submit?
- What confirmation do they see?
```

### Data Display

```
I'm displaying: [DATA TYPE]
In this loop context: [ROLE IN LOOP]

Design the display:

**Information hierarchy**:
- What's the primary info (biggest/first)?
- What's secondary?
- What's metadata?

**Density tradeoffs**:
- How much should show at once?
- When do they need more?
- How do they drill in?

**Scannability**:
- How do they quickly find what they need?
- What patterns/groupings help?
- What visual indicators guide them?

**Actions on items**:
- What can they do with each item?
- How are actions accessed?
- What's the primary action?
```

---

## Component Decisions

```
I need a component for: [PURPOSE]

This component's role in the loop:
[DESCRIBE]

Options considered:
A) [COMPONENT TYPE A] — e.g., dropdown
B) [COMPONENT TYPE B] — e.g., radio buttons
C) [COMPONENT TYPE C] — e.g., toggle

Compare for my use case:

| Criteria | Option A | Option B | Option C |
|----------|----------|----------|----------|
| Clarity (is choice obvious?) | | | |
| Speed (how fast to use?) | | | |
| Error rate (how often wrong choice?) | | | |
| Mobile-friendliness | | | |
| Accessibility | | | |

For my specific loop and users, which is best and why?
```

---

## Feedback Language

```
For my loop's feedback moments, design the copy:

**Action Acknowledgment** (immediately after action):
- What do we say?
- How do we confirm we got it?

**Processing** (during system work):
- What indicates work is happening?
- Is there a message or just visual?

**Success** (loop completed):
- What's the success message?
- What's the tone?
- What's the next step?

**Failure Types**:

User error (they did something wrong):
- Message: [WHAT]
- Tone: [Helpful, not blaming]
- Recovery: [What to do]

System error (we messed up):
- Message: [WHAT]
- Tone: [Apologetic, clear]
- Recovery: [What we're doing about it]

Expected limitation (it can't do that):
- Message: [WHAT]
- Tone: [Clear explanation]
- Alternative: [What they can do instead]

Write specific copy for each scenario.
```

---

## Accessibility from Loop

```
My loop: [DESCRIBE]

Ensure the loop works for:

**Keyboard users**:
- Can they complete the loop without a mouse?
- What's the tab order?
- Are there keyboard shortcuts for common actions?

**Screen reader users**:
- Are all elements properly labeled?
- Are state changes announced?
- Is feedback conveyed non-visually?

**Motor impairments**:
- Are click targets large enough?
- Are required motions simple?
- Is there alternative to complex gestures?

**Visual impairments**:
- Is there sufficient color contrast?
- Does it work without color alone?
- Is text resizable?

**Cognitive considerations**:
- Is the loop learnable?
- Are instructions clear?
- Is there too much at once?

For each, identify current gaps and fixes.
```

---

## UX Audit Against Loop

```
Audit my current UI against the minimal loop:

For each loop step, rate 1-5:

**Starting the loop**:
- Can they find the entry point? [1-5]
- Is the first action obvious? [1-5]
- Are distractions minimized? [1-5]

**Executing the action**:
- Is input minimal? [1-5]
- Is it clear what to do? [1-5]
- Does it feel fast? [1-5]

**Receiving feedback**:
- Is acknowledgment immediate? [1-5]
- Is progress clear during wait? [1-5]
- Is success unmistakable? [1-5]

**Experiencing value**:
- Is the value visible? [1-5]
- Can they verify they got it? [1-5]
- Is next action clear? [1-5]

**Error handling**:
- Are errors explained? [1-5]
- Is recovery path clear? [1-5]
- Is frustration minimized? [1-5]

Lowest scores = highest priority improvements
```

---

## Checklist: UX from Loop

- [ ] Primary action is immediately visible
- [ ] Entry to loop is obvious
- [ ] Feedback exists for all states
- [ ] Success is unmistakably clear
- [ ] Errors explain recovery
- [ ] Mobile and desktop both work
- [ ] Accessibility basics covered
- [ ] No irrelevant elements competing

---

## Related Prompts

- [Discovering Your Loop](discovering-loops) — Define the loop first
- [Onboarding from Loop](onboarding-from-loop) — First-time experience
- [Designing Features](../designing-features) — Feature-level decisions
