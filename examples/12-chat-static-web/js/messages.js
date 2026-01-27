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
 * Formats a timestamp for display.
 */
export function formatTime(isoString) {
    return new Date(isoString).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}
