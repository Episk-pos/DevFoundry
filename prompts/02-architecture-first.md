# Architecture-First Prompting

**Build features by describing structure, not just functionality**

---

## Overview

**Architecture-first prompting** means giving AI assistants the context they need to generate code that fits your system, not generic code that might work.

This template is for:
- Building new features
- Adding components to existing projects
- Implementing requirements with architectural clarity

**Time investment**: 5-10 minutes to write a good prompt (saves hours of refactoring)

---

## Why Architecture-First?

### The Problem

❌ **Vague prompt**:
```
"Add a shopping cart to my app"
```

**AI generates**:
- Redux store (but you're using useState)
- Class components (but you're using functional)
- Inline styles (but you're using CSS modules)

**Result**: Code that doesn't fit. Hours spent adapting.

---

### The Solution

✅ **Architecture-first prompt**:
```
**System**: Lemonade stand SPA, React with hooks, no state library

**Architecture**:
- App.jsx holds state: {orders: [], total: 0}
- Components: OrderForm.jsx, OrderList.jsx

**Requirement**: Add shopping cart functionality
- Display all orders
- Allow removing items
- Show running total

**Constraints**:
- Use existing state structure
- Follow functional component pattern
- Match existing naming conventions

Please implement.
```

**AI generates**: Code that drops right in.

---

## The Architecture-First Template

```
**Context**: [Brief system description]

**Tech Stack**: [Languages, frameworks, libraries]

**Architecture** ([View Type]):
[Describe structure — files, components, data flow]

**Current State**: [What exists now]

**Requirement**: [What you need to add]

**Constraints**: [Requirements, limitations, patterns to follow]

**Expected Behavior**: [User flow or data flow]

Please implement [SPECIFIC THING].
```

---

## Template Deep Dive

### Section 1: Context

**Purpose**: Orient the AI to your project

**What to include**:
- Project name or description
- Stage of development (prototype, production, learning example)
- Relevant devfoundry example if applicable

**Example**:
```
**Context**:
I'm building the lemonade stand fullstack app from devfoundry
(examples/04-lemonade-fullstack). It's a learning project demonstrating
client/server architecture.
```

---

### Section 2: Tech Stack

**Purpose**: Specify exact technologies

**What to include**:
- Language and version (if relevant)
- Frameworks and libraries
- Build tools

**Example**:
```
**Tech Stack**:
- Frontend: React 18, Vite, TypeScript
- Backend: Node.js 18, Express 4.x
- Database: SQLite (better-sqlite3)
- No state management library (using useState + Context)
```

---

### Section 3: Architecture

**Purpose**: Show structure using architectural views

**What to include**:
- Specify which view (Module, Component-Connector, or Allocation)
- File/folder structure OR data flow OR deployment structure

**Module View Example**:
```
**Architecture** (Module View):
src/
  components/
    OrderForm.tsx
    OrderList.tsx
  utils/
    pricing.ts
  App.tsx
```

**Component-Connector View Example**:
```
**Architecture** (Component-Connector View):
User → OrderForm → App state → OrderList → Display
```

**Allocation View Example**:
```
**Architecture** (Allocation View):
Browser (React) ←HTTP→ Server (Express) ← SQLite
```

---

### Section 4: Current State

**Purpose**: Show what already exists

**What to include**:
- Existing code (relevant snippets)
- Current state shape
- Existing functions or components

**Example**:
```
**Current State**:

App.tsx holds this state:
```tsx
const [orders, setOrders] = useState<Order[]>([]);
const [total, setTotal] = useState<number>(0);
```

OrderForm.tsx accepts props:
```tsx
interface OrderFormProps {
  onAddOrder: (order: Order) => void;
}
```
```

---

### Section 5: Requirement

**Purpose**: Specify what you need

**What to include**:
- Feature description
- User-facing behavior
- Data changes needed

**Example**:
```
**Requirement**:
Add a "Remove Item" button to each order in OrderList.

Behavior:
- Each order row shows a "Remove" button
- Clicking removes that order from the state
- Total recalculates automatically
```

---

### Section 6: Constraints

**Purpose**: Specify limitations and patterns

**What to include**:
- Style guidelines (functional components, naming conventions)
- Performance requirements
- Compatibility needs
- Patterns to follow or avoid

**Example**:
```
**Constraints**:
- Must use functional components (no classes)
- Follow existing naming: camelCase for functions, PascalCase for components
- Keep components under 100 lines
- Reuse existing `calculateTotal` function from utils/pricing.ts
- No external libraries (use built-in React only)
```

---

### Section 7: Expected Behavior

**Purpose**: Describe the flow clearly

**What to include**:
- User interaction sequence
- Data transformations
- Visual updates

**Example**:
```
**Expected Behavior**:
1. User clicks "Remove" button on order #3
2. App state updates (removes order with id=3)
3. calculateTotal is called with new orders array
4. Total updates
5. OrderList re-renders without removed item
```

---

## Complete Example

### Scenario: Add Discount Feature

```
**Context**:
I'm building the lemonade stand SPA (devfoundry examples/03-lemonade-spa).
This is a learning project teaching React state management.

**Tech Stack**:
- React 18 (functional components with hooks)
- Vite (build tool)
- TypeScript
- No state library (plain useState)

**Architecture** (Module View):
src/
  components/
    OrderForm.tsx    (user input)
    OrderList.tsx    (displays orders)
    Summary.tsx      (displays totals)
  utils/
    pricing.ts       (has calculateTotal function)
  App.tsx            (holds state)

**Architecture** (Component-Connector View):
OrderForm → App.updateOrders() → calculateTotal → Summary.display()

**Current State**:

App.tsx:
```tsx
const [orders, setOrders] = useState<Order[]>([]);
const [subtotal, setSubtotal] = useState<number>(0);
```

utils/pricing.ts:
```tsx
export function calculateTotal(orders: Order[]): number {
  return orders.reduce((sum, order) => sum + (order.price * order.quantity), 0);
}
```

**Requirement**:
Add a discount system:
- If subtotal > $50, apply 10% discount
- Display subtotal, discount amount, and final total in Summary.tsx

**Constraints**:
- Create new function: calculateDiscount(subtotal: number): number in pricing.ts
- Modify App.tsx to store discount and finalTotal in state
- Update Summary.tsx to display all three values
- Must use existing calculateTotal function (don't modify it)
- Follow TypeScript best practices (explicit types)

**Expected Behavior**:
1. User adds orders until subtotal > $50
2. App calculates: discount = subtotal * 0.10
3. App calculates: finalTotal = subtotal - discount
4. Summary displays:
   - Subtotal: $52.00
   - Discount: $5.20
   - Final Total: $46.80

Please implement:
1. calculateDiscount function in utils/pricing.ts
2. Updated state management in App.tsx
3. Updated Summary component to display all values
```

---

## What Makes This Effective

✓ **AI knows the exact tech stack** (no wrong libraries)
✓ **AI sees the existing structure** (generates fitting code)
✓ **AI understands constraints** (follows patterns)
✓ **AI knows expected flow** (implements correctly)
✓ **Request is specific** (clear deliverables)

---

## Common Variations

### Variation 1: Referencing ADRs

If you have Architecture Decision Records:

```
**Context**:
Per ADR-0001, we use React functional components with hooks (no classes).
Per ADR-0002, we use Node + Express for backend.

[rest of prompt...]
```

---

### Variation 2: Referencing Diagrams

If you've drawn diagrams:

```
**Architecture** (Component-Connector View):

```mermaid
flowchart LR
    User --> OrderForm
    OrderForm --> App
    App --> OrderList
```

I want to add a ConfirmationModal between OrderForm and App:

User → OrderForm → ConfirmationModal → App

Please implement ConfirmationModal.tsx.
```

---

### Variation 3: Multi-File Changes

When changes span multiple files:

```
**Requirement**:
Add user authentication

**Files to modify**:
1. server/routes/auth.js (new file — login/signup endpoints)
2. server/middleware/auth.js (new file — JWT verification)
3. client/src/App.tsx (add login check, redirect if not authenticated)
4. client/src/components/Login.tsx (new file — login form)

Please implement each file with clear comments.
Show me the files one at a time, starting with server/routes/auth.js.
```

---

## Iteration Pattern

Architecture-first prompting enables clean iteration:

### Round 1: Core Implementation

```
[Full prompt as above]
Please implement the discount feature.
```

### Round 2: Refinement

```
Thanks! The discount logic works. Now I want to:
- Only apply discount to orders of "Lemonade" (not other items)
- Add a message: "You saved $X!"

Update the calculateDiscount function and Summary component.
```

### Round 3: Edge Cases

```
What happens if:
1. User removes items and subtotal drops below $50?
2. All items are removed?

Please handle these edge cases in App.tsx.
```

---

## Troubleshooting

### AI Generates Wrong Framework

**Problem**: You said React, but AI used Vue

**Fix**: Add to tech stack:
```
**Tech Stack**:
- React 18 (NOT Vue, NOT Angular)
```

---

### AI Ignores Existing Code

**Problem**: AI rewrites code you wanted to keep

**Fix**: Be explicit:
```
**Constraints**:
- DO NOT modify calculateTotal function
- DO NOT change existing state structure
- ONLY add new functionality
```

---

### AI Uses Wrong Patterns

**Problem**: AI uses class components when you wanted functional

**Fix**: Add to constraints:
```
**Constraints**:
- Functional components ONLY (no class components)
- Hooks for state (useState, useEffect)
- TypeScript with explicit types
```

---

## Checklist: Before Sending Prompt

- [ ] Specified tech stack clearly
- [ ] Described architecture (module/component/allocation view)
- [ ] Showed existing code (relevant snippets)
- [ ] Stated requirement clearly
- [ ] Listed constraints (patterns, conventions, limitations)
- [ ] Described expected behavior (user flow or data flow)
- [ ] Asked for specific deliverables

---

## Next Steps

### Practice

Use this template for:
- Exercises in devfoundry curriculum
- Your own projects
- Features in the lemonade stand examples

### Related Templates

- [03-debugging.md](03-debugging.md) — When things don't work
- [05-designing-features.md](05-designing-features.md) — Planning before building
- [06-iterative-refinement.md](06-iterative-refinement.md) — Improving code

---

## Summary

**Architecture-first prompting**:

1. ✓ Provide system context
2. ✓ Specify tech stack precisely
3. ✓ Show architecture (use views)
4. ✓ Describe current state (paste code)
5. ✓ State requirement clearly
6. ✓ List constraints explicitly
7. ✓ Describe expected behavior

**Result**: AI generates code that fits your system perfectly.

**Time saved**: Hours of refactoring → Minutes of clear prompting

---

**Ready to try?** Pick a feature from your current example and use this template!
