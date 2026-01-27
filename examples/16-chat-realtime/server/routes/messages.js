import express from 'express';
import db from '../services/database.js';
import { broadcast } from '../services/websocket.js';

const router = express.Router();

// Get all messages
router.get('/', (req, res) => {
  const messages = db.prepare('SELECT * FROM messages ORDER BY timestamp ASC').all();
  res.json(messages);
});

// Create a message
router.post('/', (req, res) => {
  const { id, sender, content, timestamp } = req.body;
  
  if (!sender || !content) {
    return res.status(400).json({ error: 'Sender and content are required' });
  }

  const newMessage = {
    id: id || crypto.randomUUID(),
    sender,
    content,
    timestamp: timestamp || new Date().toISOString()
  };

  const stmt = db.prepare(
    'INSERT INTO messages (id, sender, content, timestamp) VALUES (?, ?, ?, ?)'
  );
  
  stmt.run(newMessage.id, newMessage.sender, newMessage.content, newMessage.timestamp);
  
  // REAL-TIME: Broadcast the new message to all connected clients
  broadcast({ type: 'new_message', data: newMessage });
  
  res.status(201).json(newMessage);
});

export default router;
