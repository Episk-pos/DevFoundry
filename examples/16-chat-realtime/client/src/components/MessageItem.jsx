import React from 'react';
import { formatTime } from '../utils/messages';

function MessageItem({ message, isOwn }) {
  return (
    <div className={`message-item ${isOwn ? 'own' : ''}`}>
      <div className="message-meta">
        <span className="sender">{message.sender}</span>
        <span className="time">{formatTime(message.timestamp)}</span>
      </div>
      <div className="message-content">
        {message.content}
      </div>
    </div>
  );
}

export default MessageItem;
