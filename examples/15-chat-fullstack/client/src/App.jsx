import React, { useState, useEffect } from 'react';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import { api } from './services/api';
import { createMessage } from './utils/messages';

function App() {
  const [messages, setMessages] = useState([]);
  const [currentUser] = useState('Fullstack User');
  const [error, setError] = useState(null);

  // Load messages on mount
  useEffect(() => {
    loadMessages();

    // Poll for new messages every 3 seconds (simple replacement for real-time)
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  async function loadMessages() {
    try {
      const data = await api.getMessages();
      setMessages(data);
      setError(null);
    } catch (err) {
      setError('Could not connect to server. Is the backend running?');
    }
  }

  const handleSendMessage = async (text) => {
    const newMessage = createMessage(text, currentUser);

    // Optimistic update
    setMessages((prev) => [...prev, newMessage]);

    try {
      await api.sendMessage(newMessage);
    } catch (err) {
      setError('Failed to send message.');
      // Refresh to sync state
      loadMessages();
    }
  };

  return (
    <div className="w-full max-w-md h-[600px] bg-white flex flex-col shadow-xl rounded-xl overflow-hidden">
      <header className="p-4 bg-blue-500 text-white flex justify-between items-center">
        <h1 className="text-lg font-semibold">Fullstack Chat</h1>
        <div className="text-sm bg-white/20 px-2 py-1 rounded">
          {currentUser}
        </div>
      </header>

      {error && (
        <div className="px-4 py-2 bg-red-100 text-red-700 text-sm">
          {error}
        </div>
      )}

      <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
        <MessageList messages={messages} currentUser={currentUser} />
      </main>

      <footer className="p-4 border-t border-gray-200">
        <MessageInput onSendMessage={handleSendMessage} />
      </footer>
    </div>
  );
}

export default App;
