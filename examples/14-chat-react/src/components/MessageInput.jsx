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
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        autoComplete="off"
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
      >
        Send
      </button>
    </form>
  );
}

export default MessageInput;
