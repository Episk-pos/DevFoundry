import React, { useState, useEffect } from 'react';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import { storage } from './services/storage';
import { createMessage } from './utils/messages';

function App() {
  const [messages, setMessages] = useState([]);
  const [currentUser] = useState('React User');

  // Load messages on mount
  useEffect(() => {
    const savedMessages = storage.readMessages();
    setMessages(savedMessages);
  }, []);

  // Save messages whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      storage.saveMessages(messages);
    }
  }, [messages]);

  const handleSendMessage = (text) => {
    const newMessage = createMessage(text, currentUser);
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleClearHistory = () => {
    if (confirm('Clear all chat history?')) {
      storage.clearHistory();
      setMessages([]);
    }
  };

  return (
    <div className="w-full max-w-md h-[600px] bg-white flex flex-col shadow-xl rounded-xl overflow-hidden">
      <header className="p-4 bg-blue-500 text-white flex justify-between items-center">
        <h1 className="text-lg font-semibold">💬 React Chat</h1>
        <div className="text-sm bg-white/20 px-2 py-1 rounded">
          User: {currentUser}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
        <MessageList messages={messages} currentUser={currentUser} />
      </main>

      <footer className="p-4 border-t border-gray-200">
        <MessageInput onSendMessage={handleSendMessage} />
        <button
          className="w-full mt-3 text-gray-500 text-sm underline hover:text-gray-700"
          onClick={handleClearHistory}
        >
          Clear History
        </button>
      </footer>
    </div>
  );
}

export default App;
