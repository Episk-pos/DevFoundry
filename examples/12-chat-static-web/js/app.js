import { createMessage } from './messages.js';
import { readMessages, saveMessage, clearHistory } from './storage.js';
import { initDisplay, renderMessages } from './display.js';
import { getCurrentUser } from './users.js';

const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const clearBtn = document.getElementById('clear-history');

const currentUser = getCurrentUser();

/**
 * Main application loop.
 */
function init() {
    initDisplay(currentUser);
    refreshMessages();

    // Handle form submission
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = messageInput.value.trim();
        
        if (text) {
            const newMessage = createMessage(text);
            saveMessage(newMessage);
            messageInput.value = '';
            refreshMessages();
        }
    });

    // Handle clear history
    clearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all messages?')) {
            clearHistory();
            refreshMessages();
        }
    });
}

function refreshMessages() {
    const messages = readMessages();
    renderMessages(messages, currentUser);
}

// Start the app
init();
