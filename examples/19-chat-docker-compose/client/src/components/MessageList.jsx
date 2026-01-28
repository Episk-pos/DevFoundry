import React, { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';

function MessageList({ messages, currentUser }) {
  const endOfMessagesRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col gap-3">
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">No messages yet.</div>
      ) : (
        messages.map((msg) => (
          <MessageItem
            key={msg.id}
            message={msg}
            isOwn={msg.sender === currentUser}
          />
        ))
      )}
      <div ref={endOfMessagesRef} />
    </div>
  );
}

export default MessageList;
