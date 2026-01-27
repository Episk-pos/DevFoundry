---
sidebar_position: 7
title: Chat Realtime
description: WebSocket integration for instant message delivery
---

# Chat Realtime (Stage 5)

**Real-time messaging with WebSockets**

---

## Overview

This example adds WebSocket support so messages appear instantly without refreshing. You'll understand the difference between request-response (HTTP) and persistent connections (WebSocket).

**Why this matters:**
- Learn when to use WebSockets vs HTTP
- Understand connection state management
- See how real chat apps deliver messages instantly
- Foundation for collaborative features

---

## What You'll Learn

- **WebSockets**: Persistent, bidirectional communication
- **Push vs Poll**: Why polling is wasteful
- **Connection Management**: Handling connect/disconnect/reconnect
- **Server Broadcasting**: Sending to all connected clients

---

## Prerequisites

- Completed [Chat Fullstack](/docs/examples/chat-fullstack)
- Understanding of HTTP request-response model
- Node.js installed

---

## Project Structure

```
16-chat-realtime/
├── package.json
├── server/
│   ├── index.js              # Express + WebSocket server
│   ├── services/
│   │   ├── database.js
│   │   └── websocket.js      # WebSocket handler
│   └── routes/
│       └── messages.js
└── client/
    └── src/
        ├── services/
        │   ├── api.js
        │   └── websocket.js  # WebSocket client
        └── ...
```

---

## Quick Start

```bash
cd examples/16-chat-realtime

# Install dependencies
npm install

# Start server and client
npm run dev
```

Open multiple browser tabs to see real-time sync in action.

---

## Key Concepts

### 1. Push vs Poll

```
POLLING (wasteful)              WEBSOCKET (efficient)
──────────────────              ────────────────────

Client: "Any new?"              Client: "I'm listening"
Server: "No"                    Server: "OK, connected"
Client: "Any new?"                   ...
Server: "No"                    Server: "New message!"
Client: "Any new?"              Client: (receives instant)
Server: "Yes! Here"             Server: "Another one!"
                                Client: (receives instant)
```

### 2. WebSocket Lifecycle

```javascript
// Client
const ws = new WebSocket('ws://localhost:3001');

ws.onopen = () => console.log('Connected');
ws.onmessage = (event) => handleMessage(JSON.parse(event.data));
ws.onclose = () => console.log('Disconnected');
```

### 3. Server Broadcasting

When a message is sent, the server broadcasts to all connected clients:

```javascript
// Server
wss.clients.forEach(client => {
  if (client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(message));
  }
});
```

---

## Curriculum Alignment

This example demonstrates concepts beyond the current curriculum modules, preparing you for:
- Real-time collaborative applications
- Live notifications
- Multiplayer features

---

## Future Stages

The chat app trajectory continues with:
- **Stage 6-7**: Federation (cross-server messaging)
- **Stage 8**: Authentication (OAuth, sessions)
- **Stage 9**: P2P resilience (GunDB)

See [ADR 005: Chat App Case Study](/docs/adr) for the complete roadmap.

---

## Source Code

View the complete source: [`examples/16-chat-realtime/`](https://github.com/devfoundry/devfoundry/tree/main/examples/16-chat-realtime)
