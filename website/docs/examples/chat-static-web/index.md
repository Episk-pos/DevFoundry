---
sidebar_position: 3
title: Chat Static Web
description: Browser-based chat with the same business logic
---

# Chat Static Web (Stage 2)

**The same chat app, now running in a browser**

---

## Overview

This example demonstrates a fundamental principle: **business logic is independent of I/O**. The message formatting logic from the CLI version works unchanged — only the storage (localStorage) and display (DOM) layers change.

**Why this matters:**
- Shows how the same logic runs in different environments
- Introduces browser APIs (DOM, localStorage, events)
- Demonstrates the power of separation of concerns
- Prepares you for modern frontend frameworks

---

## What You'll Learn

- **DOM Manipulation**: Updating the page dynamically
- **Event Listeners**: Handling form submissions and clicks
- **Browser Storage**: Using localStorage for persistence
- **CSS Layout**: Creating a modern chat UI with message bubbles
- **Reusable Logic**: Same message formatting, different I/O

---

## Prerequisites

- Completed [Chat CLI](/docs/examples/chat-cli)
- Basic HTML/CSS understanding
- A code editor with live server capability

---

## Project Structure

```
12-chat-static-web/
├── index.html        # Page structure
├── styles.css        # Chat UI styling
├── README.md
└── js/
    ├── app.js        # Entry point, event listeners
    ├── messages.js   # Same logic as CLI version
    ├── storage.js    # localStorage instead of files
    ├── display.js    # DOM manipulation
    └── users.js      # User identification
```

---

## Quick Start

### Option 1: VS Code Live Server
1. Open the folder in VS Code
2. Install the **Live Server** extension
3. Click "Go Live" in the bottom right

### Option 2: Command Line
```bash
cd examples/12-chat-static-web
npx serve .
```

Then open `http://localhost:3000` in your browser.

---

## Key Concepts

### 1. Same Logic, Different I/O

Compare the two versions:

| Aspect | CLI Version | Web Version |
|--------|-------------|-------------|
| Input | `process.argv` | DOM events |
| Storage | `fs` (JSON file) | `localStorage` |
| Output | `console.log` | DOM manipulation |
| Message logic | `messages.js` | `messages.js` (identical!) |

### 2. The Browser Triad

- **HTML**: Structure (what elements exist)
- **CSS**: Style (how elements look)
- **JavaScript**: Behavior (how elements respond)

### 3. Event-Driven Programming

Instead of running once and exiting, the web app waits for user interactions:

```javascript
form.addEventListener('submit', handleSendMessage);
```

---

## Curriculum Alignment

This example aligns with:
- **Module 03**: How the Web Works — HTTP, browsers, DOM
- **Module 11**: Static Website — Building without frameworks

---

## Next Steps

Ready to add types for better communication? Continue to [Chat CLI TypeScript](/docs/examples/chat-cli-typescript).

Or jump ahead to React: [Chat React SPA](/docs/examples/chat-react).

---

## Source Code

View the complete source: [`examples/12-chat-static-web/`](https://github.com/devfoundry/devfoundry/tree/main/examples/12-chat-static-web)
