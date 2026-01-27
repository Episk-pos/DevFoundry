import React from 'react';
import { formatTime } from '../utils/messages';

function MessageItem({ message, isOwn }) {
  return (
    <div
      className={`max-w-[85%] p-2 px-3 rounded-lg shadow-sm ${
        isOwn ? 'self-end bg-green-100' : 'self-start bg-white'
      }`}
    >
      <div className="flex justify-between gap-4 text-xs text-gray-500 mb-1">
        <span className="font-medium">{message.sender}</span>
        <span>{formatTime(message.timestamp)}</span>
      </div>
      <div className="text-sm leading-relaxed">{message.content}</div>
    </div>
  );
}

export default MessageItem;
