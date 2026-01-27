# Chat CLI (TypeScript)

A TypeScript version of the Chat CLI that demonstrates how types serve as documentation and catch errors at compile time.

## What You'll Learn

- **Type Annotations**: Declaring what data looks like
- **Interfaces**: Defining shapes for objects (`Message`, `ChatHistory`)
- **Type Safety**: Catching bugs before runtime
- **TypeScript Compilation**: How `.ts` becomes `.js`

## Quick Start

```bash
npm install
npm start send "Hello world"
npm start read
```

## Project Structure

```
13-chat-cli-typescript/
├── package.json
├── tsconfig.json          # TypeScript configuration
├── src/
│   ├── index.ts          # Entry point
│   ├── types.ts          # Type definitions
│   ├── messages.ts       # Message creation and formatting
│   ├── storage.ts        # File persistence
│   └── display.ts        # Console output
├── dist/                  # Compiled JavaScript (generated)
└── data/
    └── messages.json      # Persisted messages (generated)
```

## Key Types

```typescript
// types.ts
export type UserId = string;

export interface Message {
  id: string;
  sender: UserId;
  content: string;
  timestamp: string; // ISO 8601
}

export interface ChatHistory {
  messages: Message[];
  lastUpdated: string;
}
```

## Commands

- `npm start send "<message>"` - Send a new message
- `npm start read` - Read all messages
- `npm start help` - Show help

## Development

```bash
npm run dev    # Watch mode - recompiles on changes
npm run build  # One-time compilation
```
