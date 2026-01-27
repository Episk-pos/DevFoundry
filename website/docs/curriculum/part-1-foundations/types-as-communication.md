---
sidebar_position: 5
title: "Types as Communication"
description: "How explicit type annotations improve AI-assisted development"
---

# Module 04: Types as Communication

**How explicit type annotations improve AI-assisted development**

---

## Introduction

You've written JavaScript that works. Functions take inputs, return outputs, and data flows through your programs. Why add complexity?

The traditional pitch for types focuses on catching bugs and enabling refactoring at scale. Those benefits are real, but there's a more immediate reason for AI-assisted developers:

**Types tell the AI exactly what you want.**

Without types, AI guesses what your functions expect and return. With types, AI knows. This changes everything about how effectively you can collaborate with AI tools.

---

## Concepts vs. Implementation

This module teaches type concepts using **TypeScript**, a typed superset of JavaScript. However, we'll be careful to distinguish:

| Symbol | Meaning |
|--------|---------|
| 📐 | **Concept** — A general idea that applies across languages |
| 🔷 | **TypeScript** — How this concept is implemented in TS specifically |

This matters because:
- The *concepts* transfer to Python, Go, Rust, Java, and many other languages
- The *syntax* is TypeScript-specific
- Understanding the difference helps you learn new languages faster

> **Extracurricular**: See [Types Across Languages](/docs/curriculum/part-1-foundations/extracurricular/types-across-languages) for the same concepts in Python and Go.

---

## Why Types? The AI Perspective

### The Problem: Implicit Contracts

Consider this JavaScript function:

```javascript
function sendMessage(content, conversation, sender) {
  // What is "content"? A string? An object?
  // What is "conversation"? An ID? An object?
  // What does this return?
}
```

When you ask an AI to "add message validation," the AI must guess:
- Is `content` a string? An object with text and attachments?
- Does `conversation` have an `id` property? A `participants` array?
- Should the function return the message? The conversation? Nothing?

These guesses lead to:
- Code that doesn't match your data structures
- Back-and-forth clarification
- Runtime errors when types don't align

### The Solution: Explicit Contracts

Now consider the same function with types:

```typescript
interface User {
  id: string;
  username: string;
  displayName: string;
}

interface Conversation {
  id: string;
  participants: User[];
  createdAt: number;
}

interface Message {
  id: number;
  content: string;
  conversation: Conversation;
  sender: User;
  timestamp: number;
}

function sendMessage(content: string, conversation: Conversation, sender: User): Message {
  // Now the AI knows EXACTLY what to work with
}
```

When you ask the same question with typed code, the AI:
- Knows `content` is a string
- Knows `conversation` has `participants` to validate against
- Knows it must return a `Message` with specific fields
- Generates code that matches your actual data structures

**Types are documentation that the AI (and compiler) can actually use.**

---

## 📐 Concept: What Is a Type?

A **type** describes the shape and behavior of data:
- What values are valid?
- What operations are allowed?
- What structure does it have?

Types exist in all programming, even in "untyped" languages. The difference is whether they're:
- **Implicit** (inferred at runtime) — JavaScript, Python, Ruby
- **Explicit** (declared at write-time) — TypeScript, Go, Rust, Java

| Typing Style | When Checked | Example Languages |
|--------------|--------------|-------------------|
| Dynamic | Runtime | JavaScript, Python, Ruby |
| Static | Compile-time | TypeScript, Go, Rust, Java |

> **Go Deeper**: The terms "strongly typed" vs "weakly typed" are often confused with "static" vs "dynamic." They're different concepts. See [Type Systems Explained](https://en.wikipedia.org/wiki/Type_system) for the full taxonomy.

---

## 📐 Concept: Primitive Types

**Primitives** are the basic building blocks — simple values that aren't composed of other values.

Common primitives across most languages:
- **Numbers** (integers, decimals)
- **Text** (strings, characters)
- **Boolean** (true/false)
- **Nothing** (null, undefined, nil, None)

### 🔷 TypeScript Primitives

```typescript
// Numbers (TypeScript doesn't distinguish int vs float)
let timestamp: number = 1706300400000;
let messageCount: number = 3;

// Strings
let content: string = "Hello";

// Booleans
let isRead: boolean = true;

// Null and undefined (both exist in TS)
let replyToId: number | null = null;
let nickname: string | undefined = undefined;
```

Note: TypeScript has a single `number` type for all numeric values. Other languages (Go, Rust, Java) distinguish between integers and floating-point numbers.

---

## 📐 Concept: Composite Types

**Composite types** are built from other types — they have structure.

Common patterns:
- **Arrays/Lists** — Ordered collections of same-type values
- **Objects/Structs/Records** — Named fields of possibly different types
- **Tuples** — Fixed-length ordered collections (like coordinates)
- **Maps/Dictionaries** — Key-value pairs

### 🔷 TypeScript Arrays

```typescript
// Array of numbers
let timestamps: number[] = [1706300400000, 1706300500000, 1706300600000];

// Array of strings
let messages: string[] = ["Hello", "Welcome"];

// Alternative syntax (same meaning)
let usernames: Array<string> = ["alice", "bob"];
```

### 🔷 TypeScript Objects and Interfaces

```typescript
// Inline object type
let message: { content: string; timestamp: number } = {
  content: "Hello",
  timestamp: 1706300400000
};

// Named interface (preferred for reuse)
interface Message {
  id: number;
  content: string;
  timestamp: number;
  sender: string;
}

let greeting: Message = {
  id: 1,
  content: "Hello",
  timestamp: 1706300400000,
  sender: "alice"
};
```

**Why interfaces?**
- Reusable across multiple variables and functions
- Self-documenting (the name conveys intent)
- AI can reference them by name in generated code

> **Go Deeper**: TypeScript also has `type` aliases which are similar to `interface`. The differences are subtle — interfaces are generally preferred for object shapes, types for unions and more complex compositions. See [TypeScript Handbook: Types vs Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces).

---

## 📐 Concept: Function Signatures

A **function signature** declares:
- What parameters the function accepts (and their types)
- What value the function returns (and its type)

This is the *contract* of the function — what it promises to do.

### 🔷 TypeScript Function Types

```typescript
// Parameters and return type
function formatTimestamp(timestamp: number, locale: string): string {
  return new Date(timestamp).toLocaleString(locale);
}

// With complex types
function findMessage(id: number): Message | null {
  // Returns a Message if found, null if not
}

// Functions that don't return a value
function logMessage(message: Message): void {
  console.log(message);
}
```

The `| null` and `| undefined` patterns are critical — they make the AI explicitly handle missing data.

---

## 📐 Concept: Union Types

A **union type** says "this value can be one of several types."

This is powerful for modeling real-world data where values have alternatives.

### 🔷 TypeScript Union Types

```typescript
// Can be a string or null
let username: string | null = null;

// Can be one of specific string values
type MessageType = "text" | "image" | "system";
let msgType: MessageType = "text";

// Can be different object shapes
type MessageContent =
  | { type: "text"; text: string }
  | { type: "image"; url: string; caption: string }
  | { type: "system"; event: string };
```

When AI sees union types, it knows to handle each case:

```typescript
function renderMessage(content: MessageContent): string {
  // AI will generate a switch or if/else for each type
  switch (content.type) {
    case "text":
      // AI knows content.text exists here
      return content.text;
    case "image":
      // AI knows content.url exists here
      return `[Image: ${content.caption}]`;
    case "system":
      // AI knows content.event exists here
      return `** ${content.event} **`;
  }
}
```

> **Go Deeper**: This pattern is called "discriminated unions" or "tagged unions." It's a fundamental pattern in typed functional programming. Languages like Rust (`enum`), Haskell (`data`), and F# have first-class support for this.

---

## 📐 Concept: Generics

**Generics** let you write code that works with multiple types while maintaining type safety.

Think of generics as "type variables" — placeholders that get filled in when you use the code.

### 🔷 TypeScript Generics

```typescript
// A function that works with any array type
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

// TypeScript infers T from usage
let firstNumber = getFirst([1, 2, 3]);       // T is number
let firstName = getFirst(["a", "b", "c"]);   // T is string

// An interface that works with any item type
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Used with specific types
let messagesResponse: ApiResponse<Message[]>;
let conversationResponse: ApiResponse<Conversation>;
```

**For now**: You don't need to write generics yourself — just recognize them when you see them (like `Array<T>` or `Promise<T>`). AI-generated code will use them appropriately.

> **Go Deeper**: Generics get complex fast — constraints, multiple type parameters, conditional types. See [TypeScript Handbook: Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) when you're ready to go deeper.

---

## Getting Started with TypeScript

TypeScript requires a compilation step — your `.ts` files are converted to `.js` before running. This involves some tooling that we'll explain fully in a later module. For now, **just follow along with these commands** to get a working setup.

### Quick Setup (Copy-Paste)

```bash
# In your project folder, run these commands:
npm init -y
npm install typescript ts-node --save-dev
npx tsc --init
```

That's it. You now have TypeScript ready.

### Running TypeScript Files

```bash
# Run a TypeScript file directly (for development)
npx ts-node src/index.ts

# Or compile to JavaScript first, then run
npx tsc
node dist/index.js
```

### What Just Happened?

Don't worry about understanding every detail right now:

- `npm init -y` — Creates a project configuration file
- `npm install ...` — Downloads the TypeScript tools
- `npx tsc --init` — Creates `tsconfig.json` (TypeScript settings)
- `npx ts-node` — Runs TypeScript directly without manual compilation

> **Coming Later**: Module 05 covers build tools in depth — what these commands do, why we need them, and how to customize them. For now, just use them.

### One Setting to Know

Open `tsconfig.json` and find the `"strict"` setting. Make sure it's `true`:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

This enables full type checking. It's the whole point of using TypeScript.

---

## Practical Patterns for AI-Assisted Development

### Pattern 1: Define Types First

Before writing logic, define your data shapes:

```typescript
// 1. Define the types
interface User {
  id: string;
  username: string;
  displayName: string;
  status: "online" | "offline" | "away";
}

interface Message {
  id: number;
  content: string;
  timestamp: number;
  sender: User;
}

interface Conversation {
  id: string;
  messages: Message[];
  participants: User[];
}

// 2. Now ask AI to implement functions
// "Implement a function that finds the most recent message in a Conversation"
```

**Why this works**: The AI has complete context about your data before generating logic.

### Pattern 2: Use Strict Null Checks

Always be explicit about when values can be missing:

```typescript
// BAD: Unclear if user might not exist
function getUsername(userId: string): string {
  // ...
}

// GOOD: Explicit that user might not be found
function getUsername(userId: string): string | null {
  // AI will generate null-handling logic
}
```

### Pattern 3: Prefer Specific Union Types Over Generic Strings

```typescript
// BAD: Any string is valid
type Status = string;

// GOOD: Only specific values are valid
type Status = "pending" | "processing" | "completed" | "failed";
```

AI will generate exhaustive handling for specific unions. Generic strings require guessing.

### Pattern 4: Use Interfaces for API Boundaries

When your code talks to external systems (APIs, databases, files), define interfaces:

```typescript
// What the API returns
interface ApiMessage {
  message_id: number;       // Note: API uses snake_case
  message_content: string;
  created_at: number;
}

// What your app uses internally
interface Message {
  id: number;
  content: string;
  timestamp: number;
}

// Transform function
function toMessage(api: ApiMessage): Message {
  return {
    id: api.message_id,
    content: api.message_content,
    timestamp: api.created_at
  };
}
```

---

## Common TypeScript Patterns You'll See

### Optional Properties

```typescript
interface User {
  id: string;
  username: string;
  displayName?: string;      // Optional (might not exist)
  avatarUrl?: string;
}
```

### Readonly Properties

```typescript
interface Config {
  readonly apiUrl: string;    // Cannot be changed after creation
  readonly maxRetries: number;
}
```

### Extending Interfaces

```typescript
interface BaseEntity {
  id: number;
  createdAt: number;
}

interface Message extends BaseEntity {
  content: string;
  sender: string;
}
```

### Index Signatures

```typescript
// Object with dynamic keys
interface UnreadCounts {
  [conversationId: string]: number;
}

let unreadCounts: UnreadCounts = {
  "conv-123": 5,
  "conv-456": 2
};
```

---

## Exercise 1: Add Types to Existing Code

Take this JavaScript function and add TypeScript types:

```javascript
function countUnreadMessages(messages, userId) {
  let count = 0;
  for (let message of messages) {
    if (!message.readBy.includes(userId)) {
      count += 1;
    }
  }

  return count;
}
```

<details>
<summary>Solution</summary>

```typescript
interface Message {
  id: number;
  content: string;
  readBy: string[];
}

function countUnreadMessages(
  messages: Message[],
  userId: string
): number {
  let count = 0;
  for (let message of messages) {
    if (!message.readBy.includes(userId)) {
      count += 1;
    }
  }

  return count;
}
```

Note: We created a `Message` interface even though we only need the `readBy` field. This makes the code more readable and reusable.

</details>

---

## Exercise 2: Design Types for a Feature

You're adding user presence tracking. Design types for:
- Users have presence status (online, offline, away)
- Each status has an optional status message
- Users can set when they were last active

Don't implement the logic — just define the types.

<details>
<summary>Solution</summary>

```typescript
type PresenceStatus = "online" | "offline" | "away";

interface UserPresence {
  userId: string;
  status: PresenceStatus;
  statusMessage?: string;  // Optional custom message
  lastActiveAt: number;    // Timestamp of last activity
}

interface User {
  id: string;
  username: string;
  displayName: string;
  presence: UserPresence;
}

// Could also define default status messages
const defaultStatusMessages: Record<PresenceStatus, string> = {
  online: "Available",
  offline: "Offline",
  away: "Away from keyboard"
};
```

</details>

---

## Exercise 3: Types and AI Assistance

1. Take the untyped `sendMessage` function from earlier in this module
2. Paste it into an AI and ask: "Add validation to ensure the sender is a participant in the conversation"
3. Note what the AI assumes about the data structure
4. Now paste the typed version with interfaces
5. Ask the same question
6. Compare the results

Reflect: How did explicit types change the AI's response?

---

## Exercise 4: Find the Type Error

This TypeScript code has a type error. Find it without running the code:

```typescript
interface Message {
  id: number;
  content: string;
  timestamp: number;
}

function formatTimestamp(message: Message): string {
  return new Date(message.createdAt).toISOString();
}
```

<details>
<summary>Solution</summary>

The error is on line 8: `message.createdAt` should be `message.timestamp`.

The `Message` interface has a `timestamp` property, not `createdAt`. TypeScript would catch this at compile time with an error like:

```
Property 'createdAt' does not exist on type 'Message'. Did you mean 'timestamp'?
```

This is the power of types — catching errors before runtime.

</details>

---

## What We Skipped (For Now)

TypeScript has many advanced features. You'll encounter these later:

| Feature | What It Does | When You'll Need It |
|---------|--------------|---------------------|
| Type assertions | Override inferred types | Working with external data |
| Type guards | Narrow types in conditionals | Complex union handling |
| Mapped types | Transform types programmatically | Library development |
| Conditional types | Types that depend on other types | Advanced generics |
| Declaration files | Type definitions for JS libraries | Using untyped packages |

For now, focus on:
- Primitives, arrays, objects
- Interfaces for data shapes
- Function parameter and return types
- Union types for alternatives

> **Go Deeper**: The [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) is excellent. Work through it when you're comfortable with the basics.

---

## Key Takeaways

1. **Types are communication** — They tell AI (and future you) exactly what data looks like

2. **Concepts vs. syntax** — The idea of "a function takes X and returns Y" is universal; `function foo(x: X): Y` is TypeScript-specific

3. **Define types first** — Before asking AI to implement logic, define your data shapes

4. **Strict mode is your friend** — `"strict": true` catches more errors and gives AI more constraints to work with

5. **Start simple** — Primitives, interfaces, function signatures, unions. Leave generics and advanced features for later.

---

## What's Next

- **[Example: Chat CLI (TypeScript)](/docs/examples/chat-cli-typescript)** — The familiar CLI app, now with types
- **[Extracurricular: Types Across Languages](/docs/curriculum/part-1-foundations/extracurricular/types-across-languages)** — See these same concepts in Python and Go
- **Module 05: Build Tools and Modern Development** — Package managers, bundlers, and the JavaScript ecosystem

---

*Types aren't about being "correct" — they're about being explicit. The more explicit you are, the better AI can help you.*
