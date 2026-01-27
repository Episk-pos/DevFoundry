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

        // Tailwind classes for message bubble
        const baseClasses = 'max-w-[80%] p-2 px-3 rounded-lg shadow-sm';
        const ownClasses = 'self-end bg-green-100';
        const otherClasses = 'self-start bg-white';

        messageEl.className = `${baseClasses} ${isOwn ? ownClasses : otherClasses}`;
        messageEl.innerHTML = `
            <div class="flex justify-between text-xs text-gray-500 mb-1">
                <span class="font-medium">${escapeHTML(msg.sender)}</span>
                <span class="ml-2">${formatTime(msg.timestamp)}</span>
            </div>
            <div class="text-sm leading-relaxed">${escapeHTML(msg.content)}</div>
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
