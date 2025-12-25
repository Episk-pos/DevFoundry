# Debugging with AI Assistants

**Systematic problem-solving when something doesn't work**

---

## Overview

Debugging is finding and fixing problems in code. AI assistants can be powerful debugging partners — but only if you give them the right information.

This template is for:
- Code that doesn't work as expected
- Error messages you don't understand
- Behavior that seems wrong but isn't throwing errors

**Key insight**: The more precisely you describe the problem, the faster AI can help.

---

## The Debugging Template

```
**Context**: [System and file description]

**Problem**: [What's going wrong — be specific]

**Expected Behavior**: [What should happen]

**Actual Behavior**: [What actually happens]

**Code**:
[Paste the relevant code]

**Error Message** (if any):
[Paste the exact error]

**What I've Tried**:
[List debugging attempts]

What's causing this and how do I fix it?
```

---

## Template Deep Dive

### Section 1: Context

**Purpose**: Orient the AI to your system

**What to include**:
- Project name/type
- Relevant file(s)
- Tech stack

**Example**:
```
**Context**:
Lemonade stand CLI app (devfoundry examples/01-lemonade-cli).
Node.js, JavaScript. The issue is in src/pricing.js.
```

---

### Section 2: Problem

**Purpose**: State the issue clearly

**What to include**:
- Specific symptom (not just "it's broken")
- When it happens
- How to reproduce

**Good examples**:
- "Total shows NaN instead of a number"
- "App crashes when I enter a negative quantity"
- "Discount isn't applied even when subtotal > $50"

**Bad examples**:
- "It doesn't work"
- "Something's wrong"
- "Help"

---

### Section 3: Expected vs Actual Behavior

**Purpose**: Show the gap between intention and reality

**Expected behavior example**:
```
**Expected Behavior**:
When I enter quantity=3 and price=2.50, total should be 7.50
```

**Actual behavior example**:
```
**Actual Behavior**:
Total displays "NaN" regardless of input
```

---

### Section 4: Code

**Purpose**: Show AI what it's debugging

**What to include**:
- The relevant function or component
- Enough context (imports, related code)
- Line numbers if helpful

**Example**:
```javascript
// src/pricing.js
function calculateTotal(orders) {
  return orders.reduce((sum, order) => {
    return sum + order.price * order.quantity;
  }, 0);
}
```

---

### Section 5: Error Message

**Purpose**: Provide exact error details

**What to include**:
- Complete error message (don't paraphrase)
- Stack trace if available
- Console output

**Example**:
```
**Error Message**:
TypeError: Cannot read property 'price' of undefined
    at calculateTotal (src/pricing.js:3:24)
    at processOrder (src/app.js:15:12)
```

---

### Section 6: What I've Tried

**Purpose**: Prevent AI from suggesting things you already tried

**Example**:
```
**What I've Tried**:
- Checked that orders array isn't empty (it has 3 items)
- Console.logged each order (they all have price and quantity)
- Restarted the app
```

---

## Complete Example

### Scenario: NaN Total Bug

```
**Context**:
Lemonade stand CLI app (Node.js).
The pricing logic is in src/pricing.js.

**Problem**:
When calculating the total, the result is NaN instead of a number.

**Expected Behavior**:
With orders = [{item: "Lemonade", price: 2.50, quantity: 3}],
calculateTotal should return 7.50

**Actual Behavior**:
calculateTotal returns NaN

**Code**:
```javascript
// src/pricing.js
function calculateTotal(orders) {
  let total = 0;
  for (let i = 0; i <= orders.length; i++) {
    total += orders[i].price * orders[i].quantity;
  }
  return total;
}
```

**Error Message**:
No error thrown, but result is NaN

**What I've Tried**:
- Verified orders array has valid data
- Added console.log inside the loop (prints correctly for first 3 iterations)
- Checked price and quantity are numbers (they are)

What's causing this and how do I fix it?
```

**AI Response would identify**: The loop condition uses `<=` instead of `<`, causing an extra iteration that tries to access `orders[3]` which is undefined.

---

## Quick Debug Prompts

### For Error Messages

```
I got this error:
[PASTE ERROR]

In this code:
[PASTE CODE]

What does this error mean and how do I fix it?
```

### For Unexpected Behavior

```
This function should [EXPECTED], but it [ACTUAL].

[PASTE CODE]

Sample input: [INPUT]
Expected output: [EXPECTED OUTPUT]
Actual output: [ACTUAL OUTPUT]

What's wrong?
```

### For Silent Failures

```
This code runs without errors but doesn't do what I expect.

[PASTE CODE]

It should: [EXPECTED BEHAVIOR]
But: [ACTUAL BEHAVIOR]

I added console.log statements and found: [FINDINGS]

Why isn't it working?
```

---

## Common Bug Categories

### Category 1: Type Errors

**Symptoms**:
- "Cannot read property X of undefined"
- "X is not a function"
- "Cannot convert undefined to object"

**What to tell AI**:
```
I'm getting a type error:
[ERROR]

The variable I'm accessing is: [VARIABLE]
I expect it to be: [EXPECTED TYPE]
It's actually: [ACTUAL VALUE from console.log]

Code: [PASTE CODE]
```

---

### Category 2: Logic Errors

**Symptoms**:
- Wrong calculations
- Conditions not triggering
- Loops running wrong number of times

**What to tell AI**:
```
The logic isn't working correctly.

Expected: When [CONDITION], do [ACTION]
Actual: [WHAT'S HAPPENING INSTEAD]

Code:
[PASTE CODE]

I traced through and found:
- Variable X = [VALUE]
- Condition evaluates to [TRUE/FALSE]
```

---

### Category 3: State Issues

**Symptoms**:
- UI not updating
- Data disappearing
- Changes not persisting

**What to tell AI**:
```
State isn't updating correctly in my React component.

Expected: When user [ACTION], state should [CHANGE]
Actual: [WHAT HAPPENS]

Component code:
[PASTE CODE]

Current state shape: [STATE]
```

---

### Category 4: Async Issues

**Symptoms**:
- Data undefined on first render
- Operations happening out of order
- "Cannot read property of undefined" on API data

**What to tell AI**:
```
I have an async timing issue.

Expected: Data loads, then [NEXT STEP]
Actual: [NEXT STEP] happens before data loads

Code:
[PASTE CODE]

Console.log output shows this order:
1. [FIRST THING]
2. [SECOND THING]
3. [THIRD THING]
```

---

## Debugging Mindset

### Before Asking AI

**Quick checks** (30 seconds):
1. Typos? (camelCase, spelling)
2. File saved?
3. Right file being run?
4. Console.log shows what you expect?

### Self-Debugging Steps

1. **Isolate**: What's the smallest code that reproduces the bug?
2. **Trace**: Add console.log at key points
3. **Compare**: Expected vs actual at each step
4. **Hypothesize**: What could cause this difference?

### When to Ask AI

✓ Error message you don't understand
✓ Isolated the bug but don't see the issue
✓ Tried 3+ fixes and still stuck
✓ Need to understand why something works a certain way

---

## Iteration Pattern

### Round 1: Initial Debug

```
[Full debugging prompt with context, code, error, etc.]
What's causing this?
```

### Round 2: Follow-Up

```
I tried your suggestion. Now I get a different error:
[NEW ERROR]

Updated code:
[PASTE CODE]
```

### Round 3: Understanding

```
That fixed it! But I don't understand why.

Can you explain:
1. Why did the original code fail?
2. Why does the fix work?
3. How can I avoid this in the future?
```

---

## Rubber Duck Technique

Sometimes just writing the debug prompt helps you find the bug yourself.

**Pattern**:
1. Start writing the prompt
2. Explain the expected behavior
3. Explain the actual behavior
4. Describe what you've tried
5. Often: "Wait, I think I see it now..."

This is called **rubber duck debugging** — explaining the problem to something (even a rubber duck) often reveals the answer.

---

## Common Mistakes

### Mistake 1: Vague Problem Description

❌ "My code doesn't work"
✅ "calculateTotal returns NaN instead of a number"

---

### Mistake 2: Missing Code

❌ "Why doesn't my function work?"
✅ "Here's my function: [paste]. It returns X but should return Y."

---

### Mistake 3: Paraphrasing Errors

❌ "I get some kind of undefined error"
✅ "Error: TypeError: Cannot read property 'price' of undefined at line 12"

---

### Mistake 4: Not Showing What You Tried

❌ "I've tried everything"
✅ "I tried: checking if array is empty, logging the values, restarting the server"

---

## Checklist: Before Sending Debug Prompt

- [ ] Described the problem specifically
- [ ] Stated expected vs actual behavior
- [ ] Pasted relevant code
- [ ] Included exact error message (if any)
- [ ] Mentioned what you've already tried
- [ ] Checked for obvious issues first (typos, file saved)

---

## Related Templates

- [02-architecture-first.md](02-architecture-first.md) — Building features correctly from the start
- [04-reading-code.md](04-reading-code.md) — Understanding code that might be causing bugs
- [06-iterative-refinement.md](06-iterative-refinement.md) — Improving code quality to prevent bugs

---

## Summary

**Effective debugging prompts**:

1. ✓ State the problem specifically
2. ✓ Show expected vs actual behavior
3. ✓ Paste relevant code
4. ✓ Include exact error messages
5. ✓ List what you've already tried
6. ✓ Provide enough context (tech stack, file location)

**Remember**: AI can only debug what it can see. The more information you provide, the faster you'll get to the fix.

---

**Got a bug?** Use the template above and paste into your AI assistant!
