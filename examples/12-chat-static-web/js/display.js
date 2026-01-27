import { formatTime } from './messages.js';

const messageList = document.getElementById('message-list');
const currentUserSpan = document.getElementById('current-user');

/**
 * Initializes the display with current user info.
 */
export function initDisplay(user) {
    currentUserSpan.textContent = user;
}

/**
 * Renders the entire message history.
 */
export function renderMessages(messages, currentUser) {
    messageList.innerHTML = '';
    messages.forEach(msg => {
        const messageEl = document.createElement('div');
        const isOwn = msg.sender === currentUser;
        
        messageEl.className = `message ${isOwn ? 'own' : ''}`;
        messageEl.innerHTML = `
            <div class="message-meta">
                <span class="sender">${msg.sender}</span>
                <span class="time">${formatTime(msg.timestamp)}</span>
            </div>
            <div class="message-content">${escapeHTML(msg.content)}</div>
        `;
        messageList.appendChild(messageEl);
    });
    
    // Scroll to bottom
    const container = document.getElementById('chat-container');
    container.scrollTop = container.scrollHeight;
}

/**
 * Basic HTML escaping for security.
 */
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
