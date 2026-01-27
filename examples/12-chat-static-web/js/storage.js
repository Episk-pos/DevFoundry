const STORAGE_KEY = 'df-chat-messages';

/**
 * Reads all messages from localStorage.
 */
export function readMessages() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

/**
 * Appends a message to localStorage.
 */
export function saveMessage(message) {
    const messages = readMessages();
    messages.push(message);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

/**
 * Clears all chat history.
 */
export function clearHistory() {
    localStorage.removeItem(STORAGE_KEY);
}
