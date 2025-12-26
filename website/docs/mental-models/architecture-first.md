---
sidebar_position: 4
title: Architecture-First Thinking
description: How to work effectively with AI coding assistants
---

# Architecture-First Thinking

**How to work effectively with AI coding assistants**

---

## Introduction

AI coding assistants (Claude, ChatGPT, GitHub Copilot, Cursor, etc.) are powerful — but only if you know how to guide them.

The key insight: **LLMs are autocomplete for systems, not syntax.**

- Bad: "Write a function that does X"
- Good: "Here's my system architecture. I need a function that fits here and does X."

**Architecture-first thinking** means providing context, constraints, and clarity before asking for code.

---

## The Problem: Vague Prompts Lead to Misaligned Code

### Scenario 1: No Context

**Prompt**:
```
"Create a shopping cart"
```

**AI generates**:
- Uses a different state management approach than your app
- Assumes a structure you don't have
- Includes features you don't need
- Misses features you do need

**Result**: You get code, but it doesn't fit. You spend hours adapting it.

---

### Scenario 2: With Architectural Context

**Prompt**:
```
I'm building a lemonade stand SPA with this architecture:

**Tech stack**: React (functional components), useState for state, no external state library

**Module structure**:
- App.jsx (holds global state)
- components/OrderForm.jsx
- components/OrderList.jsx
- utils/pricing.js (pure functions for calculations)

**Current state shape**:
{
  orders: [],        // array of {id, item, quantity, price}
  totalAmount: 0
}

**Flow**:
User enters order → OrderForm validates → App adds to orders array → OrderList displays

I need to implement the "Add to Order" function in App.jsx. It should:
1. Accept item, quantity, price from OrderForm
2. Create order object with unique ID
3. Update orders array immutably
4. Recalculate totalAmount

Please implement this function following React best practices.
```

**AI generates**:
- Matches your state structure
- Uses immutable updates
- Follows your naming conventions
- Fits into your existing architecture

**Result**: Drop it in and it works.

---

## Core Principle: Context is King

AI assistants work best when you provide:

### 1. Architectural Context
- What kind of system is this? (CLI, web app, API, etc.)
- What's the overall structure?
- What patterns are you using?

### 2. Constraints
- Technology choices (React, Vue, plain JS?)
- Requirements (must work offline, must be < 100 lines, etc.)
- Style guidelines (functional vs class components, naming conventions)

### 3. Module Context
- What files exist?
- What imports what?
- Where does this new code fit?

### 4. Behavioral Context
- What's the user flow?
- What's the data flow?
- What edge cases matter?

### 5. Vocabulary
- Use consistent terms
- Reference your own code ("`OrderForm` component", not "the form")

---

## The Architecture-First Prompt Template

Use this structure for feature requests:

```
**Context**: [Describe the system and current state]

**Architecture**: [Module view, component view, or allocation view]

**Requirement**: [What you need]

**Constraints**: [What limitations or requirements apply]

**Expected behavior**: [How it should work]
```

### Example: Add Discount Feature

```
**Context**:
I'm building a lemonade stand app. It's a React SPA with:
- App.jsx (holds state: {orders, subtotal, discount, finalTotal})
- components/OrderForm.jsx (user input)
- components/OrderSummary.jsx (displays totals)
- utils/pricing.js (contains calculateSubtotal)

**Architecture** (Component-Connector View):
OrderForm → App state → OrderSummary
calculateSubtotal is called when orders change

**Requirement**:
Add a discount system: 10% off when subtotal > $50

**Constraints**:
- Must be a pure function in utils/pricing.js
- Called from App.jsx after calculateSubtotal
- Must not modify existing calculateSubtotal function

**Expected behavior**:
1. If subtotal ≤ $50: discount = 0
2. If subtotal > $50: discount = subtotal * 0.10
3. finalTotal = subtotal - discount

Please implement:
1. calculateDiscount(subtotal) in utils/pricing.js
2. Update App.jsx to use it
```

**Result**: AI generates code that integrates seamlessly.

---

## Common Pitfalls and Fixes

### Pitfall 1: "Just make it work"

:::danger[Bad prompt]
"My lemonade stand app isn't calculating totals correctly. Fix it."
:::

**Problem**: AI doesn't know your architecture, so it guesses. Often introduces new bugs.

:::tip[Better prompt]
"In my lemonade stand app, totals are calculated in utils/pricing.js by the calculateTotal function:

[paste function]

Expected behavior: price * quantity for each item, then sum.
Actual behavior: getting NaN.

Sample input: `[{item: 'Lemonade', price: 2.50, quantity: 3}, ...]`

What's wrong and how should I fix it?"
:::

**Result**: AI can diagnose the specific issue.

---

### Pitfall 2: No Mention of Existing Code

:::danger[Bad prompt]
"Add a delete button to remove items from the order"
:::

**Problem**: AI doesn't know where the order list is rendered or how state is managed.

:::tip[Better prompt]
"In OrderList.jsx, I'm rendering orders from props (array of order objects).

Current code:
```jsx
{orders.map(order => (
  <li key={order.id}>{order.item} - {order.quantity}</li>
))}
```

I need to add a delete button to each item that calls props.onDeleteOrder(order.id).

Please update the JSX to include a delete button. Style it with a 'btn-delete' className."
:::

**Result**: AI modifies your exact code correctly.

---

### Pitfall 3: Assuming AI Remembers

**Problem**: In long conversations, AI may forget earlier context.

**Solution**: Re-state key architectural points in each prompt.

**Example**:
```
"(Reminder: This is a React functional component using useState. We're not using Redux.)

I need to add a loading state..."
```

---

## Effective Prompt Patterns

### Pattern 1: "Implement Component X"

```
**System**: Lemonade stand SPA, React + Vite

**Architecture**:
App.jsx contains state: { orders: [], subtotal: 0 }

**Task**:
Create components/OrderForm.jsx

**Requirements**:
- Props: onAddOrder (callback)
- Two inputs: item (dropdown: "Lemonade", "Iced Tea", "Water"), quantity (number)
- Button: "Add to Order"
- On submit: validate quantity > 0, call onAddOrder({item, quantity}), clear form

**Style**: Use semantic HTML, functional component, controlled inputs

Please implement OrderForm.jsx.
```

---

### Pattern 2: "Debug This Code"

```
**Context**: lemonade stand app, utils/pricing.js contains pricing logic

**Problem**: calculateTotal returns NaN

**Code**:
[paste the function]

**Expected**: sum of (price * quantity) for all items
**Actual**: NaN

**Sample input**:
`[{item: "Lemonade", price: 2.50, quantity: 3}, ...]`

What's the bug and how do I fix it?
```

---

### Pattern 3: "Refactor This"

```
**Context**: OrderList component has grown to 150 lines and handles both display and editing

**Current structure**:
- Displays list of orders
- Each item has inline edit functionality
- Handles delete
- Calculates line totals

**Goal**: Split into two components:
1. OrderList (display only, receives orders and callbacks)
2. OrderItem (individual order row, handles edit/delete)

**Constraints**:
- Keep existing prop interface for OrderList
- Maintain current behavior

Please show the refactored components.
```

---

### Pattern 4: "Explain This Code"

```
**Context**: I'm learning React and found this in the lemonade stand app

**Code**:
```jsx
useEffect(() => {
  const newTotal = orders.reduce((sum, order) => sum + (order.price * order.quantity), 0);
  setSubtotal(newTotal);
}, [orders]);
```

**Questions**:
1. What does useEffect do here?
2. Why is `orders` in the dependency array?
3. What's `reduce` doing?
4. What happens if I remove the dependency array?

Please explain in beginner-friendly terms with examples.
```

---

## Using Architectural Views in Prompts

Specify which view you're working in:

### Module View Prompt
```
"In the module view, my app has:
- src/components/*.jsx (UI components)
- src/utils/*.js (business logic)
- src/App.jsx (main component)

I want to add authentication. Where should I place:
1. Login/Signup components?
2. Authentication logic (token management)?
3. API call wrappers?

Suggest a file structure following the existing pattern."
```

### Component-Connector View Prompt
```
"In the component-connector view, my current flow is:

User → OrderForm → App state → OrderList → Display

I want to add a confirmation step:

User → OrderForm → (new) ConfirmationModal → App state → OrderList

How should I modify the flow? What props does ConfirmationModal need?"
```

### Allocation View Prompt
```
"In the allocation view:
- React app runs in browser
- Express API runs on Render
- SQLite database on same server as API

I want to add file uploads. Where should:
1. File validation happen? (client or server)
2. Files be stored? (server, or S3, or...?)
3. Upload progress be tracked?

Suggest an allocation strategy."
```

---

## Advanced: Providing ADRs to AI

If your project has ADRs (Architecture Decision Records), reference them in prompts:

```
"According to ADR-0003, we use functional components and hooks (no class components).

I need to implement a form with complex validation. Please use a custom hook
following our ADR conventions."
```

**Why this works**: ADRs codify decisions. AI can follow them consistently.

---

## Iterative Refinement

Architecture-first doesn't mean one-shot perfection. It means **structured iteration**.

### Iteration Loop:

1. **Prompt with architecture** → AI generates code
2. **Test** → Find issues
3. **Refine prompt** → Add constraints or clarify requirements
4. **AI updates code** → Improved version
5. Repeat until satisfactory

### Example Iteration:

**Round 1**:
```
"Create an OrderForm component with item and quantity inputs"
```

**Result**: Works, but no validation

**Round 2**:
```
"Update OrderForm to validate:
- Quantity must be > 0
- Show error message below input if invalid
- Disable submit button when invalid"
```

**Result**: Validation works, but UX is clunky

**Round 3**:
```
"Improve UX:
- Only show error after user has interacted (don't show on mount)
- Clear error when user fixes input
- Use 'error-text' className for styling"
```

**Result**: Polished component

---

## Summary

**Architecture-first thinking** means:

- **Provide context** before asking for code
- **Describe the system** (structure, flow, deployment)
- **Specify constraints** (tech, style, requirements)
- **Use architectural views** (module, component-connector, allocation)
- **Reference existing code** (don't assume AI knows your project)
- **Iterate deliberately** (refine prompts based on results)

### The Mental Shift

| Old way | Architecture-first way |
|---------|------------------------|
| "Build me a feature" | "Here's my system. This feature fits here. Build it to match." |
| "Fix this bug" | "Here's the module and expected behavior. What's wrong?" |
| "Add validation" | "This component receives props X and Y. Add validation following pattern Z." |
| "Explain this code" | "In the component-connector view, what's the flow here?" |

**Result**: AI becomes a true collaborator, not a magic box that sometimes works.

---

## Related Documentation

- [Flow-Based Development](flow-based-dev) — Core philosophy
- [Architectural Views](../architectural-views) — View types
- [Architecture-First Prompts](../prompts/architecture-first) — Prompt templates
- [ADRs](../adr/index) — Example architectural decisions

---

## Next Steps

Practice architecture-first prompting:

1. **Start small**: Use it for one feature
2. **Compare**: Try vague vs architecture-first prompts side-by-side
3. **Iterate**: Refine your prompts based on results
4. **Document**: Write ADRs to codify your architectural decisions
5. **Teach**: Explain your architecture to the AI (teaching forces clarity)

**Remember**: The goal isn't perfect prompts on the first try. It's structured thinking that leads to better collaboration.
