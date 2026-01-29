/**
 * Creates a new message object.
 */
export function createMessage(text, sender) {
    return {
        id: crypto.randomUUID(),
        sender: sender,
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
