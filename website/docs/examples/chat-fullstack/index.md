---
sidebar_position: 6
title: Chat Fullstack
description: React frontend with Express backend and SQLite
---

# Chat Fullstack (Stage 4)

**Client-server architecture with a real database**

---

## Overview

This example splits the application into a React frontend and an Express backend with SQLite storage. Data now persists on the server, allowing multiple clients to share the same conversation.

**Why this matters:**
- Understand client-server communication (HTTP/REST)
- Learn server-side data persistence
- See how APIs create contracts between frontend and backend
- Foundation for real-world web applications

---

## What You'll Learn

- **REST APIs**: Designing endpoints for CRUD operations
- **Express.js**: Node.js web framework
- **SQLite**: Embedded relational database
- **Fetch API**: Making HTTP requests from React
- **CORS**: Cross-origin resource sharing

---

## Prerequisites

- Completed [Chat React SPA](/docs/examples/chat-react)
- Understanding of HTTP basics
- Node.js installed

---

## Project Structure

```
15-chat-fullstack/
├── package.json          # Monorepo scripts
├── server/
│   ├── package.json
│   ├── index.js          # Express server
│   ├── routes/
│   │   └── messages.js   # REST endpoints
│   ├── services/
│   │   └── database.js   # SQLite operations
│   └── db/
│       └── schema.sql    # Table definitions
└── client/
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── services/
        │   └── api.js    # Fetch calls to server
        └── ...           # React components
```

---

## Quick Start

```bash
cd examples/15-chat-fullstack

# Install all dependencies
npm install

# Start both server and client
npm run dev
```

- Server runs on `http://localhost:3001`
- Client runs on `http://localhost:5173`

---

## Key Concepts

### 1. REST API Design

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/messages` | List all messages |
| POST | `/api/messages` | Create a message |
| GET | `/api/messages/:id` | Get one message |
| DELETE | `/api/messages/:id` | Delete a message |

### 2. Client-Server Split

```
┌─────────────────┐         ┌─────────────────┐
│   React SPA     │  HTTP   │  Express API    │
│                 │◄───────►│                 │
│  fetch('/api')  │         │  REST routes    │
└─────────────────┘         └────────┬────────┘
                                     │
                            ┌────────▼────────┐
                            │     SQLite      │
                            └─────────────────┘
```

### 3. Data Persistence

Messages survive server restarts because they're stored in SQLite, not memory:

```sql
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  sender TEXT NOT NULL,
  content TEXT NOT NULL,
  timestamp TEXT NOT NULL
);
```

---

## Curriculum Alignment

This example aligns with:
- **Module 14**: Fullstack App — Client-server architecture

---

## Next Steps

Ready for real-time updates? Continue to [Chat Realtime](/docs/examples/chat-realtime).

---

## Source Code

View the complete source: [`examples/15-chat-fullstack/`](https://github.com/devfoundry/devfoundry/tree/main/examples/15-chat-fullstack)
