# Iterative Refinement

**Improve existing code through systematic enhancement**

---

## Overview

Software is never "done." After the initial implementation works, there's always opportunity to improve clarity, performance, maintainability, and robustness.

This template is for:
- Refactoring code for clarity
- Optimizing performance
- Improving error handling
- Enhancing maintainability
- Adding polish and edge case handling

**Key insight**: Refinement is iterative. Make one type of improvement at a time.

---

## The Refinement Template

```
**Context**: [System and file description]

**Current Code**:
[Paste the code]

**What Works**: [What the code does correctly]

**What I Want to Improve**: [Specific improvement goal]

**Constraints**: [What shouldn't change]

Please suggest improvements. Explain the reasoning for each change.
```

---

## Types of Refinement

### 1. Clarity Refinement

Make code easier to understand:

```
**Current Code**:
[PASTE CODE]

**What I Want to Improve**:
Make this easier to read and understand.

Focus on:
- Better variable names
- Clearer function structure
- Helpful comments (where needed)
- Reducing cognitive load

Keep the functionality identical.
```

### 2. Performance Refinement

Make code faster or more efficient:

```
**Current Code**:
[PASTE CODE]

**What I Want to Improve**:
Optimize performance.

Current issue:
- [DESCRIBE PERFORMANCE PROBLEM — slow, high memory, etc.]

Constraints:
- Must maintain same functionality
- [OTHER CONSTRAINTS]

Show me:
1. What's causing the performance issue
2. How to fix it
3. Expected improvement
```

### 3. Error Handling Refinement

Make code more robust:

```
**Current Code**:
[PASTE CODE]

**What I Want to Improve**:
Add proper error handling.

Currently:
- [WHAT HAPPENS WHEN THINGS GO WRONG]

I need:
- Graceful handling of [ERROR CASES]
- Meaningful error messages for users
- Proper logging for debugging
```

### 4. Maintainability Refinement

Make code easier to modify:

```
**Current Code**:
[PASTE CODE]

**What I Want to Improve**:
Make this more maintainable for future changes.

Likely future changes:
- [CHANGE 1 that might happen]
- [CHANGE 2 that might happen]

Make it easier to:
- Add new [THING]
- Modify [THING]
- Test in isolation
```

---

## Complete Example

### Scenario: Refactor Pricing Logic

```
**Context**:
Lemonade stand CLI app, src/pricing.js
This calculates order totals and discounts.

**Current Code**:
```javascript
function calc(o) {
  let t = 0;
  for (let i = 0; i < o.length; i++) {
    t = t + o[i].p * o[i].q;
  }
  if (t > 50) {
    t = t - (t * 0.1);
  }
  if (t > 100) {
    t = t - 5;
  }
  return t;
}
```

**What Works**:
- Calculates total correctly
- Applies 10% discount over $50
- Applies extra $5 off over $100

**What I Want to Improve**:
1. Clarity: Names are cryptic (o, t, p, q)
2. Maintainability: Discount logic is hard to modify
3. Testability: Can't test discount logic separately

**Constraints**:
- Keep the same calculation logic
- Keep it in one file for now
- No external dependencies

Please suggest improvements. Explain the reasoning for each change.
```

---

## Refinement Patterns

### Pattern 1: Extract and Name

Turn anonymous logic into named functions:

```
**Request**:
In this code:
[PASTE CODE]

There are inline operations that would be clearer as named functions.

Identify them and extract into well-named helper functions.
Explain what each extracted function represents.
```

### Pattern 2: Replace Magic Numbers

Turn hardcoded values into named constants:

```
**Request**:
This code has magic numbers/strings:
[PASTE CODE]

Replace them with named constants.
Group related constants together.
Add comments explaining what they mean.
```

### Pattern 3: Simplify Conditionals

Make conditional logic clearer:

```
**Request**:
These conditionals are hard to follow:
[PASTE CODE]

Simplify by:
- Extracting complex conditions into named booleans
- Using early returns where appropriate
- Reducing nesting levels
```

### Pattern 4: Add Type Safety

Strengthen code with types:

```
**Request**:
This JavaScript code works but has no type safety:
[PASTE CODE]

Convert to TypeScript with:
- Explicit types for parameters and returns
- Interface definitions for data shapes
- Proper null/undefined handling
```

---

## Iterative Improvement Process

### Round 1: Make It Clear

```
Focus only on clarity:
[PASTE CODE]

- Better names
- Clearer structure
- No functionality changes

Show me the improved version.
```

### Round 2: Make It Robust

```
Now focusing on robustness:
[PASTE IMPROVED CODE FROM ROUND 1]

Add:
- Input validation
- Error handling
- Edge case coverage

What errors could occur and how should we handle them?
```

### Round 3: Make It Efficient

```
Now focusing on efficiency:
[PASTE IMPROVED CODE FROM ROUND 2]

Are there any performance issues?
If so, how can we optimize without sacrificing clarity?
```

### Round 4: Make It Testable

```
Now focusing on testability:
[PASTE IMPROVED CODE FROM ROUND 3]

How can we restructure this to be easier to test?
- What should be extracted?
- What dependencies should be injectable?
- Show me example tests for key functions.
```

---

## Code Review Prompts

### General Review

```
Review this code:
[PASTE CODE]

For each issue found, explain:
1. What the problem is
2. Why it's a problem
3. How to fix it
4. Priority (critical, important, minor, nitpick)
```

### Specific Concern Review

```
Review this code specifically for [CONCERN]:
[PASTE CODE]

[CONCERN] could be:
- Security vulnerabilities
- Performance issues
- Error handling gaps
- Accessibility problems
- Best practice violations
```

### "Teach Me" Review

```
I wrote this code:
[PASTE CODE]

It works, but I want to learn to write better code.

Show me:
1. What I did well
2. What could be improved
3. What a more experienced developer would do differently
4. Patterns I should learn
```

---

## Refactoring Safely

### Before Changing

```
I want to refactor this:
[PASTE CODE]

Before I start:
1. What tests should exist to verify behavior?
2. What are the key behaviors to preserve?
3. What's a safe sequence of changes?
```

### After Changing

```
I refactored this code:

**Before**:
[PASTE ORIGINAL]

**After**:
[PASTE REFACTORED]

Did I:
1. Preserve all functionality?
2. Introduce any bugs?
3. Miss any edge cases?
4. Actually improve it?
```

---

## Common Refinements

### Simplify Nested Code

```
This code is too nested:
[PASTE DEEPLY NESTED CODE]

Flatten it using:
- Early returns
- Guard clauses
- Extracted functions

Keep the same logic but reduce indentation levels.
```

### Consolidate Duplication

```
These code sections are similar:
[PASTE SECTION 1]

[PASTE SECTION 2]

How can I consolidate them into a reusable function?
What parameters would it need?
```

### Improve Naming

```
These names could be better:
[PASTE CODE WITH UNCLEAR NAMES]

Suggest better names for:
- Variables
- Functions
- Parameters

Explain why the new names are clearer.
```

### Add Documentation

```
This code needs documentation:
[PASTE CODE]

Add:
- JSDoc/TSDoc comments for functions
- Brief inline comments for complex logic
- README section if appropriate

Don't over-document obvious code.
```

---

## When NOT to Refactor

### Ask First

```
I'm tempted to refactor this:
[PASTE CODE]

Before I do:
1. Is this refactoring actually needed?
2. What's the benefit vs. risk?
3. Is now the right time?
4. Am I refactoring or gold-plating?
```

### Signs to Stop

- Working on code you don't need to change
- Making it "prettier" without functional benefit
- Refactoring when you should be shipping
- Changing patterns just for preference

---

## Balancing Quality and Progress

### MVP Refinement

```
This is MVP code that works:
[PASTE CODE]

What's the minimum refinement needed before shipping?
Focus only on:
- Critical bugs
- Security issues
- Obvious maintainability problems

Don't gold-plate.
```

### Tech Debt Assessment

```
This code has accumulated issues:
[PASTE CODE]

Categorize the problems:
- Must fix now (blockers)
- Should fix soon (important)
- Can fix later (nice to have)
- Don't bother (not worth it)

Help me prioritize.
```

---

## Checklist: Before Refactoring

- [ ] Code currently works (don't refactor broken code)
- [ ] Tests exist or can be added first
- [ ] Clear goal for improvement
- [ ] Time allocated for the work
- [ ] Won't break dependent code
- [ ] Change is actually needed

---

## Checklist: After Refactoring

- [ ] All tests still pass
- [ ] Behavior unchanged (unless intentional)
- [ ] Code is actually clearer/better
- [ ] Documented what changed and why
- [ ] Didn't introduce new bugs

---

## Related Templates

- [02-architecture-first.md](02-architecture-first.md) — Building it right the first time
- [03-debugging.md](03-debugging.md) — When refinement introduces bugs
- [05-designing-features.md](05-designing-features.md) — Designing before implementing

---

## Summary

**Effective refinement prompts**:

1. ✓ Show the current code
2. ✓ State what works (so it's preserved)
3. ✓ Specify the improvement goal
4. ✓ List constraints (what shouldn't change)
5. ✓ Request explanations (not just code)
6. ✓ Iterate one improvement type at a time

**Remember**: Good code isn't written, it's rewritten. Use AI to accelerate refinement while you build understanding of why improvements work.

---

**Ready to improve?** Paste your working code and pick one thing to make better!
