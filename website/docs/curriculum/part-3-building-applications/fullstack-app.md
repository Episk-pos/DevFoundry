---
sidebar_position: 4
title: "Stage 4: Fullstack App"
description: "Adding an Express backend with database persistence to the Chat App"
---

# Stage 4: Fullstack App

**Adding an Express backend with database persistence to the Chat App**

---

## Learning Objectives

By the end of this stage, you will:

- Build an Express.js API server
- Design RESTful API endpoints
- Use SQLite for data persistence
- Connect React frontend to backend API
- Understand client-server architecture
- Handle errors across the stack

**Time**: 5-6 hours (reading + building)

---

## Introduction

Through Stages 1-3, all data lived in the browser. Refresh the page in a new browser? Data is gone. Two users can't see the same messages.

Stage 4 changes everything:

- **Server** handles business logic and data
- **Database** persists messages permanently
- **API** connects frontend to backend
- **Client** becomes a thin presentation layer

This is **real web application architecture**.

---

## Architecture Overview

### Before (Client-Only)

```
┌─────────────────────────────────────────────┐
│ Browser                                     │
│ ┌─────────────────────────────────────────┐ │
│ │ React App                               │ │
│ │ • UI Components                         │ │
│ │ • Business Logic                        │ │
│ │ • Data Storage (localStorage)           │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### After (Client-Server)

```
┌─────────────────────────────────────────────┐
│ Browser                                     │
│ ┌─────────────────────────────────────────┐ │
│ │ React App                               │ │
│ │ • UI Components                         │ │
│ │ • API Calls                             │ │
│ └─────────────────────────────────────────┘ │
└────────────────────┬────────────────────────┘
                     │ HTTP (REST API)
                     ▼
┌─────────────────────────────────────────────┐
│ Server                                      │
│ ┌─────────────────────────────────────────┐ │
│ │ Express.js                              │ │
│ │ • API Routes                            │ │
│ │ • Business Logic                        │ │
│ │ • Validation                            │ │
│ └─────────────────────────────────────────┘ │
│                    │                        │
│                    ▼                        │
│ ┌─────────────────────────────────────────┐ │
│ │ SQLite Database                         │ │
│ │ • Messages                              │ │
│ │ • Conversations                         │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

---

## Project Structure

```
chat-fullstack/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── api/               # NEW: API client
│   │   │   └── messages.js
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
├── server/                    # Express backend
│   ├── src/
│   │   ├── routes/
│   │   │   └── messages.js
│   │   ├── db/
│   │   │   ├── index.js
│   │   │   └── schema.sql
│   │   └── index.js
│   ├── package.json
│   └── data/                  # SQLite database file
│       └── chat.db
│
├── package.json               # Root package.json
└── README.md
```

---

## Part 1: Express Server Setup

### Initialize Server

```bash
mkdir -p server/src/routes server/src/db server/data
cd server
npm init -y
npm install express cors better-sqlite3
npm install -D nodemon
```

### Server Entry Point

Create `server/src/index.js`:

```javascript
const express = require('express');
const cors = require('cors');
const messagesRouter = require('./routes/messages');
const conversationsRouter = require('./routes/conversations');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/messages', messagesRouter);
app.use('/api/conversations', conversationsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### Package Scripts

Update `server/package.json`:

```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  }
}
```

---

## Part 2: Database Setup

### Schema Design

Create `server/src/db/schema.sql`:

```sql
-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    conversation_id INTEGER NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_conversations_updated_at ON conversations(updated_at);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
```

### Database Module

Create `server/src/db/index.js`:

```javascript
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Ensure data directory exists
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize database
const db = new Database(path.join(dataDir, 'chat.db'));

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Run schema
const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
db.exec(schema);

// Prepared statements for conversations
const createConversation = db.prepare(`
  INSERT INTO conversations (title)
  VALUES (@title)
`);

const getConversationById = db.prepare(`
  SELECT * FROM conversations WHERE id = ?
`);

const getAllConversations = db.prepare(`
  SELECT * FROM conversations ORDER BY updated_at DESC LIMIT 50
`);

const updateConversationTimestamp = db.prepare(`
  UPDATE conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = ?
`);

// Prepared statements for messages
const createMessage = db.prepare(`
  INSERT INTO messages (conversation_id, role, content)
  VALUES (@conversationId, @role, @content)
`);

const getMessageById = db.prepare(`
  SELECT * FROM messages WHERE id = ?
`);

const getMessagesByConversation = db.prepare(`
  SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC
`);

// Transaction for creating message and updating conversation
const insertMessage = db.transaction((messageData) => {
  const { conversationId, role, content } = messageData;

  // Insert message
  const result = createMessage.run({ conversationId, role, content });
  const messageId = result.lastInsertRowid;

  // Update conversation timestamp
  updateConversationTimestamp.run(conversationId);

  return messageId;
});

// Transaction for creating conversation with initial message
const insertConversation = db.transaction((conversationData) => {
  const { title, initialMessage } = conversationData;

  // Insert conversation
  const result = createConversation.run({ title });
  const conversationId = result.lastInsertRowid;

  // Insert initial message if provided
  if (initialMessage) {
    createMessage.run({
      conversationId,
      role: initialMessage.role,
      content: initialMessage.content
    });
  }

  return conversationId;
});

module.exports = {
  db,
  insertConversation,
  insertMessage,
  getConversationById,
  getMessageById,
  getMessagesByConversation,
  getAllConversations,
  updateConversationTimestamp
};
```

---

## Part 3: API Routes

### REST API Design

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/conversations | List recent conversations |
| GET | /api/conversations/:id | Get conversation with messages |
| POST | /api/conversations | Create new conversation |
| GET | /api/messages/:id | Get single message |
| POST | /api/messages | Create new message |

### Messages Router

Create `server/src/routes/messages.js`:

```javascript
const express = require('express');
const {
  insertMessage,
  getMessageById,
  getMessagesByConversation,
  getConversationById
} = require('../db');

const router = express.Router();

// GET /api/messages/:id - Get single message
router.get('/:id', (req, res) => {
  try {
    const message = getMessageById.get(req.params.id);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json(message);
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({ error: 'Failed to fetch message' });
  }
});

// POST /api/messages - Create message
router.post('/', (req, res) => {
  try {
    const { conversationId, role, content } = req.body;

    // Validation
    if (!conversationId || !role || !content) {
      return res.status(400).json({
        error: 'Missing required fields: conversationId, role, content'
      });
    }

    // Validate role
    if (!['user', 'assistant'].includes(role)) {
      return res.status(400).json({
        error: 'Invalid role. Must be "user" or "assistant"'
      });
    }

    // Check conversation exists
    const conversation = getConversationById.get(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    // Insert message
    const messageId = insertMessage({
      conversationId,
      role,
      content
    });

    // Return created message
    const message = getMessageById.get(messageId);
    res.status(201).json(message);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
```

### Conversations Router

Create `server/src/routes/conversations.js`:

```javascript
const express = require('express');
const {
  insertConversation,
  getConversationById,
  getMessagesByConversation,
  getAllConversations
} = require('../db');

const router = express.Router();

// GET /api/conversations - List conversations
router.get('/', (req, res) => {
  try {
    const conversations = getAllConversations.all();
    res.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
});

// GET /api/conversations/:id - Get single conversation with messages
router.get('/:id', (req, res) => {
  try {
    const conversation = getConversationById.get(req.params.id);

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    const messages = getMessagesByConversation.all(conversation.id);
    res.json({ ...conversation, messages });
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ error: 'Failed to fetch conversation' });
  }
});

// POST /api/conversations - Create conversation
router.post('/', (req, res) => {
  try {
    const { title, initialMessage } = req.body;

    // Validation
    if (!title) {
      return res.status(400).json({
        error: 'Missing required field: title'
      });
    }

    // Insert conversation
    const conversationId = insertConversation({
      title,
      initialMessage
    });

    // Return created conversation
    const conversation = getConversationById.get(conversationId);
    const messages = getMessagesByConversation.all(conversationId);

    res.status(201).json({
      ...conversation,
      messages
    });
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
```

---

## Part 4: Frontend API Client

### API Module

Create `client/src/api/messages.js`:

```javascript
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export async function createConversation(conversationData) {
  const response = await fetch(`${API_BASE}/conversations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(conversationData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create conversation');
  }

  return response.json();
}

export async function getConversation(conversationId) {
  const response = await fetch(`${API_BASE}/conversations/${conversationId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch conversation');
  }

  return response.json();
}

export async function getConversations() {
  const response = await fetch(`${API_BASE}/conversations`);

  if (!response.ok) {
    throw new Error('Failed to fetch conversations');
  }

  return response.json();
}

export async function sendMessage(messageData) {
  const response = await fetch(`${API_BASE}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(messageData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to send message');
  }

  return response.json();
}
```

### Updated Context

Update the ChatContext to use the API:

```jsx
// In ChatContext.jsx - update sendMessage

const sendMessage = async (content) => {
  const { conversationId } = chatState;

  try {
    // Send user message
    const userMessage = await sendMessageApi({
      conversationId,
      role: 'user',
      content
    });

    // Update local state
    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });

    return userMessage;
  } catch (error) {
    showNotification('error', error.message);
    throw error;
  }
};
```

### Updated Chat Component

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!messageText.trim()) return;

  setIsSubmitting(true);

  try {
    // Now actually calls the API
    await sendMessage(messageText);
    setMessageText('');
  } catch (error) {
    // Error already shown via notification
  } finally {
    setIsSubmitting(false);
  }
};
```

### Updated Conversation Page

```jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getConversation } from '../api/messages';

export default function ConversationPage() {
  const { conversationId } = useParams();
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchConversation() {
      try {
        const data = await getConversation(conversationId);
        setConversation(data);
      } catch (err) {
        setError('Could not load conversation');
      } finally {
        setLoading(false);
      }
    }

    fetchConversation();
  }, [conversationId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!conversation) return <div className="error">Conversation not found</div>;

  return (
    <main className="conversation-page">
      <div className="conversation-header">
        <h1>{conversation.title}</h1>
        <p className="conversation-id">Conversation #{conversation.id}</p>
      </div>

      <div className="messages-container">
        {conversation.messages.map(message => (
          <div key={message.id} className={`message ${message.role}`}>
            <div className="message-content">{message.content}</div>
            <div className="message-timestamp">
              {new Date(message.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <Link to="/" className="primary">Back to Conversations</Link>
    </main>
  );
}
```

---

## Part 5: Development Workflow

### Running Both Servers

Option 1: Two terminals
```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```

Option 2: Concurrently (add to root package.json)
```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev --prefix server\" \"npm run dev --prefix client\""
  }
}
```

### Vite Proxy (Optional)

Configure `client/vite.config.js` to proxy API requests:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
});
```

Then remove the base URL from API calls.

---

## Part 6: Error Handling

### Server-Side Errors

```javascript
// In routes/messages.js
router.post('/', async (req, res, next) => {
  try {
    // ... message creation logic
  } catch (error) {
    next(error); // Pass to error handler
  }
});

// In index.js - error handler middleware
app.use((err, req, res, next) => {
  console.error(err);

  // Don't leak internal errors to client
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500
    ? 'Internal server error'
    : err.message;

  res.status(statusCode).json({ error: message });
});
```

### Client-Side Error Handling

```jsx
// In API client
export async function sendMessage(messageData) {
  try {
    const response = await fetch(`${API_BASE}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData)
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || `HTTP ${response.status}`);
    }

    return response.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      // Network error
      throw new Error('Unable to connect to server');
    }
    throw error;
  }
}
```

---

## Exercise 1: Add Message Search Endpoint

Create an API endpoint to search messages:

1. Add `GET /api/messages/search` route
2. Accept query parameter for search term
3. Return matching messages across all conversations

<details>
<summary>Solution</summary>

```javascript
// server/src/routes/messages.js - add search route
const searchMessages = db.prepare(`
  SELECT m.*, c.title as conversation_title
  FROM messages m
  JOIN conversations c ON m.conversation_id = c.id
  WHERE m.content LIKE ?
  ORDER BY m.created_at DESC
  LIMIT 50
`);

router.get('/search', (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) {
      return res.status(400).json({ error: 'Search query must be at least 2 characters' });
    }

    const messages = searchMessages.all(`%${q}%`);
    res.json(messages);
  } catch (error) {
    console.error('Error searching messages:', error);
    res.status(500).json({ error: 'Failed to search messages' });
  }
});
```

</details>

---

## Exercise 2: Add Conversation History Page

Create a page showing recent conversations:

1. Add `ConversationHistoryPage` component
2. Add route `/conversations`
3. Fetch and display recent conversations
4. Show message count and last updated time
5. Link to conversation details

---

## Exercise 3: Input Validation

Add proper server-side validation:

1. Validate message content length (not empty, max 10000 chars)
2. Validate conversation title length
3. Sanitize input to prevent XSS
4. Return helpful error messages

---

## Exercise 4: Loading States

Add loading states to the frontend:

1. Show spinner while fetching conversations
2. Show spinner while sending messages
3. Handle slow network gracefully
4. Add retry button on failure

---

## Key Takeaways

1. **Separation of concerns** — Client handles UI, server handles data

2. **REST conventions** — GET reads, POST creates, PATCH updates

3. **Database transactions** — Atomic operations for data integrity

4. **Error handling everywhere** — Server, client, and network

5. **Environment variables** — Configure without code changes

6. **SQLite for simplicity** — No server setup, file-based storage

---

## What's Next

**[Stage 5: Deployed App](deployed-app)**

You'll learn:
- Deploying to production hosting
- Environment configuration
- CI/CD pipelines
- Production considerations

---

**You've completed Stage 4!** You now have a real fullstack application with persistent data. Stage 5 puts it on the internet.
