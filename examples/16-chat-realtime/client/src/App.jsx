import React, { useState, useEffect } from 'react';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import { api } from './services/api';
import { connectWebSocket } from './services/websocket';
import { createMessage } from './utils/messages';
import './App.css';

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
    <div className="chat-app">
      <header>
        <h1>⚡ Real-time Chat</h1>
        <div className="user-badge">{currentUser}</div>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <main>
        <MessageList messages={messages} currentUser={currentUser} />
      </main>

      <footer>
        <MessageInput onSendMessage={handleSendMessage} />
      </footer>
    </div>
  );
}

export default App;
