---
sidebar_position: 4
title: Chat CLI (TypeScript)
description: The chat CLI with explicit type annotations
---

# Chat CLI (TypeScript)

**The familiar CLI app, now with types**

---

## Overview

This example takes the Chat CLI and adds TypeScript type annotations. You'll see how types serve as documentation and catch errors before runtime.

**Why this matters:**
- Types communicate intent to other developers (and AI assistants)
- Catch bugs at compile time, not runtime
- Better autocomplete and editor support
- Foundation for larger applications

---

## What You'll Learn

- **Type Annotations**: Declaring what data looks like
- **Interfaces**: Defining shapes for objects
- **Discriminated Unions**: Handling different message types
- **Type Compilation**: How TypeScript becomes JavaScript

---

## Prerequisites

- Completed [Chat CLI](/docs/examples/chat-cli)
- Node.js installed
- Basic understanding of the CLI version

---

## Project Structure

```
13-chat-cli-typescript/
├── package.json
├── tsconfig.json      # TypeScript configuration
└── src/
    ├── types.ts       # Message, User, Conversation types
    └── messages.ts    # Typed message operations
```

---

## Key Types

```typescript
// types.ts
interface Message {
  id: string;
  sender: string;
  content: MessageContent;
  timestamp: string;
}

type MessageContent =
  | { type: 'text'; text: string }
  | { type: 'image'; url: string; alt?: string }
  | { type: 'system'; event: string };
```

### Why Discriminated Unions?

The `type` field lets TypeScript know exactly what properties are available:

```typescript
function renderMessage(content: MessageContent) {
  switch (content.type) {
    case 'text':
      return content.text;  // TypeScript knows .text exists
    case 'image':
      return `[Image: ${content.alt}]`;  // TypeScript knows .url and .alt exist
    case 'system':
      return `** ${content.event} **`;
  }
}
```

---

## Quick Start

```bash
cd examples/13-chat-cli-typescript
npm install
npm run build   # Compile TypeScript
npm start       # Run the compiled JavaScript
```

---

## Curriculum Alignment

This example aligns with:
- **Module 04**: Types as Communication — Using types to express intent

---

## Next Steps

Ready for a modern frontend framework? Continue to [Chat React SPA](/docs/examples/chat-react).

---

## Source Code

View the complete source: [`examples/13-chat-cli-typescript/`](https://github.com/devfoundry/devfoundry/tree/main/examples/13-chat-cli-typescript)
