# Chat Static Web (Stage 2)

A browser-based chat interface that demonstrates how the same business logic can be adapted for a different I/O layer.

## What You'll Learn
- **DOM Manipulation**: Updating the web page dynamically as messages are sent.
- **Event Listeners**: Handling form submissions and button clicks.
- **Browser Storage**: Using `localStorage` for data persistence instead of the file system.
- **CSS Layout**: Creating a modern, responsive chat UI with "message bubbles."
- **Separation of Concerns**: Reusing the same logic for creating/formatting messages while changing the storage and display implementations.

## How to Run

Since this uses ES Modules, you need to serve it via a local web server to avoid CORS issues.

### Option 1: Using VS Code
- Open the folder in VS Code.
- Install the **Live Server** extension.
- Click "Go Live" in the bottom right corner.

### Option 2: Using Node.js
If you have `serve` or `http-server` installed:
```bash
npx serve .
```

## Structure
- `index.html`: The structure of the chat app.
- `styles.css`: The look and feel (bubbles, layout).
- `js/app.js`: Main entry point, sets up event listeners.
- `js/messages.js`: Business logic for message creation (shared logic with CLI).
- `js/storage.js`: Persistence using `localStorage`.
- `js/display.js`: Purely concerned with DOM manipulation.
- `js/users.js`: Identifies the current web user.
