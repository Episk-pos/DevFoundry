# Chat React SPA (Stage 3)

A modern React single-page application that demonstrates component composition, state management, and side effects.

## What You'll Learn
- **Component Architecture**: Breaking the UI into reusable pieces (`MessageList`, `MessageInput`, `MessageItem`).
- **State Management**: Using `useState` to manage messages and user information.
- **Side Effects**: Using `useEffect` for loading/saving to `localStorage` and auto-scrolling the chat.
- **Refs**: Using `useRef` to interact with the DOM (scrolling).
- **Modern Tooling**: Using Vite for a fast development experience.
- **Props**: Passing data and callbacks between components.

## How to Run

1. Navigate to the directory:
   ```bash
   cd examples/14-chat-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the provided URL in your browser.

## Structure
- `src/App.jsx`: Main application component, manages global state.
- `src/components/`: Reusable UI components.
- `src/services/storage.js`: Persistence logic.
- `src/utils/messages.js`: Business logic for message handling.
- `src/App.css`: Component-specific styling.
