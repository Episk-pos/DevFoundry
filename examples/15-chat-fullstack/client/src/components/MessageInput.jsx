import React, { useState } from 'react';

function MessageInput({ onSendMessage }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        autoComplete="off"
      />
      <button type="submit" disabled={!text.trim()}>
        Send
      </button>
    </form>
  );
}

export default MessageInput;
