---
sidebar_position: 5
title: Chat React SPA
description: A React single-page application for chat
---

# Chat React SPA (Stage 3)

**Component-based chat with React**

---

## Overview

This example rebuilds the chat interface using React, demonstrating how modern frameworks handle UI complexity through components, state management, and declarative rendering.

**Why this matters:**
- Learn component-based architecture
- Understand state management with hooks
- See how React solves the "DOM update" problem
- Foundation for professional frontend development

---

## What You'll Learn

- **Components**: Breaking UI into reusable pieces
- **Props and State**: Data flow in React
- **Hooks**: `useState`, `useEffect` for state and side effects
- **JSX**: Writing HTML-like syntax in JavaScript
- **Vite**: Modern build tooling

---

## Prerequisites

- Completed [Chat Static Web](/docs/examples/chat-static-web)
- Understanding of vanilla DOM manipulation
- Node.js installed

---

## Project Structure

```
14-chat-react/
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── main.jsx           # Entry point
    ├── App.jsx            # Root component
    ├── App.css
    ├── components/
    │   ├── MessageList.jsx
    │   ├── MessageItem.jsx
    │   └── MessageInput.jsx
    ├── services/
    │   └── storage.js     # localStorage (still client-side)
    └── utils/
        └── messages.js    # Same message logic
```

---

## Quick Start

```bash
cd examples/14-chat-react
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Key Concepts

### 1. Components as Building Blocks

```jsx
// App.jsx
function App() {
  const [messages, setMessages] = useState([]);

  return (
    <div className="chat-app">
      <MessageList messages={messages} />
      <MessageInput onSend={handleSend} />
    </div>
  );
}
```

### 2. State Flows Down, Events Flow Up

- **Props** (data) flow from parent to child
- **Callbacks** (events) flow from child to parent

### 3. Declarative UI

Instead of manually updating the DOM, you describe what the UI should look like for any given state. React handles the updates.

```jsx
// Vanilla JS: manually update DOM
messageList.innerHTML += `<div>${message}</div>`;

// React: declare what to render
{messages.map(msg => <MessageItem key={msg.id} message={msg} />)}
```

---

## Curriculum Alignment

This example aligns with:
- **Module 06**: Frontend Frameworks & React
- **Module 13**: React SPA

---

## Next Steps

Ready to add a backend? Continue to [Chat Fullstack](/docs/examples/chat-fullstack).

---

## Source Code

View the complete source: [`examples/14-chat-react/`](https://github.com/devfoundry/devfoundry/tree/main/examples/14-chat-react)
