import React, { useState, useEffect } from 'react';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import { api } from './services/api';
import { connectWebSocket } from './services/websocket';
import { createMessage } from './utils/messages';

function App() {
  const [messages, setMessages] = useState([]);
  const [currentUser] = useState('Realtime User');
  const [error, setError] = useState(null);

  // Initial load
  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await api.getMessages();
        setMessages(data);
      } catch (err) {
        setError('Could not connect to server.');
      }
    }
    loadHistory();

    // REAL-TIME: Connect to WebSocket
    const socket = connectWebSocket((payload) => {
      if (payload.type === 'new_message') {
        setMessages((prev) => {
          // Prevent duplicates if optimistic update already added it
          const exists = prev.some(m => m.id === payload.data.id);
          return exists ? prev : [...prev, payload.data];
        });
      }
    });

    return () => socket.close();
  }, []);

  const handleSendMessage = async (text) => {
    const newMessage = createMessage(text, currentUser);

    // Optimistic update
    setMessages((prev) => [...prev, newMessage]);

    try {
      await api.sendMessage(newMessage);
    } catch (err) {
      setError('Failed to send message.');
    }
  };

  return (
    <div className="w-full max-w-md h-[600px] bg-white flex flex-col shadow-xl rounded-xl overflow-hidden">
      <header className="p-4 bg-blue-500 text-white flex justify-between items-center">
        <h1 className="text-lg font-semibold">Real-time Chat</h1>
        <div className="text-sm bg-white/20 px-2 py-1 rounded">
          User: {currentUser}
        </div>
      </header>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 text-sm border-b border-red-200">
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
