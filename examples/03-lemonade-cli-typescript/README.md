# Lemonade Stand (TypeScript CLI)

**The same CLI application, now with explicit types**

---

## Overview

This is the TypeScript version of the lemonade stand CLI. It has the **exact same functionality** as the JavaScript version, but with explicit type annotations throughout.

**Why this example?**
- See how types are added to familiar code
- Understand the relationship between types and modules
- Practice the "define types first" pattern
- Compare AI-assisted development with and without types

**Time to complete**: 30-45 minutes

---

## What's Different from the JavaScript Version?

### New file: `src/types.ts`

All type definitions are centralized in one file:

```typescript
export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

// ... more types
```

### Functions have explicit signatures

JavaScript:
```javascript
function findItem(id) {
  // What type is id? What does this return?
}
```

TypeScript:
```typescript
function findItem(id: number): MenuItem | null {
  // Clear: takes a number, returns MenuItem or null
}
```

### Discriminated unions for parse results

```typescript
type ParseResult =
  | { success: true; data: ParsedArguments }
  | { success: false; error: string };
```

This pattern ensures you handle both success and failure cases.

---

## Prerequisites

- Completed [Module 04: Types as Communication](../../curriculum/part-1-foundations/04-types-as-communication.md)
- Completed [01-lemonade-cli](../01-lemonade-cli/) (JavaScript version)
- Node.js installed

---

## How to Run

```bash
# Install dependencies
cd examples/03-lemonade-cli-typescript
npm install

# Run with ts-node (no compilation needed)
npm start -- 1:2 4:1

# Or run directly
npx ts-node src/index.ts 1:2

# To compile to JavaScript
npm run build
node dist/index.js 1:2
```

---

## Project Structure

```
03-lemonade-cli-typescript/
├── package.json        # Project config + dependencies
├── tsconfig.json       # TypeScript configuration
├── README.md           # You're reading it
└── src/
    ├── types.ts        # 📐 All type definitions
    ├── menu.ts         # Menu data and lookup
    ├── order.ts        # Order processing logic
    ├── display.ts      # Terminal output
    └── index.ts        # Entry point
```

### File Responsibilities

| File | Purpose |
|------|---------|
| `types.ts` | Central type definitions — the "contract" for all data |
| `menu.ts` | Menu data and `findItem` function |
| `order.ts` | Order processing: `createOrderItem`, `calculateDiscount`, `processOrder` |
| `display.ts` | All `console.log` output functions |
| `index.ts` | Argument parsing and main orchestration |

---

## Comparing JavaScript vs TypeScript

### Before: JavaScript (`01-lemonade-cli`)

```javascript
// menu.js
const items = [
  { id: 1, name: "Lemonade", price: 2.50, description: "Classic" }
];

function findItem(id) {
  return items.find(item => item.id === id) || null;
}
```

Questions an AI might ask:
- What properties does each item have?
- What type is `id`?
- What gets returned if not found?

### After: TypeScript (`03-lemonade-cli-typescript`)

```typescript
// types.ts
export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
}

// menu.ts
import { MenuItem } from "./types";

const items: MenuItem[] = [
  { id: 1, name: "Lemonade", price: 2.50, description: "Classic" }
];

function findItem(id: number): MenuItem | null {
  return items.find(item => item.id === id) ?? null;
}
```

Now the AI knows:
- Items have `id`, `name`, `price`, `description`
- `findItem` takes a number
- `findItem` returns `MenuItem` or `null`

---

## Key TypeScript Patterns Used

### 1. Centralized Types

All types live in `types.ts` and are imported where needed:

```typescript
import { MenuItem, OrderItem, OrderSummary } from "./types";
```

### 2. Nullable Returns

Functions that might not find something return `T | null`:

```typescript
function findItem(id: number): MenuItem | null
function processOrder(...): OrderSummary | null
```

### 3. Discriminated Unions

Parse results use a union to represent success or failure:

```typescript
type ParseResult =
  | { success: true; data: ParsedArguments }
  | { success: false; error: string };

// Usage:
const result = parseArguments(args);
if (result.success) {
  // TypeScript knows result.data exists here
} else {
  // TypeScript knows result.error exists here
}
```

### 4. Readonly Arrays

Functions that shouldn't modify arrays declare them readonly:

```typescript
function showMenu(items: readonly MenuItem[]): void
```

---

## Exercises

### Exercise 1: Add a New Menu Item

Add "Frozen Lemonade" for $3.25 to the menu.

**Hint**: You only need to modify `menu.ts`. The types in `types.ts` don't change because `MenuItem` already defines the shape.

<details>
<summary>Solution</summary>

In `src/menu.ts`, add to the `items` array:

```typescript
{
  id: 5,
  name: "Frozen Lemonade",
  price: 3.25,
  description: "Blended with ice",
}
```

Run to verify: `npm start -- 5:1`

</details>

---

### Exercise 2: Add a Size Option

Modify the types to support sizes (small, medium, large) with different prices.

**Hint**: This requires changes to `types.ts` first, then the TypeScript compiler will tell you everywhere else that needs updating.

<details>
<summary>Solution</summary>

In `src/types.ts`, add a Size type and modify MenuItem:

```typescript
export type Size = "small" | "medium" | "large";

export interface MenuItem {
  id: number;
  name: string;
  basePrice: number;  // Changed from price
  description: string;
  sizes?: { [key in Size]?: number };  // Optional size multipliers
}
```

Now TypeScript will error everywhere `price` is used, guiding you to update:
- `menu.ts` - Add size pricing to items
- `order.ts` - Calculate price based on size
- `display.ts` - Show size in output
- Argument parsing to accept `id:quantity:size`

This is the power of types: change the contract, and the compiler shows you everything that needs updating.

</details>

---

### Exercise 3: Ask AI to Add a Feature

**With TUI tools (Claude Code, Codex CLI, etc.):**

```
Look at src/types.ts in this project.
I want to add a loyalty points system where customers earn 1 point per dollar spent.
How should I modify the types and logic?
```

**With chat tools (fallback):**

1. Copy the contents of `types.ts` into an AI chat
2. Ask: "Add a loyalty points system where customers earn 1 point per dollar spent"

**Compare**: Also try this with the JavaScript version (01-lemonade-cli). How did having explicit types change the AI's response?

---

### Exercise 4: Type Error Hunt

Introduce this bug in `order.ts`:

```typescript
export function createOrderItem(
  menuItem: MenuItem,
  quantity: number
): OrderItem {
  return {
    id: menuItem.id,
    name: menuItem.name,
    price: menuItem.cost,  // BUG: should be .price
    quantity: quantity,
    subtotal: menuItem.price * quantity,
  };
}
```

Run `npm run typecheck`. What error do you get?

<details>
<summary>Expected Error</summary>

```
error TS2551: Property 'cost' does not exist on type 'MenuItem'.
Did you mean 'price'?
```

TypeScript caught the typo at compile time, before you even ran the code.

</details>

---

## Type Checking Without Running

You can check types without running the code:

```bash
# Check types only (fast)
npm run typecheck

# Or directly:
npx tsc --noEmit
```

This is useful in CI/CD pipelines and before committing.

---

## Using AI with This Codebase

### With TUI Tools (Recommended)

TUI tools like Claude Code and Codex CLI can read your files directly:

```
Look at src/types.ts and src/order.ts.
I want to add a "buy 3 get 1 free" promotion for cookies.
How should I modify the discount logic?
```

The tool reads the files itself — no copy-paste needed. It has complete context about your data shapes.

**Point to types first:**
```
Read src/types.ts — these are my type definitions.
Now look at src/order.ts. I want to add quantity-based discounts.
```

### With Chat Tools (Fallback)

If using a chat-based tool, include:

1. **Always include `types.ts`** — It's the foundation
2. **Include the specific file you're working on**
3. **Describe what you want to add**

```
Here are my type definitions:
[paste types.ts]

Here's my order module:
[paste order.ts]

I want to add a "buy 3 get 1 free" promotion for cookies.
How should I modify the discount logic?
```

---

## What's Next

- **Module 05: Build Tools and Modern Development** — Understanding what `npm`, `tsc`, and `ts-node` actually do
- **[Lemonade Stand (Static Web)](../02-lemonade-static-web/)** — The browser version (currently JavaScript, could be converted to TypeScript as an exercise!)
- **[Types Across Languages](../../curriculum/part-1-foundations/extracurricular/types-across-languages.md)** — See these same patterns in Python and Go

---

*The code does the same thing. The types make the intent explicit. That's the whole difference — and it's a big one for AI-assisted development.*
