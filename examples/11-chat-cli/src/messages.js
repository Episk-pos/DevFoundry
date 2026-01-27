import { getCurrentUser } from './users.js';

/**
 * Creates a new message object.
 */
export function createMessage(text) {
  return {
    id: crypto.randomUUID(),
    sender: getCurrentUser(),
    content: text,
    timestamp: new Date().toISOString()
  };
}

/**
 * Formats a message for display.
 */
export function formatMessage(message) {
  const time = new Date(message.timestamp).toLocaleTimeString();
  return `[${time}] ${message.sender}: ${message.content}`;
}
