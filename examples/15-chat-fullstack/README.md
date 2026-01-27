# Chat Fullstack (Stage 4)

A complete fullstack chat application with a React frontend, Express backend, and SQLite persistence.

## What You'll Learn
- **Client-Server Separation**: Understanding how the frontend (client) communicates with the backend (server) via an API.
- **REST API Design**: Implementing endpoints for GET (reading messages) and POST (sending messages).
- **Database Persistence**: Using SQLite to store messages permanently on the server's disk.
- **CORS**: Handling Cross-Origin Resource Sharing so the browser allows the React app to talk to the Express server.
- **State Synchronization**: Fetching data from a server and keeping the UI in sync.

## Structure
- `server/`: Express API with `better-sqlite3`.
  - `routes/`: API endpoint definitions.
  - `services/`: Database connection management.
  - `db/`: SQLite schema and data file.
- `client/`: React SPA (modified from Stage 3).
  - `services/api.js`: Logic for making HTTP requests to the backend.

## How to Run

1. Install dependencies:
   ```bash
   npm run install:all
   ```

2. Start both server and client:
   ```bash
   npm run dev
   ```

The frontend will be at `http://localhost:5173` (or similar) and the backend at `http://localhost:3001`.
