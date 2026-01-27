import React, { useState, useEffect } from 'react';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import { storage } from './services/storage';
import { createMessage } from './utils/messages';
import './App.css';

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
    <div className="chat-app">
      <header>
        <h1>💬 React Chat</h1>
        <div className="user-badge">User: {currentUser}</div>
      </header>

      <main>
        <MessageList messages={messages} currentUser={currentUser} />
      </main>

      <footer>
        <MessageInput onSendMessage={handleSendMessage} />
        <button className="btn-clear" onClick={handleClearHistory}>
          Clear History
        </button>
      </footer>
    </div>
  );
}

export default App;
