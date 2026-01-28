import express from 'express';
import { pool } from '../services/database.js';

const router = express.Router();

// Get all messages
router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM messages ORDER BY timestamp ASC');
  res.json(result.rows);
});

// Create a message
router.post('/', async (req, res) => {
  const { id, sender, content, timestamp } = req.body;

  if (!sender || !content) {
    return res.status(400).json({ error: 'Sender and content are required' });
  }

  await pool.query(
    'INSERT INTO messages (id, sender, content, timestamp) VALUES ($1, $2, $3, $4)',
    [id || crypto.randomUUID(), sender, content, timestamp || new Date().toISOString()]
  );

  res.status(201).json({ success: true });
});

export default router;
