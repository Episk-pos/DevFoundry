# Lemonade Stand (TypeScript CLI)

> **Note**: This example is being replaced by the Chat App case study. See [ADR 005](../../adr/005-chat-app-case-study.md) for details. The code remains functional for reference, but new curriculum materials will use chat app examples.

The same CLI application, now with explicit types.

**Full walkthrough**: [dev.episkopos.community/docs/examples/lemonade-cli-typescript](https://dev.episkopos.community/docs/examples/lemonade-cli-typescript)

## Quick Start

```bash
npm install
npm start -- 1:2 4:1
```

## What You'll Learn

- Adding types to familiar code
- Centralized type definitions (`types.ts`)
- Discriminated unions for parse results
- The "define types first" pattern for AI collaboration

## Files

```
src/
├── types.ts    # All type definitions
├── index.ts    # Entry point
├── menu.ts     # Menu data
├── order.ts    # Order processing
└── display.ts  # Console output
```

---

*See the [full walkthrough](https://dev.episkopos.community/docs/examples/lemonade-cli-typescript) for detailed explanation and exercises.*
