---
sidebar_position: 2
title: Chat CLI
description: A multi-file command-line chat application
---

# Chat CLI (Stage 1)

**A simple command-line chat application demonstrating module organization**

---

## Overview

This example builds on Hello World by organizing code into multiple files with clear responsibilities. You'll see how to structure a real project and persist data to disk.

**Why this matters:**
- Demonstrates module separation (storage, messages, display)
- Shows the I/O/P model in a practical application
- Introduces file-based persistence
- Prepares you for multi-file web applications

---

## What You'll Learn

- **Module Separation**: Breaking code into logical files
- **Persistence**: Saving messages to a local JSON file
- **CLI Interaction**: Parsing command-line arguments
- **I/O/P Model Applied**:
  - **Input**: Command line arguments
  - **Processing**: Creating message objects with timestamps
  - **Output**: Console display and file storage

---

## Prerequisites

- Completed [Hello World Console](/docs/examples/hello-world-console)
- Node.js installed
- Basic understanding of functions

---

## Project Structure

```
11-chat-cli/
├── package.json
├── README.md
└── src/
    ├── index.js      # Entry point, CLI argument parsing
    ├── messages.js   # Message creation and formatting
    ├── storage.js    # File persistence (JSON)
    ├── display.js    # Console output formatting
    └── users.js      # User identification
```

---

## Quick Start

```bash
cd examples/11-chat-cli

# Send a message
npm start send "Hello DevFoundry!"

# Read message history
npm start read

# Get help
npm start help
```

---

## Key Concepts

### 1. Module Boundaries

Each file has a single responsibility:

| File | Responsibility |
|------|----------------|
| `index.js` | Parse arguments, orchestrate flow |
| `messages.js` | Create and format message objects |
| `storage.js` | Read/write to `messages.json` |
| `display.js` | Format output for console |
| `users.js` | Identify current user |

### 2. Business Logic is Separate from I/O

The `messages.js` module contains pure business logic — it doesn't know about files or the console. This same logic will work unchanged in the browser version.

### 3. Data Persistence

Messages are stored in a JSON file, demonstrating how applications maintain state between runs.

---

## Ask Better Questions (Use AI as a Guide)

When exploring this project, try asking your AI assistant specific questions that reference real files:

- *"What does the `createMessage` function in `src/messages.js` return, and why does it include a timestamp?"*
- *"In `src/index.js`, how does the app decide whether to run `send` or `read`?"*
- *"How does `src/storage.js` make sure existing messages aren't lost when a new one is saved?"*

Specific questions that name a file and a behavior get far better answers than vague ones. For a ready-made template you can copy and adapt, see the [Reading Code](/docs/prompts/reading-code) prompt guide.

---

## Curriculum Alignment

This example aligns with:
- **Module 02**: Anatomy of a Project — Understanding multi-file structure
- **Module 04**: Types as Communication — Message shape as a contract

---

## Next Steps

Ready to see the same logic in a browser? Continue to [Chat Static Web](/docs/examples/chat-static-web).

---

## Source Code

View the complete source: [`examples/11-chat-cli/`](https://github.com/devfoundry/devfoundry/tree/main/examples/11-chat-cli)
