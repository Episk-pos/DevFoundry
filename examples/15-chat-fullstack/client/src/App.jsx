import React, { useState, useEffect } from 'react';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import { api } from './services/api';
import { createMessage } from './utils/messages';
import './App.css';

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
    <div className="chat-app">
      <header>
        <h1>💬 Fullstack Chat</h1>
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
