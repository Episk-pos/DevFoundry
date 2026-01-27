# Chat Real-time (Stage 5)

A real-time chat application using WebSockets for instantaneous message delivery, building on the Fullstack stage.

## What You'll Learn
- **Push vs. Poll**: Understanding why WebSockets are more efficient than HTTP polling for chat.
- **WebSocket Server**: Implementing a `ws` server in Node.js.
- **WebSocket Client**: Connecting to a socket from a React application.
- **Broadcasting**: Sending a message to all connected clients simultaneously.
- **Optimistic Updates**: Updating the UI immediately while the message travels to the server.

## Structure
- `server/`: 
  - `services/websocket.js`: Manages the WebSocket server and broadcasts.
  - `index.js`: Integrates HTTP and WebSocket servers.
- `client/`:
  - `services/websocket.js`: Client-side socket management and reconnection logic.

## How to Run

1. Install dependencies:
   ```bash
   npm run install:all
   ```

2. Start both server and client:
   ```bash
   npm run dev
   ```

Try opening the app in **two different browser tabs**. When you send a message in one, it will appear instantly in the other without a page refresh!
