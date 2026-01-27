---
sidebar_position: 3
title: "Stage 3: React SPA"
description: "Converting the Chat App to a modern React single-page application"
---

# Stage 3: React SPA

**Converting the Chat App to a modern React single-page application**

---

## Learning Objectives

By the end of this stage, you will:

- Set up a React project with Vite
- Convert vanilla JS patterns to React components
- Use useState and useEffect hooks
- Compose components with props
- Implement client-side routing
- Share state with Context

**Time**: 5-6 hours (reading + building)

---

## Introduction

In Stage 2, we discovered patterns:
- Centralized state with update functions
- Declarative rendering from state
- Component-like structure for each section

**React formalizes these patterns.**

Instead of managing DOM updates manually, React:
- Compares old and new UI descriptions
- Updates only what changed
- Provides hooks for state and side effects
- Enables component composition

This stage rebuilds the chat app in React, showing how framework concepts map to what you already know.

---

## Project Setup

### Create with Vite

```bash
npm create vite@latest chat-react -- --template react
cd chat-react
npm install
npm run dev
```

You now have:
- React 18 with hot module replacement
- Fast development server
- Modern build pipeline

### Project Structure

```
chat-react/
├── public/
│   └── vite.svg
├── src/
│   ├── components/      # We'll add this
│   ├── context/         # We'll add this
│   ├── pages/           # We'll add this
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

### Install Dependencies

```bash
npm install react-router-dom
```

---

## Architectural Views

### Module View

```
src/
├── components/
│   ├── Header.jsx
│   ├── Message.jsx
│   ├── MessageList.jsx
│   ├── MessageInput.jsx
│   ├── UserInfo.jsx
│   └── Notification.jsx
├── context/
│   └── ChatContext.jsx
├── pages/
│   ├── ChatPage.jsx
│   ├── SettingsPage.jsx
│   └── HistoryPage.jsx
├── utils/
│   └── formatTime.js
├── App.jsx
└── main.jsx
```

### Component-Connector View

```mermaid
flowchart TD
    subgraph App
        Router[React Router]
        Context[ChatContext Provider]

        Router --> ChatPage
        Router --> SettingsPage
        Router --> HistoryPage

        Context --> ChatPage
        Context --> SettingsPage
        Context --> HistoryPage
    end

    ChatPage --> MessageList
    MessageList --> Message
    ChatPage --> MessageInput
    ChatPage --> UserInfo

    SettingsPage --> UserInfo
```

---

## Part 1: Data and Context

### Time Formatting Utility

Create `src/utils/formatTime.js`:

```javascript
export function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }
}
```

### Chat Context

Create `src/context/ChatContext.jsx`:

```jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { formatTime } from '../utils/formatTime';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [chat, setChat] = useState(() => {
    // Load from localStorage on init
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : {
      messages: [],
      username: '',
      userId: crypto.randomUUID()
    };
  });

  const [notification, setNotification] = useState(null);

  // Save to localStorage when chat changes
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(chat));
  }, [chat]);

  // Auto-dismiss notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const newMessage = {
      id: crypto.randomUUID(),
      text: text.trim(),
      sender: chat.username || 'Anonymous',
      senderId: chat.userId,
      timestamp: Date.now()
    };

    setChat(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));
    showNotification('success', 'Message sent!');
  };

  const deleteMessage = (messageId) => {
    setChat(prev => ({
      ...prev,
      messages: prev.messages.filter(msg => msg.id !== messageId)
    }));
  };

  const editMessage = (messageId, newText) => {
    setChat(prev => ({
      ...prev,
      messages: prev.messages.map(msg =>
        msg.id === messageId
          ? { ...msg, text: newText, edited: true }
          : msg
      )
    }));
  };

  const clearMessages = () => {
    setChat(prev => ({
      ...prev,
      messages: []
    }));
    localStorage.removeItem('chatMessages');
  };

  const setUsername = (name) => {
    setChat(prev => ({
      ...prev,
      username: name
    }));
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  const getMessageCount = () => chat.messages.length;

  const value = {
    chat,
    notification,
    sendMessage,
    deleteMessage,
    editMessage,
    clearMessages,
    setUsername,
    showNotification,
    getMessageCount
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
}
```

### Why Context?

In Stage 2, we passed state through function calls. In React:

- **Props** pass data parent to child
- **Context** shares data across many components
- Avoids "prop drilling" (passing props through many layers)

---

## Part 2: Components

### Header Component

Create `src/components/Header.jsx`:

```jsx
import { Link } from 'react-router-dom';
import { useChat } from '../context/ChatContext';

export default function Header() {
  const { chat, getMessageCount } = useChat();
  const messageCount = getMessageCount();

  return (
    <header className="header">
      <Link to="/" className="logo">
        <h1>Chat App</h1>
      </Link>
      <nav className="nav-links">
        <Link to="/" className="nav-link">
          Chat {messageCount > 0 && <span className="message-count">{messageCount}</span>}
        </Link>
        <Link to="/settings" className="nav-link">Settings</Link>
        <Link to="/history" className="nav-link">History</Link>
      </nav>
    </header>
  );
}
```

### Message Component

Create `src/components/Message.jsx`:

```jsx
import { useChat } from '../context/ChatContext';
import { formatTime } from '../utils/formatTime';

export default function Message({ message, isOwn }) {
  const { deleteMessage } = useChat();

  return (
    <div className={`message ${isOwn ? 'own' : ''}`}>
      <div className="message-header">
        <span className="message-sender">{message.sender}</span>
        <span className="message-time">{formatTime(message.timestamp)}</span>
      </div>
      <div className="message-content">
        <p className="message-text">{message.text}</p>
        {message.edited && <span className="edited-label">(edited)</span>}
      </div>
      {isOwn && (
        <button
          className="delete-btn"
          onClick={() => deleteMessage(message.id)}
          aria-label="Delete message"
        >
          x
        </button>
      )}
    </div>
  );
}
```

### MessageList Component

Create `src/components/MessageList.jsx`:

```jsx
import { useRef, useEffect } from 'react';
import Message from './Message';
import { useChat } from '../context/ChatContext';

export default function MessageList() {
  const { chat } = useChat();
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat.messages]);

  if (chat.messages.length === 0) {
    return (
      <div className="message-list">
        <p className="empty-message">No messages yet. Start the conversation!</p>
      </div>
    );
  }

  return (
    <div className="message-list">
      {chat.messages.map(message => (
        <Message
          key={message.id}
          message={message}
          isOwn={message.senderId === chat.userId}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
```

### MessageInput Component

Create `src/components/MessageInput.jsx`:

```jsx
import { useState } from 'react';
import { useChat } from '../context/ChatContext';

export default function MessageInput() {
  const { sendMessage } = useChat();
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      sendMessage(text);
      setText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <textarea
        className="message-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        rows={2}
      />
      <button
        type="submit"
        className="send-button primary"
        disabled={!text.trim()}
      >
        Send
      </button>
    </form>
  );
}
```

### UserInfo Component

Create `src/components/UserInfo.jsx`:

```jsx
import { useChat } from '../context/ChatContext';

export default function UserInfo() {
  const { chat } = useChat();

  return (
    <div className="user-info">
      <span className="user-avatar">
        {(chat.username || 'A')[0].toUpperCase()}
      </span>
      <span className="user-name">{chat.username || 'Anonymous'}</span>
    </div>
  );
}
```

### Notification Component

Create `src/components/Notification.jsx`:

```jsx
import { useChat } from '../context/ChatContext';

export default function Notification() {
  const { notification } = useChat();

  if (!notification) return null;

  return (
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  );
}
```

### SettingsForm Component

Create `src/components/SettingsForm.jsx`:

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../context/ChatContext';

export default function SettingsForm() {
  const navigate = useNavigate();
  const { chat, setUsername, clearMessages, showNotification } = useChat();

  const [formData, setFormData] = useState({
    username: chat.username
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 2) {
      newErrors.username = 'Username must be at least 2 characters';
    } else if (formData.username.length > 20) {
      newErrors.username = 'Username must be 20 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setUsername(formData.username);
    showNotification('success', 'Settings saved!');
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all messages?')) {
      clearMessages();
      showNotification('success', 'Chat history cleared');
    }
  };

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className={errors.username ? 'invalid' : ''}
          placeholder="Enter your username"
        />
        {errors.username && <span className="error-message">{errors.username}</span>}
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="secondary danger"
          onClick={handleClearHistory}
        >
          Clear Chat History
        </button>
        <button
          type="submit"
          className="primary"
        >
          Save Settings
        </button>
      </div>
    </form>
  );
}
```

---

## Part 3: Pages and Routing

### ChatPage

Create `src/pages/ChatPage.jsx`:

```jsx
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import UserInfo from '../components/UserInfo';
import { useChat } from '../context/ChatContext';

export default function ChatPage() {
  const { chat } = useChat();

  return (
    <main className="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <h2>Chat Room</h2>
          <UserInfo />
        </div>
        <MessageList />
        <MessageInput />
      </div>
    </main>
  );
}
```

### SettingsPage

Create `src/pages/SettingsPage.jsx`:

```jsx
import SettingsForm from '../components/SettingsForm';
import UserInfo from '../components/UserInfo';

export default function SettingsPage() {
  return (
    <main className="settings-page">
      <section className="settings-section">
        <h2>Settings</h2>
        <SettingsForm />
      </section>
    </main>
  );
}
```

### HistoryPage

Create `src/pages/HistoryPage.jsx`:

```jsx
import { useChat } from '../context/ChatContext';
import { formatTime, formatDate } from '../utils/formatTime';

export default function HistoryPage() {
  const { chat, getMessageCount } = useChat();

  // Group messages by date
  const groupedMessages = chat.messages.reduce((groups, message) => {
    const dateKey = formatDate(message.timestamp);
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(message);
    return groups;
  }, {});

  return (
    <main className="history-page">
      <div className="history-container">
        <h2>Chat History</h2>
        <p className="message-count">{getMessageCount()} messages total</p>

        {Object.keys(groupedMessages).length === 0 ? (
          <p className="empty-message">No message history yet.</p>
        ) : (
          Object.entries(groupedMessages).map(([date, messages]) => (
            <div key={date} className="history-group">
              <h3 className="history-date">{date}</h3>
              <div className="history-messages">
                {messages.map(message => (
                  <div key={message.id} className="history-item">
                    <span className="history-time">{formatTime(message.timestamp)}</span>
                    <span className="history-sender">{message.sender}:</span>
                    <span className="history-text">{message.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
```

### App with Router

Update `src/App.jsx`:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChatProvider } from './context/ChatContext';
import Header from './components/Header';
import Notification from './components/Notification';
import ChatPage from './pages/ChatPage';
import SettingsPage from './pages/SettingsPage';
import HistoryPage from './pages/HistoryPage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <ChatProvider>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
          <Notification />
        </div>
      </ChatProvider>
    </BrowserRouter>
  );
}
```

---

## Part 4: Styling

Update `src/App.css` with your styles from Stage 2, adapted for React's class-based approach. The CSS remains largely the same.

---

## Part 5: Comparing Patterns

### Stage 2 vs React

| Stage 2 (Vanilla) | Stage 3 (React) |
|-------------------|-----------------|
| `let state = {}` | `useState()` |
| `updateState(path, value)` | `setState()` |
| `render()` function | Component return |
| `innerHTML = template` | JSX |
| Event delegation | Direct handlers |
| Manual DOM updates | Virtual DOM diffing |
| Global state object | Context |
| `showPanel()` | React Router |

### What React Gives You

1. **Automatic re-rendering** — No manual `render()` calls
2. **Component encapsulation** — State and UI together
3. **Efficient updates** — Only changed DOM nodes update
4. **Declarative** — Describe what you want, not how
5. **Ecosystem** — Router, testing, dev tools

### What React Costs

1. **Learning curve** — New concepts (hooks, JSX)
2. **Build step required** — Can't just open HTML file
3. **Abstraction** — Further from the metal
4. **Bundle size** — More JavaScript to send

---

## Exercise 1: Create a Custom Hook

Extract the notification logic into a custom hook:

```jsx
// src/hooks/useNotification.js
export function useNotification() {
  // Implement: state, show function, auto-dismiss
}
```

<details>
<summary>Solution</summary>

```jsx
import { useState, useEffect, useCallback } from 'react';

export function useNotification(duration = 3000) {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), duration);
      return () => clearTimeout(timer);
    }
  }, [notification, duration]);

  const showNotification = useCallback((type, message) => {
    setNotification({ type, message });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return { notification, showNotification, hideNotification };
}
```

</details>

---

## Exercise 2: Add a 404 Page

Create a NotFoundPage component and add it to the router:

1. Create `src/pages/NotFoundPage.jsx`
2. Add a catch-all route `path="*"`
3. Include a link back to home

---

## Exercise 3: Persist with useEffect

Currently, we load from localStorage in useState initializer. Improve this:

1. Move localStorage logic to useEffect
2. Handle the case where localStorage is unavailable
3. Add error handling

---

## Exercise 4: Extract a useLocalStorage Hook

Create a reusable hook for localStorage:

```jsx
function useLocalStorage(key, initialValue) {
  // Returns [value, setValue] like useState
  // Automatically syncs to localStorage
}
```

---

## Exercise 5: Add Message Editing

Implement the ability to edit messages:

1. Add an "Edit" button to the Message component (only for own messages)
2. Create an EditMessageForm component
3. Use the existing `editMessage` function from the ChatContext
4. Show the "(edited)" label after a message is edited

---

## Key Takeaways

1. **React formalizes patterns** — useState, components, props are patterns you already know

2. **Context shares state** — Avoids prop drilling for global data

3. **Hooks handle effects** — useEffect for side effects, custom hooks for reuse

4. **Router handles navigation** — SPA navigation without page reloads

5. **Components compose** — Small pieces combine into complex UIs

6. **DevTools help** — React DevTools show component tree and state

---

## What's Next

**[Stage 4: Fullstack App](fullstack-app)**

You'll learn:
- Building an Express API backend
- Connecting React to a REST API
- Database persistence with SQLite
- Client-server architecture

---

**You've completed Stage 3!** You now have a modern React chat SPA. But the data still lives in the browser. Stage 4 adds a real backend with persistent storage and multi-user support.
