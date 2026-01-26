# Lemonade Stand CLI

> **Note**: This example is being replaced by the Chat App case study. See [ADR 005](../../adr/005-chat-app-case-study.md) for details. The code remains functional for reference, but new curriculum materials will use chat app examples.

A command-line ordering system — your first multi-file application.

**Full walkthrough**: [dev.episkopos.community/docs/examples/lemonade-cli](https://dev.episkopos.community/docs/examples/lemonade-cli)

## Quick Start

```bash
node src/index.js 1:2 4:1
```

Arguments are `itemId:quantity` pairs.

## What You'll Learn

- Organizing code across multiple files (modules)
- Arrays, objects, and data structures
- Command-line argument processing
- The reduce pattern for calculations

## Files

```
src/
├── index.js    # Entry point
├── menu.js     # Menu data
├── order.js    # Order processing
└── display.js  # Console output
```

---

*See the [full walkthrough](https://dev.episkopos.community/docs/examples/lemonade-cli) for detailed explanation and exercises.*
