import express from 'express';
import db from '../services/database.js';

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

  const stmt = db.prepare(
    'INSERT INTO messages (id, sender, content, timestamp) VALUES (?, ?, ?, ?)'
  );
  
  stmt.run(id || crypto.randomUUID(), sender, content, timestamp || new Date().toISOString());
  
  res.status(201).json({ success: true });
});

export default router;
